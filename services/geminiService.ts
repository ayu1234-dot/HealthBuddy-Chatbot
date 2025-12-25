
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Message, MessageRole } from "../types";
import { SYSTEM_PROMPT } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getChatResponse = async (
  userMessage: string,
  history: Message[],
  languageCode: string
): Promise<{ text: string; sources?: any[] }> => {
  try {
    const chatHistory = history.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    // For better multilingual support, we prefix the instruction
    const currentLanguageInstruction = `Please respond in the ${languageCode} language.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...chatHistory.map(h => ({ role: h.role, parts: h.parts })),
        { role: 'user', parts: [{ text: userMessage }] }
      ],
      config: {
        systemInstruction: SYSTEM_PROMPT + "\n" + currentLanguageInstruction,
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "I'm sorry, I couldn't process that request.";
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({
      title: chunk.web?.title || "Health Reference",
      uri: chunk.web?.uri || "#"
    }));

    return { text, sources };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return { text: "I'm having trouble connecting to the health database. Please try again in a moment." };
  }
};
