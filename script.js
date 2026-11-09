/* ------------------------------------------------------------------
   Content — edit here.
   Each chapter renders a timeline frame, followed by its collage frame
   (only when it has images).
------------------------------------------------------------------- */
const IMG = "assets/img/";

const chapters = [
  {
    year: "1983",
    place: "Petah Tikva",
    placeX: 35,
    bullets: ["born & raised", "typical 80s-90s childhood", "military service"],
    collage: {
      label: "Petah Tikva in the 80s and 90s",
      // [file, top offset in Figma px]; first item sits under the lime stripe
      under: [["pt-street.png", 0]],
      over: [
        ["pt-logo.png", -10],
        ["pt-aviv.png", 2],
        ["pt-abc.png", 0],
        ["pt-beverly.png", 2],
        ["pt-burger.png", 2],
        ["pt-barbie.png", 2],
        ["pt-berry.png", 2],
        ["pt-highfive.png", 0],
        ["pt-rosh1.png", 2],
        ["pt-dance.png", 0],
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
      under: [["milan-duomo.png", 0]],
      over: [
        ["milan-elal.png", 0],
        ["milan-fashion.png", 0],
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
    collage: null, // empty in Figma for now
  },
  {
    year: "2016",
    place: "Petah Tikva",
    placeX: 1157,
    bullets: ["back home"],
    collage: null, // "back home" frame is empty in Figma for now
  },
  {
    year: "2017",
    place: "sparkles",
    placeX: 1522,
    bullets: ["that’s me"],
    collage: null, // empty in Figma for now
  },
];

/* ------------------------------------------------------------------
   Rendering
------------------------------------------------------------------- */
const esc = (s) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const idFor = (c) => `y${c.year}`;

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

function collageFrame(c) {
  if (!c.collage) return "";
  let i = 0;
  const layer = ([file, top]) =>
    `<img class="layer reveal" style="--i:${i++};top:calc(${top} * var(--u))" src="${IMG}${file}" alt="" loading="lazy" decoding="async">`;

  return `
    <section class="frame collage" id="${idFor(c)}-collage" aria-label="${esc(c.collage.label)}">
      ${c.collage.under.map(layer).join("")}
      <div class="stripe"></div>
      ${c.collage.over.map(layer).join("")}
    </section>`;
}

document.documentElement.classList.add("js");
document.getElementById("story").innerHTML = chapters
  .map((c) => timelineFrame(c) + collageFrame(c))
  .join("");

// The story is injected after load, so honour deep links like #y2008 ourselves.
if (location.hash) {
  const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
  if (target) target.scrollIntoView({ behavior: "instant", block: "start" });
}

/* ------------------------------------------------------------------
   Reveal collage layers as they scroll into view
------------------------------------------------------------------- */
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          io.unobserve(e.target);
          // wait until every layer has decoded so the collage builds up cleanly
          const imgs = [...e.target.querySelectorAll("img")];
          imgs.forEach((img) => (img.loading = "eager"));
          const loaded = (img) =>
            img.complete
              ? Promise.resolve()
              : new Promise((r) => {
                  img.addEventListener("load", r, { once: true });
                  img.addEventListener("error", r, { once: true });
                });
          const timeout = new Promise((r) => setTimeout(r, 2500)); // never leave a collage invisible
          Promise.race([Promise.all(imgs.map(loaded)), timeout]).then(() =>
            e.target.classList.add("in-view")
          );
        }
      }
    },
    { threshold: 0, rootMargin: "50% 0px" } // start loading half a screen early
  );
  document.querySelectorAll(".collage").forEach((el) => io.observe(el));
} else {
  document.querySelectorAll(".collage").forEach((el) => el.classList.add("in-view"));
}
