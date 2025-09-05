import { RequestHandler } from "express";
import { getGeminiApiKey } from "../../shared/env";

export const handleGeminiKey: RequestHandler = (req, res) => {
  const key = getGeminiApiKey();
  if (!key) {
    return res.status(404).json({ error: "Gemini API key not set" });
  }
  res.status(200).json({ geminiApiKey: key });
};
