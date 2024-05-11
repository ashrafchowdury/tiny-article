import { NextRequest, NextResponse } from "next/server";
import { gemini } from "@/libs/gemini";
import { CustomPromptSchema } from "@/libs/validations";

export async function POST(req: NextRequest) {
  const { prompt, userPrompt } = await req.json();
  const validateUserPrompt = CustomPromptSchema.safeParse(userPrompt);

  try {
    if (!validateUserPrompt.success) {
      throw new Error(validateUserPrompt.error.message);
    }

    if (!prompt) {
      throw new Error("Invalid request. No propmt found");
    }

    // generate posts
    const data = await gemini(prompt, validateUserPrompt.data);

    if (!data) {
      throw new Error("Unable to generate posts.");
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (error: any) {
    console.log("error message", error.message);
    return NextResponse.json(
      { message: "Encounter error while triyng to generate posts" },
      { status: 400 }
    );
  }
}
