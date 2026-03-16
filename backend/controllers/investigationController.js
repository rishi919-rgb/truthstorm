import Investigation from '../models/Investigation.js';
import runTruthEngine from '../services/truthEngine.js';
import fetch from 'node-fetch'; // Add node-fetch if we need to fetch binary image data from an image URL user provides

// @route   POST /api/investigations
// @desc    Create a new investigation request
// @access  Protected
export const createInvestigation = async (req, res) => {
    try {
        const { caption, imageUrl, sourceUrl, imageData } = req.body;

        if (!caption && !imageUrl && !sourceUrl && !imageData) {
            return res.status(400).json({ message: 'Please provide at least a caption, image, or source URL.' });
        }

        let finalImageData = imageData; // Assume imageData is {base64, mimeType}

        // If the user provided an imageUrl but no direct file upload, we can attempt to fetch it for the prompt
        let finalImageBase64 = imageData?.base64 || null;

        if (!finalImageData && imageUrl) {
             try {
                 // Try to fetch image data from URL to send to gemini
                 const res = await fetch(imageUrl);
                 if (res.ok) {
                     const buffer = await res.arrayBuffer();
                     const base64 = Buffer.from(buffer).toString('base64');
                     const mimeType = res.headers.get('content-type');
                     if (mimeType && mimeType.startsWith('image/')) {
                         finalImageData = { base64, mimeType };
                         finalImageBase64 = base64;
                     }
                 }
             } catch(e) {
                 console.log("Could not parse image from URL automatically");
             }
        }

        // Run the Truth Engine to analyze the content (async Gemini API call)
        const startTime = Date.now();
        const { credibilityScore, verdict, report, keyFindings, structuredReport, confidenceLabel } = await runTruthEngine(caption, sourceUrl, finalImageData);
        const endTime = Date.now();
        const analysisTime = (endTime - startTime) / 1000;

        const investigation = await Investigation.create({
            user: req.user._id,
            caption: caption || (finalImageData ? '📷 Image Investigation' : ''),
            imageUrl,
            sourceUrl,
            status: 'completed',
            credibilityScore,
            verdict,
            report,
            keyFindings: keyFindings || [],
            structuredReport: structuredReport || {},
            confidenceLabel: confidenceLabel || '',
            imageBase64: finalImageBase64 ? `data:${finalImageData?.mimeType || 'image/jpeg'};base64,${finalImageBase64}` : null,
            analysisTime,
        });

        res.status(201).json({
            message: 'Investigation completed successfully',
            investigation,
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// @route   GET /api/investigations
// @desc    Get all investigations for the logged-in user
// @access  Protected
export const getMyInvestigations = async (req, res) => {
    try {
        const investigations = await Investigation.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(investigations);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// @route   DELETE /api/investigations/:id
// @desc    Delete an investigation
// @access  Protected
export const deleteInvestigation = async (req, res) => {
    try {
        const investigation = await Investigation.findById(req.params.id);

        if (!investigation) {
            return res.status(404).json({ message: 'Investigation not found' });
        }

        if (investigation.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to delete this investigation' });
        }

        await investigation.deleteOne();
        res.json({ message: 'Investigation deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
