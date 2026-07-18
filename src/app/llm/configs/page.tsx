"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { FilterPanel } from "./components/FilterPanel";
import { useSession } from "next-auth/react";
import { Download, Package, Server, Zap, Globe, Settings, Cpu } from "lucide-react";

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
  llmRunner: string | null;
  userId: string;
  user: {
    id: string;
    name: string | null;
    email: string | null;
  };
}

type SortOption = "votes" | "pp" | "tg";

const platforms = ["CUDA", "MLX", "ROCm", "Vulkan", "Multi-GPU"];
const vrams = ["4", "6", "8", "12", "16", "24", "32", "64", "96", "128+"];
const rams = ["8", "16", "24", "32", "48", "64", "96", "128+"];
const quantizations = ["Q4_0", "Q4_K_M", "Q4_K_S", "Q5_0", "Q5_K_M", "Q6_K", "Q8_0", "F16", "F32"];

function getSpeedColor(speed: number, min: number, max: number): string {
  if (max === min) return "text-gray-600 dark:text-gray-400";
  const ratio = (speed - min) / (max - min);
  if (ratio > 0.75) return "text-green-600 dark:text-green-400 font-semibold";
  if (ratio > 0.5) return "text-lime-600 dark:text-lime-400 font-medium";
  if (ratio > 0.25) return "text-yellow-600 dark:text-yellow-400 font-medium";
  return "text-red-500 dark:text-red-400 font-medium";
}

function getSpeedBg(speed: number, min: number, max: number): string {
  if (max === min) return "bg-transparent";
  const ratio = (speed - min) / (max - min);
  if (ratio > 0.75) return "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400";
  if (ratio > 0.5) return "bg-lime-50 dark:bg-lime-900/30 text-lime-700 dark:text-lime-400";
  if (ratio > 0.25) return "bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400";
  return "bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400";
}

export default function LLMConfigsPage() {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedVrams, setSelectedVrams] = useState<string[]>([]);
  const [selectedRams, setSelectedRams] = useState<string[]>([]);
  const [selectedQuantizations, setSelectedQuantizations] = useState<string[]>([]);
  const [hardwareSearch, setHardwareSearch] = useState("");
  const [modelSearch, setModelSearch] = useState("");
  const [llmRunnerSearch, setLlmRunnerSearch] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("votes");
  const [configs, setConfigs] = useState<LLMConfig[]>([]);
  const [deleting, setDeleting] = useState<string | null>(null);
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "admin";
  const isOwner = (configUserId: string) => session?.user?.id === configUserId;

  useEffect(() => {
    const fetchConfigs = async () => {
      try {
        const res = await fetch("/api/configs");
        const data = await res.json();
        if (data.success) {
          setConfigs(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch configs:", err);
      }
    };
    fetchConfigs();
  }, []);

  const filteredConfigs = useMemo(() => {
    return configs
      .filter((config) => {
        if (selectedPlatforms.length > 0 && !selectedPlatforms.includes(config.platform)) return false;
        if (selectedVrams.length > 0 && !selectedVrams.includes(config.vram)) return false;
        if (selectedRams.length > 0 && !selectedRams.includes(config.ram)) return false;
        if (selectedQuantizations.length > 0 && !selectedQuantizations.includes(config.quantization)) return false;
        if (hardwareSearch && !config.hardwareModel.toLowerCase().includes(hardwareSearch.toLowerCase())) return false;
        if (modelSearch && !config.modelName.toLowerCase().includes(modelSearch.toLowerCase())) return false;
        if (llmRunnerSearch && !config.llmRunner?.toLowerCase().includes(llmRunnerSearch.toLowerCase())) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortOption === "votes") return b.starCount - a.starCount || b.tgSpeed - a.tgSpeed || b.ppSpeed - a.ppSpeed;
        if (sortOption === "pp") return b.ppSpeed - a.ppSpeed || b.tgSpeed - a.tgSpeed || b.starCount - a.starCount;
        if (sortOption === "tg") return b.tgSpeed - a.tgSpeed || b.ppSpeed - a.ppSpeed || b.starCount - a.starCount;
        return 0;
      });
  }, [selectedPlatforms, selectedVrams, selectedRams, selectedQuantizations, hardwareSearch, modelSearch, llmRunnerSearch, configs, sortOption]);

  const platformColors: Record<string, string> = {
    CUDA: "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 border border-blue-200 dark:border-blue-700",
    MLX: "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400 border border-purple-200 dark:border-purple-700",
    ROCm: "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-400 border border-orange-200 dark:border-orange-700",
    Vulkan: "bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-400 border border-teal-200 dark:border-teal-700",
    "Multi-GPU": "bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-400 border border-pink-200 dark:border-pink-700",
  };

  const minPP = filteredConfigs.length > 0 ? Math.min(...filteredConfigs.map((c) => c.ppSpeed)) : 0;
  const maxPP = filteredConfigs.length > 0 ? Math.max(...filteredConfigs.map((c) => c.ppSpeed)) : 0;
  const minTG = filteredConfigs.length > 0 ? Math.min(...filteredConfigs.map((c) => c.tgSpeed)) : 0;
  const maxTG = filteredConfigs.length > 0 ? Math.max(...filteredConfigs.map((c) => c.tgSpeed)) : 0;

  return (
    <div className="flex min-h-screen w-full bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">LLM Configs</h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Browse and filter local LLM configurations</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">{filteredConfigs.length} results</span>
            <Link
              href="/llm/configs/share"
              className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
            >
              Share Config
            </Link>
          </div>
        </div>

        {/* Filter Panel - Horizontal */}
        <div className="mt-6">
          <FilterPanel
            platforms={platforms}
            vrams={vrams}
            rams={rams}
            quantizations={quantizations}
            selectedPlatforms={selectedPlatforms}
            setSelectedPlatforms={setSelectedPlatforms}
            selectedVrams={selectedVrams}
            setSelectedVrams={setSelectedVrams}
            selectedRams={selectedRams}
            setSelectedRams={setSelectedRams}
            selectedQuantizations={selectedQuantizations}
            setSelectedQuantizations={setSelectedQuantizations}
            hardwareSearch={hardwareSearch}
            setHardwareSearch={setHardwareSearch}
            modelSearch={modelSearch}
            setModelSearch={setModelSearch}
            llmRunnerSearch={llmRunnerSearch}
            setLlmRunnerSearch={setLlmRunnerSearch}
          />
        </div>

        {/* Sort Options */}
        <div className="mt-6 flex items-center gap-3">
          <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">Sort by:</span>
          <button
            onClick={() => setSortOption("votes")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
              sortOption === "votes"
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600"
            }`}
          >
            Votes
          </button>
          <button
            onClick={() => setSortOption("pp")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
              sortOption === "pp"
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600"
            }`}
          >
            PP Speed
          </button>
          <button
            onClick={() => setSortOption("tg")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
              sortOption === "tg"
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600"
            }`}
          >
            TG Speed
          </button>
        </div>


        {/* LLM Runner AIO Banner */}
        <div className="mt-6 rounded-xl border-2 border-indigo-200 dark:border-indigo-800 bg-gradient-to-r from-indigo-50 to-white dark:from-indigo-950 dark:to-gray-800 p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-indigo-600 flex-shrink-0">
              <Download className="h-8 w-8 text-white" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">LLM Runner AIO — All-in-One Package</h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Open WebUI, llama.cpp, Vane & SearXNG in a single 2.5 GB .exe. Automatic setup, 7 languages, Windows integration.
              </p>
            </div>
            <Link
              href="/llm-runner-aio"
              className="flex-shrink-0 inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5"
            >
              <Download className="h-4 w-4" />
              Download AIO
            </Link>
          </div>
        </div>

        {/* Config Table */}
        <div className="mt-6 overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900">
                <th className="border-b border-gray-200 dark:border-gray-700 px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-200">Rank</th>
                <th className="border-b border-gray-200 dark:border-gray-700 px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-200">Model Name</th>
                <th className="border-b border-gray-200 dark:border-gray-700 px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-200">Hardware Model</th>
                <th className="border-b border-gray-200 dark:border-gray-700 px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-200">Platform</th>
                <th className="border-b border-gray-200 dark:border-gray-700 px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-200">LLM Runner</th>
                <th className="border-b border-gray-200 dark:border-gray-700 px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-200">VRAM</th>
                <th className="border-b border-gray-200 dark:border-gray-700 px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-200">RAM</th>
                <th className="border-b border-gray-200 dark:border-gray-700 px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-200">Quantization</th>
                <th className="border-b border-gray-200 dark:border-gray-700 px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-200">Context</th>
                <th className="border-b border-gray-200 dark:border-gray-700 px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-200">PP</th>
                <th className="border-b border-gray-200 dark:border-gray-700 px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-200">TG</th>
                <th className="border-b border-gray-200 dark:border-gray-700 px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-200">Votes</th>
                <th className="border-b border-gray-200 dark:border-gray-700 px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-200">User</th>
                {(isAdmin || session) && <th className="border-b border-gray-200 dark:border-gray-700 px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-200">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {filteredConfigs.map((config, index) => (
                <tr key={config.id} className="transition-all duration-150 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/20">
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                      index === 0 ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 ring-2 ring-yellow-300 dark:ring-yellow-700" :
                      index === 1 ? "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 ring-2 ring-gray-300 dark:ring-gray-600" :
                      index === 2 ? "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 ring-2 ring-orange-300 dark:ring-orange-700" :
                      "bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                    }`}>
                      {index + 1}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <Link href={`/llm/${config.id}`} className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 hover:underline transition-colors">
                      {config.modelName}
                    </Link>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-700 dark:text-gray-300 font-mono">{config.hardwareModel}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-block rounded-md px-2.5 py-1 text-xs font-medium ${
                      platformColors[config.platform] || "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600"
                    }`}>
                      {config.platform}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600 dark:text-gray-400">{config.llmRunner || "-"}</td>
                  <td className="px-5 py-4 text-sm text-gray-700 dark:text-gray-300 font-mono">{config.vram}GB</td>
                  <td className="px-5 py-4 text-sm text-gray-700 dark:text-gray-300 font-mono">{config.ram}GB</td>
                  <td className="px-5 py-4 text-sm text-gray-600 dark:text-gray-400 font-mono">{config.quantization}</td>
                  <td className="px-5 py-4 text-sm text-gray-600 dark:text-gray-400 font-mono">{config.contextSize}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-block rounded-md px-2.5 py-1 text-sm font-mono ${getSpeedBg(config.ppSpeed, minPP, maxPP)} ${getSpeedColor(config.ppSpeed, minPP, maxPP)}`}>
                      {config.ppSpeed}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-block rounded-md px-2.5 py-1 text-sm font-mono ${getSpeedBg(config.tgSpeed, minTG, maxTG)} ${getSpeedColor(config.tgSpeed, minTG, maxTG)}`}>
                      {config.tgSpeed}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm font-semibold text-gray-800 dark:text-gray-200">{config.starCount}</td>
                  <td className="px-5 py-4 text-sm text-gray-600 dark:text-gray-400">{config.user.name || config.user.email || "Anonymous"}</td>
                  {(isAdmin || isOwner(config.userId)) && (
                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        <Link
                          href={`/llm/configs/edit/${config.id}`}
                          className="rounded-md bg-blue-50 dark:bg-blue-900/30 px-3 py-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={async () => {
                            if (!confirm("Are you sure you want to delete this config?")) return;
                            setDeleting(config.id);
                            const res = await fetch(`/api/configs/${config.id}`, { method: "DELETE" });
                            setDeleting(null);
                            if (res.ok) {
                              setConfigs((prev) => prev.filter((c) => c.id !== config.id));
                            } else {
                              const data = await res.json();
                              alert(data.error || "Failed to delete");
                            }
                          }}
                          disabled={deleting === config.id}
                          className="rounded-md bg-red-50 dark:bg-red-900/30 px-3 py-1.5 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors disabled:opacity-50"
                        >
                          {deleting === config.id ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredConfigs.length === 0 && (
          <div className="mt-12 text-center">
            <p className="text-lg text-gray-500 dark:text-gray-400">No configs found matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
