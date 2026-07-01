import { Download, Package, Server, Zap, Globe, Settings, Cpu, GitFork, ExternalLink } from "lucide-react";

export default function LLMRunnerAIO() {
  const githubRepo = "https://github.com/nafiozdemir231-prog/llm-runner-aio/tree/main";
  const hfPage = "https://huggingface.co/vincespeed/llm-runner-aio";
  const exeDownload = "https://huggingface.co/vincespeed/llm-runner-aio/resolve/main/LLM-Runner-AIO.exe";
  const rarDownload = "https://huggingface.co/vincespeed/llm-runner-aio/resolve/main/LLM-Runner-AIO.rar";
  
  const features = [
    { icon: Package, title: "Single File Deployment", desc: "2.5 GB .exe with all dependencies included" },
    { icon: Server, title: "4 Core Services", desc: "Open WebUI, llama.cpp, Vane, SearXNG" },
    { icon: Zap, title: "Automatic Setup", desc: "No installs needed — Python and Node.js are bundled" },
    { icon: Cpu, title: "Windows Integration", desc: "Runs in system tray on startup" },
    { icon: Globe, title: "8 Language Support", desc: "Turkish, English, Spanish, German, French, Portuguese, Chinese, Japanese" },
    { icon: Settings, title: "Advanced Settings", desc: "Hardware detection, port config, auto-start" },
  ];

  const components = [
    { name: "Open WebUI", desc: "Beautiful web interface for chatting with local LLMs", license: "MIT" },
    { name: "llama.cpp", desc: "High-performance C++ inference engine", license: "MIT" },
    { name: "SearXNG", desc: "Privacy-respecting metasearch engine", license: "GPLv3" },
    { name: "Vane", desc: "AI-powered browser automation tool", license: "Open Source" },
  ];

  const steps = [
    { num: "1", title: "Download", desc: "Download LLM-Runner-AIO.exe (2.5 GB) from Hugging Face" },
    { num: "2", title: "Run", desc: "Double-click to execute — no installation needed" },
    { num: "3", title: "Ready", desc: "Access Open WebUI at http://localhost:3000" },
  ];

  return (
    <div className="flex flex-col flex-1 items-center min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-16">
        {/* Hero */}
        <section className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Zap className="h-4 w-4" />
            All-in-One Package
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            LLM Runner AIO
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            All Local LLM Tools — In a Single .exe File
          </p>
          
          {/* Download Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <a
              href={exeDownload}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-indigo-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all duration-200 hover:-translate-y-0.5"
            >
              <Download className="h-5 w-5" />
              Download LLM-Runner-AIO.exe (2.5 GB)
            </a>
            <a
              href={rarDownload}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white text-indigo-600 border-2 border-indigo-600 px-6 py-3 rounded-xl text-base font-semibold hover:bg-indigo-50 transition-all duration-200"
            >
              <Download className="h-5 w-5" />
              Download .RAR (2.3 GB)
            </a>
          </div>
          
          {/* GitHub Link */}
          <div className="flex items-center justify-center gap-4">
            <a
              href={githubRepo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <GitFork className="h-5 w-5" />
              View on GitHub
            </a>
            <span className="text-gray-300">|</span>
            <a
              href={hfPage}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ExternalLink className="h-5 w-5" />
              Hugging Face Page
            </a>
          </div>
        </section>

        {/* Overview */}
        <section className="mb-16">
          <div className="rounded-xl border border-gray-200 bg-white p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
            <p className="text-gray-600 leading-relaxed">
              LLM Runner AIO is a comprehensive, self-contained desktop application that bundles all the tools you need 
              to run local AI models on your own hardware. No complex setup, no dependency hell — just download, run, 
              and start chatting with AI locally.
            </p>
          </div>
        </section>

        {/* Included */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">What is Included</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {components.map((c) => (
              <div key={c.name} className="rounded-xl border border-gray-200 bg-white p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-900">{c.name}</h3>
                  <span className="text-xs font-medium bg-green-100 text-green-700 px-3 py-1 rounded-full">{c.license}</span>
                </div>
                <p className="text-sm text-gray-600">{c.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features Grid */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="rounded-xl border border-gray-200 bg-white p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 mb-4">
                  <f.icon className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Architecture Diagram */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">How It Works</h2>
          
          {/* Screenshot */}
          <div className="mb-8">
            <img
              src="/2.png"
              alt="LLM Runner AIO Screenshot"
              className="max-w-full h-auto rounded-2xl shadow-2xl border border-gray-200"
            />
          </div>
          
          <div className="rounded-xl border border-gray-200 bg-white p-8">
            <pre className="text-sm bg-gray-50 p-4 rounded-lg overflow-x-auto">
{`┌─────────────────────────────────────────────┐
│           LLM Runner AIO Launcher           │
├─────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐                │
│  │ SearXNG  │  │ llama.cpp│                │
│  │ :8080    │  │ :8000    │                │
│  └──────────┘  └──────────┘                │
│  ┌──────────┐  ┌──────────┐                │
│  │OpenWebUI │  │  Vane    │                │
│  │ :3000    │  │ :3001    │                │
│  └──────────┘  └──────────┘                │
└─────────────────────────────────────────────┘`}
            </pre>
            <ul className="mt-6 space-y-3">
              <li className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-indigo-600 mt-2 flex-shrink-0" />
                <span className="text-gray-700"><strong>llama.cpp</strong> runs the AI model inference engine</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-indigo-600 mt-2 flex-shrink-0" />
                <span className="text-gray-700"><strong>Open WebUI</strong> provides the chat interface at <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">http://localhost:3000</code></span>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-indigo-600 mt-2 flex-shrink-0" />
                <span className="text-gray-700"><strong>SearXNG</strong> enables local web search at <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">http://localhost:8080</code></span>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-indigo-600 mt-2 flex-shrink-0" />
                <span className="text-gray-700"><strong>Vane</strong> handles browser automation at <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">http://localhost:3001</code></span>
              </li>
            </ul>
          </div>
        </section>

        {/* Installation Steps */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Installation</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((s) => (
              <div key={s.num} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-600 text-white text-2xl font-bold mb-4">
                  {s.num}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* System Requirements */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">System Requirements</h2>
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 px-4 font-semibold text-gray-900">Requirement</th>
                    <th className="py-3 px-4 font-semibold text-gray-900">Minimum</th>
                    <th className="py-3 px-4 font-semibold text-gray-900">Recommended</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 text-gray-700">OS</td>
                    <td className="py-3 px-4 text-gray-700">Windows 10/11</td>
                    <td className="py-3 px-4 text-gray-700">Windows 11</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 text-gray-700">RAM</td>
                    <td className="py-3 px-4 text-gray-700">8 GB</td>
                    <td className="py-3 px-4 text-gray-700">16 GB+</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 text-gray-700">GPU</td>
                    <td className="py-3 px-4 text-gray-700">CPU Only</td>
                    <td className="py-3 px-4 text-gray-700">NVIDIA RTX 3060+</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 text-gray-700">VRAM</td>
                    <td className="py-3 px-4 text-gray-700">N/A</td>
                    <td className="py-3 px-4 text-gray-700">4 GB+</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-700">Python</td>
                    <td className="py-3 px-4 text-gray-700">3.11 (bundled)</td>
                    <td className="py-3 px-4 text-gray-700">3.11 (bundled)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              <strong>Note:</strong> Python 3.11 and Node.js are bundled inside the executable. No separate installation needed!
            </p>
          </div>
        </section>

        {/* Data Privacy */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Data Privacy</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-gray-700">No Cloud Dependencies — Everything runs locally</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-gray-700">No Telemetry — No data is sent anywhere</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-gray-700">Local Database — Chat history stored only on your machine</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-gray-700">No Account Required — No registration or login needed</span>
                </li>
              </ul>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <h3 className="font-bold text-gray-900 mb-3">Supported Languages</h3>
              <div className="grid grid-cols-2 gap-2">
                <span className="text-gray-700">🇹🇷 Turkish</span>
                <span className="text-gray-700">🇬🇧 English</span>
                <span className="text-gray-700">🇪🇸 Spanish</span>
                <span className="text-gray-700">🇩🇪 German</span>
                <span className="text-gray-700">🇫🇷 French</span>
                <span className="text-gray-700">🇵🇹 Portuguese</span>
                <span className="text-gray-700">🇨🇳 Chinese</span>
                <span className="text-gray-700">🇯🇵 Japanese</span>
              </div>
            </div>
          </div>
        </section>

        {/* Credits */}
        <section className="mb-16">
          <div className="rounded-xl border border-gray-200 bg-white p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Credits</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              This project would not be possible without the incredible work of:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>Georgi Gerganov</strong> — llama.cpp</li>
              <li>• <strong>Open WebUI Team</strong> — Open WebUI</li>
              <li>• <strong>SearXNG Contributors</strong> — SearXNG</li>
              <li>• <strong>All open-source contributors</strong> who make local AI accessible</li>
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
          <p className="text-gray-600 mb-8">Download LLM Runner AIO and start running local LLMs instantly.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={exeDownload}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-indigo-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all duration-200 hover:-translate-y-0.5"
            >
              <Download className="h-5 w-5" />
              Download .exe (2.5 GB)
            </a>
            <a
              href={rarDownload}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white text-indigo-600 border-2 border-indigo-600 px-6 py-3 rounded-xl text-base font-semibold hover:bg-indigo-50 transition-all duration-200"
            >
              <Download className="h-5 w-5" />
              Download .RAR (2.3 GB)
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
