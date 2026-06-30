"use client";

import { useState } from "react";

interface FilterPanelProps {
  platforms: string[];
  vrams: string[];
  rams: string[];
  quantizations: string[];
  selectedPlatforms: string[];
  setSelectedPlatforms: (platforms: string[]) => void;
  selectedVrams: string[];
  setSelectedVrams: (vrams: string[]) => void;
  selectedRams: string[];
  setSelectedRams: (rams: string[]) => void;
  selectedQuantizations: string[];
  setSelectedQuantizations: (quantizations: string[]) => void;
  hardwareSearch: string;
  setHardwareSearch: (value: string) => void;
  modelSearch: string;
  setModelSearch: (value: string) => void;
  llmRunnerSearch: string;
  setLlmRunnerSearch: (value: string) => void;
}

export function FilterPanel({
  platforms,
  vrams,
  rams,
  quantizations,
  selectedPlatforms,
  setSelectedPlatforms,
  selectedVrams,
  setSelectedVrams,
  selectedRams,
  setSelectedRams,
  selectedQuantizations,
  setSelectedQuantizations,
  hardwareSearch,
  setHardwareSearch,
  modelSearch,
  setModelSearch,
  llmRunnerSearch,
  setLlmRunnerSearch,
}: FilterPanelProps) {
  const [expandedPlatforms, setExpandedPlatforms] = useState(true);
  const [expandedVrams, setExpandedVrams] = useState(true);
  const [expandedRams, setExpandedRams] = useState(true);
  const [expandedQuantizations, setExpandedQuantizations] = useState(true);

  const toggleSelect = (
    current: string[],
    value: string,
    setter: (items: string[]) => void
  ) => {
    setter(
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value]
    );
  };

  return (
    <div className="space-y-6">
      {/* Hardware Model Search */}
      <div>
        <h3 className="mb-2 text-sm font-semibold text-gray-700">Hardware Model</h3>
        <input
          type="text"
          value={hardwareSearch}
          onChange={(e) => setHardwareSearch(e.target.value)}
          placeholder="Search hardware..."
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none"
        />
      </div>

      {/* Model Name Search */}
      <div>
        <h3 className="mb-2 text-sm font-semibold text-gray-700">Model Name</h3>
        <input
          type="text"
          value={modelSearch}
          onChange={(e) => setModelSearch(e.target.value)}
          placeholder="Search model..."
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none"
        />
      </div>

      {/* LLM Runner Search */}
      <div>
        <h3 className="mb-2 text-sm font-semibold text-gray-700">LLM Runner</h3>
        <input
          type="text"
          value={llmRunnerSearch}
          onChange={(e) => setLlmRunnerSearch(e.target.value)}
          placeholder="Search runner (e.g., llama.cpp, Ollama)..."
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none"
        />
      </div>

      {/* Platform */}
      <div>
        <button
          onClick={() => setExpandedPlatforms(!expandedPlatforms)}
          className="mb-2 flex w-full items-center justify-between text-sm font-semibold text-gray-700"
        >
          Platform
          <svg className={`h-4 w-4 transition-transform ${expandedPlatforms ? "rotate-180" : ""}`} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        {expandedPlatforms && (
          <div className="space-y-2">
            {platforms.map((platform) => (
              <label key={platform} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedPlatforms.includes(platform)}
                  onChange={() => toggleSelect(selectedPlatforms, platform, setSelectedPlatforms)}
                  className="rounded border-gray-300 text-gray-900 focus:ring-gray-500"
                />
                <span className="text-sm text-gray-600">{platform}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* VRAM */}
      <div>
        <button
          onClick={() => setExpandedVrams(!expandedVrams)}
          className="mb-2 flex w-full items-center justify-between text-sm font-semibold text-gray-700"
        >
          VRAM (GB)
          <svg className={`h-4 w-4 transition-transform ${expandedVrams ? "rotate-180" : ""}`} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        {expandedVrams && (
          <div className="space-y-2">
            {vrams.map((vram) => (
              <label key={vram} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedVrams.includes(vram)}
                  onChange={() => toggleSelect(selectedVrams, vram, setSelectedVrams)}
                  className="rounded border-gray-300 text-gray-900 focus:ring-gray-500"
                />
                <span className="text-sm text-gray-600">{vram}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* RAM */}
      <div>
        <button
          onClick={() => setExpandedRams(!expandedRams)}
          className="mb-2 flex w-full items-center justify-between text-sm font-semibold text-gray-700"
        >
          RAM (GB)
          <svg className={`h-4 w-4 transition-transform ${expandedRams ? "rotate-180" : ""}`} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        {expandedRams && (
          <div className="space-y-2">
            {rams.map((ram) => (
              <label key={ram} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedRams.includes(ram)}
                  onChange={() => toggleSelect(selectedRams, ram, setSelectedRams)}
                  className="rounded border-gray-300 text-gray-900 focus:ring-gray-500"
                />
                <span className="text-sm text-gray-600">{ram}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Quantization */}
      <div>
        <button
          onClick={() => setExpandedQuantizations(!expandedQuantizations)}
          className="mb-2 flex w-full items-center justify-between text-sm font-semibold text-gray-700"
        >
          Quantization
          <svg className={`h-4 w-4 transition-transform ${expandedQuantizations ? "rotate-180" : ""}`} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        {expandedQuantizations && (
          <div className="space-y-2">
            {quantizations.map((quant) => (
              <label key={quant} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedQuantizations.includes(quant)}
                  onChange={() => toggleSelect(selectedQuantizations, quant, setSelectedQuantizations)}
                  className="rounded border-gray-300 text-gray-900 focus:ring-gray-500"
                />
                <span className="text-sm text-gray-600">{quant}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
