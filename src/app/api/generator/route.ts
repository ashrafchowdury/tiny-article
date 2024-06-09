import { NextRequest, NextResponse } from "next/server";
import { gemini } from "@/libs/gemini";
import { CustomPromptSchema } from "@/libs/validations";
import cache from "@/libs/cache";
import { MAX_USAGE_LIMIT } from "@/utils/constant";

export async function POST(req: NextRequest) {
  const { prompt, userPrompt, userId, type } = await req.json();
  const validateUserPrompt = CustomPromptSchema.safeParse(userPrompt);

  try {
    if (!validateUserPrompt.success) {
      throw new Error(validateUserPrompt.error.message);
    }

    if (!prompt || !userId) {
      throw new Error("Invalid request. No propmt found");
    }

    const totalUsage = (await cache.get(`limit:${userId}`)) as number;

    if (totalUsage >= MAX_USAGE_LIMIT) {
      throw new Error("You have reached your daily limit");
    }

    // generate posts
    const data = await gemini({
      prompt,
      type,
      userPrompt: validateUserPrompt.data,
    });

    if (!data) {
      throw new Error("Unable to generate posts.");
    }

    if (totalUsage === null) {
      await cache.setex(`limit:${userId}`, 86400, 1); // 24 hours in seconds
    } else {
      await cache.incrby(`limit:${userId}`, 1);
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
