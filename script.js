/* ------------------------------------------------------------------
   Content — edit here.
   Each chapter renders a timeline frame, followed by its collage frame.

   Collage pieces: { file, box: [left, top, width, height] in Figma px, ... }
     rotate: degrees
     fx:     entrance effect instead of the default pop-in (see styles.css):
             "runway" | "fly" | "burst" | "slap"
     delay:  ms before the entrance starts
     parts:  small moving images inside the piece, at: [left, top, width, height] in % of it
     grid:   for fx "burst" — [columns, rows] of shards the image is cut into; they
             explode out from `origin` (Figma px) into place
   "under" pieces show straight away; "over" pieces build on the next scroll step.
------------------------------------------------------------------- */
const IMG = "assets/img/";
const FULL = [0, 0, 1920, 1080];

const chapters = [
  {
    year: "1983",
    place: "Petah Tikva",
    placeX: 35,
    bullets: ["born & raised", "typical 80s-90s childhood", "military service"],
    collage: {
      label: "Petah Tikva in the 80s and 90s",
      // background video; it bleeds past the frame like in Figma
      video: { src: "assets/video/petah-tikva.mp4", box: [-79, -226, 2026, 1414] },
      under: [{ file: "pt-street.jpg", box: FULL }], // video placeholder until it plays
      over: [
        { file: "pt-logo.png", box: [607, 129, 706, 803] },
        { file: "pt-aviv.png", box: [0, 627, 309, 455] },
        { file: "pt-abc.png", box: [1425, 0, 495, 432] },
        { file: "pt-beverly.png", box: [1092, 505, 828, 577] },
        { file: "pt-burger.png", box: [127, 695, 354, 387] },
        { file: "pt-barbie.png", box: [816, 744, 389, 338] },
        { file: "pt-berry.png", box: [610, 501, 360, 581] },
        { file: "pt-highfive.png", box: [0, 0, 415, 113] },
        { file: "pt-rosh1.png", box: [1238, 391, 352, 118] },
        { file: "pt-dance.png", box: [0, 268, 1054, 812] },
      ],
    },
  },
  {
    year: "2008",
    place: "Milan",
    placeX: 411,
    bullets: [
      ["Industrial Design, Fashion Specialty - B.S", "Politecnico di Milano, Milan, Italy"],
      "EL-AL security",
    ],
    collage: {
      label: "Milan",
      under: [{ file: "milan-duomo.jpg", box: FULL }],
      // the runway is split into depth layers (back to front): the lead model walks in first
      over: [
        { file: "milan-elal.png", box: [1055, 76, 847, 267], fx: "fly", delay: 500 },
        { file: "milan-runway-line.png", box: [0, 62, 1082, 1018], fx: "runway", delay: 700 },
        { file: "milan-runway-second.png", box: [439, 187, 265, 828], fx: "runway", delay: 350 },
        { file: "milan-runway-lead.png", box: [698, 66, 384, 1014], fx: "runway", delay: 0 },
      ],
    },
  },
  {
    year: "2012",
    place: "New York",
    placeX: 773,
    bullets: [
      ["Graphic Design - Diploma", "F.I.T - Fashion Institute of Technology, New York. U.S.A"],
      ["Still Photography - Diploma", "F.I.T - Fashion Institute of Technology, New York. U.S.A"],
      "EL-AL security",
    ],
    collage: {
      label: "New York",
      // rainbow glow GIF behind everything; portrait, turned on its side as in Figma
      // (stretched to every edge — further than in Figma — so no gap shows while Manhattan explodes in)
      under: [{ file: "ny-rainbow.gif", box: [370, -470, 1180, 1920], rotate: -90 }],
      // Manhattan + Brooklyn Bridge (transparent sky, so the lime stripe shows above the towers);
      // it explodes into the frame: cut into a grid of shards that burst out from one point
      over: [
        {
          file: "ny-manhattan.png",
          box: [0, -100, 1920, 1280],
          fx: "burst",
          grid: [12, 8], // columns, rows
          origin: [960, 560], // blast point, Figma px
        },
      ],
    },
  },
  {
    year: "2016",
    place: "Petah Tikva",
    placeX: 1157,
    bullets: ["back home"],
    collage: {
      label: "back home",
      under: [],
      over: [
        { file: "home-pt-logo.png", box: [1136, 157, 656, 297], alt: "Petah Tikva — from moshava to metropolis" },
        {
          file: "home-scooter.png",
          box: [0, 444, 848, 636],
          // Barbie the dog pants: the tongue is cut out and animated over a dark mouth
          parts: [{ file: "home-tongue.png", at: [38.71, 33.65, 4.47, 3.53], fx: "pant" }],
        },
        { file: "home-barbie-logo.png", box: [490, 540, 325, 183], alt: "Barbie" },
      ],
    },
  },
  {
    year: "2017",
    place: "sparkles",
    placeX: 1522,
    bullets: ["that’s me"],
    collage: {
      label: "sparkles",
      // "משה 8" peeks out from under the lime stripe, so it sits below it from the start
      under: [{ file: "moshe-sticker.png", box: [993.82, 21.85, 211.997, 129.042], rotate: -170.96 }],
      // stuck on one after another like stickers: the logos first, then the "משה" pastries
      // rain on at the spots and angles set in Figma
      over: [
        { file: "sparkles-logo.jpg", box: [142.17, 217.91, 570.925, 218.968], rotate: -16.11, fx: "slap", alt: "sparkles — branding · uxui · solutions" },
        { file: "hit-logo.png", box: [1537.03, 812.74, 235.666, 155.454], rotate: 11.39, fx: "slap", alt: "HIT — Holon Institute of Technology" },
        { file: "logo-hash.png", box: [1448, 568, 202, 202], fx: "slap", alt: "חש" },
        { file: "logo-studio6b.png", box: [1361.97, 700.97, 216.007, 216.007], rotate: -21.41, fx: "slap", alt: "Studio 6B" },
        { file: "logo-college.png", box: [1610, 626, 230, 230], fx: "slap", alt: "המכללה למינהל" },
        ...[
          [449, 553, 191, 116, 0],
          [196.0, 874.0, 191, 116, 81.07],
          [41.18, 606.9, 191, 116, 128.26],
          [1106.23, 888.57, 132.406, 80.595, 128.26],
          [1828.43, 287.64, 132.406, 80.595, 34.34],
          [245.85, 44.5, 132.406, 80.595, 16.89],
          [1321.1, 171.02, 211.997, 129.042, -67.37],
          [1734.54, -37.15, 142.6, 86.8, 16.89],
        ].map(([x, y, w, h, rotate], k) => ({
          file: "moshe-sticker.png",
          box: [x, y, w, h],
          rotate,
          fx: "slap",
          delay: 2150 + k * 170, // right after the logos
        })),
      ],
    },
  },
];

/* ------------------------------------------------------------------
   Rendering
------------------------------------------------------------------- */
const esc = (s) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const idFor = (c) => `y${c.year}`;
const u = (n) => `calc(${n} * var(--u))`;
const boxStyle = ([x, y, w, h]) => `left:${u(x)};top:${u(y)};width:${u(w)};height:${u(h)};`;

// the runway's vanishing point (Figma px, off-frame left): models scale out from here
const RUNWAY_VP = [-422.4, 594];

function timelineFrame(active) {
  const years = chapters
    .map((c) => {
      const on = c === active;
      return `<a href="#${idFor(c)}" class="${on ? "is-active" : "is-muted"}"${on ? ' aria-current="step"' : ""}>${c.year}</a>`;
    })
    .join("");

  const places = chapters
    .map((c) => {
      const on = c === active;
      return `<a href="#${idFor(c)}" class="timeline__place ${on ? "is-active" : "is-muted"}" style="left:calc(${c.placeX} * var(--u))" tabindex="-1">${esc(c.place)}</a>`;
    })
    .join("");

  const bullets = active.bullets
    .map((b) => {
      const lines = Array.isArray(b) ? b : [b];
      return `<li><span>${lines.map(esc).join("<br>")}</span></li>`;
    })
    .join("");

  return `
    <section class="frame timeline" id="${idFor(active)}" aria-label="${active.year}, ${esc(active.place)}">
      <ul class="timeline__list">${bullets}</ul>
      <div class="stripe"></div>
      <img class="timeline__rule" src="${IMG}line.svg" alt="">
      <nav class="timeline__years" aria-label="Timeline">${years}</nav>
      <div class="timeline__places" aria-hidden="true">${places}</div>
    </section>`;
}

// One collage piece. `i` is its build order (undefined for "under" pieces).
function piece(p, i) {
  const builds = i !== undefined;
  const [x, y, w, h] = p.box;

  if (p.grid) {
    // shards start bunched up at the blast point, spun and shrunk, then fly out to their place
    const [cols, rows] = p.grid;
    const [ox, oy] = p.origin;
    const tw = w / cols;
    const th = h / rows;
    const shards = [];
    for (let r = 0; r < rows; r++) {
      for (let k = 0; k < cols; k++) {
        const left = k * tw;
        const top = r * th;
        const dx = ox - (x + left + tw / 2);
        const dy = oy - (y + top + th / 2);
        const dist = Math.hypot(dx, dy);
        const spin = Math.round((Math.random() * 2 - 1) * 200);
        const delay = Math.round(dist * 0.12 + Math.random() * 90);
        // +1px overlap hides hairline seams between shards
        shards.push(
          `<div class="piece slice reveal fx-${p.fx}" style="${boxStyle([x + left, y + top, tw + 1, th + 1])}--d:${delay}ms;--bx:${u(dx * 0.92)};--by:${u(dy * 0.92)};--ox:${u(-dx * 0.05)};--oy:${u(-dy * 0.05)};--spin:${spin}deg;background-image:url(${IMG}${p.file});background-size:${u(w)} ${u(h)};background-position:${u(-left)} ${u(-top)}" aria-hidden="true"></div>`
        );
      }
    }
    const flash = `<div class="burst-flash reveal" style="left:${u(ox)};top:${u(oy)}" aria-hidden="true"></div>`;
    return shards.join("") + flash;
  }

  const cls = ["piece", builds && "reveal", p.fx && `fx-${p.fx}`].filter(Boolean).join(" ");
  let style = boxStyle(p.box);
  if (builds) style += `--i:${i};`;
  if (p.delay) style += `--d:${p.delay}ms;`;
  if (p.rotate) style += `rotate:${p.rotate}deg;`;
  if (p.fx === "runway") style += `transform-origin:${u(RUNWAY_VP[0] - x)} ${u(RUNWAY_VP[1] - y)};`;

  const img = (file, alt, extra = "") =>
    `<img${extra} src="${IMG}${file}" alt="${esc(alt || "")}" loading="lazy" decoding="async">`;

  if (!p.parts) return img(p.file, p.alt, ` class="${cls}" style="${style}"`);

  const parts = p.parts
    .map(({ file, at: [l, t, pw, ph], fx }) =>
      img(file, "", ` class="part${fx ? ` fx-${fx}` : ""}" style="left:${l}%;top:${t}%;width:${pw}%;height:${ph}%"`)
    )
    .join("");
  return `<div class="${cls}" style="${style}">${img(p.file, p.alt)}${parts}</div>`;
}

function collageFrame(c) {
  const { label, video, under, over, stripeOnTop } = c.collage;
  const stripe = `<div class="stripe"></div>`;
  const vid = video
    ? `<video class="collage__video" style="${boxStyle(video.box)}" src="${video.src}" muted loop playsinline preload="none" aria-hidden="true"></video>`
    : "";

  return `
    <section class="frame collage" id="${idFor(c)}-collage" aria-label="${esc(label)}">
      ${under.map((p) => piece(p)).join("")}
      ${vid}
      ${stripeOnTop ? "" : stripe}
      ${over.map((p, i) => piece(p, i)).join("")}
      ${stripeOnTop ? stripe : ""}
    </section>${
      // the extra scroll step only exists when there is something to build
      over.length ? `\n    <div class="collage-step" data-collage="${idFor(c)}-collage" aria-hidden="true"></div>` : ""
    }`;
}

document.documentElement.classList.add("js");
const story = document.getElementById("story");
story.innerHTML = chapters.map((c) => timelineFrame(c) + (c.collage ? collageFrame(c) : "")).join("");

const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ------------------------------------------------------------------
   Stacked scrolling (desktop): from 1983 on, every frame pins to the top
   and the next one slides up over it. A collage takes two steps: first
   its background slides in, then the next step builds the collage.

   Stepping is done here rather than with CSS scroll-snap: one wheel
   gesture (or arrow / page key) = one step, animated with our own easing,
   and trackpad inertia is swallowed so a single flick never skips frames.
------------------------------------------------------------------- */
const stacked = matchMedia("(min-width: 701px)");
const steps = [...story.children];
story.insertAdjacentHTML(
  "beforeend",
  steps
    .map((el, i) => `<span class="snap" style="top:calc(${i} * var(--step))" data-for="${el.id || ""}"></span>`)
    .join("")
);

// every place the page can rest on: home, hello, then one per story step
const stops = () => [
  ...[...document.querySelectorAll(".home, .hello")].map((el) => el.offsetTop),
  ...[...story.querySelectorAll(".snap")].map((el) => story.offsetTop + el.offsetTop),
];

let animating = false;
let queued = 0;
let queuedDir = 0;
function requestStep(dir) {
  if (!animating) return step(dir);
  if (dir !== queuedDir) queued = 0; // changed direction: forget the old queue
  queuedDir = dir;
  queued = 1; // at most one step waits; never a run of frames
}
const snakeSvg = document.getElementById("snake-motion");
function scrollToY(target, duration = 1100) {
  if (reduceMotion) duration = 0;
  const start = scrollY;
  const dist = target - start;
  if (!dist) return;
  animating = true;
  const html = document.documentElement;
  html.classList.add("is-stepping"); // turns off CSS smooth-scroll / snapping while we drive
  snakeSvg?.pauseAnimations?.();
  const t0 = performance.now();
  const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2); // easeInOutCubic
  const frame = (now) => {
    const t = duration ? Math.min(1, (now - t0) / duration) : 1;
    scrollTo(0, start + dist * ease(t));
    if (t < 1) requestAnimationFrame(frame);
    else {
      animating = false;
      html.classList.remove("is-stepping");
      if (scrollY < innerHeight) snakeSvg?.unpauseAnimations?.();
      if (queued > 0) {
        queued--;
        step(queuedDir);
      }
    }
  };
  requestAnimationFrame(frame);
}

function step(dir) {
  const list = stops();
  const y = scrollY;
  // index of the stop we're at (or just past, in the direction of travel)
  let idx = list.findIndex((s) => s > y + 2);
  idx = idx === -1 ? list.length : idx; // first stop below us
  const atStop = list.some((s) => Math.abs(s - y) <= 2);
  const target = dir > 0 ? list[idx] : list[(atStop ? idx - 2 : idx - 1)];
  if (target === undefined) {
    // past the last stop: let the page scroll to its very end / start naturally
    scrollToY(dir > 0 ? document.documentElement.scrollHeight - innerHeight : 0);
    return;
  }
  scrollToY(Math.min(target, document.documentElement.scrollHeight - innerHeight));
}

// Wheel → steps. A trackpad keeps firing decaying "inertia" events for ~1s after a swipe;
// those must not trigger more steps, but a NEW swipe during that tail must. A new gesture
// is either a pause in the stream or a delta that jumps up (inertia only ever decays).
let lastWheel = 0;
let lastDelta = 0;
let peak = 0; // strongest delta of the current gesture
let decayed = false; // the current gesture has clearly faded (we're in its inertia tail)
const recent = []; // last 4 |deltaY|
let gestureUsed = false; // the current gesture already moved one step
addEventListener(
  "wheel",
  (e) => {
    if (!stacked.matches || e.ctrlKey) return; // ctrl+wheel = zoom
    e.preventDefault();
    // use the time the event was CREATED: if the page is busy for a moment (e.g. a collage
    // building), queued events arrive in a burst, and handling time would fake a "pause"
    const now = e.timeStamp || performance.now();
    const gap = now - lastWheel;
    lastWheel = now;
    const d = Math.abs(e.deltaMode === 1 ? e.deltaY * 33 : e.deltaY); // Firefox may report lines
    recent.push(d);
    if (recent.length > 4) recent.shift();

    // New gesture = a real pause in the stream (not a hiccup inside a decaying tail), or —
    // only once the previous swipe has faded — a clean ramp: three rises in a row that at
    // least double the force. Trackpad inertia jitters, but it never ramps like that.
    const afterPause = gap > 300 || (gap > 120 && d >= lastDelta * 0.9);
    const [a0, a1, a2, a3] = recent;
    const ramp = recent.length === 4 && a0 < a1 && a1 < a2 && a2 < a3 && a3 > a0 * 2 && a3 > 15;
    lastDelta = d;
    if (afterPause || (decayed && ramp)) {
      gestureUsed = false;
      decayed = false;
      peak = d;
    } else {
      peak = Math.max(peak, d);
      if (d < peak * 0.5) decayed = true;
    }
    if (gestureUsed || d < 3) return;
    gestureUsed = true;
    requestStep(Math.sign(e.deltaY));
  },
  { passive: false }
);

addEventListener("keydown", (e) => {
  if (!stacked.matches || e.altKey || e.ctrlKey || e.metaKey) return;
  if (e.target.closest && e.target.closest("input, textarea, select, [contenteditable]")) return;
  const down = ["ArrowDown", "PageDown"].includes(e.key) || (e.key === " " && !e.shiftKey);
  const up = ["ArrowUp", "PageUp"].includes(e.key) || (e.key === " " && e.shiftKey);
  if (!down && !up) return;
  e.preventDefault();
  if (!e.repeat || !animating) requestStep(down ? 1 : -1);
});

// Jump to a frame: on desktop go to its marker (sticky frames report a stuck position)
function goTo(id, instant = false) {
  const el = document.getElementById(id);
  if (!el) return false;
  const marker = stacked.matches && story.querySelector(`.snap[data-for="${CSS.escape(id)}"]`);
  const y = (marker || el).getBoundingClientRect().top + scrollY;
  if (instant) scrollTo(0, y);
  else scrollToY(y, 1100);
  return true;
}

document.addEventListener("click", (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (a && goTo(decodeURIComponent(a.hash.slice(1)))) {
    e.preventDefault();
    history.replaceState(null, "", a.hash);
  }
});

// The story is injected after load, so honour deep links like #y2008 ourselves.
if (location.hash) goTo(decodeURIComponent(location.hash.slice(1)), true);

/* ------------------------------------------------------------------
   Collages: preload early, play the video while visible, build the
   collage on its second scroll step (and un-build when scrolling back).
------------------------------------------------------------------- */
if ("IntersectionObserver" in window) {
  // 1) start loading images + video a full screen before the collage arrives
  const preload = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        preload.unobserve(e.target);
        e.target.querySelectorAll("img").forEach((img) => (img.loading = "eager"));
        // background-image slices: warm the cache too
        e.target.querySelectorAll(".slice").forEach((s, k) => {
          if (k === 0) new Image().src = s.style.backgroundImage.slice(5, -2);
        });
        const v = e.target.querySelector("video");
        if (v && !reduceMotion) v.preload = "auto";
      }
    },
    { rootMargin: "100% 0px" }
  );

  // 2) play the background video only while its collage is on screen
  const playback = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        const v = e.target.querySelector("video");
        if (!v || reduceMotion) continue;
        if (e.isIntersecting) {
          v.muted = true;
          v.play().catch(() => {}); // autoplay refused: the street still stays visible
        } else {
          v.pause();
        }
      }
    },
    { threshold: 0.05 }
  );

  // 3) desktop: build when the collage's second step starts scrolling in
  const build = new IntersectionObserver(
    (entries) => {
      if (!stacked.matches) return;
      for (const e of entries) {
        const collage = document.getElementById(e.target.dataset.collage);
        if (e.isIntersecting) collage.classList.add("is-built");
        else if (e.boundingClientRect.top > 0) collage.classList.remove("is-built"); // scrolled back up
      }
    },
    { rootMargin: "0px 0px -15% 0px" }
  );

  // 3b) phones (no stacking): build as soon as the collage is in view
  const buildInline = new IntersectionObserver(
    (entries) => {
      if (stacked.matches) return;
      for (const e of entries) if (e.isIntersecting) e.target.classList.add("is-built");
    },
    { threshold: 0.3 }
  );

  document.querySelectorAll(".collage").forEach((el) => {
    preload.observe(el);
    playback.observe(el);
    buildInline.observe(el);
  });
  document.querySelectorAll(".collage-step").forEach((el) => build.observe(el));

  // 4) hero: the snakes start moving 2s after load; pause the effect when off screen
  const snakes = document.getElementById("snake-motion");
  const home = document.querySelector(".home");
  if (snakes && home && !reduceMotion) {
    setTimeout(() => home.classList.add("snakes-on"), 2000);
    new IntersectionObserver(([e]) => {
      if (e.isIntersecting) snakes.unpauseAnimations();
      else snakes.pauseAnimations();
    }).observe(home);
  }
} else {
  document.querySelectorAll(".collage").forEach((el) => el.classList.add("is-built"));
}
