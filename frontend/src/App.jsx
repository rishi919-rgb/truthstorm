import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-extrabold text-blue-600 dark:text-blue-400 mb-4 tracking-tight">TruthStorm AI</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
          Viral Content Investigation Platform. Uncover the truth behind viral images and claims.
        </p>
      </header>

      <main className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
        <div className="text-center py-10">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">Phase 1: Project Setup Complete</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">React and Tailwind CSS have been configured successfully!</p>
          <div className="flex justify-center gap-4">
            <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium rounded-lg transition-colors shadow-sm">
              Get Started
            </button>
            <button className="px-6 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium rounded-lg transition-colors">
              Documentation
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
