import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { POST_PROPMT } from "@/utils/prompt";
import { CUSTOM_PROMPT_TYPE } from "@/utils/types";

// constant variables
export const MODEL_NAME = process.env.GEMINI_API_MODEL as string;
export const API_KEY = process.env.GEMINI_API_KEY as string;

// configurations
export const generationConfig = {
  temperature: 1,
  topK: 0,
  topP: 0.95,
  maxOutputTokens: 8192,
};

export const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

export async function gemini(prompt: string, userPrompt: CUSTOM_PROMPT_TYPE) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const parts = [
    { text: `input: ${prompt}` },
    {
      text: `output: ${POST_PROPMT} ${userPrompt.prompt && `Here is the user prompt: ${userPrompt.prompt}`}. ${userPrompt.isEmoji ? "The posts should include emojis in the end of the sentence" : ""}, ${userPrompt.isHashtag ? "2 hashtag related to the posts" : ""}. Format the post by adding each paragraph as an array element, and then if the posts has a to show list of bullet points then use * before each item (example - usability principles: * Learnability, * Efficiency, * Memorability, * Errors, * User Satisfaction.) must add the list items in a separate array element, don't over use bullet points, use it when needed. Use clear and conscious language write in a ${userPrompt.voice} voice tone.`,
    },
  ];

  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
    generationConfig,
    safetySettings,
  });

  const response = result.response;

  return response.text();
}
