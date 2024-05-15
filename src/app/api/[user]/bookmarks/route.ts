import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import { PostSchema } from "@/libs/validations";

export async function GET(
  req: NextRequest,
  { params }: { params: { user: string } }
) {
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
      where: { authorId: user.id },
    });

    return NextResponse.json({ data: bookmarks }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load bookmarks" },
      { status: 400 }
    );
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
        id: validateData.data.id,
        title: validateData.data.title,
        content: validateData.data.content,
        authorId: user.id,
      },
      select: { authorId: false, id: true, title: true, content: true },
    });

    return NextResponse.json({ data: new_bookmark }, { status: 201 });
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
    return NextResponse.json(
      { error: "Failed to delete bookmark" },
      { status: 400 }
    );
  }
}
