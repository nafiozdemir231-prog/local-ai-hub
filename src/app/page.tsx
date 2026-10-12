"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";

// Obsidian home — mockup-faithful, token-based theme; localized via LanguageProvider
export default function Home() {
  const { t } = useLang();
  return (
    <div className="relative w-full">
      {/* Film grain */}
      <div className="grain" aria-hidden="true" />

      <main className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        {/* Hero */}
        <header className="grid items-center gap-12 py-20 md:py-24 md:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="kicker mono mb-5">{t("home.kicker")}</p>
            <h1 className="text-4xl font-bold leading-[1.08] text-foreground sm:text-5xl md:text-6xl">
              {t("home.h1a")}<br />
              {t("home.h1bA")}<span className="text-primary">125B model</span>{t("home.h1bB")}
            </h1>
            <p className="mt-6 max-w-xl leading-relaxed text-muted-foreground">
              {t("home.intro")}
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/llm-runner-aio"
                className="rounded-md bg-primary px-7 py-3.5 font-mono text-sm font-bold text-primary-foreground shadow-[0_10px_36px_-8px_rgba(245,158,11,0.45)] transition hover:brightness-110"
              >
                ⬇ llm-runner-aiov2.1.exe — 2.28 GB
              </Link>
              <Link
                href="/models/rankings"
                className="rounded-md border border-border px-7 py-3.5 font-mono text-sm transition hover:bg-accent"
              >
                {t("home.ctaRankings")}
              </Link>
            </div>
          </div>

          {/* Terminal kutusu */}
          <div className="rounded-xl border border-border bg-card p-5 shadow-2xl">
            <div className="mb-4 flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
            </div>
            <div className="font-mono text-[13px] leading-relaxed text-muted-foreground">
              <div><span className="opacity-50">$</span> run.bat</div>
              <div><span className="text-primary">✓</span> GPU detected&nbsp; : RTX 5080 · 15.9 GB VRAM</div>
              <div><span className="text-primary">✓</span> Profile&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : 16 GB preset</div>
              <div><span className="text-primary">✓</span> Model&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : qwen3.8-27B + DFlash2 draft</div>
              <div><span className="text-primary">✓</span> llama.cpp&nbsp;&nbsp;&nbsp;&nbsp; : <span className="text-foreground">localhost:1234</span></div>
              <div><span className="text-primary">✓</span> Open WebUI&nbsp;&nbsp;&nbsp; : <span className="text-foreground">localhost:3000</span></div>
              <div><span className="text-primary">✓</span> Strata&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : <span className="text-foreground">localhost:1235</span> (OpenAI+Anthropic)</div>
              <div>
                <span className="text-green-500">ready.</span>{" "}
                <span className="animate-pulse">▊</span>
              </div>
            </div>
          </div>
        </header>

        {/* Rakamlar */}
        <section className="grid grid-cols-2 gap-4 border-y border-border py-8 text-center md:grid-cols-4">
          {[
            ["121+", t("home.statModels")],
            ["v2.1", t("home.statVersion")],
            ["7", t("home.statServices")],
            ["100%", t("home.statOpen")],
          ].map(([n, l]) => (
            <div key={l}>
              <div className="font-mono text-3xl font-bold text-primary">{n}</div>
              <div className="mt-1 text-sm text-muted-foreground">{l}</div>
            </div>
          ))}
        </section>

        {/* Neler dahil — rota kartları */}
        <section className="py-14">
          <p className="kicker mono mb-8">{t("home.included")}</p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              ["/llm-runner-aio", "LLM Runner AIO", "One-click setup, hardware detection, GUI Model Manager and the full VRAM preset matrix."],
              ["/models/rankings", "Model Rankings", "121 GGUF models compared by intelligence index, parameters, context window and speed."],
              ["/llm/configs", "LLM Configs", "Ready-made chat / vision / coding configurations matched to your hardware profile."],
              ["/local-llm-runners", "LLM Runners", "17 runners from Ollama to Strata; OS · platform · capability comparison table."],
              ["/local-llm-webuis", "LLM Web UI", "Open WebUI, LibreChat, LobeChat... self-hosted interfaces with GitHub star counts."],
              ["/multimodal", "Multimodal", "Wan2GP, ComfyUI and local image / video / audio generation services."],
            ].map(([href, title, desc]) => (
              <Link key={title} href={href} className="block rounded-lg border border-border bg-card p-5 transition duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-accent">
                <h3 className="font-mono font-semibold text-card-foreground">{title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Bottom strip */}
        <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-border py-6 font-mono text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} aihublocal.com</span>
          <span>{t("footer.tagline")}</span>
        </footer>
      </main>
    </div>
  );
}
