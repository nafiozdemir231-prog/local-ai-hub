"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
  starCount: number;
  userId: string;
  user?: {
    id: string;
    name: string | null;
    email: string | null;
    role: string;
  };
}

export default function ProfilePage() {
  const router = useRouter();
  const [configs, setConfigs] = useState<LLMConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchConfigs = async () => {
      try {
        const res = await fetch("/api/profile");
        const data = await res.json();
        if (data.success) {
          setConfigs(data.data);
        }
      } catch {
        console.error("Failed to fetch profile:");
      } finally {
        setLoading(false);
      }
    };
    fetchConfigs();
  }, []);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await fetch("/api/auth/session");
        const data = await res.json();
        if (data?.user?.role === "admin") {
          setIsAdmin(true);
        }
      } catch {
        // ignore
      }
    };
    checkAdmin();
  }, []);

  const handleDelete = async (configId: string) => {
    if (!confirm("Are you sure you want to delete this config?")) return;

    setDeleting(configId);
    try {
      const res = await fetch(`/api/configs/${configId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setConfigs((prev) => prev.filter((c) => c.id !== configId));
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete config");
      }
    } catch {
      alert("Network error. Please try again.");
    } finally {
      setDeleting(null);
    }
  };

  const handleEdit = (configId: string) => {
    router.push(`/llm/configs/edit/${configId}`);
  };

  return (
    <div className="container mx-auto max-w-7xl p-4 md:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        <p className="mt-1 text-sm text-gray-500">
          {isAdmin ? "All configurations (Admin view)" : "Your shared configurations"}
        </p>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : configs.length === 0 ? (
        <p className="text-gray-500">No configurations shared yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 text-sm font-semibold text-gray-700">Rank</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-700">Model Name</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-700">Hardware Model</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-700">Platform</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-700">VRAM</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-700">RAM</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-700">Quantization</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-700">PP</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-700">TG</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-700">Votes</th>
                {isAdmin && <th className="px-4 py-3 text-sm font-semibold text-gray-700">User</th>}
                <th className="px-4 py-3 text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {configs.map((config, index) => (
                <tr key={config.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">{index + 1}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{config.modelName}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{config.hardwareModel}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{config.platform}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{config.vram}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{config.ram}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{config.quantization}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{config.ppSpeed}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{config.tgSpeed}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{config.starCount}</td>
                  {isAdmin && (
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {config.user?.name || config.user?.email || "Unknown"}
                    </td>
                  )}
                  <td className="px-4 py-3 text-sm">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(config.id)}
                        className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-600 hover:bg-blue-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(config.id)}
                        disabled={deleting === config.id}
                        className="rounded bg-red-100 px-2 py-1 text-xs text-red-600 hover:bg-red-200 disabled:opacity-50"
                      >
                        {deleting === config.id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
