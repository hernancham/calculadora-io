"use client";
import { useState } from "react";
import {
  InputField,
  OutputField,
  ResolveButton,
} from "@/components/InputOutput";

interface TypeInputValues {
  lambda: number;
  mu: number;
  servidores: number;
}

interface TypeOutputValues {
  CantidadPromedioClientesSistema: number;
  CantidadPromedioClientesCola: number;
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
    lambda: 0,
    mu: 0,
    servidores: 0,
  });

  const [outputValues, setOutputValues] = useState<TypeOutputValues>({
    CantidadPromedioClientesSistema: 0,
    CantidadPromedioClientesCola: 0,
  });

  const listaInput: TypeListaInput[] = [
    {
      label: "Lambda",
      name: "lambda",
      placeholder: "0",
    },
    {
      label: "Mu",
      name: "mu",
      placeholder: "0",
    },
    {
      label: "Servidores",
      name: "servidores",
      placeholder: "0",
    },
  ];

  const listaOutput: TypeListaOutput[] = [
    {
      label: "Cantidad Promedio Clientes Sistema",
      name: "CantidadPromedioClientesSistema",
    },
    {
      label: "Cantidad Promedio Clientes Cola",
      name: "CantidadPromedioClientesCola",
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
    const { lambda, mu, servidores } = inputValues;

    const CantidadPromedioClientesSistema = lambda / (mu - lambda);
    const CantidadPromedioClientesCola =
      Math.pow(lambda, 2) / (mu * (mu - lambda));

    setOutputValues({
      CantidadPromedioClientesSistema,
      CantidadPromedioClientesCola,
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
