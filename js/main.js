import { createAurora } from "./aurora.js";
import { createCircularGallery } from "./circular-gallery.js?v=19";

(() => {
  const loader = document.querySelector("[data-loader]");
  const pctEl = document.querySelector("[data-loader-pct]");
  const nav = document.querySelector("[data-nav]");
  const hero = document.querySelector(".hero");
  const yearEl = document.querySelector("[data-year]");
  const auroraEl = document.querySelector("[data-aurora]");
  const galleryEl = document.querySelector("[data-circular-gallery]");

  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  document.body.classList.add("is-loading");

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // React Bits Aurora — homepage background
  if (auroraEl) {
    createAurora(auroraEl, {
      colorStops: ["#c3ff00", "#7cff67", "#1a3d2e"],
      blend: 0.55,
      amplitude: 1.0,
      speed: 0.5,
    });
  }

  // Lightbox: fit-to-screen + zoom / pan
  const lightbox = document.querySelector("[data-gallery-lightbox]");
  const lightboxStage = document.querySelector("[data-gallery-lightbox-stage]");
  const lightboxImg = document.querySelector("[data-gallery-lightbox-img]");
  const lbState = { scale: 1, x: 0, y: 0, min: 1, max: 4, dragging: false, lastX: 0, lastY: 0 };

  const applyLbTransform = () => {
    if (!lightboxImg) return;
    lightboxImg.style.transform = `translate(calc(-50% + ${lbState.x}px), calc(-50% + ${lbState.y}px)) scale(${lbState.scale})`;
  };

  const fitLightboxImage = () => {
    if (!lightbox || !lightboxStage || !lightboxImg || !lightboxImg.naturalWidth) return;
    const pad = 32;
    const sw = lightboxStage.clientWidth - pad;
    const sh = lightboxStage.clientHeight - pad;
    const nw = lightboxImg.naturalWidth;
    const nh = lightboxImg.naturalHeight;
    const fit = Math.min(sw / nw, sh / nh, 1);
    const displayW = nw * fit;
    const displayH = nh * fit;
    lightboxImg.style.width = `${displayW}px`;
    lightboxImg.style.height = `${displayH}px`;
    lbState.min = 1;
    lbState.max = Math.max(4, Math.min(8, Math.max(nw / displayW, nh / displayH)));
    lbState.scale = 1;
    lbState.x = 0;
    lbState.y = 0;
    applyLbTransform();
  };

  const setLbZoom = (next) => {
    const prev = lbState.scale;
    lbState.scale = Math.min(lbState.max, Math.max(lbState.min, next));
    if (lbState.scale === 1) {
      lbState.x = 0;
      lbState.y = 0;
    } else {
      // Keep pan proportional when zooming
      const ratio = lbState.scale / prev;
      lbState.x *= ratio;
      lbState.y *= ratio;
    }
    applyLbTransform();
  };

  const openLightbox = (src) => {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.onload = () => fitLightboxImage();
    lightboxImg.src = src;
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    if (lightboxImg.complete) fitLightboxImage();
  };

  const closeLightbox = () => {
    if (!lightbox || !lightboxImg) return;
    lightbox.hidden = true;
    lightboxImg.onload = null;
    lightboxImg.removeAttribute("src");
    lightboxImg.style.width = "";
    lightboxImg.style.height = "";
    lightboxImg.style.transform = "";
    lbState.scale = 1;
    lbState.x = 0;
    lbState.y = 0;
    document.body.style.overflow = "";
  };

  lightbox?.querySelector("[data-lb-zoom-in]")?.addEventListener("click", (e) => {
    e.stopPropagation();
    setLbZoom(lbState.scale + 0.25);
  });
  lightbox?.querySelector("[data-lb-zoom-out]")?.addEventListener("click", (e) => {
    e.stopPropagation();
    setLbZoom(lbState.scale - 0.25);
  });
  lightbox?.querySelector("[data-lb-zoom-reset]")?.addEventListener("click", (e) => {
    e.stopPropagation();
    fitLightboxImage();
  });

  lightbox?.addEventListener("click", (e) => {
    if (e.target === lightbox || e.target.closest("[data-gallery-lightbox-close]")) {
      closeLightbox();
    }
  });

  lightboxStage?.addEventListener(
    "wheel",
    (e) => {
      if (lightbox?.hidden) return;
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.15 : 0.15;
      setLbZoom(lbState.scale + delta);
    },
    { passive: false }
  );

  lightboxStage?.addEventListener("pointerdown", (e) => {
    if (lightbox?.hidden) return;
    lbState.dragging = true;
    lbState.lastX = e.clientX;
    lbState.lastY = e.clientY;
    lightboxStage.classList.add("is-dragging");
    lightboxStage.setPointerCapture?.(e.pointerId);
  });
  lightboxStage?.addEventListener("pointermove", (e) => {
    if (!lbState.dragging) return;
    lbState.x += e.clientX - lbState.lastX;
    lbState.y += e.clientY - lbState.lastY;
    lbState.lastX = e.clientX;
    lbState.lastY = e.clientY;
    applyLbTransform();
  });
  const endLbDrag = () => {
    lbState.dragging = false;
    lightboxStage?.classList.remove("is-dragging");
  };
  lightboxStage?.addEventListener("pointerup", endLbDrag);
  lightboxStage?.addEventListener("pointercancel", endLbDrag);

  window.addEventListener("resize", () => {
    if (lightbox && !lightbox.hidden) fitLightboxImage();
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox || lightbox.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "+" || e.key === "=") setLbZoom(lbState.scale + 0.25);
    if (e.key === "-" || e.key === "_") setLbZoom(lbState.scale - 0.25);
    if (e.key === "0") fitLightboxImage();
  });

  // React Bits CircularGallery — homepage bottom
  if (galleryEl) {
    const nums = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    createCircularGallery(galleryEl, {
      bend: 3,
      textColor: "#ffffff",
      borderRadius: 0.05,
      scrollEase: 0.02,
      fontUrl: "https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap",
      font: "bold 30px Orbitron",
      onOpenImage: openLightbox,
      // Opening screen: 01–07, then 08–12
      items: nums.map((n) => ({
        image: `assets/hero-carousel/${n}.webp`,
        fullImage: `assets/hero-full/${n}.webp`,
        text: "",
      })),
    }).catch((err) => console.error("CircularGallery failed:", err));
  }

  function finishLoad() {
    loader?.classList.add("is-done");
    document.body.classList.remove("is-loading");
    requestAnimationFrame(() => {
      nav?.classList.add("is-ready");
      hero?.classList.add("is-ready");
      // ensure WebGL canvas matches final layout
      window.dispatchEvent(new Event("resize"));
    });
  }

  function runLoader() {
    if (!loader || !pctEl || prefersReduced) {
      if (pctEl) pctEl.textContent = "100%";
      finishLoad();
      return;
    }

    const duration = 1600;
    const start = performance.now();

    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      const value = Math.round(eased * 100);
      pctEl.textContent = `${value}%`;
      if (t < 1) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(finishLoad, 180);
      }
    };

    requestAnimationFrame(tick);
  }

  // Wait for critical assets, then animate loader
  const critical = ["assets/logo-mark.jpg", "assets/work-1.jpg"];

  Promise.all(
    critical.map(
      (src) =>
        new Promise((resolve) => {
          const img = new Image();
          img.onload = img.onerror = () => resolve();
          img.src = src;
        })
    )
  ).then(runLoader);

  // Reveal on scroll
  const reveals = document.querySelectorAll(".reveal");
  if (reveals.length) {
    if (prefersReduced || !("IntersectionObserver" in window)) {
      reveals.forEach((el) => el.classList.add("is-in"));
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-in");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
      );
      reveals.forEach((el) => io.observe(el));
    }
  }

  // Strength cards: hover/focus activates lime state
  const strCards = document.querySelectorAll("[data-str-card]");
  strCards.forEach((card) => {
    const activate = () => {
      strCards.forEach((c) => c.classList.remove("is-active", "str-card--active"));
      card.classList.add("is-active");
    };
    card.addEventListener("mouseenter", activate);
    card.addEventListener("focusin", activate);
    card.addEventListener("click", activate);
  });

  // Smooth nav offset handled by CSS scroll-padding; ensure hash clicks work after load
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "start" });
      history.pushState(null, "", id);
    });
  });
})();
