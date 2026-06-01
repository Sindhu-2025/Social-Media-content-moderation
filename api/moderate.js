/// <reference types="node" />
// @ts-nocheck

import { config } from "dotenv";
config();

const apiKey = process.env.GROQ_API_KEY;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "No text provided" });
  }

  if (!apiKey) {
    return res.status(500).json({ error: "Groq API key not found" });
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        max_tokens: 1000,
        messages: [
          {
            role: "system",
            content: "You are an AI content moderation system. Always respond with valid JSON only. No markdown, no code fences, no explanation.",
          },
          {
            role: "user",
            content: `Analyze this social media content and return ONLY a JSON object.

Content: "${text}"

Return exactly this structure:
{
  "flags": [
    {"category": "hate_speech",   "confidence": 0.0},
    {"category": "cyberbullying", "confidence": 0.0},
    {"category": "spam",          "confidence": 0.0},
    {"category": "fake_news",     "confidence": 0.0},
    {"category": "violence",      "confidence": 0.0},
    {"category": "adult_content", "confidence": 0.0},
    {"category": "toxic",         "confidence": 0.0}
  ],
  "reasoning": "One sentence explaining your assessment."
}

Set confidence between 0.0 (not present) and 1.0 (definitely present).`,
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Groq error:", data);
      return res.status(500).json({ error: "Groq API failed", detail: data });
    }

    const raw   = data.choices?.[0]?.message?.content || "";
    const clean = raw.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);
    return res.status(200).json(parsed);

  } catch (err) {
    console.error("Moderation error:", err);
    return res.status(500).json({ error: "Analysis failed", detail: err.message });
  }
}