import { Link } from "react-router-dom";

export default function NewsCard({ article }) {
  if (!article) return null;

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">
      <div className="relative overflow-hidden h-48">
        <img
          src={article.image_url || "/placeholder.jpg"}
          alt={article.title || "News Image"}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => { e.target.src = "/placeholder.jpg"; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h2 className="font-bold text-xl mb-3 line-clamp-2 leading-tight min-h-[3.5rem]">
          <Link to="/article" state={{ article }} className="text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {article.title || "No Title"}
          </Link>
        </h2>

        {/* Prioritize description over snippet if available, as it's often richer */}
        <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-3 text-sm flex-grow leading-relaxed">
          {article.description || article.snippet || "No description available."}
        </p>

        <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
          <span>{article.source || "Unknown Source"}</span>
          <span className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-full">{article.published_at ? new Date(article.published_at).toLocaleDateString() : "Unknown Date"}</span>
        </div>
      </div>
    </div>
  );
}
