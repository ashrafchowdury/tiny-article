import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { POST_PROPMT } from "@/utils/constant";
import { CUSTOM_PROMPT_TYPE } from "@/utils/types";

// constant variables
export const MODEL_NAME = "gemini-1.5-pro-latest";
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

  const customUserPrompt = `${userPrompt.prompt}. Voice tone has to be ${userPrompt.voice}, ${
    userPrompt.isEmoji && "add emojis end of a sentence if needed"
  }, ${userPrompt.isHashtag && "add 2 hashtags which is most relevant to the post"}, ${
    userPrompt.isFormatPost &&
    "and format the post by adding (enter-space) word at the end of the sentence, add that only on the content property."
  }`;

  const parts = [
    { text: `input: ${prompt}` },
    { text: `output: ${POST_PROPMT}. ${customUserPrompt}` },
  ];

  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
    generationConfig,
    safetySettings,
  });

  const response = result.response;

  return response.text();
}
