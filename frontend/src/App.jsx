import './App.css';
import Layout from './components/Layout';

function App() {
  return (
    <Layout>
      <header className="mb-12 text-center w-full mt-10">
        <h1 className="text-5xl font-extrabold text-blue-600 dark:text-blue-400 mb-4 tracking-tight">TruthStorm AI</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Viral Content Investigation Platform. Uncover the truth behind viral images and claims.
        </p>
      </header>

      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700 mx-auto">
        <div className="text-center py-10">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">Phase 4: Base Layout Complete</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">Navbar, Footer, and Layout components have been added successfully!</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium rounded-lg transition-colors shadow-sm">
              Get Started
            </button>
            <button className="px-6 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium rounded-lg transition-colors">
              Documentation
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default App;
