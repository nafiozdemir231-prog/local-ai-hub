# Task: Obsidian redesign — tam site portu (branch tabanlı, preview'li)

## Branch
`obsidian-redesign` (main = production dokunulmaz; onay sonrası merge)

## Steps
- [ ] 1. Branch aç + temel doğruluk (mevcut build PASS referansı)
- [ ] 2. Tema temeli: globals.css'e obsidian CSS değişkenleri (dark #0b0c0f / light #f6f5f1), grain overlay utility, mevcut "theme" localStorage sistemiyle birleştir (mockup'taki ayrı "obs-theme" key'i tek key'de birleşecek)
- [ ] 3. Fontlar: Sora + JetBrains Mono next/font ile layout.tsx'e ekle (Geist korunabilir ama obsidian sayfalarda Sora baz)
- [ ] 4. Navbar + Footer obsidian stili (marka: ▮ aihublocal.com — amber "ai", soluk ".com"; mevcut tema butonu tek düğmede birleşir)
- [ ] 5. Ana sayfa: obsidian hero (kicker, 125B vurgu, CTA'lar) + canlı kurulum terminali + servis kartları (mevcut route'lara bağlanır)
- [ ] 6. llm-runner-aio sayfası obsidian stili (tüm gerçek içerik/veriler korunur: v2.1 linkler, preset matrisi, portlar)
- [ ] 7. Tablo/kart sayfaları obsidian: rankings, local-llm-runners, local-llm-webuis, multimodal, chat-clients (data dosyaları aynı; sadece giydirme)
- [ ] 8. llm/configs sayfası kabuğu obsidian (DB içerikleri olduğu gibi kalır)
- [ ] 9. Marka/metadata: layout.tsx title/description → aihublocal.com odaklı
- [ ] 10. Build + rota rotası kontrolü (her route derleniyor; lokal `npm run dev -p -3100` opsiyonel)
- [ ] 11. Branch push -> Vercel PREVIEW URL'den kullanıcı incelemesi (düzeltme döngüsü)
- [ ] 12. Onay -> main merge -> production deploy + canlı doğrulama

## Diagram
```
[main = mevcut site]          [obsidian-redesign]
      |                             |
   production                  adım adım port
   (bozulmaz)                  Navbar/Footer → Home → AIO → Tablolar → Configs
                                     |
                              Vercel preview URL
                        kullanıcı incelemesi ↔ düzeltme
                                     | (onay)
                                  merge → deploy
```

## Notes
- Veriler değişmez: src/data/*.ts + DB aynı; yalnızca sunum katmanı.
- Mockup'taki light override mantığı CSS değişkenleriyle Next'e taşınır (utility hack yerine semantik token).
- Her adım sonrası build kontrolü; preview URL kullanıcı onay döngüsü için kritik.
