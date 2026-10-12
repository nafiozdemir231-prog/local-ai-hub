"use client";

import { multimodalModels } from "@/data/multimodal-models";
import { useLang } from "@/lib/i18n";
import { Film, ImageIcon, AudioLines, Sparkles, ExternalLink } from "lucide-react";

const osIcons: Record<string, string> = {
  Windows: "🪟",
  macOS: "🍎",
  Linux: "🐧",
  Docker: "🐳",
};

const chips = (s: string) => s.split(/[,/]/).map((x) => x.trim()).filter(Boolean);

function pickIcon(supported: string) {
  if (supported.includes("Video")) return <Film className="h-5 w-5 text-primary" />;
  if (/Audio|TTS|Speech|Voice/.test(supported)) return <AudioLines className="h-5 w-5 text-primary" />;
  if (supported.includes("Image")) return <ImageIcon className="h-5 w-5 text-primary" />;
  return <Sparkles className="h-5 w-5 text-primary" />;
}

export default function MultimodalPage() {
  const { t } = useLang();
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-foreground mb-3">{t("nav.multimodal")}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("mm.sub")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {multimodalModels.map((model) => (
            <a
              key={model.name}
              href={model.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-6 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent group-hover:bg-accent/70 transition-colors duration-300">
                    {pickIcon(model.supported)}
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">{model.name}</h3>
                    <p className="text-xs text-muted-foreground">{model.platform}</p>
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <p className="text-sm text-muted-foreground mb-4">{model.explanation}</p>
              <div className="flex flex-wrap gap-1.5">
                {chips(model.os).map((os) => (
                  <span
                    key={os}
                    className="inline-flex items-center gap-1 text-xs bg-secondary text-muted-foreground px-2.5 py-1 rounded-md font-medium"
                  >
                    {osIcons[os] || "💻"}
                    {os}
                  </span>
                ))}
                {chips(model.supported).map((s) => (
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
