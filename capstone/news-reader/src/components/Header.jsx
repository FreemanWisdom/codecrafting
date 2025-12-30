import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const CATEGORIES = ["General", "Sports", "Business", "Tech", "Science", "Health", "Entertainment", "Politics"];

export default function Header({ onCategorySelect }) {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleCategoryClick = (category) => {
    onCategorySelect(category.toLowerCase() === "general" ? "" : category);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md text-slate-800 dark:text-white p-4 sticky top-0 z-50 shadow-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="container mx-auto flex justify-between items-center relative">
        <div className="flex items-center gap-4">
          <button
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition text-slate-700 dark:text-slate-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1
            className="text-2xl font-black tracking-tighter bg-gradient-to-r from-blue-600 to-emerald-500 dark:from-blue-400 dark:to-emerald-400 text-transparent bg-clip-text cursor-pointer select-none"
            onClick={() => handleCategoryClick("General")}
          >
            WORLD INFO
          </h1>
        </div>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-yellow-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700"
          aria-label="Toggle Theme"
        >
          {theme === "dark" ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>
      </div>

      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xl py-4 flex flex-wrap justify-center gap-2 animate-in slide-in-from-top-2 z-40">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className="px-4 py-2 rounded-full text-sm font-medium bg-slate-100 dark:bg-slate-800 hover:bg-blue-100 dark:hover:bg-blue-900 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors border border-transparent hover:border-blue-200 dark:hover:border-blue-800"
            >
              {category}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
