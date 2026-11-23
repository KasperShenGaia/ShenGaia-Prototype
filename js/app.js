(function () {
  const D = window.SHENGAIA;

  // Små hjælpere
  const el = (tag, cls, text) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  };

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
