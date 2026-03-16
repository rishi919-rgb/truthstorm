import mongoose from 'mongoose';

const investigationSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        caption: {
            type: String,
            trim: true,
        },
        imageUrl: {
            type: String,
            trim: true,
        },
        sourceUrl: {
            type: String,
            trim: true,
        },
        status: {
            type: String,
            enum: ['pending', 'processing', 'completed'],
            default: 'pending',
        },
        credibilityScore: {
            type: Number,
            min: 0,
            max: 100,
            default: null,
        },
        verdict: {
            type: String,
            enum: ['Likely True', 'Uncertain', 'Likely False', null],
            default: null,
        },
        report: {
            type: String,
            default: '',
        },
        keyFindings: {
            type: [String],
            default: [],
        },
        confidenceLabel: {
            type: String,
            default: '',
        },
        structuredReport: {
            type: Object, // { observation, inconsistency, conclusion }
            default: {},
        },
        imageBase64: {
            type: String,
            default: null, // Keep the base64 string to render later in dashboard if uploaded directly
        },
        analysisTime: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

const Investigation = mongoose.model('Investigation', investigationSchema);

export default Investigation;
