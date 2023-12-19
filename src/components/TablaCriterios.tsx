import React from "react";

export const TablaCriterios = ({
  data,
  actividades,
}: {
  data: any[][];
  actividades: any[];
}) => {
  const [alpha, setAlpha] = React.useState(0.5);

  const calcularSavagePersonalizado = () => {
    let matrixSavage: any[][] = data.map((fila) => fila.slice());
    const f = data.length;
    const c = data[0].length;
    for (let i = 0; i < c; i++) {
      let arrayColumna: any[] = [];
      for (let j = 0; j < f; j++) {
        arrayColumna.push(matrixSavage[j][i]);
      }
      for (let j = 0; j < f; j++) {
        matrixSavage[j][i] = Math.max(...arrayColumna) - matrixSavage[j][i];
      }
    }
    return matrixSavage.map((row) => Math.max(...row));
  };

  const calcularMinimo = (fila: any[]) => Math.min(...fila);
  const calcularMaximo = (fila: any[]) => Math.max(...fila);
  const calcularPromedio = (fila: any[]) =>
    fila.reduce((a, b) => a + b, 0) / fila.length;
  const calcularHurwics = (fila: any[]) =>
    calcularMaximo(fila) * alpha + calcularMinimo(fila) * (1 - alpha);
  const calcularSavage = (fila: any[]) =>
    calcularMaximo(fila) - calcularMinimo(fila);

  const resultados = {
    minimo: data.map((row) => calcularMinimo(row)),
    maximo: data.map((row) => calcularMaximo(row)),
    promedio: data.map((row) => calcularPromedio(row)),
    hurwics: data.map((row) => calcularHurwics(row)),
    savage: calcularSavagePersonalizado(), // Utiliza la nueva función
  };

  return (
    <>
      <table className="w-1/2 table-auto bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border-b">Actividades</th>
            <th className="py-2 px-4 border-b">Pesimista</th>
            <th className="py-2 px-4 border-b">Optimista</th>
            <th className="py-2 px-4 border-b">Laplace</th>
            <th className="py-2 px-4 border-b">Hurwics</th>
            <th className="py-2 px-4 border-b">Savage</th>
          </tr>
        </thead>
        <tbody>
          {data.map((_, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
            >
              <td className="py-2 px-4 border-b bg-gray-200 text-center font-bold">
                {actividades[index]}
              </td>
              <td
                className={`${
                  resultados.minimo[index] == Math.max(...resultados.minimo)
                    ? "bg-lime-200"
                    : ""
                } py-2 px-4 border-b`}
              >
                {Number.isInteger(resultados.minimo[index])
                  ? resultados.minimo[index]
                  : resultados.minimo[index].toFixed(2)}
              </td>
              <td
                className={`${
                  resultados.maximo[index] == Math.max(...resultados.maximo)
                    ? "bg-lime-200"
                    : ""
                } py-2 px-4 border-b`}
              >
                {Number.isInteger(resultados.maximo[index])
                  ? resultados.maximo[index]
                  : resultados.maximo[index].toFixed(2)}
              </td>
              <td
                className={`${
                  resultados.promedio[index] == Math.max(...resultados.promedio)
                    ? "bg-lime-200"
                    : ""
                } py-2 px-4 border-b`}
              >
                {Number.isInteger(resultados.promedio[index])
                  ? resultados.promedio[index]
                  : resultados.promedio[index].toFixed(2)}
              </td>
              <td
                className={`${
                  resultados.hurwics[index] == Math.max(...resultados.hurwics)
                    ? "bg-lime-200"
                    : ""
                } py-2 px-4 border-b`}
              >
                {Number.isInteger(resultados.hurwics[index])
                  ? resultados.hurwics[index]
                  : resultados.hurwics[index].toFixed(2)}
              </td>
              <td
                className={`${
                  resultados.savage[index] == Math.min(...resultados.savage)
                    ? "bg-lime-200"
                    : ""
                } py-2 px-4 border-b`}
              >
                {Number.isInteger(resultados.savage[index])
                  ? resultados.savage[index]
                  : resultados.savage[index].toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex flex-col items-center justify-center my-4">
        <label className="text-xl">Alpha</label>
        <input
          className="border border-gray-400 rounded-md p-2 m-0.5 w-20"
          type="number"
          defaultValue={alpha}
          onChange={(event) => setAlpha(parseFloat(event.target.value))}
          min={0}
          max={1}
          step={0.01}
        />
      </div>
    </>
  );
};
