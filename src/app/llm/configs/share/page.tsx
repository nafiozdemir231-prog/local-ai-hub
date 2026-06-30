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
      <div className="flex-1 p-4 md:p-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Share Config</h1>
        </div>

        <p className="mt-2 text-sm text-gray-500">
          Share your local LLM configuration with the community
        </p>

        <div className="mx-auto mt-8 max-w-2xl">
          <ShareForm onSuccess={handleSuccess} />
        </div>
      </div>
    </div>
  );
}
