
"use strict";

let primerAtomo = null;

function valenciaUsada(atomo) {
    let total = 0;

    for (const enlace of enlaces) {
        if (
            enlace.a.id === atomo.id ||
            enlace.b.id === atomo.id
        ) {
            total += enlace.orden;
        }
    }

    return total;
}

function iniciarCreacionEnlace() {
    primerAtomo = null;

    mostrarEstado(
        "Selecciona el primer átomo para crear un enlace."
    );
}

function seleccionarAtomoParaEnlace(x, y) {
    const atomo = buscarAtomoCercano(x, y);

    if (!atomo) {
        mostrarEstado("Selecciona un átomo válido.");
        return;
    }

    if (!primerAtomo) {
        primerAtomo = atomo;

        mostrarEstado(
            `Primer átomo: ${atomo.elemento}. Selecciona el segundo.`
        );

        return;
    }

    if (primerAtomo.id === atomo.id) {
        mostrarEstado("Debes seleccionar un átomo diferente.");
        return;
    }

    crearOActualizarEnlace(primerAtomo, atomo);
}

function crearOActualizarEnlace(a, b) {
    const existente = enlaces.find(enlace =>
        (
            enlace.a.id === a.id &&
            enlace.b.id === b.id
        ) ||
        (
            enlace.a.id === b.id &&
            enlace.b.id === a.id
        )
    );

    const ordenActual = existente
        ? existente.orden
        : 0;

    if (ordenActual >= configuracionMolecular.enlaceMaximo) {
        primerAtomo = null;
        mostrarEstado("El enlace triple ya es el máximo permitido.");
        return;
    }

    const datosA = elementos[a.elemento];
    const datosB = elementos[b.elemento];

    const valenciaA = valenciaUsada(a);
    const valenciaB = valenciaUsada(b);

    if (
        valenciaA + 1 > datosA.valenciaMaxima ||
        valenciaB + 1 > datosB.valenciaMaxima
    ) {
        primerAtomo = null;

        mostrarEstado(
            "Enlace rechazado: se superaría la valencia máxima de un átomo."
        );

        return;
    }

    const nuevoOrden = ordenActual + 1;

    if (existente) {
        existente.orden = nuevoOrden;
    } else {
        enlaces.push({
            a: a,
            b: b,
            orden: nuevoOrden
        });
    }

    primerAtomo = null;

    actualizarVista3D();
    actualizarVista2D();
    actualizarInterfaz();

    const nombres = {
        1: "simple",
        2: "doble",
        3: "triple"
    };

    mostrarEstado(
        `Enlace ${nombres[nuevoOrden]} creado correctamente.`
    );
}
