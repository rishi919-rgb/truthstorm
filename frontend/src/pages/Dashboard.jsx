import { useState, useEffect } from 'react';
import { apiGetInvestigations, apiDeleteInvestigation } from '../services/api';
import { Link } from 'react-router-dom';

const InvestigationCard = ({ inv, onDelete }) => {
    const [expanded, setExpanded] = useState(false);

    const getScoreStyle = (score) => {
        if (score === undefined || score === null) return { color: 'text-zinc-500', glow: '' };
        if (score >= 70) return { color: 'text-emerald-500 dark:text-emerald-400', glow: 'score-true' };
        if (score >= 40) return { color: 'text-amber-500 dark:text-amber-400', glow: 'score-uncertain' };
        return { color: 'text-red-500 dark:text-red-400', glow: 'score-false' };
    };

    const getVerdictBadge = (verdict) => {
        if (!verdict) return null;
        const base = "px-2.5 py-1 text-xs font-semibold rounded-md border";
        if (verdict === 'Likely True') return <span className={`${base} bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400`}>{verdict}</span>;
        if (verdict === 'Uncertain') return <span className={`${base} bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400`}>{verdict}</span>;
        return <span className={`${base} bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400`}>{verdict}</span>;
    };

    const style = getScoreStyle(inv.credibilityScore);
    // If an image URL was provided but no base64 (older records), use the imageUrl directly
    const displayImage = inv.imageBase64 || (inv.imageUrl && inv.imageUrl.startsWith('http') ? inv.imageUrl : null);

    return (
        <div className={`bento-card card-hover group relative transition-all duration-300 ${expanded ? 'ring-1 ring-indigo-500/20' : ''}`}>
            {/* Clickable header row */}
            <div
                className="p-6 cursor-pointer flex flex-col md:flex-row gap-6"
                onClick={() => setExpanded(prev => !prev)}
            >
                {/* Left: Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3">
                        {getVerdictBadge(inv.verdict)}
                        <span className="text-xs text-zinc-400">
                            {new Date(inv.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                        {displayImage && (
                            <span className="text-xs text-indigo-500 dark:text-indigo-400 flex items-center gap-1">
                                <span>🖼️</span> Has Image
                            </span>
                        )}
                    </div>

                    <h3 className="text-base font-semibold text-zinc-900 dark:text-white mb-2 truncate" title={inv.caption || inv.sourceUrl}>
                        {inv.caption || inv.sourceUrl || "Image Investigation"}
                    </h3>

                    {!expanded && (
                        <div className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed overflow-hidden"
                             style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                            {inv.report}
                        </div>
                    )}
                </div>

                {/* Right: Score */}
                <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start gap-4 shrink-0 border-t md:border-t-0 md:border-l border-zinc-200 dark:border-white/5 pt-4 md:pt-0 md:pl-6">
                    {inv.status === 'completed' && inv.credibilityScore !== undefined ? (
                        <div className={`flex items-center justify-center w-14 h-14 rounded-full border border-zinc-200 dark:border-white/10 shrink-0 bg-white/50 dark:bg-white/5 ${style.glow}`}>
                            <span className={`text-xl font-bold ${style.color}`} style={{fontFamily: 'Outfit, sans-serif'}}>{inv.credibilityScore}</span>
                        </div>
                    ) : (
                        <div className="w-14 h-14 rounded-full border border-dashed border-zinc-300 dark:border-zinc-700 flex items-center justify-center">
                            <span className="text-zinc-400 text-xs text-center leading-tight">No<br/>Score</span>
                        </div>
                    )}
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-zinc-400">{expanded ? '▲ Less' : '▼ More'}</span>
                    </div>
                </div>
            </div>

            {/* Expanded view */}
            {expanded && (
                <div className="px-6 pb-6 border-t border-zinc-200 dark:border-white/5 pt-5 space-y-5">
                    {/* Image preview */}
                    {displayImage && (
                        <div>
                            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-3">Submitted Evidence</p>
                            <div className="relative rounded-2xl overflow-hidden border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/[0.02]">
                                <img
                                    src={displayImage}
                                    alt="Investigation evidence"
                                    className="w-full max-h-80 object-contain"
                                    onError={(e) => { e.target.style.display='none'; }}
                                />
                            </div>
                        </div>
                    )}

                    {/* ── Key Findings Panel ── */}
                    {inv.keyFindings && inv.keyFindings.length > 0 && (
                        <div className="rounded-2xl border border-zinc-200 dark:border-white/[0.06] bg-zinc-50/50 dark:bg-white/[0.02] overflow-hidden">
                            {/* Header */}
                            <div className="px-5 py-3 border-b border-zinc-200 dark:border-white/[0.06] flex items-center gap-2.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                                <p className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
                                    Key Findings
                                </p>
                                <span className="ml-auto text-xs font-semibold tabular-nums text-zinc-400 dark:text-zinc-500">
                                    {inv.keyFindings.length} signal{inv.keyFindings.length !== 1 ? 's' : ''}
                                </span>
                            </div>
                            {/* Findings list */}
                            <ul className="divide-y divide-zinc-200 dark:divide-white/[0.04]">
                                {inv.keyFindings.map((finding, i) => {
                                    // Heuristic coloring — red for negative, green for positive, zinc for neutral
                                    const lower = finding.toLowerCase();
                                    const isNeg = /false|manipulat|exaggerat|mismatch|no (trusted|verified|credible|source)|mislead|fabricat|suspicious|inconsistent|unverified|no evidence|contradict/i.test(lower);
                                    const isPos = /trusted|verified|credible|high trust|supports|reliable|accurate|evidence confirm/i.test(lower);
                                    const dotColor = isNeg
                                        ? 'bg-red-500'
                                        : isPos
                                        ? 'bg-emerald-500'
                                        : 'bg-amber-400';
                                    const numColor = isNeg
                                        ? 'text-red-500 dark:text-red-400 bg-red-500/10 border-red-500/20'
                                        : isPos
                                        ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                                        : 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20';

                                    return (
                                        <li key={i} className="px-5 py-3 flex items-start gap-3 group/item">
                                            <div className={`mt-1 w-1.5 h-1.5 rounded-full shrink-0 ${dotColor}`} />
                                            <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-snug flex-1">
                                                {finding}
                                            </p>
                                            <span className={`text-[10px] font-bold border rounded px-1.5 py-0.5 shrink-0 tabular-nums opacity-60 ${numColor}`}>
                                                #{i + 1}
                                            </span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    )}

                    {/* Full AI report */}
                    <div>
                        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-3">Full Analysis</p>
                        <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">{inv.report}</p>
                    </div>

                    {/* Links + Actions */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-zinc-200 dark:border-white/5">
                        <div className="flex flex-wrap gap-3">
                            {inv.sourceUrl && (
                                <a href={inv.sourceUrl} target="_blank" rel="noreferrer"
                                    className="text-xs font-medium text-indigo-500 hover:underline inline-flex items-center gap-1">
                                    Source Article ↗
                                </a>
                            )}
                            {inv.imageUrl && (
                                <a href={inv.imageUrl} target="_blank" rel="noreferrer"
                                    className="text-xs font-medium text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 inline-flex items-center gap-1">
                                    Original Image ↗
                                </a>
                            )}
                        </div>
                        <button
                            onClick={(e) => { e.stopPropagation(); onDelete(inv._id); }}
                            className="text-xs font-medium text-zinc-400 hover:text-red-500 transition-colors">
                            Delete Report
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

const Dashboard = () => {
    const [investigations, setInvestigations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [verdictFilter, setVerdictFilter] = useState('All');

    useEffect(() => {
        fetchInvestigations();
    }, []);

    const fetchInvestigations = async () => {
        try {
            const data = await apiGetInvestigations();
            setInvestigations(data);
        } catch (err) {
            setError(err.message || 'Failed to load investigations');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this report?')) return;
        try {
            await apiDeleteInvestigation(id);
            setInvestigations(prev => prev.filter(inv => inv._id !== id));
        } catch (err) {
            alert(err.message || 'Failed to delete');
        }
    };

    const filteredInvestigations = investigations.filter(inv => {
        const matchesSearch = inv.caption?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              inv.sourceUrl?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesVerdict = verdictFilter === 'All' || inv.verdict === verdictFilter;
        return matchesSearch && matchesVerdict;
    });

    if (loading) {
        return (
            <div className="w-full max-w-5xl mx-auto px-4 pt-24 pb-16">
                <div className="flex justify-between items-center mb-10">
                    <div className="skeleton w-64 h-10"></div>
                </div>
                <div className="space-y-4">
                    {[1, 2, 3].map(n => <div key={n} className="skeleton w-full h-32 rounded-2xl"></div>)}
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-5xl mx-auto px-4 pt-24 pb-16">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2 tracking-tight" style={{fontFamily: 'Outfit, sans-serif'}}>Investigations</h1>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm">Your private history of verified claims.</p>
                </div>
                <Link to="/investigate" className="btn-premium px-6 py-2.5 rounded-full font-medium text-sm inline-flex items-center gap-2 self-start md:self-auto">
                    <span>+</span> New Scan
                </Link>
            </div>

            {error && (
                <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
                    {error}
                </div>
            )}

            {/* Controls */}
            {investigations.length > 0 && (
                <div className="flex flex-col sm:flex-row gap-3 mb-8">
                    <input type="text" placeholder="Search investigations..." 
                           className="input-premium px-4 py-2.5 rounded-lg text-sm w-full sm:max-w-xs"
                           value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    
                    <select className="input-premium px-4 py-2.5 rounded-lg text-sm appearance-none"
                            value={verdictFilter} onChange={(e) => setVerdictFilter(e.target.value)}>
                        <option value="All">All Verdicts</option>
                        <option value="Likely True">Likely True</option>
                        <option value="Uncertain">Uncertain</option>
                        <option value="Likely False">Likely False</option>
                    </select>
                </div>
            )}

            {/* List */}
            {investigations.length === 0 ? (
                <div className="bento-card p-12 text-center border-dashed border-2 bg-transparent dark:bg-transparent">
                    <div className="text-4xl mb-4 opacity-50">🔍</div>
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2" style={{fontFamily: 'Outfit, sans-serif'}}>No investigations yet</h3>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-6 max-w-md mx-auto">Upload an image or paste a viral claim to generate your first AI fact-check report.</p>
                    <Link to="/investigate" className="btn-premium px-6 py-2.5 rounded-full font-medium text-sm inline-flex">
                        Start your first scan
                    </Link>
                </div>
            ) : filteredInvestigations.length === 0 ? (
                <div className="py-12 text-center text-zinc-500 dark:text-zinc-400 text-sm">
                    No matching investigations found.
                </div>
            ) : (
                <div className="grid gap-4">
                    {filteredInvestigations.map((inv) => (
                        <InvestigationCard key={inv._id} inv={inv} onDelete={handleDelete} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
