import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            setError('Please fill in all fields'); return;
        }
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match'); return;
        }
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long'); return;
        }
        try {
            setLoading(true);
            await signup(formData);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message || 'Signup failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const inputClass = "w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all";
    const labelClass = "block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2";

    return (
        <div className="min-h-[90vh] flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-xl shadow-indigo-500/30 mb-4 text-3xl">
                        ⚡
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>Create an Account</h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">Join TruthStorm AI to start investigating viral content</p>
                </div>

                <div className="rounded-2xl bg-white dark:bg-white/3 border border-slate-100 dark:border-white/8 p-8 shadow-xl dark:shadow-none">
                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm text-center">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {[
                            { id: 'name', label: 'Full Name', type: 'text', placeholder: 'Jane Doe' },
                            { id: 'email', label: 'Email Address', type: 'email', placeholder: 'you@example.com' },
                            { id: 'password', label: 'Password', type: 'password', placeholder: '••••••••' },
                            { id: 'confirmPassword', label: 'Confirm Password', type: 'password', placeholder: '••••••••' },
                        ].map(({ id, label, type, placeholder }) => (
                            <div key={id}>
                                <label className={labelClass} htmlFor={id}>{label}</label>
                                <input id={id} name={id} type={type} value={formData[id]} onChange={handleChange}
                                    placeholder={placeholder} className={inputClass} />
                            </div>
                        ))}

                        <button type="submit" disabled={loading}
                            className="w-full py-3 px-4 mt-2 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:opacity-60 disabled:cursor-wait transition-all shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-px flex items-center justify-center gap-2">
                            {loading ? (
                                <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Creating Account...</>
                            ) : 'Create Account →'}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
                        Already have an account?{' '}
                        <Link to="/login" className="text-indigo-500 dark:text-indigo-400 font-semibold hover:underline">Sign in</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
