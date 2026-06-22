/* =============================================================
   estimate.js — 3分見積もりシミュレーター（簡易版 / クライアント計算）
   ステップ：用途 → 規模 → オプション → 概算結果（＋メール取得）
   計算は商品マスタ(priceMin/priceMax/leadWeeks)＋規模係数＋オプション加算。
   「ざっくり価格感が出る」ことが目的（正確性より公開速度）。
   ============================================================= */
(function () {
  "use strict";
  var root = document.querySelector("[data-sim]");
  if (!root || !window.PRODUCTS) return;

  var PRODUCTS = window.PRODUCTS.filter(function (p) { return p.estimable; });
  var SCALES = window.SIM_SCALES, OPTS = window.SIM_OPTIONS;
  var STEPS = ["用途", "規模", "オプション", "概算結果"];

  var pre = new URLSearchParams(location.search).get("id");
  var state = { step: 0, product: PRODUCTS.some(function (p) { return p.id === pre; }) ? pre : null, scale: null, opts: {} };

  function round5(x) { return Math.round(x / 5) * 5; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  function calc() {
    var p = window.PORTAL.byId(state.product);
    var sc = SCALES.find(function (s) { return s.key === state.scale; }) || SCALES[0];
    var add = 0, wk = 0;
    OPTS.forEach(function (o) { if (state.opts[o.key]) { add += o.add; wk += o.weeks; } });
    var lo = round5(p.priceMin * sc.factor) + add;
    var hi = round5(p.priceMax * sc.factor) + add;
    var weeks = Math.max(1, p.leadWeeks + wk);
    return { p: p, sc: sc, lo: lo, hi: hi, weeks: weeks, add: add };
  }

  function bar() {
    return '<div class="sim__bar">' + STEPS.map(function (s, i) {
      var cls = i === state.step ? "is-active" : (i < state.step ? "is-done" : "");
      return '<div class="stp ' + cls + '">' + (i + 1) + ". " + s + "</div>";
    }).join("") + "</div>";
  }

  function optCard(sel, kind, name, key, desc, plus) {
    return '<label class="opt ' + (sel ? "is-sel" : "") + '">' +
      '<input type="' + kind + '" name="o" value="' + key + '"' + (sel ? " checked" : "") + ">" +
      '<span class="opt__name">' + esc(name) + "</span>" +
      (desc ? '<span class="opt__desc">' + esc(desc) + "</span>" : "") +
      (plus ? '<span class="opt__plus">+' + plus + "万円〜</span>" : "") +
      "</label>";
  }

  function body() {
    if (state.step === 0) {
      return '<p class="sim__q">どの採用ツールをご検討ですか？</p><p class="sim__hint">いちばん近いものを1つ選んでください。</p>' +
        '<div class="opts" data-pick="product">' + PRODUCTS.map(function (p) {
          return optCard(state.product === p.id, "radio", p.short, p.id, p.catLabel + "・" + p.delivery, p.priceMin);
        }).join("") + "</div>";
    }
    if (state.step === 1) {
      return '<p class="sim__q">会社の規模に近いものは？</p><p class="sim__hint">ボリューム感の目安に使います。</p>' +
        '<div class="opts" data-pick="scale">' + SCALES.map(function (s) {
          return optCard(state.scale === s.key, "radio", s.label, s.key, s.desc, "");
        }).join("") + "</div>";
    }
    if (state.step === 2) {
      return '<p class="sim__q">追加したいオプションは？</p><p class="sim__hint">複数選択できます（なしでもOK）。</p>' +
        '<div class="opts" data-pick="opts">' + OPTS.map(function (o) {
          return optCard(!!state.opts[o.key], "checkbox", o.label, o.key, o.desc, o.add);
        }).join("") + "</div>";
    }
    var r = calc();
    return '<div class="sim__result">' +
      '<p class="sim__hint">' + esc(r.p.short) + "／" + esc(r.sc.label) + " の概算です</p>" +
      '<p class="price res-price"><span class="yen">¥</span>' + window.PORTAL.yen(r.lo) +
        '<span class="yen">万</span> <span class="tilde" style="font-size:.4em">〜</span> <span class="yen">¥</span>' +
        window.PORTAL.yen(r.hi) + '<span class="yen">万</span></p>' +
      '<p><span class="delivery res-deli">納期 最短 ' + r.weeks + "週間〜</span></p>" +
      '<p class="note" style="margin-top:18px;text-align:left">これは概算です。条件により変動します。正式なお見積もりは、下記からメールアドレスをご登録いただくか、お問い合わせよりご依頼ください。</p>' +
      '<form class="lead-form" data-lead>' +
        '<input type="email" name="email" placeholder="メールアドレス" required>' +
        '<button class="btn btn--primary" type="submit">詳細見積もりを受け取る</button>' +
      "</form>" +
      '<p style="margin-top:14px"><a class="btn btn--ghost" href="../contact/" >そのまま相談する</a></p>' +
      "</div>";
  }

  function nav() {
    if (state.step === 3) {
      return '<div class="sim__nav"><button class="btn btn--outline" data-back>条件を変える</button>' +
        '<button class="btn btn--outline" data-reset>最初から</button></div>';
    }
    var canNext = (state.step === 0 && state.product) || (state.step === 1 && state.scale) || state.step === 2;
    return '<div class="sim__nav">' +
      (state.step > 0 ? '<button class="btn btn--outline" data-back>戻る</button>' : "<span></span>") +
      '<button class="btn btn--primary" data-next ' + (canNext ? "" : "disabled") + ">" +
      (state.step === 2 ? "概算を見る" : "次へ") + "</button></div>";
  }

  function render() {
    root.innerHTML = bar() + '<div class="sim__body">' + body() + nav() + "</div>";
    wire();
  }

  function wire() {
    var pick = root.querySelector("[data-pick]");
    if (pick) pick.addEventListener("change", function (e) {
      var kind = pick.getAttribute("data-pick"), v = e.target.value;
      if (kind === "product") state.product = v;
      else if (kind === "scale") state.scale = v;
      else state.opts[v] = e.target.checked;
      render();
    });
    var next = root.querySelector("[data-next]"); if (next) next.addEventListener("click", function () { state.step++; render(); window.scrollTo({ top: root.getBoundingClientRect().top + scrollY - 90, behavior: "smooth" }); });
    var back = root.querySelector("[data-back]"); if (back) back.addEventListener("click", function () { state.step = Math.max(0, state.step - 1); render(); });
    var reset = root.querySelector("[data-reset]"); if (reset) reset.addEventListener("click", function () { state = { step: 0, product: null, scale: null, opts: {} }; render(); });
    var lead = root.querySelector("[data-lead]"); if (lead) lead.addEventListener("submit", function (e) {
      e.preventDefault();
      lead.innerHTML = '<p style="color:var(--ok);font-weight:700">✓ 受け付けました（デモ）。担当より詳細見積もりをお送りします。</p>';
    });
  }

  render();
})();
