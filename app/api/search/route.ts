import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const term = searchParams.get("term")

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Mock data
  const searchResults = [
    { name: "John Doe", cnic: "1234567890123", phone: "03001234567", purpose: "Financial Aid" },
    { name: "Jane Smith", cnic: "9876543210987", phone: "03009876543", purpose: "Medical Assistance" },
  ]

  return NextResponse.json(searchResults)
}

