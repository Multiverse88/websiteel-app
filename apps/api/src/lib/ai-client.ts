import OpenAI from "openai";

export function getAIClient(): OpenAI | null {
  const apiKey = process.env.AI_ROUTER_API_KEY || process.env.OPENAI_API_KEY;
  if (!apiKey) return null;
  const baseURL = process.env.AI_ROUTER_BASE_URL;
  return new OpenAI({
    apiKey,
    ...(baseURL ? { baseURL } : {}),
  });
}

export function supportsJsonFormat(): boolean {
  return (
    !!process.env.AI_ROUTER_BASE_URL?.includes("openai") ||
    !!process.env.AI_ROUTER_MODEL_REVIEW?.toLowerCase().includes("gpt")
  );
}
