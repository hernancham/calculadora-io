"use client";
import { useState } from "react";
import {
  InputField,
  OutputField,
  ResolveButton,
} from "@/components/InputOutput";

interface TypeInputValues {
  DemandaAnual: number;
  CostoPorMantener: number;
  CostoUnitario: number;
  CostoPorPedido: number;
  TiempoAtenderPedido: number;
  TiempoLaborableAnio: number;
}

interface TypeOutputValues {
  CantidadEconomicaPedido: number;
  NumeroPedidosPeriodo: number;
  TiempoEntrePedidos: number;
  PuntoDeReorden: number;
  CostoTotalRelevante: number;
  CostoTotalInventarioPorPedido: number;
}

interface TypeListaInput {
  label: string;
  name: string;
  placeholder: string;
}

interface TypeListaOutput {
  label: string;
  name: string;
}

export default function FaltantesPlaneados() {
  const [inputValues, setInputValues] = useState<TypeInputValues>({
    DemandaAnual: 0,
    CostoPorMantener: 0,
    CostoUnitario: 0,
    CostoPorPedido: 0,
    TiempoAtenderPedido: 0,
    TiempoLaborableAnio: 0,
  });

  const [outputValues, setOutputValues] = useState<TypeOutputValues>({
    CantidadEconomicaPedido: 0,
    NumeroPedidosPeriodo: 0,
    TiempoEntrePedidos: 0,
    PuntoDeReorden: 0,
    CostoTotalRelevante: 0,
    CostoTotalInventarioPorPedido: 0,
  });

  const listaInput: TypeListaInput[] = [
    {
      label: "Demanda Anual",
      name: "DemandaAnual",
      placeholder: "0",
    },
    {
      label: "Costo Por Mantener",
      name: "CostoPorMantener",
      placeholder: "0",
    },
    {
      label: "Costo Unitario",
      name: "CostoUnitario",
      placeholder: "0",
    },
    {
      label: "Costo Por Pedido",
      name: "CostoPorPedido",
      placeholder: "0",
    },
    {
      label: "Tiempo para Atender Pedido",
      name: "TiempoAtenderPedido",
      placeholder: "0",
    },
    {
      label: "Tiempo Laborable Anual",
      name: "TiempoLaborableAnio",
      placeholder: "0",
    },
  ];

  const listaOutput: TypeListaOutput[] = [
    {
      label: "Cantidad Economica de Pedido",
      name: "CantidadEconomicaPedido",
    },
    {
      label: "Numero de Pedido por Periodo",
      name: "NumeroPedidosPeriodo",
    },
    {
      label: "Tiempo entre Pedidos",
      name: "TiempoEntrePedidos",
    },
    {
      label: "Punto de Reorden",
      name: "PuntoDeReorden",
    },
    {
      label: "Costo Total Relevante",
      name: "CostoTotalRelevante",
    },
    {
      label: "Costo Total del Inventario por Periodo",
      name: "CostoTotalInventarioPorPedido",
    },
  ];

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    const parsedValue = !isNaN(parseFloat(value)) ? parseFloat(value) : 0;
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: parsedValue,
    }));
  };

  const handleResolveClick = () => {
    const {
      DemandaAnual,
      CostoPorMantener,
      CostoUnitario,
      CostoPorPedido,
      TiempoAtenderPedido,
      TiempoLaborableAnio,
    } = inputValues;

    const CantidadEconomicaPedido = Math.sqrt(
      (2 * DemandaAnual * CostoPorPedido) / CostoPorMantener
    );

    const NumeroPedidosPeriodo = DemandaAnual / CantidadEconomicaPedido;

    const TiempoEntrePedidos = TiempoLaborableAnio / NumeroPedidosPeriodo;

    const PuntoDeReorden =
      (DemandaAnual * TiempoAtenderPedido) / TiempoLaborableAnio;

    const CostoTotalRelevante =
      (DemandaAnual * CostoPorPedido) / CantidadEconomicaPedido +
      (CantidadEconomicaPedido * CostoPorMantener) / 2;

    const CostoTotalInventarioPorPedido =
      DemandaAnual * CostoUnitario + CostoTotalRelevante;

    setOutputValues({
      CantidadEconomicaPedido,
      NumeroPedidosPeriodo,
      TiempoEntrePedidos,
      PuntoDeReorden,
      CostoTotalRelevante,
      CostoTotalInventarioPorPedido,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-slate-300 rounded-md shadow-md my-10">
      <h2 className="text-2xl font-semibold mb-4">Resolución de Inputs</h2>
      <div className="grid grid-cols-2 gap-20">
        <div>
          {listaInput.map((input: TypeListaInput, index: number) => (
            <InputField
              key={index}
              label={input.label}
              name={input.name}
              value={inputValues[input.name as keyof TypeInputValues]}
              onChange={handleInputChange}
              placeholder={input.placeholder}
            />
          ))}
          <ResolveButton funtionClick={handleResolveClick} />
        </div>
        <div>
          {listaOutput.map((output: any, index: number) => (
            <OutputField
              key={index}
              label={output.label}
              value={outputValues[
                output.name as keyof TypeOutputValues
              ].toFixed(2)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
