import { VOICE_TYPE } from "./types";

// Posts voice tones
export const voices = [
  "netural",
  "formal",
  "casual",
  "profesional",
  "confident",
  "engaging",
  "empathetic",
  "funny",
] as const;

//
export const defaultUserPromptSettings = {
  prompt: "",
  voice: "netural" as VOICE_TYPE,
  isFormatPost: true,
  isEmoji: true,
  isHashtag: false,
  isAutoSavePost: false,
};

// User utility settings
export const utility = [
  { key: "isFormatPost", title: "Format the posts" },
  { key: "isEmoji", title: "Use Emojies" },
  { key: "isHashtag", title: "Use Hashtags" },
  { key: "isAutoSavePost", title: "Auto save posts" },
];

export const MAX_USAGE_LIMIT = 5;
