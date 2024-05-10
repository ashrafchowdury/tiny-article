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

    const findCustomPrompt = await prisma.prompt.findFirst({
      where: { authorId: userId },
    });

    const properties = {
      prompt,
      voice,
      isFormatPost: utilities.format,
      isEmoji: utilities.emoji,
      isHashtag: utilities.hashtag,
      isAutoSavePost: utilities.save,
    };

    const newCustomPrompt = await prisma.prompt.upsert({
      where: { id: findCustomPrompt?.id },
      update: {
        ...properties,
      },
      create: {
        authorId: userId,
        ...properties,
      },
    });

    return NextResponse.json({ data: newCustomPrompt }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
