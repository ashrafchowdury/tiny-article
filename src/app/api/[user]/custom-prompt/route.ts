import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import { CustomPromptSchema } from "@/libs/validations";

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
  const data = await req.json();
  const validateData = CustomPromptSchema.safeParse(data);
  const userId = params.user;

  try {
    if (!validateData.success) {
      throw new Error(validateData.error.message);
    }

    if (!userId) {
      throw new Error("Unothorized request!");
    }

    const findCustomPrompt = await prisma.prompt.findFirst({
      where: { authorId: userId },
    });

 
    const newCustomPrompt = await prisma.prompt.upsert({
      where: { id: findCustomPrompt?.id },
      update: {
        ...validateData.data,
      },
      create: {
        authorId: userId,
        ...validateData.data,
      },
    });

    return NextResponse.json({ data: newCustomPrompt }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
