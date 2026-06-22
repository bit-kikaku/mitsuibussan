/* =============================================================
   detail.js — 商品詳細ページのレンダラ（?id= で商品を表示）
   価格・納期・含まれる内容・グレード・FAQ・CTA を必ず表示する。
   ============================================================= */
(function () {
  "use strict";
  var root = document.querySelector("[data-detail]");
  if (!root || !window.PRODUCTS) return;
  var P = window.PORTAL;
  var id = new URLSearchParams(location.search).get("id");
  var p = P.byId(id);

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  if (!p) {
    root.innerHTML = '<section class="section"><div class="container"><div class="empty-state"><strong>商品が見つかりませんでした</strong><a class="btn btn--outline" href="index.html">商品一覧へ戻る</a></div></div></section>';
    return;
  }

  document.title = p.name + "｜採用ツールポータル（仮）";

  var grades = p.grades.map(function (g) {
    return '<div class="grade' + (g.rec ? " is-rec" : "") + '">' +
      '<div class="grade__name">' + esc(g.name) + "</div>" +
      '<div class="grade__price">' + esc(g.price) + "</div>" +
      '<div class="grade__note">' + esc(g.note) + "</div></div>";
  }).join("");

  var incl = p.included.map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("");

  var faqs = p.faqs.map(function (f) {
    return '<div class="faq__item"><button class="faq__q" type="button">' + esc(f.q) +
      '</button><div class="faq__a"><div>' + esc(f.a) + "</div></div></div>";
  }).join("");

  var others = window.PRODUCTS.filter(function (x) { return x.id !== p.id; }).slice(0, 4).map(function (x) {
    return '<a class="work-card" href="detail.html?id=' + x.id + '">' +
      '<div class="work-card__media ph ' + x.tone + '"></div>' +
      '<div class="work-card__body"><span class="work-card__tag">' + esc(x.catLabel) + "</span>" +
      '<p class="work-card__title">' + esc(x.short) + "</p>" +
      '<p class="work-card__client">' + esc(x.delivery) + " ／ " + P.yen(x.priceMin) + "万円〜</p></div></a>";
  }).join("");

  root.innerHTML = '' +
    '<div class="container"><nav class="crumbs" aria-label="パンくず"><a href="../index.html">ホーム</a><span class="sep">/</span><a href="index.html">商品一覧</a><span class="sep">/</span><span>' + esc(p.short) + "</span></nav></div>" +

    '<section class="section section--tight"><div class="container"><div class="pd">' +
      '<div class="pd__gallery">' +
        '<div class="ph-main ph ' + p.tone + '" data-label="SAMPLE"></div>' +
        '<div class="pd__thumbs"><div class="ph ' + p.tone + '"></div><div class="ph tone-gray"></div><div class="ph tone-gray"></div></div>' +
        '<p class="note" style="margin-top:14px">※ 画像はサンプル（プレースホルダー）です。実際の制作サンプルに差し替えます。</p>' +
      "</div>" +
      '<div class="pd__info">' +
        '<span class="pd__cat">' + esc(p.catLabel) + "</span>" +
        '<h1 class="pd__name">' + esc(p.name) + "</h1>" +
        "<p style=\"color:var(--muted)\">" + esc(p.summary) + "</p>" +
        '<div class="pd__price-box">' +
          '<span class="price__label">価格（税別・目安）</span>' + P.priceHTML(p) +
          '<dl class="spec"><dt>納期目安</dt><dd>' + esc(p.delivery) + "</dd>" +
          "<dt>用途</dt><dd>" + esc(p.catLabel) + "</dd></dl>" +
          '<div class="pd__cta">' +
            '<a class="btn btn--primary btn--lg" href="../estimate/?id=' + p.id + '">この商品で見積もる</a>' +
            '<a class="btn btn--outline btn--lg" href="../contact/?product=' + p.id + '">問い合わせる</a>' +
          "</div>" +
        "</div>" +
      "</div>" +
    "</div></div></section>" +

    '<section class="section section--alt"><div class="container" style="max-width:880px">' +
      '<div class="section__head"><p class="eyebrow">Included</p><h2 class="section__title">含まれる内容</h2></div>' +
      '<ul class="incl">' + incl + "</ul>" +
      '<div class="section__head" style="margin-top:38px"><p class="eyebrow">Plans</p><h2 class="section__title">プラン（松竹梅）</h2><p class="section__lead">ご予算と要件にあわせて選べます。金額はサンプルです。</p></div>' +
      '<div class="grades">' + grades + "</div>" +
    "</div></section>" +

    '<section class="section"><div class="container" style="max-width:880px">' +
      '<div class="section__head"><p class="eyebrow">FAQ</p><h2 class="section__title">よくあるご質問</h2></div>' +
      '<div class="faq">' + faqs + "</div>" +
    "</div></section>" +

    '<section class="section section--alt"><div class="container">' +
      '<div class="cta-band"><h2>まずは概算を見てみませんか？</h2><p>3分見積もりで、この商品のざっくり価格と納期がわかります。</p>' +
      '<a class="btn btn--primary btn--lg" href="../estimate/?id=' + p.id + '">3分で見積もる</a></div>' +
    "</div></section>" +

    '<section class="section"><div class="container">' +
      '<div class="section__head"><p class="eyebrow">Other products</p><h2 class="section__title">ほかの採用ツール</h2></div>' +
      '<div class="works-grid">' + others + "</div>" +
    "</div></section>";
})();
