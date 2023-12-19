"use client";
import React, { useState } from "react";
import { TablaMatrixControl, TablaMatrixImput } from "@/components/TablaMatrix";
import { TablaMatrixOutput } from "@/components/TablaMatrixOuput";

const TablaMultiMatrixImput = ({
  multiData,
  setMultiData,
  hcol,
  hrow,
  index,
}: {
  multiData: any[][][];
  setMultiData: any;
  hcol: any[];
  hrow: any[];
  index: number;
}) => {
  const handleInputChange = (row: number, col: number, event: any) => {
    let newMultiData = [...multiData];
    newMultiData[index][row][col] = !isNaN(parseFloat(event.target.value))
      ? parseFloat(event.target.value)
      : 0;
    setMultiData(newMultiData);
  };

  return (
    <table>
      <thead>
        <tr>
          <th></th>
          {multiData[0][0].map((_: any[], ic: number) => (
            <th className="text-center" key={ic}>
              {hcol[ic]}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {multiData[index].map((row: any[], ir: number) => (
          <tr key={ir}>
            <td className="text-center px-2 font-bold">{hrow[ir]}</td>
            {row.map((column: any, ic: number) => (
              <td key={ic}>
                <input
                  type="number"
                  defaultValue={column}
                  className="border border-gray-400 rounded-md p-2 m-0.5 w-20"
                  onChange={(event) => handleInputChange(ir, ic, event)}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default function TeoriaDecisisonesPage() {
  const [matrixSize, setMatrixSize] = useState({
    rows: 4,
    columns: 4,
  });

  const [matrix, setMatrix] = useState([
    [1, 5, 5, 7],
    [0.2, 1, 1, 3],
    [0.2, 1, 1, 3],
    [0.14, 0.33, 0.33, 1],
  ]);

  const [matrixCriterio, setMatrixCriterio] = useState<any[][][]>([
    [
      [1, 0.25, 4, 0.17],
      [4, 1, 4, 0.25],
      [0.25, 0.25, 1, 0.2],
      [6, 4, 5, 1],
    ],
    [
      [1, 2, 5, 1],
      [0.5, 1, 3, 2],
      [0.2, 0.33, 1, 0.25],
      [1, 0.5, 4, 1],
    ],
    [
      [1, 0.33, 0.14, 0.2],
      [3, 1, 0.2, 0.33],
      [7, 5, 1, 3],
      [5, 3, 0.33, 1],
    ],
    [
      [1, 0.33, 0.25, 0.33],
      [3, 1, 0.5, 1],
      [4, 2, 1, 2],
      [3, 1, 0.5, 1],
    ],
  ]);

  const [respuesta, setRespuesta] = useState(0);

  function transponerMatriz(matriz: any[][]) {
    return matriz[0].map((_, i) => matriz.map((row) => row[i]));
  }

  function sumarFilas(matriz: any[][]) {
    return matriz.map((row) => row.reduce((acc, val) => acc + val, 0));
  }

  function promediosFilas(matriz: any[][]) {
    return matriz.map(
      (row) => row.reduce((acc, val) => acc + val, 0) / row.length
    );
  }

  function dividirColumnas(matriz: any[][], vector: any[]) {
    return matriz.map((fila, i) =>
      fila.map((elemento, j) => elemento / vector[j])
    );
  }

  function multiplicarMatrizVector(matriz: any[][], vector: any[]) {
    const resultado = [];
    const filas = matriz.length;
    for (let i = 0; i < filas; i++) {
      let suma = 0;
      for (let j = 0; j < filas; j++) {
        suma += matriz[i][j] * vector[j];
      }
      resultado.push(suma);
    }
    return resultado;
  }

  function dividirVectores(vector1: any[], vector2: any[]) {
    return vector1.map((elemento, i) => elemento / vector2[i]);
  }

  function calcularPromedio(vector: any[]) {
    return vector.reduce((acc, val) => acc + val, 0) / vector.length;
  }

  function promedioCriterio(matriz: any[][]) {
    let matrizCopia = dividirColumnas(
      matriz,
      sumarFilas(transponerMatriz(matriz))
    );
    let vectorPropio = promediosFilas(matrizCopia);
    console.log(vectorPropio);
    let a = multiplicarMatrizVector(matrizCopia, vectorPropio);
    let pc = calcularPromedio(dividirVectores(a, vectorPropio));
    console.log(pc);
    return pc;
  }

  function calcularRC() {
    let n = matrixSize.rows;
    let ic = (promedioCriterio(matrix) - n) / (n - 1);
    let ia = (1.98 * (n - 2)) / n;
    return ic / ia;
  }

  function vectorPropio(matriz: any[][]) {
    let matrizCopia = dividirColumnas(
      matriz,
      sumarFilas(transponerMatriz(matriz))
    );
    let vectorPropio = promediosFilas(matrizCopia);
    return vectorPropio;
  }

  function matrixPropia(matriz: any[][][]): any[][] {
    let matrizPropia = [];
    for (let i = 0; i < matriz.length; i++) {
      matrizPropia.push(vectorPropio(matriz[i]));
    }
    return transponerMatriz(matrizPropia);
  }

  return (
    <div className="flex flex-col items-center justify-center  py-2">
      <h2 className="text-2xl my-4">Tabla Matrix Input</h2>
      <TablaMatrixControl
        dataSize={matrixSize}
        setDataSize={setMatrixSize}
        setData={setMatrix}
        isSquare={true}
        setMultiData={setMatrixCriterio}
      />
      <TablaMatrixImput
        data={matrix}
        setData={setMatrix}
        hcol={["A", "B", "C", "D", "E", "F", "G", "H"]}
        hrow={["1", "2", "3", "4", "5", "6", "7", "8"]}
      />
      <div className="grid grid-cols-3 grid-flow-row my-4">
        {matrix.map((_: any, index: number) => {
          return (
            <TablaMultiMatrixImput
              index={index}
              multiData={matrixCriterio}
              setMultiData={setMatrixCriterio}
              hcol={["A", "B", "C", "D", "E", "F", "G", "H"]}
              hrow={["1", "2", "3", "4", "5", "6", "7", "8"]}
              key={index}
            />
          );
        })}
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setRespuesta(calcularRC())}
      >
        Calcular
      </button>
      <h2 className="text-2xl my-4">Razon de Consistencia</h2>
      <p className="border border-gray-400 rounded-md p-2 m-0.5 w-20 h-10">
        {respuesta.toFixed(3)}
      </p>
      {respuesta < 0.1 ? <p>Es viable</p> : <p> No es viable</p>}
      <div className="flex flex-row justify-center items-center">
        <div>
          <TablaMatrixOutput
            data={matrixPropia(matrixCriterio)}
            hcol={["A", "B", "C", "D", "E", "F", "G", "H"]}
            hrow={["1", "2", "3", "4", "5", "6", "7", "8"]}
          />
        </div>
        <div>
          <p className="block font-bold text-5xl mx-4">X</p>
        </div>
        <TablaMatrixOutput
          data={transponerMatriz([vectorPropio(matrix)])}
          hcol={["A", "B", "C", "D", "E", "F", "G", "H"]}
          hrow={["1", "2", "3", "4", "5", "6", "7", "8"]}
        />
        <div>
          <p className="block font-bold text-5xl mx-4">=</p>
        </div>
        <TablaMatrixOutput
          data={transponerMatriz([
            multiplicarMatrizVector(
              matrixPropia(matrixCriterio),
              vectorPropio(matrix)
            ),
          ])}
          hcol={["A", "B", "C", "D", "E", "F", "G", "H"]}
          hrow={["1", "2", "3", "4", "5", "6", "7", "8"]}
          pintarmayor={true}
          mayor={Math.max(
            ...multiplicarMatrizVector(
              matrixPropia(matrixCriterio),
              vectorPropio(matrix)
            )
          )}
        />
      </div>
    </div>
  );
}
