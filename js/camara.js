
"use strict";

const camara = {
    zoom: 1,
    x: 0,
    y: 0,
    zoomMinimo: 0.2,
    zoomMaximo: 5
};

let arrastrando = false;
let inicioX = 0;
let inicioY = 0;

function pantallaAMolecular(x, y) {
    return {
        x: (x - camara.x) / camara.zoom,
        y: (y - camara.y) / camara.zoom
    };
}

function molecularAPantalla(x, y) {
    return {
        x: x * camara.zoom + camara.x,
        y: y * camara.zoom + camara.y
    };
}

function aplicarZoom(factor, centroX, centroY) {
    const zoomAnterior = camara.zoom;

    const nuevoZoom = Math.max(
        camara.zoomMinimo,
        Math.min(camara.zoomMaximo, zoomAnterior * factor)
    );

    const proporcion = nuevoZoom / zoomAnterior;

    camara.x = centroX - (centroX - camara.x) * proporcion;
    camara.y = centroY - (centroY - camara.y) * proporcion;

    camara.zoom = nuevoZoom;

    actualizarVistas();
}

function desplazarCamara(dx, dy) {
    camara.x += dx;
    camara.y += dy;

    actualizarVistas();
}

function actualizarVistas() {
    if (typeof actualizarVista2D === "function") {
        actualizarVista2D();
    }

    if (typeof actualizarVista3D === "function") {
        actualizarVista3D();
    }
}

function restablecerCamara() {
    camara.zoom = 1;
    camara.x = 0;
    camara.y = 0;

    actualizarVistas();
      }
