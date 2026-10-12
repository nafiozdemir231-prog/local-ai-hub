import { localLLMRunners } from "@/data/local-llm-runners";
import { Cpu, ExternalLink } from "lucide-react";

const osIcons: Record<string, string> = {
  Windows: "🪟",
  macOS: "🍎",
  Linux: "🐧",
  Docker: "🐳",
  Android: "🤖",
};

const chips = (s: string) => s.split(/[,/]/).map((x) => x.trim()).filter(Boolean);

export default function LocalLLMRunnersPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-foreground mb-3">LLM Runners</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the best tools for running local LLMs on your own hardware
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {localLLMRunners.map((runner) => (
            <a
              key={runner.name}
              href={runner.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-6 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent group-hover:bg-accent/70 transition-colors duration-300">
                    <Cpu className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">{runner.name}</h3>
                    <p className="text-xs text-muted-foreground">{runner.platform}</p>
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <p className="text-sm text-muted-foreground mb-4">{runner.explanation}</p>
              <div className="flex flex-wrap gap-1.5">
                {chips(runner.os).map((os) => (
                  <span
                    key={os}
                    className="inline-flex items-center gap-1 text-xs bg-secondary text-muted-foreground px-2.5 py-1 rounded-md font-medium"
                  >
                    {osIcons[os] || "💻"}
                    {os}
                  </span>
                ))}
                {chips(runner.supported).map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center gap-1 text-xs bg-secondary text-muted-foreground px-2.5 py-1 rounded-md font-medium"
                  >
                    • {s}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
