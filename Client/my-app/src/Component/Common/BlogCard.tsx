import React from "react";
import type { Blog } from "../../Types/blog";



interface BlogCardProps {
  blog: Blog;
  variant?: "small" | "featured";
}

const BlogCard: React.FC<BlogCardProps> = ({ blog, variant = "small" }) => {
  const { title, description, img, link } = blog;

  return (
    <a
      href={link}
      className={`bg-white rounded-lg shadow hover:shadow-lg overflow-hidden transition block ${
        variant === "featured" ? "" : "h-full"
      }`}
    >
      <img
        src={img}
        alt={title}
        className={
          variant === "featured"
            ? "w-full h-72 object-cover"
            : "w-full h-28 object-cover"
        }
      />
      <div className="p-4">
        <h3
          className={`text-gray-900 ${
            variant === "featured"
              ? "font-bold text-xl mb-2 line-clamp-2"
              : "font-semibold text-sm line-clamp-2"
          }`}
        >
          {title}
        </h3>
        {variant === "featured" && description && (
          <p className="text-sm text-gray-600 line-clamp-4">{description}</p>
        )}
      </div>
    </a>
  );
};

export default BlogCard;
