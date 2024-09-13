"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchNews } from "@/lib/api";
import { News } from "@/lib/types";

export default function NewsPage() {
  const [news, setNews] = useState<News[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const loadNews = async () => {
      try {
        const token = localStorage.getItem("token");

        // If no token is found, redirect to login page
        if (!token) {
          router.push("/login");
          return;
        }

        // Fetch news with the token in headers
        const response = await fetchNews(token);
        setNews(response.data);
      } catch (error) {
        setError("Failed to load news. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, [router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (news.length === 0) {
    return <p>No news available.</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-4xl w-full bg-white p-6 shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-6">News</h1>
        <ul>
          {news.map((item) => (
            <li key={item.id} className="mb-4 border-b pb-4">
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p>{item.content}</p>
              <span className="text-sm text-gray-500">
                {new Date(item.publicationDate).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
