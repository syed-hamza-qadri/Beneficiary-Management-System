import { NextResponse } from "next/server";

const users = [
  { name: "Admin User", email: "admin@gmail.com", role: "admin" },
  {
    name: "Reception Staff",
    email: "reception@gmail.com",
    role: "receptionist",
  },
];

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const newUser = await request.json();

  await new Promise((resolve) => setTimeout(resolve, 1000));

  users.push(newUser);

  return NextResponse.json(newUser);
}
