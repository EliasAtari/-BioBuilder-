
"use strict";

const contadorAtomos = document.getElementById("cantidad-atomos");
const contadorEnlaces = document.getElementById("cantidad-enlaces");
const formula = document.getElementById("formula");
const estado = document.getElementById("estado");

function actualizarInformacion() {
    if (contadorAtomos) {
        contadorAtomos.textContent = atomos.length;
    }

    if (contadorEnlaces) {
        contadorEnlaces.textContent = enlaces.length;
    }

    if (!formula) return;

    const cantidades = {};

    for (const atomo of atomos) {
        cantidades[atomo.elemento] =
            (cantidades[atomo.elemento] || 0) + 1;
    }

    const prioridad = { C: 0, H: 1 };

    const orden = Object.keys(cantidades).sort((a, b) =>
        (prioridad[a] ?? 2) - (prioridad[b] ?? 2) ||
        a.localeCompare(b)
    );

    formula.textContent = orden.length
        ? orden.map(simbolo =>
            simbolo +
            (cantidades[simbolo] > 1
                ? cantidades[simbolo]
                : "")
        ).join("")
        : "—";
}
