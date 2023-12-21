"use client";
import { useState } from "react";
import {
  InputField,
  OutputField,
  ResolveButton,
} from "@/components/InputOutput";

function calcularEPQ(
  produccionAnual: number,
  demandaAnual: number,
  costoPedido: number,
  costoMantenimiento: number,
  tiempoEspera: number,
  diasHabiles: number
) {
  let FP = 1 - demandaAnual / produccionAnual;
  let Q = Math.sqrt(
    (2 * demandaAnual * costoPedido) / (FP * costoMantenimiento)
  ); // Cantidad Optima
  let PR = (demandaAnual / diasHabiles) * tiempoEspera; //Punto de reorden
  let NF = demandaAnual / Q; //Numero de fases
  let TC = diasHabiles / NF; // Tiempo de ciclo
  let CP = costoPedido * (demandaAnual / Q); //Costo total de pedido
  let CM = costoMantenimiento * (Q * FP * 0.5); //Costo total de Mantenimiento
  let CT = CP + CM;
  return {
    factorPenalizacion: FP,
    EOQ: Q,
    puntoReorden: PR,
    numeroFases: NF,
    tiempoCiclo: TC,
    costoTotalPedido: CP,
    costoTotalMantenimiento: CM,
    costoTotal: CT,
  };
}

export default function ModeloDeInventarios() {
  //imput 1
  const [produccionAnual, setProduccionAnual] = useState(0);
  const [demandaAnual, setDemandaAnual] = useState(0);
  const [costoPedido, setCostoPedido] = useState(0);
  const [costoMantenimiento, setCostoMantenimiento] = useState(0);
  const [tiempoEspera, setTiempoEspera] = useState(0);
  const [diasHabiles, setDiasHabiles] = useState(0);

  //output
  const [factorPenalizacion, setFactorPenalizacion] = useState(0);
  const [EOQ, setEOQ] = useState(0);
  const [puntoReorden, setPuntoReorden] = useState(0);
  const [numeroFases, setNumeroFases] = useState(0);
  const [tiempoCiclo, setTiempoCiclo] = useState(0);
  const [costoTotalPedido, setCostoTotalPedido] = useState(0);
  const [costoTotalMantenimiento, setCostoTotalMantenimiento] = useState(0);
  const [costoTotal, setCostoTotal] = useState(0);

  const resolver = () => {
    const {
      factorPenalizacion,
      EOQ,
      puntoReorden,
      numeroFases,
      tiempoCiclo,
      costoTotalPedido,
      costoTotalMantenimiento,
      costoTotal,
    } = calcularEPQ(
      produccionAnual,
      demandaAnual,
      costoPedido,
      costoMantenimiento,
      tiempoEspera,
      diasHabiles
    );
    setFactorPenalizacion(factorPenalizacion);
    setEOQ(EOQ);
    setPuntoReorden(puntoReorden);
    setNumeroFases(numeroFases);
    setTiempoCiclo(tiempoCiclo);
    setCostoTotalPedido(costoTotalPedido);
    setCostoTotalMantenimiento(costoTotalMantenimiento);
    setCostoTotal(costoTotal);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-slate-300 rounded-md shadow-md my-10">
      <h2 className="text-2xl font-semibold mb-4">EOQ Lote de Produccion</h2>
      <div className="grid grid-cols-2 gap-10 md:gap-20">
        <div>
          <InputField
            label="Produccion Anual"
            name="produccionAnual"
            value={produccionAnual}
            onChange={(e: any) => setProduccionAnual(e.target.value)}
            placeholder="Produccion Anual"
          />
          <InputField
            label="Demanda Anual"
            name="demandaAnual"
            value={demandaAnual}
            onChange={(e: any) => setDemandaAnual(e.target.value)}
            placeholder="Demanda Anual"
          />
          <InputField
            label="Costo de Pedido"
            name="costoPedido"
            value={costoPedido}
            onChange={(e: any) => setCostoPedido(e.target.value)}
            placeholder="Costo de Pedido"
          />
          <InputField
            label="Costo de Mantenimiento"
            name="costoMantenimiento"
            value={costoMantenimiento}
            onChange={(e: any) => setCostoMantenimiento(e.target.value)}
            placeholder="Costo de Mantenimiento"
          />
          <InputField
            label="Tiempo de Espera"
            name="tiempoEspera"
            value={tiempoEspera}
            onChange={(e: any) => setTiempoEspera(e.target.value)}
            placeholder="Tiempo de Espera"
          />
          <InputField
            label="Dias Habiles"
            name="diasHabiles"
            value={diasHabiles}
            onChange={(e: any) => setDiasHabiles(e.target.value)}
            placeholder="Dias Habiles"
          />
          <ResolveButton funtionClick={resolver} />
        </div>
        <div>
          <OutputField
            label="Factor de Penalizacion"
            value={factorPenalizacion.toFixed(2)}
          />
          <OutputField
            label="Cantidad Optima de Pedido"
            value={EOQ.toFixed(2)}
          />
          <OutputField
            label="Punto de Reorden"
            value={puntoReorden.toFixed(2)}
          />
          <OutputField label="Numero de Fases" value={numeroFases.toFixed(2)} />
          <OutputField label="Tiempo de Ciclo" value={tiempoCiclo.toFixed(2)} />
          <OutputField
            label="Costo Total de Pedido"
            value={costoTotalPedido.toFixed(2)}
          />
          <OutputField
            label="Costo Total de Mantenimiento"
            value={costoTotalMantenimiento.toFixed(2)}
          />
          <OutputField label="Costo Total" value={costoTotal.toFixed(2)} />
        </div>
      </div>
    </div>
  );
}
