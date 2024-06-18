"use server";
import type { RowsType } from "../types/RowsType";
import { uni, erlang } from "./generatos";

export type Parameters = {
  simulaciones: number;
  minCorrect: number;
  maxCorrect: number;
};

export const onGenerate = async (data: Parameters) => {
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
    const estado = barraResult >= minCorrect && barraResult <= maxCorrect ? "Correcto" : "Defectuoso";
    if(estado === "Defectuoso") cantErr++;
    const promM = cantErr / i * 100;
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
  return result;
};
