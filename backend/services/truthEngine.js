import { GoogleGenAI } from '@google/genai';

// Initialize the Google Gen AI SDK
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const runTruthEngine = async (caption = '', sourceUrl = '') => {
    try {
        const now = new Date();
        const currentDate = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

        const prompt = `
      You are the "TruthStorm AI Engine", an expert fact-checker and journalist.
      
      CRITICAL CONTEXT:
      - Today's exact date is: ${currentDate}
      - Trust this date completely. Your training data cutoff does not override this.
      
      IMPORTANT RULES:
      - For time-sensitive claims (sports results, elections, records, recent events) where the claim is AMBIGUOUS about which specific year or event it refers to, score them as 50-60 (Uncertain) and explain the ambiguity.
      - Do NOT guess or hallucinate specific facts about recent events you are unsure about. Express uncertainty instead.
      - If a claim could be true historically but is ambiguous about "when", say it is Uncertain and explain why.
      - Only mark something as "Likely False" if you are extremely confident it is objectively incorrect.
      
      Analyze the following claim and optional source URL.
      
      Claim/Caption: "${caption || 'None provided'}"
      Source URL: "${sourceUrl || 'None provided'}"
      
      Return ONLY a strict JSON object with no markdown formatting or backticks. The JSON must have these exact keys:
      {
        "credibilityScore": (number from 0 to 100),
        "verdict": (string, exactly one of: "Likely True", "Uncertain", "Likely False"),
        "report": (string, a 3-4 sentence detailed explanation with emojis for readability)
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
