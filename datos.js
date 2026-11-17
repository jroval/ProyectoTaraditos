// Datos del equipo. Edita aquí jugadores y partidos.
// Goles y asistencias se calculan solos a partir de los partidos.
window.DATOS = {
  equipo: "Proyecto Taraditos",
  liga: "PARDICUP F6 26/27",
  ligaUrl: "https://copafacil.com/pardicupf62627",
  actualizado: "2026-11-17",

  // pos: POR, DEF, MED, DEL
  // alias: cómo se le llama en el resumen de goles de cada partido
  jugadores: [
    // tarjetas: de Copa Fácil (17/11/2026) · partidos jugados: se calculan con los ausentes de cada partido
    { dorsal: 1,  nombre: "Luis Leita",                apodo: "",       alias: ["Leita", "Luis"],         pos: "POR", amarillas: 0, rojas: 0 },
    { dorsal: 33, nombre: "Alejandro Melero",          apodo: "",       alias: ["Melero", "Alejandro"],   pos: "DEF", amarillas: 0, rojas: 0 },
    { dorsal: 41, nombre: "Jaime Fernández",           apodo: "Pollo",  alias: ["Pollo", "Fernandez", "Fernández"],pos: "DEF", amarillas: 0, rojas: 0 },
    { dorsal: 49, nombre: "Jaime Miranda",             apodo: "",       alias: ["Miranda"],               pos: "DEF", amarillas: 0, rojas: 0 },
    { dorsal: 14, nombre: "Diego Camba",               apodo: "Coco",   alias: ["Coco", "Diego", "Camba"],pos: "MED", amarillas: 0, rojas: 0 },
    { dorsal: 8,  nombre: "Anxo Fernández",            apodo: "",       alias: ["Anxo"],                  pos: "MED", amarillas: 1, rojas: 0 },
    { dorsal: 29, nombre: "Asis Cobos",                apodo: "",       alias: ["Asis", "Asís", "Cobos"], pos: "MED", amarillas: 0, rojas: 0 },
    { dorsal: 2,  nombre: "Juan Carlos Santos",        apodo: "JC",     alias: ["JC", "Santos"],          pos: "MED", amarillas: 0, rojas: 0 },
    { dorsal: 9,  nombre: "César Sáenz de Santamaría", apodo: "",       alias: ["César", "Cesar"],        pos: "DEL", amarillas: 0, rojas: 0 },
    { dorsal: 7,  nombre: "Raúl Leita",                apodo: "",       alias: ["Raúl", "Raul"],          pos: "DEL", amarillas: 0, rojas: 0 },
    { dorsal: 10, nombre: "Daniel Boal",               apodo: "Veneno", alias: ["Veneno", "Boal"],        pos: "DEL", amarillas: 0, rojas: 0 },
    { dorsal: 36, nombre: "Jaime Robles",              apodo: "",       alias: ["Robles"],                pos: "DEL", amarillas: 0, rojas: 0 }
  ],

  // Clasificación (copiada de Copa Fácil). Orden: tal cual sale en la liga
  // [equipo, PJ, G, E, P, GF, GC]  · los puntos y la diferencia se calculan solos
  clasificacion: [
    ["Proyecto Taraditos", 2, 2, 0, 0, 18, 7],
    ["90°",                2, 1, 1, 0, 11, 7],
    ["Legacy FC",          2, 1, 1, 0, 10, 7],
    ["Real TGT Birras",    2, 1, 0, 1, 13, 10],
    ["La Pardineta",       2, 1, 0, 1, 5, 9],
    ["Los Chalaquitos",    1, 0, 0, 1, 2, 3],
    ["Dayser 2.0",         1, 0, 0, 1, 4, 8],
    ["RCF Valde",          2, 0, 0, 2, 8, 20]
  ],

  // Partidos: deja gl/gv en null si aún no se ha jugado
  // goles: [goleador, asistente] de nuestro equipo (asistente puede ir vacío)
  // ausentes: quién no jugó (con su apodo o alias)
  partidos: [
    {
      fecha: "2026-11-08", hora: "10:30", campo: "Campo 2",
      local: "Proyecto Taraditos", visitante: "RCF Valde", gl: 11, gv: 5,
      ausentes: ["Raúl", "Robles", "Pollo"],
      goles: [
        ["César", "Asis"], ["Veneno", "Asis"], ["JC", "Asis"], ["Miranda", "Asis"],
        ["Asis", "Anxo"], ["César", "Anxo"], ["César", "Anxo"], ["Asis", "César"],
        ["Veneno", "Asis"], ["Veneno", "JC"], ["JC", "Veneno"]
      ]
    },
    {
      fecha: "2026-11-15", hora: "10:30", campo: "Campo 2",
      local: "La Pardineta", visitante: "Proyecto Taraditos", gl: 2, gv: 7,
      ausentes: ["Raúl", "Robles", "Pollo", "César"],
      goles: [
        ["Asis", "JC"], ["Asis", "JC"], ["JC", "Asis"], ["JC", "Asis"],
        ["Veneno", "Leita"], ["Coco", "JC"], ["Miranda", "Veneno"]
      ]
    },
    { fecha: "2026-11-22", hora: "10:30", campo: "Campo 2", local: "Proyecto Taraditos", visitante: "Los Chalaquitos", gl: null, gv: null },
    { fecha: "2026-11-29", hora: "10:30", campo: "Campo 1", local: "Proyecto Taraditos", visitante: "Dayser 2.0",      gl: null, gv: null },
    { fecha: "2026-12-13", hora: "10:30", campo: "Campo 2", local: "Real TGT Birras",    visitante: "Proyecto Taraditos", gl: null, gv: null },
    { fecha: "2026-12-20", hora: "11:30", campo: "Campo 1", local: "Proyecto Taraditos", visitante: "90°",             gl: null, gv: null },
    { fecha: "2027-01-10", hora: "11:30", campo: "Campo 2", local: "Legacy FC",          visitante: "Proyecto Taraditos", gl: null, gv: null },
    { fecha: "2027-01-17", hora: "11:30", campo: "Campo 2", local: "RCF Valde",          visitante: "Proyecto Taraditos", gl: null, gv: null },
    { fecha: "2027-01-24", hora: "11:30", campo: "Campo 1", local: "Proyecto Taraditos", visitante: "La Pardineta",    gl: null, gv: null },
    { fecha: "2027-01-31", hora: "10:30", campo: "Campo 2", local: "Los Chalaquitos",    visitante: "Proyecto Taraditos", gl: null, gv: null },
    { fecha: "2027-02-07", hora: "10:30", campo: "Campo 1", local: "Dayser 2.0",         visitante: "Proyecto Taraditos", gl: null, gv: null },
    { fecha: "2027-02-21", hora: "10:30", campo: "Campo 2", local: "Proyecto Taraditos", visitante: "Real TGT Birras", gl: null, gv: null },
    { fecha: "2027-02-28", hora: "11:30", campo: "Campo 1", local: "90°",                visitante: "Proyecto Taraditos", gl: null, gv: null },
    { fecha: "2027-03-14", hora: "11:30", campo: "Campo 2", local: "Proyecto Taraditos", visitante: "Legacy FC",       gl: null, gv: null }
  ]
};
