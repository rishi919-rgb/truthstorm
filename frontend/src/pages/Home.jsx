import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import { apiGetInvestigations } from '../services/api';

// Quick tips carousel for logged-in users
const TIPS = [
  "💡 Add a source URL for dramatically more accurate results.",
  "🔍 Try pasting full WhatsApp forwards to fact-check them instantly.",
  "📰 Credibility score above 75 means the claim is likely trustworthy.",
  "🚨 Scores below 40 indicate the claim contains signs of misinformation.",
  "🌐 Reuters, BBC, AP News links get the highest source trust scores.",
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
        <section className="py-12 px-4">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6" style={{fontFamily: 'Outfit, sans-serif'}}>
                    Your Investigation Summary
                </h2>

                {/* Personal stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    {[
                        { value: stats.total, label: 'Total Investigations', color: 'text-indigo-400', bg: 'from-indigo-500/15 to-transparent', ring: 'ring-indigo-500/20' },
                        { value: stats.trueCount, label: 'Likely True', color: 'text-emerald-400', bg: 'from-emerald-500/15 to-transparent', ring: 'ring-emerald-500/20' },
                        { value: stats.falseCount, label: 'Likely False', color: 'text-red-400', bg: 'from-red-500/15 to-transparent', ring: 'ring-red-500/20' },
                    ].map(stat => (
                        <div key={stat.label} className={`p-5 rounded-2xl bg-gradient-to-b ${stat.bg} border border-white/10 ring-1 ${stat.ring} text-center`}>
                            <div className={`text-4xl font-black mb-1 ${stat.color}`} style={{fontFamily: 'Outfit, sans-serif'}}>{stat.value}</div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Quick actions */}
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    <Link to="/investigate"
                        className="flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-700 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all card-hover">
                        <div className="text-4xl">⚡</div>
                        <div>
                            <div className="font-bold text-lg" style={{fontFamily: 'Outfit, sans-serif'}}>New Investigation</div>
                            <div className="text-indigo-200 text-sm">Analyze a viral claim or news story</div>
                        </div>
                    </Link>
                    <Link to="/dashboard"
                        className="flex items-center gap-4 p-5 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white hover:bg-slate-50 dark:hover:bg-white/10 hover:-translate-y-0.5 transition-all card-hover">
                        <div className="text-4xl">📊</div>
                        <div>
                            <div className="font-bold text-lg" style={{fontFamily: 'Outfit, sans-serif'}}>My Dashboard</div>
                            <div className="text-slate-500 dark:text-slate-400 text-sm">View all past investigations &amp; reports</div>
                        </div>
                    </Link>
                </div>

                {/* Rotating pro tips */}
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium transition-all">
                    <span className="text-amber-300 font-bold mr-1">Pro Tip:</span>
                    {TIPS[tipIndex]}
                </div>
            </div>
        </section>
    );
};

const Home = () => {
    const { isAuthenticated } = useAuth();

    return (
        <div className="w-full">
            {/* Hero */}
            <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
                {/* Animated background blobs */}
                <div className="absolute inset-0 overflow-hidden -z-10">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-indigo-600/20 dark:bg-indigo-600/25 blur-3xl animate-blob" />
                    <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-violet-600/20 dark:bg-violet-600/25 blur-3xl animate-blob animation-delay-2000" />
                    <div className="absolute bottom-1/4 left-1/2 w-72 h-72 rounded-full bg-cyan-500/15 dark:bg-cyan-500/20 blur-3xl animate-blob animation-delay-4000" />
                </div>

                {/* Badge */}
                <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 text-sm font-semibold">
                    <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                    Powered by Google Gemini 2.5 Flash
                </div>

                <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-tight" style={{fontFamily: 'Outfit, sans-serif'}}>
                    <span className="text-slate-900 dark:text-white">Uncover the truth</span>
                    <br />
                    <span className="gradient-text">behind viral content</span>
                </h1>

                <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                    TruthStorm AI uses advanced LLM-powered intelligence to instantly analyze viral claims, detect misinformation, and generate detailed credibility reports.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/investigate"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all hover:-translate-y-0.5 text-base">
                        ⚡ Start Investigating
                    </Link>
                    {isAuthenticated ? (
                        <Link to="/dashboard"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10 transition-all hover:-translate-y-0.5 text-base shadow-sm">
                            📊 My Dashboard
                        </Link>
                    ) : (
                        <Link to="/signup"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10 transition-all hover:-translate-y-0.5 text-base shadow-sm">
                            🚀 Get Started Free
                        </Link>
                    )}
                </div>
            </section>

            {/* Stats */}
            <section className="py-16 px-4">
                <div className="max-w-4xl mx-auto grid grid-cols-3 gap-6 text-center">
                    {[
                        { value: '1,500+', label: 'Free daily analyses', color: 'text-indigo-400' },
                        { value: '<2s', label: 'Average response time', color: 'text-violet-400' },
                        { value: '100', label: 'Point scoring system', color: 'text-cyan-400' },
                    ].map((stat) => (
                        <div key={stat.label} className="p-6 rounded-2xl bg-white dark:bg-white/3 border border-slate-100 dark:border-white/5">
                            <div className={`text-3xl font-black mb-1 ${stat.color}`} style={{fontFamily: 'Outfit, sans-serif'}}>{stat.value}</div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-black text-center text-slate-900 dark:text-white mb-4" style={{fontFamily: 'Outfit, sans-serif'}}>
                        Enterprise-grade <span className="gradient-text">AI analysis</span>
                    </h2>
                    <p className="text-center text-slate-500 dark:text-slate-400 mb-12 max-w-xl mx-auto">
                        Three layers of intelligence working together to verify every claim.
                    </p>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { icon: '🔍', title: 'Claim Analysis', desc: 'Gemini reads the entire claim, verifies it against its training data, and applies expert journalistic standards.', accent: 'from-indigo-500/20 to-indigo-500/5', ring: 'ring-indigo-500/20' },
                            { icon: '🌐', title: 'Source Verification', desc: 'The source URL is evaluated against a database of trusted, biased, and satirical domains for reputation scoring.', accent: 'from-violet-500/20 to-violet-500/5', ring: 'ring-violet-500/20' },
                            { icon: '📈', title: 'Credibility Scoring', desc: 'Every investigation receives a 0–100 score with a full AI-written breakdown of findings and evidence.', accent: 'from-cyan-500/20 to-cyan-500/5', ring: 'ring-cyan-500/20' },
                        ].map((feature) => (
                            <div key={feature.title} className={`relative p-6 rounded-2xl bg-gradient-to-b ${feature.accent} border border-white/10 ring-1 ${feature.ring} card-hover`}>
                                <div className="text-4xl mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2" style={{fontFamily: 'Outfit, sans-serif'}}>{feature.title}</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bottom section - auth-aware */}
            {isAuthenticated ? (
                <LoggedInSection />
            ) : (
                <section className="py-20 px-4">
                    <div className="max-w-2xl mx-auto text-center rounded-3xl p-12 bg-gradient-to-br from-indigo-600 to-violet-700 shadow-2xl shadow-indigo-500/30 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.1),transparent)] pointer-events-none" />
                        <h2 className="text-3xl md:text-4xl font-black text-white mb-4" style={{fontFamily: 'Outfit, sans-serif'}}>
                            Stop believing rumors.<br />Start investigating.
                        </h2>
                        <p className="text-indigo-200 mb-8">Join thousands using AI to cut through the noise. Free forever.</p>
                        <Link to="/signup" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-700 font-bold rounded-xl hover:bg-indigo-50 transition-all shadow-lg hover:-translate-y-0.5">
                            Get Started Free →
                        </Link>
                    </div>
                </section>
            )}
        </div>
    );
};

export default Home;
