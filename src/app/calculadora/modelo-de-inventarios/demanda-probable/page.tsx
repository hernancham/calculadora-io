"use client";
import { useState } from "react";
import {
  InputField,
  OutputField,
  ResolveButton,
} from "@/components/InputOutput";
import jStat from "jstat";
import Image from "next/image";
import EOQDemandaProbable from "@/public/inventarios/dempro.jpg";

interface TypeInputValues {
  CostoPreparacion: number;
  CostoMantener: number;
  DesvEstandar: number;
  DemTiempoEspera: number;
  DemEsperadaAnual: number;
  ProbTenerStock: number;
}

interface TypeInputValues2 {
  CostoPreparacion: number;
  CostoMantener: number;
  DemEsperadaAnual: number;
  ProbTenerStock: number;
  DiasHabiles: number;
  TiempoDeEntrega: number;
  DesvEstandar_Dia: number;
}

interface TypeOutputValues {
  CantidadOptima: number;
  NumeroOrdenes: number;
  PuntoReorden: number;
  CostoAnualOrdenar: number;
  CostoAnualRetencion: number;
  CosotoAnualRetencionSeguridad: number;
  CostoTotalAnual: number;
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

export default function DemandaProbable() {
  const [inputValues, setInputValues] = useState<TypeInputValues>({
    CostoPreparacion: 0,
    CostoMantener: 0,
    DesvEstandar: 0,
    DemTiempoEspera: 0,
    DemEsperadaAnual: 0,
    ProbTenerStock: 0,
  });

  const [inputValues2, setInputValues2] = useState<TypeInputValues2>({
    CostoPreparacion: 0,
    CostoMantener: 0,
    DemEsperadaAnual: 0,
    ProbTenerStock: 0,
    DiasHabiles: 0,
    TiempoDeEntrega: 0,
    DesvEstandar_Dia: 0,
  });

  const [outputValues, setOutputValues] = useState<TypeOutputValues>({
    CantidadOptima: 0,
    NumeroOrdenes: 0,
    PuntoReorden: 0,
    CostoAnualOrdenar: 0,
    CostoAnualRetencion: 0,
    CosotoAnualRetencionSeguridad: 0,
    CostoTotalAnual: 0,
  });

  const listaInput: TypeListaInput[] = [
    {
      label: "Costo de Preparación",
      name: "CostoPreparacion",
      placeholder: "0",
    },
    {
      label: "Costo de Mantenimiento",
      name: "CostoMantener",
      placeholder: "0",
    },
    {
      label: "Desviación Estandar",
      name: "DesvEstandar",
      placeholder: "0",
    },
    {
      label: "Demanda en Tiempo de Espera",
      name: "DemTiempoEspera",
      placeholder: "0",
    },
    {
      label: "Demanda Esperada Anual",
      name: "DemEsperadaAnual",
      placeholder: "0",
    },
    {
      label: "Probabilidad de Tener Stock",
      name: "ProbTenerStock",
      placeholder: "0",
    },
  ];

  const listaInput2: TypeListaInput[] = [
    {
      label: "Costo de Preparación",
      name: "CostoPreparacion",
      placeholder: "0",
    },
    {
      label: "Costo de Mantenimiento",
      name: "CostoMantener",
      placeholder: "0",
    },
    {
      label: "Demanda Esperada Anual",
      name: "DemEsperadaAnual",
      placeholder: "0",
    },
    {
      label: "Probabilidad de Tener Stock",
      name: "ProbTenerStock",
      placeholder: "0",
    },
    {
      label: "Días Hábiles",
      name: "DiasHabiles",
      placeholder: "0",
    },
    {
      label: "Tiempo de Entrega",
      name: "TiempoDeEntrega",
      placeholder: "0",
    },
    {
      label: "Desviación Estandar por Día",
      name: "DesvEstandar_Dia",
      placeholder: "0",
    },
  ];

  const listaOutput: TypeListaOutput[] = [
    {
      label: "Cantidad Optima",
      name: "CantidadOptima",
    },
    {
      label: "Número de Ordenes",
      name: "NumeroOrdenes",
    },
    {
      label: "Punto de Reorden",
      name: "PuntoReorden",
    },
    {
      label: "Costo Anual de Ordenar",
      name: "CostoAnualOrdenar",
    },
    {
      label: "Costo Anual de Retención",
      name: "CostoAnualRetencion",
    },
    {
      label: "Costo Anual de Retención de Seguridad",
      name: "CosotoAnualRetencionSeguridad",
    },
    {
      label: "Costo Total Anual",
      name: "CostoTotalAnual",
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

  const handleInputChange2 = (e: any) => {
    const { name, value } = e.target;
    const parsedValue = !isNaN(parseFloat(value)) ? parseFloat(value) : 0;
    setInputValues2((prevValues) => ({
      ...prevValues,
      [name]: parsedValue,
    }));
  };

  const handleResolveClick = () => {
    const {
      CostoPreparacion,
      CostoMantener,
      DesvEstandar,
      DemTiempoEspera,
      DemEsperadaAnual,
      ProbTenerStock,
    } = inputValues;

    const CantidadOptima = Math.sqrt(
      (2 * DemEsperadaAnual * CostoPreparacion) / CostoMantener
    );
    const NumeroOrdenes = DemEsperadaAnual / CantidadOptima; // Número de órdenes por año
    let valorZ = jStat.normal.inv(ProbTenerStock, 0, 1); // Encontrar el valor de Z
    const PuntoReorden = DemTiempoEspera + valorZ * DesvEstandar; // Cantidad que indica pedir más producto

    const CostoAnualOrdenar =
      (DemEsperadaAnual / CantidadOptima) * CostoPreparacion;
    const CostoAnualRetencion = (CantidadOptima / 2) * CostoMantener;
    const CosotoAnualRetencionSeguridad =
      (PuntoReorden - DemTiempoEspera) * CostoMantener;
    const CostoTotalAnual =
      CostoAnualOrdenar + CostoAnualRetencion + CosotoAnualRetencionSeguridad;

    setOutputValues({
      CantidadOptima,
      NumeroOrdenes,
      PuntoReorden,
      CostoAnualOrdenar,
      CostoAnualRetencion,
      CosotoAnualRetencionSeguridad,
      CostoTotalAnual,
    });
  };

  const handleResolveClick2 = () => {
    const {
      CostoPreparacion,
      CostoMantener,
      DemEsperadaAnual,
      ProbTenerStock,
      DiasHabiles,
      TiempoDeEntrega,
      DesvEstandar_Dia,
    } = inputValues2;

    const DesvEstandar = Math.sqrt(TiempoDeEntrega * DesvEstandar_Dia ** 2);
    const DemTiempoEspera = (DemEsperadaAnual / DiasHabiles) * TiempoDeEntrega;

    const CantidadOptima = Math.sqrt(
      (2 * DemEsperadaAnual * CostoPreparacion) / CostoMantener
    );
    const NumeroOrdenes = DiasHabiles / CantidadOptima; // Número de órdenes por año
    let valorZ = jStat.normal.inv(ProbTenerStock, 0, 1); // Encontrar el valor de Z
    const PuntoReorden = DemTiempoEspera + valorZ * DesvEstandar; // Cantidad que indica pedir más producto

    const CostoAnualOrdenar =
      (DemEsperadaAnual / CantidadOptima) * CostoPreparacion;
    const CostoAnualRetencion = (CantidadOptima / 2) * CostoMantener;
    const CosotoAnualRetencionSeguridad =
      (PuntoReorden - DemTiempoEspera) * CostoMantener;
    const CostoTotalAnual =
      CostoAnualOrdenar + CostoAnualRetencion + CosotoAnualRetencionSeguridad;

    setOutputValues({
      CantidadOptima,
      NumeroOrdenes,
      PuntoReorden,
      CostoAnualOrdenar,
      CostoAnualRetencion,
      CosotoAnualRetencionSeguridad,
      CostoTotalAnual,
    });
  };

  const [estadoBoton, setEstadoBoton] = useState(0);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-slate-300 rounded-md shadow-md my-10">
      <h2 className="text-2xl font-semibold mb-4">EOQ Demanda Probable</h2>
      <Image src={EOQDemandaProbable} alt="EOQDemandaProbable" />
      <p>Concoces</p>
      <button
        className="bg-cyan-800 text-white px-4 py-2 rounded-md shadow-md my-4"
        onClick={() => {
          setEstadoBoton((prevState) => (prevState + 1) % 2);
        }}
      >
        Cambiar Estado
      </button>
      <div className="grid grid-cols-2 gap-10 md:gap-20">
        {estadoBoton === 0 ? (
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
        ) : (
          <div>
            {listaInput2.map((input: TypeListaInput, index: number) => (
              <InputField
                key={index}
                label={input.label}
                name={input.name}
                value={inputValues2[input.name as keyof TypeInputValues2]}
                onChange={handleInputChange2}
                placeholder={input.placeholder}
              />
            ))}
            <ResolveButton funtionClick={handleResolveClick2} />
          </div>
        )}
        <div>
          {listaOutput.map((output: TypeListaOutput, index: number) => (
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
