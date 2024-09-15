/* eslint-disable prettier/prettier */
// import { format } from "date-fns";
// import { ptBR } from "date-fns/locale";
import { zodResolver } from "@hookform/resolvers/zod";
import { SearchIcon, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";

import { CardInfos } from "../components/application/card-infos";
import { Header } from "../components/header";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { InfosCardProps } from "../utils/infos-card";

// Esquema de validação Zod para os filtros
const assistentFiltersSchema = z.object({
  name: z.string().optional(),
});

// Tipo inferido a partir do esquema de validação
type AssistentFiltersSchema = z.infer<typeof assistentFiltersSchema>;

export function Infos() {
  const [trafficData, setTrafficData] = useState<InfosCardProps[]>([]);

  useEffect(() => {
    // Substitua pelo URL do seu servidor SSE
    const eventSource = new EventSource(
      "http://172.16.1.180:3333/v1/santosbrasil/traffic-range",
    );

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Atualização de tráfego:", data);
      setTrafficData(data);
    };

    eventSource.onerror = (event) => {
      console.error("Erro no SSE:", event);
    };

    // Cleanup na desmontagem do componente
    return () => {
      eventSource.close();
    };
  }, []);

  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get("name");

  // Configuração do formulário com react-hook-form e Zod resolver
  const { register, handleSubmit, reset } = useForm<AssistentFiltersSchema>({
    resolver: zodResolver(assistentFiltersSchema),
    defaultValues: {
      name: name ?? "",
    },
  });

  // Função para aplicar os filtros
  function handleFilter({ name }: AssistentFiltersSchema) {
    setSearchParams((state) => {
      if (name) {
        state.set("name", name);
      } else {
        state.delete("name");
      }
      state.set("page", "1");
      return state;
    });
  }

  // Função para limpar os filtros
  function handleClearFilters() {
    setSearchParams((state) => {
      state.delete("name");
      state.set("page", "1");
      return state;
    });
    reset({
      name: "",
    });
  }

  return (
    <main>
      <Header />

      <div className="mx-auto mt-10 max-w-6xl px-8">
        <div className="flex items-center justify-between">
          <form
            onSubmit={handleSubmit(handleFilter)}
            className="flex flex-col items-center gap-2 lg:flex-row"
          >
            <span className="text-sm font-semibold">Filtros</span>

            <Input
              {...register("name")}
              placeholder="Nome da pasta"
              className="h-8 w-full lg:w-auto"
            />

            <Button
              size="xs"
              type="submit"
              className="w-full bg-violet-500 text-white hover:bg-violet-500/80 lg:w-auto"
            >
              <SearchIcon className="mr-2 h-4 w-4" />
              Filtrar resultados
            </Button>

            <Button
              size="xs"
              type="button"
              onClick={handleClearFilters}
              className="w-full bg-rose-500 text-white transition-all hover:bg-rose-500/80 lg:w-auto"
            >
              <X className="mr-2 h-4 w-4" />
              Remover filtros
            </Button>
          </form>

          <div className="flex items-center justify-center gap-2">
            <div className="flex items-center gap-2">
              <h2 className="text-xs font-medium">Items atualizados:</h2>{" "}
              <div className="size-2 rounded-full bg-yellow-300" />
            </div>
            <div className="flex items-center gap-2">
              <h2 className="text-xs font-medium">Sem interrupções:</h2>{" "}
              <div className="size-2 rounded-full bg-green-500" />
            </div>
            <div className="flex items-center gap-2">
              <h2 className="text-xs font-medium">
                Navios com possível atraso:
              </h2>{" "}
              <div className="size-2 rounded-full bg-red-500" />
            </div>
          </div>
        </div>

        <section className="grid min-h-screen grid-cols-4 flex-col items-center justify-between gap-6 pt-5">
          {trafficData.map((infos) => (
            <Dialog key={infos.id}>
              <DialogTrigger>
                <CardInfos infoCard={infos} />
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{infos.arrivalNotice.shipName}</DialogTitle>
                  <DialogDescription>
                    {infos.arrivalNotice.RAP}
                  </DialogDescription>
                </DialogHeader>

                <h2 className="text-lg font-semibold">Aviso de chegada:</h2>

                <div className="flex items-center justify-start gap-2 text-muted-foreground">
                  <h2>IMO do navio:</h2>
                  <p>{infos.arrivalNotice.IMO}</p>
                </div>

                <div className="flex items-center justify-start gap-2 text-muted-foreground">
                  <h2 className="whitespace-nowrap">Data de chegada:</h2>
                  <p>{infos.arrivalNotice.eta}</p>
                </div>

                <div className="flex items-center justify-start gap-2 text-muted-foreground">
                  <h2>Hora de chegada:</h2>
                  <p>{infos.arrivalNotice.eta}</p>
                </div>

                <div className="flex items-center justify-start gap-2 text-muted-foreground">
                  <h2>Tipo de escala:</h2>
                  <p>{infos.arrivalNotice.scaleType}</p>
                </div>

                <h2 className="mt-5 text-lg font-semibold">
                  Atracação Prevista / Efetiva / Desatracação:
                </h2>

                <div className="flex items-center justify-start gap-2 text-muted-foreground">
                  <h2>IMO do navio:</h2>
                  {/* <p>{infos.forecast.}</p> */}
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </section>
      </div>
    </main>
  );
}
