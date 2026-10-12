
## 2026-10-11 — "Uygulamayı production'a uygulamadan önce statik önizleme iste"
- Hata: Kullanıcı "tasarımı siteye uygula" bağlamında önce HTML önizleme istedi; ben Next.js portunu doğrudan push ettim.
- Düzeltme: git revert ile üretim eski haline döndü (a6561d7), mockup tasks/arayuz altında üretildi.
- Kural: Tasarım değişikliklerinde önce statik HTML mockup göster; canlıya port için onay bekle.
