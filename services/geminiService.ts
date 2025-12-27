
import { GoogleGenAI, Modality } from "@google/genai";
import { Message } from "../types";
import { SYSTEM_PROMPT } from "../constants";

// Audio utility: Convert base64 to PCM and play
async function playPCM(base64Audio: string) {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
  const decode = (base64: string) => {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  };

  const decodeAudioData = async (data: Uint8Array, ctx: AudioContext): Promise<AudioBuffer> => {
    const dataInt16 = new Int16Array(data.buffer);
    const buffer = ctx.createBuffer(1, dataInt16.length, 24000);
    const channelData = buffer.getChannelData(0);
    for (let i = 0; i < dataInt16.length; i++) {
      channelData[i] = dataInt16[i] / 32768.0;
    }
    return buffer;
  };

  const audioBuffer = await decodeAudioData(decode(base64Audio), audioContext);
  const source = audioContext.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(audioContext.destination);
  source.start();
}

export const getChatResponse = async (
  userMessage: string,
  history: Message[],
  languageCode: string,
  imageData?: { data: string; mimeType: string }
): Promise<{ text: string; sources?: Array<{ title: string; uri: string }> }> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    
    const contents = history.filter(m => m.id !== 'welcome').map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    const userParts: any[] = [{ text: userMessage }];
    if (imageData) {
      userParts.push({
        inlineData: {
          data: imageData.data.split(',')[1],
          mimeType: imageData.mimeType
        }
      });
    }

    contents.push({ role: 'user', parts: userParts });

    const currentLanguageInstruction = `IMPORTANT: Respond in the ${languageCode} language. Use simple, reassuring terms for rural users.`;
    
    // Check if user is asking for nearby locations
    const isLocationQuery = userMessage.toLowerCase().includes('near') || userMessage.toLowerCase().includes('around');

    const response = await ai.models.generateContent({
      model: isLocationQuery ? 'gemini-2.5-flash-lite-latest' : 'gemini-3-flash-preview',
      contents: contents,
      config: {
        systemInstruction: SYSTEM_PROMPT + "\n" + currentLanguageInstruction,
        tools: isLocationQuery ? [{ googleMaps: {} }, { googleSearch: {} }] : [{ googleSearch: {} }],
      },
    });

    const text = response.text || "I'm sorry, I couldn't process that.";
    const sources: Array<{ title: string; uri: string }> = [];
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    
    if (groundingChunks) {
      groundingChunks.forEach((chunk: any) => {
        if (chunk.web) {
          sources.push({ title: chunk.web.title, uri: chunk.web.uri });
        } else if (chunk.maps) {
          sources.push({ title: chunk.maps.title || "Location on Maps", uri: chunk.maps.uri });
        }
      });
    }

    return { text, sources: sources.length > 0 ? sources : undefined };
  } catch (error) {
    console.error("Gemini Error:", error);
    return { text: "I'm having a bit of trouble right now. Please try again." };
  }
};

export const speakText = async (text: string, languageCode: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: `Speak this health advice in ${languageCode}: ${text}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
      await playPCM(base64Audio);
    }
  } catch (error) {
    console.error("TTS Error:", error);
  }
};
