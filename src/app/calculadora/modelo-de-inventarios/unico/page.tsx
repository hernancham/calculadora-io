"use client";
import { useState } from "react";
import {
  InputField,
  OutputField,
  ResolveButton,
} from "@/components/InputOutput";
import jStat from "jstat";

function invent_PerUnico_DemProb_TD1(
  DemMin: number,
  DemMax: number,
  costoCompra: number,
  precioVenta: number,
  precioLiqui: number
): number {
  const co: number = costoCompra - precioLiqui; // co = sobreestimar la demanda, sobrarían existencias
  const cu: number = precioVenta - costoCompra; // cu = subestimar la demanda, faltarían existencias
  const rango: number = DemMax - DemMin;

  const ProbabilidadDemanda: number = cu / (cu + co);
  const cantidadOptima: number = DemMin + rango * ProbabilidadDemanda;
  return cantidadOptima;
}

function invent_PerUnico_DemProb_TD2(
  DemProm: number,
  desvEstandar: number,
  co: number,
  cu: number
): number {
  const ProbabilidadDemanda: number = cu / (cu + co);
  console.log(ProbabilidadDemanda);

  // Encontrar el valor de Z
  // valor_z =  norm.ppf(ProbabilidadDemanda)
  const valorZ: number = jStat.normal.inv(ProbabilidadDemanda, 0, 1);
  console.log(valorZ);
  const cantidadOptima: number = DemProm + valorZ * desvEstandar; // Q* = μ + z*σ

  return cantidadOptima;
}

function invent_PerUnico_DemProb_TD3(
  DemProm: number,
  desvEstandar: number,
  costoCompra: number,
  precioVenta: number,
  precioLiqui: number
): number {
  const co: number = costoCompra - precioLiqui; // co = sobreestimar la demanda, sobrarían existencias
  const cu: number = precioVenta - costoCompra; // cu = subestimar la demanda, faltarían existencias
  const ProbabilidadDemanda: number = cu / (cu + co);

  // Encontrar el valor de Z
  // valor_z =  norm.ppf(ProbabilidadDemanda)
  const valorZ: number = jStat.normal.inv(ProbabilidadDemanda, 0, 1);
  const cantidadOptima: number = DemProm + valorZ * desvEstandar; // Q* = μ + z*σ

  return cantidadOptima;
}

export default function ModeloDeInventarios() {
  // inputs
  const [DemMin, setDemMin] = useState(0);
  const [DemMax, setDemMax] = useState(0);
  const [DemProm, setDemProm] = useState(0);
  const [desvEstandar, setDesvEstandar] = useState(0);
  const [costoCompra, setCostoCompra] = useState(0);
  const [precioVenta, setPrecioVenta] = useState(0);
  const [precioLiqui, setPrecioLiqui] = useState(0);
  const [co, setCo] = useState(0);
  const [cu, setCu] = useState(0);

  // outputs

  const [cantidadOptima, setCantidadOptima] = useState(0);

  const handleResolveClick = () => {
    const newcantidadOptima = invent_PerUnico_DemProb_TD1(
      DemMin,
      DemMax,
      costoCompra,
      precioVenta,
      precioLiqui
    );
    setCantidadOptima(newcantidadOptima);
  };

  const handleResolveClick2 = () => {
    const newcantidadOptima = invent_PerUnico_DemProb_TD2(
      DemProm,
      desvEstandar,
      co,
      cu
    );
    setCantidadOptima(newcantidadOptima);
  };

  const handleResolveClick3 = () => {
    const newcantidadOptima = invent_PerUnico_DemProb_TD3(
      DemProm,
      desvEstandar,
      costoCompra,
      precioVenta,
      precioLiqui
    );
    setCantidadOptima(newcantidadOptima);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-slate-300 rounded-md shadow-md my-10">
      <h2 className="text-2xl font-semibold mb-4">EOQ Demanda Probable</h2>
      <div className="grid grid-cols-3 gap-10 md:gap-20">
        <div>
          <InputField
            label="Demanda Minima"
            name="DemMin"
            value={DemMin}
            onChange={(e: any) => setDemMin(e.target.valueAsNumber)}
            placeholder="Demanda Minima"
          />
          <InputField
            label="Demanda Maxima"
            name="DemMax"
            value={DemMax}
            onChange={(e: any) => setDemMax(e.target.valueAsNumber)}
            placeholder="Demanda Maxima"
          />
          <InputField
            label="Costo de Compra"
            name="costoCompra"
            value={costoCompra}
            onChange={(e: any) => setCostoCompra(e.target.valueAsNumber)}
            placeholder="Costo de Compra"
          />
          <InputField
            label="Precio de Venta"
            name="precioVenta"
            value={precioVenta}
            onChange={(e: any) => setPrecioVenta(e.target.valueAsNumber)}
            placeholder="Precio de Venta"
          />
          <InputField
            label="Precio de Liquidacion"
            name="precioLiqui"
            value={precioLiqui}
            onChange={(e: any) => setPrecioLiqui(e.target.valueAsNumber)}
            placeholder="Precio de Liquidacion"
          />
          <ResolveButton funtionClick={handleResolveClick} />
        </div>
        <div>
          <InputField
            label="Demanda Promedio"
            name="DemProm"
            value={DemProm}
            onChange={(e: any) => setDemProm(e.target.valueAsNumber)}
            placeholder="Demanda Promedio"
          />
          <InputField
            label="Desviacion Estandar"
            name="desvEstandar"
            value={desvEstandar}
            onChange={(e: any) => setDesvEstandar(e.target.valueAsNumber)}
            placeholder="Desviacion Estandar"
          />
          <InputField
            label="Sobreestimar la demanda"
            name="co"
            value={co}
            onChange={(e: any) => setCo(e.target.valueAsNumber)}
            placeholder="Co"
          />
          <InputField
            label="Subestimar la demanda"
            name="cu"
            value={cu}
            onChange={(e: any) => setCu(e.target.valueAsNumber)}
            placeholder="Cu"
          />
          <ResolveButton funtionClick={handleResolveClick2} />
        </div>
        <div>
          <InputField
            label="Demanda Promedio"
            name="DemProm"
            value={DemProm}
            onChange={(e: any) => setDemProm(e.target.valueAsNumber)}
            placeholder="Demanda Promedio"
          />
          <InputField
            label="Desviacion Estandar"
            name="desvEstandar"
            value={desvEstandar}
            onChange={(e: any) => setDesvEstandar(e.target.valueAsNumber)}
            placeholder="Desviacion Estandar"
          />
          <InputField
            label="Costo de Compra"
            name="costoCompra"
            value={costoCompra}
            onChange={(e: any) => setCostoCompra(e.target.valueAsNumber)}
            placeholder="Costo de Compra"
          />
          <InputField
            label="Precio de Venta"
            name="precioVenta"
            value={precioVenta}
            onChange={(e: any) => setPrecioVenta(e.target.valueAsNumber)}
            placeholder="Precio de Venta"
          />
          <InputField
            label="Precio de Liquidacion"
            name="precioLiqui"
            value={precioLiqui}
            onChange={(e: any) => setPrecioLiqui(e.target.valueAsNumber)}
            placeholder="Precio de Liquidacion"
          />
          <ResolveButton funtionClick={handleResolveClick3} />
        </div>
      </div>
      <OutputField label="Cantidad Optima" value={cantidadOptima.toFixed(2)} />
    </div>
  );
}
