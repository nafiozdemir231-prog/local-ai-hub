"use client";

import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { useLang } from "@/lib/i18n";

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
  const { t } = useLang();
  const [expandedPlatforms, setExpandedPlatforms] = useState(false);
  const [expandedVrams, setExpandedVrams] = useState(false);
  const [expandedRams, setExpandedRams] = useState(false);
  const [expandedQuantizations, setExpandedQuantizations] = useState(false);

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

  const searchBox = (value: string, setter: (v: string) => void) => (
    <div className="relative">
      <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
      <input
        type="text"
        value={value}
        onChange={(e) => setter(e.target.value)}
        placeholder={t("fp.search")}
        className="w-full rounded-lg border border-input bg-card py-1.5 pl-8 pr-2 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary/50 focus:outline-none"
      />
    </div>
  );

  const groupHeader = (label: string, count: number, open: boolean, onToggle: () => void) => (
    <button
      onClick={onToggle}
      className="mb-2 flex w-full items-center justify-between text-xs font-semibold text-muted-foreground transition hover:text-foreground"
    >
      <span>
        {label}
        {count > 0 && <span className="ml-1.5 rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-bold text-primary-foreground">{count}</span>}
      </span>
      <ChevronDown className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`} />
    </button>
  );

  const chip = (value: string, active: boolean, onClick: () => void) => (
    <button
      key={value}
      type="button"
      onClick={onClick}
      className={`rounded-full border px-2.5 py-1 font-mono text-[11px] transition-all duration-150 ${
        active
          ? "border-transparent bg-primary text-primary-foreground shadow-sm"
          : "border-border bg-secondary/60 text-muted-foreground hover:border-primary/40 hover:text-foreground"
      }`}
    >
      {value}
    </button>
  );

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-7">
      {/* Hardware Model Search */}
      <div>
        <h3 className="mb-2 text-xs font-semibold text-muted-foreground">{t("fp.hardware")}</h3>
        {searchBox(hardwareSearch, setHardwareSearch)}
      </div>

      {/* Model Name Search */}
      <div>
        <h3 className="mb-2 text-xs font-semibold text-muted-foreground">{t("fp.model")}</h3>
        {searchBox(modelSearch, setModelSearch)}
      </div>

      {/* LLM Runner Search */}
      <div>
        <h3 className="mb-2 text-xs font-semibold text-muted-foreground">{t("fp.runner")}</h3>
        {searchBox(llmRunnerSearch, setLlmRunnerSearch)}
      </div>

      {/* Platform */}
      <div>
        {groupHeader(t("fp.platform"), selectedPlatforms.length, expandedPlatforms, () => setExpandedPlatforms(!expandedPlatforms))}
        {expandedPlatforms && (
          <div className="flex flex-wrap gap-1.5">
            {platforms.map((p) => chip(p, selectedPlatforms.includes(p), () => toggleSelect(selectedPlatforms, p, setSelectedPlatforms)))}
          </div>
        )}
      </div>

      {/* VRAM */}
      <div>
        {groupHeader("VRAM (GB)", selectedVrams.length, expandedVrams, () => setExpandedVrams(!expandedVrams))}
        {expandedVrams && (
          <div className="flex max-h-40 flex-wrap gap-1.5 overflow-y-auto">
            {vrams.map((v) => chip(v, selectedVrams.includes(v), () => toggleSelect(selectedVrams, v, setSelectedVrams)))}
          </div>
        )}
      </div>

      {/* RAM */}
      <div>
        {groupHeader("RAM (GB)", selectedRams.length, expandedRams, () => setExpandedRams(!expandedRams))}
        {expandedRams && (
          <div className="flex max-h-40 flex-wrap gap-1.5 overflow-y-auto">
            {rams.map((r) => chip(r, selectedRams.includes(r), () => toggleSelect(selectedRams, r, setSelectedRams)))}
          </div>
        )}
      </div>

      {/* Quantization */}
      <div>
        {groupHeader(t("fp.quant"), selectedQuantizations.length, expandedQuantizations, () => setExpandedQuantizations(!expandedQuantizations))}
        {expandedQuantizations && (
          <div className="flex max-h-40 flex-wrap gap-1.5 overflow-y-auto">
            {quantizations.map((q) => chip(q, selectedQuantizations.includes(q), () => toggleSelect(selectedQuantizations, q, setSelectedQuantizations)))}
          </div>
        )}
      </div>
    </div>
  );
}
