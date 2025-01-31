import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Mock data
  const beneficiaryData = {
    name: "John Doe",
    cnic: "1234567890123",
    purpose: "Financial Aid",
    status: "In Progress",
  }

  return NextResponse.json(beneficiaryData)
}

