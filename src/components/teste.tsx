/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";

import { InfosCardProps } from "../utils/infos-card";

const TrafficData = () => {
  const [trafficData, setTrafficData] = useState<any[]>([]);

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

  return (
    <div className="rounded-md">
      <h1>Dados de Tráfego Atualizados</h1>
      <ul className="grid grid-cols-6 gap-5">
        {trafficData.map((item, index) => (
          <li
            key={index}
            className={item.alterado ? "bg-green-500" : "bg-red-500"}
          >
            <strong>Nome do Navio:</strong> {item.arrivalNotice.shipName} <br />
            <strong>ETA:</strong> {item.arrivalNotice.eta} <br />
            <strong>IMO:</strong> {item.arrivalNotice.IMO} <br />
            <strong>RAP:</strong> {item.arrivalNotice.RAP} <br />
            <strong>Tipo de Escala:</strong> {item.arrivalNotice.scaleType}{" "}
            <br />
            <strong>Local:</strong> {item.forecast.local} <br />
            <strong>Data de Previsão:</strong> {item.forecast.eta} <br />
            <strong>DUV:</strong> {item.duv} <br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrafficData;
