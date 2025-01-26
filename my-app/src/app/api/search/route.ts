import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const term = searchParams.get("term")

  await new Promise((resolve) => setTimeout(resolve, 1000))

  const searchResults = [
    { name: "Hamza", cnic: "4210163655237", phone: "03001234567", purpose: "Financial Aid" },
    { name: "Saeed", cnic: "4210145866325", phone: "03009876543", purpose: "Medical Assistance" },
  ]

  return NextResponse.json(searchResults)
}

