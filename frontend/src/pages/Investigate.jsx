import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiCreateInvestigation } from '../services/api';

const Investigate = () => {
    const [formData, setFormData] = useState({
        caption: '',
        imageUrl: '',
        sourceUrl: '',
    });
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

    return (
        <div className="w-full max-w-2xl mx-auto mt-10">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
                <div className="mb-8">
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-2">
                        New Investigation
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400">
                        Submit content you want to investigate for credibility.
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="caption">
                            Caption / Claim Text
                        </label>
                        <textarea
                            id="caption"
                            name="caption"
                            rows={4}
                            value={formData.caption}
                            onChange={handleChange}
                            placeholder="Paste the viral claim, caption, or text you want to investigate..."
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="imageUrl">
                            Image URL <span className="text-gray-400 font-normal">(optional)</span>
                        </label>
                        <input
                            id="imageUrl"
                            name="imageUrl"
                            type="url"
                            value={formData.imageUrl}
                            onChange={handleChange}
                            placeholder="https://example.com/viral-image.jpg"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="sourceUrl">
                            Source URL <span className="text-gray-400 font-normal">(optional)</span>
                        </label>
                        <input
                            id="sourceUrl"
                            name="sourceUrl"
                            type="url"
                            value={formData.sourceUrl}
                            onChange={handleChange}
                            placeholder="https://social-media.com/post/12345"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        />
                    </div>

                    <div className="flex items-center gap-4 pt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold rounded-lg transition-colors shadow-sm"
                        >
                            {loading ? 'Analyzing...' : '🔍 Investigate Now'}
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/dashboard')}
                            className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Investigate;
