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
  if (max === min) return "text-gray-600";
  const ratio = (speed - min) / (max - min);
  if (ratio > 0.75) return "text-green-600 font-semibold";
  if (ratio > 0.5) return "text-lime-600 font-medium";
  if (ratio > 0.25) return "text-yellow-600 font-medium";
  return "text-red-500 font-medium";
}

function getSpeedBg(speed: number, min: number, max: number): string {
  if (max === min) return "bg-transparent";
  const ratio = (speed - min) / (max - min);
  if (ratio > 0.75) return "bg-green-50 text-green-700";
  if (ratio > 0.5) return "bg-lime-50 text-lime-700";
  if (ratio > 0.25) return "bg-yellow-50 text-yellow-700";
  return "bg-red-50 text-red-600";
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
    CUDA: "bg-blue-100 text-blue-800 border border-blue-200",
    MLX: "bg-purple-100 text-purple-800 border border-purple-200",
    ROCm: "bg-orange-100 text-orange-800 border border-orange-200",
    Vulkan: "bg-teal-100 text-teal-800 border border-teal-200",
    "Multi-GPU": "bg-pink-100 text-pink-800 border border-pink-200",
  };

  const minPP = filteredConfigs.length > 0 ? Math.min(...filteredConfigs.map((c) => c.ppSpeed)) : 0;
  const maxPP = filteredConfigs.length > 0 ? Math.max(...filteredConfigs.map((c) => c.ppSpeed)) : 0;
  const minTG = filteredConfigs.length > 0 ? Math.min(...filteredConfigs.map((c) => c.tgSpeed)) : 0;
  const maxTG = filteredConfigs.length > 0 ? Math.max(...filteredConfigs.map((c) => c.tgSpeed)) : 0;

  return (
    <div className="flex min-h-screen w-full bg-gradient-to-b from-gray-50 to-white">
      {/* Filter Panel */}
      <aside className="hidden w-72 border-r border-gray-200 bg-white p-4 md:block sticky top-0 h-screen overflow-y-auto">
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
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">LLM Configs</h1>
            <p className="mt-1 text-sm text-gray-500">Browse and filter local LLM configurations</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{filteredConfigs.length} results</span>
            <Link
              href="/llm/configs/share"
              className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
            >
              Share Config
            </Link>
          </div>
        </div>

        {/* Sort Options */}
        <div className="mt-6 flex items-center gap-3">
          <span className="text-sm text-gray-600 font-medium">Sort by:</span>
          <button
            onClick={() => setSortOption("votes")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
              sortOption === "votes"
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            Votes
          </button>
          <button
            onClick={() => setSortOption("pp")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
              sortOption === "pp"
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            PP Speed
          </button>
          <button
            onClick={() => setSortOption("tg")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
              sortOption === "tg"
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            TG Speed
          </button>
        </div>


        {/* Mobile Filter Button */}
        <div className="mt-4 md:hidden">
          <details className="rounded-lg border border-gray-200 bg-white p-4">
            <summary className="cursor-pointer font-medium text-gray-700">Filters</summary>
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
          </details>
        </div>

        {/* LLM Runner AIO Banner */}
        <div className="mt-6 rounded-xl border-2 border-indigo-200 bg-gradient-to-r from-indigo-50 to-white p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-indigo-600 flex-shrink-0">
              <Download className="h-8 w-8 text-white" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-bold text-gray-900">LLM Runner AIO — All-in-One Package</h3>
              <p className="mt-1 text-sm text-gray-600">
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
        <div className="mt-6 overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                <th className="border-b border-gray-200 px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">Rank</th>
                <th className="border-b border-gray-200 px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">Model Name</th>
                <th className="border-b border-gray-200 px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">Hardware Model</th>
                <th className="border-b border-gray-200 px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">Platform</th>
                <th className="border-b border-gray-200 px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">LLM Runner</th>
                <th className="border-b border-gray-200 px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">VRAM</th>
                <th className="border-b border-gray-200 px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">RAM</th>
                <th className="border-b border-gray-200 px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">Quantization</th>
                <th className="border-b border-gray-200 px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">PP</th>
                <th className="border-b border-gray-200 px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">TG</th>
                <th className="border-b border-gray-200 px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">Votes</th>
                <th className="border-b border-gray-200 px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">User</th>
                {(isAdmin || session) && <th className="border-b border-gray-200 px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredConfigs.map((config, index) => (
                <tr key={config.id} className="transition-all duration-150 hover:bg-indigo-50/50">
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                      index === 0 ? "bg-yellow-100 text-yellow-700 ring-2 ring-yellow-300" :
                      index === 1 ? "bg-gray-100 text-gray-700 ring-2 ring-gray-300" :
                      index === 2 ? "bg-orange-100 text-orange-700 ring-2 ring-orange-300" :
                      "bg-gray-50 text-gray-500"
                    }`}>
                      {index + 1}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <Link href={`/llm/${config.id}`} className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 hover:underline transition-colors">
                      {config.modelName}
                    </Link>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-700 font-mono">{config.hardwareModel}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-block rounded-md px-2.5 py-1 text-xs font-medium ${
                      platformColors[config.platform] || "bg-gray-100 text-gray-700 border border-gray-200"
                    }`}>
                      {config.platform}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600">{config.llmRunner || "-"}</td>
                  <td className="px-5 py-4 text-sm text-gray-700 font-mono">{config.vram}GB</td>
                  <td className="px-5 py-4 text-sm text-gray-700 font-mono">{config.ram}GB</td>
                  <td className="px-5 py-4 text-sm text-gray-600 font-mono">{config.quantization}</td>
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
                  <td className="px-5 py-4 text-sm font-semibold text-gray-800">{config.starCount}</td>
                  <td className="px-5 py-4 text-sm text-gray-600">{config.user.name || config.user.email || "Anonymous"}</td>
                  {(isAdmin || isOwner(config.userId)) && (
                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        <Link
                          href={`/llm/configs/edit/${config.id}`}
                          className="rounded-md bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-100 transition-colors"
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
                          className="rounded-md bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-100 transition-colors disabled:opacity-50"
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
            <p className="text-lg text-gray-500">No configs found matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
