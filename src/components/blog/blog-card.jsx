const BlogCard = ({ blog = null }) => {
  if (!blog) return null;

  const { title, excerpt, slug, images, author, published_at, count } = blog;

  return (
    <div className="blog-card">
      <div className="blog-card-image">
        <img
          src={(images[0]?.url) || "/default-image.jpg"}
          alt={(images[0]?.title) || title}
        />
      </div>
      <div className="blog-card-content">
        <h3 className="blog-card-title">{title}</h3>
        <p className="blog-card-excerpt">{excerpt}</p>
        <div className="blog-card-meta">
          <span className="author">{author?.name || "Unknown"}</span>
          <span className="date">{published_at}</span>
        </div>
        <div className="blog-card-stats">
          <span>💬 {count?.comments || 0}</span>
          <span>❤️ {count?.likes || 0}</span>
          <span>👁️ {count?.views || 0}</span>
        </div>
        <a href={`/blog/${slug}`} className="blog-card-readmore">
          Read More →
        </a>
      </div>
    </div>
  );
};

export default BlogCard;