import { useState, useEffect } from "react";
import { fetchHeadlines } from "../services/newsApi";
import NewsList from "../components/NewsList";
import SearchBar from "../components/SearchBar";

export default function Home({ category }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Load news when category changes or initial load
  useEffect(() => {
    setSearchTerm(""); // Reset search when category changes
    setPage(1);
    loadNews("", 1, category, false);
  }, [category]);

  const loadNews = async (query = "", pageNum = 1, cat = "", append = false) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetchHeadlines(query, pageNum, cat);
      const newArticles = response.data;

      if (append) {
        setArticles((prev) => [...prev, ...newArticles]);
      } else {
        setArticles(newArticles);
      }

      setHasMore(newArticles.length > 0);
      setPage(pageNum);

    } catch (err) {
      console.error(err);
      setError("Unable to load news. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchTerm(query);
    setPage(1);
    // When searching, we can either keep category filter or clear it. 
    // Usually searching "Technology" inside "Sports" category is valid, but TheNewsAPI might treat them independently.
    // For simplicity, let's keep the category context if allowed, or reset it if user wants global search.
    // Let's pass the current category.
    loadNews(query, 1, category, false);
  };

  const handleLoadMore = () => {
    loadNews(searchTerm, page + 1, category, true);
  };

  const getPageTitle = () => {
    if (searchTerm) return `Results: "${searchTerm}"`;
    if (category) return `${category} News`;
    return "Latest Headlines";
  };

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 mt-4">
        <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-400 dark:from-slate-100 dark:to-slate-400 capitalize">
          {getPageTitle()}
        </h1>
        <SearchBar onSearch={handleSearch} />
      </div>

      {error && !loading && articles.length === 0 && (
        <div className="bg-red-900/50 border border-red-500 text-red-200 p-4 rounded text-center my-8">
          {error}
        </div>
      )}

      {articles.length > 0 && (
        <>
          <NewsList articles={articles} />

          {hasMore ? (
            <div className="flex justify-center mt-12 mb-8">
              <button
                onClick={handleLoadMore}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-blue-500/30 transition-all transform hover:-translate-y-1 active:translate-y-0 disabled:transform-none disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading && <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>}
                {loading ? "Loading..." : "Load More Stories"}
              </button>
            </div>
          ) : (
            <p className="text-center text-slate-500 mt-12">You've reached the end.</p>
          )}
        </>
      )}

      {loading && articles.length === 0 && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {!loading && !error && articles.length === 0 && (
        <div className="text-center text-slate-400 mt-20">
          <p className="text-xl">No articles found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
