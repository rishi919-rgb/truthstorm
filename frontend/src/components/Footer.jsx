const Footer = () => {
    return (
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 mt-auto">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="md:flex md:items-center md:justify-between">
                    <div className="flex justify-center md:justify-start mb-4 md:mb-0">
                        <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            TruthStorm AI
                        </span>
                    </div>
                    <div className="mt-8 md:mt-0 md:order-1 flex justify-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                        <p>&copy; {new Date().getFullYear()} TruthStorm AI. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
