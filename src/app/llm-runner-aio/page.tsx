"use client";

import { Download, Package, Zap, Settings, Cpu, GitFork, ExternalLink, Code2, MessageSquare, Send, User, Gauge, Network } from "lucide-react";
import { useState, useEffect } from "react";
import { useLang, LANGS } from "@/lib/i18n";

export default function LLMRunnerAIO() {
  const { t } = useLang();
  const githubRepo = "https://github.com/nafiozdemir231-prog/llm-runner-aio/tree/main";
  const hfPage = "https://huggingface.co/vincespeed/llm-runner-aio";
  const exeDownload = "https://huggingface.co/vincespeed/llm-runner-aio/resolve/main/LLM-Runner-AIOv2.2.exe";
  const rarDownload = "https://huggingface.co/vincespeed/llm-runner-aio/resolve/main/LLM-Runner-AIOv2.2.rar";
  const nodeDownload = "https://nodejs.org/en/download";
  const pythonDownload = "https://www.python.org/ftp/python/3.11.9/python-3.11.9-amd64.exe";

  // Version is auto-derived from the .exe download filename (e.g. LLM-Runner-AIOv2.2.exe -> "v2.2")
  const appVersionMatch = exeDownload.match(/AIO(v[\d.]+)\.exe$/);
  const appVersion = appVersionMatch ? appVersionMatch[1] : "";
  
  const features = [
    { icon: Package, title: t("aio.f1t"), desc: t("aio.f1d") },
    { icon: Cpu, title: t("aio.f2t"), desc: t("aio.f2d") },
    { icon: Download, title: t("aio.f3t"), desc: t("aio.f3d") },
    { icon: Settings, title: t("aio.f4t"), desc: t("aio.f4d") },
    { icon: Zap, title: t("aio.f5t"), desc: t("aio.f5d") },
    { icon: Network, title: t("aio.f6t"), desc: t("aio.f6d") },
    { icon: Code2, title: t("aio.f7t"), desc: t("aio.f7d") },
    { icon: Gauge, title: t("aio.f8t"), desc: t("aio.f8d") },
    { icon: GitFork, title: t("aio.f9t"), desc: t("aio.f9d") },
  ];

  const components = [
    { name: "Open WebUI", desc: t("aio.c1d"), license: "MIT", link: "https://github.com/open-webui/open-webui" },
    { name: "llama.cpp", desc: t("aio.c2d"), license: "MIT", link: "https://github.com/ggml-org/llama.cpp" },
    { name: "SearXNG", desc: t("aio.c3d"), license: "GPLv3", link: "https://github.com/searxng/searxng" },
    { name: "Pi Coding", desc: t("aio.c4d"), license: "Open Source", link: "https://github.com/earendil-works/pi" },
    { name: "Vane", desc: t("aio.c5d"), license: "Open Source", link: "https://github.com/ItzCrazyKns/Vane" },
    { name: "Wan2GP", desc: t("aio.c6d"), license: "Open Source", link: "https://github.com/deepbeepmeep/Wan2GP" },
    { name: "Strata", desc: t("aio.c7d"), license: "Open Source", link: "https://github.com/Niko1221/Strata" },
  ];

  const presets = [
    { vram: "4 / 6 GB", ram: "32 GB", models: "qwen3.6-35B-A3B · gemma-4-26B · gemma-4-E4B" },
    { vram: "8 GB", ram: "32 GB", models: "qwen3.6-35B-A3B · gemma-4-26B · gemma-4-E4B · qwen3.8-27B" },
    { vram: "10 GB", ram: "32 GB", models: "qwen3.6-35B-A3B · gemma-4-26B · qwen3.8-27B" },
    { vram: "12 GB", ram: "32 GB", models: "qwen3.6-35B-A3B · gemma-4-26B · qwen3.8-27B" },
    { vram: "16 GB", ram: "32 GB", models: "qwen3.6-35B-A3B · gemma-4-26B · qwen3.8-27B (DFlash2 draft)" },
    { vram: "24 GB", ram: "32 GB", models: "qwen3.8-27B · gemma-4-26B" },
    { vram: "32 GB", ram: "32 GB", models: "qwen3.8-27B · gemma-4-31B" },
    { vram: "4 GB", ram: "16 GB", models: "gemma-4-E4B · qwen3.5-4B · Ling-3.0-tiny · MiniCPM5-2B · Spark-X2.5-4B" },
    { vram: "6 GB", ram: "16 GB", models: "gemma-4-E4B · qwen3.5-9B · Ling-3.0-tiny · MiniCPM5-2B · Spark-X2.5-4B" },
  ];

  const steps = [
    { num: "1", title: t("aio.s1t"), desc: t("aio.s1d") },
    { num: "2", title: t("aio.s2t"), desc: t("aio.s2d") },
    { num: "3", title: t("aio.s3t"), desc: t("aio.s3d") },
    { num: "4", title: t("aio.s4t"), desc: t("aio.s4d") },
  ];

  return (
    <div className="flex flex-col flex-1 items-center min-h-screen bg-background">
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-16">
        {/* Hero */}
        <section className="text-center mb-16">
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
            <span className="inline-flex items-center gap-2 bg-accent text-primary px-4 py-2 rounded-full text-sm font-medium">
              <Zap className="h-4 w-4" />
              {t("aio.badge")}
            </span>
            {appVersion && (
              <span className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-4 py-2 rounded-full text-sm font-medium">
                {t("aio.latest")}: {appVersion}
              </span>
            )}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            LLM Runner AIO{appVersion ? ` ${appVersion}` : ""}
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            {t("aio.tagline")}
          </p>
          
          {/* Download Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
            <a
              href={exeDownload}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-xl text-lg font-semibold hover:brightness-110 shadow-lg shadow-primary/30 dark:shadow-none transition-all duration-200 hover:-translate-y-0.5">
              <Download className="h-5 w-5" />
              {t("aio.dlExe")}
            </a>
            <a
              href={rarDownload}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-card text-primary border-2 border-primary px-6 py-3 rounded-xl text-base font-semibold hover:bg-accent transition-all duration-200">
              <Download className="h-5 w-5" />
              {t("aio.dlRar")}
            </a>
          </div>
          
          {/* Required Downloads */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <a
              href={nodeDownload}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-green-600 dark:bg-green-700 text-white px-6 py-3 rounded-xl text-base font-semibold hover:bg-green-700 dark:hover:bg-green-800 shadow-lg shadow-green-200 dark:shadow-none transition-all duration-200 hover:-translate-y-0.5">
              <Code2 className="h-5 w-5" />
              {t("aio.dlNode")}
            </a>
            <a
              href={pythonDownload}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-blue-600 dark:bg-blue-700 text-white px-6 py-3 rounded-xl text-base font-semibold hover:bg-blue-700 dark:hover:bg-blue-800 shadow-lg shadow-blue-200 dark:shadow-none transition-all duration-200 hover:-translate-y-0.5">
              <Code2 className="h-5 w-5" />
              {t("aio.dlPython")}
            </a>
          </div>
          
          {/* Required Note */}
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
            <span className="inline-flex h-2 w-2 rounded-full bg-yellow-500"></span>
            {t("aio.reqNote")}
          </p>
          
          {/* Feedback CTA */}
          <a
            href="#feedback"
            className="inline-flex items-center gap-2 text-primary hover:text-primary transition-colors font-medium">
            <MessageSquare className="h-4 w-4" />
            {t("aio.feedbackCta")}
          </a>
          
          {/* GitHub & HuggingFace Links */}
          <div className="flex items-center justify-center gap-4">
            <a
              href={githubRepo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <GitFork className="h-5 w-5" />
              GitHub
            </a>
            <span className="text-muted-foreground/50">|</span>
            <a
              href={hfPage}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ExternalLink className="h-5 w-5" />
              HuggingFace
            </a>
          </div>
        </section>

        {/* Overview */}
        <section className="mb-16">
          <div className="rounded-xl border border-border bg-card p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">{t("aio.overview")}</h2>
            <p className="text-muted-foreground leading-relaxed">
              {t("aio.overviewText")}
            </p>
          </div>
        </section>

        {/* Included */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">{t("aio.included")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {components.map((c) => (
              <div key={c.name} className="rounded-xl border border-border bg-card p-6 hover:shadow-lg dark:hover:shadow-none hover:-translate-y-1 transition-all duration-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-foreground">
                    {c.link ? (
                      <a href={c.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-primary transition-colors">
                        {c.name}
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    ) : (
                      c.name
                    )}
                  </h3>
                  <span className="text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full">{c.license}</span>
                </div>
                <p className="text-sm text-muted-foreground">{c.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Configured Model Presets */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">{t("aio.presets")}</h2>
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-3 px-4 font-semibold text-foreground">VRAM</th>
                    <th className="py-3 px-4 font-semibold text-foreground">RAM</th>
                    <th className="py-3 px-4 font-semibold text-foreground">{t("aio.models")}</th>
                  </tr>
                </thead>
                <tbody>
                  {presets.map((p) => (
                    <tr key={`${p.vram}-${p.ram}`} className="border-b border-border/60">
                      <td className="py-3 px-4 text-muted-foreground">{p.vram}</td>
                      <td className="py-3 px-4 text-muted-foreground">{p.ram}</td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">{p.models}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              {t("aio.presetNote")}
            </p>
          </div>
        </section>

        {/* Features Grid */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">{t("aio.features")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="rounded-xl border border-border bg-card p-6 hover:shadow-lg dark:hover:shadow-none hover:-translate-y-1 transition-all duration-200">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent mb-4">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">{t("aio.howItWorks")}</h2>
          
          {/* Screenshot */}
          <div className="mb-8">
            <img
              src="/2.png"
              alt="LLM Runner AIO Screenshot"
              className="max-w-full h-auto rounded-2xl shadow-2xl border border-border"
            />
          </div>

          <div className="rounded-xl border border-border bg-card p-8">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span className="text-muted-foreground"><strong>llama.cpp</strong> {t("aio.hiw1")} <code className="bg-secondary px-2 py-0.5 rounded text-sm">http://localhost:1234</code></span>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span className="text-muted-foreground"><strong>Open WebUI</strong> {t("aio.hiw2")} <code className="bg-secondary px-2 py-0.5 rounded text-sm">http://localhost:3000</code></span>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span className="text-muted-foreground"><strong>SearXNG</strong> {t("aio.hiw3")} <code className="bg-secondary px-2 py-0.5 rounded text-sm">http://localhost:8080</code></span>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span className="text-muted-foreground"><strong>Vane</strong> {t("aio.hiw4")} <code className="bg-secondary px-2 py-0.5 rounded text-sm">http://localhost:3001</code></span>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span className="text-muted-foreground"><strong>Wan2GP</strong> {t("aio.hiw5")} <code className="bg-secondary px-2 py-0.5 rounded text-sm">http://localhost:7860</code></span>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span className="text-muted-foreground"><strong>Strata</strong> {t("aio.hiw6")} <code className="bg-secondary px-2 py-0.5 rounded text-sm">http://localhost:1235</code> (OpenAI + Anthropic API)</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Installation Steps */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">{t("aio.installation")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((s) => (
              <div key={s.num} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-white text-2xl font-bold mb-4">
                  {s.num}
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* System Requirements */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">{t("aio.sysReq")}</h2>
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-3 px-4 font-semibold text-foreground">{t("aio.thRequirement")}</th>
                    <th className="py-3 px-4 font-semibold text-foreground">{t("aio.thMinimum")}</th>
                    <th className="py-3 px-4 font-semibold text-foreground">{t("aio.thRecommended")}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/60">
                    <td className="py-3 px-4 text-muted-foreground">OS</td>
                    <td className="py-3 px-4 text-muted-foreground">Windows 10/11</td>
                    <td className="py-3 px-4 text-muted-foreground">Windows 11</td>
                  </tr>
                  <tr className="border-b border-border/60">
                    <td className="py-3 px-4 text-muted-foreground">RAM</td>
                    <td className="py-3 px-4 text-muted-foreground">8 GB</td>
                    <td className="py-3 px-4 text-muted-foreground">16 GB+</td>
                  </tr>

                  <tr className="border-b border-border/60">
                    <td className="py-3 px-4 text-muted-foreground">VRAM</td>
                    <td className="py-3 px-4 text-muted-foreground">N/A</td>
                    <td className="py-3 px-4 text-muted-foreground">4 GB+</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-muted-foreground">Python</td>
                    <td className="py-3 px-4 text-muted-foreground">3.11 (required)</td>
                    <td className="py-3 px-4 text-muted-foreground">3.11 (required)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-muted-foreground">Node.js</td>
                    <td className="py-3 px-4 text-muted-foreground">Latest (required)</td>
                    <td className="py-3 px-4 text-muted-foreground">Latest LTS (recommended)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-muted-foreground">Wan2GP (optional)</td>
                    <td className="py-3 px-4 text-muted-foreground">N/A</td>
                    <td className="py-3 px-4 text-muted-foreground">Few extra GB disk + CUDA/driver matching your GPU generation</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-muted-foreground">Strata (optional)</td>
                    <td className="py-3 px-4 text-muted-foreground">48 GB RAM + 12 GB VRAM</td>
                    <td className="py-3 px-4 text-muted-foreground">~58–84 GB free disk for the MoE model download</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              {t("aio.sysNote")}
            </p>
          </div>
        </section>

        {/* Data Privacy */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">{t("aio.privacy")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-border bg-card p-6">
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-muted-foreground">{t("aio.priv1")}</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-muted-foreground">{t("aio.priv2")}</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-muted-foreground">{t("aio.priv3")}</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-muted-foreground">{t("aio.priv4")}</span>
                </li>
              </ul>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-bold text-foreground mb-3">{t("aio.supportedLangs")}</h3>
              <div className="grid grid-cols-2 gap-2">
                {LANGS.map((l) => (
                  <span key={l.code} className="text-muted-foreground">
                    {l.flag} {l.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Credits */}
        <section className="mb-16">
          <div className="rounded-xl border border-border bg-card p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">{t("aio.credits")}</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {t("aio.creditsIntro")}
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li>• <strong>Georgi Gerganov</strong> — llama.cpp</li>
              <li>• <strong>Open WebUI Team</strong> — Open WebUI</li>
              <li>• <strong>SearXNG Contributors</strong> — SearXNG</li>
              <li>• <strong>{t("aio.creditsLast")}</strong></li>
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">{t("aio.ctaTitle")}</h2>
          <p className="text-muted-foreground mb-8">{t("aio.ctaDesc")}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={exeDownload}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-xl text-lg font-semibold hover:brightness-110 shadow-lg shadow-primary/30 dark:shadow-none transition-all duration-200 hover:-translate-y-0.5">
              <Download className="h-5 w-5" />
              {t("aio.dlExeShort")}
            </a>
            <a
              href={rarDownload}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-card text-primary border-2 border-primary px-6 py-3 rounded-xl text-base font-semibold hover:bg-accent transition-all duration-200">
              <Download className="h-5 w-5" />
              {t("aio.dlRar")}
            </a>
          </div>
        </section>

        {/* Feedback Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">
            <MessageSquare className="inline-block h-6 w-6 mr-2" />
            {t("aio.feedbackCta")}
          </h2>
          
          <FeedbackForm />
        </section>
      </main>
    </div>
  );
}

function FeedbackForm() {
  const { t, lang } = useLang();
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/runner-feedback")
      .then((res) => res.json())
      .then((data) => {
        setFeedbacks(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setSubmitting(true);
    setSuccess(false);
    setError(false);

    try {
      await fetch("/api/runner-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name || "Anonymous", content }),
      });
      setContent("");
      setName("");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      
      const res = await fetch("/api/runner-feedback");
      const data = await res.json();
      setFeedbacks(data);
    } catch {
      setError(true);
      setTimeout(() => setError(false), 3000);
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const locales: Record<string, string> = { en: "en-US", tr: "tr-TR", es: "es-ES", de: "de-DE", fr: "fr-FR", pt: "pt-BR", zh: "zh-CN", ja: "ja-JP" };
    return date.toLocaleDateString(locales[lang] || "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Form */}
      <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-card p-6 space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-1">
            {t("fb.name")} <span className="text-muted-foreground">{t("fb.optional")}</span>
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("cfg.anon")}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-input bg-card text-foreground placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-muted-foreground mb-1">
            {t("fb.label")} <span className="text-red-500">*</span>
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={t("fb.placeholder")}
            rows={4}
            className="w-full px-4 py-2.5 rounded-lg border border-input bg-card text-foreground placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition-all resize-none"
            required
          />
        </div>

        <button
          type="submit"
          disabled={submitting || !content.trim()}
          className="w-full flex items-center justify-center gap-2 bg-primary hover:brightness-110 disabled:opacity-50 text-primary-foreground px-6 py-3 rounded-lg font-semibold transition-all duration-200 disabled:cursor-not-allowed cursor-pointer">
          <Send className="h-4 w-4" />
          {submitting ? t("fb.sending") : t("fb.submit")}
        </button>

        {success && (
          <p className="text-sm text-green-600 dark:text-green-400 text-center">{t("fb.success")}</p>
        )}
        {error && (
          <p className="text-sm text-red-600 dark:text-red-400 text-center">{t("fb.error")}</p>
        )}
      </form>

      {/* Feedback List */}
      <div className="space-y-4">
        {loading ? (
          <p className="text-center text-muted-foreground">{t("fb.loading")}</p>
        ) : feedbacks.length === 0 ? (
          <p className="text-center text-muted-foreground">{t("fb.empty")}</p>
        ) : (
          feedbacks.map((fb) => (
            <div key={fb.id} className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-foreground">{fb.name}</span>
                <span className="text-xs text-muted-foreground">{formatDate(fb.createdAt)}</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">{fb.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
