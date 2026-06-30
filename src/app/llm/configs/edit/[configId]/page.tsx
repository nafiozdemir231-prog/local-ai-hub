"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

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
}

export default function EditConfigPage() {
  const params = useParams();
  const configId = params?.configId as string;
  const router = useRouter();
  useSession();

  const [config, setConfig] = useState<LLMConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    modelName: "",
    hardwareModel: "",
    platform: "",
    quantization: "",
    contextSize: 0,
    kvCache: "",
    vram: "",
    ram: "",
    ppSpeed: 0,
    tgSpeed: 0,
    note: "",
    generalSettings: "",
  });

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await fetch(`/api/configs/${configId}`);
        const data = await res.json();
        if (data.success) {
          setConfig(data.data);
          setFormData({
            modelName: data.data.modelName || "",
            hardwareModel: data.data.hardwareModel || "",
            platform: data.data.platform || "",
            quantization: data.data.quantization || "",
            contextSize: data.data.contextSize || 0,
            kvCache: data.data.kvCache || "",
            vram: data.data.vram || "",
            ram: data.data.ram || "",
            ppSpeed: data.data.ppSpeed || 0,
            tgSpeed: data.data.tgSpeed || 0,
            note: data.data.note || "",
            generalSettings: data.data.generalSettings || "",
          });
        } else {
          setError(data.error || "Config not found");
        }
      } catch {
        setError("Failed to load config");
      } finally {
        setLoading(false);
      }
    };
    fetchConfig();
  }, [configId]);

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const res = await fetch(`/api/configs/${configId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        router.push(`/llm/${configId}`);
      } else {
        setError(data.error || "Failed to update config");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="p-4 text-gray-500">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (!config) return <p className="p-4 text-gray-500">Config not found</p>;

  return (
    <div className="container mx-auto max-w-4xl p-4 md:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Edit Config</h1>
        <p className="mt-1 text-sm text-gray-500">Update your configuration</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Model Info */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Model Info</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Model Name</label>
              <input
                type="text"
                value={formData.modelName}
                onChange={(e) => handleChange("modelName", e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Hardware Model</label>
              <input
                type="text"
                value={formData.hardwareModel}
                onChange={(e) => handleChange("hardwareModel", e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Platform</label>
              <input
                type="text"
                value={formData.platform}
                onChange={(e) => handleChange("platform", e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Quantization</label>
              <input
                type="text"
                value={formData.quantization}
                onChange={(e) => handleChange("quantization", e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Context Size</label>
              <input
                type="number"
                value={formData.contextSize}
                onChange={(e) => handleChange("contextSize", parseInt(e.target.value) || 0)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">KV Cache</label>
              <input
                type="text"
                value={formData.kvCache}
                onChange={(e) => handleChange("kvCache", e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Performance */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Performance</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">VRAM (GB)</label>
              <input
                type="text"
                value={formData.vram}
                onChange={(e) => handleChange("vram", e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">RAM (GB)</label>
              <input
                type="text"
                value={formData.ram}
                onChange={(e) => handleChange("ram", e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">PP Speed</label>
              <input
                type="number"
                step="0.01"
                value={formData.ppSpeed}
                onChange={(e) => handleChange("ppSpeed", parseFloat(e.target.value) || 0)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">TG Speed</label>
              <input
                type="number"
                step="0.01"
                value={formData.tgSpeed}
                onChange={(e) => handleChange("tgSpeed", parseFloat(e.target.value) || 0)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* General Settings */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">General Settings</h2>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">General Settings (INI Format)</label>
            <textarea
              value={formData.generalSettings}
              onChange={(e) => handleChange("generalSettings", e.target.value)}
              rows={6}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Note */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Note</h2>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Note</label>
            <textarea
              value={formData.note}
              onChange={(e) => handleChange("note", e.target.value)}
              rows={4}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={saving}
            className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
