"use client";

import { modelRankings } from "@/data/model-rankings";
import { TrendingUp, Zap, DollarSign } from "lucide-react";

function ModelRow({ model, index }: { model: { name: string; creator: string; intelligence: number; parameters: string; contextWindow: string; price: string; speed: string }; index: number }) {
  const medalColors = {
    0: "bg-gradient-to-br from-yellow-400 to-amber-500 text-white shadow-lg shadow-yellow-200",
    1: "bg-gradient-to-br from-gray-300 to-gray-400 text-white shadow-lg shadow-gray-200",
    2: "bg-gradient-to-br from-amber-600 to-orange-700 text-white shadow-lg shadow-amber-200",
  };

  return (
    <tr className="border-b border-gray-100 hover:bg-indigo-50/50 transition-all duration-150">
      <td className="py-4 px-5">
        <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold ${
          index < 3 ? medalColors[index as keyof typeof medalColors] : "bg-gray-100 text-gray-500"
        }`}>
          {index < 3 ? ["🥇", "🥈", "🥉"][index] : index + 1}
        </span>
      </td>
      <td className="py-4 px-5">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-900">{model.name}</span>
          {index === 0 && <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-medium">Top 1</span>}
        </div>
      </td>
      <td className="py-4 px-5">
        <span className="inline-flex items-center gap-1 text-sm text-gray-600">
          {model.creator}
        </span>
      </td>
      <td className="py-4 px-5">
        <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-800 px-3 py-1.5 rounded-full text-sm font-bold">
          <TrendingUp className="h-3.5 w-3.5" />
          {model.intelligence}
        </span>
      </td>
      <td className="py-4 px-5 text-sm text-gray-600 font-mono">{model.parameters}</td>
      <td className="py-4 px-5 text-sm text-gray-600 font-mono">{model.contextWindow}</td>
      <td className="py-4 px-5">
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-green-600">
          <DollarSign className="h-3.5 w-3.5" />
          {model.price}
        </span>
      </td>
      <td className="py-4 px-5">
        <span className="inline-flex items-center gap-1 text-sm text-gray-700 font-mono">
          <Zap className="h-3.5 w-3.5 text-amber-500" />
          {model.speed}
        </span>
      </td>
    </tr>
  );
}

export default function ModelRankingsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Model Rankings</h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            See the best-performing models based on Artificial Analysis benchmarks
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                <th className="text-left py-4 px-5 text-xs font-bold uppercase tracking-wider text-gray-500">Rank</th>
                <th className="text-left py-4 px-5 text-xs font-bold uppercase tracking-wider text-gray-500">Model Name</th>
                <th className="text-left py-4 px-5 text-xs font-bold uppercase tracking-wider text-gray-500">Model Creator</th>
                <th className="text-left py-4 px-5 text-xs font-bold uppercase tracking-wider text-gray-500">Intelligence</th>
                <th className="text-left py-4 px-5 text-xs font-bold uppercase tracking-wider text-gray-500">Parameters</th>
                <th className="text-left py-4 px-5 text-xs font-bold uppercase tracking-wider text-gray-500">Context Window</th>
                <th className="text-left py-4 px-5 text-xs font-bold uppercase tracking-wider text-gray-500">Price</th>
                <th className="text-left py-4 px-5 text-xs font-bold uppercase tracking-wider text-gray-500">Output Speed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
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
