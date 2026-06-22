/* =============================================================
   products.js — 商品マスタ（MVP 5商品）
   カタログ・商品詳細・見積もりシミュレーターが参照する単一データ。
   ※価格・納期はサンプル（仮）。実数値は事業会社側で確定して差し込む。
   WordPress移行時は CPT(product)+ACF へマッピングする想定。
   ============================================================= */
window.CATEGORIES = [
  { key: "all", label: "すべて" },
  { key: "site", label: "採用サイト" },
  { key: "movie", label: "動画" },
  { key: "sns", label: "SNS運用" },
  { key: "pamph", label: "パンフレット" },
  { key: "slide", label: "スライド" }
];

window.PRODUCTS = [
  {
    id: "recs",
    name: "RECS（採用パッケージサイト／刷新版）",
    short: "RECS 採用サイト",
    cats: ["site"], catLabel: "採用サイト", tone: "tone-site",
    priceMin: 60, priceMax: 150, delivery: "最短3週間", leadWeeks: 3,
    popular: 1, estimable: true,
    tagline: "テンプレ刷新版でスピード公開。CMS付きで自社更新もできる採用サイト。",
    summary: "デザインテンプレートの刷新版をベースに、必要ページを最短で立ち上げる採用サイトパッケージ。公開後は自社で更新できるCMS付き。スピードと品質のバランス型です。",
    included: ["デザインテンプレ刷新版", "基本ページ一式（TOP/募集要項/エントリー導線/社員紹介 ほか）", "CMS（更新システム）", "スマホ対応（レスポンシブ）", "公開サポート"],
    grades: [
      { name: "梅 / ライト", price: "60万円〜", note: "テンプレ流用・基本ページ・最短公開" },
      { name: "竹 / スタンダード", price: "100万円〜", note: "セミオーダー・撮影なし・CMS拡張", rec: true },
      { name: "松 / プレミアム", price: "150万円〜", note: "フルオーダー・撮影込み・原稿制作" }
    ],
    faqs: [
      { q: "最短どのくらいで公開できますか？", a: "梅プランかつ原稿・写真をご支給いただける場合、最短3週間での公開実績があります。撮影や原稿制作を含む場合は別途お見積もりします。" },
      { q: "公開後の更新は自社でできますか？", a: "はい。CMSが付くため、募集要項やお知らせは管理画面から自社で更新できます。操作レクチャーも公開サポートに含みます。" },
      { q: "既存ドメイン・既存サイトからの移行は可能ですか？", a: "可能です。現行環境を確認のうえ、ドメイン・サーバ移行を含めてご提案します。" }
    ]
  },
  {
    id: "movie",
    name: "採用動画パック",
    short: "採用動画パック",
    cats: ["movie"], catLabel: "動画", tone: "tone-movie",
    priceMin: 40, priceMax: 120, delivery: "最短4週間", leadWeeks: 4,
    popular: 2, estimable: true,
    tagline: "企画から撮影・編集までワンストップ。採用の“伝わる”を動画で。",
    summary: "会社・仕事・人の魅力を動画で伝える採用動画パッケージ。企画構成から撮影、編集までワンストップ。尺やバリエーションはオプションで選べます。",
    included: ["企画構成（絵コンテ）", "撮影（1日／ハーフ日 選択）", "編集・テロップ・BGM", "尺別オプション（30秒/90秒/フル）", "ナレーション手配（オプション）"],
    grades: [
      { name: "梅 / ショート", price: "40万円〜", note: "30〜60秒・ハーフ日撮影" },
      { name: "竹 / スタンダード", price: "80万円〜", note: "90秒・1日撮影・社員出演", rec: true },
      { name: "松 / フル", price: "120万円〜", note: "フル尺＋ショート派生・複数日撮影" }
    ],
    faqs: [
      { q: "社員に出演してもらう必要はありますか？", a: "必須ではありませんが、社員出演は応募者の共感を最も得やすい要素です。出演が難しい場合はインタビュー音声＋資料映像などの構成もご提案します。" },
      { q: "撮影は何日かかりますか？", a: "スタンダードで1日が目安です。拠点が複数ある場合や密着取材を含む場合は複数日になることがあります。" }
    ]
  },
  {
    id: "short",
    name: "縦型ショート動画パック",
    short: "縦型ショート動画",
    cats: ["movie", "sns"], catLabel: "動画 / SNS", tone: "tone-short",
    priceMin: 15, priceMax: 45, delivery: "最短2週間", leadWeeks: 2,
    popular: 3, estimable: true,
    tagline: "TikTok / Reels / Shorts 向け縦型。低予算で量産、SNSで届く。",
    summary: "若手・学生にリーチする縦型ショート動画パック。社員出演でリアルを切り取り、TikTok・Instagram Reels・YouTube Shorts に最適化。本数でスケールします。",
    included: ["構成（型テンプレ活用）", "撮影（半日でまとめ撮り）", "縦型編集・字幕・トレンド音源対応", "本数別プラン（3本/5本/10本）", "各SNS向け書き出し"],
    grades: [
      { name: "梅 / 3本", price: "15万円〜", note: "まとめ撮り・型テンプレ" },
      { name: "竹 / 5本", price: "28万円〜", note: "出演者複数・字幕込み", rec: true },
      { name: "松 / 10本", price: "45万円〜", note: "シリーズ設計・運用提案付き" }
    ],
    faqs: [
      { q: "運用（投稿）まで頼めますか？", a: "MVP時点では制作（納品）までが基本です。投稿運用代行はフェーズ2でのご提供を予定しています。撮影時に運用設計のアドバイスは可能です。" },
      { q: "まとめ撮りとは何ですか？", a: "半日〜1日で複数本を一気に撮影する方式です。1本あたりの単価を抑えながら本数を確保できます。" }
    ]
  },
  {
    id: "pamphlet",
    name: "採用パンフレット制作",
    short: "採用パンフレット",
    cats: ["pamph"], catLabel: "パンフレット", tone: "tone-pamph",
    priceMin: 30, priceMax: 90, delivery: "最短3週間", leadWeeks: 3,
    popular: null, estimable: true,
    tagline: "合同説明会・面談で渡せる一冊。企画・取材・デザイン・印刷まで。",
    summary: "合同説明会や面談で手渡す採用パンフレット。企画・取材・撮影・デザイン・印刷までワンストップ。Webと世界観を揃えた展開も可能です。",
    included: ["企画・台割設計", "取材・原稿制作", "撮影（オプション）", "デザイン（表紙＋本文）", "印刷（部数オプション）"],
    grades: [
      { name: "梅 / 8P", price: "30万円〜", note: "支給素材ベース・8ページ" },
      { name: "竹 / 16P", price: "55万円〜", note: "取材＋撮影・16ページ", rec: true },
      { name: "松 / 24P＋", price: "90万円〜", note: "フル取材・特殊加工・大部数" }
    ],
    faqs: [
      { q: "印刷部数はどのくらいから対応できますか？", a: "小ロット（100部〜）から対応可能です。部数によって単価が変わるため、見積もり時にご希望部数をお知らせください。" },
      { q: "Webサイトとデザインを合わせられますか？", a: "可能です。採用サイトとセットでご依頼いただくと、世界観・写真素材を共通化でき、コストと制作期間を圧縮できます。" }
    ]
  },
  {
    id: "starter",
    name: "採用スタートセット（バンドル）",
    short: "採用スタートセット",
    cats: ["site", "movie", "bundle"], catLabel: "複合（サイト＋動画）", tone: "tone-bundle",
    priceMin: 90, priceMax: 200, delivery: "最短5週間", leadWeeks: 5,
    popular: null, estimable: true,
    tagline: "サイト＋動画＋ロゴ最小構成。これから採用広報を始める会社の入口。",
    summary: "「まず一式そろえたい」に応える入口商品。簡易採用サイト・採用動画・ロゴ最小構成をバンドルし、単品合計よりお得に採用広報をスタートできます。",
    included: ["簡易採用サイト（テンプレ・基本ページ）", "採用動画（ショート尺）", "ロゴ最小構成 or 既存ロゴ調整", "撮影（共通でまとめ撮り）", "公開・初期設定サポート"],
    grades: [
      { name: "梅 / スタート", price: "90万円〜", note: "テンプレ＋ショート動画" },
      { name: "竹 / スタンダード", price: "140万円〜", note: "セミオーダー＋撮影込み", rec: true },
      { name: "松 / フル", price: "200万円〜", note: "フルオーダー一式・パンフ追加可" }
    ],
    faqs: [
      { q: "バンドルだと何が得ですか？", a: "撮影や素材を各商品で共通化できるため、単品で個別発注するより総額・制作期間ともに圧縮できます。初めての採用広報立ち上げに最適です。" },
      { q: "後から商品を追加できますか？", a: "可能です。スタートセットで土台を作り、パンフレットや縦型ショートを後から追加する進め方をおすすめしています。" }
    ]
  }
];

/* 見積もりシミュレーター用の係数・オプション */
window.SIM_SCALES = [
  { key: "venture", label: "ベンチャー / 〜50名", factor: 1.0, desc: "スピード重視・最小構成" },
  { key: "mid", label: "中堅 / 50〜300名", factor: 1.3, desc: "ページ・尺を拡張" },
  { key: "large", label: "大手 / 300名〜", factor: 1.6, desc: "ボリューム・体制強化" }
];

window.SIM_OPTIONS = [
  { key: "shoot", label: "撮影あり", desc: "プロ撮影で素材を新規制作", add: 20, weeks: 1 },
  { key: "copy", label: "原稿・取材", desc: "ライターが取材して原稿化", add: 15, weeks: 1 },
  { key: "volume", label: "ボリューム追加", desc: "ページ数 / 尺 / 本数を増やす", add: 15, weeks: 1 },
  { key: "rush", label: "お急ぎ納品", desc: "体制を強化し納期を短縮", add: 10, weeks: -1 }
];

/* 実績（works）。MVPはサンプル数件。 */
window.WORKS = [
  { id: "w1", title: "製造業A社 採用サイト刷新", client: "製造業 / 従業員300名", product: "recs", tone: "tone-site", tag: "採用サイト", summary: "応募導線を整理し、エントリー数が前年比で増加。" },
  { id: "w2", title: "IT企業B社 採用動画", client: "IT / 従業員120名", product: "movie", tone: "tone-movie", tag: "動画", summary: "社員密着の90秒動画で社風を可視化。説明会で活用。" },
  { id: "w3", title: "サービス業C社 縦型ショート", client: "サービス / 従業員80名", product: "short", tone: "tone-short", tag: "動画 / SNS", summary: "縦型5本でSNS経由の認知が拡大。" },
  { id: "w4", title: "医療法人D 採用パンフ", client: "医療 / 職員500名", product: "pamphlet", tone: "tone-pamph", tag: "パンフレット", summary: "合同説明会で配布、現場の雰囲気を一冊に。" },
  { id: "w5", title: "ベンチャーE社 採用スタートセット", client: "IT / 従業員30名", product: "starter", tone: "tone-bundle", tag: "複合", summary: "サイト＋動画＋ロゴを一式で立ち上げ。" },
  { id: "w6", title: "建設業F社 採用サイト＋動画", client: "建設 / 従業員200名", product: "starter", tone: "tone-site", tag: "複合", summary: "Webと動画の世界観を統一し採用広報を強化。" }
];

/* 表示ヘルパ（カタログ/詳細/実績で共用） */
window.PORTAL = {
  yen: function (man) { return man.toLocaleString("ja-JP"); },
  priceHTML: function (p) {
    return '<span class="price"><span class="yen">¥</span><span class="num">' +
      this.yen(p.priceMin) + '</span><span class="yen">万</span><span class="tilde">〜</span></span>';
  },
  byId: function (id) { return (window.PRODUCTS || []).find(function (p) { return p.id === id; }); }
};
