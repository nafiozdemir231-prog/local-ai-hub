"use client";

import { modelRankings, type ModelRanking } from "@/data/model-rankings";
import { TrendingUp, Zap, DollarSign, BookOpen } from "lucide-react";

function ModelRow({ model, index }: { model: ModelRanking; index: number }) {
  const medalColors = {
    0: "bg-gradient-to-br from-yellow-400 to-amber-500 text-white shadow-lg shadow-yellow-200",
    1: "bg-gradient-to-br from-gray-300 to-gray-400 text-white shadow-lg shadow-gray-200",
    2: "bg-gradient-to-br from-amber-600 to-orange-700 text-white shadow-lg shadow-amber-200",
  };

  return (
    <tr className="border-b border-gray-100 dark:border-gray-700 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/20 transition-all duration-150">
      <td className="py-4 px-5">
        <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold ${
          index < 3 ? medalColors[index as keyof typeof medalColors] : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
        }`}>
          {index < 3 ? ["🥇", "🥈", "🥉"][index] : index + 1}
        </span>
      </td>
      <td className="py-4 px-5">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-900 dark:text-white">{model.name}</span>
          {index === 0 && <span className="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 px-2 py-0.5 rounded-full font-medium">Top 1</span>}
        </div>
      </td>
      <td className="py-4 px-5">
        <span className="inline-flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
          {model.creator}
        </span>
      </td>
      <td className="py-4 px-5">
        <span className="inline-flex items-center gap-1.5 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-3 py-1.5 rounded-full text-sm font-bold">
          <TrendingUp className="h-3.5 w-3.5" />
          {model.intelligence}
        </span>
      </td>
      <td className="py-4 px-5 text-sm text-gray-600 dark:text-gray-400 font-mono">{model.parameters}</td>
      <td className="py-4 px-5 text-sm text-gray-600 dark:text-gray-400 font-mono">{model.contextWindow}</td>
      <td className="py-4 px-5">
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-green-600 dark:text-green-400">
          <DollarSign className="h-3.5 w-3.5" />
          {model.price}
        </span>
      </td>
      <td className="py-4 px-5">
        <span className="inline-flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300 font-mono">
          <Zap className="h-3.5 w-3.5 text-amber-500" />
          {model.speed}
        </span>
      </td>
      <td className="py-4 px-5">
        {model.weights ? (
          <span className="inline-flex items-center gap-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-3 py-1.5 rounded-full text-xs font-medium">
            <BookOpen className="h-3.5 w-3.5" />
            Open Weights
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 bg-gray-100 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 px-3 py-1.5 rounded-full text-xs font-medium">
            Closed
          </span>
        )}
      </td>
    </tr>
  );
}

export default function ModelRankingsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">Model Rankings</h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            See the best-performing models based on Artificial Analysis benchmarks
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
                <th className="text-left py-4 px-5 text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-200">Rank</th>
                <th className="text-left py-4 px-5 text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-200">Model Name</th>
                <th className="text-left py-4 px-5 text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-200">Model Creator</th>
                <th className="text-left py-4 px-5 text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-200">Intelligence</th>
                <th className="text-left py-4 px-5 text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-200">Parameters</th>
                <th className="text-left py-4 px-5 text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-200">Context Window</th>
                <th className="text-left py-4 px-5 text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-200">Price</th>
                <th className="text-left py-4 px-5 text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-200">Output Speed</th>
                <th className="text-left py-4 px-5 text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-200">Weights</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {modelRankings.map((model, index) => (
                <ModelRow key={model.name} model={model} index={index} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
