"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { LogIn, LogOut, Shield, Menu, X, Sun, Moon } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/lib/theme-provider";
import { LANGS, useLang } from "@/lib/i18n";
import { usePathname } from "next/navigation";

export function Navbar() {
  const { data: session } = useSession();
  const { theme, toggleTheme } = useTheme();
  const { lang, setLang, t } = useLang();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const navLinks = [
    { href: "/llm/configs", label: t("nav.configs") },
    { href: "/llm-runner-aio", label: "LLM Runner AIO" },
    { href: "/models/rankings", label: t("nav.rankings") },
    { href: "/chat-clients", label: t("nav.agents") },
    { href: "/local-llm-runners", label: t("nav.runners") },
    { href: "/local-llm-webuis", label: t("nav.webui") },
    { href: "/multimodal", label: t("nav.multimodal") },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-mono">
          <span className="text-lg font-bold tracking-tight text-foreground">
            ▮ <span className="text-primary">ai</span>hublocal<span className="font-medium text-muted-foreground/70">.com</span>
          </span>
        </Link>

        {/* Theme Toggle Desktop */}
        <button
          onClick={toggleTheme}
          className="rounded-lg p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
          title="Toggle theme"
        >
          {theme === "light" ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </button>

        {/* Language selector — 8 languages, matches the app */}
        <div className="relative">
          <button
            onClick={() => setLangMenuOpen(!langMenuOpen)}
            className="flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 font-mono text-xs transition hover:bg-accent"
            title="Language"
          >
            <span>{LANGS.find((l) => l.code === lang)?.flag}</span>
            <span className="uppercase">{lang}</span>
          </button>
          {langMenuOpen && (
            <div className="absolute left-0 top-full z-50 mt-1 w-40 rounded-lg border border-border bg-popover p-1 shadow-xl">
              {LANGS.map((l) => (
                <button
                  key={l.code}
                  onClick={() => {
                    setLang(l.code);
                    setLangMenuOpen(false);
                  }}
                  className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition ${
                    l.code === lang ? "bg-accent font-semibold text-primary" : "text-muted-foreground hover:bg-accent/60"
                  }`}
                >
                  <span>{l.flag}</span> {l.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                isActive(link.href)
                  ? "bg-accent text-primary font-semibold"
                  : "text-muted-foreground hover:bg-accent/60 hover:text-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://ko-fi.com/vincespeed"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative ml-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <span className="flex items-center gap-1.5">
              ☕
              <span>{t("nav.support")}</span>
            </span>
          </a>
          {session && (
            <Link
              href="/profile"
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                isActive("/profile")
                  ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-semibold"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              Profile
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="rounded-lg p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 md:hidden"
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
              <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                {session.user?.name}
              </span>
              {session.user?.role === "admin" && (
                <span className="flex items-center gap-1 rounded-full bg-red-100 dark:bg-red-900/30 px-2.5 py-1 text-xs font-bold text-red-600 dark:text-red-400 ring-1 ring-red-200 dark:ring-red-800">
                  <Shield className="h-3 w-3" />
                  ADMIN
                </span>
              )}
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex items-center gap-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 hover:shadow-md cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => signIn("google", { callbackUrl: "/" })}
                className="flex items-center gap-2 rounded-lg bg-gray-900 dark:bg-gray-700 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 dark:hover:bg-gray-600 transition-all duration-200 hover:shadow-md cursor-pointer"
              >
                <LogIn className="h-4 w-4" />
                Google
              </button>
              <button
                onClick={() => signIn("github", { callbackUrl: "/" })}
                className="flex items-center gap-2 rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200 cursor-pointer"
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
        <div className="border-t border-border bg-background md:hidden">
          <div className="mx-auto max-w-7xl px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "bg-accent text-primary font-semibold"
                    : "text-muted-foreground hover:bg-accent/60 hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="grid grid-cols-4 gap-1 py-2">
              {LANGS.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  title={l.name}
                  className={`rounded-md px-2 py-2 text-center text-base ${
                    l.code === lang ? "bg-accent font-semibold text-primary" : "text-muted-foreground hover:bg-accent/60"
                  }`}
                >
                  {l.flag}
                </button>
              ))}
            </div>
            <a
              href="https://ko-fi.com/vincespeed"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground text-center hover:shadow-lg transition-all duration-300"
            >
              ☕ {t("nav.support")}
            </a>
            {session && (
              <Link
                href="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive("/profile")
                    ? "bg-accent text-primary font-semibold"
                    : "text-muted-foreground hover:bg-accent/60 hover:text-primary"
                }`}
              >
                Profile
              </Link>
            )}
            {!session && (
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => { signIn("google", { callbackUrl: "/" }); setMobileMenuOpen(false); }}
                  className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-gray-900 dark:bg-gray-700 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                >
                  <LogIn className="h-4 w-4" />
                  Google
                </button>
                <button
                  onClick={() => { signIn("github", { callbackUrl: "/" }); setMobileMenuOpen(false); }}
                  className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
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
