"use client";

import Table from "./components/Table";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { RowsType } from "./types/RowsType";
import { uni, erlang } from "./actions/generatos";

type Parameters = {
  simulaciones: number;
  minCorrect: number;
  maxCorrect: number;
};

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Parameters>();
  const [data, setData] = useState<RowsType[]>([]);
  const onSubmit: SubmitHandler<Parameters> = async (data) => {
    const { simulaciones, minCorrect, maxCorrect } = data;

    let result: RowsType[] = [];
    let cantErr = 0;

    for (let i = 1; i <= simulaciones; i++) {
      let data: RowsType;
      const na1 = Math.random();
      const barraA = uni.generate(na1);
      const na2 = Math.random();
      const na3 = Math.random();
      const na4 = Math.random();
      const na5 = Math.random();
      const barraB = erlang.generate([na2, na3, na4, na5]);
      const barraResult = barraA + barraB;
      const estado =
        barraResult >= minCorrect && barraResult <= maxCorrect
          ? "Correcto"
          : "Defectuoso";
      if (estado === "Defectuoso") cantErr++;
      const promM = (cantErr / i) * 100;
      data = {
        n: i,
        na1,
        barraA,
        na2,
        na3,
        na4,
        na5,
        barraB,
        barraResult,
        estado,
        cantErr,
        promM,
      };
      result.push(data);
    }
    setData(result);
  };

  return (
    <main className="dark flex h-lvh flex-col items-center p-4 bg-slate-800">
      <h1 className="text-white py-2 font-bold text-xl">
        SIMULADOR DE CORRIDAS
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex w-full h-16">
          <div className="relative z-0 w-full my-2 ml-10 group">
            <input
              type="number"
              id="simulaciones"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              {...register("simulaciones", {
                required: {
                  value: true,
                  message: "El numero de simulaciones es incorrecto",
                },
                min: 1,
              })}
            />
            <label
              htmlFor="simulaciones"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Numero de simulaciones
            </label>
          </div>
          <div className="relative z-0 w-full my-2 ml-10 group">
            <input
              type="number"
              id="minCorrect"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              {...register("minCorrect", {
                required: {
                  value: true,
                  message: "El minimo aceptable es incorrecto",
                },
                min: {
                  value: 1,
                  message: "El minimo aceptable debe ser mayor a 0",
                },
              })}
            />
            <label
              htmlFor="minCorrect"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Minimo aceptable
            </label>
          </div>
          <div className="relative z-0 w-full my-2 ml-10 group">
            <input
              type="number"
              id="maxCorrect"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              {...register("maxCorrect", {
                required: {
                  value: true,
                  message: "El maximo aceptable debe establecerse",
                },
              })}
            />
            <label
              htmlFor="max-correct"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Maximo aceptable
            </label>
          </div>
          <div className="py-2 px-4">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Simular
            </button>
          </div>
        </div>
      </form>
      {(errors.minCorrect || errors.maxCorrect || errors.simulaciones) && (
        <span className="text-red-600 py-2">
          {errors.minCorrect?.message ||
            errors.maxCorrect?.message ||
            errors.simulaciones?.message}
        </span>
      )}
      <div className="w-full h-5/6 py-4 max-w-6xl justify-between font-mono text-lg lg:flex">
        <Table data={data} />
      </div>
    </main>
  );
}
