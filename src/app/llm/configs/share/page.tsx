"use client";

import { ShareForm } from "../components/ShareForm";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function ShareConfigPage() {
  const router = useRouter();

  const handleSuccess = () => {
    router.push("/llm/configs");
  };

  return (
    <div className="flex min-h-screen w-full">
      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 bg-white dark:bg-gray-900 min-h-screen">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Share Config</h1>
        </div>

        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Share your local LLM configuration with the community
        </p>

        <div className="mx-auto mt-8 max-w-2xl">
          <ShareForm onSuccess={handleSuccess} />
        </div>
      </div>
    </div>
  );
}
