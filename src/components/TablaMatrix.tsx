import { useState } from "react";

export const TablaMatrixImput = ({
  data,
  setData,
  hcol,
  hrow,
}: {
  data: any[][];
  setData: any;
  hcol: any[];
  hrow: any[];
}) => {
  const handleInputChange = (row: number, col: number, event: any) => {
    const newData = [...data];
    newData[row][col] = !isNaN(parseFloat(event.target.value))
      ? parseFloat(event.target.value)
      : 0;
    setData(newData);
  };

  return (
    <table>
      <thead>
        <tr>
          <th></th>
          {data[0].map((col: any[], ic: number) => (
            <th className="text-center" key={ic}>
              {hcol[ic]}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row: any[], ir: number) => (
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

export const TablaMatrixControl = ({
  dataSize,
  setDataSize,
  setData,
  isSquare,
  setMultiData,
}: {
  dataSize: {
    rows: number;
    columns: number;
  };
  setDataSize: any;
  setData: any;
  isSquare?: boolean;
  setMultiData?: any;
}) => {
  return (
    <div className="grid-cols-2 mb-4">
      {isSquare ? (
        <>
          <input
            className="border border-gray-400 rounded-md p-2 m-0.5 w-20"
            type="number"
            defaultValue={dataSize.rows}
            onChange={(event) =>
              setDataSize({
                rows: parseInt(event.target.value),
                columns: parseInt(event.target.value),
              })
            }
          />
          <button
            className="border border-gray-400 bg-blue-200 hover:bg-blue-400 rounded-md p-2 m-0.5 w-20"
            onClick={() => {
              setData(
                Array.from({ length: dataSize.rows }, () =>
                  Array.from({ length: dataSize.columns }, () => 1)
                )
              );
              setMultiData(
                Array.from({ length: dataSize.rows }, () =>
                  Array.from({ length: dataSize.rows }, () =>
                    Array.from({ length: dataSize.columns }, () => 1)
                  )
                )
              );
            }}
          >
            Generar
          </button>
        </>
      ) : (
        <>
          <input
            className="border border-gray-400 rounded-md p-2 m-0.5 w-20"
            type="number"
            defaultValue={dataSize.rows}
            onChange={(event) =>
              setDataSize({
                rows: parseInt(event.target.value),
                columns: dataSize.columns,
              })
            }
          />
          <input
            className="border border-gray-400 rounded-md p-2 m-0.5 w-20"
            type="number"
            defaultValue={dataSize.columns}
            onChange={(event) =>
              setDataSize({
                rows: dataSize.rows,
                columns: parseInt(event.target.value),
              })
            }
          />
          <button
            className="border border-gray-400 bg-blue-200 hover:bg-blue-400 rounded-md p-2 m-0.5 w-20"
            onClick={() => {
              setData(
                Array.from({ length: dataSize.rows }, () =>
                  Array.from({ length: dataSize.columns }, () => 1)
                )
              );
            }}
          >
            Generar
          </button>
        </>
      )}
    </div>
  );
};
