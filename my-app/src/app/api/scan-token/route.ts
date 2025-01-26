import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const beneficiaryData = {
    name: "Hamza",
    cnic: "4210163655237",
    purpose: "Financial Aid",
    status: "In Progress",
  };

  return NextResponse.json(beneficiaryData);
}
