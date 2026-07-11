import Link from "next/link";
import { localLLMRunners } from "@/data/local-llm-runners";
import { ExternalLink } from "lucide-react";

export default function LocalLLMRunnersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">LLM Runners</h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Discover the best tools for running local LLMs on your own hardware
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
                <th className="text-left py-4 px-5 text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-200">Rank</th>
                <th className="text-left py-4 px-5 text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-200">App Name</th>
                <th className="text-left py-4 px-5 text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-200">OS</th>
                <th className="text-left py-4 px-5 text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-200">Platform</th>
                <th className="text-left py-4 px-5 text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-200">Supported</th>
                <th className="text-left py-4 px-5 text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-200">Explanation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {localLLMRunners.map((runner, index) => (
                <tr key={runner.name} className="transition-all duration-150 hover:bg-indigo-50/50">
                  <td className="py-4 px-5">
                    <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold ${
                      index === 0 ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 ring-2 ring-yellow-300 dark:ring-yellow-700" :
                      index === 1 ? "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 ring-2 ring-gray-300 dark:ring-gray-600" :
                      index === 2 ? "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 ring-2 ring-orange-300 dark:ring-orange-700" :
                      "bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                    }`}>
                      {index + 1}
                    </span>
                  </td>
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-2">
                      <Link href={runner.websiteUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 hover:underline transition-colors">
                        {runner.name}
                      </Link>
                      <ExternalLink className="h-3.5 w-3.5 text-gray-400 dark:text-gray-500" />
                    </div>
                  </td>
                  <td className="py-4 px-5 text-sm text-gray-700 dark:text-gray-300 font-mono">{runner.os}</td>
                  <td className="py-4 px-5 text-sm text-gray-600 dark:text-gray-400">{runner.platform}</td>
                  <td className="py-4 px-5 text-sm text-gray-600 dark:text-gray-400">{runner.supported}</td>
                  <td className="py-4 px-5 text-sm text-gray-500 dark:text-gray-400 max-w-xs">{runner.explanation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
