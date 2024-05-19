import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { user: string } }
) {
  const userId = params.user;

  try {
    if (!userId || userId !== auth().userId) {
      throw new Error("Unothorized request!");
    }

    const user = await currentUser();

    return NextResponse.json({ data: user }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
