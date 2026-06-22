/* =============================================================
   catalog.js — 商品棚（カタログ）の描画・絞り込み・並べ替え
   - [data-catalog]      … 一覧ページ（チップ＋並べ替え＋件数）
   - [data-featured]     … トップ等の抜粋表示（data-limit で件数）
   data-base 属性で詳細ページへの相対パスを切替（例 "products/"）。
   ============================================================= */
(function () {
  "use strict";
  var P = window.PRODUCTS || [], CATS = window.CATEGORIES || [];

  function cardHTML(p, base) {
    var href = base + "detail.html?id=" + p.id;
    var rank = p.popular ? '<span class="pcard__rank">人気No.' + p.popular + "</span>" : "";
    return '' +
      '<article class="pcard reveal">' +
        '<a class="pcard__media" href="' + href + '" aria-label="' + esc(p.name) + 'の詳細">' +
          '<span class="pcard__img ' + p.tone + '"></span>' +
          '<span class="pcard__cat">' + esc(p.catLabel) + "</span>" + rank +
        "</a>" +
        '<div class="pcard__body">' +
          '<h3 class="pcard__name"><a href="' + href + '">' + esc(p.name) + "</a></h3>" +
          '<p class="pcard__tagline">' + esc(p.tagline) + "</p>" +
          '<div class="pcard__meta">' +
            "<div><span class=\"price__label\">価格（税別・目安）</span>" + window.PORTAL.priceHTML(p) + "</div>" +
            '<span class="delivery">' + esc(p.delivery) + "</span>" +
          "</div>" +
        "</div>" +
        '<div class="pcard__foot"><a class="btn btn--outline btn--block" href="' + href + '">詳しく見る</a></div>' +
      "</article>";
  }

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  function renderInto(el, list, base) {
    el.innerHTML = list.map(function (p) { return cardHTML(p, base); }).join("");
    // 動的に挿入したカードのリビールを起動
    el.querySelectorAll(".reveal").forEach(function (e) { e.classList.add("in"); });
  }

  function sortList(list, mode) {
    var l = list.slice();
    if (mode === "price") l.sort(function (a, b) { return a.priceMin - b.priceMin; });
    else if (mode === "delivery") l.sort(function (a, b) { return a.leadWeeks - b.leadWeeks; });
    else l.sort(function (a, b) { return (a.popular || 99) - (b.popular || 99); });
    return l;
  }

  function initFeatured() {
    document.querySelectorAll("[data-featured]").forEach(function (el) {
      var base = el.getAttribute("data-base") || "";
      var limit = parseInt(el.getAttribute("data-limit") || "0", 10);
      var list = sortList(P, "popular");
      if (limit > 0) list = list.slice(0, limit);
      renderInto(el, list, base);
    });
  }

  function initCatalog() {
    var el = document.querySelector("[data-catalog]");
    if (!el) return;
    var base = el.getAttribute("data-base") || "";
    var chipsWrap = document.querySelector("[data-chips]");
    var sortSel = document.querySelector("[data-sort]");
    var countEl = document.querySelector("[data-count]");
    var current = (location.hash || "").replace("#", "") || "all";
    if (!CATS.some(function (c) { return c.key === current; })) current = "all";

    function countFor(key) {
      if (key === "all") return P.length;
      return P.filter(function (p) { return p.cats.indexOf(key) !== -1; }).length;
    }
    if (chipsWrap) {
      chipsWrap.innerHTML = CATS.map(function (c) {
        return '<button class="chip" data-cat="' + c.key + '">' + c.label +
          '<span class="chip__count">' + countFor(c.key) + "</span></button>";
      }).join("");
    }

    function apply() {
      var list = current === "all" ? P.slice() : P.filter(function (p) { return p.cats.indexOf(current) !== -1; });
      list = sortList(list, sortSel ? sortSel.value : "popular");
      if (list.length) renderInto(el, list, base);
      else el.innerHTML = '<div class="empty-state" style="grid-column:1/-1"><strong>準備中のカテゴリです</strong>このカテゴリの商品は近日公開予定です。お急ぎの場合はお問い合わせください。</div>';
      if (countEl) countEl.innerHTML = "<b>" + list.length + "</b> 件の商品";
      if (chipsWrap) chipsWrap.querySelectorAll(".chip").forEach(function (b) {
        b.classList.toggle("is-active", b.getAttribute("data-cat") === current);
      });
    }

    if (chipsWrap) chipsWrap.addEventListener("click", function (e) {
      var b = e.target.closest(".chip"); if (!b) return;
      current = b.getAttribute("data-cat");
      history.replaceState(null, "", "#" + current);
      apply();
    });
    if (sortSel) sortSel.addEventListener("change", apply);
    apply();
  }

  document.addEventListener("DOMContentLoaded", function () {
    if (!window.PRODUCTS) return;
    initFeatured();
    initCatalog();
  });
})();
