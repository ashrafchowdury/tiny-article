import { NextRequest, NextResponse } from "next/server";
// import cache from "@/libs/cache";
import { auth } from "@clerk/nextjs/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { user: string } }
) {
  const userId = params.user;

  try {
    if (!userId || userId !== auth().userId) {
      throw new Error("Unothorized request!");
    }

    // const totalUsage = (await cache.get(`limit:${userId}`)) as number;
    const totalUsage = null;

    return NextResponse.json(totalUsage == null ? 0 : totalUsage, {
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
