import { z } from "zod";
import { voices } from "@/utils/constant";

export const PostSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.array(z.string()),
  hashtags: z.array(z.string()).optional(),
  createdAt: z.string().datetime().optional(),
});

export const PostsSchema = z.array(PostSchema);
export const HistorySchema = z.array(PostsSchema); // history has double array layer

export const CustomPromptSchema = z.object({
  id: z.string().optional(),
  prompt: z.string().optional(),
  voice: z.enum(voices),
  isFormatPost: z.boolean(),
  isEmoji: z.boolean(),
  isHashtag: z.boolean(),
  isAutoSavePost: z.boolean(),
});

export const UserSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string().email(),
  avatar: z.string().optional(),
  ceatedAt: z.date().optional(),
});
