import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const body = await request.json()
  const { name, email, password } = body

  await new Promise((resolve) => setTimeout(resolve, 1000))

  if (email === "admin@gmail.com") {
    return NextResponse.json({ success: false, message: "Email already in use" }, { status: 400 })
  } else {
    return NextResponse.json({ success: true, message: "Sign-up successful" })
  }
}

