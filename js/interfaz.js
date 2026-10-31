
"use strict";

const contadorAtomos = document.getElementById("cantidad-atomos");
const contadorEnlaces = document.getElementById("cantidad-enlaces");
const formula = document.getElementById("formula");
const estado = document.getElementById("estado");
const mensajeInicial = document.getElementById("mensaje-inicial");

function actualizarInformacion() {

    if (contadorAtomos) {
        contadorAtomos.textContent = atomos.length;
    }

    if (contadorEnlaces) {
        contadorEnlaces.textContent = enlaces.length;
    }

    actualizarFormula();
}

function actualizarFormula() {

    if (!formula) return;

    const cantidades = {};

    for (const atomo of atomos) {
        cantidades[atomo.elemento] =
            (cantidades[atomo.elemento] || 0) + 1;
    }

    const prioridad = {
        C: 0,
        H: 1
    };

    const orden = Object.keys(cantidades).sort((a, b) => {
        return (
            (prioridad[a] ?? 2) - (prioridad[b] ?? 2) ||
            a.localeCompare(b)
        );
    });

    formula.textContent = orden.length
        ? orden.map(simbolo => {
            const cantidad = cantidades[simbolo];

            return simbolo +
                (cantidad > 1 ? cantidad : "");
        }).join("")
        : "—";
}

function mostrarEstado(mensaje) {

    if (!estado) return;

    estado.textContent = mensaje;
}

function actualizarMensajeInicial() {

    if (!mensajeInicial) return;

    mensajeInicial.style.display =
        atomos.length === 0 ? "" : "none";
}

function actualizarInterfaz() {

    actualizarInformacion();
    actualizarMensajeInicial();
}
