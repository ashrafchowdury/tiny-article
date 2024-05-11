import { z } from "zod";
import { PostSchema, CustomPromptSchema } from "@/libs/validations";
import { voices } from "./constant";

export type POST_TYPE = z.infer<typeof PostSchema>;

export type UserId = { userId: string | null | undefined };

export type USER_ID_TYPE = { userId: string | null | undefined };

export type CUSTOM_PROMPT_TYPE = z.infer<typeof CustomPromptSchema>;

export type VOICE_TYPE = (typeof voices)[number]; // typeof voices[number] then accesses the type of the elements contained in the array, giving you the union of all string literals present in the array
