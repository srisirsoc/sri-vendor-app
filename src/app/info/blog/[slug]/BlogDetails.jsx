// BlogDetails.jsx
import { ISTDate } from "@/library/dates";
import React from "react";

const BlogDetails = ({ blog }) => {
    if (!blog) return null;
    const { title, author, published_at, content, images, count } = blog;
    return (
        <div className="blog-details-container">
            <h1 className="blog-details-title">{title}</h1>
            <div className="blog-details-meta">
                <span>By {author?.name || "Unknown"}</span>
                <span>{ISTDate(published_at)}</span>
                <span>💬 {count.comments} ❤️ {count.likes} 👁️ {count.views}</span>
            </div>

            {images.length > 0 && (
                <div className="blog-details-main-image">
                    <img src={images[0].url} alt={images[0].title} />
                </div>
            )}

            <div className="blog-details-content">
                {content.map((block, idx) => {
                    switch (block.type) {
                        case "HEADING":
                            return <h2 key={idx}>{block.text}</h2>;
                        case "HIGHTLIGHT":
                            return <blockquote key={idx}>{block.text}</blockquote>;
                        case "CONTENT":
                            return <p key={idx}>{block.text}</p>;
                        default: return block.image ? <img key={idx} src={block.image} alt={block.text} className="blog-content-image" /> : null;
                    }
                })}
            </div>
        </div>
    );
};

export default BlogDetails;