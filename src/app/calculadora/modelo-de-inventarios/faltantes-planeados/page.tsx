"use client";
import { useState } from "react";
import {
  InputField,
  OutputField,
  ResolveButton,
} from "@/components/InputOutput";

function calcularEPQFaltantesPlaneados(
  demandaAnual: number,
  costoDePedir: number,
  costoAnualMantenerInventario: number,
  costoDeFaltantes: number,
  diasHabiles: number
) {
  let FP = (costoAnualMantenerInventario + costoDeFaltantes) / costoDeFaltantes; // Calcular el factor de penalización
  let PF =
    costoAnualMantenerInventario /
    (costoAnualMantenerInventario + costoDeFaltantes);
  let Q = Math.sqrt(
    ((2 * demandaAnual * costoDePedir) / costoAnualMantenerInventario) * FP
  ); // Calcular el EOQ
  let S = Q * PF; // Pedidos de espera
  let T = (diasHabiles * Q) / demandaAnual; // Tiempo de ciclo
  let T1 = ((Q - S) / Q) * T; // Tiempo duracion de inventario
  let T2 = T - T1; // Tiempo de escasez
  let CM = (costoAnualMantenerInventario * Math.sqrt(Q - S)) / (2 * Q); //calcular el costo de mantenimiento
  let CP = (costoDePedir * demandaAnual) / Q; // Calcular el costo de pedido
  let CF = (costoDeFaltantes * Math.sqrt(S)) / (2 * Q); // Calcular el costo de faltantes
  let CT = CM + CP + CF; // Calcular el costo total

  return {
    factorPenalizacion: FP,
    probabilidadDeFaltante: PF,
    EOQ: Q,
    pedidosDeEspera: S,
    tiempoDeCiclo: T,
    tiempoDuracionInventario: T1,
    tiempoEscasez: T2,
    costoMantenimiento: CM,
    costoPedido: CP,
    costoFaltantes: CF,
    costoTotal: CT,
  }; // Devolver el costo total calculado
}

export default function ModeloDeInventarios() {
  //imput 1
  const [demandaAnual, setDemandaAnual] = useState(0);
  const [costoDePedir, setCostoDePedir] = useState(0);
  const [costoAnualMantenerInventario, setCostoAnualMantenerInventario] =
    useState(0);
  const [costoDeFaltantes, setCostoDeFaltantes] = useState(0);
  const [diasHabiles, setDiasHabiles] = useState(0);

  //output
  const [factorPenalizacion, setFactorPenalizacion] = useState(0);
  const [probabilidadDeFaltante, setProbabilidadDeFaltante] = useState(0);
  const [EOQ, setEOQ] = useState(0);
  const [pedidosDeEspera, setPedidosDeEspera] = useState(0);
  const [tiempoDeCiclo, setTiempoDeCiclo] = useState(0);
  const [tiempoDuracionInventario, setTiempoDuracionInventario] = useState(0);
  const [tiempoEscasez, setTiempoEscasez] = useState(0);
  const [costoMantenimiento, setCostoMantenimiento] = useState(0);
  const [costoPedido, setCostoPedido] = useState(0);
  const [costoFaltantes, setCostoFaltantes] = useState(0);
  const [costoTotal, setCostoTotal] = useState(0);

  const calcular = () => {
    const resultado = calcularEPQFaltantesPlaneados(
      demandaAnual,
      costoDePedir,
      costoAnualMantenerInventario,
      costoDeFaltantes,
      diasHabiles
    );
    setFactorPenalizacion(resultado.factorPenalizacion);
    setProbabilidadDeFaltante(resultado.probabilidadDeFaltante);
    setEOQ(resultado.EOQ);
    setPedidosDeEspera(resultado.pedidosDeEspera);
    setTiempoDeCiclo(resultado.tiempoDeCiclo);
    setTiempoDuracionInventario(resultado.tiempoDuracionInventario);
    setTiempoEscasez(resultado.tiempoEscasez);
    setCostoMantenimiento(resultado.costoMantenimiento);
    setCostoPedido(resultado.costoPedido);
    setCostoFaltantes(resultado.costoFaltantes);
    setCostoTotal(resultado.costoTotal);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-slate-300 rounded-md shadow-md my-10">
      <h2 className="text-2xl font-semibold mb-4">
        Modelo de Faltantes planeados
      </h2>
      <div className="grid grid-cols-2 gap-10 md:gap-20">
        <div>
          <InputField
            label="Demanda Anual"
            name="demandaAnual"
            value={demandaAnual}
            onChange={(e: any) => setDemandaAnual(e.target.valueAsNumber)}
            placeholder="Demanda Anual"
          />
          <InputField
            label="Costo de pedir"
            name="costoDePedir"
            value={costoDePedir}
            onChange={(e: any) => setCostoDePedir(e.target.valueAsNumber)}
            placeholder="Costo de pedir"
          />
          <InputField
            label="Costo anual de mantener inventario"
            name="costoAnualMantenerInventario"
            value={costoAnualMantenerInventario}
            onChange={(e: any) =>
              setCostoAnualMantenerInventario(e.target.valueAsNumber)
            }
            placeholder="Costo anual de mantener inventario"
          />
          <InputField
            label="Costo de faltantes"
            name="costoDeFaltantes"
            value={costoDeFaltantes}
            onChange={(e: any) => setCostoDeFaltantes(e.target.valueAsNumber)}
            placeholder="Costo de faltantes"
          />
          <InputField
            label="Dias habiles"
            name="diasHabiles"
            value={diasHabiles}
            onChange={(e: any) => setDiasHabiles(e.target.valueAsNumber)}
            placeholder="Dias habiles"
          />
          <ResolveButton funtionClick={calcular} />
        </div>
        <div>
          <OutputField
            label="Factor de penalizacion"
            value={factorPenalizacion.toFixed(2)}
          />
          <OutputField
            label="Probabilidad de faltante"
            value={probabilidadDeFaltante.toFixed(2)}
          />
          <OutputField
            label="Cantidad Optima de Pedido"
            value={EOQ.toFixed(2)}
          />
          <OutputField
            label="Pedidos de espera"
            value={pedidosDeEspera.toFixed(2)}
          />
          <OutputField
            label="Tiempo de ciclo"
            value={tiempoDeCiclo.toFixed(2)}
          />
          <OutputField
            label="Tiempo duracion de inventario"
            value={tiempoDuracionInventario.toFixed(2)}
          />
          <OutputField
            label="Tiempo de escasez"
            value={tiempoEscasez.toFixed(2)}
          />
          <OutputField
            label="Costo de mantenimiento"
            value={costoMantenimiento.toFixed(2)}
          />
          <OutputField label="Costo de pedido" value={costoPedido.toFixed(2)} />
          <OutputField
            label="Costo de faltantes"
            value={costoFaltantes.toFixed(2)}
          />
          <OutputField label="Costo total" value={costoTotal.toFixed(2)} />
        </div>
      </div>
    </div>
  );
}
