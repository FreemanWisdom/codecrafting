import { useLocation, Link } from "react-router-dom";

export default function Article() {
  const { state } = useLocation();
  const article = state?.article;

  if (!article) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p className="mb-4 text-slate-800 dark:text-slate-200">No article data found.</p>
        <Link to="/" className="text-blue-500 hover:underline">Go back home</Link>
      </div>
    );
  }

  const title = article.title || "Untitled Article";
  const image = article.image_url || "https://placehold.co/600x400?text=News";
  const snippet = article.snippet || article.description || "No content available.";
  const source = article.source || "Unknown source";

  let publishedText = "Unknown date";
  if (article.published_at) {
    const publishedDate = new Date(article.published_at);
    if (!isNaN(publishedDate.getTime())) {
      publishedText = publishedDate.toLocaleString();
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-3xl min-h-screen">
      <Link to="/" className="text-blue-600 dark:text-blue-500 hover:underline mb-4 inline-block">&larr; Back to News</Link>

      <h1 className="text-3xl font-bold mb-2 text-slate-900 dark:text-white">{title}</h1>
      <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">{source} • {publishedText}</p>

      <img
        src={image}
        alt={title}
        className="w-full h-auto rounded-lg shadow-md mb-6"
        onError={(e) => { e.target.src = "https://placehold.co/600x400?text=No+Image"; }}
      />

      <p className="text-lg leading-relaxed mb-6 text-slate-700 dark:text-slate-300">{snippet}</p>

      {article.url && (
        <a
          href={article.url}
          target="_blank"
          rel="noreferrer"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition"
        >
          Read full article at source
        </a>
      )}
    </div>
  );
}
