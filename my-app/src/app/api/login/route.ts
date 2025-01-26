import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (email === "admin@example.com" && password === "password") {
    return NextResponse.json({ success: true, message: "Login successful" });
  } else {
    return NextResponse.json(
      { success: false, message: "Invalid email or password" },
      { status: 401 }
    );
  }
}
