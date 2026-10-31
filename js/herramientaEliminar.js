
"use strict";

function iniciarEliminacion() {
    mostrarEstado(
        "Selecciona el átomo que deseas eliminar."
    );
}

function buscarAtomoCercano(x, y) {
    const posicion = pantallaAMolecular(x, y);

    let atomoCercano = null;
    let distanciaMinima = Infinity;

    const radio = plano2DActivo
        ? configuracionMolecular.radioAtomo2D
        : configuracionMolecular.radioAtomo3D;

    const radioSeleccion = radio + 8 / camara.zoom;

    for (const atomo of atomos) {
        const dx = atomo.x - posicion.x;
        const dy = atomo.y - posicion.y;

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
    if (!atomo) return;
    
    for (let i = enlaces.length - 1; i >= 0; i--) {
        const enlace = enlaces[i];

        if (
            enlace.a.id === atomo.id ||
            enlace.b.id === atomo.id
        ) {
            enlaces.splice(i, 1);
        }
    }

    const indice = atomos.findIndex(
        elemento => elemento.id === atomo.id
    );

    if (indice !== -1) {
        atomos.splice(indice, 1);
    }

    actualizarVista3D();
    actualizarVista2D();
    actualizarInterfaz();

    mostrarEstado(
        `${elementos[atomo.elemento].nombre} eliminado correctamente.`
    );
}
