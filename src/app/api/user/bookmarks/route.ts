import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prisma";

export async function GET(req: NextRequest, { params }: { params: { user: number } }) {
  const userId = params.user;

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

    const bookmarks = await prisma.bookmark.findMany({
      where: { authorId: userId },
    });

    return NextResponse.json({ data: bookmarks }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to load bookmarks" }, { status: 400 });
  }
}

export async function POST(req: NextRequest, { params }: { params: { user: number } }) {
  const { title, content } = await req.json();
  const userId = params.user;

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

    const new_bookmark = await prisma.bookmark.create({
      data: {
        title,
        content,
        authorId: userId,
      },
    });

    return NextResponse.json({ data: new_bookmark }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to bookmark posts" }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { user: number } }) {
  const { postId } = await req.json();
  const userId = params.user;

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

    const delete_bookmark = await prisma.bookmark.delete({
      where: { id: postId },
    });

    return NextResponse.json({ data: delete_bookmark }, { status: 203 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete bookmark" }, { status: 400 });
  }
}
