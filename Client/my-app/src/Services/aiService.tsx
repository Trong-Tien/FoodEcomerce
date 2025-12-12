import type { GeminiResponse } from "@/Type/GeminiResponse";

// services/geminiService.ts
const API_BASE = "https://foodecomerceapi.runasp.net/api/Gemini";



export const geminiService = {
  async ask(prompt: string) {
    const res = await fetch(
      `${API_BASE}/GeminiAI?prompt=${encodeURIComponent(prompt)}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token") || ""}`,
        },
      }
    );

    if (!res.ok) {
      const err = await res.text();
      throw new Error(err);
    }

    const data: GeminiResponse = await res.json();
    return data;
  },
};

