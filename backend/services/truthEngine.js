import { GoogleGenAI } from '@google/genai';

// Initialize the Google Gen AI SDK
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const runTruthEngine = async (caption = '', sourceUrl = '') => {
    try {
        const now = new Date();
        const currentDate = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

        const prompt = `
      You are the "TruthStorm AI Engine", an expert fact-checker and journalist.
      
      IMPORTANT CONTEXT: Today's date is ${currentDate}. Use this as your source of truth for any time-sensitive claims.
      Your training data may have a cutoff date, but the actual current date is ${currentDate}. Always trust this date over your training data.
      
      Analyze the following claim and optional source URL.
      
      Claim/Caption: "${caption || 'None provided'}"
      Source URL: "${sourceUrl || 'None provided'}"
      
      Determine the credibility of the claim based on recognized facts, logic, and source reputation.
      Return ONLY a strict JSON object with no markdown formatting or backticks. The JSON must have these exact keys:
      {
        "credibilityScore": (number from 0 to 100, where 0 is completely false/debunked and 100 is perfectly verified/true),
        "verdict": (string, exactly one of: "Likely True", "Uncertain", "Likely False"),
        "report": (string, a 3-4 sentence detailed explanation of why this score was given, formatted with emojis for readability)
      }
    `;

        // Use Gemini 2.5 Flash as it is fast and supports the new SDK
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
            }
        });

        const responseText = response.text;

        // Parse the JSON response
        const parsedData = JSON.parse(responseText);

        return {
            credibilityScore: parsedData.credibilityScore,
            verdict: parsedData.verdict,
            report: parsedData.report
        };

    } catch (error) {
        console.error('Truth Engine (Gemini API) Error:', error);
        // Graceful fallback if the API rate limits or fails
        return {
            credibilityScore: 50,
            verdict: 'Uncertain',
            report: '⚠️ Investigation Error: The AI engine encountered an issue while processing this request. Please try again later.'
        };
    }
};

export default runTruthEngine;
