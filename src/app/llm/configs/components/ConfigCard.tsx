import Link from "next/link";

interface ConfigCardProps {
  config: {
    id: string;
    platform: string;
    vram: string;
    ram: string;
    hardwareModel: string;
    modelName: string;
    quantization: string;
    contextSize: number;
    kvCache: string;
    ppSpeed: number;
    tgSpeed: number;
    starCount: number;
  };
}

const platformColors: Record<string, string> = {
  CUDA: "bg-blue-100 text-blue-800",
  MLX: "bg-purple-100 text-purple-800",
  ROCm: "bg-orange-100 text-orange-800",
  Vulkan: "bg-teal-100 text-teal-800",
  "Multi-GPU": "bg-pink-100 text-pink-800",
};

export function ConfigCard({ config }: ConfigCardProps) {
  const platformColor = platformColors[config.platform] || "bg-gray-100 text-gray-800";

  return (
    <Link href={`/llm/${config.id}`} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="cursor-pointer">
      {/* Platform + Model */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <span className={`inline-block rounded px-2 py-0.5 text-xs font-medium ${platformColor}`}>
            {config.platform}
          </span>
          <h3 className="mt-1 font-semibold text-gray-900">{config.modelName}</h3>
          <p className="text-sm text-gray-500">{config.hardwareModel}</p>
        </div>
      </div>

      {/* VRAM / RAM */}
      <div className="mt-3 flex gap-3 text-sm text-gray-600">
        <span className="flex items-center gap-1">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
          </svg>
          VRAM: {config.vram} GB
        </span>
        <span className="flex items-center gap-1">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          RAM: {config.ram} GB
        </span>
      </div>

      {/* Quantization / Context / KV Cache */}
      <div className="mt-3 flex flex-wrap gap-2 text-sm">
        <span className="rounded bg-gray-100 px-2 py-1 text-gray-700">{config.quantization}</span>
        <span className="rounded bg-gray-100 px-2 py-1 text-gray-700">
          Context: {config.contextSize.toLocaleString()}
        </span>
        <span className="rounded bg-gray-100 px-2 py-1 text-gray-700">KV: {config.kvCache}</span>
      </div>

      {/* Speed */}
      <div className="mt-3 flex items-center gap-4">
        <span className="text-2xl font-bold text-green-600">
          {config.tgSpeed} <span className="text-sm font-normal text-gray-500">t/s</span>
        </span>
        <span className="text-sm text-gray-500">
          PP: {config.ppSpeed} t/s
        </span>
      </div>

      {/* Star + Vote */}
      <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
        <div className="flex items-center gap-1">
          <svg className="h-4 w-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-sm font-medium text-gray-700">{config.starCount}</span>
        </div>
        <button className="rounded-md bg-gray-100 px-3 py-1 text-sm text-gray-600 hover:bg-gray-200">
          Vote
        </button>
      </div>
      </div>
    </Link>
  );
}
