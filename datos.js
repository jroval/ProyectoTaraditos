// Datos del equipo que apuntamos a mano: jugadores y, de cada partido, goles y ausentes.
// Goles y asistencias se calculan solos a partir de los partidos.
window.DATOS = {
  equipo: "Proyecto Taraditos",
  liga: "PARDICUP F6 26/27",
  ligaUrl: "https://copafacil.com/pardicupf62627",

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

  // Lo que apuntamos nosotros de cada partido (el calendario y los resultados vienen solos de Copa Fácil, en liga.js)
  // Clave: "Local - Visitante", tal como sale en la web
  // goles: [goleador, asistente] (asistente puede ir vacío) · ausentes: quién no jugó (apodo o alias)
  partidos: {
    "Proyecto Taraditos - RCF Valde": {
      ausentes: ["Raúl", "Robles", "Pollo"],
      goles: [
        ["César", "Asis"], ["Veneno", "Asis"], ["JC", "Asis"], ["Miranda", "Asis"],
        ["Asis", "Anxo"], ["César", "Anxo"], ["César", "Anxo"], ["Asis", "César"],
        ["Veneno", "Asis"], ["Veneno", "JC"], ["JC", "Veneno"]
      ]
    },
    "La Pardineta - Proyecto Taraditos": {
      ausentes: ["Raúl", "Robles", "Pollo", "César"],
      goles: [
        ["Asis", "JC"], ["Asis", "JC"], ["JC", "Asis"], ["JC", "Asis"],
        ["Veneno", "Leita"], ["Coco", "JC"], ["Miranda", "Veneno"]
      ]
    }
  }
};
