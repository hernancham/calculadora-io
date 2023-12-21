"use client";
import { useState } from "react";
import {
  InputField,
  OutputField,
  ResolveButton,
} from "@/components/InputOutput";
import jStat from "jstat";

interface result {
  InventarioSeguridad: number;
  InventarioMaximo: number;
  CantidadOptimaPedido: number;
  FrecuenciaRevision: number;
}

/** Modelo de revisión periódica con demanda
    probabilística 

    https://www.youtube.com/watch?v=nMUENuwnyOU

    Habran 2 tipos de desarrollos:
*/
/*
1. Con Frecuencia de revision definida.
    DemPromedio         = Demanda Promedio (anual, mensual, diaria)
    desvEstandar        = Desv Estandar (anual, mensual, diaria) depende de la unidad que maneje Demanda promedio
    nivelServicio       = Nivel de Servicio (Probabilidad de tener stock)
    leadTime            = Lead Time (Tiempo de entrega)
    inventarioActual    = Inventario al momento de ejecutar la revision 
    frecuenciaRevision  = Frecuencia de revision (T)
*/

function revisionPeriodicaDemanProb_TD1(
  DemPromedio: number,
  desvEstandar: number,
  inventarioActual: number,
  frecuenciaRevision: number,
  leadTime: number,
  nivelServicio: number
): result {
  console.log(
    DemPromedio,
    desvEstandar,
    inventarioActual,
    frecuenciaRevision,
    leadTime,
    nivelServicio
  );
  // Encontrar el valor de Z
  const valorZ = jStat.normal.inv(nivelServicio, 0, 1);
  // Desviacion Estandar de Plazo
  let desvEstandarPlazo =
    desvEstandar * Math.sqrt(frecuenciaRevision + leadTime);
  // Inventario de Seguridad
  let inventarioSeguridad = desvEstandarPlazo * valorZ;
  // Demanda promedio del periodo de revision
  let demandaPromedioPeriodo = DemPromedio * (frecuenciaRevision + leadTime);
  console.log(demandaPromedioPeriodo);
  // Inventario Maximo
  let inventarioMaximo = demandaPromedioPeriodo + inventarioSeguridad;
  // Cantidad Optima de pedido (Q)
  let cantidadOptimaPedido = inventarioMaximo - inventarioActual;

  return {
    InventarioSeguridad: inventarioSeguridad,
    InventarioMaximo: inventarioMaximo,
    CantidadOptimaPedido: cantidadOptimaPedido,
    FrecuenciaRevision: frecuenciaRevision,
  };
}

/*
2. Con frecuencia de revision no definida.
  Aqui debemos hallar la frecuencia de revision. para ese se requiere:

  costoOrdenar        = Costo de Ordenar
  costoMantener       = Costo de mantener (anual, mensual, diaria) 
  DemPromedio         = Demanda Promedio (anual, mensual, diaria) Dependiendo del que intervalo maneje Costo de Mantener
  costoProducto       = Costo de Producto
  
  Luego procedemos como en el caso de frecuencia de revision definida.
  
  DemPromedio         = Demanda Promedio (anual, mensual, diaria)
  desvEstandar        = Desv Estandar (anual, mensual, diaria) depende de la unidad que maneje Demanda promedio
  nivelServicio       = Nivel de Servicio (Probabilidad de tener stock)
  leadTime            = Lead Time (Tiempo de entrega)
  inventarioActual    = Inventario al momento de ejecutar la revision 
*/
function revisionPeriodicaDemanProb_TD2(
  DemPromedio: number,
  tiempoLabAnual: number,
  desvEstandar: number,
  costoOrdenar: number,
  costoMantener: number,
  costoProducto: number,
  nivelServicio: number,
  inventarioActual: number,
  leadTime: number
): result {
  console.log(
    DemPromedio,
    tiempoLabAnual,
    desvEstandar,
    costoOrdenar,
    costoMantener,
    costoProducto,
    nivelServicio,
    inventarioActual,
    leadTime
  );
  // Frecuencia de revision
  let frecuenciaRevision = Math.sqrt(
    (2 * costoOrdenar) /
      (DemPromedio * tiempoLabAnual * costoMantener * costoProducto)
  );
  console.log(frecuenciaRevision);
  // Frecuencia de revision en unidades de tiempo de la Demanda promedio
  let frecu_tiempoLabAnual = frecuenciaRevision * tiempoLabAnual;
  console.log(frecu_tiempoLabAnual);
  // Encontrar el valor de Z
  const valorZ = jStat.normal.inv(nivelServicio, 0, 1);
  console.log(valorZ);
  // Desviacion Estandar de Plazo
  let desvEstandarPlazo =
    desvEstandar * Math.sqrt(frecu_tiempoLabAnual + leadTime);
  console.log(desvEstandarPlazo);
  // Inventario de Seguridad
  let inventarioSeguridad = desvEstandarPlazo * valorZ;
  console.log(inventarioSeguridad);
  // Demanda promedio del periodo de revision
  let demandaPromedioPeriodo = DemPromedio * (frecu_tiempoLabAnual + leadTime);
  console.log(demandaPromedioPeriodo);
  // Inventario Maximo
  let inventarioMaximo = demandaPromedioPeriodo + inventarioSeguridad;
  console.log(inventarioMaximo);
  // Cantidad Optima de pedido (Q)
  let cantidadOptimaPedido = inventarioMaximo - inventarioActual;
  console.log(cantidadOptimaPedido);
  return {
    FrecuenciaRevision: frecu_tiempoLabAnual,
    InventarioSeguridad: inventarioSeguridad,
    InventarioMaximo: inventarioMaximo,
    CantidadOptimaPedido: cantidadOptimaPedido,
  };
}
/*
** Calculos Resultantes:
  - Frecuencia de revision (en caso no se encuentre definida)
      Raiz((2 * Costo de Ordenar)/(Demanda Promedio * Costo de Mantener * Costo de Producto))
  - Desviacion Estandar de Plazo
      Desviacion Estandar * RAIZ (Frecuencia de revision + Lead Time)
  - Inventario de Seguridad
      Desviacion Estandar de Plazo * Valor Z
  - Demanda promedio del periodo de revision
      Demanda Promedio * (Frecuencia de revision + Lead Time)
  - Inventario Maximo
      Demanda promedio del periodo de revision + Inventario de Seguridad
  - Cantidad Optima de pedido (Q)
      Inventario Maximo - Inventario al momento de ejecutar la revision
*/

export default function ModeloDeInventarios() {
  //imput 1
  const [DemPromedio, setDemPromedio] = useState(0);
  const [desvEstandar, setDesvEstandar] = useState(0);
  const [inventarioActual, setInventarioActual] = useState(0);
  const [frecuenciaRevision, setFrecuenciaRevision] = useState(0);
  const [leadTime, setLeadTime] = useState(0);
  const [nivelServicio, setNivelServicio] = useState(0);

  //imput 2
  const [tiempoLabAnual, setTiempoLabAnual] = useState(0);
  const [costoOrdenar, setCostoOrdenar] = useState(0);
  const [costoMantener, setCostoMantener] = useState(0);
  const [costoProducto, setCostoProducto] = useState(0);

  //output
  const [InventarioSeguridad, setInventarioSeguridad] = useState(0);
  const [InventarioMaximo, setInventarioMaximo] = useState(0);
  const [CantidadOptimaPedido, setCantidadOptimaPedido] = useState(0);
  const [FrecuenciaRevision, setFrecuenciaRevision2] = useState(0);

  const handleClick = () => {
    const result = revisionPeriodicaDemanProb_TD1(
      DemPromedio,
      desvEstandar,
      inventarioActual,
      frecuenciaRevision,
      leadTime,
      nivelServicio
    );
    setInventarioSeguridad(result.InventarioSeguridad);
    setInventarioMaximo(result.InventarioMaximo);
    setCantidadOptimaPedido(result.CantidadOptimaPedido);
    setFrecuenciaRevision2(result.FrecuenciaRevision);
  };

  const handleClick2 = () => {
    const result = revisionPeriodicaDemanProb_TD2(
      DemPromedio,
      tiempoLabAnual,
      desvEstandar,
      costoOrdenar,
      costoMantener,
      costoProducto,
      nivelServicio,
      inventarioActual,
      leadTime
    );
    setInventarioSeguridad(result.InventarioSeguridad);
    setInventarioMaximo(result.InventarioMaximo);
    setCantidadOptimaPedido(result.CantidadOptimaPedido);
    setFrecuenciaRevision2(result.FrecuenciaRevision);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-slate-300 rounded-md shadow-md my-10">
      <h2 className="text-2xl font-semibold mb-4">EOQ Demanda Probable</h2>
      <div className="grid grid-cols-2 gap-10 md:gap-20">
        <div>
          <InputField
            label="Demanda Promedio"
            name="DemPromedio"
            value={DemPromedio}
            onChange={(e: any) => setDemPromedio(e.target.valueAsNumber)}
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
            label="Inventario Actual"
            name="inventarioActual"
            value={inventarioActual}
            onChange={(e: any) => setInventarioActual(e.target.valueAsNumber)}
            placeholder="Inventario Actual"
          />
          <InputField
            label="Frecuencia de Revision"
            name="frecuenciaRevision"
            value={frecuenciaRevision}
            onChange={(e: any) => setFrecuenciaRevision(e.target.valueAsNumber)}
            placeholder="Frecuencia de Revision"
          />
          <InputField
            label="Lead Time"
            name="leadTime"
            value={leadTime}
            onChange={(e: any) => setLeadTime(e.target.valueAsNumber)}
            placeholder="Lead Time"
          />
          <InputField
            label="Nivel de Servicio"
            name="nivelServicio"
            value={nivelServicio}
            onChange={(e: any) => setNivelServicio(e.target.valueAsNumber)}
            placeholder="Nivel de Servicio"
          />
          <ResolveButton funtionClick={handleClick} />
        </div>
        <div>
          <InputField
            label="Demanda Promedio"
            name="DemPromedio"
            value={DemPromedio}
            onChange={(e: any) => setDemPromedio(e.target.valueAsNumber)}
            placeholder="Demanda Promedio"
          />
          <InputField
            label="Tiempo Laboral Anual"
            name="tiempoLabAnual"
            value={tiempoLabAnual}
            onChange={(e: any) => setTiempoLabAnual(e.target.valueAsNumber)}
            placeholder="Tiempo Laboral Anual"
          />
          <InputField
            label="Desviacion Estandar"
            name="desvEstandar"
            value={desvEstandar}
            onChange={(e: any) => setDesvEstandar(e.target.valueAsNumber)}
            placeholder="Desviacion Estandar"
          />
          <InputField
            label="Costo de Ordenar"
            name="costoOrdenar"
            value={costoOrdenar}
            onChange={(e: any) => setCostoOrdenar(e.target.valueAsNumber)}
            placeholder="Costo de Ordenar"
          />
          <InputField
            label="Costo de Mantener"
            name="costoMantener"
            value={costoMantener}
            onChange={(e: any) => setCostoMantener(e.target.valueAsNumber)}
            placeholder="Costo de Mantener"
          />
          <InputField
            label="Costo de Producto"
            name="costoProducto"
            value={costoProducto}
            onChange={(e: any) => setCostoProducto(e.target.valueAsNumber)}
            placeholder="Costo de Producto"
          />
          <InputField
            label="Nivel de Servicio"
            name="nivelServicio"
            value={nivelServicio}
            onChange={(e: any) => setNivelServicio(e.target.valueAsNumber)}
            placeholder="Nivel de Servicio"
          />
          <InputField
            label="Inventario Actual"
            name="inventarioActual"
            value={inventarioActual}
            onChange={(e: any) => setInventarioActual(e.target.valueAsNumber)}
            placeholder="Inventario Actual"
          />
          <InputField
            label="Lead Time"
            name="leadTime"
            value={leadTime}
            onChange={(e: any) => setLeadTime(e.target.valueAsNumber)}
            placeholder="Lead Time"
          />
          <ResolveButton funtionClick={handleClick2} />
        </div>
      </div>
      <OutputField
        label="Inventario de Seguridad"
        value={InventarioSeguridad.toFixed(2)}
      />
      <OutputField
        label="Inventario Maximo"
        value={InventarioMaximo.toFixed(2)}
      />
      <OutputField
        label="Cantidad Optima de Pedido (Q)"
        value={CantidadOptimaPedido.toFixed(2)}
      />
      <OutputField
        label="Frecuencia de Revision"
        value={FrecuenciaRevision.toFixed(2)}
      />
    </div>
  );
}
