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

    return NextResponse.json({ data: user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to load bookmarks" }, { status: 400 });
  }
}

export async function POST(req: NextRequest, { params }: { params: { user: number } }) {
  const { username, email } = await req.json();
  const userId = params.user;

  try {
    if (!userId) {
      throw new Error("Unothorized request!");
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (user) {
      throw new Error("User with same email already exist");
    }

    const new_user = await prisma.user.create({
      data: {
        id: userId,
        username,
        email,
      },
    });

    return NextResponse.json({ data: new_user }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to bookmark posts" }, { status: 400 });
  }
}
