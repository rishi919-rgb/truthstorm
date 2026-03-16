import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { apiGetInvestigations, apiDeleteInvestigation } from '../services/api';

const PAGE_SIZE = 5;

const getScoreStyle = (score) => {
    if (score >= 70) return { ring: 'score-true', badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30', text: 'text-emerald-400' };
    if (score >= 45) return { ring: 'score-uncertain', badge: 'bg-amber-500/15 text-amber-400 border-amber-500/30', text: 'text-amber-400' };
    return { ring: 'score-false', badge: 'bg-red-500/15 text-red-400 border-red-500/30', text: 'text-red-400' };
};

const Dashboard = () => {
    const { user } = useAuth();
    const [allInvestigations, setAllInvestigations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');
    const [filterVerdict, setFilterVerdict] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchInvestigations = async () => {
            try {
                const data = await apiGetInvestigations();
                setAllInvestigations(data);
            } catch (err) {
                setError(err.message || 'Failed to load investigations.');
            } finally {
                setLoading(false);
            }
        };
        fetchInvestigations();
    }, []);

    useEffect(() => {
        const handler = setTimeout(() => { setDebouncedQuery(searchQuery); setCurrentPage(1); }, 400);
        return () => clearTimeout(handler);
    }, [searchQuery]);

    useEffect(() => { setCurrentPage(1); }, [filterVerdict]);

    const handleDelete = async (id) => {
        try {
            await apiDeleteInvestigation(id);
            setAllInvestigations(prev => prev.filter(inv => inv._id !== id));
        } catch (err) {
            alert(err.message || 'Failed to delete investigation');
        }
    };

    const filtered = allInvestigations.filter((inv) => {
        const matchSearch = debouncedQuery === '' || (inv.caption || '').toLowerCase().includes(debouncedQuery.toLowerCase());
        const matchFilter = filterVerdict === 'All' || inv.verdict === filterVerdict;
        return matchSearch && matchFilter;
    });

    const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
    const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

    return (
        <div className="w-full max-w-5xl mx-auto mt-8 mb-16 space-y-6 px-4">
            {/* Header */}
            <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                        Investigation Dashboard
                    </h1>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Welcome back, <span className="font-bold text-indigo-500 dark:text-indigo-400">{user?.name}</span>!
                    </p>
                </div>
                <Link to="/investigate"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-px transition-all">
                    ⚡ New Investigation
                </Link>
            </div>

            {/* Search & Filter */}
            <div className="flex flex-col sm:flex-row gap-3">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search investigations..."
                    className="flex-1 px-4 py-3 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
                <select
                    value={filterVerdict}
                    onChange={(e) => setFilterVerdict(e.target.value)}
                    className="px-4 py-3 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                >
                    <option value="All">All Verdicts</option>
                    <option value="Likely True">Likely True</option>
                    <option value="Uncertain">Uncertain</option>
                    <option value="Likely False">Likely False</option>
                </select>
            </div>

            {/* Error */}
            {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm">
                    {error}
                </div>
            )}

            {/* Content */}
            {loading ? (
                <div className="space-y-4">
                    {[1, 2, 3].map(i => <div key={i} className="h-36 skeleton rounded-2xl" />)}
                </div>
            ) : paginated.length === 0 ? (
                <div className="text-center py-24 rounded-2xl bg-white dark:bg-white/3 border border-slate-100 dark:border-white/5">
                    <p className="text-5xl mb-4">🔎</p>
                    <h3 className="text-xl font-bold text-slate-700 dark:text-slate-200 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                        {allInvestigations.length === 0 ? 'No investigations yet' : 'No results found'}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 mb-6 text-sm">
                        {allInvestigations.length === 0 ? 'Submit your first viral content to investigate!' : 'Try adjusting your search or filter.'}
                    </p>
                    {allInvestigations.length === 0 && (
                        <Link to="/investigate" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 transition-all shadow-lg shadow-indigo-500/25">
                            ⚡ Start Investigating
                        </Link>
                    )}
                </div>
            ) : (
                <div className="space-y-4">
                    {paginated.map((inv) => {
                        const style = getScoreStyle(inv.credibilityScore);
                        return (
                            <div key={inv._id} className="rounded-2xl bg-white dark:bg-white/3 border border-slate-100 dark:border-white/8 p-6 card-hover">
                                {/* Top row */}
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-slate-800 dark:text-slate-100 line-clamp-2 mb-1">
                                            {inv.caption || inv.sourceUrl || 'No caption provided'}
                                        </p>
                                        <p className="text-xs text-slate-400 dark:text-slate-500">
                                            {new Date(inv.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                                        </p>
                                    </div>
                                    {inv.status === 'completed' && (
                                        <div className={`flex-shrink-0 w-16 h-16 rounded-2xl flex flex-col items-center justify-center border ${style.badge} ${style.ring}`}>
                                            <span className={`text-2xl font-black leading-none ${style.text}`}>{inv.credibilityScore}</span>
                                            <span className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">/ 100</span>
                                        </div>
                                    )}
                                </div>

                                {/* Bottom row */}
                                {inv.status === 'completed' && (
                                    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/5">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className={`text-xs font-bold px-3 py-1 rounded-full border ${style.badge}`}>
                                                {inv.verdict}
                                            </span>
                                            <button
                                                onClick={() => handleDelete(inv._id)}
                                                className="text-xs text-slate-400 hover:text-red-500 transition-colors font-medium"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 whitespace-pre-line leading-relaxed">
                                            {inv.report}
                                        </p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 pt-2">
                    <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}
                        className="px-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                        ← Previous
                    </button>
                    <span className="text-sm text-slate-400 px-3">Page {currentPage} of {totalPages}</span>
                    <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
                        className="px-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                        Next →
                    </button>
                </div>
            )}

            <p className="text-xs text-center text-slate-400 dark:text-slate-500">
                Showing {paginated.length} of {filtered.length} investigations
            </p>
        </div>
    );
};

export default Dashboard;
