import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const body = await request.json()

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Mock response
  const response = {
    success: true,
    message: "Beneficiary registered successfully",
    token: "ABC123", // This would be a unique token in a real system
  }

  return NextResponse.json(response)
}

