/* =============================================================
   work-detail.js — 実績詳細（ケーススタディ）レンダラ（?id= で表示）
   課題 → 取り組み → 実施内容 → 成果 → お客様の声 → 関連商品CTA
   ============================================================= */
(function () {
  "use strict";
  var root = document.querySelector("[data-work]");
  if (!root || !window.WORKS) return;
  var P = window.PORTAL;
  var id = new URLSearchParams(location.search).get("id");
  var w = window.WORKS.find(function (x) { return x.id === id; });

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  if (!w) {
    root.innerHTML = '<section class="section"><div class="container"><div class="empty-state"><strong>実績が見つかりませんでした</strong><a class="btn btn--outline" href="index.html">実績一覧へ戻る</a></div></div></section>';
    return;
  }
  document.title = w.title + "｜制作実績｜採用ツールポータル（仮）";

  var prod = P.byId(w.product);
  var scope = w.scope.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("");
  var stats = w.results.map(function (r) {
    return '<div class="cs-stat"><span class="cs-stat__val">' + esc(r.value) + '</span><span class="cs-stat__label">' + esc(r.label) + "</span></div>";
  }).join("");
  var others = window.WORKS.filter(function (x) { return x.id !== w.id; }).slice(0, 3).map(function (x) {
    return '<a class="work-card" href="detail.html?id=' + x.id + '">' +
      '<div class="work-card__media ph ' + x.tone + '" data-label="WORK"></div>' +
      '<div class="work-card__body"><span class="work-card__tag">' + esc(x.tag) + "</span>" +
      '<p class="work-card__title">' + esc(x.title) + "</p>" +
      '<p class="work-card__client">' + esc(x.client) + "</p></div></a>";
  }).join("");

  var related = prod ? (
    '<div class="cta-band"><p class="eyebrow" style="color:#9fc0ff;justify-content:center">Used product</p>' +
    "<h2>この実績は「" + esc(prod.short) + "」で制作しました</h2>" +
    "<p>同じ商品の内容・価格・納期を確認できます。</p>" +
    '<div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:1.2em">' +
    '<a class="btn btn--primary btn--lg" href="../products/detail.html?id=' + prod.id + '">商品の詳細を見る</a>' +
    '<a class="btn btn--outline btn--lg" style="background:rgba(255,255,255,.1);color:#fff;border-color:rgba(255,255,255,.4)" href="../estimate/?id=' + prod.id + '">この内容で見積もる</a>' +
    "</div></div>"
  ) : "";

  root.innerHTML = '' +
    '<div class="container"><nav class="crumbs" aria-label="パンくず"><a href="../index.html">ホーム</a><span class="sep">/</span><a href="index.html">実績</a><span class="sep">/</span><span>' + esc(w.title) + "</span></nav></div>" +

    '<section class="section section--tight"><div class="container">' +
      '<div class="cs-head">' +
        '<span class="work-card__tag">' + esc(w.tag) + "</span>" +
        '<h1 class="cs-title">' + esc(w.title) + "</h1>" +
        '<dl class="cs-meta"><div><dt>業種</dt><dd>' + esc(w.industry) + "</dd></div>" +
          "<div><dt>規模</dt><dd>" + esc(w.scale) + "</dd></div>" +
          "<div><dt>実施年</dt><dd>" + esc(w.year) + "</dd></div>" +
          "<div><dt>使用商品</dt><dd>" + (prod ? esc(prod.short) : esc(w.tag)) + "</dd></div></dl>" +
      "</div>" +
      '<div class="ph ' + w.tone + ' cs-hero" data-label="SAMPLE"></div>' +
      '<p class="note" style="margin-top:12px">※ 画像・社名・数値はサンプルです。実際の実績に差し替えます（社名は匿名表記も可）。</p>' +
    "</div></section>" +

    '<section class="section"><div class="container cs-narrow">' +
      '<div class="cs-twocol">' +
        '<div class="cs-block"><h2 class="cs-h">課題</h2><p>' + esc(w.challenge) + "</p></div>" +
        '<div class="cs-block"><h2 class="cs-h">取り組み</h2><p>' + esc(w.solution) + "</p></div>" +
      "</div>" +
      '<h2 class="cs-h" style="margin-top:34px">実施内容</h2><ul class="incl" style="margin-top:10px">' + scope + "</ul>" +
      '<h2 class="cs-h" style="margin-top:34px">成果（サンプル）</h2><div class="cs-stats">' + stats + "</div>" +
      '<blockquote class="cs-quote"><p>' + esc(w.quote.text) + '</p><cite>' + esc(w.quote.author) + "</cite></blockquote>" +
    "</div></section>" +

    '<section class="section section--alt"><div class="container cs-narrow">' + related + "</div></section>" +

    '<section class="section"><div class="container">' +
      '<div class="section__head" style="display:flex;justify-content:space-between;align-items:flex-end;gap:16px;flex-wrap:wrap"><div><p class="eyebrow">Other works</p><h2 class="section__title">ほかの実績</h2></div><a class="btn btn--ghost" href="index.html">実績一覧</a></div>' +
      '<div class="works-grid">' + others + "</div>" +
    "</div></section>";
})();
