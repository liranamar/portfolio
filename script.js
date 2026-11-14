/* ------------------------------------------------------------------
   Content — edit here.
   Each chapter renders a timeline frame, followed by its collage frame.

   Collage pieces: { file, box: [left, top, width, height] in Figma px, ... }
     rotate: degrees
     fx:     entrance effect instead of the default pop-in (see styles.css):
             "runway" | "cross" | "slap" | "sticker" | "rise" | "drop" | "stamp" | "slide" |
             "road" | "drive"
     fill:   a plain block of colour instead of an image (e.g. "var(--lime)")
     delay:  ms before the entrance starts
     parts:  images riding inside the piece, at: [left, top, width, height] in % of it,
             optional rotate (degrees) and fx
   "under" pieces show straight away; "over" pieces build on the next scroll step —
   or, with `timed: true`, by themselves once the frame has arrived (timed by their delays).
   `runway: { delay }`: the lime stripe glitches into the runway floor (Figma "Rectangle 2").
   `noStripe: true`: no vertical stripe (the collage brings its own lime shape).
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
      // no extra scroll step: the video plays with the stripe, the city logo comes up after 3s,
      // and 2s later everything else gets stuck on like 90s stickers, one after another, each a
      // little crooked. The white die-cut border + shadow are baked into the "-sticker" PNGs
      // (20px padding each side), so the animation only moves pixels and stays smooth.
      timed: true,
      over: [
        { file: "pt-logo.png", box: [607, 129, 706, 803], delay: 3000 },
        ...[
          // [file, box, tilt°] — stacking order as in Figma (later = on top), stuck on in this order
          ["pt-aviv.png", [0, 627, 309, 455], -4],
          ["pt-abc.png", [1425, 0, 495, 432], -3],
          ["pt-beverly.png", [1092, 505, 828, 577], 2],
          ["pt-burger.png", [127, 695, 354, 387], 4],
          ["pt-barbie.png", [816, 744, 389, 338], -3],
          ["pt-berry.png", [610, 501, 360, 581], 3],
          ["pt-highfive.png", [0, 0, 415, 113], 3],
          ["pt-rosh1.png", [1238, 391, 352, 118], -5],
          ["pt-dance.png", [0, 268, 1054, 812], -2],
        ].map(([file, [x, y, w, h], rotate], k) => ({
          file: file.replace(".png", "-sticker.png"),
          box: [x - 20, y - 20, w + 40, h + 40],
          rotate,
          fx: "sticker",
          delay: 5000 + k * 260,
        })),
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
      // the frame arrives showing only the Duomo and the stripe; after 1s the stripe glitches
      // into the runway, then the models walk down it (front model first) and the El Al plane
      // crosses the sky from right to left, again every few seconds
      timed: true,
      runway: { delay: 1000 },
      under: [{ file: "milan-duomo.jpg", box: FULL }],
      over: [
        { file: "milan-elal.png", box: [1055, 76, 847, 267], fx: "cross", delay: 2000 },
        // stacking order as in Figma; [layer, box, walk-in order]
        ...[
          [1, [722, 249, 255, 831], 1],
          [2, [964, 64, 401, 1016], 0],
          [3, [604, 311, 168, 708], 2],
          [4, [512, 378, 150, 598], 3],
          [5, [431, 401, 130, 531], 4],
          [6, [338, 440, 137, 438], 5],
          [8, [292, 445, 120, 396], 6],
        ].map(([n, box, k]) => ({ file: `milan-model-${n}.png`, box, fx: "runway", delay: 2000 + k * 380 })),
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
      // rainbow glow GIF behind everything; portrait, turned on its side
      // (stretched to every edge so it fills the frame while it is the only thing showing)
      under: [{ file: "ny-rainbow.gif", box: [370, -470, 1180, 1920], rotate: -90 }],
      // the skyline photo, cut apart in Figma, assembles itself over the GIF: the river slides up
      // from the bottom; the buildings fall from the top almost together (40ms apart); once they
      // have all landed the sky drops in behind them; the Brooklyn Bridge stamps down; and the
      // lime deck shoots in from the right along the bridge like a bullet.
      // Stacking order as in Figma.
      timed: true,
      over: [
        // timeline (ms): river 600–1500 · buildings 1500–2450 · sky 2550–3300 ·
        // bridge 3400–3850 · deck 3950–4230
        { file: "ny-sky.png", box: [0, 0, 1960, 792], fx: "drop", delay: 2550 },
        { file: "ny-bridge.png", box: [0, 468, 1960, 454], fx: "stamp", delay: 3400 },
        { file: "ny-buildings-2.png", box: [1375, 0, 129, 625], fx: "drop", delay: 1620 },
        { file: "ny-buildings-3.png", box: [1390, 398, 565, 467], fx: "drop", delay: 1700 },
        { file: "ny-river.png", box: [0, 742, 1960, 349], fx: "rise", delay: 600 },
        { file: "ny-buildings-5.png", box: [15, 156, 399, 688], fx: "drop", delay: 1500 },
        { file: "ny-buildings-6.png", box: [381, 268, 411, 596], fx: "drop", delay: 1540 },
        { file: "ny-buildings-7.png", box: [698, 294, 517, 598], fx: "drop", delay: 1580 },
        { file: "ny-buildings-8.png", box: [1482, 189, 304, 510], fx: "drop", delay: 1660 },
        // the deck: Figma draws it upright and turns it -90°, so the box here is the upright one,
        // centred where the turned shape sits. Once the bridge has landed it shoots in from beyond
        // the right edge along the bridge's slope (--from).
        { file: "ny-deck.svg", box: [784, -311, 354, 1914], rotate: -90, fx: "slide", delay: 3950, from: [2300, 389] },
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
      // the "welcome to Petah Tikva" wall is there as soon as the frame arrives; the lime stripe
      // is now a road that slides in from the left, then the Barbie scooter drives along it from
      // the left into place, with Barbie the dog panting on the seat
      timed: true,
      noStripe: true,
      under: [{ file: "home-welcome.jpg", box: [4, 0, 1912, 956], alt: "Welcome to Petah Tikva" }],
      over: [
        { fill: "var(--lime)", box: [0, 928, 1916, 152], fx: "road", delay: 300 },
        {
          file: "home-scooter.png",
          box: [0, 444, 848, 636],
          fx: "drive",
          delay: 1000,
          parts: [
            // Barbie the dog pants: the tongue is cut out and animated over a dark mouth
            { file: "home-tongue.png", at: [38.71, 33.65, 4.47, 3.53], fx: "pant" },
            // the Barbie logo is stuck on the scooter, so it rides along with it
            { file: "home-barbie-logo.png", at: [26.43, 63.51, 38.33, 28.77], rotate: 15 },
          ],
        },
      ],
    },
  },
  {
    year: "2017",
    place: "sparkles",
    placeX: 1522,
    bullets: ["that’s me", "graphic designer", "lecturer"],
    listSize: 40, // Figma: this frame's list is set smaller (40px, 60px indent)
    listIndent: 60,
    collage: {
      label: "sparkles",
      // builds as soon as the frame arrives; once the last pastry is down, the cursor turns
      // into a pastry and moving the mouse scatters more of them (see "Pastry trail" below)
      timed: true,
      pastryTrail: true,
      under: [],
      // stuck on one after another like stickers: the logos first, then the "משה" pastries
      // rain on at the spots and angles set in Figma
      over: [
        { file: "sparkles-logo.jpg", box: [142.17, 217.91, 570.925, 218.968], rotate: -16.11, fx: "slap", alt: "sparkles — branding · uxui · solutions" },
        { file: "hit-logo.png", box: [1537.03, 812.74, 235.666, 155.454], rotate: 11.39, fx: "slap", alt: "HIT — Holon Institute of Technology" },
        { file: "logo-hash.png", box: [1448, 568, 202, 202], fx: "slap", alt: "חש" },
        { file: "logo-studio6b.png", box: [1361.97, 700.97, 216.007, 216.007], rotate: -21.41, fx: "slap", alt: "Studio 6B" },
        { file: "logo-college.png", box: [1610, 626, 230, 230], fx: "slap", alt: "המכללה למינהל" },
        ...[
          [993.82, 21.85, 211.997, 129.042, -170.96, "below"], // "משה 8" peeks out from under the lime stripe
          [449, 553, 191, 116, 0],
          [196.0, 874.0, 191, 116, 81.07],
          [41.18, 606.9, 191, 116, 128.26],
          [1106.23, 888.57, 132.406, 80.595, 128.26],
          [1828.43, 287.64, 132.406, 80.595, 34.34],
          [245.85, 44.5, 132.406, 80.595, 16.89],
          [1279.34, 279.14, 211.997, 129.042, -67.37],
          [1734.54, -37.15, 142.6, 86.8, 16.89],
        ].map(([x, y, w, h, rotate, below], k) => ({
          file: "moshe-sticker.png",
          box: [x, y, w, h],
          rotate,
          belowStripe: !!below,
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
// positions are offset by --ox/--oy: the artboard is centered in the full-window frame
const boxStyle = ([x, y, w, h]) =>
  `left:calc(var(--ox) + ${x} * var(--u));top:calc(var(--oy) + ${y} * var(--u));width:${u(w)};height:${u(h)};`;

// the runway's vanishing point (Figma px): where the edges of "Rectangle 2" meet;
// the models walk out of it toward the camera
const RUNWAY_VP = [170, 846];

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
      return `<a href="#${idFor(c)}" class="timeline__place ${on ? "is-active" : "is-muted"}" style="left:calc(var(--ox) + ${c.placeX} * var(--u))" tabindex="-1">${esc(c.place)}</a>`;
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
      <ul class="timeline__list"${
        active.listSize ? ` style="--list-size:${active.listSize};--list-indent:${active.listIndent}"` : ""
      }>${bullets}</ul>
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

  const cls = ["piece", builds && "reveal", p.fx && `fx-${p.fx}`].filter(Boolean).join(" ");
  let style = boxStyle(p.box);
  if (builds) style += `--i:${i};`;
  if (p.delay) style += `--d:${p.delay}ms;`;
  if (p.rotate) style += `rotate:${p.rotate}deg;`;
  if (p.from) style += `--from-x:${u(p.from[0])};--from-y:${u(p.from[1])};`;
  if (p.fx === "runway") style += `transform-origin:${u(RUNWAY_VP[0] - x)} ${u(RUNWAY_VP[1] - y)};`;

  const img = (file, alt, extra = "") =>
    `<img${extra} src="${IMG}${file}" alt="${esc(alt || "")}" loading="lazy" decoding="async">`;

  if (p.fill) return `<div class="${cls}" style="${style}background:${p.fill}" aria-hidden="true"></div>`;
  if (!p.parts) return img(p.file, p.alt, ` class="${cls}" style="${style}"`);

  const parts = p.parts
    .map(({ file, at: [l, t, pw, ph], fx, rotate }) =>
      img(
        file,
        "",
        ` class="part${fx ? ` fx-${fx}` : ""}" style="left:${l}%;top:${t}%;width:${pw}%;height:${ph}%${rotate ? `;rotate:${rotate}deg` : ""}"`
      )
    )
    .join("");
  return `<div class="${cls}" style="${style}">${img(p.file, p.alt)}${parts}</div>`;
}

function collageFrame(c) {
  const { label, video, under, over, stripeOnTop, timed, runway, noStripe, pastryTrail } = c.collage;
  // the stripe, or (runway) three copies of it that glitch into the runway: cyan + magenta
  // ghosts for the colour split, the lime one on top
  const stripe = runway
    ? `<div class="glitch-runway" style="--d:${runway.delay}ms" aria-hidden="true">${'<div></div>'.repeat(3)}</div>`
    : noStripe
      ? ""
      : `<div class="stripe"></div>`;
  const vid = video
    ? `<video class="collage__video" style="${boxStyle(video.box)}" src="${video.src}" muted loop playsinline preload="none" aria-hidden="true"></video>`
    : "";
  // pieces that build with the rest but tuck under the stripe (`belowStripe`)
  const built = (below) =>
    over.map((p, i) => (!!p.belowStripe === below ? piece(p, i) : "")).join("");

  return `
    <section class="frame collage${timed ? " is-timed" : ""}${pastryTrail ? " has-pastry-trail" : ""}" id="${idFor(c)}-collage" aria-label="${esc(label)}">
      ${under.map((p) => piece(p)).join("")}
      ${vid}
      ${built(true)}
      ${stripeOnTop ? "" : stripe}
      ${built(false)}
      ${stripeOnTop ? stripe : ""}
      ${
        // the end of the story: once everything has landed, a button back to the top opens up
        pastryTrail ? `<a class="again" href="#home">let’s do it again</a>` : ""
      }
    </section>${
      // the extra scroll step only exists when there is something to build on scroll
      over.length && !timed ? `\n    <div class="collage-step" data-collage="${idFor(c)}-collage" aria-hidden="true"></div>` : ""
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
let arrivedAt = -Infinity; // when the last step finished (performance.now / event time base)
const SETTLE = 250; // ms after arriving during which input is still swallowed
// Input while a step is moving (or just after it lands) is ignored, never queued: every frame
// waits for its own, new scroll. A queued step used to fire on its own right after arriving.
function requestStep(dir) {
  if (animating || performance.now() - arrivedAt < SETTLE) return;
  step(dir);
}
function scrollToY(target, duration = 1100) {
  if (reduceMotion) duration = 0;
  const start = scrollY;
  const dist = target - start;
  if (!dist) return;
  animating = true;
  const html = document.documentElement;
  html.classList.add("is-stepping"); // turns off CSS smooth-scroll / snapping while we drive
  const t0 = performance.now();
  const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2); // easeInOutCubic
  const frame = (now) => {
    const t = duration ? Math.min(1, (now - t0) / duration) : 1;
    scrollTo(0, start + dist * ease(t));
    if (t < 1) requestAnimationFrame(frame);
    else {
      animating = false;
      arrivedAt = performance.now();
      html.classList.remove("is-stepping");
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
    gestureUsed = true; // whatever happens, this gesture is spent
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

  // 3c) desktop, timed collages: start the clock once the frame has fully slid in;
  // reset when scrolled back above it, so it plays again next time
  const buildTimed = new IntersectionObserver(
    (entries) => {
      if (!stacked.matches) return;
      for (const e of entries) {
        if (e.intersectionRatio > 0.97) e.target.classList.add("is-built");
        else if (e.boundingClientRect.top > 0 && e.intersectionRatio < 0.5) e.target.classList.remove("is-built");
      }
    },
    { threshold: [0, 0.5, 0.98] }
  );
  document.querySelectorAll(".collage.is-timed").forEach((el) => buildTimed.observe(el));

  document.querySelectorAll(".collage").forEach((el) => {
    preload.observe(el);
    playback.observe(el);
    buildInline.observe(el);
  });
  document.querySelectorAll(".collage-step").forEach((el) => build.observe(el));

} else {
  document.querySelectorAll(".collage").forEach((el) => el.classList.add("is-built"));
}

/* ------------------------------------------------------------------
   Pastry trail (sparkles): once every sticker and pastry has landed,
   the mouse pointer becomes a pastry, and moving it over the frame
   drops more pastries along the way — each at a random angle and
   size. Mouse only (touch scrolls); reset when you scroll back up.
   The same moment opens the "let's do it again" button (.pastry-mode).
------------------------------------------------------------------- */
document.querySelectorAll(".collage.has-pastry-trail").forEach((frame) => {
  const READY_AFTER = 4200; // ms after the build starts: the last pastry has landed by then
  const STEP = 70; // px of mouse travel between two new pastries
  const MAX = 160; // oldest ones are removed beyond this
  let timer = null;
  let last = null;
  const added = [];

  const reset = () => {
    clearTimeout(timer);
    timer = null;
    // touch the class only when it is there: even a no-op classList.remove() counts as a
    // mutation, which would wake the observer below again and loop forever (frozen page)
    if (frame.classList.contains("pastry-mode")) frame.classList.remove("pastry-mode");
    added.splice(0).forEach((el) => el.remove());
    last = null;
  };
  // follow the build: start the clock when the collage is built, undo when it is un-built
  new MutationObserver(() => {
    if (frame.classList.contains("is-built")) {
      if (!timer && !frame.classList.contains("pastry-mode"))
        timer = setTimeout(() => frame.classList.add("pastry-mode"), reduceMotion ? 0 : READY_AFTER);
    } else reset();
  }).observe(frame, { attributes: true, attributeFilter: ["class"] });

  frame.addEventListener("pointermove", (e) => {
    if (e.pointerType !== "mouse" || !frame.classList.contains("pastry-mode")) return;
    const r = frame.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    if (last && Math.hypot(x - last.x, y - last.y) < STEP) return;
    last = { x, y };
    const img = document.createElement("img");
    img.src = `${IMG}moshe-sticker.png`;
    img.alt = "";
    img.className = "pastry-drop";
    const w = 70 + Math.random() * 170; // Figma px, like the pastries already on the frame
    img.style.cssText = `left:${x}px;top:${y}px;width:calc(${w.toFixed(0)} * var(--u));rotate:${(Math.random() * 360).toFixed(0)}deg`;
    frame.appendChild(img);
    added.push(img);
    if (added.length > MAX) added.shift().remove();
  });
});
