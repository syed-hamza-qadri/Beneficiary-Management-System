import { NextResponse } from "next/server"

export async function GET() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Mock data
  const metrics = {
    totalVisitors: 150,
    newBeneficiaries: 45,
    returningBeneficiaries: 105,
  }

  return NextResponse.json(metrics)
}

