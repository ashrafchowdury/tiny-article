import { NextRequest, NextResponse } from "next/server";
import { gemini } from "@/libs/gemini";

export async function POST(req: NextRequest) {
  const { prompt, userPrompt } = await req.json();

  try {
    if (!prompt) {
      throw new Error("Invalid request. No propmt found");
    }

    // generate posts
    const data = await gemini(prompt, userPrompt);

    if (!data) {
      throw new Error("Unable to generate posts.");
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (error: any) {
    console.log("error message", error.message);
    return NextResponse.json({ message: "Encounter error while triyng to generate posts" }, { status: 400 });
  }
}
