# Changes Log

## 2026-07-13 - LLM Configs Filter Panel Horizontal Layout

### Reason
User requested moving the filter panel from a vertical sidebar to a horizontal layout above the "Sort By:" options on the LLM Configs page (`/llm/configs`).

### Files Modified

#### `src/app/llm/configs/page.tsx`
- **Removed:** Desktop sidebar `<aside>` element entirely
- **Removed:** Mobile filter button (`<details>` toggle)
- **Added:** `<FilterPanel />` component directly below header and above Sort Options buttons
- **Result:** Filters now flow inline horizontally in the main content area

#### `src/app/llm/configs/components/FilterPanel.tsx`
- **Converted:** Vertical stack (`space-y-6`) → Horizontal grid (`lg:grid lg:grid-cols-7 gap-4`)
- **Applied:** `className="lg:col-span-1"` to each section for narrow column width
- **Updated labels:** "Hardware Model" → "Hardware", "Model Name" → "Model", "LLM Runner" → "Runner"
- **Updated inputs:** Smaller placeholder text ("Search..." instead of full descriptions), smaller font/text sizes
- **Sections in order:** Hardware | Model | Runner | Platform | VRAM (GB) | RAM (GB) | Quantization

### Result
Page displays as:
```
Hardware     Model         Runner        Platform     VRAM (GB)    RAM (GB)    Quantization
Search...    Search...     Search...
```
All filters visible horizontally above Sort By (Votes / PP Speed / TG Speed).

### Notes
- No GitHub push performed (user instructed local-only changes)
- Local dev server confirmed working on port 3005

## 2026-08-23 - Google Search Console Verification File
- **File:** `public/google2c508fadb43db832.html` (new)
- **Reason:** User verifying domain ownership in Google Search Console (HTML file method). File copied byte-exact from `tasks/google/` download.
- **Commit:** `561d225` — pushed, deployed to production. Verified live: `GET /google2c508fadb43db832.html` → 200 with exact content.

## 2026-08-24 - LLM Runner AIO Page Content Update
- **File:** `src/app/llm-runner-aio/page.tsx`
- **Reason:** Sync page with latest README: Wan2GP (optional video/image gen) in components/features/how-it-works/system requirements, new "Configured Model Presets" table (VRAM/RAM/model matrix), GitHub links on all core components, `.RAR` → `run.bat` install flow, refreshed feature list, Vane description corrected (web search integration, not browser automation).
- **Commit:** `9b73343` — pushed, deployed, verified live (Chrome + raw HTML).

## 2026-08-24 - Full SSR Restoration (Critical SEO Fix)
- **Files:** `src/lib/theme-provider.tsx`, `src/app/layout.tsx`
- **Reason:** ThemeProvider rendered `{mounted ? children : null}` — every page's prerendered HTML was an empty shell (~11 KB). Browsers showed full UI (JS hydration) but non-JS fetchers (curl, SearXNG web-reader, some AI crawlers) received EMPTY pages. This was the true root cause behind "AI models using searxng cannot read aihublocal.com". Removed the mounted gate (children always render) and added a pre-paint inline script in layout to apply saved/system dark theme without flash.
- **Result:** llm-runner-aio.html 11 KB → 59 KB, index.html 10 KB → 28 KB, models/rankings.html 11 KB → 257 KB (all 79 models now in raw HTML). Verified live via curl (no JS): Wan2GP present, rankings 257 KB.
- **Commit:** `c5b7af9` — pushed, deployed, verified live.

## 2026-08-24 - Post-Fix Readability Test Results
- `web_reader_read_url` (previously failing with "Sayfa okunamadı"): NOW SUCCESS
  - `/` → full hero + bento grid text
  - `/models/rankings` → complete 79-model table extracted
  - `/llm-runner-aio` → full page incl. Wan2GP, presets table, run.bat flow
- `web_reader_search_web` for "aihublocal.com" → still not surfaced (aggregator index lag; expected, sitemap submitted 2026-08-23). Re-test in a few days.

## 2026-08-25 - LLM Runner AIO Page Refresh (pre-v1.6 content)
| File | Change | Reason |
|------|--------|--------|
| src/app/llm-runner-aio/page.tsx | 4GB/6GB 16GB RAM preset rows: added MiniCPM5-2B + Spark-X2.5-4B | New INI entries |
| src/app/llm-runner-aio/page.tsx | 16GB VRAM / 32GB RAM row: qwen3.8-27B marked "(DFlash2 draft)" | Speculative decoding in this preset only |
| src/app/llm-runner-aio/page.tsx | "Every model ships with chat, vision and coding profiles" -> "Most models ..." + exception list | Ling-3.0-tiny/MiniCPM5-2B/Spark-X2.5-4B are single-profile |
| src/app/llm-runner-aio/page.tsx | New feature card: "Speculative Decoding" (Gauge icon) | DFlash2 draft model highlight |
| src/app/llm-runner-aio/page.tsx | GUI Model Manager desc: "+ including draft/speculative URLs" | Manager now handles draft URLs |
| src/app/llm-runner-aio/page.tsx | SearXNG desc: "+ Yandex engine included" | New engine |
| src/app/llm-runner-aio/page.tsx | "2 GB" -> "2.29 GB" in feature 1 | Consistency with download badges |
- NOT done (waiting): v1.6 download URLs + "Latest: v1.6" badge — v1.6 artifacts not yet on HuggingFace (404 verified). Will switch when user uploads.
- Commit: `6124f9f` — pushed to origin/main

## 2026-08-25 - LLM Runner AIO v1.6 Release Links
| File | Change | Reason |
|------|--------|--------|
| src/app/llm-runner-aio/page.tsx | exe/rar URLs v1.5 -> v1.6 | User uploaded v1.6 artifacts to HuggingFace (verified 302) |
| src/app/llm-runner-aio/page.tsx | Added green "Latest: v1.6" badge next to hero pill | Version trust signal |
| src/app/llm-runner-aio/page.tsx | Size labels 2.29 GB -> 2.28 GB (6 places) | Actual v1.6 file size: 2,450,307,092 B = 2.28 GiB |
- Commit: `a65fd5c` — pushed to origin/main

## 2026-08-25 - Auto-Version Title for LLM Runner AIO Page
| File | Change | Reason |
|------|--------|--------|
| src/app/llm-runner-aio/page.tsx | `appVersion` derived from exe URL via regex (`-(v[\d.]+)\.exe$`) | Single source of truth = download link |
| src/app/llm-runner-aio/page.tsx | H1 renders "LLM Runner AIO v1.6" | Version visible in title |
| src/app/llm-runner-aio/page.tsx | "Latest:" badge uses derived version (hidden if missing) | Stays in sync automatically |
- Workflow: future releases only need the exe/rar URL update — title & badge follow.
- Commit: `3fd1703` — pushed to origin/main

## 2026-08-25 - Fix: Version Not Rendered (Regex Bug)
| File | Change | Reason |
|------|--------|--------|
| src/app/llm-runner-aio/page.tsx | Regex `-(v[\d.]+)\.exe$` -> `AIO(v[\d.]+)\.exe$` | Filename is `AIOv1.6` (no dash before version); old regex yielded empty string |
- Verified live via MCP web-reader: H1 = "LLM Runner AIO v1.6", badge = "Latest: v1.6"
- Commit: `23920f8` — pushed to origin/main

## 2026-10-09 - LLM Runner AIO v2.0 Page Update (from tasks/README.md)
| File | Change | Reason |
|------|--------|--------|
| src/app/llm-runner-aio/page.tsx | FIXED: rarDownload pointed to .exe file (user bat bug) -> .rar | Broken download link |
| src/app/llm-runner-aio/page.tsx | New component card + feature card + How It Works entry (port 1235) + System Reqs row (48 GB RAM/12 GB VRAM, ~58-84 GB disk) + note: Strata | v2.0 adds Strata multi-model gateway |
| src/app/llm-runner-aio/page.tsx | Open WebUI desc: loadable functions (EasySearch, exports, thinking toggle) | README v2.0 detail |
| src/app/llm-runner-aio/page.tsx | Wan2GP: GPU generation packages + Deepy Remote LLM mode | README v2.0 detail |
| src/app/llm-runner-aio/page.tsx | GUI Model Manager: model_urls.json (main/MMProj/draft), URL health checks | README v2.0 detail |
| src/app/llm-runner-aio/page.tsx | Smart Model Downloader: includes speculative draft models | README v2.0 detail |
| src/app/llm-runner-aio/page.tsx | Speculative Decoding: 16 GB preset wording, draft management | README v2.0 detail |
| src/app/llm-runner-aio/page.tsx | Size labels 2.28 -> 2.26 GB (v2.0 files: 2,424,598,384 B = 2.26 GiB) | Actual v2.0 size |
- v2.0 HF artifacts verified live (HTTP 200). Title/badge auto-switch to v2.0 via derived version regex.
- Commit: `6ff34e8` — pushed to origin/main

## 2026-10-11 - LLM Runner AIO v2.1 screenshot + labels
| File | Change | Reason |
|------|--------|--------|
| public/2.png | Replaced with new Server Management screenshot (1568x924, shows Strata Gateway sidebar + startup options) | User updated app UI |
| src/app/llm-runner-aio/page.tsx | Size labels 2.26 -> 2.28 GB (v2.1 exe: 2,449,395,116 B = 2.28 GiB) | Actual v2.1 size |
- Bat already switched download URLs to v2.1 (commit 71e496a); HF v2.1 files verified live (HTTP 200). Title/badge auto-derive "v2.1".
- Commit pushed; note: app sidebar now shows "Wan2GP / ComfyUI" - page copy does not mention ComfyUI yet (pending user decision).

## 2026-10-11 - Strata added to LLM Runners tab
| File | Change | Reason |
|------|--------|--------|
| src/data/local-llm-runners.ts | Added "Strata" row (after ExLlamaV2, before llama.cpp forks group): Windows/Linux, CUDA/ROCm, LLM+Vision+MCP+API, github.com/Niko1221/Strata | User request; facts verified from Strata repo README (125B Qwen3.8-Flash-Next MoE, 12 GB+ VRAM, 32 GB+ RAM, OpenAI/Anthropic localhost API, MCP server, multi-GPU) |

## 2026-10-11 - Obsidian homepage port reverted + multi-page HTML mockup
| File | Change | Reason |
|------|--------|--------|
| src/app/page.tsx | Reverted obsidian redesign (commit a6561d7) — production back to bento | User wanted HTML preview FIRST, not live change |
| tasks/arayuz/tasarim2-obsidian/ | New multi-page mockup site: 8 pages + obsidian.css + gen1/2/3.js generators reading real src/data/*.ts (121 models, 17 runners, 17 webuis, 29 agents, 6 multimodal) | User request: full-site obsidian preview with real static data |
- Lesson applied: preview as standalone HTML first; port to Next.js only after explicit approval.

## 2026-10-11 - Obsidian mockup: aydınlık/karanlık tema
| File | Change | Reason |
|------|--------|--------|
| tasks/arayuz/tasarim2-obsidian/theme.js | NEW — theme motoru: html.light sınıfı + localStorage("obs-theme") kalıcılığı | Kullanıcı isteği |
| .../obsidian.css | Light-mode override bloğu (utility substring selector'ları: bg-[#101216], text-zinc-*, border-white/5, divide, amber→#b45309, tag/rank/surface renkleri) + .theme-btn stilleri | 8 sayfada tek yerden tema desteği |
| .../gen1.js gen2.js gen3.js | shell() artık theme.js yüklüyor + nav'da ☾ dark / ☀ light düğmesi | Üretilen tüm sayfalara otomatik |
| .../index.html | obsidian.css + theme.js bağlandı, nav'a düğme eklendi | El yazımı ana sayfa da dahil |
- Tercih localStorage'da kalıcı; sayfa açılışında FOUC yok (script head'de blocking).
- NOT: Gerçek Next.js sitesinde zaten çalışan bir tema sistemi var (layout.tsx pre-paint script + Navbar theme butonu, localStorage "theme"). Mockup bağımsız çalıştığı için ayrı "obs-theme" key kullanıyor — port sırasında tek key'e birleştirilir.

## 2026-10-11 - Mockup marka adı domain ile eşitlendi
| File | Change | Reason |
|------|--------|--------|
| .../gen1.js gen2.js gen3.js + index.html | Logo "▮ localaihub" -> "▮ aihublocal.com" (amber "ai", soluk ".com"); index <title> güncellendi | Kullanıcı: site adı domain ile aynı olsun |
- 8 mockup sayfasının tümünde yeni marka; footer zaten aihublocal.com idi. Gerçek sitenin Navbar/metadata adı henüz değişmedi (onay bekleniyor).

## 2026-10-11 - Language: everything English (branch + mockup)
| File | Change | Reason |
|------|--------|--------|
| llama-hq (branch) page.tsx, layout.tsx metadata | Hero/terminal/stats/card copy + title/description -> English | User: "herşey ingilizce olsun" |
| tasks/arayuz/tasarim2-obsidian/* | gen1/2/3 + index.html all visible copy and code comments -> English; pages regenerated | Consistency with site language |

## 2026-10-11 - i18n v1: 8-language support (site matches app languages)
| File | Change | Reason |
|------|--------|--------|
| src/lib/i18n.tsx | NEW LanguageProvider + dictionary (en/tr/es/de/fr/pt/zh/ja), localStorage "lang", EN fallback | User: site should support the app's 8 languages |
| providers.tsx | LanguageProvider wrapper | global availability |
| navbar.tsx | desktop lang dropdown (flag+code) + mobile flag grid; nav labels localized via t() | language switching UI |
| footer.tsx, page.tsx | "use client" + localized tagline/home copy via t() | localized chrome/home |
- v1 scope: chrome + home + footer translated; product/model names & data tables stay EN (technical). Phase B options: localized URLs (/tr..) + hreflang for SEO, deeper per-page dictionaries.

## 2026-10-11 - Steps 6-8: remaining pages restyled to obsidian (branch)
| File(s) | Change | Reason |
|---------|--------|--------|
| src/app/llm-runner-aio/page.tsx | Full indigo/gray -> semantic tokens; buttons bg-primary + brightness hover; port bullets primary | Step6 |
| rankings / local-llm-runners / local-llm-webuis / multimodal / chat-clients page.tsx | Tokens everywhere; medals (gold/silver/bronze) intentionally kept; star badges bg-accent/text-primary | Step7 |
| llm/configs: page, share, edit + ConfigCard/FilterPanel/ShareForm | Tokens; CTA buttons primary; chips accent | Step8 |
- Verification: grep indigo/purple count = 0 in all restyled files (medals excluded); build PASS; profile/login already clean.
- Preview available: Vercel commit status target https://vercel.com/vincespeed/local-ai-hub/FouYmomMFygdhz3B4S4PosrBP2tj ; preview domain requires Vercel login (Deployment Protection).

## 2026-10-11 - Review round 1 (user screenshots: mockup vs preview)
| File | Change | Reason |
|------|--------|--------|
| mockup gen1.js | parse(): params via quoted-string regex (was numeric) -> PARAMS no longer "undefined"; rankings.html regenerated | Screenshot showed undefined params in mockup |
| models/rankings/page.tsx | Header -> kicker + left-aligned "121 models, one table." obsidian style; Open Weights/Closed badges -> outline tags (green/neutral) | Match mockup design language |
| navbar.tsx | whitespace-nowrap on nav links; language trigger = Globe icon + EN code (flag emoji shows as "GB" letters on Windows); mobile flags now flag+code | Preview screenshot showed wrapped labels + GB artifact |

## 2026-10-11 - Rankings table -> exact mockup layout
| File | Change | Reason |
|------|--------|--------|
| models/rankings/page.tsx | Table rewritten to mirror taslak2 rankings.html: columns # / MODEL(name+creator sub) / INT(amber mono) / PARAMS / CONTEXT / $ / M / TOK/S / weights(closed tags); medal circles, Top1 chip and lucide icons removed; gold/silver/bronze rank numbers; mono headers | User: "tablolar ayni gorunsun taslak ile" |

## 2026-10-11 - Review round 2 (fit + tab typography)
| File | Change | Reason |
|------|--------|--------|
| globals.css | .container override in @layer utilities: max-width 1400px (mockup parity); fixes page overflow / oversized cards | Preview table wider than mockup, horizontal scroll |
| navbar.tsx | inner width max-w-7xl -> max-w-[1400px]; nav labels short lowercase tokens (configs, runner aio, rankings, agents, runners, web ui, multimodal); all links + support/google/github font-mono 13px whitespace-nowrap | Match mockup tab typography; prevent wrap/overflow |
| footer.tsx | max-w-7xl -> max-w-[1400px] | Align with container width |

## 2026-10-11 - review.bat (local preview, no Vercel wait)
| File | Change | Reason |
|------|--------|--------|
| llama-hq/review.bat | New: [1] dev hot-reload / [2] prod build+serve on port 3100, auto-opens browser | User: Vercel preview takes ~2 min; local review is instant |
| (fs) .next_broken_1787544928 | Corrupt NTFS dir (error 1392) broke Turbopack -> renamed & moved out of llama-hq to ../broken_next_tmp; deletion fails, needs chkdsk D: /f (admin) | Dev server 500'd until removed |

## 2026-10-11 - Runners/WebUI/Multimodal -> agents-style card grid
| File | Change | Reason |
|------|--------|--------|
| src/app/local-llm-runners/page.tsx | Table -> identical Coding Agents card grid (icon tile, name+platform sub, ExternalLink, explanation, OS emoji + supported chips) | User: same list look as agents tab |
| src/app/local-llm-webuis/page.tsx | Same card grid + amber ⭐ stars chip | Consistency with agents design |
| src/app/multimodal/page.tsx | Same card grid; icon auto-picked by capability (Film/AudioLines/ImageIcon/Sparkles) | Consistency with agents design |
