import { NextRequest, NextResponse } from "next/server";
import {
  cachePosts,
  getPostBatches,
} from "@/helpers/algorithms/cache-algorithm";
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

    return NextResponse.json(posts, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
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

    return NextResponse.json(newHistory, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
