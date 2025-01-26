import { NextResponse } from "next/server";

export async function GET() {

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const activities = [
    {
      id: "1",
      type: "registration",
      description: "New beneficiary registered: John Doe",
      timestamp: "2023-05-15 14:30",
    },
    {
      id: "2",
      type: "scan",
      description: "Token scanned: ABC123",
      timestamp: "2023-05-15 14:15",
    },
    {
      id: "3",
      type: "update",
      description: "Beneficiary details updated: Jane Smith",
      timestamp: "2023-05-15 13:45",
    },
    {
      id: "4",
      type: "registration",
      description: "New beneficiary registered: Alice Johnson",
      timestamp: "2023-05-15 13:30",
    },
    {
      id: "5",
      type: "scan",
      description: "Token scanned: XYZ789",
      timestamp: "2023-05-15 13:00",
    },
  ];

  return NextResponse.json(activities);
}
