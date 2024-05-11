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
You are a helpful assistant designed to generate 4 posts under 380 charecters each from given article. Follow this schema to generate json output. Schema: ${SCHEMA}
`;

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

// User utility settings
export const utility = [
  { key: "isFormatPost", title: "Format the posts" },
  { key: "isEmoji", title: "Use Emojies" },
  { key: "isHashtag", title: "Use Hashtags" },
  { key: "isAutoSavePost", title: "Auto save posts" },
];
