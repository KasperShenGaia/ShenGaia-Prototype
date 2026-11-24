(function () {
  const D = window.SHENGAIA;

  // Små hjælpere
  const el = (tag, cls, text) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  };

  const roligt = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Karrusel
  (function () {
    const slides = document.getElementById("slides");
    const dots = document.getElementById("dots");
    const box = document.getElementById("carousel");
    let i = 0, timer = null;
    const items = D.karrusel.map((k, n) => {
      const fig = el("figure", "slide");
      const img = el("img");
      img.src = k.billede; img.alt = k.alt;
      fig.appendChild(img);
      const cap = el("figcaption");
      cap.appendChild(el("strong", "", k.titel));
      cap.appendChild(el("span", "", k.tekst));
      fig.appendChild(cap);
      slides.appendChild(fig);
      const d = el("button", "dot");
      d.type = "button";
      d.setAttribute("aria-label", `Billede ${n + 1}`);
      d.addEventListener("click", () => { gaa(n); genstart(); });
      dots.appendChild(d);
      return [fig, d];
    });
    function gaa(n) {
      i = (n + items.length) % items.length;
      items.forEach(([f, d], j) => { f.classList.toggle("on", j === i); d.classList.toggle("on", j === i); });
    }
    function genstart() {
      clearInterval(timer);
      if (!roligt) timer = setInterval(() => gaa(i + 1), 6000);
    }
    document.getElementById("car-prev").addEventListener("click", () => { gaa(i - 1); genstart(); });
    document.getElementById("car-next").addEventListener("click", () => { gaa(i + 1); genstart(); });
    box.addEventListener("mouseenter", () => clearInterval(timer));
    box.addEventListener("mouseleave", genstart);
    let x0 = null;
    box.addEventListener("touchstart", e => { x0 = e.touches[0].clientX; }, { passive: true });
    box.addEventListener("touchend", e => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 40) { gaa(dx < 0 ? i + 1 : i - 1); genstart(); }
      x0 = null;
    });
    gaa(0); genstart();
  })();

  // Kredsløbet
  (function () {
    const ikoner = {
      palme: '<path d="M24 44V20"/><path d="M24 20C18 12 10 12 5 15"/><path d="M24 20C30 12 38 12 43 15"/><path d="M24 20C20 10 22 5 26 3"/><path d="M24 20C16 18 10 22 8 28"/><path d="M24 20C32 18 38 22 40 28"/><path d="M14 44H34"/>',
      saek: '<path d="M16 12H32L36 20C40 28 38 42 24 42C10 42 8 28 12 20Z"/><path d="M18 12L16 6H32L30 12"/><path d="M19 30H29"/>',
      anlaeg: '<rect x="12" y="10" width="24" height="30" rx="4"/><path d="M24 34C19 34 18 29 21 25C21 28 23 28 23 26C23 22 26 20 27 18C27 23 30 25 29 30C28 33 26 34 24 34Z"/><path d="M36 16H42V6"/><path d="M8 44H40"/>',
      biokul: '<path d="M8 40L12 30L19 28L23 34L22 40Z"/><path d="M20 40L24 24L32 20L39 26L40 40Z"/><path d="M6 40H42"/><circle cx="31" cy="29" r="1.5"/><circle cx="26" cy="33" r="1.5"/>',
      lastbil: '<path d="M4 14H28V34H4Z"/><path d="M28 20H37L44 27V34H28"/><circle cx="12" cy="36" r="4"/><circle cx="36" cy="36" r="4"/>',
      spire: '<path d="M24 42V22"/><path d="M24 26C24 18 18 13 9 13C9 21 15 26 24 26Z"/><path d="M24 22C24 14 30 9 39 9C39 17 33 22 24 22Z"/><path d="M10 42H38"/>'
    };
    const F = D.kredslob, n = F.length;
    const svg = document.getElementById("cycle-svg");
    const C = 220, R = 160, r = 40;
    const pos = k => {
      const a = -Math.PI / 2 + (2 * Math.PI * k) / n;
      return [C + R * Math.cos(a), C + R * Math.sin(a)];
    };
    const label = (k, f) => {
      const [x] = pos(k), t = `${k + 1}. ${f.titel}`;
      if (Math.abs(x - C) < 1) return `<text y="${k === 0 ? -(r + 12) : r + 24}" text-anchor="middle" class="node-t">${t}</text>`;
      return x > C
        ? `<text x="${r + 10}" y="5" text-anchor="start" class="node-t">${t}</text>`
        : `<text x="${-(r + 10)}" y="5" text-anchor="end" class="node-t">${t}</text>`;
    };
    let html = `<defs><marker id="pil" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="#8FA05A"/></marker></defs>`;
    html += `<circle cx="${C}" cy="${C}" r="${R}" fill="none" stroke="#DDD6C2" stroke-width="3"/>`;
    for (let k = 0; k < n; k++) {
      const a1 = -Math.PI / 2 + (2 * Math.PI * k) / n + 0.32, a2 = -Math.PI / 2 + (2 * Math.PI * (k + 1)) / n - 0.32;
      const p1 = [C + R * Math.cos(a1), C + R * Math.sin(a1)], p2 = [C + R * Math.cos(a2), C + R * Math.sin(a2)];
      html += `<path d="M${p1[0]} ${p1[1]} A${R} ${R} 0 0 1 ${p2[0]} ${p2[1]}" fill="none" stroke="#8FA05A" stroke-width="3" marker-end="url(#pil)"/>`;
    }
    html += `<g id="orbit"><circle cx="${C}" cy="${C - R}" r="7" fill="#3C1518"/></g>`;
    F.forEach((f, k) => {
      const [x, y] = pos(k);
      html += `<g class="node" data-k="${k}" tabindex="0" role="button" aria-label="${f.titel}" transform="translate(${x} ${y})">
        <circle r="${r}" class="node-bg"/>
        <g transform="translate(-18 -20) scale(.75)" fill="none" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" class="node-ic">${ikoner[f.ikon] || ""}</g>
        ${label(k, f)}
      </g>`;
    });
    html += `<text x="${C}" y="${C - 6}" text-anchor="middle" class="mid-1">Cirkulært</text><text x="${C}" y="${C + 16}" text-anchor="middle" class="mid-2">landbrug</text>`;
    svg.innerHTML = html;
    const smal = window.matchMedia("(max-width: 760px)");
    const tilpas = () => {
      svg.setAttribute("viewBox", smal.matches ? "0 0 440 440" : "-150 -10 740 470");
      svg.classList.toggle("smal", smal.matches);
    };
    smal.addEventListener("change", tilpas);
    tilpas();

    const nodes = [...svg.querySelectorAll(".node")];
    const orbit = svg.querySelector("#orbit");
    const tCount = document.getElementById("cycle-count");
    const tTitle = document.getElementById("cycle-title");
    const tText = document.getElementById("cycle-text");
    const play = document.getElementById("cycle-play");
    let aktivK = 0, drej = 0, timer = null, korer = !roligt;

    function vaelg(k) {
      const ny = (k + n) % n;
      let trin = ny - aktivK;
      if (trin > n / 2) trin -= n;
      if (trin < -n / 2) trin += n;
      drej += trin * (360 / n);
      aktivK = ny;
      orbit.style.transform = `rotate(${drej}deg)`;
      nodes.forEach((g, j) => g.classList.toggle("on", j === aktivK));
      tCount.textContent = `Fase ${aktivK + 1} af ${n}`;
      tTitle.textContent = F[aktivK].titel;
      tText.textContent = F[aktivK].tekst;
    }
    function start() { clearInterval(timer); if (korer) timer = setInterval(() => vaelg(aktivK + 1), 4500); play.textContent = korer ? "Pause" : "Afspil"; }
    nodes.forEach((g, j) => {
      const v = () => { korer = false; vaelg(j); start(); };
      g.addEventListener("click", v);
      g.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); v(); } });
    });
    document.getElementById("cycle-prev").addEventListener("click", () => { korer = false; vaelg(aktivK - 1); start(); });
    document.getElementById("cycle-next").addEventListener("click", () => { korer = false; vaelg(aktivK + 1); start(); });
    play.addEventListener("click", () => { korer = !korer; start(); });
    vaelg(0); start();
  })();

  // Roller
  const roller = document.getElementById("roller");
  D.roller.forEach(r => {
    const card = el("div", "role");
    card.appendChild(el("h3", "", r.titel));
    card.appendChild(el("p", "role-who", r.hvem));
    card.appendChild(el("h4", "", "Bidrager med"));
    card.appendChild(el("p", "", r.bidrager));
    card.appendChild(el("h4", "", "Får"));
    const ul = el("ul");
    r.faar.forEach(f => ul.appendChild(el("li", "", f)));
    card.appendChild(ul);
    roller.appendChild(card);
  });

  // MRV-kæden
  const trin = D.parti.trin;
  document.getElementById("parti-id").textContent = D.parti.id;
  const stepper = document.getElementById("stepper");
  const card = document.getElementById("step-card");
  const prev = document.getElementById("prev");
  const next = document.getElementById("next");
  let aktiv = 0;

  const knapper = trin.map((t, i) => {
    const b = el("button", "step");
    b.type = "button";
    b.setAttribute("role", "tab");
    b.innerHTML = `<span class="step-n">${i + 1}</span><span class="step-t"></span>`;
    b.querySelector(".step-t").textContent = t.titel;
    b.addEventListener("click", () => vis(i));
    stepper.appendChild(b);
    return b;
  });

  function vis(i) {
    aktiv = i;
    const t = trin[i];
    knapper.forEach((b, j) => {
      b.classList.toggle("active", j === i);
      b.classList.toggle("done", j < i);
      b.setAttribute("aria-selected", j === i ? "true" : "false");
    });
    card.innerHTML = "";
    const head = el("div", "step-head");
    head.appendChild(el("span", "step-count", `Trin ${i + 1} af ${trin.length}`));
    head.appendChild(el("h3", "", t.titel));
    card.appendChild(head);
    card.appendChild(el("p", "", t.tekst));
    const why = el("p", "why");
    why.appendChild(el("strong", "", "Hvorfor det er vigtigt. "));
    why.appendChild(document.createTextNode(t.hvorfor));
    card.appendChild(why);
    const tbl = el("table", "data");
    const tb = el("tbody");
    t.data.forEach(([k, v]) => {
      const tr = el("tr");
      tr.appendChild(el("th", "", k));
      tr.appendChild(el("td", "", v));
      tb.appendChild(tr);
    });
    tbl.appendChild(tb);
    card.appendChild(tbl);
    prev.disabled = i === 0;
    next.textContent = i === trin.length - 1 ? "Giv din vurdering →" : "Næste →";
  }

  prev.addEventListener("click", () => aktiv > 0 && vis(aktiv - 1));
  next.addEventListener("click", () => {
    if (aktiv < trin.length - 1) vis(aktiv + 1);
    else document.getElementById("vurdering").scrollIntoView({ behavior: "smooth" });
  });
  vis(0);

  // Formular
  const holder = document.getElementById("form-holder");
  if (D.formUrl) {
    const f = el("iframe");
    f.src = D.formUrl;
    f.title = "Din vurdering";
    f.loading = "lazy";
    holder.appendChild(f);
  } else {
    holder.appendChild(el("p", "placeholder", "Formularen kommer her, når Google Formen er oprettet."));
  }
})();
