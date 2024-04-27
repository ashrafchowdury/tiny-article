import { NextRequest, NextResponse } from "next/server";
import { cachePosts, getPostBatches } from "./cache-algorithm";
import prisma from "@/libs/prisma";


export async function GET(req: NextRequest) {
  const { userId } = await req.json();
  try {
    if (!userId) {
      throw new Error("Unothorized request!");
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("Invalid user!");
    }

    const posts = await getPostBatches(userId);

    return NextResponse.json({ data: posts }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to load posts" }, { status: 400 });
  }
}

export async function POST(req: NextRequest) {
  const { userId, posts } = await req.json();
  try {
    if (!userId) {
      throw new Error("Unothorized request!");
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("Invalid user id");
    }

    await cachePosts(userId, posts)

    return NextResponse.json({message: 'Posts get cached for 24 hours'}, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save posts" }, { status: 400 });
  }
}