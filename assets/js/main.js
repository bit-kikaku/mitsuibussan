/* =============================================================
   main.js — 共通スクリプト（ユーザビリティ強化版）
   - モバイルナビ開閉（ハンバーガー→×）
   - スクロールリビール
   - FAQ アコーディオン
   - 現在地ナビのハイライト
   - スキップリンク / モバイル追従CTA / ページ上部へ戻る を自動挿入
   - ページ内アンカーのスムーススクロール（ヘッダー分オフセット）
   ============================================================= */
(function () {
  "use strict";
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var BASE = computeBase();

  // reset.css の相対パスからサイトルートまでの接頭辞を推定（"" or "../"）
  function computeBase() {
    var l = document.querySelector('link[href*="reset.css"]');
    if (!l) return "";
    return (l.getAttribute("href") || "").replace(/assets\/css\/reset\.css.*$/, "");
  }

  document.addEventListener("DOMContentLoaded", function () {
    mobileNav();
    reveal();
    faq();
    markCurrentNav();
    injectChrome();
    smoothAnchor();
  });

  function mobileNav() {
    var t = document.querySelector(".nav-toggle"), n = document.querySelector(".gnav");
    if (!t || !n) return;
    function close() { n.classList.remove("is-open"); t.classList.remove("is-open"); t.setAttribute("aria-expanded", "false"); }
    t.addEventListener("click", function () {
      var open = n.classList.toggle("is-open");
      t.classList.toggle("is-open", open);
      t.setAttribute("aria-expanded", String(open));
    });
    n.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", close); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
  }

  function reveal() {
    var els = document.querySelectorAll(".reveal");
    if (!els.length) return;
    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach(function (e) { e.classList.add("in"); }); return;
    }
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    els.forEach(function (e) { io.observe(e); });
  }

  function faq() {
    document.querySelectorAll(".faq__q").forEach(function (q) {
      q.setAttribute("aria-expanded", "false");
      q.addEventListener("click", function () {
        var item = q.closest(".faq__item"), a = item.querySelector(".faq__a");
        var open = item.classList.toggle("is-open");
        q.setAttribute("aria-expanded", String(open));
        a.style.maxHeight = open ? a.scrollHeight + "px" : "0px";
      });
    });
  }

  function markCurrentNav() {
    var path = location.pathname.replace(/index\.html$/, "");
    document.querySelectorAll(".gnav__link").forEach(function (a) {
      var href = a.getAttribute("href") || "";
      if (href && href.indexOf("#") !== 0) {
        var seg = href.replace(/^(\.\.\/)+/, "/").replace(/index\.html$/, "");
        if (seg.length > 1 && path.indexOf(seg) !== -1) a.classList.add("is-current");
      }
    });
  }

  function injectChrome() {
    var body = document.body;

    // スキップリンク
    if (!document.querySelector(".skip-link")) {
      var sk = document.createElement("a");
      sk.className = "skip-link"; sk.href = "#main"; sk.textContent = "本文へスキップ";
      body.insertBefore(sk, body.firstChild);
    }
    var main = document.querySelector("main");
    if (main && !main.id) main.id = "main";

    // モバイル追従CTA（現在ページのCTAは出さない）
    if (!document.querySelector(".mcta")) {
      var p = location.pathname, html = "";
      if (p.indexOf("/estimate/") === -1) html += '<a class="btn btn--outline" href="' + BASE + 'estimate/">3分見積もり</a>';
      if (p.indexOf("/contact/") === -1) html += '<a class="btn btn--primary" href="' + BASE + 'contact/">お問い合わせ</a>';
      if (html) {
        var bar = document.createElement("div"); bar.className = "mcta"; bar.innerHTML = html;
        body.appendChild(bar);
      }
    }

    // ページ上部へ戻る
    var top = document.createElement("button");
    top.className = "to-top"; top.type = "button";
    top.setAttribute("aria-label", "ページ上部へ戻る"); top.innerHTML = "↑";
    body.appendChild(top);
    top.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }); });
    var onScroll = function () { top.classList.toggle("is-show", window.scrollY > 500); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function smoothAnchor() {
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      var id = a.getAttribute("href");
      if (!id || id.length < 2) return;
      a.addEventListener("click", function (e) {
        var el = document.querySelector(id);
        if (!el) return;
        e.preventDefault();
        var y = el.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo({ top: y, behavior: reduce ? "auto" : "smooth" });
        if (el.setAttribute) el.setAttribute("tabindex", "-1");
      });
    });
  }
})();
