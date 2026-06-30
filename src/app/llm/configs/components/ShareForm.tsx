"use client";

import { useState } from "react";

const platforms = ["CUDA", "MLX", "ROCm", "Vulkan", "Multi-GPU"] as const;
const vrams = ["4", "6", "8", "12", "16", "24", "32", "64", "96", "128+"] as const;
const rams = ["8", "16", "24", "32", "48", "64", "96", "128+"] as const;
const quantizations = ["Q4_0", "Q4_K_M", "Q4_K_S", "Q5_0", "Q5_K_M", "Q6_K", "Q8_0", "F16", "F32"] as const;
const kvCaches = ["F16", "Q8_0", "Q4_0", "Q5_0", "Q5_1"] as const;
const llmRunners = ["llama.cpp", "Ollama", "LM Studio", "KoboldCPP", "llamafile", "vLLM", "MLX", "Jan", "Text Generation WebUI", "ExLlamaV2", "GPTQ.cpp", "WebLLM"] as const;

interface ShareFormProps {
  onSuccess: () => void;
}

export function ShareForm({ onSuccess }: ShareFormProps) {
  const [platform, setPlatform] = useState<typeof platforms[number]>("CUDA");
  const [vram, setVram] = useState<typeof vrams[number]>("24");
  const [ram, setRam] = useState<typeof rams[number]>("64");
  const [hardwareModel, setHardwareModel] = useState("");
  const [modelName, setModelName] = useState("");
  const [quantization, setQuantization] = useState<typeof quantizations[number]>("Q4_K_M");
  const [contextSize, setContextSize] = useState("");
  const [kvCache, setKvCache] = useState<typeof kvCaches[number]>("Q5_1");
  const [llmRunner, setLlmRunner] = useState<typeof llmRunners[number] | "">("llama.cpp");
  const [ppSpeed, setPpSpeed] = useState("");
  const [tgSpeed, setTgSpeed] = useState("");
  const [note, setNote] = useState("");
  const [customQuantization, setCustomQuantization] = useState("");
  const [customKvCache, setCustomKvCache] = useState("");
  const [useCustomQuantization, setUseCustomQuantization] = useState(false);
  const [useCustomKvCache, setUseCustomKvCache] = useState(false);
  const [customLlmRunner, setCustomLlmRunner] = useState("");
  const [useCustomLlmRunner, setUseCustomLlmRunner] = useState(false);
  const [generalSettings, setGeneralSettings] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const finalQuantization = useCustomQuantization ? customQuantization : quantization;
    const finalKvCache = useCustomKvCache ? customKvCache : kvCache;
    const finalLlmRunner = useCustomLlmRunner ? customLlmRunner : llmRunner;

    try {
      const response = await fetch("/api/configs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          platform,
          vram,
          ram,
          hardwareModel,
          modelName,
          quantization: finalQuantization,
          contextSize: Number(contextSize),
          kvCache: finalKvCache,
          llmRunner: finalLlmRunner || undefined,
          ppSpeed: Number(ppSpeed),
          tgSpeed: Number(tgSpeed),
          note: note || undefined,
          generalSettings: generalSettings || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || data.errors?.fieldErrors?.modelName?.[0] || "Failed to submit");
        return;
      }

      onSuccess();
    } catch {

      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Platform */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Platform</label>
        <div className="mt-2 flex flex-wrap gap-2">
          {platforms.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPlatform(p)}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                platform === p
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* VRAM */}
      <div>
        <label className="block text-sm font-medium text-gray-700">GPU VRAM (GB)</label>
        <select
          value={vram}
          onChange={(e) => setVram(e.target.value as typeof vrams[number])}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none"
        >
          {vrams.map((v) => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>
      </div>

      {/* RAM */}
      <div>
        <label className="block text-sm font-medium text-gray-700">System RAM (GB)</label>
        <select
          value={ram}
          onChange={(e) => setRam(e.target.value as typeof rams[number])}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none"
        >
          {rams.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>

      {/* Hardware Model */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Hardware Model</label>
        <input
          type="text"
          value={hardwareModel}
          onChange={(e) => setHardwareModel(e.target.value)}
          placeholder="e.g., RTX 3060, M1 Max"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none"
        />
      </div>

      {/* Model Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Model Name</label>
        <input
          type="text"
          value={modelName}
          onChange={(e) => setModelName(e.target.value)}
          placeholder="e.g., Llama-3-8B-Q4_K_M.gguf"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none"
        />
      </div>

      {/* LLM Runner */}
      <div>
        <label className="block text-sm font-medium text-gray-700">LLM Runner</label>
        <div className="flex gap-2">
          <select
            value={llmRunner}
            onChange={(e) => setLlmRunner(e.target.value as typeof llmRunners[number] | "")}
            className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none"
          >
            <option value="">Select runner...</option>
            {llmRunners.map((runner) => (
              <option key={runner} value={runner}>{runner}</option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => setUseCustomLlmRunner(!useCustomLlmRunner)}
            className={`rounded-md px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
              useCustomLlmRunner
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Custom
          </button>
        </div>
        {useCustomLlmRunner && (
          <input
            type="text"
            value={customLlmRunner}
            onChange={(e) => setCustomLlmRunner(e.target.value)}
            placeholder="e.g., forked-llama.cpp, custom-build"
            className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none"
          />
        )}
      </div>

      {/* Quantization */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Quantization</label>
        <div className="flex gap-2">
          <select
            value={quantization}
            onChange={(e) => setQuantization(e.target.value as typeof quantizations[number])}
            className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none"
          >
            {quantizations.map((q) => (
              <option key={q} value={q}>{q}</option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => setUseCustomQuantization(!useCustomQuantization)}
            className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              useCustomQuantization
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Custom
          </button>
        </div>
        {useCustomQuantization && (
          <input
            type="text"
            value={customQuantization}
            onChange={(e) => setCustomQuantization(e.target.value)}
            placeholder="e.g., Q4_K_M, custom quant"
            className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none"
          />
        )}
      </div>

      {/* Context Size */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Context Size</label>
        <input
          type="number"
          value={contextSize}
          onChange={(e) => setContextSize(e.target.value)}
          placeholder="e.g., 4096"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none"
        />
      </div>

      {/* KV Cache */}
      <div>
        <label className="block text-sm font-medium text-gray-700">KV Cache</label>
        <div className="flex gap-2">
          <select
            value={kvCache}
            onChange={(e) => setKvCache(e.target.value as typeof kvCaches[number])}
            className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none"
          >
            {kvCaches.map((k) => (
              <option key={k} value={k}>{k}</option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => setUseCustomKvCache(!useCustomKvCache)}
            className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              useCustomKvCache
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Custom
          </button>
        </div>
        {useCustomKvCache && (
          <input
            type="text"
            value={customKvCache}
            onChange={(e) => setCustomKvCache(e.target.value)}
            placeholder="e.g., Q8_0, custom KV cache"
            className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none"
          />
        )}
      </div>

      {/* PP Speed */}
      <div>
        <label className="block text-sm font-medium text-gray-700">PP Speed (tokens/sec)</label>
        <input
          type="number"
          step="0.01"
          value={ppSpeed}
          onChange={(e) => setPpSpeed(e.target.value)}
          placeholder="e.g., 12.5"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none"
        />
      </div>

      {/* TG Speed */}
      <div>
        <label className="block text-sm font-medium text-gray-700">TG Speed (tokens/sec)</label>
        <input
          type="number"
          step="0.01"
          value={tgSpeed}
          onChange={(e) => setTgSpeed(e.target.value)}
          placeholder="e.g., 85.2"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none"
        />
      </div>

      {/* General Settings */}
      <div>
        <label className="block text-sm font-medium text-gray-700">General Settings</label>
        <textarea
          value={generalSettings}
          onChange={(e) => setGeneralSettings(e.target.value)}
          placeholder={`e.g.,
[*]
n-gpu-layers = all
ctx-size = 70000
parallel = 1
threads = 10
batch-size = 4096
ubatch-size = 2048
cont-batching = true
flash-attn = true
numa = distribute
cache-idle-slots = true
prio = 2
poll = 30
sleep-idle-seconds = 1000
temp = 1.0
top-k = 20
top-p = 0.95
min-p = 0.0
presence-penalty = 1.5
repeat-penalty = 1.10
reasoning = off
cache-type-k = q8_0
cache-type-v = q8_0
mmap = false

[⚡Mellum2-12B-A2.5B]
model = D:\\Programlar\\llama.cpp\\models\\Mellum2-12B-A2.5B\\Mellum2-12B-A2.5B-Thinking.Q4_K_M.gguf
override-tensor = blk.[0-6].ffn.*exps=CPU,blk.2[3-9].ffn.*exps=CPU
spec-type = ngram-mod
spec-ngram-mod-n-match = 24
spec-draft-n-min = 4
spec-draft-n-max = 32`}
          maxLength={2000}
          rows={12}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm font-mono focus:border-gray-500 focus:outline-none"
        />
      </div>

      {/* Note */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Note (optional)</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Any additional notes..."
          maxLength={500}
          rows={3}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none"
        />
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">{error}</div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Share Config"}
      </button>
    </form>
  );
}
