
import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from 'https://esm.sh/ogl@1.0.11';


function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

function lerp(p1, p2, t) {
  return p1 + (p2 - p1) * t;
}

function autoBind(instance) {
  const proto = Object.getPrototypeOf(instance);
  Object.getOwnPropertyNames(proto).forEach(key => {
    if (key !== 'constructor' && typeof instance[key] === 'function') {
      instance[key] = instance[key].bind(instance);
    }
  });
}

const DEFAULT_FONT = 'bold 30px Figtree';
// Figtree is not guaranteed to be available on the host page, so the component
// loads it on demand whenever the default font is used.
const DEFAULT_FONT_URL = 'https://fonts.googleapis.com/css2?family=Figtree:wght@400;700&display=swap';

function deriveFontFamilyFromUrl(url) {
  const fileName = (url.split('/').pop() || 'custom-font').split('?')[0];
  const base = fileName.replace(/\.(woff2?|ttf|otf|eot)$/i, '');
  return base.replace(/[^a-zA-Z0-9-_ ]/g, '').trim() || 'CircularGalleryFont';
}

async function loadFontFromStylesheet(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch font stylesheet (${response.status})`);
  const cssText = await response.text();
  const faceBlocks = cssText.match(/@font-face\s*{[^}]*}/g) || [];
  let family = null;
  const fontFaces = [];
  for (const block of faceBlocks) {
    const familyMatch = block.match(/font-family:\s*['"]?([^;'"]+)['"]?/);
    const urlMatch = block.match(/url\(\s*['"]?([^'")]+)['"]?\s*\)/);
    if (!familyMatch || !urlMatch) continue;
    family = familyMatch[1].trim();
    const descriptors = {};
    const weightMatch = block.match(/font-weight:\s*([^;]+);/);
    const styleMatch = block.match(/font-style:\s*([^;]+);/);
    const rangeMatch = block.match(/unicode-range:\s*([^;]+);/);
    if (weightMatch) descriptors.weight = weightMatch[1].trim();
    if (styleMatch) descriptors.style = styleMatch[1].trim();
    if (rangeMatch) descriptors.unicodeRange = rangeMatch[1].trim();
    fontFaces.push(new FontFace(family, `url(${urlMatch[1]})`, descriptors));
  }
  if (!family) throw new Error('No @font-face rule found in the stylesheet');
  await Promise.allSettled(
    fontFaces.map(async face => {
      await face.load();
      document.fonts.add(face);
    })
  );
  return family;
}

async function loadFontFromFile(url) {
  const family = deriveFontFamilyFromUrl(url);
  const fontFace = new FontFace(family, `url(${url})`);
  await fontFace.load();
  document.fonts.add(fontFace);
  return family;
}

async function loadCustomFont(fontUrl) {
  const isStylesheet = fontUrl.includes('fonts.googleapis.com') || /\.css(\?.*)?$/i.test(fontUrl);
  return isStylesheet ? loadFontFromStylesheet(fontUrl) : loadFontFromFile(fontUrl);
}

// Loads `fontUrl` (a stylesheet such as a Google Fonts URL, or a direct font
// file) and returns a canvas-ready font string that keeps the size/weight from
// `font` but swaps in the freshly loaded family. Falls back to `font` on error.
async function resolveFont(font, fontUrl) {
  // Use the bundled Figtree stylesheet when the caller relies on the default
  // font, otherwise honor the explicit `fontUrl`.
  const effectiveUrl = fontUrl || (font === DEFAULT_FONT ? DEFAULT_FONT_URL : null);
  if (!effectiveUrl) {
    // A custom family was supplied without a URL – make sure it is ready (in
    // case the host page declares it) before we draw it to the canvas,
    // otherwise the first paint silently falls back to a system font.
    if (document.fonts && document.fonts.load) {
      try {
        await document.fonts.load(font);
        await document.fonts.ready;
      } catch {
        // Ignore – fall back to whatever the browser provides.
      }
    }
    return font;
  }
  try {
    const family = await loadCustomFont(effectiveUrl);
    const sizeMatch = font.match(/^\s*(.*?\d+px)/);
    const prefix = sizeMatch ? sizeMatch[1].trim() : 'bold 30px';
    const resolved = `${prefix} "${family}"`;
    if (document.fonts && document.fonts.load) {
      try {
        await document.fonts.load(resolved);
      } catch {
        // Ignore – we still attempt to render with the requested font.
      }
    }
    return resolved;
  } catch (error) {
    console.error('CircularGallery: unable to load font from', fontUrl, error);
    return font;
  }
}

function getFontSize(font) {
  const match = font.match(/(\d+)px/);
  return match ? parseInt(match[1], 10) : 30;
}

function createTextTexture(gl, text, font = 'bold 30px monospace', color = 'black') {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  context.font = font;
  const metrics = context.measureText(text);
  const textWidth = Math.ceil(metrics.width);
  const textHeight = Math.ceil(getFontSize(font) * 1.2);
  canvas.width = textWidth + 20;
  canvas.height = textHeight + 20;
  context.font = font;
  context.fillStyle = color;
  context.textBaseline = 'middle';
  context.textAlign = 'center';
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillText(text, canvas.width / 2, canvas.height / 2);
  const texture = new Texture(gl, { generateMipmaps: false });
  texture.image = canvas;
  return { texture, width: canvas.width, height: canvas.height };
}

class Title {
  constructor({ gl, plane, renderer, text, textColor = '#545050', font = '30px sans-serif' }) {
    autoBind(this);
    this.gl = gl;
    this.plane = plane;
    this.renderer = renderer;
    this.text = text;
    this.textColor = textColor;
    this.font = font;
    this.createMesh();
  }
  createMesh() {
    const { texture, width, height } = createTextTexture(this.gl, this.text, this.font, this.textColor);
    const geometry = new Plane(this.gl);
    const program = new Program(this.gl, {
      vertex: `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;
        void main() {
          vec4 color = texture2D(tMap, vUv);
          if (color.a < 0.1) discard;
          gl_FragColor = color;
        }
      `,
      uniforms: { tMap: { value: texture } },
      transparent: true
    });
    this.mesh = new Mesh(this.gl, { geometry, program });
    const aspect = width / height;
    const textHeight = this.plane.scale.y * 0.15;
    const textWidth = textHeight * aspect;
    this.mesh.scale.set(textWidth, textHeight, 1);
    this.mesh.position.y = -this.plane.scale.y * 0.5 - textHeight * 0.5 - 0.05;
    this.mesh.setParent(this.plane);
  }
}

class Media {
  constructor({
    geometry,
    gl,
    image,
    index,
    length,
    renderer,
    scene,
    screen,
    text,
    viewport,
    bend,
    textColor,
    borderRadius = 0,
    font,
    fullImage
  }) {
    this.extra = 0;
    this.geometry = geometry;
    this.gl = gl;
    this.image = image;
    this.fullImage = fullImage || image;
    this.index = index;
    this.length = length;
    this.renderer = renderer;
    this.scene = scene;
    this.screen = screen;
    this.text = text;
    this.viewport = viewport;
    this.bend = bend;
    this.textColor = textColor;
    this.borderRadius = borderRadius;
    this.font = font;
    this.isHovered = false;
    this.hover = 0;
    this.baseScaleX = 1;
    this.baseScaleY = 1;
    this.createShader();
    this.createMesh();
    this.createTitle();
    this.onResize();
  }
  createShader() {
    const texture = new Texture(this.gl, {
      generateMipmaps: true,
      flipY: true
    });
    this.program = new Program(this.gl, {
      depthTest: false,
      depthWrite: false,
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        uniform float uSpeed;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          p.z = (sin(p.x * 4.0 + uTime) * 1.5 + cos(p.y * 2.0 + uTime) * 1.5) * (0.1 + uSpeed * 0.5);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform vec2 uImageSizes;
        uniform vec2 uPlaneSizes;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        varying vec2 vUv;
        
        float roundedBoxSDF(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b;
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
        }
        
        void main() {
          vec2 ratio = vec2(
            min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
            min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
          );
          // Cover crop from the TOP of the image (not center)
          vec2 uv = vec2(
            vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
            vUv.y * ratio.y + (1.0 - ratio.y)
          );
          vec4 color = texture2D(tMap, uv);
          
          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
          
          // Smooth antialiasing for edges
          float edgeSmooth = 0.002;
          float alpha = 1.0 - smoothstep(-edgeSmooth, edgeSmooth, d);
          
          gl_FragColor = vec4(color.rgb, alpha);
        }
      `,
      uniforms: {
        tMap: { value: texture },
        uPlaneSizes: { value: [0, 0] },
        uImageSizes: { value: [0, 0] },
        uSpeed: { value: 0 },
        uTime: { value: 100 * Math.random() },
        uBorderRadius: { value: this.borderRadius }
      },
      transparent: true
    });
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = this.image;
    img.onload = () => {
      texture.image = img;
      this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight];
    };
  }
  createMesh() {
    this.plane = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program
    });
    this.plane.setParent(this.scene);
  }
  createTitle() {
    if (!this.text) return;
    this.title = new Title({
      gl: this.gl,
      plane: this.plane,
      renderer: this.renderer,
      text: this.text,
      textColor: this.textColor,
      font: this.font
    });
  }
  update(scroll, direction) {
    this.plane.position.x = this.x - scroll.current - this.extra;

    const x = this.plane.position.x;
    const H = this.viewport.width / 2;

    if (this.bend === 0) {
      this.plane.position.y = 0;
      this.plane.rotation.z = 0;
    } else {
      const B_abs = Math.abs(this.bend);
      const R = (H * H + B_abs * B_abs) / (2 * B_abs);
      const effectiveX = Math.min(Math.abs(x), H);

      const arc = R - Math.sqrt(R * R - effectiveX * effectiveX);
      if (this.bend > 0) {
        this.plane.position.y = -arc;
        this.plane.rotation.z = -Math.sign(x) * Math.asin(effectiveX / R);
      } else {
        this.plane.position.y = arc;
        this.plane.rotation.z = Math.sign(x) * Math.asin(effectiveX / R);
      }
    }

    this.speed = scroll.current - scroll.last;
    this.program.uniforms.uTime.value += 0.04;
    this.program.uniforms.uSpeed.value = this.speed;

    // Hover scale
    this.hover = lerp(this.hover, this.isHovered ? 1 : 0, 0.18);
    const boost = 1 + this.hover * 0.12;
    this.plane.scale.x = this.baseScaleX * boost;
    this.plane.scale.y = this.baseScaleY * boost;
    this.plane.position.z = this.hover * 0.35;

    const planeOffset = this.baseScaleX / 2;
    const viewportOffset = this.viewport.width / 2;
    this.isBefore = this.plane.position.x + planeOffset < -viewportOffset;
    this.isAfter = this.plane.position.x - planeOffset > viewportOffset;
    if (direction === 'right' && this.isBefore) {
      this.extra -= this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
    if (direction === 'left' && this.isAfter) {
      this.extra += this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
  }
  onResize({ screen, viewport } = {}) {
    if (screen) this.screen = screen;
    if (viewport) {
      this.viewport = viewport;
      if (this.plane.program.uniforms.uViewportSizes) {
        this.plane.program.uniforms.uViewportSizes.value = [this.viewport.width, this.viewport.height];
      }
    }
    this.scale = this.screen.height / 1500;
    this.baseScaleY = (this.viewport.height * (900 * this.scale)) / this.screen.height;
    this.baseScaleX = (this.viewport.width * (700 * this.scale)) / this.screen.width;
    this.plane.scale.y = this.baseScaleY;
    this.plane.scale.x = this.baseScaleX;
    this.plane.program.uniforms.uPlaneSizes.value = [this.baseScaleX, this.baseScaleY];
    this.padding = 2;
    this.width = this.baseScaleX + this.padding;
    this.widthTotal = this.width * this.length;
    this.x = this.width * this.index;
  }

  containsPoint(vx, vy) {
    const mx = this.plane.position.x;
    const my = this.plane.position.y;
    // Slightly larger hit area for easier hover/click
    const hw = this.plane.scale.x * 0.55;
    const hh = this.plane.scale.y * 0.55;
    return vx >= mx - hw && vx <= mx + hw && vy >= my - hh && vy <= my + hh;
  }
}

class App {
  constructor(
    container,
    {
      items,
      bend,
      textColor = '#ffffff',
      borderRadius = 0,
      font = 'bold 30px Figtree',
      scrollSpeed = 2,
      scrollEase = 0.05,
      onOpenImage
    } = {}
  ) {
    document.documentElement.classList.remove('no-js');
    this.container = container;
    this.scrollSpeed = scrollSpeed;
    this.onOpenImage = onOpenImage;
    this.scroll = { ease: scrollEase, current: 0, target: 0, last: 0 };
    this.onCheckDebounce = debounce(this.onCheck, 200);
    this.hovered = null;
    this.dragMoved = false;
    this.pointerDown = false;
    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.onResize();
    this.createGeometry();
    this.createMedias(items, bend, textColor, borderRadius, font);
    // Start with the first image near the left of the visible arc (01 first)
    if (this.medias && this.medias[0] && this.viewport) {
      const start = this.viewport.width * 0.38;
      this.scroll.current = start;
      this.scroll.target = start;
      this.scroll.last = start;
    }
    this.update();
    this.addEventListeners();
  }
  createRenderer() {
    this.renderer = new Renderer({
      alpha: true,
      antialias: false,
      dpr: Math.min(window.devicePixelRatio || 1, 1.5)
    });
    this.gl = this.renderer.gl;
    this.gl.clearColor(0, 0, 0, 0);
    this.gl.canvas.style.width = '100%';
    this.gl.canvas.style.height = '100%';
    this.gl.canvas.style.display = 'block';
    this.container.appendChild(this.gl.canvas);
  }
  createCamera() {
    this.camera = new Camera(this.gl);
    this.camera.fov = 45;
    this.camera.position.z = 20;
  }
  createScene() {
    this.scene = new Transform();
  }
  createGeometry() {
    this.planeGeometry = new Plane(this.gl, {
      heightSegments: 16,
      widthSegments: 32
    });
  }
  createMedias(items, bend = 1, textColor, borderRadius, font) {
    const defaultItems = [
      { image: `https://picsum.photos/seed/1/800/600?grayscale`, text: 'Bridge' },
      { image: `https://picsum.photos/seed/2/800/600?grayscale`, text: 'Desk Setup' },
      { image: `https://picsum.photos/seed/3/800/600?grayscale`, text: 'Waterfall' },
      { image: `https://picsum.photos/seed/4/800/600?grayscale`, text: 'Strawberries' },
      { image: `https://picsum.photos/seed/5/800/600?grayscale`, text: 'Deep Diving' },
      { image: `https://picsum.photos/seed/16/800/600?grayscale`, text: 'Train Track' },
      { image: `https://picsum.photos/seed/17/800/600?grayscale`, text: 'Santorini' },
      { image: `https://picsum.photos/seed/8/800/600?grayscale`, text: 'Blurry Lights' },
      { image: `https://picsum.photos/seed/9/800/600?grayscale`, text: 'New York' },
      { image: `https://picsum.photos/seed/10/800/600?grayscale`, text: 'Good Boy' },
      { image: `https://picsum.photos/seed/21/800/600?grayscale`, text: 'Coastline' },
      { image: `https://picsum.photos/seed/12/800/600?grayscale`, text: 'Palm Trees' }
    ];
    const galleryItems = items && items.length ? items : defaultItems;
    this.mediasImages = galleryItems.concat(galleryItems);
    this.medias = this.mediasImages.map((data, index) => {
      return new Media({
        geometry: this.planeGeometry,
        gl: this.gl,
        image: data.image,
        fullImage: data.fullImage || data.image,
        index,
        length: this.mediasImages.length,
        renderer: this.renderer,
        scene: this.scene,
        screen: this.screen,
        text: data.text,
        viewport: this.viewport,
        bend,
        textColor,
        borderRadius,
        font
      });
    });
  }

  getViewportPoint(e) {
    const point = e.touches ? e.touches[0] : e;
    const rect = this.container.getBoundingClientRect();
    const px = (point.clientX - rect.left) / rect.width;
    const py = (point.clientY - rect.top) / rect.height;
    return {
      x: (px - 0.5) * this.viewport.width,
      y: (0.5 - py) * this.viewport.height,
      clientX: point.clientX,
      clientY: point.clientY
    };
  }

  hitTest(vx, vy) {
    if (!this.medias) return null;
    let hit = null;
    let best = Infinity;
    for (const media of this.medias) {
      if (!media.containsPoint(vx, vy)) continue;
      const d = Math.abs(media.plane.position.x - vx);
      if (d < best) {
        best = d;
        hit = media;
      }
    }
    return hit;
  }

  setHovered(media) {
    if (this.hovered === media) return;
    if (this.hovered) this.hovered.isHovered = false;
    this.hovered = media;
    if (media) media.isHovered = true;
    this.container.style.cursor = media ? 'pointer' : 'grab';
  }

  onTouchDown(e) {
    this.isDown = true;
    this.pointerDown = true;
    this.dragMoved = false;
    this.scroll.position = this.scroll.current;
    const point = e.touches ? e.touches[0] : e;
    this.start = point.clientX;
    this.startY = point.clientY;
  }
  onTouchMove(e) {
    const point = e.touches ? e.touches[0] : e;
    if (!this.isDown) return;
    const dx = Math.abs(point.clientX - this.start);
    const dy = Math.abs(point.clientY - (this.startY || point.clientY));
    if (dx > 6 || dy > 6) this.dragMoved = true;
    const distance = (this.start - point.clientX) * (this.scrollSpeed * 0.025);
    this.scroll.target = this.scroll.position + distance;
    if (this.dragMoved) this.setHovered(null);
  }
  onTouchUp(e) {
    const wasDown = this.isDown;
    const wasDrag = this.dragMoved;
    this.isDown = false;
    this.pointerDown = false;
    if (!wasDown) return;
    if (document.querySelector("[data-gallery-lightbox]:not([hidden]), [data-masonry-box]:not([hidden])")) return;
    if (wasDrag) {
      this.onCheck();
      return;
    }
    if (!this.onOpenImage || !this.viewport) return;
    const src = e.changedTouches ? e.changedTouches[0] : e;
    if (!src || src.clientX == null) return;
    const rect = this.container.getBoundingClientRect();
    const px = (src.clientX - rect.left) / rect.width;
    const py = (src.clientY - rect.top) / rect.height;
    if (px < 0 || px > 1 || py < 0 || py > 1) return;
    const hit = this.hitTest(
      (px - 0.5) * this.viewport.width,
      (0.5 - py) * this.viewport.height
    );
    if (hit) this.onOpenImage(hit.fullImage);
  }

  onPointerMove(e) {
    if (this.isDown || !this.viewport) return;
    const vp = this.getViewportPoint(e);
    this.setHovered(this.hitTest(vp.x, vp.y));
  }

  onPointerLeave() {
    if (!this.isDown) this.setHovered(null);
  }
  onWheel(e) {
    const delta = e.deltaY || e.wheelDelta || e.detail;
    this.scroll.target += (delta > 0 ? this.scrollSpeed : -this.scrollSpeed) * 0.2;
    this.onCheckDebounce();
  }
  onKeyDown(e) {
    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault();
        this.scroll.target += this.scrollSpeed * 5;
        this.onCheckDebounce();
        break;

      case 'ArrowLeft':
        e.preventDefault();
        this.scroll.target -= this.scrollSpeed * 5;
        this.onCheckDebounce();
        break;

      case 'Home':
        e.preventDefault();
        this.scroll.target = 0;
        this.onCheckDebounce();
        break;

      default:
        break;
    }
  }

  onCheck() {
    if (!this.medias || !this.medias[0]) return;
    const width = this.medias[0].width;
    const itemIndex = Math.round(Math.abs(this.scroll.target) / width);
    const item = width * itemIndex;
    this.scroll.target = this.scroll.target < 0 ? -item : item;
  }
  onResize() {
    this.screen = {
      width: this.container.clientWidth,
      height: this.container.clientHeight
    };
    this.renderer.setSize(this.screen.width, this.screen.height);
    this.camera.perspective({
      aspect: this.screen.width / this.screen.height
    });
    const fov = (this.camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width = height * this.camera.aspect;
    this.viewport = { width, height };
    if (this.medias) {
      this.medias.forEach(media => media.onResize({ screen: this.screen, viewport: this.viewport }));
    }
  }
  setPaused(paused) {
    this.paused = !!paused;
    if (this.paused) {
      window.cancelAnimationFrame(this.raf);
      this.raf = 0;
      return;
    }
    if (!this.raf) this.update();
  }
  update() {
    if (this.paused || document.hidden) {
      this.raf = 0;
      return;
    }
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
    const direction = this.scroll.current > this.scroll.last ? 'right' : 'left';
    if (this.medias) {
      this.medias.forEach(media => media.update(this.scroll, direction));
    }
    this.renderer.render({ scene: this.scene, camera: this.camera });
    this.scroll.last = this.scroll.current;
    this.raf = window.requestAnimationFrame(this.update.bind(this));
  }
  addEventListeners() {
    this.boundOnResize = this.onResize.bind(this);
    this.boundOnWheel = (e) => {
      const absX = Math.abs(e.deltaX);
      const absY = Math.abs(e.deltaY);
      if (absY >= absX) return;
      e.preventDefault();
      this.scroll.target += (e.deltaX > 0 ? this.scrollSpeed : -this.scrollSpeed) * 0.2;
      this.onCheckDebounce();
    };
    this.boundOnTouchDown = this.onTouchDown.bind(this);
    this.boundOnTouchMove = this.onTouchMove.bind(this);
    this.boundOnTouchUp = this.onTouchUp.bind(this);
    this.boundOnPointerMove = this.onPointerMove.bind(this);
    this.boundOnPointerLeave = this.onPointerLeave.bind(this);
    this.boundOnKeyDown = this.onKeyDown.bind(this);

    this.boundOnVisibility = () => {
      if (document.hidden) this.setPaused(true);
      else if (this.inView !== false) this.setPaused(false);
    };
    window.addEventListener('resize', this.boundOnResize);
    document.addEventListener('visibilitychange', this.boundOnVisibility);
    this.container.addEventListener('wheel', this.boundOnWheel, { passive: false });
    this.container.addEventListener('mousedown', this.boundOnTouchDown);
    window.addEventListener('mousemove', this.boundOnTouchMove);
    this.container.addEventListener('mousemove', this.boundOnPointerMove);
    this.container.addEventListener('mouseleave', this.boundOnPointerLeave);
    window.addEventListener('mouseup', this.boundOnTouchUp);
    this.container.addEventListener('touchstart', this.boundOnTouchDown, { passive: true });
    window.addEventListener('touchmove', this.boundOnTouchMove, { passive: true });
    window.addEventListener('touchend', this.boundOnTouchUp);
    this.container.addEventListener('keydown', this.boundOnKeyDown);

    if ('IntersectionObserver' in window) {
      this.visibilityIo = new IntersectionObserver(
        (entries) => {
          const visible = !!entries[0]?.isIntersecting;
          this.inView = visible;
          if (!document.hidden) this.setPaused(!visible);
        },
        { rootMargin: '20% 0px', threshold: 0.01 }
      );
      this.visibilityIo.observe(this.container);
    }
  }
  destroy() {
    window.cancelAnimationFrame(this.raf);
    this.visibilityIo?.disconnect();
    window.removeEventListener('resize', this.boundOnResize);
    document.removeEventListener('visibilitychange', this.boundOnVisibility);
    window.removeEventListener('mousemove', this.boundOnTouchMove);
    window.removeEventListener('mouseup', this.boundOnTouchUp);
    window.removeEventListener('touchmove', this.boundOnTouchMove);
    window.removeEventListener('touchend', this.boundOnTouchUp);
    if (this.container) {
      this.container.removeEventListener('wheel', this.boundOnWheel);
      this.container.removeEventListener('mousedown', this.boundOnTouchDown);
      this.container.removeEventListener('mousemove', this.boundOnPointerMove);
      this.container.removeEventListener('mouseleave', this.boundOnPointerLeave);
      this.container.removeEventListener('touchstart', this.boundOnTouchDown);
      this.container.removeEventListener('keydown', this.boundOnKeyDown);
    }
    if (this.renderer && this.renderer.gl && this.renderer.gl.canvas.parentNode) {
      this.renderer.gl.canvas.parentNode.removeChild(this.renderer.gl.canvas);
    }
  }
}


export async function createCircularGallery(container, options = {}) {
  if (!container) return { destroy() {}, setPaused() {} };
  const {
    items,
    bend = 3,
    textColor = '#ffffff',
    borderRadius = 0.05,
    font = 'bold 30px Orbitron',
    fontUrl = 'https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap',
    scrollSpeed = 2,
    scrollEase = 0.02,
    onOpenImage
  } = options;

  container.classList.add('circular-gallery');
  container.tabIndex = 0;
  container.setAttribute('role', 'region');
  container.setAttribute('aria-label', 'Circular image gallery');

  const needsText = !!(items && items.some((item) => item?.text));
  const resolvedFont = needsText
    ? await resolveFont(font, fontUrl)
    : 'bold 30px sans-serif';
  const app = new App(container, {
    items,
    bend,
    textColor,
    borderRadius,
    font: resolvedFont,
    scrollSpeed,
    scrollEase,
    onOpenImage
  });
  return {
    destroy: () => app.destroy(),
    setPaused: (paused) => app.setPaused(paused),
  };
}
