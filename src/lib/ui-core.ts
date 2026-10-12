// UI copy part 1: rankings, card tabs, configs list + filters. 8 languages.
// Product/model names and technical units stay as-is.

export type L = { en: string; tr: string; es: string; de: string; fr: string; pt: string; zh: string; ja: string };

export const UI_CORE: Record<string, L> = {
  "rank.kicker": { en: "// model rankings", tr: "// model sıralamaları", es: "// clasificación de modelos", de: "// Modell-Rangliste", fr: "// classement des modèles", pt: "// classificação de modelos", zh: "// 模型排名", ja: "// モデルランキング" },
  "rank.title": { en: "{n} models, one table.", tr: "{n} model, tek tablo.", es: "{n} modelos, una tabla.", de: "{n} Modelle, eine Tabelle.", fr: "{n} modèles, un tableau.", pt: "{n} modelos, uma tabela.", zh: "{n} 个模型，一张表。", ja: "{n}モデル、1つのテーブル。" },
  "rank.sub": { en: "Intelligence index · parameters · context window · price ($/M tokens) · output speed — based on Artificial Analysis benchmarks.", tr: "Zekâ endeksi · parametreler · bağlam penceresi · fiyat ($/M token) · çıktı hızı — Artificial Analysis kıyaslamalarına dayalı.", es: "Índice de inteligencia · parámetros · ventana de contexto · precio ($/M tokens) · velocidad de salida — según las pruebas de Artificial Analysis.", de: "Intelligenz-Index · Parameter · Kontextfenster · Preis ($/M Tokens) · Ausgabegeschwindigkeit — basierend auf Artificial-Analysis-Benchmarks.", fr: "Indice d'intelligence · paramètres · fenêtre de contexte · prix ($/M tokens) · vitesse de sortie — basé sur les benchmarks d'Artificial Analysis.", pt: "Índice de inteligência · parâmetros · janela de contexto · preço ($/M tokens) · velocidade de saída — com base nos testes da Artificial Analysis.", zh: "智能指数 · 参数 · 上下文窗口 · 价格（每百万 token）· 输出速度 —— 基于 Artificial Analysis 基准测试。", ja: "インテリジェンス指数 · パラメータ · コンテキストウィンドウ · 価格（100万トークンあたり）· 出力速度 — Artificial Analysis ベンチマークに基づく。" },
  "rank.weights": { en: "weights", tr: "ağırlıklar", es: "pesos", de: "Gewichte", fr: "poids", pt: "pesos", zh: "权重", ja: "重み" },
  "rank.closed": { en: "closed", tr: "kapalı", es: "cerrado", de: "geschlossen", fr: "fermé", pt: "fechado", zh: "闭源", ja: "閉鎖" },

  "agents.sub": { en: "Discover the best AI-powered coding tools and agents for your workflow.", tr: "İş akışın için en iyi yapay zekâ destekli kodlama araçlarını ve ajanları keşfet.", es: "Descubre las mejores herramientas y agentes de programación con IA para tu flujo de trabajo.", de: "Entdecke die besten KI-Coding-Tools und Agenten für deinen Workflow.", fr: "Découvrez les meilleurs outils et agents de codage propulsés par l'IA pour votre flux de travail.", pt: "Descubra as melhores ferramentas e agentes de programação com IA para o seu fluxo de trabalho.", zh: "发现最适合你工作流的 AI 编码工具与代理。", ja: "あなたのワークフローに最適な AI コーディングツールとエージェントを見つけましょう。" },

  "runners.sub": { en: "Discover the best tools for running local LLMs on your own hardware.", tr: "LLM'leri kendi donanımında çalıştırmak için en iyi araçları keşfet.", es: "Descubre las mejores herramientas para ejecutar LLM locales en tu propio hardware.", de: "Entdecke die besten Tools, um lokale LLMs auf deiner eigenen Hardware auszuführen.", fr: "Découvrez les meilleurs outils pour exécuter des LLM locaux sur votre propre matériel.", pt: "Descubra as melhores ferramentas para rodar LLMs locais no seu próprio hardware.", zh: "发现在你自己的硬件上运行本地 LLM 的最佳工具。", ja: "自分のハードウェアでローカル LLM を実行するための最適ツールを見つけましょう。" },

  "webui.sub": { en: "Discover the best web interfaces for running and managing local LLMs.", tr: "LLM'leri çalıştırmak ve yönetmek için en iyi web arayüzlerini keşfet.", es: "Descubre las mejores interfaces web para ejecutar y gestionar LLM locales.", de: "Entdecke die besten Web-Oberflächen zum Ausführen und Verwalten lokaler LLMs.", fr: "Découvrez les meilleures interfaces web pour exécuter et gérer des LLM locaux.", pt: "Descubra as melhores interfaces web para rodar e gerenciar LLMs locais.", zh: "发现用于运行和管理本地 LLM 的最佳 Web 界面。", ja: "ローカル LLM の実行と管理に最適な Web インターフェースを見つけましょう。" },

  "mm.sub": { en: "Discover the best apps for local AI multimedia generation.", tr: "Yerel yapay zekâ multimedya üretimi için en iyi uygulamaları keşfet.", es: "Descubre las mejores aplicaciones para generar multimedia con IA local.", de: "Entdecke die besten Apps für lokale KI-Multimedia-Generierung.", fr: "Découvrez les meilleures applications pour la génération multimédia par IA locale.", pt: "Descubra as melhores aplicações para geração de multimídia com IA local.", zh: "发现用于本地 AI 多模态生成的最佳应用。", ja: "ローカル AI によるマルチメディア生成に最適なアプリを見つけましょう。" },

  "cfg.browse": { en: "Browse and filter local LLM configurations.", tr: "Yerel LLM konfigürasyonlarına göz at ve filtrele.", es: "Explora y filtra configuraciones de LLM locales.", de: "Lokale LLM-Konfigurationen durchsuchen und filtern.", fr: "Parcourez et filtrez les configurations LLM locales.", pt: "Navegue e filtre configurações de LLMs locais.", zh: "浏览并筛选本地 LLM 配置。", ja: "ローカル LLM 構成を閲覧・絞り込み。" },
  "cfg.results": { en: "{n} results", tr: "{n} sonuç", es: "{n} resultados", de: "{n} Ergebnisse", fr: "{n} résultats", pt: "{n} resultados", zh: "{n} 个结果", ja: "{n} 件" },
  "cfg.share": { en: "Share Config", tr: "Konfigürasyon Paylaş", es: "Compartir configuración", de: "Konfiguration teilen", fr: "Partager la configuration", pt: "Compartilhar configuração", zh: "分享配置", ja: "構成を共有" },
  "cfg.sortBy": { en: "Sort by:", tr: "Sıralama:", es: "Ordenar por:", de: "Sortieren nach:", fr: "Trier par :", pt: "Ordenar por:", zh: "排序：", ja: "並び替え：" },
  "cfg.votes": { en: "Votes", tr: "Oylar", es: "Votos", de: "Stimmen", fr: "Votes", pt: "Votos", zh: "投票", ja: "投票" },
  "cfg.ppSpeed": { en: "PP Speed", tr: "PP Hızı", es: "Velocidad PP", de: "PP-Tempo", fr: "Vitesse PP", pt: "Velocidade PP", zh: "PP 速度", ja: "PP 速度" },
  "cfg.tgSpeed": { en: "TG Speed", tr: "TG Hızı", es: "Velocidad TG", de: "TG-Tempo", fr: "Vitesse TG", pt: "Velocidade TG", zh: "TG 速度", ja: "TG 速度" },
  "cfg.aioBanner": { en: "LLM Runner AIO — All-in-One Package", tr: "LLM Runner AIO — Hepsi Bir Arada Paketi", es: "LLM Runner AIO — Paquete todo en uno", de: "LLM Runner AIO — Alles-in-einem-Paket", fr: "LLM Runner AIO — Pack tout-en-un", pt: "LLM Runner AIO — Pacote tudo-em-um", zh: "LLM Runner AIO — 一体化安装包", ja: "LLM Runner AIO — オールインワンパッケージ" },
  "cfg.aioBannerDesc": { en: "Open WebUI, llama.cpp, Vane & SearXNG in a single 2.5 GB .exe. Automatic setup, 8 languages, Windows integration.", tr: "Open WebUI, llama.cpp, Vane ve SearXNG tek bir 2,5 GB'lık .exe içinde. Otomatik kurulum, 8 dil, Windows entegrasyonu.", es: "Open WebUI, llama.cpp, Vane y SearXNG en un solo .exe de 2,5 GB. Configuración automática, 8 idiomas, integración con Windows.", de: "Open WebUI, llama.cpp, Vane & SearXNG in einer einzigen 2,5-GB-.exe. Automatische Einrichtung, 8 Sprachen, Windows-Integration.", fr: "Open WebUI, llama.cpp, Vane et SearXNG dans un seul .exe de 2,5 Go. Installation automatique, 8 langues, intégration Windows.", pt: "Open WebUI, llama.cpp, Vane e SearXNG em um único .exe de 2,5 GB. Configuração automática, 8 idiomas, integração com o Windows.", zh: "Open WebUI、llama.cpp、Vane 和 SearXNG 集成在单个 2.5 GB 的 .exe 中。自动安装、8 种语言、Windows 集成。", ja: "Open WebUI、llama.cpp、Vane、SearXNG を単一の 2.5 GB .exe に統合。自動セットアップ、8言語、Windows 統合。" },
  "cfg.downloadAio": { en: "Download AIO", tr: "AIO'yu İndir", es: "Descargar AIO", de: "AIO herunterladen", fr: "Télécharger AIO", pt: "Baixar AIO", zh: "下载 AIO", ja: "AIO をダウンロード" },
  "cfg.thModel": { en: "Model Name", tr: "Model Adı", es: "Nombre del modelo", de: "Modellname", fr: "Nom du modèle", pt: "Nome do modelo", zh: "模型名称", ja: "モデル名" },
  "cfg.thHardware": { en: "Hardware Model", tr: "Donanım Modeli", es: "Modelo de hardware", de: "Hardware-Modell", fr: "Matériel", pt: "Modelo de hardware", zh: "硬件型号", ja: "ハードウェア" },
  "cfg.thPlatform": { en: "Platform", tr: "Platform", es: "Plataforma", de: "Plattform", fr: "Plateforme", pt: "Plataforma", zh: "平台", ja: "プラットフォーム" },
  "cfg.thRunner": { en: "LLM Runner", tr: "LLM Çalıştırıcı", es: "Ejecutor LLM", de: "LLM-Runner", fr: "Exécuteur LLM", pt: "Executor LLM", zh: "LLM 运行器", ja: "LLM ランナー" },
  "cfg.thVotes": { en: "Votes", tr: "Oylar", es: "Votos", de: "Stimmen", fr: "Votes", pt: "Votos", zh: "投票", ja: "投票" },
  "cfg.thUser": { en: "User", tr: "Kullanıcı", es: "Usuario", de: "Benutzer", fr: "Utilisateur", pt: "Usuário", zh: "用户", ja: "ユーザー" },
  "cfg.thActions": { en: "Actions", tr: "İşlemler", es: "Acciones", de: "Aktionen", fr: "Actions", pt: "Ações", zh: "操作", ja: "操作" },
  "cfg.anon": { en: "Anonymous", tr: "Anonim", es: "Anónimo", de: "Anonym", fr: "Anonyme", pt: "Anônimo", zh: "匿名", ja: "匿名" },
  "cfg.edit": { en: "Edit", tr: "Düzenle", es: "Editar", de: "Bearbeiten", fr: "Modifier", pt: "Editar", zh: "编辑", ja: "編集" },
  "cfg.delete": { en: "Delete", tr: "Sil", es: "Eliminar", de: "Löschen", fr: "Supprimer", pt: "Excluir", zh: "删除", ja: "削除" },
  "cfg.deleting": { en: "Deleting...", tr: "Siliniyor...", es: "Eliminando...", de: "Lösche...", fr: "Suppression...", pt: "Excluindo...", zh: "正在删除…", ja: "削除中…" },
  "cfg.confirmDel": { en: "Are you sure you want to delete this config?", tr: "Bu konfigürasyonu silmek istediğine emin misin?", es: "¿Seguro que quieres eliminar esta configuración?", de: "Möchtest du diese Konfiguration wirklich löschen?", fr: "Voulez-vous vraiment supprimer cette configuration ?", pt: "Tem certeza de que deseja excluir esta configuração?", zh: "确定要删除此配置吗？", ja: "この構成を削除してもよろしいですか？" },
  "cfg.noResults": { en: "No configs found matching your filters.", tr: "Filtrelerinize uyan konfigürasyon bulunamadı.", es: "No se encontraron configuraciones que coincidan con tus filtros.", de: "Keine Konfigurationen gefunden, die deine Filter erfüllen.", fr: "Aucune configuration ne correspond à vos filtres.", pt: "Nenhuma configuração corresponde aos seus filtros.", zh: "未找到符合筛选条件的配置。", ja: "フィルターに一致する構成が見つかりません。" },

  "fp.hardware": { en: "Hardware", tr: "Donanım", es: "Hardware", de: "Hardware", fr: "Matériel", pt: "Hardware", zh: "硬件", ja: "ハードウェア" },
  "fp.model": { en: "Model", tr: "Model", es: "Modelo", de: "Modell", fr: "Modèle", pt: "Modelo", zh: "模型", ja: "モデル" },
  "fp.runner": { en: "Runner", tr: "Çalıştırıcı", es: "Ejecutor", de: "Runner", fr: "Exécuteur", pt: "Executor", zh: "运行器", ja: "ランナー" },
  "fp.search": { en: "Search...", tr: "Ara...", es: "Buscar...", de: "Suchen...", fr: "Rechercher...", pt: "Buscar...", zh: "搜索…", ja: "検索…" },
  "fp.platform": { en: "Platform", tr: "Platform", es: "Plataforma", de: "Plattform", fr: "Plateforme", pt: "Plataforma", zh: "平台", ja: "プラットフォーム" },
  "fp.quant": { en: "Quantization", tr: "Nitelik (Quant)", es: "Cuantización", de: "Quantisierung", fr: "Quantification", pt: "Quantização", zh: "量化", ja: "量子化" },
};

export const UI_SHARE: Record<string, L> = {
  "cfg.editTitle": { en: "Edit Config", tr: "Konfigürasyonu Düzenle", es: "Editar configuración", de: "Konfiguration bearbeiten", fr: "Modifier la configuration", pt: "Editar configuração", zh: "编辑配置", ja: "構成を編集" },
  "sf.gpuVram": { en: "GPU VRAM (GB)", tr: "Ekran Kartı VRAM (GB)", es: "VRAM de GPU (GB)", de: "GPU-VRAM (GB)", fr: "VRAM GPU (Go)", pt: "VRAM da GPU (GB)", zh: "GPU 显存（GB）", ja: "GPU VRAM（GB）" },
  "sf.sysRam": { en: "System RAM (GB)", tr: "Sistem RAM'i (GB)", es: "RAM del sistema (GB)", de: "System-RAM (GB)", fr: "RAM système (Go)", pt: "RAM do sistema (GB)", zh: "系统内存（GB）", ja: "システム RAM（GB）" },
  "sf.contextSize": { en: "Context Size", tr: "Bağlam Boyutu", es: "Tamaño de contexto", de: "Kontextgröße", fr: "Taille de contexte", pt: "Tamanho de contexto", zh: "上下文大小", ja: "コンテキストサイズ" },
  "sf.kvCache": { en: "KV Cache", tr: "KV Önbelleği", es: "Caché KV", de: "KV-Cache", fr: "Cache KV", pt: "Cache KV", zh: "KV 缓存", ja: "KV キャッシュ" },
  "sf.ppSpeedT": { en: "PP Speed (tokens/sec)", tr: "PP Hızı (token/sn)", es: "Velocidad PP (tokens/s)", de: "PP-Tempo (Tokens/s)", fr: "Vitesse PP (tokens/s)", pt: "Velocidade PP (tokens/s)", zh: "PP 速度（token/秒）", ja: "PP 速度（トークン/秒）" },
  "sf.tgSpeedT": { en: "TG Speed (tokens/sec)", tr: "TG Hızı (token/sn)", es: "Velocidad TG (tokens/s)", de: "TG-Tempo (Tokens/s)", fr: "Vitesse TG (tokens/s)", pt: "Velocidade TG (tokens/s)", zh: "TG 速度（token/秒）", ja: "TG 速度（トークン/秒）" },
  "sf.general": { en: "General Settings", tr: "Genel Ayarlar", es: "Ajustes generales", de: "Allgemeine Einstellungen", fr: "Paramètres généraux", pt: "Configurações gerais", zh: "通用设置", ja: "一般設定" },
  "sf.note": { en: "Note (optional)", tr: "Not (isteğe bağlı)", es: "Nota (opcional)", de: "Anmerkung (optional)", fr: "Note (facultatif)", pt: "Nota (opcional)", zh: "备注（可选）", ja: "メモ（任意）" },
  "sf.anyNotes": { en: "Any additional notes...", tr: "Ek notlar...", es: "Notas adicionales...", de: "Zusätzliche Notizen...", fr: "Notes supplémentaires...", pt: "Notas adicionais...", zh: "其他备注…", ja: "追加メモ…" },
  "sf.selectRunner": { en: "Select runner...", tr: "Çalıştırıcı seçin...", es: "Seleccionar ejecutor...", de: "Runner auswählen...", fr: "Sélectionner l'exécuteur...", pt: "Selecionar executor...", zh: "选择运行器…", ja: "ランナーを選択…" },
  "cfg.back": { en: "Back", tr: "Geri", es: "Volver", de: "Zurück", fr: "Retour", pt: "Voltar", zh: "返回", ja: "戻る" },
  "cfg.shareSub": { en: "Share your local LLM configuration with the community.", tr: "Yerel LLM yapılandırmanı toplulukla paylaş.", es: "Comparte tu configuración de LLM local con la comunidad.", de: "Teile deine lokale LLM-Konfiguration mit der Community.", fr: "Partagez votre configuration LLM locale avec la communauté.", pt: "Compartilhe sua configuração de LLM local com a comunidade.", zh: "与社区分享你的本地 LLM 配置。", ja: "ローカル LLM 構成をコミュニティと共有しましょう。" },
  "cfg.editSub": { en: "Update your configuration.", tr: "Yapılandırmanı güncelle.", es: "Actualiza tu configuración.", de: "Aktualisiere deine Konfiguration.", fr: "Mettez à jour votre configuration.", pt: "Atualize sua configuração.", zh: "更新你的配置。", ja: "構成を更新します。" },
  "cfg.clearFilters": { en: "Clear filters", tr: "Filtreleri temizle", es: "Borrar filtros", de: "Filter zurücksetzen", fr: "Effacer les filtres", pt: "Limpar filtros", zh: "清除筛选", ja: "フィルターをクリア" },
};

export const UI_NAV: Record<string, L> = {
  "nav.s.configs": { en: "configs", tr: "ayarlar", es: "config", de: "konfig", fr: "config", pt: "config", zh: "配置", ja: "設定" },
  "nav.s.aio": { en: "aio", tr: "aio", es: "aio", de: "aio", fr: "aio", pt: "aio", zh: "aio", ja: "aio" },
  "nav.s.rankings": { en: "rankings", tr: "sıralama", es: "ranking", de: "rangliste", fr: "classement", pt: "ranking", zh: "排名", ja: "ランキング" },
  "nav.s.agents": { en: "agents", tr: "ajanlar", es: "agentes", de: "agenten", fr: "agents", pt: "agentes", zh: "代理", ja: "エージェント" },
  "nav.s.runners": { en: "runners", tr: "çalıştırıcı", es: "runners", de: "runner", fr: "runners", pt: "runners", zh: "运行器", ja: "ランナー" },
  "nav.s.webui": { en: "web ui", tr: "web arayüz", es: "web ui", de: "web-ui", fr: "web-ui", pt: "web ui", zh: "网页界面", ja: "Web UI" },
  "nav.s.multimodal": { en: "multimodal", tr: "çoklu mod", es: "multimodal", de: "multimodal", fr: "multimodal", pt: "multimodal", zh: "多模态", ja: "マルチモーダル" },
};
