const CATALOGS = {
  graphic: {
    title: "平面设计",
    sub: "海报/字体/落地页长图/电商详情页/条漫/弹窗",
    grouped: true,
    items: [
      { id: "graphic-01", type: "video", img: "平面设计/%E5%84%BF%E7%AB%A5%E8%8A%82%E5%8A%A8%E6%80%81%E6%B5%B7%E6%8A%A5.mp4", width: 350, height: 622, title: "平面设计", description: "儿童节动态海报" },
      { id: "graphic-02", type: "video", img: "平面设计/%E5%A4%A7%E6%9A%91%E5%8A%A8%E6%80%81%E6%B5%B7%E6%8A%A5.mp4", width: 378, height: 672, title: "平面设计", description: "大暑动态海报" },
      { id: "graphic-03", type: "video", img: "平面设计/%E5%B0%8F%E6%9A%91%E5%8A%A8%E6%80%81%E6%B5%B7%E6%8A%A5.mp4", width: 400, height: 710, title: "平面设计", description: "小暑动态海报" },
      { id: "graphic-04", type: "video", img: "平面设计/%E7%88%B6%E4%BA%B2%E8%8A%82%E5%8A%A8%E6%80%81%E6%B5%B7%E6%8A%A5.mp4", width: 424, height: 756, title: "平面设计", description: "父亲节动态海报" },
      { id: "graphic-05", type: "video", img: "平面设计/%E7%AB%AF%E5%8D%88%E5%8A%A8%E6%80%81%E6%B5%B7%E6%8A%A5.mp4", width: 424, height: 756, title: "平面设计", description: "端午动态海报" },
      { id: "graphic-06", type: "video", img: "平面设计/%E8%8A%92%E7%A7%8D%E5%8A%A8%E6%80%81%E6%B5%B7%E6%8A%A5.mp4", width: 400, height: 710, title: "平面设计", description: "芒种动态海报" },
      { id: "graphic-07", type: "video", img: "平面设计/%E8%B0%B7%E9%9B%A8%E5%8A%A8%E6%80%81%E6%B5%B7%E6%8A%A5.mp4", width: 366, height: 648, title: "平面设计", description: "谷雨动态海报" },
      { id: "graphic-08", type: "video", img: "平面设计/%E9%9C%9C%E9%99%8D%E5%8A%A8%E6%80%81%E6%B5%B7%E6%8A%A5.mp4", width: 492, height: 888, title: "平面设计", description: "霜降动态海报" },
      { id: "graphic-09", type: "image", img: "平面设计/%E6%B4%BB%E5%8A%A8%E6%B5%B7%E6%8A%A5-01.webp", width: 1080, height: 2275, title: "平面设计", description: "活动海报-01" },
      { id: "graphic-10", type: "image", img: "平面设计/%E6%B4%BB%E5%8A%A8%E6%B5%B7%E6%8A%A5-02.webp", width: 1118, height: 2291, title: "平面设计", description: "活动海报-02" },
      { id: "graphic-11", type: "image", img: "平面设计/%E6%B4%BB%E5%8A%A8%E6%B5%B7%E6%8A%A5-03.webp", width: 1080, height: 2275, title: "平面设计", description: "活动海报-03" },
      { id: "graphic-12", type: "image", img: "平面设计/%E6%B4%BB%E5%8A%A8%E6%B5%B7%E6%8A%A5-04.webp", width: 1920, height: 1080, title: "平面设计", description: "活动海报-04" },
      { id: "graphic-13", type: "image", img: "平面设计/%E6%B4%BB%E5%8A%A8%E6%B5%B7%E6%8A%A5-05.webp", width: 1080, height: 1920, title: "平面设计", description: "活动海报-05" },
      { id: "graphic-14", type: "image", img: "平面设计/%E6%B4%BB%E5%8A%A8%E6%B5%B7%E6%8A%A5-06.webp", width: 1080, height: 2475, title: "平面设计", description: "活动海报-06" },
      { id: "graphic-15", type: "image", img: "平面设计/%E6%B4%BB%E5%8A%A8%E6%B5%B7%E6%8A%A5-07.webp", width: 1616, height: 3090, title: "平面设计", description: "活动海报-07" },
      { id: "graphic-16", type: "image", img: "平面设计/%E6%B4%BB%E5%8A%A8%E6%B5%B7%E6%8A%A5-08.webp", width: 1616, height: 3090, title: "平面设计", description: "活动海报-08" },
      { id: "graphic-17", type: "image", img: "平面设计/%E6%B4%BB%E5%8A%A8%E6%B5%B7%E6%8A%A5-09.webp", width: 1080, height: 1920, title: "平面设计", description: "活动海报-09" },
      { id: "graphic-18", type: "image", img: "平面设计/%E6%B4%BB%E5%8A%A8%E6%B5%B7%E6%8A%A5-010.webp", width: 1080, height: 1900, title: "平面设计", description: "活动海报-010" },
      { id: "graphic-19", type: "image", img: "平面设计/%E6%B4%BB%E5%8A%A8%E6%B5%B7%E6%8A%A5-011.webp", width: 1500, height: 2820, title: "平面设计", description: "活动海报-011" },
      { id: "graphic-20", type: "image", img: "平面设计/%E6%B4%BB%E5%8A%A8%E6%B5%B7%E6%8A%A5-012.webp", width: 942, height: 2482, title: "平面设计", description: "活动海报-012" },
      { id: "graphic-21", type: "image", img: "平面设计/%E6%B4%BB%E5%8A%A8%E6%B5%B7%E6%8A%A5-013.webp", width: 1125, height: 2436, title: "平面设计", description: "活动海报-013" },
      { id: "graphic-22", type: "image", img: "平面设计/%E6%B4%BB%E5%8A%A8%E6%B5%B7%E6%8A%A5.webp", width: 769, height: 1184, title: "平面设计", description: "活动海报" },
      { id: "graphic-23", type: "image", img: "平面设计/%E5%AD%97%E4%BD%93%E8%AE%BE%E8%AE%A1%20%281%29.webp", width: 1920, height: 1059, title: "平面设计", description: "字体设计 (1)" },
      { id: "graphic-24", type: "image", img: "平面设计/%E5%AD%97%E4%BD%93%E8%AE%BE%E8%AE%A1%20%282%29.webp", width: 1920, height: 1059, title: "平面设计", description: "字体设计 (2)" },
      { id: "graphic-25", type: "image", img: "平面设计/%E8%90%BD%E5%9C%B0%E9%A1%B5%E9%95%BF%E5%9B%BE-01.webp", width: 1000, height: 10049, title: "平面设计", description: "落地页长图-01" },
      { id: "graphic-26", type: "image", img: "平面设计/%E8%90%BD%E5%9C%B0%E9%A1%B5%E9%95%BF%E5%9B%BE-02.webp", width: 1125, height: 4941, title: "平面设计", description: "落地页长图-02" },
      { id: "graphic-27", type: "image", img: "平面设计/%E8%90%BD%E5%9C%B0%E9%A1%B5%E9%95%BF%E5%9B%BE-03.webp", width: 1080, height: 4415, title: "平面设计", description: "落地页长图-03" },
      { id: "graphic-28", type: "image", img: "平面设计/%E8%90%BD%E5%9C%B0%E9%A1%B5%E9%95%BF%E5%9B%BE-04.webp", width: 1080, height: 4670, title: "平面设计", description: "落地页长图-04" },
      { id: "graphic-29", type: "image", img: "平面设计/%E8%90%BD%E5%9C%B0%E9%A1%B5%E9%95%BF%E5%9B%BE-05.webp", width: 1080, height: 6885, title: "平面设计", description: "落地页长图-05" },
      { id: "graphic-30", type: "image", img: "平面设计/%E8%90%BD%E5%9C%B0%E9%A1%B5%E9%95%BF%E5%9B%BE-06.webp", width: 1080, height: 13640, title: "平面设计", description: "落地页长图-06" },
      { id: "graphic-31", type: "image", img: "平面设计/%E8%90%BD%E5%9C%B0%E9%A1%B5%E9%95%BF%E5%9B%BE-07.webp", width: 1080, height: 4525, title: "平面设计", description: "落地页长图-07" },
      { id: "graphic-32", type: "image", img: "平面设计/%E8%90%BD%E5%9C%B0%E9%A1%B5%E9%95%BF%E5%9B%BE-08.webp", width: 1080, height: 13350, title: "平面设计", description: "落地页长图-08" },
      { id: "graphic-33", type: "image", img: "平面设计/%E7%94%BB%E5%86%8C%E8%AE%BE%E8%AE%A1%20%281%29.webp", width: 1920, height: 1080, title: "平面设计", description: "画册设计 (1)" },
      { id: "graphic-34", type: "image", img: "平面设计/%E7%94%BB%E5%86%8C%E8%AE%BE%E8%AE%A1%20%282%29.webp", width: 1920, height: 1080, title: "平面设计", description: "画册设计 (2)" },
      { id: "graphic-35", type: "image", img: "平面设计/%E7%94%BB%E5%86%8C%E8%AE%BE%E8%AE%A1%20%283%29.webp", width: 1920, height: 1080, title: "平面设计", description: "画册设计 (3)" },
      { id: "graphic-36", type: "image", img: "平面设计/%E7%94%BB%E5%86%8C%E8%AE%BE%E8%AE%A1%20%284%29.webp", width: 1920, height: 1080, title: "平面设计", description: "画册设计 (4)" },
      { id: "graphic-37", type: "image", img: "平面设计/%E7%94%BB%E5%86%8C%E8%AE%BE%E8%AE%A1%20%285%29.webp", width: 1920, height: 1080, title: "平面设计", description: "画册设计 (5)" },
      { id: "graphic-38", type: "image", img: "平面设计/%E7%94%B5%E5%95%86%E8%AF%A6%E6%83%85%E9%A1%B5%20%281%29.webp", width: 790, height: 13858, title: "平面设计", description: "电商详情页 (1)" },
      { id: "graphic-39", type: "image", img: "平面设计/%E7%94%B5%E5%95%86%E8%AF%A6%E6%83%85%E9%A1%B5%20%282%29.webp", width: 404, height: 9898, title: "平面设计", description: "电商详情页 (2)" },
      { id: "graphic-40", type: "image", img: "平面设计/%E7%94%B5%E5%95%86%E8%AF%A6%E6%83%85%E9%A1%B5%20%283%29.webp", width: 404, height: 14455, title: "平面设计", description: "电商详情页 (3)" },
      { id: "graphic-41", type: "image", img: "平面设计/%E7%94%B5%E5%95%86%E8%AF%A6%E6%83%85%E9%A1%B5%20%284%29.webp", width: 404, height: 14999, title: "平面设计", description: "电商详情页 (4)" },
      { id: "graphic-42", type: "image", img: "平面设计/%E7%94%B5%E5%95%86%E8%AF%A6%E6%83%85%E9%A1%B5%20%285%29.webp", width: 404, height: 10163, title: "平面设计", description: "电商详情页 (5)" },
      { id: "graphic-43", type: "image", img: "平面设计/%E6%B4%BB%E5%8A%A8banner-01.webp", width: 375, height: 110, title: "平面设计", description: "活动banner-01" },
      { id: "graphic-44", type: "image", img: "平面设计/%E6%B4%BB%E5%8A%A8banner-02.webp", width: 900, height: 383, title: "平面设计", description: "活动banner-02" },
      { id: "graphic-45", type: "image", img: "平面设计/%E6%B4%BB%E5%8A%A8banner-03.webp", width: 1035, height: 258, title: "平面设计", description: "活动banner-03" },
      { id: "graphic-46", type: "image", img: "平面设计/%E6%B4%BB%E5%8A%A8banner.webp", width: 375, height: 110, title: "平面设计", description: "活动banner" },
      { id: "graphic-47", type: "image", img: "平面设计/%E6%9D%A1%E6%BC%AB.webp", width: 672, height: 6108, title: "平面设计", description: "条漫" },
      { id: "graphic-48", type: "image", img: "平面设计/%E6%B4%BB%E5%8A%A8%E5%BC%B9%E7%AA%97-01.webp", width: 1005, height: 1290, title: "平面设计", description: "活动弹窗-01" },
      { id: "graphic-49", type: "image", img: "平面设计/%E6%B4%BB%E5%8A%A8%E5%BC%B9%E7%AA%97-02.webp", width: 1125, height: 1050, title: "平面设计", description: "活动弹窗-02" },
      { id: "graphic-50", type: "image", img: "平面设计/%E6%B4%BB%E5%8A%A8%E5%BC%B9%E7%AA%97-03.webp", width: 1125, height: 1050, title: "平面设计", description: "活动弹窗-03" },
      { id: "graphic-51", type: "image", img: "平面设计/%E6%B4%BB%E5%8A%A8%E5%BC%B9%E7%AA%97-04.webp", width: 1125, height: 1050, title: "平面设计", description: "活动弹窗-04" },
      { id: "graphic-52", type: "image", img: "平面设计/%E6%B4%BB%E5%8A%A8%E5%BC%B9%E7%AA%97-05.webp", width: 1125, height: 1050, title: "平面设计", description: "活动弹窗-05" },
    ],
  },
  brand: {
    title: "品牌设计",
    sub: "品牌提案/品牌手册",
    grouped: true,
    items: [
      ...Array.from({ length: 8 }, (_, index) => {
        const n = String(index + 1).padStart(2, "0");
        return {
          id: `brand-${n}`,
          img: `assets/works/brand/coffee-${n}.webp`,
          width: 1920,
          height: 1080,
          title: "品牌设计",
          description: `咖啡-${n}`,
        };
      }),
      ...Array.from({ length: 38 }, (_, index) => {
        const page = String(index + 1).padStart(2, "0");
        return {
          id: `brand-manual-${page}`,
          img: `assets/works/brand/manual-${page}.webp`,
          width: 1600,
          height: 915,
          title: "财信人寿手册",
          description: `第 ${index + 1} 页`,
        };
      }),
    ],
  },
  operation: {
    title: "运营设计",
    sub: "电商/旅游/金融/网服/直播/游戏",
    items: [1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => ({
      id: `operation-${n}`,
      img: `运营/${n}.webp`,
      width: 1920,
      height: 1080,
      title: "运营设计",
      description: String(n),
    })),
  },
  video: {
    title: "视频剪辑",
    sub: "产品视频/口播内容/活动宣传/工具推广",
    items: [
      ["BV1zpJz6bEjN", "117458295850598", "42831316327", "人机猜拳挑战", "assets/works/video/01.jpg", "人机智能交互猜拳活动宣传视频"],
      ["BV114dZBLEs5", "116430456490621", "37635819400", "40岁第一次穿lo裙？", "assets/works/video/02.jpg", "小红书爆款视频，点赞2w+"],
      ["BV1ofdRBdEtp", "116429919618251", "37632806458", "温氏土鸡产品种草", "assets/works/video/03.jpg", "小红书渠道电商视频"],
      ["BV1ofdRBdEzx", "116429919618634", "37632674478", "活动推广混剪", "assets/works/video/04.jpg", "珍爱网活动推广内容"],
      ["BV1ofdRBdEx7", "116429919619916", "37632674211", "闲鱼内容二创", "assets/works/video/05.jpg", "小红书渠道闲鱼推广"],
      ["BV1vfdRBREZk", "116429919882306", "37632674616", "现在生娃是反向抄底?", "assets/works/video/06.jpg", "客户口播内容"],
      ["BV1ofdRBdEHF", "116429919619653", "37632674504", "YOWA云游戏广告", "assets/works/video/07.jpg", "YOWA云游戏广告爆款素材，月消耗120w+"],
      ["BV19TddBnEgR", "116429902840002", "37632674521", "不交社保！是输了还是赚了?", "assets/works/video/08.jpg", "客户口播内容"],
      ["BV1YTddBHEmF", "116429902973887", "37632675036", "保险不再保险?上亿人要被收割?", "assets/works/video/09.jpg", "客户口播内容"],
      ["BV1XMddBSEi2", "116429886063324", "37632609598", "温氏土鸡产品种草", "assets/works/video/10.jpg", "小红书渠道电商视频"],
      ["BV1XMddBSEun", "116429886063825", "37632609658", "温氏老母鸡", "assets/works/video/11.jpg", "小红书渠道电商混剪"],
      ["BV15NddBXE45", "116429852573737", "37632215799", "闲鱼内容二创", "assets/works/video/12.jpg", "小红书爆款视频，点赞2w+"],
    ].map(([bvid, aid, cid, title, pic, note], index) => ({
      id: `video-${String(index + 1).padStart(2, "0")}`,
      type: "embed",
      img: pic,
      embed: `https://player.bilibili.com/player.html?isOutside=true&aid=${aid}&bvid=${bvid}&cid=${cid}&p=1`,
      width: 16,
      height: 9,
      frameWidth: index === 0 ? 16 : 9,
      frameHeight: index === 0 ? 9 : 16,
      title: "视频剪辑",
      description: title,
      note,
    })),
  },
};

const COLUMN_WIDTH = 240;
const GAP = 12;

const FIRST_SCREEN = 1920 / 1080;

const previewAspect = (item) => {
  const real = item.height > 0 && item.width > 0 ? item.height / item.width : 1;
  if (item.type === "video" || real <= 3.2) return real;
  return FIRST_SCREEN;
};

const GROUP_ORDER = ["动态海报", "活动海报", "字体设计", "落地页长图", "画册设计", "电商详情页", "活动banner", "条漫", "活动弹窗", "咖啡", "财信人寿手册"];

const fileGroup = (item) => {
  const name = item.description || item.title || "";
  if (name.includes("动态海报")) return "动态海报";
  if (name.startsWith("咖啡")) return "咖啡";
  if (item.title === "财信人寿手册") return "财信人寿手册";
  const known = GROUP_ORDER.find((label) => name.startsWith(label));
  return known || "其他";
};

const place = (heights, item, count, size) => {
  const aspect = previewAspect(item);
  let column = 0;
  let top = Infinity;
  for (let start = 0; start < count; start += 1) {
    if (heights[start] < top - 0.5) {
      top = heights[start];
      column = start;
    }
  }
  const h = Math.max(1, size * aspect) + (item.note ? 72 : 0);
  heights[column] = top + h + GAP;
  return { x: Math.round(column * (size + GAP)), y: Math.round(top), w: size, h };
};

export function mountWorksMasonry() {
  const page = document.querySelector("[data-works-page]");
  const root = document.querySelector("[data-masonry]");
  const box = document.querySelector("[data-masonry-box]");
  if (!page || !root || !box) return;

  const titleEl = page.querySelector("[data-works-title]");
  const subEl = page.querySelector("[data-works-sub]");
  const boxImage = box.querySelector("[data-box-image]");
  const boxVideo = box.querySelector("[data-box-video]");
  const boxFrame = box.querySelector("[data-box-frame]");
  const boxPlayer = box.querySelector("[data-box-player]");
  const boxTools = box.querySelector(".masonry-lightbox__tools");
  const boxStage = box.querySelector("[data-box-stage]");
  const boxTitle = box.querySelector("[data-box-title]");
  let order = [];
  let openIndex = -1;
  let drag = null;
  let suppressClick = false;
  const zoom = { scale: 1, x: 0, y: 0, dragging: false, moved: false, lastX: 0, lastY: 0 };

  const applyZoom = () => {
    box.classList.toggle("is-pannable", zoom.scale > 1);
    const transform = `translate(-50%, -50%) translate(${zoom.x}px, ${zoom.y}px) scale(${zoom.scale})`;
    boxImage.style.transform = transform;
    if (boxVideo) boxVideo.style.transform = transform;
    if (boxPlayer) boxPlayer.style.transform = transform;
  };

  const stopVideo = () => {
    if (!boxVideo) return;
    boxVideo.pause();
    boxVideo.removeAttribute("src");
    boxVideo.load();
    boxVideo.hidden = true;
  };

  const stopFrame = () => {
    if (!boxFrame) return;
    boxFrame.removeAttribute("src");
    if (boxPlayer) boxPlayer.hidden = true;
  };

  const setBoxChrome = (kind) => {
    const embed = kind === "embed";
    box.classList.toggle("is-embed", embed);
    if (boxTools) boxTools.hidden = kind === "embed" || kind === "video";
    box.querySelectorAll(".masonry-lightbox__hit").forEach((hit) => {
      hit.hidden = embed;
    });
  };

  const resetZoom = () => {
    zoom.scale = 1;
    zoom.x = 0;
    zoom.y = 0;
    applyZoom();
  };

  const setZoom = (next) => {
    const prev = zoom.scale;
    zoom.scale = Math.min(4, Math.max(0.5, next));
    if (zoom.scale === 1) {
      zoom.x = 0;
      zoom.y = 0;
    } else if (prev > 0) {
      const ratio = zoom.scale / prev;
      zoom.x *= ratio;
      zoom.y *= ratio;
    }
    applyZoom();
  };

  const catalogItems = () => order.map((id) => order._byId.get(id)).filter(Boolean);

  const layoutGrid = (grid) => {
    const width = grid.clientWidth || root.clientWidth;
    if (!width) return;
    const count = Math.max(1, Math.floor((width + GAP) / (COLUMN_WIDTH + GAP)));
    const size = (width - GAP * (count - 1)) / count;
    const heights = new Array(count).fill(0);
    const byId = new Map(catalogItems().map((item) => [item.id, item]));
    let max = 0;
    grid.querySelectorAll(".masonry__item").forEach((node) => {
      const item = byId.get(node.getAttribute("data-id"));
      if (!item) return;
      const tile = place(heights, item, count, size);
      max = Math.max(max, tile.y + tile.h);
      if (node.hasAttribute("data-dragging")) return;
      const real = item.height > 0 && item.width > 0 ? item.height / item.width : 1;
      if (item.type !== "video" && real > 3.2) node.dataset.crop = "top";
      else delete node.dataset.crop;
      node.style.setProperty("--x", `${tile.x}px`);
      node.style.setProperty("--y", `${tile.y}px`);
      node.style.width = `${tile.w}px`;
      node.style.height = `${tile.h}px`;
    });
    grid.style.height = `${Math.max(0, max)}px`;
  };

  const layout = () => {
    const grids = root.querySelectorAll("[data-grid]");
    if (grids.length) {
      root.style.height = "";
      grids.forEach((grid) => layoutGrid(grid));
      return;
    }
    layoutGrid(root);
  };

  const render = (catalog) => {
    root._videoIo?.disconnect();
    root._videoIo = null;
    order = catalog.items.map((item) => item.id);
    order._byId = new Map(catalog.items.map((item) => [item.id, item]));
    const tileHtml = (item, index) => {
      const w = item.width || 1;
      const h = item.height || 1;
      const media =
        item.type === "video"
          ? `<video class="masonry__image" data-src="${item.img}" width="${w}" height="${h}" muted loop playsinline preload="none"></video>`
          : `<img class="masonry__image" src="${item.img}" alt="${item.description || item.title}" width="${w}" height="${h}" loading="lazy" decoding="async" draggable="false" />`;
      const copy = item.note
        ? `<span class="masonry__copy"><strong>${item.description}</strong><span>${item.note}</span></span>`
        : "";
      return `
        <div class="masonry__item is-enter" role="listitem" data-id="${item.id}" style="transition-delay:${Math.min(index, 12) * 40}ms">
          <button type="button" class="masonry__card${item.note ? " has-copy" : ""}" data-card>
            <span class="masonry__media">
              ${media}
              ${
                copy
                  ? ""
                  : `<span class="masonry__caption" data-mode="hover"><span class="masonry__title">${item.description || item.title}</span></span>`
              }
            </span>
            ${copy}
          </button>
        </div>`;
    };
    const visible = catalog.items.filter((item) => item.preview !== false);
    if (catalog.grouped) {
      const groups = new Map();
      visible.forEach((item) => {
        const name = fileGroup(item);
        if (!groups.has(name)) groups.set(name, []);
        groups.get(name).push(item);
      });
      const names = [...groups.keys()].sort((a, b) => {
        const ai = GROUP_ORDER.indexOf(a);
        const bi = GROUP_ORDER.indexOf(b);
        return (ai < 0 ? 99 : ai) - (bi < 0 ? 99 : bi);
      });
      root.innerHTML = names
        .map((name) => {
          const items = groups.get(name);
          return `
          <section class="masonry__group">
            <h3 class="masonry__group-title">${name}<span>${items.length}</span></h3>
            <div class="masonry__grid" data-grid>${items.map((item, index) => tileHtml(item, index)).join("")}</div>
          </section>`;
        })
        .join("");
    } else {
      root.innerHTML = visible.map((item, index) => tileHtml(item, index)).join("");
    }
    root.querySelectorAll(".masonry__image").forEach((media) => {
      const mark = () => media.setAttribute("data-loaded", "");
      if (media.tagName === "VIDEO") {
        media.muted = true;
        media.addEventListener("loadeddata", mark, { once: true });
      } else if (media.complete) mark();
      else media.addEventListener("load", mark, { once: true });
    });

    // Videos still use IO only for play/pause; images use native loading="lazy".
    const videos = [...root.querySelectorAll("video.masonry__image")];
    if (videos.length && "IntersectionObserver" in window) {
      const videoIo = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const video = entry.target;
            const src = video.getAttribute("data-src");
            if (entry.isIntersecting) {
              if (src && video.getAttribute("src") !== src) {
                video.src = src;
                video.load();
              }
              video.play().catch(() => {});
            } else {
              video.pause();
            }
          });
        },
        { root: page.querySelector(".works-modal__panel") || null, rootMargin: "120px 0px", threshold: 0.2 }
      );
      videos.forEach((video) => videoIo.observe(video));
      root._videoIo = videoIo;
    } else {
      videos.forEach((video) => {
        const src = video.getAttribute("data-src");
        if (src) {
          video.src = src;
          video.play().catch(() => {});
        }
      });
    }

    layout();
    requestAnimationFrame(() => {
      root.querySelectorAll(".masonry__item").forEach((node) => node.classList.remove("is-enter"));
    });
  };

  const closeBox = () => {
    openIndex = -1;
    box.hidden = true;
    box.classList.remove("is-portrait");
    stopVideo();
    stopFrame();
    setBoxChrome("image");
    boxImage.removeAttribute("src");
    resetZoom();
  };

  const showBox = (index) => {
    const items = catalogItems();
    if (!items.length) return;
    openIndex = (index + items.length) % items.length;
    const item = items[openIndex];
    box.classList.toggle("is-portrait", item.frameHeight > item.frameWidth);
    if (item.type === "embed" && boxFrame) {
      stopVideo();
      boxImage.hidden = true;
      boxImage.removeAttribute("src");
      if (boxPlayer) boxPlayer.hidden = false;
      boxFrame.src = item.embed;
      boxFrame.title = item.description || item.title;
      setBoxChrome("embed");
    } else if (item.type === "video" && boxVideo) {
      stopFrame();
      setBoxChrome("video");
      boxImage.hidden = true;
      boxImage.removeAttribute("src");
      boxVideo.hidden = false;
      boxVideo.src = item.img;
      boxVideo.muted = true;
      boxVideo.play().catch(() => {});
    } else {
      stopVideo();
      stopFrame();
      setBoxChrome("image");
      boxImage.hidden = false;
      boxImage.src = item.img;
      boxImage.alt = item.description || item.title;
    }
    boxTitle.textContent = item.description || item.title;
    const countEl = box.querySelector("[data-box-count]");
    if (countEl) countEl.textContent = `${openIndex + 1} / ${items.length}`;
    const many = items.length > 1;
    box.querySelectorAll(".masonry-lightbox__prev, .masonry-lightbox__next").forEach((button) => {
      button.hidden = !many;
    });
    resetZoom();
    box.hidden = false;
  };

  let scrollY = 0;

  const open = (key) => {
    const catalog = CATALOGS[key];
    if (!catalog) return;
    titleEl.textContent = catalog.title;
    subEl.textContent = catalog.sub;
    closeBox();
    scrollY = window.scrollY;
    page.hidden = false;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    render(catalog);
    page.querySelector(".works-modal__panel")?.scrollTo(0, 0);
  };

  const close = () => {
    page.hidden = true;
    closeBox();
    root._videoIo?.disconnect();
    root._videoIo = null;
    root.innerHTML = "";
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
    window.scrollTo(0, scrollY);
  };

  document.querySelectorAll("[data-work]").forEach((card) => {
    card.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      open(card.getAttribute("data-work"));
    });
  });

  page.querySelector("[data-works-back]")?.addEventListener("click", close);
  page.querySelector("[data-works-backdrop]")?.addEventListener("click", close);
  box.querySelector("[data-box-close]")?.addEventListener("click", (event) => {
    event.stopPropagation();
    closeBox();
  });
  box.querySelector("[data-box-backdrop]")?.addEventListener("click", closeBox);
  box.querySelector(".masonry-lightbox__prev")?.addEventListener("click", (event) => {
    event.stopPropagation();
    showBox(openIndex - 1);
  });
  box.querySelector(".masonry-lightbox__next")?.addEventListener("click", (event) => {
    event.stopPropagation();
    showBox(openIndex + 1);
  });

  let boxTap = null;
  box.addEventListener("pointerdown", (event) => {
    if (box.hidden || event.button !== 0) return;
    if (event.target.closest(".masonry-lightbox__button, .masonry-lightbox__tools, .masonry-lightbox__zoom, [data-box-frame], [data-box-wheel]")) return;
    boxTap = { x: event.clientX, y: event.clientY, id: event.pointerId };
  });
  box.addEventListener("pointerup", (event) => {
    if (!boxTap || event.pointerId !== boxTap.id || box.hidden) return;
    const dx = event.clientX - boxTap.x;
    const dy = event.clientY - boxTap.y;
    boxTap = null;
    if (Math.hypot(dx, dy) > 12) return;
    if (event.target.closest(".masonry-lightbox__button, .masonry-lightbox__tools, .masonry-lightbox__zoom, [data-box-close], [data-box-backdrop], [data-box-frame], [data-box-wheel]")) return;
    if (event.clientX < window.innerWidth / 2) showBox(openIndex - 1);
    else showBox(openIndex + 1);
  });
  box.addEventListener("pointercancel", () => {
    boxTap = null;
  });
  box.querySelector("[data-box-zoom-in]")?.addEventListener("click", (event) => {
    event.stopPropagation();
    setZoom(zoom.scale + 0.25);
  });
  box.querySelector("[data-box-zoom-out]")?.addEventListener("click", (event) => {
    event.stopPropagation();
    setZoom(zoom.scale - 0.25);
  });
  box.querySelector("[data-box-zoom-reset]")?.addEventListener("click", (event) => {
    event.stopPropagation();
    resetZoom();
  });

  box.addEventListener(
    "wheel",
    (event) => {
      if (box.hidden) return;
      event.preventDefault();
      setZoom(zoom.scale + (event.deltaY > 0 ? -0.15 : 0.15));
    },
    { passive: false }
  );

  boxStage?.addEventListener("pointerdown", (event) => {
    if (box.hidden || event.button !== 0 || zoom.scale <= 1) return;
    zoom.dragging = true;
    zoom.moved = false;
    zoom.lastX = event.clientX;
    zoom.lastY = event.clientY;
    boxStage.setPointerCapture?.(event.pointerId);
  });
  boxStage?.addEventListener("pointermove", (event) => {
    if (!zoom.dragging || zoom.scale <= 1) return;
    const dx = event.clientX - zoom.lastX;
    const dy = event.clientY - zoom.lastY;
    if (Math.hypot(dx, dy) > 2) zoom.moved = true;
    zoom.x += dx;
    zoom.y += dy;
    zoom.lastX = event.clientX;
    zoom.lastY = event.clientY;
    applyZoom();
  });
  const endZoomDrag = () => {
    zoom.dragging = false;
  };
  boxStage?.addEventListener("pointerup", endZoomDrag);
  boxStage?.addEventListener("pointercancel", endZoomDrag);

  root.addEventListener("click", (event) => {
    if (suppressClick) {
      suppressClick = false;
      return;
    }
    const item = event.target.closest(".masonry__item");
    if (!item || !root.contains(item)) return;
    const id = item.getAttribute("data-id");
    const index = order.indexOf(id);
    if (index >= 0) showBox(index);
  });

  root.addEventListener("pointerdown", (event) => {
    const item = event.target.closest(".masonry__item");
    if (!item || event.button !== 0) return;
    const rect = item.getBoundingClientRect();
    const rootRect = root.getBoundingClientRect();
    drag = {
      id: item.getAttribute("data-id"),
      moved: false,
      dx: event.clientX - rect.left,
      dy: event.clientY - rect.top,
      originX: rect.left - rootRect.left,
      originY: rect.top - rootRect.top,
    };
    item.setPointerCapture?.(event.pointerId);
  });

  root.addEventListener("pointermove", (event) => {
    if (!drag) return;
    const item = root.querySelector(`[data-id="${drag.id}"]`);
    if (!item) return;
    const grid = item.closest("[data-grid]") || root;
    const rootRect = grid.getBoundingClientRect();
    const x = event.clientX - rootRect.left - drag.dx;
    const y = event.clientY - rootRect.top - drag.dy;
    if (!drag.moved && Math.hypot(x - drag.originX, y - drag.originY) < 6) return;
    drag.moved = true;
    item.setAttribute("data-dragging", "");
    item.style.setProperty("--x", `${x}px`);
    item.style.setProperty("--y", `${y}px`);
    const centerX = x + item.offsetWidth / 2;
    const centerY = y + item.offsetHeight / 2;
    let nearest = drag.id;
    let best = Infinity;
    grid.querySelectorAll(".masonry__item").forEach((node) => {
      const id = node.getAttribute("data-id");
      if (id === drag.id) return;
      const nx = parseFloat(node.style.getPropertyValue("--x")) + node.offsetWidth / 2;
      const ny = parseFloat(node.style.getPropertyValue("--y")) + node.offsetHeight / 2;
      const dist = Math.hypot(nx - centerX, ny - centerY);
      if (dist < best) {
        best = dist;
        nearest = id;
      }
    });
    if (nearest !== drag.id && best < 180) {
      const from = order.indexOf(drag.id);
      const to = order.indexOf(nearest);
      if (from >= 0 && to >= 0) {
        order.splice(from, 1);
        order.splice(to, 0, drag.id);
        layout();
      }
    }
  });

  const endDrag = () => {
    if (!drag) return;
    const item = root.querySelector(`[data-id="${drag.id}"]`);
    item?.removeAttribute("data-dragging");
    suppressClick = drag.moved;
    drag = null;
    layout();
  };
  root.addEventListener("pointerup", endDrag);
  root.addEventListener("pointercancel", endDrag);

  window.addEventListener("resize", () => {
    if (!page.hidden) layout();
  });

  window.addEventListener("keydown", (event) => {
    if (page.hidden) return;
    if (event.key === "Escape") {
      if (!box.hidden) closeBox();
      else close();
    } else if (!box.hidden && (event.key === "+" || event.key === "=")) setZoom(zoom.scale + 0.25);
    else if (!box.hidden && event.key === "-") setZoom(zoom.scale - 0.25);
    else if (!box.hidden && event.key === "0") resetZoom();
    else if (!box.hidden && event.key === "ArrowRight") showBox(openIndex + 1);
    else if (!box.hidden && event.key === "ArrowLeft") showBox(openIndex - 1);
  });
}
