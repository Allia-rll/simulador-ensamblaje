import { RowsType } from "../types/RowsType";

interface TableProps {
  data: RowsType[];
}

export default function Table({ data }: TableProps) {
  return (
    <div className="relative overflow-x-auto overflow-y-auto shadow-md sm:rounded-lg">
      <table className="w-full h-full text-sm text-left rtl:text-right text-gray-500 dark:text-white">
        <thead className="text-sm text-gray-700 sticky top-0 uppercase bg-gray-50 dark:bg-gray-700 dark:text-white">
          <tr>
            <th scope="col" className="px-5 py-3">
              Nº
            </th>
            <th scope="col" className="px-5 py-3">
              NA1
            </th>
            <th scope="col" className="px-5 py-3">
              Barra A
            </th>
            <th scope="col" className="px-5 py-3">
              NA2
            </th>
            <th scope="col" className="px-5 py-3">
              NA3
            </th>
            <th scope="col" className="px-5 py-3">
              NA4
            </th>
            <th scope="col" className="px-5 py-3">
              NA5
            </th>
            <th scope="col" className="px-5 py-3">
              Barra B
            </th>
            <th scope="col" className="px-5 py-3">
              Barra Resultante
            </th>
            <th scope="col" className="px-5 py-3">
              Estado
            </th>
            <th scope="col" className="px-5 py-3">
              Cantidad de errores
            </th>
            <th scope="col" className="px-5 py-3">
              Promedio movil
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={row.n}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="px-5 py-4">{row.n}</td>
              <td className="px-5 py-4">{row.na1.toString().slice(0,5)}</td>
              <td className="px-5 py-4">{row.barraA.toString().slice(0,5)}</td>
              <td className="px-5 py-4">{row.na2.toString().slice(0,5)}</td>
              <td className="px-5 py-4">{row.na3.toString().slice(0,5)}</td>
              <td className="px-5 py-4">{row.na4.toString().slice(0,5)}</td>
              <td className="px-5 py-4">{row.na5.toString().slice(0,5)}</td>
              <td className="px-5 py-4">{row.barraB.toString().slice(0,5)}</td>
              <td className="px-5 py-4">{row.barraResult.toString().slice(0,5)}</td>
              <td className="px-5 py-4">{row.estado}</td>
              <td className="px-5 py-4">{row.cantErr}</td>
              <td className="px-5 py-4">{row.promM.toString().slice(0,5)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
