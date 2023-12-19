export const TablaMatrixOutput = ({
  data,
  hcol,
  hrow,
  pintarmayor,
  mayor,
}: {
  data: any[][];
  hcol: any[];
  hrow: any[];
  pintarmayor?: boolean;
  mayor?: number;
}) => {
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
            {row.map((column: any, ic: number) => {
              return (
                <td key={ic}>
                  {pintarmayor ? (
                    <p
                      className={`${
                        column === mayor ? "bg-lime-200" : ""
                      } border border-gray-400 rounded-md p-2 m-0.5 w-20`}
                    >
                      {column.toFixed(2)}
                    </p>
                  ) : (
                    <p className="border border-gray-400 rounded-md p-2 m-0.5 w-20">
                      {column.toFixed(2)}
                    </p>
                  )}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
