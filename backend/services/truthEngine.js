/**
 * TruthStorm AI - Truth Engine
 * Generates a credibility score and report for an investigation.
 * This is a rule-based simulation engine.
 */

const FAKE_KEYWORDS = [
    'breaking', 'shocking', 'you won\'t believe', 'share before deleted',
    'media won\'t show', 'they don\'t want you to know', 'exposed', 'banned',
    'secret', 'miracle', 'urgent', 'warning', 'must watch', 'proof',
];

const CREDIBLE_DOMAINS = [
    'reuters.com', 'apnews.com', 'bbc.com', 'bbc.co.uk', 'nytimes.com',
    'theguardian.com', 'washingtonpost.com', 'who.int', 'gov', 'edu',
];

const runTruthEngine = (caption = '', sourceUrl = '') => {
    let score = 50; // Neutral starting point
    const reportLines = [];

    // --- Caption Analysis ---
    if (caption) {
        const lowerCaption = caption.toLowerCase();
        const foundKeywords = FAKE_KEYWORDS.filter(kw => lowerCaption.includes(kw));

        if (foundKeywords.length > 0) {
            score -= foundKeywords.length * 8;
            reportLines.push(`⚠️ Caption contains ${foundKeywords.length} sensational keyword(s): "${foundKeywords.join('", "')}" — often associated with misinformation.`);
        } else {
            score += 10;
            reportLines.push('✅ Caption language appears neutral and does not contain obvious sensational language.');
        }

        if (caption.includes('!!!') || caption === caption.toUpperCase()) {
            score -= 10;
            reportLines.push('⚠️ The caption uses excessive capitalization or exclamation marks, a common trait in misleading content.');
        }

        if (caption.length > 30) {
            score += 5;
            reportLines.push('✅ Sufficient text was provided for analysis.');
        }
    } else {
        reportLines.push('ℹ️ No caption was provided. Analysis is based on source URL only.');
    }

    // --- Source URL Analysis ---
    if (sourceUrl) {
        const isCredible = CREDIBLE_DOMAINS.some(domain => sourceUrl.toLowerCase().includes(domain));
        if (isCredible) {
            score += 25;
            reportLines.push('✅ The source URL points to a generally credible and established media organization.');
        } else {
            score -= 10;
            reportLines.push('⚠️ The source URL does not match any verified credible domains. Independent verification is recommended.');
        }
    } else {
        score -= 5;
        reportLines.push('ℹ️ No source URL was provided. Providing a source improves analysis accuracy.');
    }

    // Clamp score between 0 and 100
    score = Math.max(0, Math.min(100, score));

    // Determine verdict
    let verdict;
    if (score >= 70) {
        verdict = 'Likely True';
    } else if (score >= 40) {
        verdict = 'Uncertain';
    } else {
        verdict = 'Likely False';
    }

    const report = reportLines.join('\n\n');

    return { credibilityScore: Math.round(score), verdict, report };
};

export default runTruthEngine;
