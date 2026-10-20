import { createAurora } from "./aurora.js?v=2";
import { createCircularGallery } from "./circular-gallery.js?v=22";
import { mountWorksMasonry } from "./works-masonry.js?v=32";

(() => {
  const loader = document.querySelector("[data-loader]");
  const pctEl = document.querySelector("[data-loader-pct]");
  const nav = document.querySelector("[data-nav]");
  const hero = document.querySelector(".hero");
  const yearEl = document.querySelector("[data-year]");
  const auroraEl = document.querySelector("[data-aurora]");
  const galleryEl = document.querySelector("[data-circular-gallery]");

  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  document.querySelectorAll(".text-shine").forEach((node) => {
    node.dataset.text = node.textContent.trim();
  });

  document.querySelectorAll(".about, .work-card, .contact__card").forEach((el) => {
    if (el.closest(".border-glow-card")) return;
    const card = document.createElement("div");
    card.className = "border-glow-card";
    const colors = ["#c3ff00", "#7dff4a", "#d6ff6a"];
    const positions = ["80% 55%", "69% 34%", "8% 6%", "41% 38%", "86% 85%", "82% 18%", "51% 4%"];
    const keys = ["--gradient-one", "--gradient-two", "--gradient-three", "--gradient-four", "--gradient-five", "--gradient-six", "--gradient-seven"];
    const colorMap = [0, 1, 2, 0, 1, 2, 1];
    card.style.setProperty("--card-bg", "#120F17");
    card.style.setProperty("--edge-sensitivity", "30");
    card.style.setProperty("--border-radius", "28px");
    card.style.setProperty("--glow-padding", "40px");
    card.style.setProperty("--cone-spread", "25");
    card.style.setProperty("--fill-opacity", "0.5");
    ["", "-60", "-50", "-40", "-30", "-20", "-10"].forEach((suffix, index) => {
      const opacity = [100, 60, 50, 40, 30, 20, 10][index];
      card.style.setProperty(`--glow-color${suffix}`, `hsl(78deg 100% 62% / ${opacity}%)`);
    });
    keys.forEach((key, index) => {
      card.style.setProperty(key, `radial-gradient(at ${positions[index]}, ${colors[colorMap[index]]} 0px, transparent 50%)`);
    });
    card.style.setProperty("--gradient-base", `linear-gradient(${colors[0]} 0 100%)`);
    const edge = document.createElement("span");
    edge.className = "edge-light";
    edge.setAttribute("aria-hidden", "true");
    const inner = document.createElement("div");
    inner.className = "border-glow-inner";
    if (el.classList.contains("reveal")) {
      el.classList.remove("reveal");
      card.classList.add("reveal");
    }
    el.replaceWith(card);
    card.append(edge, inner);
    inner.append(el);
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const dx = x - cx;
      const dy = y - cy;
      let kx = Infinity;
      let ky = Infinity;
      if (dx !== 0) kx = cx / Math.abs(dx);
      if (dy !== 0) ky = cy / Math.abs(dy);
      const edgeProximity = Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
      let angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
      if (angle < 0) angle += 360;
      card.style.setProperty("--edge-proximity", (edgeProximity * 100).toFixed(3));
      card.style.setProperty("--cursor-angle", `${angle.toFixed(3)}deg`);
    });
  });

  document.querySelectorAll(".work-card > img, .about__visual > img").forEach((img) => {
    const frame = document.createElement("span");
    frame.className = "media-frame";
    img.classList.add("media-parallax");
    img.parentNode.insertBefore(frame, img);
    frame.append(img);
  });

  document.body.classList.add("is-loading");

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let auroraApi = null;
  const startAurora = () => {
    if (!auroraEl || auroraApi) return;
    auroraApi = createAurora(auroraEl, {
      colorStops: ["#c3ff00", "#7cff67", "#1a3d2e"],
      blend: 0.55,
      amplitude: 1.0,
      speed: 0.5,
      dpr: 1.25,
      resolutionScale: 0.65,
    });
  };

  // Lightbox: same controls as the works preview
  const lightbox = document.querySelector("[data-gallery-lightbox]");
  const lightboxStage = document.querySelector("[data-gallery-lightbox-stage]");
  const lightboxImg = document.querySelector("[data-gallery-lightbox-img]");
  const lbCount = lightbox?.querySelector("[data-lb-count]");
  const heroNums = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  const heroFull = heroNums.map((n) => `assets/hero-full/${n}.webp`);
  const lbState = { scale: 1, x: 0, y: 0, dragging: false, moved: false, lastX: 0, lastY: 0, index: 0 };

  const applyLbTransform = () => {
    if (!lightboxImg) return;
    lightbox?.classList.toggle("is-pannable", lbState.scale > 1);
    lightboxImg.style.transform = `translate(-50%, -50%) translate(${lbState.x}px, ${lbState.y}px) scale(${lbState.scale})`;
  };

  const resetLbZoom = () => {
    lbState.scale = 1;
    lbState.x = 0;
    lbState.y = 0;
    applyLbTransform();
  };

  const setLbZoom = (next) => {
    const prev = lbState.scale || 1;
    lbState.scale = Math.min(4, Math.max(0.5, next));
    if (lbState.scale === 1) {
      lbState.x = 0;
      lbState.y = 0;
    } else {
      const ratio = lbState.scale / prev;
      lbState.x *= ratio;
      lbState.y *= ratio;
    }
    applyLbTransform();
  };

  const showHeroImage = (index) => {
    if (!lightbox || !lightboxImg || !heroFull.length) return;
    lbState.index = (index + heroFull.length) % heroFull.length;
    resetLbZoom();
    lightboxImg.src = heroFull[lbState.index];
    lightboxImg.alt = `作品 ${heroNums[lbState.index]}`;
    if (lbCount) lbCount.textContent = `${lbState.index + 1} / ${heroFull.length}`;
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
  };

  const openLightbox = (src) => {
    const index = heroFull.indexOf(src);
    showHeroImage(index >= 0 ? index : 0);
  };

  const closeLightbox = () => {
    if (!lightbox || !lightboxImg) return;
    lightbox.hidden = true;
    lightboxImg.removeAttribute("src");
    resetLbZoom();
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
    resetLbZoom();
  });
  lightbox?.querySelector(".masonry-lightbox__prev")?.addEventListener("click", (e) => {
    e.stopPropagation();
    showHeroImage(lbState.index - 1);
  });
  lightbox?.querySelector(".masonry-lightbox__next")?.addEventListener("click", (e) => {
    e.stopPropagation();
    showHeroImage(lbState.index + 1);
  });

  let lbTap = null;
  lightbox?.addEventListener("pointerdown", (e) => {
    if (lightbox.hidden || e.button !== 0) return;
    if (e.target.closest(".masonry-lightbox__button, .masonry-lightbox__tools, .masonry-lightbox__zoom")) return;
    lbTap = { x: e.clientX, y: e.clientY, id: e.pointerId };
  });
  lightbox?.addEventListener("pointerup", (e) => {
    if (!lbTap || e.pointerId !== lbTap.id || lightbox.hidden) return;
    const dx = e.clientX - lbTap.x;
    const dy = e.clientY - lbTap.y;
    lbTap = null;
    if (Math.hypot(dx, dy) > 12) return;
    if (e.target.closest(".masonry-lightbox__button, .masonry-lightbox__tools, .masonry-lightbox__zoom, [data-gallery-lightbox-close]")) return;
    if (e.clientX < window.innerWidth / 2) showHeroImage(lbState.index - 1);
    else showHeroImage(lbState.index + 1);
  });
  lightbox?.addEventListener("pointercancel", () => {
    lbTap = null;
  });

  lightbox?.addEventListener("click", (e) => {
    if (e.target === lightbox || e.target.closest("[data-gallery-lightbox-close]")) {
      closeLightbox();
    }
  });

  lightbox?.addEventListener(
    "wheel",
    (e) => {
      if (lightbox.hidden) return;
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.15 : 0.15;
      setLbZoom(lbState.scale + delta);
    },
    { passive: false }
  );

  lightboxStage?.addEventListener("pointerdown", (e) => {
    if (lightbox?.hidden || lbState.scale <= 1) return;
    lbState.dragging = true;
    lbState.moved = false;
    lbState.lastX = e.clientX;
    lbState.lastY = e.clientY;
    lightboxStage.classList.add("is-dragging");
    lightboxStage.setPointerCapture?.(e.pointerId);
  });
  lightboxStage?.addEventListener("pointermove", (e) => {
    if (!lbState.dragging || lbState.scale <= 1) return;
    const dx = e.clientX - lbState.lastX;
    const dy = e.clientY - lbState.lastY;
    if (Math.hypot(dx, dy) > 2) lbState.moved = true;
    lbState.x += dx;
    lbState.y += dy;
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

  document.addEventListener("keydown", (e) => {
    if (!lightbox || lightbox.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "+" || e.key === "=") setLbZoom(lbState.scale + 0.25);
    if (e.key === "-" || e.key === "_") setLbZoom(lbState.scale - 0.25);
    if (e.key === "0") resetLbZoom();
    if (e.key === "ArrowRight") showHeroImage(lbState.index + 1);
    if (e.key === "ArrowLeft") showHeroImage(lbState.index - 1);
  });

  let galleryReady = false;
  const startGallery = () => {
    if (!galleryEl || galleryReady) return;
    galleryReady = true;
    createCircularGallery(galleryEl, {
      bend: 3,
      textColor: "#ffffff",
      borderRadius: 0.05,
      scrollEase: 0.02,
      fontUrl: "",
      font: "bold 30px sans-serif",
      onOpenImage: openLightbox,
      items: heroNums.map((n) => ({
        image: `assets/hero-carousel/${n}.webp`,
        fullImage: `assets/hero-full/${n}.webp`,
        text: "",
      })),
    }).catch((err) => console.error("CircularGallery failed:", err));
  };

  function finishLoad() {
    loader?.classList.add("is-done");
    document.body.classList.remove("is-loading");
    requestAnimationFrame(() => {
      nav?.classList.add("is-ready");
      hero?.classList.add("is-ready", "is-open");
      window.setTimeout(() => heroShift?.classList.add("is-settled"), 2400);
      startAurora();
      startGallery();
      window.dispatchEvent(new Event("resize"));
    });
  }

  function runLoader() {
    if (!loader || !pctEl) {
      if (pctEl) pctEl.textContent = "100%";
      finishLoad();
      return;
    }

    const duration = 1100;
    const start = performance.now();

    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const value = Math.round(eased * 100);
      pctEl.textContent = `${value}%`;
      if (t < 1) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(finishLoad, 120);
      }
    };

    requestAnimationFrame(tick);
  }

  // Wait only for the logo used by the loader/nav — avoid blocking on unused assets
  const critical = ["assets/logo-mark.jpg", "assets/hero-carousel/01.webp"];

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

  const heroShift = document.querySelector("[data-hero-shift]");
  const playSection = (section) => {
    section.classList.add("is-in");
    section.querySelectorAll(".reveal").forEach((el, index) => {
      el.style.setProperty("--motion-delay", `${0.48 + index * 0.12}s`);
      el.classList.add("is-in");
    });
  };

  document.querySelectorAll(".section").forEach((section) => {
    if (!("IntersectionObserver" in window)) {
      playSection(section);
      return;
    }
    const trigger = section.querySelector(".section__head") || section;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          playSection(section);
          io.disconnect();
        });
      },
      { threshold: 0.45, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(trigger);
  });

  if (heroShift) {
    heroShift.addEventListener("transitionend", (event) => {
      if (event.target !== heroShift || event.propertyName !== "transform") return;
      heroShift.classList.add("is-settled");
    });

    const parallaxImgs = [...document.querySelectorAll(".media-parallax")];
    let parallaxFrame = 0;
    const updateParallax = () => {
      parallaxFrame = 0;
      if (document.hidden) return;
      if (heroShift.classList.contains("is-settled") && hero) {
        const heroRect = hero.getBoundingClientRect();
        if (heroRect.bottom > 0 && heroRect.top < window.innerHeight) {
          const shift = Math.min(72, Math.max(0, -heroRect.top) * 0.14);
          heroShift.style.transform = `translate3d(0, ${shift.toFixed(2)}px, 0)`;
        }
      }
      const viewH = window.innerHeight;
      for (let i = 0; i < parallaxImgs.length; i++) {
        const img = parallaxImgs[i];
        const rect = img.getBoundingClientRect();
        if (rect.bottom < -40 || rect.top > viewH + 40) continue;
        const delta = (rect.top + rect.height / 2 - viewH / 2) / viewH;
        const offset = Math.max(-16, Math.min(16, delta * -26));
        img.style.setProperty("--py", `${offset.toFixed(2)}px`);
      }
    };
    window.addEventListener("scroll", () => {
      if (document.hidden || parallaxFrame) return;
      parallaxFrame = requestAnimationFrame(updateParallax);
    }, { passive: true });
  } else {
    heroShift?.classList.add("is-settled");
  }

  mountWorksMasonry();

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
    card.addEventListener("mouseleave", () => {
      card.classList.remove("is-active", "str-card--active");
    });
  });

  // Smooth nav offset handled by CSS scroll-padding; ensure hash clicks work after load
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      if (link.hasAttribute("data-work")) return;
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
