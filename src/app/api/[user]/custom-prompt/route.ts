import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import { CustomPromptSchema } from "@/libs/validations";
import { auth } from "@clerk/nextjs/server";
import { defaultUserPromptSettings } from "@/utils/constant";

export async function GET(
  req: NextRequest,
  { params }: { params: { user: string } }
) {
  const userId = params.user;

  try {
    if (!userId || userId !== auth().userId) {
      throw new Error("Unothorized request!");
    }

    const prompt = await prisma.prompt.findFirst({
      where: { authorId: userId },
    });

    return NextResponse.json(prompt ?? defaultUserPromptSettings, {
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { user: string } }
) {
  const data = await req.json();
  const validateData = CustomPromptSchema.safeParse(data);
  const userId = params.user;

  try {
    if (!validateData.success) {
      throw new Error(validateData.error.message);
    }

    if (!userId || userId !== auth().userId) {
      throw new Error("Unothorized request!");
    }

    const newCustomPrompt = await prisma.prompt.upsert({
      where: { authorId: userId },
      update: {
        ...validateData.data,
      },
      create: {
        authorId: userId,
        ...validateData.data,
      },
    });

    return NextResponse.json(newCustomPrompt, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
