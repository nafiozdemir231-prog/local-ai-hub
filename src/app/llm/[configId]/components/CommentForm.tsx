"use client";

import { useState, useEffect, useCallback } from "react";

interface CommentFormProps {
  configId: string;
}

export function CommentForm({ configId }: CommentFormProps) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch("/api/auth/session");
        const data = await res.json();
        if (data?.user) {
          setUser(data.user);
        }
      } catch (err) {
        console.error("Failed to fetch session:", err);
      }
    };
    fetchSession();
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch(`/api/configs/${configId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: content.trim() }),
      });

      if (res.ok) {
        setContent("");
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        const data = await res.json();
        setError(data.error || "Failed to post comment");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [content, configId]);

  if (!user) {
    return (
      <p className="text-sm text-gray-500">
        Please sign in to comment.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <p className="text-sm text-gray-500">
          Commenting as <span className="font-medium text-gray-900">{user.name ?? user.email}</span>
        </p>
      </div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your comment..."
        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none"
        rows={3}
        disabled={loading}
      />
      {success && (
        <p className="text-sm text-green-600">Comment posted successfully!</p>
      )}
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading || !content.trim()}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? "Posting..." : "Post Comment"}
        </button>
      </div>
    </form>
  );
}
