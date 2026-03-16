import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiCreateInvestigation } from '../services/api';

const Investigate = () => {
    const [formData, setFormData] = useState({ caption: '', imageUrl: '', sourceUrl: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!formData.caption && !formData.imageUrl && !formData.sourceUrl) {
            setError('Please provide at least a caption, image URL, or source URL to investigate.');
            return;
        }
        try {
            setLoading(true);
            await apiCreateInvestigation(formData);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message || 'Failed to submit investigation. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const inputClass = "w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all";
    const labelClass = "block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2";

    return (
        <div className="w-full max-w-2xl mx-auto mt-8 mb-16 px-4">
            {/* Header */}
            <div className="mb-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-xl shadow-indigo-500/30 mb-4 text-3xl">
                    ⚡
                </div>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    New Investigation
                </h2>
                <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
                    Submit content to be analyzed by the Gemini 2.5 Flash AI Engine.
                </p>
            </div>

            <div className="rounded-2xl bg-white dark:bg-white/3 border border-slate-100 dark:border-white/8 p-8 shadow-xl dark:shadow-none">
                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className={labelClass} htmlFor="caption">
                            Caption / Claim Text
                        </label>
                        <textarea
                            id="caption"
                            name="caption"
                            rows={4}
                            value={formData.caption}
                            onChange={handleChange}
                            placeholder="Paste the viral claim, caption, or text you want to investigate..."
                            className={`${inputClass} resize-none`}
                        />
                    </div>

                    <div>
                        <label className={labelClass} htmlFor="imageUrl">
                            Image URL <span className="text-slate-400 font-normal">(optional)</span>
                        </label>
                        <input id="imageUrl" name="imageUrl" type="url" value={formData.imageUrl} onChange={handleChange}
                            placeholder="https://example.com/viral-image.jpg" className={inputClass} />
                    </div>

                    <div>
                        <label className={labelClass} htmlFor="sourceUrl">
                            Source URL <span className="text-slate-400 font-normal">(optional)</span>
                        </label>
                        <input id="sourceUrl" name="sourceUrl" type="url" value={formData.sourceUrl} onChange={handleChange}
                            placeholder="https://social-media.com/post/12345" className={inputClass} />
                    </div>

                    <div className="flex items-center gap-4 pt-2">
                        <button type="submit" disabled={loading}
                            className="flex-1 py-3 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:opacity-60 disabled:cursor-wait transition-all shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-px flex items-center justify-center gap-2">
                            {loading ? (
                                <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Analyzing with AI...</>
                            ) : (
                                <> ⚡ Investigate Now</>
                            )}
                        </button>
                        <button type="button" onClick={() => navigate('/dashboard')}
                            className="px-6 py-3 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 font-medium rounded-xl transition-colors">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>

            {/* Tip */}
            <p className="text-xs text-center text-slate-400 dark:text-slate-500 mt-4">
                💡 For best results, provide both a claim text and a source URL.
            </p>
        </div>
    );
};

export default Investigate;
