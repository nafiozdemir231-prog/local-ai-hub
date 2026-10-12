# Task: 8-language localization for ALL tabs — DONE

## Steps
- [x] 1. Extend i18n DICT via new modules (src/lib/ui-core.ts + ui-aio1..5): ~90 keys x 8 languages
- [x] 2. Navbar: nav links use t("nav.s.*") short translated labels (lowercase mono kept)
- [x] 3. Rankings localized (kicker/title/sub/weights tags)
- [x] 4. Agents + Runners + WebUI + Multimodal localized (title/sub; data stays EN)
- [x] 5. Configs list + FilterPanel + ShareForm + share/edit pages localized
- [x] 6. AIO page localized: hero, features/components/steps arrays, headings, overview/presets/sysreq notes, privacy, Supported Languages (from LANGS), credits, CTA, FeedbackForm (+locale-aware date)
- [x] 7. Build PASS + all routes 200 locally + commit + push (I18N_OK)

## Notes
- Model/tool names, explanations in data files, commands, URLs, units stay English by design.
- SSR default language = EN; user selection persisted in localStorage (client-side switch).
- Branch: obsidian-redesign — production merge hâlâ bekliyor.
