"use client";

import { Download, Package, Server, Zap, Globe, Settings, Cpu, GitFork, ExternalLink, Code2, MessageSquare, Send, User } from "lucide-react";
import { useState, useEffect } from "react";

export default function LLMRunnerAIO() {
  const githubRepo = "https://github.com/nafiozdemir231-prog/llm-runner-aio/tree/main";
  const hfPage = "https://huggingface.co/vincespeed/llm-runner-aio";
  const exeDownload = "https://huggingface.co/vincespeed/llm-runner-aio/resolve/main/LLM-Runner-AIO.exe";
  const rarDownload = "https://huggingface.co/vincespeed/llm-runner-aio/resolve/main/LLM-Runner-AIO.rar";
  const nodeDownload = "https://nodejs.org/en/download";
  const pythonDownload = "https://www.python.org/ftp/python/3.11.9/python-3.11.9-amd64.exe";
  
  const features = [
    { icon: Package, title: "Single File Deployment", desc: "2.03 GB .exe with all dependencies included" },
    { icon: Server, title: "5 Core Services", desc: "Open WebUI, llama.cpp, Vane, SearXNG, Pi Coding" },
    { icon: Zap, title: "Automatic Setup", desc: "After Python and Node.js are installed, run the .exe file" },
    { icon: Cpu, title: "Pre-configured Connections", desc: "Connection settings between all applications are pre-configured by default" },
    { icon: Globe, title: "Optimized Inference", desc: "Loop issues have been resolved and optimized for maximum speed" },
    { icon: Settings, title: "Pi Coding Integration", desc: "Dedicated area to add consultant model URLs for Pi Coding" },
  ];

  const components = [
    { name: "Open WebUI", desc: "Beautiful web interface for chatting with local LLMs", license: "MIT" },
    { name: "llama.cpp", desc: "High-performance C++ inference engine", license: "MIT" },
    { name: "SearXNG", desc: "Privacy-respecting metasearch engine", license: "GPLv3" },
    { name: "Vane", desc: "AI-powered browser automation tool", license: "Open Source" },
    { name: "Pi Coding", desc: "AI coding assistant with consultant model support", license: "Open Source" },
  ];

  const steps = [
    { num: "1", title: "Download", desc: "Download LLM-Runner-AIO.exe (2.03 GB) from Hugging Face" },
    { num: "2", title: "Run", desc: "Double-click to execute — wait for required dependencies to install" },
    { num: "3", title: "Detect & Download Models", desc: "Click System Detection, then Model Download — models are auto-configured for your VRAM" },
    { num: "4", title: "Start Servers", desc: "Launch all services and access at http://localhost:3000" },
  ];

  return (
    <div className="flex flex-col flex-1 items-center min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-16">
        {/* Hero */}
        <section className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Zap className="h-4 w-4" />
            All-in-One Package
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            LLM Runner AIO
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            All Local LLM Tools — In a Single .exe File
          </p>
          
          {/* Download Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
            <a
              href={exeDownload}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-indigo-600 dark:bg-indigo-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-indigo-700 dark:hover:bg-indigo-700 shadow-lg shadow-indigo-200 dark:shadow-none transition-all duration-200 hover:-translate-y-0.5">
              <Download className="h-5 w-5" />
              Download LLM-Runner-AIO.exe (2.03 GB)
            </a>
            <a
              href={rarDownload}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 border-2 border-indigo-600 dark:border-indigo-500 px-6 py-3 rounded-xl text-base font-semibold hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all duration-200">
              <Download className="h-5 w-5" />
              Download .RAR (2.03 GB)
            </a>
          </div>
          
          {/* Required Downloads */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <a
              href={nodeDownload}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-green-600 dark:bg-green-700 text-white px-6 py-3 rounded-xl text-base font-semibold hover:bg-green-700 dark:hover:bg-green-800 shadow-lg shadow-green-200 dark:shadow-none transition-all duration-200 hover:-translate-y-0.5">
              <Code2 className="h-5 w-5" />
              Download Node.js
            </a>
            <a
              href={pythonDownload}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-blue-600 dark:bg-blue-700 text-white px-6 py-3 rounded-xl text-base font-semibold hover:bg-blue-700 dark:hover:bg-blue-800 shadow-lg shadow-blue-200 dark:shadow-none transition-all duration-200 hover:-translate-y-0.5">
              <Code2 className="h-5 w-5" />
              Download Python 3.11
            </a>
          </div>
          
          {/* Required Note */}
          <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2">
            <span className="inline-flex h-2 w-2 rounded-full bg-yellow-500"></span>
            Node.js and Python 3.11 must be installed on your system before running the app.
          </p>
          
          {/* Feedback CTA */}
          <a
            href="#feedback"
            className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors font-medium">
            <MessageSquare className="h-4 w-4" />
            Share Your Feedback
          </a>
          
          {/* GitHub & HuggingFace Links */}
          <div className="flex items-center justify-center gap-4">
            <a
              href={githubRepo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              <GitFork className="h-5 w-5" />
              GitHub
            </a>
            <span className="text-gray-300 dark:text-gray-600">|</span>
            <a
              href={hfPage}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              <ExternalLink className="h-5 w-5" />
              HuggingFace
            </a>
          </div>
        </section>

        {/* Overview */}
        <section className="mb-16">
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Overview</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              LLM Runner AIO is a comprehensive, self-contained desktop application that bundles all the tools you need 
              to run local AI models on your own hardware. No complex setup, no dependency hell — just download, run, 
              and start chatting with AI locally.
            </p>
          </div>
        </section>

        {/* Included */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">What is Included</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {components.map((c) => (
              <div key={c.name} className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 hover:shadow-lg dark:hover:shadow-none hover:-translate-y-1 transition-all duration-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{c.name}</h3>
                  <span className="text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full">{c.license}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{c.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features Grid */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 hover:shadow-lg dark:hover:shadow-none hover:-translate-y-1 transition-all duration-200">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/30 mb-4">
                  <f.icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{f.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Services List */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">How It Works</h2>

          <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-8">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-indigo-600 mt-2 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300"><strong>llama.cpp</strong> runs the AI model inference engine at <code className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">http://localhost:1234</code></span>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-indigo-600 mt-2 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300"><strong>Open WebUI</strong> provides the chat interface at <code className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">http://localhost:3000</code></span>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-indigo-600 mt-2 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300"><strong>SearXNG</strong> enables local web search at <code className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">http://localhost:8080</code></span>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-indigo-600 mt-2 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300"><strong>Vane</strong> handles browser automation at <code className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">http://localhost:3001</code></span>
              </li>
            </ul>
          </div>
        </section>

        {/* Installation Steps */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">Installation</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((s) => (
              <div key={s.num} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-600 dark:bg-indigo-600 text-white text-2xl font-bold mb-4">
                  {s.num}
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{s.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* System Requirements */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">System Requirements</h2>
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="py-3 px-4 font-semibold text-gray-900 dark:text-white">Requirement</th>
                    <th className="py-3 px-4 font-semibold text-gray-900 dark:text-white">Minimum</th>
                    <th className="py-3 px-4 font-semibold text-gray-900 dark:text-white">Recommended</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">OS</td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">Windows 10/11</td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">Windows 11</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">RAM</td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">8 GB</td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">16 GB+</td>
                  </tr>

                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">VRAM</td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">N/A</td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">4 GB+</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">Python</td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">3.11 (required)</td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">3.11 (required)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              <strong>Note:</strong> Python 3.11 and Node.js must be installed on your system before running the app.
            </p>
          </div>
        </section>

        {/* Data Privacy */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">Data Privacy</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-gray-700 dark:text-gray-300">No Cloud Dependencies — Everything runs locally</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-gray-700 dark:text-gray-300">No Telemetry — No data is sent anywhere</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-gray-700 dark:text-gray-300">Local Database — Chat history stored only on your machine</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-gray-700 dark:text-gray-300">No Account Required — No registration or login needed</span>
                </li>
              </ul>
            </div>
            <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">Supported Languages</h3>
              <div className="grid grid-cols-2 gap-2">
                <span className="text-gray-700 dark:text-gray-300">🇹🇷 Turkish</span>
                <span className="text-gray-700 dark:text-gray-300">🇬🇧 English</span>
                <span className="text-gray-700 dark:text-gray-300">🇪🇸 Spanish</span>
                <span className="text-gray-700 dark:text-gray-300">🇩🇪 German</span>
                <span className="text-gray-700 dark:text-gray-300">🇫🇷 French</span>
                <span className="text-gray-700 dark:text-gray-300">🇵🇹 Portuguese</span>
                <span className="text-gray-700 dark:text-gray-300">🇨🇳 Chinese</span>
                <span className="text-gray-700 dark:text-gray-300">🇯🇵 Japanese</span>
              </div>
            </div>
          </div>
        </section>

        {/* Credits */}
        <section className="mb-16">
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Credits</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              This project would not be possible without the incredible work of:
            </p>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>• <strong>Georgi Gerganov</strong> — llama.cpp</li>
              <li>• <strong>Open WebUI Team</strong> — Open WebUI</li>
              <li>• <strong>SearXNG Contributors</strong> — SearXNG</li>
              <li>• <strong>All open-source contributors</strong> who make local AI accessible</li>
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Ready to Get Started?</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Download LLM Runner AIO and start running local LLMs instantly.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={exeDownload}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-indigo-600 dark:bg-indigo-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-indigo-700 dark:hover:bg-indigo-700 shadow-lg shadow-indigo-200 dark:shadow-none transition-all duration-200 hover:-translate-y-0.5">
              <Download className="h-5 w-5" />
              Download .exe (2.03 GB)
            </a>
            <a
              href={rarDownload}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 border-2 border-indigo-600 dark:border-indigo-500 px-6 py-3 rounded-xl text-base font-semibold hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all duration-200">
              <Download className="h-5 w-5" />
              Download .RAR (2.03 GB)
            </a>
          </div>
        </section>

        {/* Feedback Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
            <MessageSquare className="inline-block h-6 w-6 mr-2" />
            Share Your Feedback
          </h2>
          
          <FeedbackForm />
        </section>
      </main>
    </div>
  );
}

function FeedbackForm() {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/runner-feedback")
      .then((res) => res.json())
      .then((data) => {
        setFeedbacks(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setSubmitting(true);
    setSuccess(false);
    setError(false);

    try {
      await fetch("/api/runner-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name || "Anonymous", content }),
      });
      setContent("");
      setName("");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      
      const res = await fetch("/api/runner-feedback");
      const data = await res.json();
      setFeedbacks(data);
    } catch {
      setError(true);
      setTimeout(() => setError(false), 3000);
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Form */}
      <form onSubmit={handleSubmit} className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Name <span className="text-gray-400">(optional)</span>
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Anonymous"
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Feedback <span className="text-red-500">*</span>
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your experience with LLM Runner AIO..."
            rows={4}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none"
            required
          />
        </div>

        <button
          type="submit"
          disabled={submitting || !content.trim()}
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 disabled:cursor-not-allowed cursor-pointer">
          <Send className="h-4 w-4" />
          {submitting ? "Sending..." : "Submit Feedback"}
        </button>

        {success && (
          <p className="text-sm text-green-600 dark:text-green-400 text-center">✓ Thank you! Your feedback has been submitted.</p>
        )}
        {error && (
          <p className="text-sm text-red-600 dark:text-red-400 text-center">✗ Something went wrong. Please try again.</p>
        )}
      </form>

      {/* Feedback List */}
      <div className="space-y-4">
        {loading ? (
          <p className="text-center text-gray-500 dark:text-gray-400">Loading feedback...</p>
        ) : feedbacks.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">No feedback yet. Be the first to share!</p>
        ) : (
          feedbacks.map((fb) => (
            <div key={fb.id} className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900 dark:text-white">{fb.name}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">{formatDate(fb.createdAt)}</span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{fb.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
