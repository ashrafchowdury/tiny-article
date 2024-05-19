import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import { PostSchema } from "@/libs/validations";
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

    const bookmarks = await prisma.bookmark.findMany({
      where: { authorId: userId },
    });

    return NextResponse.json(bookmarks, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { user: string } }
) {
  const data = await req.json();
  const validateData = PostSchema.safeParse(data);
  const userId = params.user;

  try {
    if (!validateData.success) {
      throw new Error(validateData?.error.message);
    }

    if (!userId || userId !== auth().userId) {
      throw new Error("Unothorized request!");
    }

    const new_bookmark = await prisma.bookmark.create({
      data: {
        id: validateData.data.id,
        title: validateData.data.title,
        content: validateData.data.content,
        authorId: userId,
      },
      select: { authorId: false, id: true, title: true, content: true },
    });

    return NextResponse.json(new_bookmark, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { user: string } }
) {
  const { postId } = await req.json();
  const userId = params.user;

  try {
    if (!userId || userId !== auth().userId) {
      throw new Error("Unothorized request!");
    }

    const delete_bookmark = await prisma.bookmark.delete({
      where: { id: postId },
    });

    return NextResponse.json(delete_bookmark, { status: 203 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
