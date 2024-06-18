import { on } from "events";
import { NextResponse, NextRequest } from "next/server";
import { onGenerate } from "@/app/actions/onGenerate";
import { uni, erlang } from "@/app/actions/generatos";
import { RowsType } from "@/app/types/RowsType";

export async function POST(req: NextRequest) {
  const data = await req.json();
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
  
  return NextResponse.json(
    { result },
    {
      status: 200,
    }
  );
}
