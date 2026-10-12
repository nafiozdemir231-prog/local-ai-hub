import Link from "next/link";
import { Sora, JetBrains_Mono } from "next/font/google";

// Obsidian tasarımı (tasks/arayuz/tasarim2-obsidian) birebir port — mockup'taki fontlar next/font ile
const sora = Sora({ subsets: ["latin"], variable: "--font-sora" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });

const mono = { fontFamily: "var(--font-jetbrains-mono), monospace" } as const;

export default function Home() {
  return (
    <div
      className={`relative min-h-[calc(100vh-8rem)] w-full bg-[#0b0c0f] text-zinc-300 antialiased ${sora.variable} ${jetbrains.variable}`}
      style={{ fontFamily: "var(--font-sora), sans-serif" }}
    >
      {/* Film grain dokusu (mockup body::after birebir) */}
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.05]"
        style={{
          backgroundImage:
            `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='.9'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Üst mini nav: mockup'taki mono site kimliği (global Navbar'ın altında marka şeridi) */}
        <div className="flex items-center justify-between border-b border-white/5 py-4 text-[13px]" style={mono}>
          <span className="font-bold tracking-tight text-white">
            ▮ local<span className="text-[#fbbf24]">ai</span>hub
          </span>
          <div className="hidden gap-5 text-zinc-500 md:flex">
            <Link href="/llm-runner-aio" className="transition hover:text-amber-400">aio</Link>
            <Link href="/local-llm-runners" className="transition hover:text-amber-400">runners</Link>
            <Link href="/models/rankings" className="transition hover:text-amber-400">rankings</Link>
            <a href="https://github.com/nafiozdemir231-prog/llm-runner-aio" target="_blank" rel="noopener noreferrer" className="transition hover:text-amber-400">source</a>
          </div>
        </div>

        {/* Hero */}
        <header className="grid items-center gap-12 py-20 md:grid-cols-[1.2fr_1fr] md:py-24">
          <div>
            <p className="mb-5 text-[11px] uppercase tracking-[0.22em] text-[#f59e0b]" style={mono}>
              {"// yerel yapay zekâ istasyonu"}
            </p>
            <h1 className="text-4xl font-bold leading-[1.08] text-white md:text-6xl">
              Sunucuya gerek yok.<br />
              <span className="text-[#fbbf24]">125B model</span>, kendi PC'nde.
            </h1>
            <p className="mt-6 max-w-xl leading-relaxed text-zinc-400">
              LLM Runner AIO; Open WebUI, llama.cpp, SearXNG ve Strata gateway'i otomatik kurar.
              Donanımın algılanır, modelin indirilir, portların açılır.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/llm-runner-aio"
                className="rounded-md bg-[#f59e0b] px-7 py-3.5 text-sm font-bold text-[#0b0c0f] shadow-[0_10px_36px_-8px_rgba(245,158,11,0.5)] transition hover:brightness-110"
                style={mono}
              >
                ⬇ llm-runner-aiov2.1.exe — 2.28 GB
              </Link>
              <a
                href="https://github.com/nafiozdemir231-prog/llm-runner-aio"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-white/[0.07] px-7 py-3.5 text-sm transition hover:bg-white/5"
                style={mono}
              >
                docs / source
              </a>
            </div>
          </div>

          {/* Terminal kutusu (mockup birebir) */}
          <div className="rounded-xl border border-white/[0.07] bg-[#101216] p-5 shadow-2xl">
            <div className="mb-4 flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
            </div>
            <div className="text-[13px] leading-relaxed text-zinc-400" style={mono}>
              <div><span className="text-zinc-600">$</span> run.bat</div>
              <div><span className="text-[#fbbf24]">✓</span> GPU algılandı&nbsp; : RTX 5080 · 15.9 GB VRAM</div>
              <div><span className="text-[#fbbf24]">✓</span> Profil&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : 16 GB preset</div>
              <div><span className="text-[#fbbf24]">✓</span> Model&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : qwen3.8-27B + DFlash2 draft</div>
              <div><span className="text-[#fbbf24]">✓</span> llama.cpp&nbsp;&nbsp;&nbsp;&nbsp; : <span className="text-white">localhost:1234</span></div>
              <div><span className="text-[#fbbf24]">✓</span> Open WebUI&nbsp;&nbsp;&nbsp; : <span className="text-white">localhost:3000</span></div>
              <div><span className="text-[#fbbf24]">✓</span> Strata&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : <span className="text-white">localhost:1235</span> (OpenAI+Anthropic)</div>
              <div>
                <span className="text-green-400">hazır.</span>{" "}
                <span className="animate-pulse">▊</span>
              </div>
            </div>
          </div>
        </header>

        {/* Servisler */}
        <section className="border-t border-white/5 py-14">
          <p className="mb-8 text-[11px] uppercase tracking-[0.22em] text-[#f59e0b]" style={mono}>
            {"// neler dahil"}
          </p>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="rounded-lg border border-white/[0.07] p-5 transition hover:border-amber-500/40 hover:bg-[#111318]">
              <h3 className="font-semibold text-white" style={mono}>llama.cpp</h3>
              <p className="mt-2 text-[13px] text-zinc-500">CUDA 13 + Vulkan hazır derlenmiş engine, VRAM profilli presetler.</p>
            </div>
            <a href="https://github.com/Niko1221/Strata" target="_blank" rel="noopener noreferrer" className="block rounded-lg border border-white/[0.07] p-5 transition hover:border-amber-500/40 hover:bg-[#111318]">
              <h3 className="font-semibold text-white" style={mono}>Strata</h3>
              <p className="mt-2 text-[13px] text-zinc-500">Qwen3.8-Flash-Next MoE; tek port, çift persona, IQ quant seçenekleri.</p>
            </a>
            <Link href="/multimodal" className="block rounded-lg border border-white/[0.07] p-5 transition hover:border-amber-500/40 hover:bg-[#111318]">
              <h3 className="font-semibold text-white" style={mono}>Wan2GP</h3>
              <p className="mt-2 text-[13px] text-zinc-500">GPU neslini tespit eder, yerel görsel/video üretim sunucusu kurar.</p>
            </Link>
            <Link href="/models/rankings" className="block rounded-lg border border-white/[0.07] p-5 transition hover:border-amber-500/40 hover:bg-[#111318]">
              <h3 className="font-semibold text-white" style={mono}>Rankings</h3>
              <p className="mt-2 text-[13px] text-zinc-500">121 GGUF model, quant ve VRAM bazlı karşılaştırma tablosu.</p>
            </Link>
          </div>
        </section>

        {/* Alt mono şerit */}
        <footer className="flex items-center justify-between border-t border-white/5 py-6 text-xs text-zinc-600" style={mono}>
          <span>© 2026 aihublocal.com</span>
          <span>no cloud · no telemetry · MIT</span>
        </footer>
      </div>
    </div>
  );
}
