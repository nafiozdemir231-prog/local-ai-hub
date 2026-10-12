# Task: Obsidian ana sayfa portu (tasarim2 -> gerçek site)

## Steps
- [x] 1. Mevcut page.tsx'i yedekle (tasks/home-page-bento-backup.tsx) — DONE
- [x] 2. page.tsx'i Obsidian tasarımına çevir (Sora + JetBrains Mono via next/font, #0b0c0f zemin, amber vurgu, grain overlay, terminal kutusu, hairline kartlar)
- [x] 3. Build doğrula
- [ ] 4. Commit + push -> Vercel deploy
- [ ] 5. Canlı doğrulama (curl/MCP) + change log

## Notes
- Global Navbar/Footer site chrome olarak kalıyor; sayfa içeriği birebir obsidian mockup.
- Site light/dark tema destekliyor ama obsidian tasarımı bilinçli olarak dark-only (mockup'a sadakat).
- CTA linkleri gerçek rotalara bağlandı: /llm-runner-aio, /models/rankings, GitHub repo.
- Beğenilmezse geri alma: `git revert <commit>` tek komutla eski bento ana sayfa geri gelir.
