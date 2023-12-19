"use client";
import React from "react";
import { useState } from "react";

export default function ModeloRedesPage() {
  const [cantidadActividades, setCantidadActividades] = useState(0);
  const [duracionActividades, setDuracionActividades] = useState(
    Array.from({ length: cantidadActividades }, () => 0)
  );
  const [rutaCritica, setRutaCritica] = useState([]);

  const handleCantidadChange = (event: any) => {
    const cantidad = parseInt(event.target.value, 10);
    setCantidadActividades(cantidad);
    setDuracionActividades(Array.from({ length: cantidad }, () => 0));
  };

  const handleDuracionChange = (index: number, event: any) => {
    const nuevasDuraciones = [...duracionActividades];
    nuevasDuraciones[index] = parseInt(event.target.value, 10);
    setDuracionActividades(nuevasDuraciones);
  };

  const resolverCPM = () => {
    // Lógica para resolver el método de la Ruta Crítica con las duraciones de actividades
    // Aquí deberías implementar el algoritmo CPM con los datos ingresados

    // Por ahora, aquí se simulará una respuesta aleatoria para mostrar el concepto
    const rutaCriticaSimulada = duracionActividades.map(
      (duracion, index) => index
    );
    //setRutaCritica(rutaCriticaSimulada);
  };

  return (
    <div className="container">
      <div className="flex flex-row items-center justify-center mt-20">
        <div className="flex flex-row items-center justify-center bg-slate-700 rounded-lg h-40 w-60">
          <input className="bg-slate-200 w-16"></input>
        </div>
      </div>
    </div>
  );
}
