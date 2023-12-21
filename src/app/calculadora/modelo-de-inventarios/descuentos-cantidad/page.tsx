"use client";
import { useState } from "react";
import {
  InputField,
  OutputField,
  ResolveButton,
} from "@/components/InputOutput";

function Q(D: number, Cp: number, I: number, P: number) {
  const epq = Math.sqrt((2 * D * Cp) / (I * P));
  return epq;
}

function CT(D: number, Q: number, Cp: number, I: number, P: number) {
  const TC = (D * Cp) / Q + (Q * I * P) / 2 + P * D;
  return TC;
}

function value(min: number, max: number, valor: number) {
  if (valor < min) {
    return min;
  } else if (valor >= min && valor <= max) {
    return valor;
  } else {
    return max;
  }
}

function descuentoCantidad(
  D: number,
  Cp: number,
  I: number,
  Cant: number,
  descuento: number[],
  precioUnitario: number[]
) {
  let Minimo = Infinity;
  let valor = 0;

  for (let i = 0; i < Cant; i++) {
    let QTemp = Q(D, Cp, I, precioUnitario[i]);

    let QValue;
    if (i === 0) {
      QValue = value(1, descuento[i], QTemp);
    } else if (i === Cant - 1) {
      QValue = value(descuento[i], Infinity, QTemp);
    } else {
      QValue = value(descuento[i - 1] + 1, descuento[i], QTemp);
    }

    let CostoTotalTemp = CT(D, QValue, Cp, I, precioUnitario[i]);
    if (CostoTotalTemp < Minimo) {
      Minimo = CostoTotalTemp;
      valor = QValue;
    }
  }

  return { Minimo, valor };
}

export default function ModeloDeInventarios() {
  //imput 1
  const [Demanda, setDemanda] = useState(0);
  const [CostoPedido, setCostoPedido] = useState(0);
  const [CostoMantenimiento, setCostoMantenimiento] = useState(0);
  const [Cant, setCant] = useState(0);
  const [Descuento, setDescuento] = useState([]);
  const [PrecioUnitario, setPrecioUnitario] = useState([]);

  //output
  const [CostoTotal, setCostoTotal] = useState(0);
  const [CantidadOptima, setCantidadOptima] = useState(0);

  const calcular = () => {
    const resultado = descuentoCantidad(
      Demanda,
      CostoPedido,
      CostoMantenimiento,
      Cant,
      Descuento,
      PrecioUnitario
    );
    setCostoTotal(resultado.Minimo);
    setCantidadOptima(resultado.valor);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-slate-300 rounded-md shadow-md my-10">
      <h2 className="text-2xl font-semibold mb-4">EOQ Lote de Produccion</h2>
      <div className="grid grid-cols-2 gap-10 md:gap-20">
        <div>
          <InputField
            label="Demanda"
            name="Demanda"
            value={Demanda}
            onChange={(e: any) => setDemanda(e.target.valueAsNumber)}
            placeholder="Demanda"
          />
          <InputField
            label="Costo de Pedido"
            name="CostoPedido"
            value={CostoPedido}
            onChange={(e: any) => setCostoPedido(e.target.valueAsNumber)}
            placeholder="Costo de Pedido"
          />
          <InputField
            label="Costo de Mantenimiento"
            name="CostoMantenimiento"
            value={CostoMantenimiento}
            onChange={(e: any) => setCostoMantenimiento(e.target.valueAsNumber)}
            placeholder="Costo de Mantenimiento"
          />
          <InputField
            label="Cantidad de Descuentos"
            name="Cant"
            value={Cant}
            onChange={(e: any) => setCant(e.target.valueAsNumber)}
            placeholder="Cantidad de Descuentos"
          />
        </div>
        <div>
          <ResolveButton funtionClick={calcular} />
          <OutputField label="Cantidad Optima" value={CantidadOptima} />
          <OutputField label="Costo Total" value={CostoTotal} />
        </div>
      </div>
    </div>
  );
}
