import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export async function sendMessage(message) {
  try {
    console.time("Gemini API"); // 👈 Start timer

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: `
You are HexaBot AI.

Rules:
- Answer in 2-3 sentences.
- Keep responses under 60 words.
- If asked for code, provide only the required code.
- Be concise and clear.

User: ${message}
`,
    });

    console.timeEnd("Gemini API"); // 👈 End timer

    console.log(response);

    const text =
      response.candidates?.[0]?.content?.parts?.[0]?.text;

    return text || "Sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
}