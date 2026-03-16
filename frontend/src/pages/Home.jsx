import { Link } from 'react-router-dom';

const Home = () => {
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
                <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 dark:text-indigo-300 text-sm font-semibold">
                    <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                    Powered by Google Gemini 2.5 Flash
                </div>

                <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
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
                    <Link to="/dashboard"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10 transition-all hover:-translate-y-0.5 text-base shadow-sm">
                        📊 View Dashboard
                    </Link>
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
                            <div className={`text-3xl font-black mb-1 ${stat.color}`} style={{ fontFamily: 'Outfit, sans-serif' }}>{stat.value}</div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-black text-center text-slate-900 dark:text-white mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
                        Enterprise-grade <span className="gradient-text">AI analysis</span>
                    </h2>
                    <p className="text-center text-slate-500 dark:text-slate-400 mb-12 max-w-xl mx-auto">
                        Three layers of intelligence working together to verify every claim.
                    </p>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: '🔍',
                                title: 'Claim Analysis',
                                desc: 'Gemini reads the entire claim, verifies it against its training data, and applies expert journalistic standards.',
                                accent: 'from-indigo-500/20 to-indigo-500/5',
                                ring: 'ring-indigo-500/20'
                            },
                            {
                                icon: '🌐',
                                title: 'Source Verification',
                                desc: 'The source URL is evaluated against a live database of trusted, biased, and satirical domains.',
                                accent: 'from-violet-500/20 to-violet-500/5',
                                ring: 'ring-violet-500/20'
                            },
                            {
                                icon: '📈',
                                title: 'Credibility Scoring',
                                desc: 'Every investigation receives a 0–100 score with a full AI-written breakdown of findings.',
                                accent: 'from-cyan-500/20 to-cyan-500/5',
                                ring: 'ring-cyan-500/20'
                            },
                        ].map((feature) => (
                            <div key={feature.title} className={`relative p-6 rounded-2xl bg-gradient-to-b ${feature.accent} border border-white/10 ring-1 ${feature.ring} card-hover`}>
                                <div className="text-4xl mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>{feature.title}</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-4">
                <div className="max-w-2xl mx-auto text-center rounded-3xl p-12 bg-gradient-to-br from-indigo-600 to-violet-700 shadow-2xl shadow-indigo-500/30 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.1),transparent)] pointer-events-none" />
                    <h2 className="text-3xl md:text-4xl font-black text-white mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
                        Stop believing rumors.<br />Start investigating.
                    </h2>
                    <p className="text-indigo-200 mb-8">Join thousands using AI to cut through the noise.</p>
                    <Link to="/signup" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-700 font-bold rounded-xl hover:bg-indigo-50 transition-all shadow-lg hover:-translate-y-0.5">
                        Get Started Free →
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
