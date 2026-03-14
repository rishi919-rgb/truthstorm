/**
 * TruthStorm AI - Truth Engine
 * Generates a credibility score and report for an investigation.
 * This is an advanced rule-based simulation engine.
 */

// Categorized keyword lists for nuanced scoring
const HIGHLY_SUSPICIOUS = [
    'miracle cure', 'hoax', 'fake news', 'they don\'t want you to know',
    'banned', 'secret ingredient', 'illuminati', 'deep state',
    'share before deleted', 'media won\'t show', '100% proof',
    'aliens', 'hiding the truth', 'government is giving', 'free money'
];

const SENSATIONAL = [
    'breaking', 'shocking', 'unbelievable', 'you won\'t believe',
    'mind-blowing', 'exposed', 'urgent', 'warning', 'must watch',
    'destroy', 'destroys', 'owned', 'damage', 'disaster'
];

const METRICS_AND_OBJECTIVE = [
    'according to', 'researchers found', 'study published in',
    'reported by', 'data indicates', 'officials stated',
    'percentage', 'million', 'billion', 'survey'
];

// Categorized domain lists
const HIGHLY_CREDIBLE_DOMAINS = [
    'reuters.com', 'apnews.com', 'bbc.com', 'bbc.co.uk', 'npr.org',
    'who.int', 'cdc.gov', 'nasa.gov', 'nature.com', 'science.org'
];

const GENERAL_NEWS_DOMAINS = [
    'nytimes.com', 'theguardian.com', 'washingtonpost.com', 'wsj.com',
    'cnn.com', 'foxnews.com', 'bloomberg.com', 'aljazeera.com', 'ndtv.com'
];

const QUESTIONABLE_DOMAINS = [
    'theonion.com', 'babylonbee.com', 'infowars.com', 'breitbart.com',
    'naturalnews.com', 'dailymail.co.uk', 'nypost.com'
];

const TLD_BONUSES = ['.gov', '.edu', '.mil'];

const runTruthEngine = (caption = '', sourceUrl = '') => {
    let score = 50; // Neutral starting point
    const reportLines = [];

    // --- 1. SOURCE URL ANALYSIS (Baseline Shift) ---
    if (sourceUrl) {
        const urlLower = sourceUrl.toLowerCase();

        // Check specific domains first
        if (HIGHLY_CREDIBLE_DOMAINS.some(domain => urlLower.includes(domain))) {
            score += 35; // Huge boost for top-tier sources
            reportLines.push('✅ Excellent Source: URL points to a highly trusted, top-tier organization or wire service (+35).');
        } else if (GENERAL_NEWS_DOMAINS.some(domain => urlLower.includes(domain))) {
            score += 20;
            reportLines.push('✅ Credible Source: URL belongs to an established mainstream news organization (+20).');
        } else if (QUESTIONABLE_DOMAINS.some(domain => urlLower.includes(domain))) {
            score -= 30; // Heavy penalty for known satire/questionable sites
            reportLines.push('🚨 Warning: Source URL matches a known satire, heavily biased, or questionable domain (-30).');
        } else {
            // Check TLDs if not in specific lists
            if (TLD_BONUSES.some(tld => urlLower.includes(tld))) {
                score += 25;
                reportLines.push(`✅ Trusted Domain TLD: URL uses a highly trusted top-level domain (like .gov or .edu) (+25).`);
            } else {
                score -= 5;
                reportLines.push('ℹ️ Unknown Source: The URL provided is not on our recognized list of highly credible domains (-5).');
            }
        }
    } else {
        // Heavy penalty for claims without sources
        score -= 20;
        reportLines.push('⚠️ Missing Source: No source URL was provided. Claims without sources are much harder to verify (-20).');
    }

    // --- 2. CAPTION / TEXT ANALYSIS ---
    if (caption) {
        const lowerCaption = caption.toLowerCase();
        let suspiciousHits = 0;
        let sensationalHits = 0;
        let objectiveHits = 0;

        // Count keyword matches
        HIGHLY_SUSPICIOUS.forEach(kw => { if (lowerCaption.includes(kw)) suspiciousHits++; });
        SENSATIONAL.forEach(kw => { if (lowerCaption.includes(kw)) sensationalHits++; });
        METRICS_AND_OBJECTIVE.forEach(kw => { if (lowerCaption.includes(kw)) objectiveHits++; });

        // Apply keyword scoring
        if (suspiciousHits > 0) {
            score -= (suspiciousHits * 20); // Massive penalty for conspiracy/scam phrases
            reportLines.push(`🚨 Highly Suspicious Language: Found ${suspiciousHits} phrase(s) commonly used in hoaxes or misinformation campaigns (-${suspiciousHits * 20}).`);
        }

        if (sensationalHits > 0) {
            score -= (sensationalHits * 10);
            reportLines.push(`⚠️ Sensationalism: Found ${sensationalHits} clickbait or sensational word(s) designed to trigger emotion (-${sensationalHits * 10}).`);
        }

        if (objectiveHits > 0) {
            score += (objectiveHits * 5);
            reportLines.push(`✅ Objective Phrasing: Found ${objectiveHits} instance(s) of objective/journalistic phrasing or statistical references (+${objectiveHits * 5}).`);
        }

        // Structural anomalies
        if (caption.includes('!!!') || caption.includes('???')) {
            score -= 15;
            reportLines.push('⚠️ Punctuation Anomaly: Excessive exclamation marks or question marks detected, a strong indicator of low-quality content (-15).');
        }

        // ALL CAPS check (if more than 30% of characters are uppercase letters)
        const upperCount = (caption.match(/[A-Z]/g) || []).length;
        const alphaCount = (caption.match(/[a-zA-Z]/g) || []).length;
        if (alphaCount > 15 && (upperCount / alphaCount) > 0.4) {
            score -= 20;
            reportLines.push('🚨 Formatting Anomaly: Excessive use of ALL CAPS detected. This is a common tactic used to fabricate urgency (-20).');
        }

    } else {
        reportLines.push('ℹ️ No caption was provided. Analysis relied outward linking only.');
    }

    // --- 3. SCORE CLAMPING AND VERDICT ---

    // Ensure score stays strictly within 0 - 100
    score = Math.max(0, Math.min(100, score));

    // Determine categorical verdict
    let verdict;
    if (score >= 75) {
        verdict = 'Likely True';
    } else if (score >= 45) {
        verdict = 'Uncertain';
    } else {
        verdict = 'Likely False';
    }

    const report = reportLines.join('\n\n');

    return { credibilityScore: Math.round(score), verdict, report };
};

export default runTruthEngine;
