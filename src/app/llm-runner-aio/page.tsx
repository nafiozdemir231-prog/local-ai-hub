import Link from "next/link";
import { Download, Package, Server, Zap, Globe, Settings, Cpu } from "lucide-react";

export default function LLMRunnerAIO() {
  const downloadUrl = "https://drive.google.com/file/d/1vPkaNlkRlhB37sIh299fjcNNBlwEAUXy/view?usp=sharing";
  
  const features = [
    { icon: Package, title: "Single File Deployment", desc: "2.5 GB .exe with all dependencies included" },
    { icon: Server, title: "4 Core Services", desc: "Open WebUI, llama.cpp, Vane, SearXNG" },
    { icon: Zap, title: "Automatic Setup", desc: "No installs needed except Node.js and Python" },
    { icon: Cpu, title: "Windows Integration", desc: "Runs in system tray on startup" },
    { icon: Globe, title: "7 Language Support", desc: "Turkish, English, Spanish, German, French, Portuguese, Chinese, Japanese" },
    { icon: Settings, title: "Advanced Settings", desc: "Hardware detection, port config, auto-start" },
  ];

  const steps = [
    { num: "1", title: "Download", desc: "Download LLM-Runner-AIO.exe (2.5 GB)" },
    { num: "2", title: "Run", desc: "Double-click to execute" },
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
          <a
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-indigo-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all duration-200 hover:-translate-y-0.5"
          >
            <Download className="h-5 w-5" />
            Download LLM-Runner-AIO.exe (2.5 GB)
          </a>
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
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span className="text-gray-700">Windows 10/11</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span className="text-gray-700">Node.js — <a href="https://nodejs.org/en/download" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Download</a></span>
              </li>
              <li className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span className="text-gray-700">Python 3.11.9 — <a href="https://www.python.org/ftp/python/3.11.9/python-3.11.9-amd64.exe" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Download</a></span>
              </li>
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
          <p className="text-gray-600 mb-8">Download LLM Runner AIO and start running local LLMs instantly.</p>
          <a
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-indigo-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all duration-200 hover:-translate-y-0.5"
          >
            <Download className="h-5 w-5" />
            Download Now
          </a>
        </section>
      </main>
    </div>
  );
}
