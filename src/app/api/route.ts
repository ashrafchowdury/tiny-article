import { NextRequest, NextResponse } from "next/server";

// Get all user invitations
export async function GET(req: NextRequest) {
  try {
    return NextResponse.json({ message: "hello world" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "something went worng!" }, { status: 400 });
  }
}
