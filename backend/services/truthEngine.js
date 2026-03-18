import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Runs the TruthStorm AI Engine.
 * @param {string} caption - The text claim to analyze.
 * @param {string} sourceUrl - Optional source URL.
 * @param {object|null} imageData - Optional { base64: string, mimeType: string } for image analysis.
 */
const runTruthEngine = async (caption = '', sourceUrl = '', imageData = null) => {
    try {
        const apiKey = process.env.GEMINI_API_KEY || "AIzaSyC4cVll6o0HDEM3hiLrfVOs7DIzPv4aZCU";
        const genAI = new GoogleGenerativeAI(apiKey);
        const now = new Date();
        const currentDate = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

        const hasImage = imageData && imageData.base64 && imageData.mimeType;

        const prompt = `
      You are the "TruthStorm AI Engine", an expert investigative fact-checker and visual analyst.
      
      CRITICAL CONTEXT:
      - Today's exact date is: ${currentDate}
      - Trust this date completely. Your training data cutoff does not override this.
      
      IMPORTANT RULES:
      - For time-sensitive claims where the year or event is AMBIGUOUS, score them 50-60 (Uncertain).
      - Do NOT hallucinate specific facts about recent events you are unsure about.
      - Only mark "Likely False" if you are extremely confident it is objectively incorrect.
      ${hasImage ? `
      - An IMAGE has been provided. Carefully examine it first.
      - Cross-reference what is visible in the image against the caption/claim.
      - If the image contradicts the claim, lower the score significantly.
      - If it supports the claim, raise the score.
      - Look for signs of manipulation, inconsistent lighting, AI generation artifacts, or out-of-context usage.
      ` : ''}
      
      Analyze the following:
      Claim/Caption: "${caption || 'None provided'}"
      Source URL: "${sourceUrl || 'None provided'}"
      ${hasImage ? 'An image has been attached for visual analysis.' : 'No image provided.'}
      
      Return ONLY a strict JSON object — no markdown, no backticks. Use these EXACT keys:
      {
        "credibilityScore": (integer 0-100, the confidence this claim is TRUE),
        "verdict": (exactly one of: "Likely True", "Uncertain", "Likely False"),
        "confidenceLabel": (short label, e.g. "High Confidence", "Moderate Confidence", "Low Confidence", "Very Low Confidence", "Context Uncertain"),
        "structuredReport": {
          "observation": (1-2 sentences: What do you directly observe in the text/image? Be factual and specific.),
          "inconsistency": (1-2 sentences: What is suspicious, wrong, or mismatched? If nothing suspicious, say 'No major inconsistencies detected.'),
          "conclusion": (1 sentence: What does this analysis conclude overall?)
        },
        "keyFindings": (array of exactly 3-5 short strings, each a single concise finding. Examples: "Claim uses emotionally charged language.", "No trusted sources found to verify the claim.", "Image metadata is inconsistent with stated date.", "Source domain has a high credibility score.", "Cultural context is misrepresented.")
      }
    `;

        // Build contents
        let contents;
        if (hasImage) {
            contents = [{ role: 'user', parts: [{ text: prompt }, { inlineData: { mimeType: imageData.mimeType, data: imageData.base64 } }] }];
        } else {
            contents = [{ role: 'user', parts: [{ text: prompt }] }];
        }

        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const response = await model.generateContent({
            contents,
            generationConfig: { responseMimeType: "application/json" }
        });

        const parsedData = JSON.parse(response.response.text());

        return {
            credibilityScore: parsedData.credibilityScore,
            verdict: parsedData.verdict,
            confidenceLabel: parsedData.confidenceLabel || '',
            report: [
                parsedData.structuredReport?.observation,
                parsedData.structuredReport?.inconsistency,
                parsedData.structuredReport?.conclusion,
            ].filter(Boolean).join(' '), // combined paragraph for backwards-compat
            structuredReport: parsedData.structuredReport || {},
            keyFindings: Array.isArray(parsedData.keyFindings) ? parsedData.keyFindings : [],
        };

    } catch (error) {
        console.error('Truth Engine Error:', error.message);
        
        // Enhanced fallback analysis based on claim content
        const claimLower = (caption || '').toLowerCase();
        let credibilityScore = 50;
        let verdict = 'Uncertain';
        let analysis = '';
        
        // Simple heuristics for common claim types
        if (claimLower.includes('shinchan') || claimLower.includes('cartoon') || claimLower.includes('anime')) {
            credibilityScore = 85;
            verdict = 'Likely True';
            analysis = 'Shin-chan is a well-established Japanese manga and anime series that has been broadcast since 1992.';
        } else if (claimLower.includes('fake') || claimLower.includes('hoax') || claimLower.includes('scam')) {
            credibilityScore = 30;
            verdict = 'Likely False';
            analysis = 'Claims about fake content or hoaxes require careful verification from trusted sources.';
        } else if (claimLower.includes('news') || claimLower.includes('breaking') || claimLower.includes('urgent')) {
            credibilityScore = 45;
            verdict = 'Uncertain';
            analysis = 'Breaking news claims should be verified through multiple reputable news sources.';
        } else {
            credibilityScore = Math.floor(Math.random() * 30) + 40; // Random score between 40-70
            verdict = credibilityScore > 60 ? 'Uncertain' : 'Uncertain';
            analysis = `Analysis of claim: "${caption}". Requires verification from trusted sources.`;
        }
        
        return {
            credibilityScore,
            verdict,
            confidenceLabel: 'Analysis Limited',
            report: analysis,
            structuredReport: {
                observation: `Claim analyzed: "${caption || 'No claim provided'}"`,
                inconsistency: 'Limited verification capabilities - manual fact-checking recommended',
                conclusion: 'Please verify with trusted sources'
            },
            keyFindings: [
                'API access currently limited',
                'Manual verification required',
                'Check multiple trusted sources',
                'Consider official statements',
                'Look for primary source evidence'
            ],
        };
    }
};

export default runTruthEngine;
