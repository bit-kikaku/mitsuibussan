/* =============================================================
   main.js — 共通スクリプト
   - モバイルナビ開閉
   - スクロールリビール
   - FAQ アコーディオン
   - 現在地ナビのハイライト
   ============================================================= */
(function () {
  "use strict";
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.addEventListener("DOMContentLoaded", function () {
    mobileNav();
    reveal();
    faq();
    markCurrentNav();
  });

  function mobileNav() {
    var t = document.querySelector(".nav-toggle"), n = document.querySelector(".gnav");
    if (!t || !n) return;
    t.addEventListener("click", function () {
      var open = n.classList.toggle("is-open");
      t.setAttribute("aria-expanded", String(open));
    });
    n.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { n.classList.remove("is-open"); });
    });
  }

  function reveal() {
    var els = document.querySelectorAll(".reveal");
    if (!els.length) return;
    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach(function (e) { e.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    els.forEach(function (e) { io.observe(e); });
  }

  function faq() {
    document.querySelectorAll(".faq__q").forEach(function (q) {
      q.addEventListener("click", function () {
        var item = q.closest(".faq__item");
        var a = item.querySelector(".faq__a");
        var open = item.classList.toggle("is-open");
        a.style.maxHeight = open ? a.scrollHeight + "px" : "0px";
      });
    });
  }

  function markCurrentNav() {
    var path = location.pathname.replace(/index\.html$/, "");
    document.querySelectorAll(".gnav__link").forEach(function (a) {
      var href = a.getAttribute("href") || "";
      // セクション内の先頭一致でカレント判定
      if (href && href !== "/" && !href.startsWith("#")) {
        var seg = href.replace(/^(\.\.\/)+/, "/").replace(/index\.html$/, "");
        if (seg.length > 1 && path.indexOf(seg) !== -1) a.classList.add("is-current");
      }
    });
  }
})();
