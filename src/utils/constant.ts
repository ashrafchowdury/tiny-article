// post output schema
export const SCHEMA = JSON.stringify([
  {
    id: "unique random 32 charecter id",
    title: "title of the content",
    content: "output content",
  },
  {
    id: "unique random 32 charecter id",
    title: "title of the content",
    content: "output content",
  },
]);

// post prompt
export const POST_PROPMT = `
You are a helpful assistant designed to generate 4 posts under 280 charecters each from given article.
Don't use any king of hashtags, you can use emojis if needed.
Follow this schema to generate json output. Schema: ${SCHEMA}
`;

// thread propmt
export const THREAD_PROMPT = ``;

// Posts voice tones
export const tones = ["netural", "formal", "casual", "profesional", "confident", "engaging", "empathetic", "funny"];

// User utility settings
export const utility = [
  { id: "format", title: "Format the posts" },
  { id: "emoji", title: "Use Emojies" },
  { id: "hashtag", title: "Use Hashtags" },
  { id: "save", title: "Auto save posts" },
];
