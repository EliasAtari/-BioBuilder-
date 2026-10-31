
"use strict";

function iniciarEliminacion() {
    modoColocacion = false;
    modoEnlace = false;
    modoEliminacion = true;
    primerAtomo = null;

    if (estado) {
        estado.textContent =
            "Haz clic cerca del átomo que quieres eliminar.";
    }
}

function buscarAtomoCercano(x, y) {
    let atomoCercano = null;
    let distanciaMinima = Infinity;

    const radioSeleccion = plano2DActivo ? 14 : 24;

    for (const atomo of atomos) {
        const dx = atomo.x - x;
        const dy = atomo.y - y;

        const distancia = Math.hypot(dx, dy);

        if (
            distancia <= radioSeleccion &&
            distancia < distanciaMinima
        ) {
            distanciaMinima = distancia;
            atomoCercano = atomo;
        }
    }

    return atomoCercano;
}

function eliminarAtomo(atomo) {
    for (let i = enlaces.length - 1; i >= 0; i--) {
        if (
            enlaces[i].a.id === atomo.id ||
            enlaces[i].b.id === atomo.id
        ) {
            enlaces.splice(i, 1);
        }
    }

    atomo.esfera.remove();

    const indice = atomos.findIndex(a => a.id === atomo.id);

    if (indice !== -1) {
        atomos.splice(indice, 1);
    }

    actualizarDibujoEnlaces();
    actualizarInformacion();
    actualizarVista2D();

    if (atomos.length === 0 && mensajeInicial) {
        mensajeInicial.style.display = "";
    }

    if (estado) {
        estado.textContent = "Átomo y sus enlaces eliminados.";
    }
}
