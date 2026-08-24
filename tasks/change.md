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
