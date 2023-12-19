import { useState } from "react";
import {
  InputField,
  OutputField,
  ResolveButton,
} from "@/components/InputOutput";
import * as jStat from "jstat";

function Invent_PerUnico_DemProb_TD1(
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

function Invent_PerUnico_DemProb_TD2(
  DemProm: number,
  desvEstandar: number,
  co: number,
  cu: number
): number {
  const ProbabilidadDemanda: number = cu / (cu + co);

  // Encontrar el valor de Z
  // valor_z =  norm.ppf(ProbabilidadDemanda)
  const valorZ: number = jStat.normal.inv(ProbabilidadDemanda, 0, 1);
  const cantidadOptima: number = DemProm + valorZ * desvEstandar; // Q* = μ + z*σ

  return cantidadOptima;
}

function Invent_PerUnico_DemProb_TD3(
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
  return <div>En Desarrollo</div>;
}
