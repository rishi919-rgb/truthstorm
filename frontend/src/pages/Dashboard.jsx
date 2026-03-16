import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SCORE_COLOR = (score) => {
    if (score >= 70) return 'text-green-600 dark:text-green-400';
    if (score >= 40) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
};

const SCORE_BG = (score) => {
    if (score >= 70) return 'bg-green-100 dark:bg-green-900/30 border-green-200 dark:border-green-800';
    if (score >= 40) return 'bg-yellow-100 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-800';
    return 'bg-red-100 dark:bg-red-900/30 border-red-200 dark:border-red-800';
};

const Dashboard = () => {
    const { user } = useAuth();
    const [investigations, setInvestigations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading with placeholder data until the backend is live
        // In Phase 19+, this will be an API call when the backend is deployed
        setTimeout(() => {
            setInvestigations([
                {
                    _id: '1',
                    caption: 'SHOCKING: Scientists discover miracle cure that big pharma doesn\'t want you to know!!!',
                    status: 'completed',
                    credibilityScore: 15,
                    verdict: 'Likely False',
                    report: '⚠️ Caption contains 3 sensational keyword(s)\n⚠️ Excessive capitalization detected.\nℹ️ No source URL was provided.',
                    createdAt: new Date().toISOString(),
                },
                {
                    _id: '2',
                    caption: 'WHO releases new guidelines on healthy eating habits for 2025.',
                    sourceUrl: 'https://www.who.int/news/item/2025',
                    status: 'completed',
                    credibilityScore: 85,
                    verdict: 'Likely True',
                    report: '✅ Caption language appears neutral.\n✅ Source URL points to a credible organization (WHO).\n✅ Sufficient text provided for analysis.',
                    createdAt: new Date(Date.now() - 86400000).toISOString(),
                },
            ]);
            setLoading(false);
        }, 800);
    }, []);

    const handleDelete = (id) => {
        // Will connect to API in later phase
        setInvestigations(prev => prev.filter(inv => inv._id !== id));
    };

    return (
        <div className="w-full max-w-4xl mx-auto mt-10 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                        Investigation Dashboard
                    </h1>
                    <p className="mt-1 text-gray-500 dark:text-gray-400">
                        Welcome back, <span className="font-semibold text-blue-600 dark:text-blue-400">{user?.name}</span>!
                    </p>
                </div>
                <Link
                    to="/investigate"
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-colors shadow-sm flex items-center gap-2"
                >
                    🔍 New Investigation
                </Link>
            </div>

            {/* Content */}
            {loading ? (
                <div className="text-center py-20 text-gray-400 dark:text-gray-500">
                    <p className="text-lg">Loading your investigations...</p>
                </div>
            ) : investigations.length === 0 ? (
                <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                    <p className="text-5xl mb-4">🔎</p>
                    <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No investigations yet</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">Submit your first viral content to investigate!</p>
                    <Link to="/investigate" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors">
                        Start Investigating
                    </Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {investigations.map((inv) => (
                        <div
                            key={inv._id}
                            className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-6"
                        >
                            <div className="flex items-start justify-between gap-4">
                                {/* Left: caption and meta */}
                                <div className="flex-1 min-w-0">
                                    <p className="text-gray-800 dark:text-gray-200 font-medium line-clamp-2 mb-2">
                                        {inv.caption || inv.sourceUrl || inv.imageUrl || 'No caption provided'}
                                    </p>
                                    <p className="text-xs text-gray-400 dark:text-gray-500">
                                        {new Date(inv.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </p>
                                </div>

                                {/* Right: score badge */}
                                {inv.status === 'completed' && (
                                    <div className={`flex-shrink-0 text-center px-4 py-2 rounded-xl border ${SCORE_BG(inv.credibilityScore)}`}>
                                        <div className={`text-2xl font-black ${SCORE_COLOR(inv.credibilityScore)}`}>
                                            {inv.credibilityScore}
                                        </div>
                                        <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">/ 100</div>
                                    </div>
                                )}
                            </div>

                            {/* Verdict and Report */}
                            {inv.status === 'completed' && (
                                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className={`text-sm font-bold px-3 py-1 rounded-full ${SCORE_BG(inv.credibilityScore)} ${SCORE_COLOR(inv.credibilityScore)}`}>
                                            {inv.verdict}
                                        </span>
                                        <button
                                            onClick={() => handleDelete(inv._id)}
                                            className="text-xs text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors font-medium"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 whitespace-pre-line leading-relaxed">
                                        {inv.report}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
