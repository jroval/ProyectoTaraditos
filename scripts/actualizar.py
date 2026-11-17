"""Descarga de Copa Fácil la clasificación y nuestros partidos y genera liga.js.

Uso: python scripts/actualizar.py
Solo usa la librería estándar de Python.
"""
import json
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

BASE = "https://copafacil-web.firebaseio.com/events/-nolz7"
EQUIPO = "PROYECTO TARADITOS"
SALIDA = Path(__file__).resolve().parent.parent / "liga.js"

# Nombres tal como queremos que se vean en la web
NOMBRES = {
    "PROYECTO TARADITOS": "Proyecto Taraditos",
    "90°": "90°",
    "LEGACY FC": "Legacy FC",
    "REAL TGT BIRRAS": "Real TGT Birras",
    "LA PARDINETA": "La Pardineta",
    "LOS CHALAQUITOS": "Los Chalaquitos",
    "DAYSER 2.0": "Dayser 2.0",
    "RCF VALDE": "RCF Valde",
}


def leer(nodo):
    req = urllib.request.Request(f"{BASE}/{nodo}.json", headers={"User-Agent": "web-equipo/1.0"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.load(r) or {}


def nombre(equipo):
    n = equipo["name"].strip()
    return NOMBRES.get(n, n.title())


def main():
    equipos = leer("teams")
    partidos = leer("matchs")
    campos = {k: v.get("title", "").title() for k, v in leer("places").items()}

    nuestro = next(k for k, v in equipos.items() if v["name"].strip() == EQUIPO)

    # Clasificación: Copa Fácil guarda por equipo "clave=valor#..." y su posición en "col"
    # 0=pts 1=PJ 2=G 3=E 4=P 5=GF 6=GC
    filas = []
    for eq in equipos.values():
        fase = next(iter(eq.get("dt", {}).values()), None)
        if not fase:
            continue
        v = dict(x.split("=") for x in fase["dt"].strip("#").split("#"))
        filas.append((fase["col"], [nombre(eq)] + [int(v[k]) for k in "123456"]))
    clasificacion = [f for _, f in sorted(filas)]

    # Nuestros partidos, del primero al último
    nuestros = []
    for p in partidos.values():
        if nuestro not in (p.get("team1"), p.get("team2")):
            continue
        local = datetime.fromtimestamp((p["d_i"] - p.get("gmt", 0)) / 1000, timezone.utc)
        jugado = p.get("st") == 3 and "dt" in p
        nuestros.append({
            "fecha": local.strftime("%Y-%m-%d"),
            "hora": local.strftime("%H:%M"),
            "campo": campos.get(p.get("l"), ""),
            "local": nombre(equipos[p["team1"]]),
            "visitante": nombre(equipos[p["team2"]]),
            "gl": p["dt"].get("qt_g1") if jugado else None,
            "gv": p["dt"].get("qt_g2") if jugado else None,
        })
    nuestros.sort(key=lambda x: (x["fecha"], x["hora"]))

    js = lambda x: json.dumps(x, ensure_ascii=False)
    lista = lambda xs: "[\n    " + ",\n    ".join(js(x) for x in xs) + "\n  ]"
    nuevo = (
        "// Generado automáticamente desde Copa Fácil por scripts/actualizar.py. No editar a mano.\n"
        "window.LIGA = {\n"
        f'  "actualizado": {js(datetime.now(timezone.utc).strftime("%Y-%m-%d"))},\n'
        "  // [equipo, PJ, G, E, P, GF, GC]\n"
        f'  "clasificacion": {lista(clasificacion)},\n'
        f'  "partidos": {lista(nuestros)}\n'
        "};\n"
    )

    # Solo reescribe si cambia algo más que la fecha de actualización
    if SALIDA.exists():
        viejo = SALIDA.read_text(encoding="utf-8")
        quitar = lambda s: "\n".join(l for l in s.splitlines() if '"actualizado"' not in l)
        if quitar(viejo) == quitar(nuevo):
            print("Sin cambios en Copa Fácil")
            return
    SALIDA.write_text(nuevo, encoding="utf-8")
    jugados = sum(p["gl"] is not None for p in nuestros)
    print(f"liga.js actualizado: {len(clasificacion)} equipos, {len(nuestros)} partidos ({jugados} jugados)")


if __name__ == "__main__":
    main()
