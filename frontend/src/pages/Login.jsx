import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { apiLogin } from '../services/api';
import Logo from '../components/Logo';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const data = await apiLogin(formData);
            login(data.user, data.token);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message || 'Action failed. Please check credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full flex-1 flex flex-col justify-center items-center px-4 py-24 min-h-[calc(100vh-64px)] relative">
            
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none -z-10 hidden dark:block" />

            <div className="mb-10 text-center flex flex-col items-center">
                <Link to="/" className="inline-flex mb-6 drop-shadow-lg hover:scale-105 transition-transform">
                    <Logo className="w-14 h-14" />
                </Link>
                <h2 className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight" style={{fontFamily: 'Outfit, sans-serif'}}>
                    Welcome Back
                </h2>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-3">
                    Sign in to your isolated workspace.
                </p>
            </div>

            <div className="w-full max-w-[400px] bento-card p-8 md:p-10 shadow-2xl dark:shadow-none relative overflow-hidden">
                {/* Subtle internal gradient */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full" />

                {error && (
                    <div className="mb-6 px-4 py-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-sm font-medium text-center relative z-10">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                    <div>
                        <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-widest mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email" id="email" name="email"
                            required value={formData.email} onChange={handleChange}
                            className="input-premium w-full px-4 py-3 rounded-xl text-sm transition-all"
                            placeholder="you@company.com"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-widest mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password" id="password" name="password"
                            required value={formData.password} onChange={handleChange}
                            className="input-premium w-full px-4 py-3 rounded-xl text-sm transition-all"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit" disabled={loading}
                        className="btn-premium w-full py-3 mt-4 rounded-xl font-semibold text-sm disabled:opacity-50 flex justify-center items-center gap-2"
                    >
                        {loading ? <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" /> : 'Log In'}
                    </button>
                </form>

                <p className="mt-8 text-center text-sm text-zinc-500 dark:text-zinc-400 relative z-10">
                    New to TruthStorm?{' '}
                    <Link to="/signup" className="text-zinc-900 dark:text-white font-medium hover:underline decoration-zinc-300 dark:decoration-zinc-600 underline-offset-4">
                        Create an account
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
