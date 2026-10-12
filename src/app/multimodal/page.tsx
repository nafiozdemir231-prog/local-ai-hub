import Link from "next/link";
import { multimodalModels } from "@/data/multimodal-models";
import { ExternalLink } from "lucide-react";

export default function MultimodalPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-foreground mb-3">Multimodal</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the best apps for local AI multimedia generation
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-secondary/60">
                <th className="text-left py-4 px-5 text-xs font-bold uppercase tracking-wider text-muted-foreground">Rank</th>
                <th className="text-left py-4 px-5 text-xs font-bold uppercase tracking-wider text-muted-foreground">App Name</th>
                <th className="text-left py-4 px-5 text-xs font-bold uppercase tracking-wider text-muted-foreground">OS</th>
                <th className="text-left py-4 px-5 text-xs font-bold uppercase tracking-wider text-muted-foreground">Platform</th>
                <th className="text-left py-4 px-5 text-xs font-bold uppercase tracking-wider text-muted-foreground">Supported</th>
                <th className="text-left py-4 px-5 text-xs font-bold uppercase tracking-wider text-muted-foreground">Explanation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {multimodalModels.map((model, index) => (
                <tr key={model.name} className="transition-all duration-150 hover:bg-accent/60">
                  <td className="py-4 px-5">
                    <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold ${
                      index === 0 ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 ring-2 ring-yellow-300 dark:ring-yellow-700" :
                      index === 1 ? "bg-secondary text-muted-foreground ring-2 ring-border" :
                      index === 2 ? "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 ring-2 ring-orange-300 dark:ring-orange-700" :
                      "bg-secondary/60 text-muted-foreground"
                    }`}>
                      {index + 1}
                    </span>
                  </td>
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-2">
                      <Link href={model.websiteUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:text-primary hover:underline transition-colors">
                        {model.name}
                      </Link>
                      <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                    </div>
                  </td>
                  <td className="py-4 px-5 text-sm text-muted-foreground font-mono">{model.os}</td>
                  <td className="py-4 px-5 text-sm text-muted-foreground">{model.platform}</td>
                  <td className="py-4 px-5 text-sm text-muted-foreground">{model.supported}</td>
                  <td className="py-4 px-5 text-sm text-muted-foreground max-w-xs">{model.explanation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
