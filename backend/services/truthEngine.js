import { GoogleGenAI } from '@google/genai';

// Initialize the Google Gen AI SDK
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

/**
 * Runs the TruthStorm AI Engine.
 * @param {string} caption - The text claim to analyze.
 * @param {string} sourceUrl - Optional source URL.
 * @param {object|null} imageData - Optional { base64: string, mimeType: string } for image analysis.
 */
const runTruthEngine = async (caption = '', sourceUrl = '', imageData = null) => {
    try {
        const now = new Date();
        const currentDate = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

        const hasImage = imageData && imageData.base64 && imageData.mimeType;

        const prompt = `
      You are the "TruthStorm AI Engine", an expert fact-checker and visual analyst journalist.
      
      CRITICAL CONTEXT:
      - Today's exact date is: ${currentDate}
      - Trust this date completely. Your training data cutoff does not override this.
      
      IMPORTANT RULES:
      - For time-sensitive claims (sports results, elections, records, recent events) where the claim is AMBIGUOUS about which specific year or event it refers to, score them as 50-60 (Uncertain) and explain the ambiguity.
      - Do NOT guess or hallucinate specific facts about recent events you are unsure about. Express uncertainty instead.
      - If a claim could be true historically but is ambiguous about "when", say it is Uncertain and explain why.
      - Only mark something as "Likely False" if you are extremely confident it is objectively incorrect.
      ${hasImage ? `
      - An IMAGE has been provided. Carefully examine it first. Describe what you see in the image.
      - Cross-reference what is visible in the image against the caption/claim provided.
      - If the image clearly contradicts the claim, lower the score significantly.
      - If the image clearly supports the claim with visible evidence, raise the score.
      - Look for signs of manipulation, inconsistent lighting, out-of-context usage, or AI generation artifacts.
      ` : ''}
      
      Analyze the following:
      Claim/Caption: "${caption || 'None provided'}"
      Source URL: "${sourceUrl || 'None provided'}"
      ${hasImage ? 'An image has been attached for visual analysis. Analyze it carefully.' : 'No image was provided.'}
      
      Return ONLY a strict JSON object with no markdown formatting or backticks. The JSON must have these exact keys:
      {
        "credibilityScore": (number from 0 to 100),
        "verdict": (string, exactly one of: "Likely True", "Uncertain", "Likely False"),
        "report": (string, a 3-4 sentence detailed explanation with emojis for readability. If an image was provided, mention what you observed in it.)
      }
    `;

        // Build contents with optional inline image part
        let contents;
        if (hasImage) {
            contents = [
                {
                    role: 'user',
                    parts: [
                        { text: prompt },
                        {
                            inlineData: {
                                mimeType: imageData.mimeType,
                                data: imageData.base64,
                            }
                        }
                    ]
                }
            ];
        } else {
            contents = prompt;
        }

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents,
            config: {
                responseMimeType: "application/json",
            }
        });

        const responseText = response.text;
        const parsedData = JSON.parse(responseText);

        return {
            credibilityScore: parsedData.credibilityScore,
            verdict: parsedData.verdict,
            report: parsedData.report
        };

    } catch (error) {
        console.error('Truth Engine (Gemini API) Error:', error);
        return {
            credibilityScore: 50,
            verdict: 'Uncertain',
            report: '⚠️ Investigation Error: The AI engine encountered an issue while processing this request. Please try again later.'
        };
    }
};

export default runTruthEngine;
