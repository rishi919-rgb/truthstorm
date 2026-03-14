import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col font-sans transition-colors duration-200">
            <Navbar />
            <main className="flex-grow flex flex-col items-center justify-center p-4">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
