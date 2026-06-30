"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { LogIn, LogOut, Shield, Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/llm/configs", label: "LLM Configs" },
    { href: "/llm-runner-aio", label: "LLM Runner AIO" },
    { href: "/models/rankings", label: "Rankings" },
    { href: "/chat-clients", label: "Coding Agents" },
    { href: "/local-llm-runners", label: "LLM Runners" },
    { href: "/local-llm-webuis", label: "LLM Web UI" },
    { href: "/multimodal", label: "Multimodal" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
            Local AI Hub
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://ko-fi.com/vincespeed"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative ml-2 rounded-lg bg-gradient-to-r from-orange-500 to-pink-500 px-4 py-2 text-sm font-bold text-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <span className="flex items-center gap-1.5">
              ☕
              <span>Support</span>
            </span>
          </a>
          {session && (
            <Link
              href="/profile"
              className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200"
            >
              Profile
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 md:hidden"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {/* Auth */}
        <div className="hidden items-center gap-2 md:flex">
          {session ? (
            <div className="flex items-center gap-3">
              {session.user?.image && (
                <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden">
                  <img src={session.user.image} alt={session.user.name || "User"} className="h-full w-full object-cover" />
                </div>
              )}
              <span className="text-sm text-gray-700 font-medium">
                {session.user?.name}
              </span>
              {session.user?.role === "admin" && (
                <span className="flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-1 text-xs font-bold text-red-600 ring-1 ring-red-200">
                  <Shield className="h-3 w-3" />
                  ADMIN
                </span>
              )}
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => signIn("google", { callbackUrl: "/" })}
                className="flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition-all duration-200 hover:shadow-md"
              >
                <LogIn className="h-4 w-4" />
                Google
              </button>
              <button
                onClick={() => signIn("github", { callbackUrl: "/" })}
                className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
              >
                <LogIn className="h-4 w-4" />
                GitHub
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-gray-200 bg-white md:hidden">
          <div className="mx-auto max-w-7xl px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://ko-fi.com/vincespeed"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg bg-gradient-to-r from-orange-500 to-pink-500 px-4 py-2.5 text-sm font-bold text-white text-center hover:shadow-lg transition-all duration-300"
            >
              ☕ Support
            </a>
            {session && (
              <Link
                href="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
              >
                Profile
              </Link>
            )}
            {!session && (
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => { signIn("google", { callbackUrl: "/" }); setMobileMenuOpen(false); }}
                  className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
                >
                  <LogIn className="h-4 w-4" />
                  Google
                </button>
                <button
                  onClick={() => { signIn("github", { callbackUrl: "/" }); setMobileMenuOpen(false); }}
                  className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <LogIn className="h-4 w-4" />
                  GitHub
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
