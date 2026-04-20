(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function ph(w, h) {
    return "https://placehold.jp/" + w + "x" + h + ".png";
  }

  function qs(sel, ctx) {
    return (ctx || document).querySelector(sel);
  }

  function qsa(sel, ctx) {
    return Array.prototype.slice.call((ctx || document).querySelectorAll(sel));
  }

  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  if (typeof gsap === "undefined") {
    return;
  }

  gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

  /** 由 initZoomLightbox 赋值；在此之前调用为空操作 */
  var openZoomLightbox = function () {};

  /** 由 initVideoHubModal 赋值：站内放大播放 B 站视频 */
  var openVideoHubModal = function () {};

  var BRAND = [
    "images/品牌/2022-2.0-4.webp",
    "images/品牌/2022-2.0-5.webp",
    "images/品牌/2022-2.0-6.webp",
    "images/品牌/2022-2.0-7.webp",
    "images/品牌/2022-2.0-8.webp",
    "images/品牌/2022-2.0-9.webp",
    "images/品牌/2022-2.0-10.webp",
    "images/品牌/2022-2.0-11.webp",
  ];

  var GRAPHIC = [];
  for (var gi = 1; gi <= 9; gi++) {
    GRAPHIC.push("images/平面/" + gi + ".webp");
  }
  var OPS = [];
  for (var oi = 1; oi <= 9; oi++) {
    OPS.push("images/运营/" + oi + ".webp");
  }

  var DETAIL = [];
  for (var di = 1; di <= 5; di++) {
    DETAIL.push("images/详情页/" + di + ".webp");
  }

  var ARROW_CARDS = [
    { img: ph(720, 480), name: "Project Alpha", href: "#" },
    { img: ph(740, 500), name: "Project Beta", href: "#" },
    { img: ph(700, 460), name: "Project Gamma", href: "#" },
    { img: ph(760, 510), name: "Project Delta", href: "#" },
    { img: ph(710, 470), name: "Project Epsilon", href: "#" },
    { img: ph(730, 490), name: "Project Zeta", href: "#" },
  ];

  function headerOffset() {
    var header = document.querySelector(".site-header");
    return header ? header.getBoundingClientRect().height + 8 : 72;
  }

  function initScrollLinks() {
    qsa('a[href^="#"]').forEach(function (link) {
      var id = link.getAttribute("href");
      if (!id || id === "#") return;
      var target = document.querySelector(id);
      if (!target) return;
      link.addEventListener("click", function (e) {
        e.preventDefault();
        gsap.to(window, {
          duration: prefersReducedMotion ? 0.01 : 1.05,
          ease: "power3.inOut",
          scrollTo: { y: target, offsetY: headerOffset(), autoKill: true },
        });
      });
    });
  }

  /** Featured creators：双排静态缩略图，点击仍走全站 lightbox */
  function initMarqueeCreators() {
    var viewport = qs("[data-marquee-viewport]");
    var row1 = qs(".marquee-row-1");
    var row2 = qs(".marquee-row-2");
    if (!row1 || !row2) return;

    var ROW1_ITEMS_PER_SET = 15;
    var ROW2_ITEMS_PER_SET = 13;
    /** 与客户区视觉条：images/logo 下导出图，文件名含序号 1 (1)…1 (28) */
    var LOGO_FILENAMES = [
      "1 (1).png",
      "1 (2).png",
      "1 (3).png",
      "1 (4).png",
      "1 (5).png",
      "1 (6).png",
      "1 (7).png",
      "1 (8).png",
      "1 (9).png",
      "1 (10).png",
      "1 (11).png",
      "1 (12).png",
      "1 (13).png",
      "1 (14).png",
      "1 (15).png",
      "1 (16).png",
      "1 (17).png",
      "1 (18).png",
      "1 (19).png",
      "1 (20).png",
      "1 (21).png",
      "1 (22).png",
      "1 (23).png",
      "1 (24).png",
      "1 (25).png",
      "1 (26).png",
      "1 (27).png",
      "1 (28).png",
    ];
    var CREATOR_IMAGES = LOGO_FILENAMES.map(function (name) {
      return "images/logo/" + encodeURIComponent(name);
    });

    function fillRowWithIcons(row, startIndex, count) {
      row.textContent = "";
      for (var i = 0; i < count; i++) {
        var item = document.createElement("article");
        item.className = "marquee-item";
        var box = document.createElement("div");
        box.className = "image-box";
        var img = document.createElement("img");
        var idx = startIndex + i;
        if (idx >= CREATOR_IMAGES.length) {
          idx = idx % CREATOR_IMAGES.length;
        }
        img.src = CREATOR_IMAGES[idx];
        img.alt = "";
        img.draggable = false;
        img.style.cursor = "zoom-in";
        box.appendChild(img);
        item.appendChild(box);
        row.appendChild(item);
      }
    }

    /* 上一行 15 + 下一行 13 = 28 格，与 28 张 logo 一一对应不重复 */
    fillRowWithIcons(row1, 0, ROW1_ITEMS_PER_SET);
    fillRowWithIcons(row2, ROW1_ITEMS_PER_SET, ROW2_ITEMS_PER_SET);

    var featuredLbItems = CREATOR_IMAGES.map(function (s, i) {
      return { src: s, alt: "合作品牌 " + (i + 1) };
    });
    if (viewport) {
      viewport.addEventListener("click", function (e) {
        var im = e.target.closest(".marquee-item img");
        if (!im || !viewport.contains(im)) return;
        e.stopPropagation();
        openZoomLightbox(im.src, "合作品牌", featuredLbItems);
      });
    }
  }

  function buildArrowSlider() {
    var track = qs("[data-arrow-slider-track]");
    var prev = qs("[data-arrow-slider-prev]");
    var next = qs("[data-arrow-slider-next]");
    if (!track || !prev || !next) return;

    var arrowLbItems = ARROW_CARDS.map(function (c) {
      return { src: c.img, alt: c.name };
    });
    ARROW_CARDS.forEach(function (c) {
      var card = document.createElement("div");
      card.className = "arrow-slider__card";
      var a = document.createElement("a");
      a.href = c.href;
      a.className = "arrow-slider__link";
      var img = document.createElement("img");
      img.src = c.img;
      img.alt = "";
      img.style.cursor = "zoom-in";
      img.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        openZoomLightbox(c.img, c.name, arrowLbItems);
      });
      var foot = document.createElement("div");
      foot.className = "arrow-slider__foot";
      var name = document.createElement("span");
      name.className = "arrow-slider__name";
      name.textContent = c.name;
      var ghost = document.createElement("span");
      ghost.className = "ghost-btn";
      ghost.textContent = "Sprint with me →";
      foot.appendChild(name);
      foot.appendChild(ghost);
      a.appendChild(img);
      a.appendChild(foot);
      card.appendChild(a);
      track.appendChild(card);
    });

    var index = 0;
    var cards = track.children.length;

    function step() {
      index = ((index % cards) + cards) % cards;
      var cardW = track.children[0]
        ? track.children[0].getBoundingClientRect().width + 16
        : 300;
      gsap.to(track, {
        x: -index * cardW,
        duration: 0.55,
        ease: "power3.out",
      });
    }

    prev.addEventListener("click", function () {
      index--;
      if (index < 0) index = cards - 1;
      step();
    });
    next.addEventListener("click", function () {
      index++;
      if (index >= cards) index = 0;
      step();
    });

    window.addEventListener("resize", step);
    step();
  }

  function buildBrandCarousel() {
    var track = qs("[data-brand-track]");
    var vp = document.querySelector("[data-brand-carousel] .brand-carousel__viewport");
    var prev = qs("[data-brand-prev]");
    var next = qs("[data-brand-next]");
    if (!track || !vp) return;

    var brandLbItems = BRAND.map(function (src, ii) {
      return { src: src, alt: "品牌案例 " + (ii + 1) };
    });

    BRAND.forEach(function (src, i) {
      var slide = document.createElement("div");
      slide.className = "brand-carousel__slide";
      var img = document.createElement("img");
      img.src = src;
      img.alt = "品牌案例 " + (i + 1);
      img.style.cursor = "zoom-in";
      slide.appendChild(img);
      track.appendChild(slide);
    });

    var ix = 0;
    var n = BRAND.length;
    var dragging = false;
    var startX = 0;
    var startIx = 0;
    var dragDx = 0;
    var lastBrandDragAbs = 0;
    /** capture 子节点上的 click 常丢失，用 pointerdown 目标 + 短位移判定轻触放大 */
    var brandPointerTarget = null;
    var autoTimer;

    function applyTransform(px, withTransition) {
      track.style.transition = withTransition
        ? "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)"
        : "none";
      track.style.transform = "translate3d(" + px + "px,0,0)";
    }

    function slideWidth() {
      return vp.clientWidth;
    }

    function go(to, withTransition) {
      ix = ((to % n) + n) % n;
      applyTransform(-ix * slideWidth(), withTransition !== false);
    }

    function goDelta(d) {
      go(ix + d, true);
    }

    function startAuto() {
      if (prefersReducedMotion) return;
      clearInterval(autoTimer);
      autoTimer = setInterval(function () {
        if (!dragging) goDelta(1);
      }, 4200);
    }

    function navPointerStop(e) {
      e.stopPropagation();
    }
    if (prev) {
      prev.addEventListener("pointerdown", navPointerStop);
      prev.addEventListener("click", function (e) {
        e.stopPropagation();
        goDelta(-1);
        startAuto();
      });
    }
    if (next) {
      next.addEventListener("pointerdown", navPointerStop);
      next.addEventListener("click", function (e) {
        e.stopPropagation();
        goDelta(1);
        startAuto();
      });
    }

    vp.addEventListener("pointerdown", function (e) {
      if (e.target && e.target.closest && e.target.closest(".brand-carousel__nav")) {
        return;
      }
      brandPointerTarget = e.target;
      dragging = true;
      startX = e.clientX;
      startIx = ix;
      dragDx = 0;
      try {
        vp.setPointerCapture(e.pointerId);
      } catch (err) {}
      vp.classList.add("is-dragging");
    });

    vp.addEventListener("pointermove", function (e) {
      if (!dragging) return;
      dragDx = e.clientX - startX;
      applyTransform(-startIx * slideWidth() + dragDx, false);
    });

    function endDrag() {
      if (!dragging) return;
      dragging = false;
      vp.classList.remove("is-dragging");
      lastBrandDragAbs = Math.abs(dragDx);
      if (Math.abs(dragDx) > 60) {
        go(startIx + (dragDx < 0 ? 1 : -1), true);
      } else {
        go(startIx, true);
        if (lastBrandDragAbs <= 14 && brandPointerTarget) {
          var tapImg = brandPointerTarget.closest
            ? brandPointerTarget.closest("img")
            : null;
          if (!tapImg && brandPointerTarget.tagName === "IMG") {
            tapImg = brandPointerTarget;
          }
          if (tapImg && track.contains(tapImg)) {
            openZoomLightbox(tapImg.src, tapImg.alt || "", brandLbItems);
          }
        }
      }
      brandPointerTarget = null;
      dragDx = 0;
      startAuto();
    }

    vp.addEventListener("pointerup", endDrag);
    vp.addEventListener("pointercancel", endDrag);

    window.addEventListener("resize", function () {
      go(ix, false);
    });

    window.addEventListener("load", function () {
      go(ix, false);
    });

    go(0, false);
    startAuto();
  }

  function initHGallery(id, urls) {
    var track = qs('[data-hg-track="' + id + '"]');
    var prev = qs('[data-hg-prev="' + id + '"]');
    var next = qs('[data-hg-next="' + id + '"]');
    if (!track) return;

    var hgLbItems = urls.map(function (s, ii) {
      return { src: s, alt: id + " 作品 " + (ii + 1) };
    });
    urls.forEach(function (src, i) {
      var item = document.createElement("div");
      item.className = "h-gallery__item";
      var img = document.createElement("img");
      img.src = src;
      img.alt = id + " 作品 " + (i + 1);
      img.style.cursor = "zoom-in";
      img.addEventListener("click", function (e) {
        e.stopPropagation();
        openZoomLightbox(src, img.alt, hgLbItems);
      });
      item.appendChild(img);
      track.appendChild(item);
    });

    var index = 0;

    function slide() {
      var parent = track.parentElement;
      if (!parent || !track.children[0]) return;
      var step = track.children[0].getBoundingClientRect().width + 16;
      var maxScroll = Math.max(0, track.scrollWidth - parent.clientWidth);
      var x = Math.min(index * step, maxScroll);
      gsap.to(track, { x: -x, duration: 0.5, ease: "power3.out" });
    }

    if (prev)
      prev.addEventListener("click", function () {
        index = Math.max(0, index - 1);
        slide();
      });
    if (next)
      next.addEventListener("click", function () {
        var maxIdx = Math.max(0, track.children.length - 1);
        index++;
        if (index > maxIdx) index = 0;
        slide();
      });

    window.addEventListener("resize", slide);
    window.addEventListener("load", slide);
    slide();
  }

  function initZoomLightbox() {
    var lb = qs("[data-lightbox]");
    var stage = qs("[data-lightbox-stage]");
    var frame = qs("[data-lightbox-frame]");
    var imgEl = qs("[data-lightbox-img]");
    var btnClose = qs("[data-lightbox-close]");
    var btnIn = qs("[data-lightbox-zoom-in]");
    var btnOut = qs("[data-lightbox-zoom-out]");
    var btnReset = qs("[data-lightbox-zoom-reset]");
    if (!lb || !stage || !frame || !imgEl) return;

    var state = { scale: 1, tx: 0, ty: 0, min: 0.2, max: 6 };
    var panning = false;
    var panPid = null;
    var sx = 0;
    var sy = 0;
    var stx = 0;
    var sty = 0;
    var lastPanTravel = 0;
    /** @type {{ src: string, alt: string }[]} */
    var lbItems = [];
    var lbIndex = 0;

    function applyTransform() {
      var s = Math.round(state.scale * 1000) / 1000;
      frame.style.transform =
        "translate3d(calc(-50% + " +
        state.tx +
        "px), calc(-50% + " +
        state.ty +
        "px), 0) scale(" +
        s +
        ")";
    }

    function resetView() {
      state.scale = 1;
      state.tx = 0;
      state.ty = 0;
      applyTransform();
    }

    function syncGalleryChrome() {
      stage.classList.toggle("is-gallery", lbItems.length > 1);
    }

    function showLbSlide() {
      var cur = lbItems[lbIndex];
      if (!cur || !cur.src) return;
      resetView();
      imgEl.alt = cur.alt || "";
      imgEl.decoding = "sync";
      if ("fetchPriority" in imgEl) imgEl.fetchPriority = "high";
      imgEl.src = cur.src;
    }

    function lbGo(delta) {
      if (!lbItems.length || lbItems.length <= 1) return;
      lbIndex = (lbIndex + delta + lbItems.length) % lbItems.length;
      showLbSlide();
    }

    function closeLb() {
      lb.hidden = true;
      document.body.style.overflow = "";
      resetView();
      imgEl.removeAttribute("src");
      lbItems = [];
      lbIndex = 0;
      syncGalleryChrome();
    }

    /** @param gallery 可选：同套大图列表，用于左右半区 / 方向键切上一张下一张 */
    function openLb(src, alt, gallery) {
      if (!src) return;
      if (gallery && gallery.length) {
        lbItems = gallery.map(function (entry) {
          if (typeof entry === "string") {
            return { src: entry, alt: alt || "" };
          }
          return { src: entry.src, alt: entry.alt || "" };
        });
        var found = -1;
        for (var j = 0; j < lbItems.length; j++) {
          if (lbItems[j].src === src) {
            found = j;
            break;
          }
        }
        lbIndex = found >= 0 ? found : 0;
      } else {
        lbItems = [{ src: src, alt: alt || "" }];
        lbIndex = 0;
      }
      syncGalleryChrome();
      showLbSlide();
      lb.hidden = false;
      document.body.style.overflow = "hidden";
    }

    openZoomLightbox = openLb;

    function zoomBy(factor) {
      state.scale = Math.min(state.max, Math.max(state.min, state.scale * factor));
      applyTransform();
    }

    if (btnIn) btnIn.addEventListener("click", function () { zoomBy(1.15); });
    if (btnOut) btnOut.addEventListener("click", function () { zoomBy(1 / 1.15); });
    if (btnReset) btnReset.addEventListener("click", resetView);

    stage.addEventListener(
      "wheel",
      function (e) {
        if (lb.hidden) return;
        e.preventDefault();
        var out = e.deltaY > 0;
        zoomBy(out ? 0.9 : 1 / 0.9);
      },
      { passive: false }
    );

    stage.addEventListener("pointerdown", function (e) {
      if (lb.hidden) return;
      if (e.button !== 0) return;
      var t = e.target;
      if (t.closest("[data-lightbox-close]") || t.closest(".lightbox__toolbar")) return;
      lastPanTravel = 0;
      panning = true;
      stage.classList.add("is-panning");
      sx = e.clientX;
      sy = e.clientY;
      stx = state.tx;
      sty = state.ty;
      panPid = e.pointerId;
      try {
        stage.setPointerCapture(e.pointerId);
      } catch (err) {}
    });

    stage.addEventListener("pointermove", function (e) {
      if (!panning || e.pointerId !== panPid) return;
      state.tx = stx + (e.clientX - sx);
      state.ty = sty + (e.clientY - sy);
      applyTransform();
    });

    function endPan(e) {
      if (!panning) return;
      if (e && e.pointerId !== panPid) return;
      lastPanTravel = e
        ? Math.abs(e.clientX - sx) + Math.abs(e.clientY - sy)
        : 0;
      panning = false;
      panPid = null;
      stage.classList.remove("is-panning");
      if (e) {
        try {
          stage.releasePointerCapture(e.pointerId);
        } catch (err2) {}
      }
    }

    stage.addEventListener("pointerup", endPan);
    stage.addEventListener("pointercancel", endPan);

    if (btnClose) btnClose.addEventListener("click", closeLb);

    stage.addEventListener("click", function (e) {
      if (lb.hidden || lbItems.length <= 1) return;
      if (e.target.closest(".lightbox__toolbar") || e.target.closest("[data-lightbox-close]")) return;
      if (lastPanTravel > 14) return;
      var rect = stage.getBoundingClientRect();
      var mid = rect.left + rect.width * 0.5;
      if (e.clientX < mid) lbGo(-1);
      else lbGo(1);
    });

    lb.addEventListener("click", function (e) {
      if (e.target === lb) closeLb();
    });

    document.addEventListener("keydown", function (e) {
      if (lb.hidden) return;
      if (e.key === "Escape") {
        closeLb();
        return;
      }
      if (lbItems.length > 1 && (e.key === "ArrowLeft" || e.key === "ArrowRight")) {
        e.preventDefault();
        lbGo(e.key === "ArrowLeft" ? -1 : 1);
        return;
      }
      if (e.key === "+" || e.key === "=") {
        e.preventDefault();
        zoomBy(1.12);
      }
      if (e.key === "-" || e.key === "_") {
        e.preventDefault();
        zoomBy(1 / 1.12);
      }
      if (e.key === "0") {
        resetView();
      }
    });

    applyTransform();
  }

  function buildDetail() {
    var grid = qs("[data-detail-grid]");
    if (!grid) return;

    var detailLbItems = DETAIL.map(function (s, ii) {
      return { src: s, alt: "详情页 " + (ii + 1) };
    });
    DETAIL.forEach(function (src, i) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "detail-strip__thumb";
      var img = document.createElement("img");
      img.src = src;
      img.alt = "详情页 " + (i + 1);
      btn.appendChild(img);
      btn.addEventListener("click", function () {
        openZoomLightbox(src, img.alt, detailLbItems);
      });
      grid.appendChild(btn);
    });
  }

  function initResumeModal() {
    var openBtn = qs("[data-resume-open]");
    var modal = qs("[data-resume-modal]");
    var closeEls = qsa("[data-resume-close]", modal || document);
    var stage = modal && qs("[data-resume-stage]", modal);
    if (!openBtn || !modal || !closeEls.length || !stage) return;
    var closeTimer = null;

    function openModal() {
      if (closeTimer) {
        clearTimeout(closeTimer);
        closeTimer = null;
      }
      modal.hidden = false;
      requestAnimationFrame(function () {
        modal.classList.add("is-open");
      });
      stage.scrollTop = 0;
      document.body.style.overflow = "hidden";
    }

    function closeModal() {
      modal.classList.remove("is-open");
      closeTimer = setTimeout(function () {
        modal.hidden = true;
        document.body.style.overflow = "";
      }, 220);
    }

    openBtn.addEventListener("click", openModal);
    closeEls.forEach(function (el) {
      el.addEventListener("click", closeModal);
    });
    stage.addEventListener(
      "wheel",
      function (e) {
        if (modal.hidden) return;
        e.preventDefault();
        stage.scrollTop += e.deltaY;
      },
      { passive: false }
    );
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !modal.hidden) closeModal();
    });
  }

  function bilibiliEmbedSrc(row, withAutoplay) {
    var u =
      "https://player.bilibili.com/player.html?isOutside=true&aid=" +
      row.aid +
      "&bvid=" +
      encodeURIComponent(row.bvid) +
      "&cid=" +
      row.cid +
      "&p=1&high_quality=1&danmaku=0";
    if (withAutoplay) u += "&autoplay=1";
    return u;
  }

  /** 本地封面：优先 item.cover，否则 images/video-covers/1.jpg … 10.jpg 与视频顺序一一对应 */
  function videoCardCoverPath(item, index) {
    if (item.cover) return item.cover;
    return "images/video-covers/" + (index + 1) + ".jpg";
  }

  function initVideoHubModal() {
    var root = qs("[data-video-hub-modal]");
    var iframe = root && qs("[data-video-hub-modal-iframe]", root);
    var titleEl = root && qs("[data-video-hub-modal-title]", root);
    var ledeEl = root && qs("[data-video-hub-modal-lede]", root);
    if (!root || !iframe || !titleEl || !ledeEl) return;

    function closeHubModal() {
      root.hidden = true;
      document.body.style.overflow = "";
      iframe.removeAttribute("src");
      iframe.setAttribute("title", "");
      ledeEl.textContent = "";
      ledeEl.hidden = true;
    }

    function openHubModal(payload) {
      if (!payload || !payload.row) return;
      titleEl.textContent = payload.title || "";
      var sum = String(payload.summary || "").trim();
      ledeEl.textContent = sum;
      ledeEl.hidden = !sum;
      iframe.setAttribute("title", (payload.title || "视频") + " — Bilibili");
      iframe.setAttribute(
        "allow",
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
      );
      iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
      iframe.src = bilibiliEmbedSrc(payload.row, true);
      root.hidden = false;
      document.body.style.overflow = "hidden";
    }

    openVideoHubModal = openHubModal;

    qsa("[data-video-hub-modal-close]", root).forEach(function (el) {
      el.addEventListener("click", function (e) {
        e.preventDefault();
        closeHubModal();
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !root.hidden) closeHubModal();
    });
  }

  function buildVideoHub() {
    var grid = qs("[data-video-grid]");
    if (!grid) return;

    /** 站外播放器：高清 + 默认关弹幕（URL 参数） */
    var biliRows = [
      { bvid: "BV1ofdRBdEzx", aid: "116429919618634", cid: "37632674478" },
      { bvid: "BV1ofdRBdEtp", aid: "116429919618251", cid: "37632806458" },
      { bvid: "BV1ofdRBdEx7", aid: "116429919619916", cid: "37632674211" },
      { bvid: "BV1ofdRBdEHF", aid: "116429919619653", cid: "37632674504" },
      { bvid: "BV1vfdRBREZk", aid: "116429919882306", cid: "37632674616" },
      { bvid: "BV19TddBnEgR", aid: "116429902840002", cid: "37632674521" },
      { bvid: "BV1YTddBHEmF", aid: "116429902973887", cid: "37632675036" },
      { bvid: "BV1XMddBSEi2", aid: "116429886063324", cid: "37632609598" },
      { bvid: "BV114dZBLEs5", aid: "116430456490621", cid: "37635819400" },
      { bvid: "BV15NddBXE45", aid: "116429852573737", cid: "37632215799" },
    ];

    var items = [
      {
        cat: "event",
        title: "活动推广混剪",
        summary: "珍爱网活动推广内容",
      },
      {
        cat: "product",
        title: "温氏土鸡产品种草",
        summary: "小红书渠道电商混剪",
      },
      {
        cat: "tool",
        title: "闲鱼内容二创",
        summary: "小红书渠道闲鱼推广",
      },
      {
        cat: "tool",
        title: "YOWA云游戏广告",
        summary: "YOWA云游戏广告爆款素材，月总消耗120w+。",
      },
      {
        cat: "talk",
        title: "现在生娃是反向抄底?",
        summary: "客户口播内容",
      },
      {
        cat: "talk",
        title: "不交社保！是输了还是赚了？",
        summary: "客户口播内容",
      },
      {
        cat: "talk",
        title: "保险不再保险?上亿人要被收割?",
        summary: "客户口播内容",
      },
      {
        cat: "product",
        title: "温氏土鸡产品种草",
        summary: "小红书渠道电商混剪",
      },
      {
        cat: "tool",
        title: "闲鱼内容二创",
        summary: "小红书爆款视频，点赞2w+",
      },
      {
        cat: "tool",
        title: "闲鱼内容二创",
        summary: "小红书渠道闲鱼推广",
      },
    ];

    var catLabel = {
      product: "产品视频",
      talk: "口播内容",
      event: "活动宣传",
      tool: "工具推广",
    };

    items.forEach(function (item, i) {
      var row = biliRows[i];
      if (!row) return;

      var card = document.createElement("article");
      card.className = "v-card";
      card.dataset.cat = item.cat;

      var media = document.createElement("div");
      media.className = "v-card__media";
      var badge = document.createElement("span");
      badge.className = "v-card__badge";
      badge.textContent = "Bilibili";

      var videoBox = document.createElement("div");
      videoBox.className = "v-card__video-box";

      var cover = document.createElement("img");
      cover.className = "v-card__cover";
      cover.alt = "";
      cover.loading = "lazy";
      cover.decoding = "async";
      cover.draggable = false;
      cover.src = videoCardCoverPath(item, i);
      cover.addEventListener("error", function () {
        if (cover.dataset.fallback === "1") return;
        cover.dataset.fallback = "1";
        cover.src = "images/your-cover.jpg";
      });

      var playHit = document.createElement("button");
      playHit.type = "button";
      playHit.className = "v-card__play-hit";
      playHit.setAttribute("aria-label", "放大播放：" + item.title);
      playHit.innerHTML =
        '<span class="v-card__play-icon" aria-hidden="true">' +
        '<svg viewBox="0 0 24 24" width="24" height="24" focusable="false">' +
        '<path fill="currentColor" d="M8 5v14l14-7L8 5z"/>' +
        "</svg></span>";

      playHit.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        openVideoHubModal({
          row: row,
          title: item.title,
          summary: item.summary || "",
        });
      });

      videoBox.appendChild(cover);
      videoBox.appendChild(playHit);
      media.appendChild(badge);
      media.appendChild(videoBox);

      var body = document.createElement("div");
      body.className = "v-card__body";
      var catp = document.createElement("p");
      catp.className = "v-card__cat";
      catp.textContent = catLabel[item.cat] || "";
      var h = document.createElement("h3");
      h.className = "v-card__title";
      h.textContent = item.title;
      var p = document.createElement("p");
      p.className = "v-card__desc";
      p.textContent = item.summary;
      body.appendChild(catp);
      body.appendChild(h);
      body.appendChild(p);

      card.appendChild(media);
      card.appendChild(body);
      grid.appendChild(card);
    });

    qsa(".v-filter").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var f = btn.getAttribute("data-v-filter");
        qsa(".v-filter").forEach(function (b) {
          b.classList.toggle("is-active", b === btn);
        });
        qsa(".v-card", grid).forEach(function (card) {
          var c = card.dataset.cat;
          var show = f === "all" || c === f;
          card.classList.toggle("is-hidden", !show);
        });
      });
    });
  }

  function init() {
    initScrollLinks();
    initResumeModal();
    initZoomLightbox();
    initVideoHubModal();
    initMarqueeCreators();
    buildBrandCarousel();
    initHGallery("graphic", GRAPHIC);
    initHGallery("ops", OPS);
    buildDetail();
    buildVideoHub();
    buildArrowSlider();
    ScrollTrigger.refresh();
  }

  window.addEventListener("load", function () {
    init();
    ScrollTrigger.refresh();
  });
})();
