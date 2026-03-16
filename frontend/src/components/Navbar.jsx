import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import Logo from './Logo';


const Navbar = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const { dark, toggleTheme } = useTheme();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
            {/* The navbar itself is a floating pill */}
            <nav className="glass-nav rounded-full px-4 sm:px-6 py-3 flex items-center justify-between w-full max-w-4xl pointer-events-auto transition-all duration-300">
                
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                        <Logo className="w-8 h-8 drop-shadow-md transition-transform duration-300 group-hover:scale-105" />
                        <span className="text-lg font-bold text-zinc-900 dark:text-white tracking-tight hover:opacity-80 transition-opacity" style={{ fontFamily: 'Outfit, sans-serif' }}>
                            TruthStorm AI
                        </span>
                </Link>

                {/* Right side controls */}
                <div className="flex items-center gap-1 sm:gap-3">
                    
                    {/* Theme toggle - Minimalist */}
                    <button
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                        className="p-2 rounded-full text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                    >
                        {dark ? (
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.166 17.834a.75.75 0 00-1.06 1.06l1.59 1.591a.75.75 0 001.061-1.06l-1.59-1.591zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.166 6.166a.75.75 0 011.06 0l1.591 1.59a.75.75 0 01-1.061 1.061L6.166 7.227a.75.75 0 010-1.06z" />
                            </svg>
                        ) : (
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
                            </svg>
                        )}
                    </button>

                    {/* Separator */}
                    <div className="w-px h-4 bg-zinc-200 dark:bg-zinc-800 mx-1"></div>

                    {isAuthenticated ? (
                        <>
                            <Link to="/dashboard" className="text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white px-2 py-1.5 transition-colors">
                                Dashboard
                            </Link>
                            <button onClick={handleLogout} className="text-sm font-medium text-zinc-500 hover:text-red-500 dark:text-zinc-400 dark:hover:text-red-400 px-2 py-1.5 transition-colors">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white px-3 py-1.5 transition-colors">
                                Sign In
                            </Link>
                            <Link to="/signup" className="text-sm font-semibold px-4 py-2 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 hover:opacity-90 transition-opacity ml-1">
                                Get Started
                            </Link>
                        </>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
