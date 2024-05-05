import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prisma";

export async function GET(req: NextRequest, { params }: { params: { user: string } }) {
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

    const prompt = await prisma.prompt.findFirst({
      where: { authorId: userId },
    });

    return NextResponse.json({ data: prompt }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to load custom prompt" }, { status: 400 });
  }
}

export async function POST(req: NextRequest, { params }: { params: { user: string } }) {
  const { prompt, voice, utilities } = await req.json();
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

    const createCustomPrompt = await prisma.prompt.create({
      data: {
        authorId: userId,
        prompt,
        voice,
        isFormatPost: utilities.format,
        isEmoji: utilities.emoji,
        isHashtag: utilities.hashtag,
        isAutoSavePost: utilities.save,
      },
    });

    return NextResponse.json({ data: createCustomPrompt }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
