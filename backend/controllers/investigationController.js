import Investigation from '../models/Investigation.js';
import runTruthEngine from '../services/truthEngine.js';

// @route   POST /api/investigations
// @desc    Create a new investigation request
// @access  Protected
export const createInvestigation = async (req, res) => {
    try {
        const { caption, imageUrl, sourceUrl } = req.body;

        if (!caption && !imageUrl && !sourceUrl) {
            return res.status(400).json({ message: 'Please provide at least a caption, image URL, or source URL.' });
        }

        // Run the Truth Engine to analyze the content (async Gemini API call)
        const { credibilityScore, verdict, report } = await runTruthEngine(caption, sourceUrl);

        const investigation = await Investigation.create({
            user: req.user._id,
            caption,
            imageUrl,
            sourceUrl,
            status: 'completed',
            credibilityScore,
            verdict,
            report,
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
