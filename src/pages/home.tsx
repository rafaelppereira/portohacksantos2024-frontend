/* eslint-disable prettier/prettier */
// import { format } from "date-fns";
// import { ptBR } from "date-fns/locale";
import { zodResolver } from "@hookform/resolvers/zod";
import { File, Loader2, SearchIcon, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";

import { CardInfos } from "../components/application/card-infos";
import { RadialBarGraph } from "../components/charts/bar-chart";
import { TideChart } from "../components/charts/tide-chart";
import { WaveChart } from "../components/charts/wave-chart";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { InfosCardProps } from "../utils/infos-card";

const assistentFiltersSchema = z.object({
  name: z.string().optional(),
});

type AssistentFiltersSchema = z.infer<typeof assistentFiltersSchema>;

export function Home() {
  const [trafficData, setTrafficData] = useState<InfosCardProps[]>([]);
  const [hasLoadingTrafficData, setHasLoadingTrafficData] = useState(false);

  useEffect(() => {
    setHasLoadingTrafficData(true);
    const eventSource = new EventSource(
      "http://localhost:3333/v1/santosbrasil/traffic-range",
    );

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Atualização de tráfego:", data);
      setTrafficData(data);
      setHasLoadingTrafficData(false);
    };

    eventSource.onerror = (event) => {
      console.error("Erro no SSE:", event);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get("name");

  const { register, handleSubmit, reset } = useForm<AssistentFiltersSchema>({
    resolver: zodResolver(assistentFiltersSchema),
    defaultValues: {
      name: name ?? "",
    },
  });

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
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <TideChart />

          <WaveChart />

          <RadialBarGraph />
        </div>

        <div className="mt-5 flex flex-col items-center justify-between gap-5 lg:flex-row">
          <form
            onSubmit={handleSubmit(handleFilter)}
            className="flex w-full flex-col items-center gap-2 lg:flex-row"
          >
            <span className="text-sm font-semibold">Filtros</span>

            <Input
              {...register("name")}
              placeholder="Nome da pasta"
              className="h-8 w-full lg:w-auto"
            />

            <Button
              size="xs"
              disabled
              type="submit"
              className="w-full bg-violet-500 text-white hover:bg-violet-500/80 lg:w-auto"
            >
              <SearchIcon className="mr-2 h-4 w-4" />
              Filtrar resultados
            </Button>

            <Button
              size="xs"
              disabled
              type="button"
              onClick={handleClearFilters}
              className="w-full bg-rose-500 text-white transition-all hover:bg-rose-500/80 lg:w-auto"
            >
              <X className="mr-2 h-4 w-4" />
              Remover filtros
            </Button>
          </form>

          <div className="flex flex-col items-center justify-center gap-2 whitespace-nowrap lg:flex-row">
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

        {hasLoadingTrafficData ? (
          <div className="mt-10 flex w-full items-center justify-center">
            <Loader2 className="size-10 animate-spin" />
          </div>
        ) : (
          <section className="grid min-h-screen grid-cols-1 flex-col items-center justify-between gap-4 pt-5 md:grid-cols-2 lg:grid-cols-3">
            {trafficData.map((infos) => (
              <Dialog key={infos.id}>
                <DialogTrigger>
                  <CardInfos infoCard={infos} />
                </DialogTrigger>
                <DialogContent className="w-full max-w-4xl overflow-x-auto">
                  <DialogHeader>
                    <DialogTitle>{infos.arrivalNotice.shipName}</DialogTitle>
                    <DialogDescription>
                      {infos.arrivalNotice.RAP}
                    </DialogDescription>
                  </DialogHeader>

                  <Tabs className="w-full" defaultValue="new">
                    <TabsList className="w-full">
                      <TabsTrigger value="old" className="w-full">
                        Informação antiga
                      </TabsTrigger>
                      <TabsTrigger value="new" className="w-full">
                        Informação atualizada
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="old">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>
                              Viagem (RAP)
                            </TableHead>
                            <TableHead>
                              Código IMO
                            </TableHead>
                            <TableHead>
                              Embarcação
                            </TableHead>
                            <TableHead>
                              Previsão de chegada
                            </TableHead>
                            <TableHead>Tipo de escala</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>3994/2024</TableCell>
                            <TableCell>9829681</TableCell>
                            <TableCell>NITRO HUB</TableCell>
                            <TableCell className="text-red-500">05/09/2024</TableCell>
                            <TableCell>ATRACACAO</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TabsContent>
                    <TabsContent value="new">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>
                              Viagem (RAP)
                            </TableHead>
                            <TableHead>
                              Código IMO
                            </TableHead>
                            <TableHead>
                              Embarcação
                            </TableHead>
                            <TableHead>
                              Previsão de chegada
                            </TableHead>
                            <TableHead>Tipo de escala</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>3994/2024</TableCell>
                            <TableCell>9829681</TableCell>
                            <TableCell>NITRO HUB</TableCell>
                            <TableCell className="text-yellow-500">06/09/2024</TableCell>
                            <TableCell>ATRACACAO</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TabsContent>
                  </Tabs>

                  <Button type="button" className="bg-violet-500 text-white hover:bg-violet-500/80">
                    <File className="size-4 mr-2" />
                    Criar pacote e gerar EDI
                  </Button>
                </DialogContent>
              </Dialog>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}
