// src/components/home/BlogGroup.tsx
import React from "react";
import BlogCard from "../Common/BlogCard";
import type { Blog } from "../../Types/blog";

interface BlogGroupProps {
  title: string;
  blogs: Blog[];
  titleStyle?: "minimal" | "ecommerce";
  titleAlign?: "left" | "center";
  titleVariant?: "default" | "boxed";
  showTitle?: boolean;
}

const BlogGroup: React.FC<BlogGroupProps> = ({
  title,
  blogs,
  titleStyle = "minimal",
  titleAlign = "left",
  titleVariant = "default",
  showTitle = true,
}) => {
  if (!blogs || blogs.length === 0) return null;

  const [featured, ...others] = blogs;
  const rightBlogs = others.slice(0, 4);

  // Hàm render tiêu đề
  const renderTitle = () => {
    if (!showTitle) return null;

    const titleElement = (
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{title}</h2>
    );

    if (titleVariant === "boxed") {
      return (
        <div className="relative mb-5">
          <div className="absolute -top-8 left-1/2 -translate-x-1/2">
            <div className="bg-gradient-to-r from-yellow-200 to-pink-200 px-10 py-1 shadow-md rounded-b-xl">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                {title}
              </h2>
            </div>
          </div>
        </div>
      );
    }

    if (titleStyle === "minimal") {
      return (
        <div
          className={`flex items-center gap-3 mb-4 ${
            titleAlign === "center" ? "justify-center" : ""
          }`}
        >
          <div className="w-2 h-6 bg-green-500 rounded-md"></div>
          {titleElement}
        </div>
      );
    }

    // ecommerce style
    return (
      <div
        className={`flex justify-between mb-4 ${
          titleAlign === "center" ? "justify-center" : ""
        }`}
      >
        {titleElement}
        {titleAlign !== "center" && (
          <a href="/brands" className="text-sm text-green-600 hover:underline">
            Xem tất cả →
          </a>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-2">
      {/* Tiêu đề */}
      {renderTitle()}

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* Featured */}
        <BlogCard blog={featured} variant="featured" />

        {/* 2x2 small cards */}
        <div className="grid grid-cols-2 gap-3">
          {rightBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} variant="small" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogGroup;
