import { NextRequest, NextResponse } from "next/server";
import { generate_posts } from "@/libs/ai";

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  try {
    if (!prompt) {
      throw new Error("Invalid request. No propmt found");
    }

    const data = await generate_posts(prompt);


    if (!data) {
      throw new Error("Unable to generate posts.");
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (error: any) {
    console.log("error message", error.message);
    return NextResponse.json({ message: "Encounter error while triyng to generate posts" }, { status: 400 });
  }
}
