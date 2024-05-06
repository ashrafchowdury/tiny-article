export type POST_TYPE = {
  id: string;
  title: string;
  content: string;
  createdAt?: TimeRanges;
};

export type UserId = { userId: string | null | undefined };

export type PROMPT_UTILITIES = {
  format: boolean;
  emoji: boolean;
  hashtag: boolean;
  save: boolean;
};
