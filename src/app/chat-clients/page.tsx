import { clientTools } from "@/data/client-tools";
import { Monitor, Terminal, Globe, Cpu, ExternalLink } from "lucide-react";

const platformIcons: Record<string, { icon: React.ReactNode; label: string }> = {
  "macOS": { icon: "🍎", label: "macOS" },
  "Windows": { icon: "🪟", label: "Windows" },
  "Linux": { icon: "🐧", label: "Linux" },
  "Cross-platform": { icon: "🌐", label: "Cross-platform" },
  "Browser-based": { icon: "🌍", label: "Browser" },
  "VS Code": { icon: "📝", label: "VS Code" },
  "JetBrains": { icon: "🧠", label: "JetBrains" },
  "Visual Studio": { icon: "💜", label: "Visual Studio" },
  "Multiple IDEs": { icon: "🔧", label: "Multiple IDEs" },
  "JetBrains IDEs": { icon: "🧠", label: "JetBrains IDEs" },
  "Neovim": { icon: "⚡", label: "Neovim" },
  "Desktop": { icon: "🖥️", label: "Desktop" },
};

const categoryIcons: Record<string, React.ReactNode> = {
  "CLI": <Terminal className="h-5 w-5" />,
  "IDE/Platform": <Monitor className="h-5 w-5" />,
  "IDE Extension": <Cpu className="h-5 w-5" />,
  "Web/Cloud": <Globe className="h-5 w-5" />,
  "Desktop App": <Monitor className="h-5 w-5" />,
  "VS Code Extension": <Cpu className="h-5 w-5" />,
  "GitHub App/IDE Extension/CLI": <Cpu className="h-5 w-5" />,
};

export default function ChatClientsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Coding Agents</h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Discover the best AI-powered coding tools and agents for your workflow
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clientTools.map((tool) => (
            <a
              key={tool.name}
              href={tool.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-6 rounded-xl border border-gray-200 bg-white hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100/50 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 group-hover:bg-indigo-200 transition-colors duration-300">
                    {categoryIcons[tool.category] || <Cpu className="h-5 w-5 text-indigo-600" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{tool.name}</h3>
                    <p className="text-xs text-gray-500">{tool.category}</p>
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-indigo-500 transition-colors" />
              </div>
              <p className="text-sm text-gray-600 mb-4">{tool.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {tool.platforms.map((platform) => {
                  const icon = platformIcons[platform];
                  return (
                    <span
                      key={platform}
                      className="inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md font-medium"
                    >
                      {icon?.icon || "💻"}
                      {icon?.label || platform}
                    </span>
                  );
                })}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
