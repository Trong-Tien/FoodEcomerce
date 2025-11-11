// services/geminiService.ts
const API_BASE = "http://localhost:5292/api/Gemini";

export const geminiService = {
  async ask(prompt: string) {
    const res = await fetch(`${API_BASE}/GeminiAI?prompt=${encodeURIComponent(prompt)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Nếu cần auth token
        Authorization: `Bearer ${localStorage.getItem("access_token") || ""}`,
      },
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(err);
    }

    return res.text(); // vì backend trả Ok(string)
  },
};
