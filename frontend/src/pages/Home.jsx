import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from '../components/Logo';
import { useEffect, useState } from 'react';
import { apiGetInvestigations } from '../services/api';

const TIPS = [
  "💡 Include a source URL for dramatically more accurate results.",
  "🔍 Try pasting full WhatsApp forwards to fact-check them instantly.",
  "📰 A score above 75 means the claim is likely trustworthy.",
  "🚨 Scores below 40 indicate the claim contains signs of misinformation.",
  "🌐 Known trustworthy domains automatically boost the baseline trust score.",
];

const LoggedInSection = () => {
    const [stats, setStats] = useState({ total: 0, trueCount: 0, falseCount: 0 });
    const [tipIndex, setTipIndex] = useState(0);

    useEffect(() => {
        apiGetInvestigations().then(data => {
            const trueCount = data.filter(i => i.verdict === 'Likely True').length;
            const falseCount = data.filter(i => i.verdict === 'Likely False').length;
            setStats({ total: data.length, trueCount, falseCount });
        }).catch(() => {});
    }, []);

    useEffect(() => {
        const interval = setInterval(() => setTipIndex(i => (i + 1) % TIPS.length), 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-12 md:py-24 px-4 border-t border-zinc-200 dark:border-white/5 bg-zinc-50/50 dark:bg-transparent">
            <div className="max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row items-baseline justify-between mb-8 gap-4">
                    <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white" style={{fontFamily: 'Outfit, sans-serif'}}>
                        Your Command Center
                    </h2>
                    <div className="flex gap-3">
                        <Link to="/investigate" className="btn-premium px-6 py-2.5 rounded-full font-medium text-sm inline-flex items-center gap-2">
                            <span>⚡</span> New Scan
                        </Link>
                        <Link to="/dashboard" className="px-6 py-2.5 rounded-full font-medium text-sm text-zinc-600 dark:text-zinc-300 bg-zinc-200/50 hover:bg-zinc-200 dark:bg-zinc-800/50 dark:hover:bg-zinc-800 transition-colors">
                            View All
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    {/* Main Stats Bento */}
                    <div className="md:col-span-2 bento-card p-8 flex flex-col justify-center relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 text-zinc-300 dark:text-zinc-800 transition-transform group-hover:scale-110 duration-500">
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2v20m10-10H2" /></svg>
                        </div>
                        <h3 className="text-sm font-semibold text-zinc-500 tracking-wider uppercase mb-1">Total Scans</h3>
                        <div className="text-6xl font-black text-zinc-900 dark:text-white" style={{fontFamily: 'Outfit, sans-serif'}}>{stats.total}</div>
                    </div>

                    <div className="md:col-span-1 bento-card p-6 flex flex-col justify-between">
                        <h3 className="text-xs font-semibold text-emerald-600 dark:text-emerald-500 tracking-wider uppercase mb-4">Verified True</h3>
                        <div className="text-4xl font-bold text-zinc-900 dark:text-white">{stats.trueCount}</div>
                    </div>

                    <div className="md:col-span-1 bento-card p-6 flex flex-col justify-between">
                        <h3 className="text-xs font-semibold text-red-600 dark:text-red-500 tracking-wider uppercase mb-4">Debunked</h3>
                        <div className="text-4xl font-bold text-zinc-900 dark:text-white">{stats.falseCount}</div>
                    </div>
                </div>

                {/* Rotating pro tips */}
                <div className="bento-card p-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center shrink-0">
                        <span className="text-indigo-600 dark:text-indigo-400 text-sm">💡</span>
                    </div>
                    <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        {TIPS[tipIndex]}
                    </p>
                </div>
            </div>
        </section>
    );
};

const Home = () => {
    const { isAuthenticated } = useAuth();

    return (
        <div className="w-full relative min-h-screen pt-16">
            <div className="premium-gradient-bg" />
            
            {/* Hero */}
            <section className="relative px-4 pt-20 pb-16 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32 max-w-5xl mx-auto flex flex-col items-center text-center">
                
                <div className="mb-8 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-200 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-md shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                    <span className="text-xs font-medium text-zinc-600 dark:text-zinc-300">Gemini 2.5 Flash Engine Active</span>
                </div>

                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight" style={{fontFamily: 'Outfit, sans-serif', lineHeight: '1.15'}}>
                    <span className="text-zinc-900 dark:text-white">Truth is no longer </span>
                    <br className="hidden sm:block" />
                    {/* Redacted word — select it to reveal */}
                    <span className="gradient-text reveal-selectable">IMMUTABLE.</span>
                </h1>

                {/* Aesthetic hint with arrow — only visible in light mode where the bug appears */}
                <div className="reveal-hint-wrapper mt-4 mb-8 dark:hidden">
                    <div className="reveal-arrow" aria-hidden="true">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 19V5M5 12l7-7 7 7"/>
                        </svg>
                    </div>
                    <div className="reveal-hint">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                            <path d="M12 19V5M5 12l7-7 7 7"/>
                        </svg>
                        <span>Select the text to unredact</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                            <path d="M12 19V5M5 12l7-7 7 7"/>
                        </svg>
                    </div>
                </div>

                <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
                    TruthStorm exposes misinformation using advanced multimodal AI. Upload an image, paste a claim, or verify a source in milliseconds.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <Link to="/investigate" className="btn-premium px-8 py-4 rounded-full font-semibold text-base inline-flex items-center justify-center gap-2">
                        Start Investigating
                    </Link>
                    {isAuthenticated ? (
                        <Link to="/dashboard" className="px-8 py-4 rounded-full font-semibold text-base text-zinc-700 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800/50 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors inline-flex items-center justify-center">
                            Open Dashboard
                        </Link>
                    ) : (
                        <Link to="/signup" className="px-8 py-4 rounded-full font-semibold text-base text-zinc-700 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800/50 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors inline-flex items-center justify-center border border-transparent dark:border-white/5">
                            Create Free Account
                        </Link>
                    )}
                </div>
            </section>

            {/* Architecture Bento Grid */}
            <section className="px-4 pb-20 md:pb-32">
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        
                        <div className="md:col-span-2 bento-card p-8 md:p-12 relative overflow-hidden group">
                            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-indigo-500/20 blur-3xl rounded-full" />
                            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3 tracking-tight" style={{fontFamily: 'Outfit, sans-serif'}}>Multimodal Analysis</h3>
                            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-md">
                                Don't just verify text. Upload screenshots, WhatsApp forwards, or memes. The vision model sees the image, reads the text, and checks it against global data.
                            </p>
                            <div className="mt-8 pt-8 border-t border-zinc-200 dark:border-white/10 flex items-center gap-4 text-sm font-medium text-zinc-500">
                                <span>Images</span>
                                <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700"></span>
                                <span>Text Claims</span>
                                <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700"></span>
                                <span>News URLs</span>
                            </div>
                        </div>

                        <div className="md:col-span-1 bento-card p-8 flex flex-col justify-between relative overflow-hidden">
                            <div className="absolute -right-10 -top-10 w-40 h-40 bg-emerald-500/10 blur-3xl rounded-full" />
                            <div>
                                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3 tracking-tight" style={{fontFamily: 'Outfit, sans-serif'}}>Real-time</h3>
                                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm">
                                    Time-aware AI that knows today's date, preventing hallucinations about recent events.
                                </p>
                            </div>
                            <div className="mt-8 text-4xl">⏱️</div>
                        </div>

                        <div className="md:col-span-1 bento-card p-8 flex flex-col justify-between">
                            <div>
                                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3 tracking-tight" style={{fontFamily: 'Outfit, sans-serif'}}>Scoring System</h3>
                                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm">
                                    0 to 100 credibility index, removing ambiguity from fact-checking.
                                </p>
                            </div>
                            <div className="mt-8 flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                            </div>
                        </div>

                        <div className="md:col-span-2 bento-card p-8 md:p-12 relative overflow-hidden">
                            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3 tracking-tight" style={{fontFamily: 'Outfit, sans-serif'}}>Enterprise Security</h3>
                            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-md">
                                Every investigation is privately scoped to your account. We don't train on your personal uploads. Open authentication architecture.
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            {/* Bottom section - auth-aware */}
            {isAuthenticated ? (
                <LoggedInSection />
            ) : (
                <section className="py-24 px-4 border-t border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-zinc-900/20">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-4xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight" style={{fontFamily: 'Outfit, sans-serif'}}>
                            Stop guessing. Know for sure.
                        </h2>
                        <p className="text-zinc-600 dark:text-zinc-400 mb-10 text-lg">Create a free account to access the TruthStorm engine instantly.</p>
                        <Link to="/signup" className="btn-premium px-8 py-4 rounded-full font-semibold text-base inline-flex">
                            Get Started Free
                        </Link>
                    </div>
                </section>
            )}
        </div>
    );
};

export default Home;
