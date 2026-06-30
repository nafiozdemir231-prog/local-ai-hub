import Link from "next/link";
import { Search, TrendingUp, MessageSquare, Image as ImageIcon, Code2, Monitor, Download } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center">
      <main className="flex-1 w-full">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 py-28">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.2),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.15),transparent_50%)]" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl">
                Discover Local LLM Configs
              </h1>
              <p className="mx-auto mt-8 max-w-3xl text-xl text-blue-200">
                Share, discover, and optimize AI configurations for local models.
                Find the perfect settings for your hardware.
              </p>
              <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/llm/configs"
                  className="rounded-lg bg-white px-8 py-4 text-base font-semibold text-gray-900 hover:bg-gray-50 shadow-lg shadow-white/10 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
                >
                  Browse Configs
                </Link>
                <Link
                  href="/llm/configs/share"
                  className="rounded-lg border border-blue-400/50 px-8 py-4 text-base font-semibold text-white hover:bg-blue-800/30 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-400"
                >
                  Share Config
                </Link>
                <Link
                  href="/llm-runner-aio"
                  className="rounded-lg bg-gradient-to-r from-orange-500 to-pink-500 px-8 py-4 text-base font-semibold text-white hover:from-orange-600 hover:to-pink-600 shadow-lg shadow-orange-200/30 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
                >
                  🚀 LLM Runner AIO
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-gradient-to-b from-white to-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-gray-900">Explore the Platform</h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
                Everything you need to discover and share local AI configurations
              </p>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {/* LLM Configs */}
              <Link
                href="/llm/configs"
                className="group block rounded-xl border border-gray-200 bg-white p-8 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100/50 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-100 group-hover:bg-indigo-200 transition-colors duration-300">
                  <Search className="h-7 w-7 text-indigo-600" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-gray-900">LLM Configs</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Search and filter configurations for local LLM models
                </p>
              </Link>

              {/* Model Rankings */}
              <Link
                href="/models/rankings"
                className="group block rounded-xl border border-gray-200 bg-white p-8 hover:border-green-300 hover:shadow-lg hover:shadow-green-100/50 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-100 group-hover:bg-green-200 transition-colors duration-300">
                  <TrendingUp className="h-7 w-7 text-green-600" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-gray-900">Model Rankings</h3>
                <p className="mt-2 text-sm text-gray-600">
                  See the best-performing models based on community ratings
                </p>
              </Link>

              {/* Coding Agents */}
              <Link
                href="/chat-clients"
                className="group block rounded-xl border border-gray-200 bg-white p-8 hover:border-purple-300 hover:shadow-lg hover:shadow-purple-100/50 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-purple-100 group-hover:bg-purple-200 transition-colors duration-300">
                  <MessageSquare className="h-7 w-7 text-purple-600" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-gray-900">Coding Agents</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Discover the best clients for local AI chat
                </p>
              </Link>

              {/* Multimodal */}
              <Link
                href="/multimodal"
                className="group block rounded-xl border border-gray-200 bg-white p-8 hover:border-orange-300 hover:shadow-lg hover:shadow-orange-100/50 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-orange-100 group-hover:bg-orange-200 transition-colors duration-300">
                  <ImageIcon className="h-7 w-7 text-orange-600" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-gray-900">Multimodal</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Explore models that support text, image, and audio
                </p>
              </Link>

              {/* LLM Runners */}
              <Link
                href="/local-llm-runners"
                className="group block rounded-xl border border-gray-200 bg-white p-8 hover:border-cyan-300 hover:shadow-lg hover:shadow-cyan-100/50 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-cyan-100 group-hover:bg-cyan-200 transition-colors duration-300">
                  <Code2 className="h-7 w-7 text-cyan-600" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-gray-900">LLM Runners</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Discover the best runners for local LLM models
                </p>
              </Link>

              {/* LLM Web UI */}
              {/* LLM Web UI */}
              <Link
                href="/local-llm-webuis"
                className="group block rounded-xl border border-gray-200 bg-white p-8 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-100/50 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 group-hover:bg-blue-200 transition-colors duration-300">
                  <Monitor className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-gray-900">LLM Web UI</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Explore web interfaces for local LLM models
                </p>
              </Link>

              {/* LLM Runner AIO */}
              <Link
                href="/llm-runner-aio"
                className="group block rounded-xl border-2 border-indigo-300 bg-gradient-to-br from-indigo-50 to-white p-8 hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-600 group-hover:bg-indigo-700 transition-colors duration-300">
                  <Download className="h-7 w-7 text-white" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-gray-900">LLM Runner AIO</h3>
                <p className="mt-2 text-sm text-gray-600">
                  All-in-one .exe with Open WebUI, llama.cpp, Vane & SearXNG. Single file deployment.
                </p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
