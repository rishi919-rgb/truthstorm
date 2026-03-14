import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="w-full max-w-7xl mx-auto space-y-16">
            {/* Hero Section */}
            <section className="text-center py-16 px-4 sm:px-6 lg:px-8">
                <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-6">
                    Uncover the truth behind <br className="hidden md:block" />
                    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        Viral Content
                    </span>
                </h1>
                <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10">
                    TruthStorm AI analyzes images and claims using advanced truth-engine logic to generate instant credibility scores and detailed investigation reports.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link to="/investigate" className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                        Start Investigation
                    </Link>
                    <Link to="/dashboard" className="inline-block px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 font-bold rounded-xl transition-all shadow-sm">
                        View Recent Reports
                    </Link>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 mx-4 lg:mx-0">
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="p-6 text-center">
                        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Image Verification</h3>
                        <p className="text-gray-600 dark:text-gray-400">Upload any viral image to detect manipulation, AI generation, or false context.</p>
                    </div>
                    <div className="p-6 text-center">
                        <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Claim Analysis</h3>
                        <p className="text-gray-600 dark:text-gray-400">Input viral captions or URLs for automated fact-checking against trusted sources.</p>
                    </div>
                    <div className="p-6 text-center">
                        <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Credibility Scoring</h3>
                        <p className="text-gray-600 dark:text-gray-400">Get a definitive 0-100 credibility score with a detailed breakdown of findings.</p>
                    </div>
                </div>
            </section>

            {/* Demo/Preview Section */}
            <section className="py-12 px-4 text-center">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">How It Works</h2>
                <div className="bg-gray-200 dark:bg-gray-800 rounded-2xl h-64 md:h-96 w-full max-w-4xl mx-auto flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700">
                    <p className="text-gray-500 dark:text-gray-400 text-lg">Platform interface preview will go here</p>
                </div>
            </section>
        </div>
    );
};

export default Home;
