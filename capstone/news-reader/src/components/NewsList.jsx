import NewsCard from "./NewsCard";

export default function NewsList({ articles }) {
  if (!Array.isArray(articles)) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article, index) => (
        <NewsCard key={article.uuid || index} article={article} />
      ))}
    </div>
  );
}
