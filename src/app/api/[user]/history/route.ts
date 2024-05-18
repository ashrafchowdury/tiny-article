import { NextRequest, NextResponse } from "next/server";
import { cachePosts, getPostBatches } from "./cache-algorithm";
import prisma from "@/libs/prisma";
import { PostsSchema } from "@/libs/validations";
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

    const posts = await getPostBatches(userId);

    return NextResponse.json({ data: posts }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load history" },
      { status: 400 }
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { user: string } }
) {
  const { posts } = await req.json();
  const validateData = PostsSchema.safeParse(posts);
  const userId = params.user;

  try {
    if (!validateData.success) {
      throw new Error(validateData.error.message);
    }

    if (!userId || userId !== auth().userId) {
      throw new Error("Unothorized request!");
    }

    const newHistory = await cachePosts(userId, validateData.data);

    return NextResponse.json({ data: newHistory }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to save posts" },
      { status: 400 }
    );
  }
}
