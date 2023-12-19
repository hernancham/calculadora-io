"use client";
import React, { useState } from "react";
import { TablaCriterios } from "@/components/TablaCriterios";
import { TablaMatrixControl, TablaMatrixImput } from "@/components/TablaMatrix";

export default function TeoriaDecisisonesPage() {
  const [matrixSize, setMatrixSize] = useState({
    rows: 2,
    columns: 2,
  });

  const [matrix, setMatrix] = useState([
    [0, 0],
    [0, 0],
  ]);

  const [respuesta, setRespuesta] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center  py-2">
      <h2 className="text-2xl my-4">Tabla Matrix Input</h2>
      <TablaMatrixControl
        dataSize={matrixSize}
        setDataSize={setMatrixSize}
        setData={setMatrix}
      />
      <TablaMatrixImput
        data={matrix}
        setData={setMatrix}
        hcol={["A", "B", "C", "D", "E", "F", "G", "H"]}
        hrow={["1", "2", "3", "4", "5", "6", "7", "8"]}
      />
      <h2 className="text-2xl my-4">Tabla Criterios de Desicion</h2>
      <TablaCriterios
        data={matrix}
        actividades={["1", "2", "3", "4", "5", "6", "7", "8"]}
      />
    </div>
  );
}
