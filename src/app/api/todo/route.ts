import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(request: NextRequest) {
  const { rows } = await sql`SELECT * from todos`;

  return NextResponse.json({ message: rows });
}

export async function POST(request: NextRequest) {
  const req = await request.json();
  const { rows } = await sql`INSERT INTO todos (title) VALUES(${req})`;
  console.log("rows", rows);

  return NextResponse.json({ message: "Todo added successfully" });
}
