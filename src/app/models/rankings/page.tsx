"use client";

import { modelRankings, type ModelRanking } from "@/data/model-rankings";
import { useLang } from "@/lib/i18n";

// Obsidian table design (matches tasks/arayuz/tasarim2-obsidian/rankings.html)
function rankClass(index: number) {
  if (index === 0) return "text-primary"; // gold
  if (index === 1) return "text-foreground/80"; // silver
  if (index === 2) return "text-orange-600 dark:text-orange-500"; // bronze
  return "text-muted-foreground";
}

const TH = "py-4 px-3 text-left font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground";
const TD = "px-3 py-6 align-middle font-mono text-sm";

function ModelRow({ model, index }: { model: ModelRanking; index: number }) {
  const { t } = useLang();
  return (
    <tr className="border-b border-border/50 transition-colors hover:bg-accent/40">
      <td className={`${TD} pl-6 pr-2`}>
        <span className={`font-bold ${rankClass(index)}`}>{index + 1}</span>
      </td>
      <td className="px-3 py-6 align-middle">
        <div className="font-semibold text-foreground">{model.name}</div>
        {model.creator && <div className="mt-0.5 text-xs text-muted-foreground">{model.creator}</div>}
      </td>
      <td className={`${TD} font-bold text-primary`}>{model.intelligence}</td>
      <td className={`${TD} text-muted-foreground`}>{model.parameters || "—"}</td>
      <td className={`${TD} text-muted-foreground`}>{model.contextWindow}</td>
      <td className={`${TD} text-foreground`}>{model.price}</td>
      <td className={`${TD} text-muted-foreground`}>{model.speed}</td>
      <td className={`${TD} pl-3 pr-6`}>
        {model.weights ? (
          <span className="inline-flex items-center rounded-full border border-green-600/40 bg-green-500/10 px-2.5 py-1 text-[11px] tracking-wider text-green-700 dark:text-green-400">
            {t("rank.weights")}
          </span>
        ) : (
          <span className="inline-flex items-center rounded-full border border-border px-2.5 py-1 text-[11px] tracking-wider text-muted-foreground">
            {t("rank.closed")}
          </span>
        )}
      </td>
    </tr>
  );
}

export default function ModelRankingsPage() {
  const { t } = useLang();
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-10">
          <p className="kicker mono mb-4">{t("rank.kicker")}</p>
          <h1 className="text-4xl font-bold text-foreground mb-3 md:text-5xl">
            {t("rank.title").replaceAll("{n}", String(modelRankings.length))}
          </h1>
          <p className="max-w-2xl text-muted-foreground">{t("rank.sub")}</p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className={`${TH} pl-6 pr-2`}>#</th>
                <th className={TH}>Model</th>
                <th className={TH}>Int</th>
                <th className={TH}>Params</th>
                <th className={TH}>Context</th>
                <th className={TH}>$ / M</th>
                <th className={TH}>Tok/s</th>
                <th className={`${TH} pl-3 pr-6`}>Weights</th>
              </tr>
            </thead>
            <tbody>
              {modelRankings.map((model, index) => (
                <ModelRow key={model.name} model={model} index={index} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
