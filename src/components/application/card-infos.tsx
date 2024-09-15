/* eslint-disable prettier/prettier */
// import { format } from "date-fns";
// import { ptBR } from "date-fns/locale";

import { Clock, FileCheck2Icon, SquareStack } from "lucide-react";

import { InfosCardProps } from "../../utils/infos-card";
import {
  Card,
  CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface CardInfoProps {
  infoCard: InfosCardProps;
}

export function CardInfos({ infoCard }: CardInfoProps) {
  return (
    <Card
      className={`${infoCard.alterado && "border-yellow-300"} transition-all hover:scale-[.95]`}
    >
      <CardHeader>
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col items-start gap-2">
            <CardTitle className="text-lg">
              {infoCard.arrivalNotice.shipName}
            </CardTitle>
            <CardDescription className="text-zinc-300">
              {infoCard.arrivalNotice.RAP}
            </CardDescription>
          </div>

          <div
            className={`${infoCard.alterado ? "bg-green-500" : "bg-red-500"} size-3 animate-pulse rounded-full`}
          />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-start gap-2">
        <div className="flex items-center justify-start gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock className="size-3" />
            <h2 className="whitespace-nowrap">Previsão de chegada:</h2>
          </div>
          <p>{infoCard.arrivalNotice.eta.split(" ")[0]}</p>
        </div>

        <div className="flex items-center justify-start gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <SquareStack className="size-3" />
            <h2>Tipo de escala:</h2>
          </div>
          <p>{infoCard.arrivalNotice.scaleType}</p>
        </div>

        <div className="flex items-center justify-start gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <FileCheck2Icon className="size-3" />
            <h2>DUV:</h2>
          </div>
          <p>{infoCard.duv}</p>
        </div>
      </CardContent>
    </Card>
  );
}
