import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const body = await request.json()
  const { reportType, dateRange } = body

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // Mock report generation
  const reportUrl = `/mock-reports/${reportType}-${dateRange.start}-${dateRange.end}.pdf`

  return NextResponse.json({ reportUrl })
}

