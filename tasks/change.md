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
