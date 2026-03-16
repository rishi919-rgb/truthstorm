import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!formData.email || !formData.password) { setError('Please fill in all fields'); return; }
        try {
            setLoading(true);
            await login(formData);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    const inputClass = "w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all";

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-xl shadow-indigo-500/30 mb-4 text-3xl">
                        ⚡
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>Welcome Back</h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">Sign in to continue your investigations</p>
                </div>

                <div className="rounded-2xl bg-white dark:bg-white/3 border border-slate-100 dark:border-white/8 p-8 shadow-xl dark:shadow-none">
                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm text-center">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2" htmlFor="email">Email Address</label>
                            <input id="email" name="email" type="email" value={formData.email} onChange={handleChange}
                                placeholder="you@example.com" className={inputClass} />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2" htmlFor="password">Password</label>
                            <input id="password" name="password" type="password" value={formData.password} onChange={handleChange}
                                placeholder="••••••••" className={inputClass} />
                        </div>

                        <button type="submit" disabled={loading}
                            className="w-full py-3 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:opacity-60 disabled:cursor-wait transition-all shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-px flex items-center justify-center gap-2">
                            {loading ? (
                                <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Signing in...</>
                            ) : 'Sign In →'}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
                        Don&apos;t have an account?{' '}
                        <Link to="/signup" className="text-indigo-500 dark:text-indigo-400 font-semibold hover:underline">Sign up free</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
