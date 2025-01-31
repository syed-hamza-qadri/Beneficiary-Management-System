import { NextResponse } from "next/server"

export async function GET() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Mock data
  const activity = [
    { name: "Financial Aid", visitors: 50, completed: 35 },
    { name: "Medical Assistance", visitors: 30, completed: 25 },
    { name: "Education Support", visitors: 40, completed: 30 },
    { name: "Other", visitors: 30, completed: 20 },
  ]

  return NextResponse.json(activity)
}

