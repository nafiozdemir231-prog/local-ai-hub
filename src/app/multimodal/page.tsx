import Link from "next/link";
import { multimodalModels } from "@/data/multimodal-models";
import { ExternalLink } from "lucide-react";

export default function MultimodalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Multimodal</h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Discover the best apps for local AI multimedia generation
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                <th className="text-left py-4 px-5 text-xs font-bold uppercase tracking-wider text-gray-500">Rank</th>
                <th className="text-left py-4 px-5 text-xs font-bold uppercase tracking-wider text-gray-500">App Name</th>
                <th className="text-left py-4 px-5 text-xs font-bold uppercase tracking-wider text-gray-500">OS</th>
                <th className="text-left py-4 px-5 text-xs font-bold uppercase tracking-wider text-gray-500">Platform</th>
                <th className="text-left py-4 px-5 text-xs font-bold uppercase tracking-wider text-gray-500">Supported</th>
                <th className="text-left py-4 px-5 text-xs font-bold uppercase tracking-wider text-gray-500">Explanation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {multimodalModels.map((model, index) => (
                <tr key={model.name} className="transition-all duration-150 hover:bg-indigo-50/50">
                  <td className="py-4 px-5">
                    <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold ${
                      index === 0 ? "bg-yellow-100 text-yellow-700 ring-2 ring-yellow-300" :
                      index === 1 ? "bg-gray-100 text-gray-700 ring-2 ring-gray-300" :
                      index === 2 ? "bg-orange-100 text-orange-700 ring-2 ring-orange-300" :
                      "bg-gray-50 text-gray-500"
                    }`}>
                      {index + 1}
                    </span>
                  </td>
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-2">
                      <Link href={model.websiteUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-indigo-600 hover:text-indigo-800 hover:underline transition-colors">
                        {model.name}
                      </Link>
                      <ExternalLink className="h-3.5 w-3.5 text-gray-400" />
                    </div>
                  </td>
                  <td className="py-4 px-5 text-sm text-gray-700 font-mono">{model.os}</td>
                  <td className="py-4 px-5 text-sm text-gray-600">{model.platform}</td>
                  <td className="py-4 px-5 text-sm text-gray-600">{model.supported}</td>
                  <td className="py-4 px-5 text-sm text-gray-500 max-w-xs">{model.explanation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
