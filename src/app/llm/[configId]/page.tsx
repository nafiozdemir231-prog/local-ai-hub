"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { CommentForm } from "@/app/llm/[configId]/components/CommentForm";

interface LLMConfig {
  id: string;
  createdAt: string;
  updatedAt: string;
  platform: string;
  vram: string;
  ram: string;
  hardwareModel: string;
  modelName: string;
  quantization: string;
  contextSize: number;
  kvCache: string;
  ppSpeed: number;
  tgSpeed: number;
  note: string | null;
  generalSettings: string | null;
  starCount: number;
  userId: string;
  user: {
    name: string | null;
    email: string | null;
  };
  comments: {
    id: string;
    content: string;
    createdAt: string;
    user: {
      name: string | null;
      email: string | null;
    };
  }[];
  votes: {
    id: string;
    userId: string;
  }[];
}

export default function ConfigPage() {
  const params = useParams();
  const configId = params?.configId as string;
  const { data: session } = useSession();
  const [config, setConfig] = useState<LLMConfig | null>(null);
  const [isVoting, setIsVoting] = useState(false);
  const [voteStatus, setVoteStatus] = useState<"up" | "down" | null>(null);
  const [deletingComment, setDeletingComment] = useState<string | null>(null);
  const isAdmin = session?.user?.role === "admin";
  const isOwner = (userId: string | null) => session?.user?.id === userId;

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await fetch(`/api/configs/${configId}`);
        const data = await res.json();
        if (data.success) {
          setConfig(data.data);
          // Kullanıcı oturumuna göre oy durumunu kontrol et
          if (session?.user?.id && data.data.votes) {
            const userVote = data.data.votes.find((v: { userId: string }) => v.userId === session.user.id);
            if (userVote) {
              setVoteStatus("up");
            }
          }
        }
      } catch (err) {
        console.error("Failed to fetch config:", err);
      }
    };
    fetchConfig();
  }, [configId, session?.user?.id]);

  if (!config) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-indigo-600 mx-auto" />
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const handleVote = async () => {
    if (!session) {
      alert("Please sign in to vote");
      return;
    }
    setIsVoting(true);
    try {
      const res = await fetch(`/api/configs/${configId}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.voted) {
        setConfig({ ...config, starCount: config.starCount + 1 });
        setVoteStatus("up");
      } else {
        setConfig({ ...config, starCount: config.starCount - 1 });
        setVoteStatus(null);
      }
    } catch (err) {
      console.error("Failed to vote:", err);
    } finally {
      setIsVoting(false);
    }
  };

  const generalSettings = config.generalSettings ? config.generalSettings.split('\n') : [];

  const platformColors: Record<string, string> = {
    CUDA: "bg-blue-100 text-blue-800",
    MLX: "bg-purple-100 text-purple-800",
    ROCm: "bg-orange-100 text-orange-800",
    Vulkan: "bg-teal-100 text-teal-800",
    "Multi-GPU": "bg-pink-100 text-pink-800",
  };

  const platformColor = platformColors[config.platform] || "bg-gray-100 text-gray-800";

  return (
    <div className="container mx-auto max-w-7xl p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <span className={`inline-block rounded px-3 py-1 text-sm font-semibold ${platformColor}`}>
            {config.platform}
          </span>
          <h1 className="mt-3 text-3xl font-bold text-gray-900">{config.modelName}</h1>
          <p className="mt-1 text-sm text-gray-500">{config.hardwareModel}</p>
        </div>
        <button
          onClick={handleVote}
          disabled={isVoting}
          className={`flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium transition-all disabled:opacity-50 ${
            voteStatus === "up"
              ? "bg-yellow-400 text-yellow-900 ring-2 ring-yellow-500 ring-offset-2"
              : voteStatus === "down"
              ? "bg-red-400 text-red-900 ring-2 ring-red-500 ring-offset-2"
              : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
          }`}
        >
          <svg className="h-5 w-5" fill={voteStatus === "up" ? "currentColor" : "none"} stroke="currentColor" strokeWidth={voteStatus === "up" ? 0 : 2} viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          Vote
        </button>
      </div>

      {/* Üst bölüm: Parametreler tablosu + Kullanıcı bilgisi */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Sol: Parametreler tablosu */}
        <div className="lg:col-span-2">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">Parameters</h2>
          <div className="rounded-lg border border-gray-200 bg-white">
            <table className="w-full table-auto">
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="w-48 border-r border-gray-100 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-600">
                    VRAM
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{config.vram} GB</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="border-r border-gray-100 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-600">
                    System RAM
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{config.ram} GB</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="border-r border-gray-100 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-600">
                    Quantization
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{config.quantization}</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="border-r border-gray-100 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-600">
                    Context Size
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {config.contextSize.toLocaleString()}
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="border-r border-gray-100 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-600">
                    KV Cache
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{config.kvCache}</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="border-r border-gray-100 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-600">
                    PP Speed
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{config.ppSpeed} t/s</td>
                </tr>
                <tr>
                  <td className="border-r border-gray-100 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-600">
                    TG Speed
                  </td>
                  <td className="px-4 py-3 text-sm text-green-600 font-semibold">
                    {config.tgSpeed} t/s
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Sağ: Kullanıcı bilgisi */}
        <div>
          <h2 className="mb-4 text-xl font-semibold text-gray-900">Shared by</h2>
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-gray-200" />
              <div>
                <p className="font-medium text-gray-900">{config.user.name ?? "Anonymous"}</p>
                <p className="text-sm text-gray-500">
                  {config.user.email ?? "No email"}
                </p>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1">
              <svg className="h-4 w-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm font-medium text-gray-700">{config.starCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* General Settings */}
      {generalSettings.length > 0 && (
        <div className="mt-8">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">General Settings</h2>
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <pre className="whitespace-pre-wrap text-sm text-gray-600">{config.generalSettings}</pre>
          </div>
        </div>
      )}

      {/* Note */}
      {config.note && (
        <div className="mt-8">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">Note</h2>
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <p className="text-sm text-gray-600">{config.note}</p>
          </div>
        </div>
      )}

      {/* Yorum Formu */}
      <div className="mt-8">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">Comment</h2>
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <CommentForm configId={configId} />
        </div>
      </div>

      {/* Yorumlar */}
      <div className="mt-8">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">
          Comments ({config.comments?.length ?? 0})
        </h2>
        <div className="space-y-4">
          {config.comments?.map((comment) => (
            <div key={comment.id} className="rounded-lg border border-gray-200 bg-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-gray-200" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{comment.user.name ?? "Anonymous"}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(comment.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                {(isOwner(comment.user.email) || isAdmin) && (
                  <button
                    onClick={async () => {
                      if (!confirm("Delete this comment?")) return;
                      setDeletingComment(comment.id);
                      const res = await fetch(`/api/configs/${configId}/comments?commentId=${comment.id}`, { method: "DELETE" });
                      setDeletingComment(null);
                      if (res.ok) {
                        setConfig({ ...config, comments: config.comments.filter(c => c.id !== comment.id) });
                      } else {
                        const data = await res.json();
                        alert(data.error || "Failed to delete");
                      }
                    }}
                    disabled={deletingComment === comment.id}
                    className="rounded bg-red-100 px-2 py-1 text-xs text-red-600 hover:bg-red-200 disabled:opacity-50"
                  >
                    {deletingComment === comment.id ? "Deleting..." : "Delete"}
                  </button>
                )}
              </div>
              <p className="mt-2 text-sm text-gray-600">{comment.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
