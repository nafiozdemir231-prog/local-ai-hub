"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { UI_CORE, UI_SHARE, UI_NAV } from "./ui-core";
import { UI_AIO1 } from "./ui-aio1";
import { UI_AIO2A } from "./ui-aio2a";
import { UI_AIO2B } from "./ui-aio2b";
import { UI_AIO2C } from "./ui-aio2c";
import { UI_AIO3 } from "./ui-aio3";
import { UI_AIO4 } from "./ui-aio4";
import { UI_AIO5 } from "./ui-aio5";

export const LANGS = [
  { code: "en", flag: "🇬🇧", name: "English" },
  { code: "tr", flag: "🇹🇷", name: "Türkçe" },
  { code: "es", flag: "🇪🇸", name: "Español" },
  { code: "de", flag: "🇩🇪", name: "Deutsch" },
  { code: "fr", flag: "🇫🇷", name: "Français" },
  { code: "pt", flag: "🇵🇹", name: "Português" },
  { code: "zh", flag: "🇨🇳", name: "中文" },
  { code: "ja", flag: "🇯🇵", name: "日本語" },
] as const;

export type Lang = (typeof LANGS)[number]["code"];

// Site chrome + home copy dictionaries. Missing keys fall back to English.
// Model names, product names and data tables intentionally stay English.
const DICT: Record<string, Partial<Record<Lang, string>>> = {
  "nav.configs": { en: "LLM Configs", tr: "LLM Ayarları", es: "Config. LLM", de: "LLM-Konfig.", fr: "Config. LLM", pt: "Config. LLM", zh: "LLM 配置", ja: "LLM設定" },
  "nav.rankings": { en: "Rankings", tr: "Sıralamalar", es: "Clasificaciones", de: "Ranglisten", fr: "Classements", pt: "Classificações", zh: "排名", ja: "ランキング" },
  "nav.agents": { en: "Coding Agents", tr: "Kodlama Ajanları", es: "Agentes de código", de: "Coding-Agenten", fr: "Agents de code", pt: "Agentes de código", zh: "编码代理", ja: "コーディングエージェント" },
  "nav.runners": { en: "LLM Runners", tr: "LLM Çalıştırıcılar", es: "Ejecutores LLM", de: "LLM-Runner", fr: "Exécuteurs LLM", pt: "Executores LLM", zh: "LLM 运行器", ja: "LLMランナー" },
  "nav.webui": { en: "LLM Web UI", tr: "LLM Web Arayüzü", es: "Web UI LLM", de: "LLM Web-UI", fr: "Web UI LLM", pt: "Web UI LLM", zh: "LLM 网页界面", ja: "LLM Web UI" },
  "nav.multimodal": { en: "Multimodal", tr: "Çoklu Mod", es: "Multimodal", de: "Multimodal", fr: "Multimodal", pt: "Multimodal", zh: "多模态", ja: "マルチモーダル" },
  "nav.support": { en: "Support", tr: "Destek", es: "Apoyar", de: "Unterstützen", fr: "Soutenir", pt: "Apoiar", zh: "支持", ja: "サポート" },

  "home.kicker": { en: "// your local AI station", tr: "// yerel yapay zekâ istasyonun", es: "// tu estación local de IA", de: "// deine lokale KI-Station", fr: "// votre station IA locale", pt: "// sua estação local de IA", zh: "// 你的本地 AI 工作站", ja: "// あなたのローカルAIステーション" },
  "home.h1a": { en: "No servers needed.", tr: "Sunucu gerekmez.", es: "No se necesitan servidores.", de: "Keine Server nötig.", fr: "Aucun serveur nécessaire.", pt: "Nenhum servidor necessário.", zh: "无需服务器。", ja: "サーバー不要。" },
  "home.h1bA": { en: "A ", tr: "Bir ", es: "Un ", de: "Ein ", fr: "Un ", pt: "Um ", zh: "", ja: "" },
  "home.h1bB": { en: " on your own PC.", tr: " kendi PC'nde.", es: " en tu propio PC.", de: " auf deinem eigenen PC.", fr: " sur ton propre PC.", pt: " no seu próprio PC.", zh: "，就在你自己的电脑上。", ja: " をあなたのPCで。" },
  "home.intro": {
    en: "LLM Runner AIO installs Open WebUI, llama.cpp, SearXNG and the Strata gateway for you. Hardware detected, models downloaded, ports opened — automatically.",
    tr: "LLM Runner AIO; Open WebUI, llama.cpp, SearXNG ve Strata geçidini senin için kurar. Donanım algılanır, modeller indirilir, portlar açılır — otomatik olarak.",
    es: "LLM Runner AIO instala Open WebUI, llama.cpp, SearXNG y la pasarela Strata por ti. Hardware detectado, modelos descargados, puertos abiertos — automáticamente.",
    de: "LLM Runner AIO installiert Open WebUI, llama.cpp, SearXNG und das Strata-Gateway für dich. Hardware erkannt, Modelle geladen, Ports geöffnet — automatisch.",
    fr: "LLM Runner AIO installe Open WebUI, llama.cpp, SearXNG et la passerelle Strata pour vous. Matériel détecté, modèles téléchargés, ports ouverts — automatiquement.",
    pt: "LLM Runner AIO instala Open WebUI, llama.cpp, SearXNG e o gateway Strata para você. Hardware detectado, modelos baixados, portas abertas — automaticamente.",
    zh: "LLM Runner AIO 为你自动安装 Open WebUI、llama.cpp、SearXNG 和 Strata 网关。硬件检测、模型下载、端口开启——全自动完成。",
    ja: "LLM Runner AIO は Open WebUI、llama.cpp、SearXNG、Strata ゲートウェイを自動的にインストールします。ハードウェア検出、モデルダウンロード、ポート開放 — すべて自動。",
  },
  "home.ctaRankings": { en: "121 model rankings →", tr: "121 model sıralaması →", es: "Ranking de 121 modelos →", de: "121 Modell-Ranglisten →", fr: "Classement de 121 modèles →", pt: "Ranking de 121 modelos →", zh: "121 模型排名 →", ja: "121モデルランキング →" },
  "home.statModels": { en: "ranked models", tr: "sıralanmış model", es: "modelos clasificados", de: "gelistete Modelle", fr: "modèles classés", pt: "modelos ranqueados", zh: "排名模型", ja: "ランキングモデル" },
  "home.statVersion": { en: "AIO version", tr: "AIO sürümü", es: "versión AIO", de: "AIO-Version", fr: "version AIO", pt: "versão AIO", zh: "AIO 版本", ja: "AIOバージョン" },
  "home.statServices": { en: "bundled services", tr: "paketli servis", es: "servicios incluidos", de: "gebündelte Dienste", fr: "services inclus", pt: "serviços incluídos", zh: "内置服务", ja: "同梱サービス" },
  "home.statOpen": { en: "open source", tr: "açık kaynak", es: "código abierto", de: "Open Source", fr: "open source", pt: "código aberto", zh: "开源", ja: "オープンソース" },
  "home.included": { en: "// what's included", tr: "// neler dahil", es: "// qué incluye", de: "// was enthalten ist", fr: "// ce qui est inclus", pt: "// o que está incluído", zh: "// 包含内容", ja: "// 内容物" },
  "footer.tagline": { en: "no cloud · no telemetry · MIT", tr: "bulut yok · telemetri yok · MIT", es: "sin nube · sin telemetría · MIT", de: "keine Cloud · keine Telemetrie · MIT", fr: "sans cloud · sans télémétrie · MIT", pt: "sem nuvem · sem telemetria · MIT", zh: "无云端 · 无遥测 · MIT", ja: "クラウドなし · テレメトリなし · MIT" },
  ...UI_CORE,
  ...UI_SHARE,
  ...UI_NAV,
  ...UI_AIO1,
  ...UI_AIO2A,
  ...UI_AIO2B,
  ...UI_AIO2C,
  ...UI_AIO3,
  ...UI_AIO4,
  ...UI_AIO5,
};

type LangCtx = { lang: Lang; setLang: (l: Lang) => void; t: (key: string) => string };
const Ctx = createContext<LangCtx>({ lang: "en", setLang: () => {}, t: (k) => k });

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("lang") as Lang | null;
      if (saved && LANGS.some((l) => l.code === saved)) setLangState(saved);
    } catch {}
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try { localStorage.setItem("lang", l); } catch {}
  }, []);

  const t = useCallback(
    (key: string) => DICT[key]?.[lang] ?? DICT[key]?.en ?? key,
    [lang],
  );

  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
}

export function useLang() {
  return useContext(Ctx);
}
