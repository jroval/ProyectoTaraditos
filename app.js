const D = window.DATOS;
const L = window.LIGA;
// Calendario, resultados y clasificación vienen de Copa Fácil (liga.js);
// goles y ausentes de cada partido, de datos.js
D.clasificacion = L.clasificacion;
D.actualizado = L.actualizado;
D.partidos = L.partidos.map((p) => ({ ...p, ...(D.partidos[p.local + " - " + p.visitante] || {}) }));
const $ = (id) => document.getElementById(id);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const n = (v) => (v == null ? "–" : v);

// Goles y asistencias a partir de los partidos
const norm = (s) => s.trim().toLowerCase();
const porAlias = {};
for (const j of D.jugadores) {
  j.goles = 0; j.asist = 0; j.pj = 0;
  for (const a of j.alias || []) porAlias[norm(a)] = j;
}
// Partidos jugados: todos los de la plantilla menos los ausentes de cada partido ya jugado
for (const p of D.partidos) {
  if (p.gl == null || p.gv == null) continue;
  const fuera = new Set((p.ausentes || []).map((a) => {
    if (!porAlias[norm(a)]) console.warn("Ausente sin identificar:", a);
    return porAlias[norm(a)];
  }));
  for (const j of D.jugadores) if (!fuera.has(j)) j.pj++;
}
for (const p of D.partidos) for (const [g, a] of p.goles || []) {
  if (porAlias[norm(g)]) porAlias[norm(g)].goles++; else console.warn("Goleador sin identificar:", g);
  if (a) { if (porAlias[norm(a)]) porAlias[norm(a)].asist++; else console.warn("Asistente sin identificar:", a); }
}
// Valoraciones de cada partido: el crack suma 3 al MVP y el dandy 2
const VALORACIONES = [["crack", "El Crack", 3], ["dandy", "El Dandy", 2], ["vayaDia", "Vaya Día", 0], ["duro", "El Duro", 0]];
for (const j of D.jugadores) j.puntos = j.goles + j.asist;
for (const p of D.partidos) for (const [k, , pts] of VALORACIONES) {
  const nom = p.valoraciones?.[k];
  if (!nom) continue;
  if (porAlias[norm(nom)]) porAlias[norm(nom)].puntos += pts; else console.warn("Valoración sin identificar:", nom);
}
const POS ={ POR: "Portero", DEF: "Defensa", MED: "Medio", DEL: "Delantero" };

// Cabecera
$("liga").textContent = D.liga;
$("equipo").textContent = D.equipo;
$("liga-link").href = D.ligaUrl;
$("actualizado").textContent = "Actualizado: " + new Date(D.actualizado).toLocaleDateString("es-ES");

// Marca en el menú la página actual
const pagina = location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".tabs a").forEach((a) => {
  if (a.getAttribute("href") === pagina) a.setAttribute("aria-current", "page");
});

// Resumen a partir de los partidos jugados
const jugados = D.partidos.filter((p) => p.gl != null && p.gv != null);
let v = 0, e = 0, d = 0, gf = 0, gc = 0;
for (const p of jugados) {
  const local = p.local === D.equipo;
  const a = local ? p.gl : p.gv, b = local ? p.gv : p.gl;
  gf += a; gc += b;
  a > b ? v++ : a === b ? e++ : d++;
}
if ($("resumen")) $("resumen").innerHTML = [
  [v * 3 + e, "Puntos"], [jugados.length, "Jugados"], [v, "Ganados"], [e, "Empatados"], [d, "Perdidos"], [gf + ":" + gc, "Goles"]
].map(([n, t]) => `<div class="dato"><b>${n}</b><span>${t}</span></div>`).join("");

// Plantilla
const LINEAS = [["Portero", ["POR"]], ["Defensas", ["DEF"]], ["Medios", ["MED"]], ["Delanteros", ["DEL"]]];
// MVP: quien más puntos lleva = goles + asistencias + 3 por crack + 2 por dandy (si hay empate, todos)
const mvp = Math.max(...D.jugadores.map((j) => j.puntos));
const ficha = (j) => `
    <article class="jugador${mvp > 0 && j.puntos === mvp ? " mvp" : ""}">
      <div class="mote">${esc(j.apodo || j.alias?.[0] || j.nombre)}</div>
      <div class="mote dorsal">${j.dorsal}</div>
      <div class="pos">${esc(j.nombre)}</div>
      <div class="stats"><span><b>${j.goles}</b> goles</span><span><b>${j.asist}</b> as.</span><span><b>${n(j.pj)}</b> pj</span></div>
    </article>`;
if ($("jugadores")) $("jugadores").innerHTML = LINEAS.map(([titulo, pos]) => {
  const js = D.jugadores
    .filter((j) => pos.includes(j.pos))
    .sort((a, b) => pos.indexOf(a.pos) - pos.indexOf(b.pos) || a.dorsal - b.dorsal);
  return `<h3 class="linea">${titulo}</h3><div class="grid">${js.map(ficha).join("")}</div>`;
}).join("");

// Líneas del campo: área alrededor del portero cortando a los defensas,
// y abajo la línea de medio campo con media luna
function dibujarCampo() {
  const c = $("jugadores");
  if (!c) return;
  const grids = c.querySelectorAll(".grid");
  if (grids.length < 2) return;
  // El SVG ocupa todo el ancho de la ventana para que las líneas lleguen a los laterales
  const caja = c.getBoundingClientRect();
  const W = document.documentElement.clientWidth, H = c.clientHeight;
  const cx = caja.left + caja.width / 2;
  const mitad = (el) => { const b = el.getBoundingClientRect(); return b.top - caja.top + b.height / 2; };
  const fichaPortero = grids[0].querySelector(".jugador");
  const yFondo = mitad(fichaPortero);
  const yArea = mitad(grids[1].querySelector(".jugador"));
  const a = Math.min(caja.width / 2 - 4, Math.max(fichaPortero.offsetWidth / 2 + 60, caja.width * 0.22));
  const r = Math.min(caja.width * 0.18, 130);
  const s = (x) => x.toFixed(1);
  c.querySelector(".lineas")?.remove();
  c.insertAdjacentHTML("afterbegin", `
    <svg class="lineas" viewBox="0 0 ${W} ${H}" style="left:${s(-caja.left)}px;width:${W}px" aria-hidden="true">
      <path d="M0 ${s(yFondo)} H${W}"/>
      <path d="M${s(cx - a)} ${s(yFondo)} V${s(yArea)} H${s(cx + a)} V${s(yFondo)}"/>
      <path d="M0 ${H - 1} H${W}"/>
      <path d="M${s(cx - r)} ${H - 1} A${s(r)} ${s(r)} 0 0 1 ${s(cx + r)} ${H - 1}"/>
    </svg>`);
}
if ($("jugadores")) {
  dibujarCampo();
  new ResizeObserver(dibujarCampo).observe($("jugadores"));
  addEventListener("resize", dibujarCampo);
  document.fonts?.ready.then(dibujarCampo);
}

// Clasificación
if ($("clasificacion")) $("clasificacion").innerHTML = D.clasificacion
  .map(([eq, pj, g, e, p, gf, gc], i) => `
    <tr class="${eq === D.equipo ? "nuestro" : ""}">
      <td>${i + 1}</td><td class="eq-nom">${esc(eq)}</td><td class="pts">${g * 3 + e}</td>
      <td>${pj}</td><td>${g}</td><td>${e}</td><td>${p}</td><td>${gf}</td><td>${gc}</td>
      <td>${gf - gc > 0 ? "+" : ""}${gf - gc}</td>
    </tr>`).join("");

// Goleadores
if ($("tabla")) $("tabla").innerHTML = [...D.jugadores]
  .sort((a, b) => b.goles - a.goles || b.asist - a.asist || a.nombre.localeCompare(b.nombre))
  .map((j, i) => `
    <tr><td>${i + 1}</td><td>${esc(j.nombre)}</td><td>${n(j.pj)}</td>
    <td class="goles">${j.goles}</td><td>${j.asist}</td><td>${j.amarillas}</td><td>${j.rojas}</td></tr>`).join("");

const BALON = `<svg class="balon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"/>
  <polygon points="12,8 15.8,10.76 14.35,15.24 9.65,15.24 8.2,10.76"/>
  <path d="M12 8V2M15.8 10.76L21.5 8.9M14.35 15.24L17.9 20.1M9.65 15.24L6.1 20.1M8.2 10.76L2.5 8.9"/></svg>`;

// Partidos (del primero al último)
if ($("lista-partidos")) $("lista-partidos").innerHTML = [...D.partidos]
  .sort((a, b) => a.fecha.localeCompare(b.fecha))
  .map((p, i) => {
    const jugado = p.gl != null && p.gv != null;
    let cls = "";
    if (jugado) {
      const local = p.local === D.equipo;
      const a = local ? p.gl : p.gv, b = local ? p.gv : p.gl;
      cls = a > b ? "v" : a === b ? "e" : "d";
    }
    const eq = (n) => `<span class="eq ${n === D.equipo ? "nuestro" : ""}">${esc(n)}</span>`;
    const fecha = new Date(p.fecha).toLocaleDateString("es-ES", { weekday: "short", day: "numeric", month: "short" });
    return `
      <div class="partido ${cls}">
        ${eq(p.local)}
        <span class="marcador">${jugado ? p.gl + " – " + p.gv : "vs"}</span>
        ${eq(p.visitante)}
        <div class="info">Jornada ${i + 1} · ${fecha} · ${p.hora} · ${esc(p.campo)}</div>
        ${p.goles ? `<ul class="goles-partido">${p.goles.map(([g, a]) =>
          `<li>${BALON}<b>${esc(g)}</b>${a ? ` <span>(${esc(a)})</span>` : ""}</li>`).join("")}</ul>` : ""}
        ${jugado ? `<div class="valoraciones">${VALORACIONES.map(([k, t]) =>
          `<div><span>${t}</span><b>${esc(p.valoraciones?.[k] || "–")}</b></div>`).join("")}</div>` : ""}
      </div>`;
  }).join("");
