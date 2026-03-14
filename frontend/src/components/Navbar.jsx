import { Link } from 'react-router';

const Navbar = () => {
    return (
        <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-100 dark:border-gray-700 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        {/* Replace '#' with '/' once routing is in place */}
                        <a href="#" className="flex-shrink-0 flex items-center gap-2">
                            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                TruthStorm AI
                            </span>
                        </a>
                    </div>
                    <div className="flex items-center space-x-4">
                        <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                            Dashboard
                        </a>
                        <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                            Login
                        </a>
                        <a href="#" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm">
                            Sign Up
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
