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
    <div>
      <label htmlFor="cantidad">Cantidad de Actividades:</label>
      <input
        type="number"
        id="cantidad"
        value={cantidadActividades}
        onChange={handleCantidadChange}
      />

      <div>
        {duracionActividades.map((duracion, index) => (
          <input
            key={index}
            type="number"
            value={duracion}
            onChange={(e) => handleDuracionChange(index, e)}
          />
        ))}
      </div>

      <button onClick={resolverCPM}>Resolver</button>

      {rutaCritica.length > 0 && (
        <div>
          <h2>Ruta Crítica:</h2>
          <ul>
            {rutaCritica.map((actividadIndex) => (
              <li key={actividadIndex}>Actividad {actividadIndex}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
