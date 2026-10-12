"use client";
import Link from "next/link";
import { Search, TrendingUp, MessageSquare, Image as ImageIcon, Code2, Monitor, Download, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center">
      <main className="flex-1 w-full">
        {/* Bento Grid Layout */}
        <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-4 gap-4 min-h-[600px] dark:gap-3">
          
          {/* Hero Section - 2 columns */}
          <div className="md:col-span-2 row-span-2 relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-700 dark:from-indigo-700 dark:to-purple-800 p-8 flex flex-col justify-between text-white shadow-2xl">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJub25lIi8+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iNDAiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvc3ZnPg==')] opacity-30 pointer-events-none"></div>
            
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-6 h-6 text-yellow-300" />
                <span className="text-sm font-medium text-indigo-200">Local AI Hub</span>
              </div>
              
              <h1 className="text-5xl font-bold mb-4 leading-tight">
                Discover.<br />
                Share.<br />
                Optimize.
              </h1>
              
              <p className="text-indigo-200 text-lg mb-8 max-w-md">
                Explore and share local LLM configurations. Find the perfect settings for your hardware.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/llm/configs" className="bg-white text-indigo-600 px-6 py-3 rounded-2xl font-semibold hover:bg-indigo-50 transition-all shadow-lg relative z-10 dark:bg-indigo-600 dark:text-white dark:hover:bg-indigo-700">
                Browse Configurations
              </Link>
              <Link href="/llm/configs/share" className="bg-white/30 backdrop-blur-sm text-white px-6 py-3 rounded-2xl font-semibold hover:bg-white/40 transition-all border border-white/50 relative z-10 dark:bg-indigo-800/60 dark:border-indigo-400/30">
                Share
              </Link>
            </div>
          </div>

          {/* Feature Cards - Row 1 */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-indigo-950/80 dark:to-indigo-900/60 backdrop-blur-md p-6 border border-indigo-200/50 dark:border-indigo-700/50 shadow-lg dark:shadow-none hover:shadow-2xl dark:hover:shadow-lg dark:hover:shadow-indigo-900/40 transition-all hover:-translate-y-1">
            <Search className="w-8 h-8 text-indigo-600 dark:text-indigo-300 mb-4" />
            <Link href="/llm/configs">
              <h3 className="font-bold text-indigo-900 dark:text-indigo-100 mb-2">LLM Configs</h3>
              <p className="text-sm text-indigo-700/80 dark:text-indigo-300/80">Search and filter configurations</p>
            </Link>
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950/80 dark:to-green-900/60 backdrop-blur-md p-6 border border-green-200/50 dark:border-green-700/50 shadow-lg dark:shadow-none hover:shadow-2xl dark:hover:shadow-lg dark:hover:shadow-green-900/40 transition-all hover:-translate-y-1">
            <TrendingUp className="w-8 h-8 text-green-600 dark:text-green-300 mb-4" />
            <Link href="/models/rankings">
              <h3 className="font-bold text-green-900 dark:text-green-100 mb-2">Model Rankings</h3>
              <p className="text-sm text-green-700/80 dark:text-green-300/80">Community evaluations and rankings</p>
            </Link>
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-950/80 dark:to-purple-900/60 backdrop-blur-md p-6 border border-purple-200/50 dark:border-purple-700/50 shadow-lg dark:shadow-none hover:shadow-2xl dark:hover:shadow-lg dark:hover:shadow-purple-900/40 transition-all hover:-translate-y-1">
            <MessageSquare className="w-8 h-8 text-purple-600 dark:text-purple-300 mb-4" />
            <Link href="/chat-clients">
              <h3 className="font-bold text-purple-900 dark:text-purple-100 mb-2">Chat Clients</h3>
              <p className="text-sm text-purple-700/80 dark:text-purple-300/80">Local AI chat clients</p>
            </Link>
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-50 to-amber-100 dark:from-orange-950/80 dark:to-orange-900/60 backdrop-blur-md p-6 border border-orange-200/50 dark:border-orange-700/50 shadow-lg dark:shadow-none hover:shadow-2xl dark:hover:shadow-lg dark:hover:shadow-orange-900/40 transition-all hover:-translate-y-1">
            <ImageIcon className="w-8 h-8 text-orange-600 dark:text-orange-300 mb-4" />
            <Link href="/multimodal">
              <h3 className="font-bold text-orange-900 dark:text-orange-100 mb-2">Multimodal</h3>
              <p className="text-sm text-orange-700/80 dark:text-orange-300/80">Text, image, and audio models</p>
            </Link>
          </div>

          {/* Row 2 - AIO */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 to-pink-600 dark:from-orange-600 dark:to-pink-700 p-6 text-white shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
            <Download className="w-8 h-8 mb-4" />
            <Link href="/llm-runner-aio">
              <h3 className="font-bold mb-2">LLM Runner AIO</h3>
              <p className="text-sm text-orange-100">Everything in one file</p>
            </Link>
          </div>

          {/* Row 2 - LLM Runners */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-600 dark:to-blue-700 p-6 text-white shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
            <Code2 className="w-8 h-8 mb-4" />
            <Link href="/local-llm-runners" className="block">
              <h3 className="font-bold mb-2">LLM Runners</h3>
              <p className="text-sm text-cyan-100">Best local LLM runners for your hardware</p>
            </Link>
          </div>

          {/* Row 2 - WebUIs */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-500 to-purple-600 dark:from-violet-600 dark:to-purple-700 p-6 text-white shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
            <Monitor className="w-8 h-8 mb-4" />
            <Link href="/local-llm-webuis" className="block">
              <h3 className="font-bold mb-2">Web UIs</h3>
              <p className="text-sm text-violet-100">Local LLM web interfaces for easy access</p>
            </Link>
          </div>

          {/* Row 2 - Multimodal wide card */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 dark:from-emerald-600 dark:to-teal-700 p-6 text-white shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
            <ImageIcon className="w-8 h-8 mb-4" />
            <Link href="/multimodal">
              <h3 className="font-bold mb-2">Multimodal</h3>
              <p className="text-sm text-emerald-100">Text, image, and audio models</p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
