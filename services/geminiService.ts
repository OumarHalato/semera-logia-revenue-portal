import { GoogleGenAI } from "@google/genai";
import { ChatHistoryItem } from "../types.ts";

export const getGeminiChatStream = async (userMessage: string, history: ChatHistoryItem[]) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const responseStream = await ai.models.generateContentStream({
      model: 'gemini-3-flash-preview',
      contents: [...history, { role: 'user', parts: [{ text: userMessage }] }],
      config: {
        systemInstruction: `You are a helpful, professional digital assistant for the Semera-Logia City Administration Revenues Office (የሰመራ-ሎግያ ከተማ አስተዳደር ገቢዎች ፅህፈት ቤት) in Ethiopia. 
        Your goal is to assist citizens, investors, and business owners with:
        - Tax inquiries (Income tax, VAT, TOT, Business Profit Tax).
        - Registration procedures and required documents.
        - Payment deadlines and methods (e.g., Telebirr, bank transfers).
        - Office locations and working hours.

        Guidelines:
        1. Respond primarily in Amharic, but provide English translations for key technical terms.
        2. Be polite and accurate.
        3. Use the googleSearch tool for up-to-date tax laws if unsure.
        4. Advise users to visit the office for complex legal matters: Semera-Logia City Administration Building, 2nd Floor.`,
        tools: [{ googleSearch: {} }],
        temperature: 0.2,
      },
    });

    return responseStream;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};