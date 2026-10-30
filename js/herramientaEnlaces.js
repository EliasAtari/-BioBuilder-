
"use strict";

function seleccionarAtomoParaEnlace(x, y) {
    const atomo = buscarAtomoCercano(x, y);

    if (!atomo) {
        if (estado) {
            estado.textContent =
                "Haz clic cerca de una esfera.";
        }
        return;
    }

    if (!primerAtomo) {
        primerAtomo = atomo;

        if (estado) {
            estado.textContent =
                "Primer átomo seleccionado. Ahora elige el segundo.";
        }

        return;
    }

    if (primerAtomo.id === atomo.id) {
        if (estado) {
            estado.textContent =
                "Selecciona un átomo diferente.";
        }
        return;
    }

    const a = primerAtomo;
    const b = atomo;

    const existente = enlaces.find(enlace =>
        (enlace.a.id === a.id && enlace.b.id === b.id) ||
        (enlace.a.id === b.id && enlace.b.id === a.id)
    );

    const ordenActual = existente ? existente.orden : 0;
    const nuevoOrden = ordenActual + 1;

    if (nuevoOrden > 3) {
        if (estado) {
            estado.textContent =
                "El enlace triple ya es el máximo permitido.";
        }

        primerAtomo = null;
        return;
    }

    const datosA = elementos[a.elemento];
    const datosB = elementos[b.elemento];

    const usadaA = valenciaUsada(a);
    const usadaB = valenciaUsada(b);

    if (
        usadaA + 1 > datosA.valenciaMaxima ||
        usadaB + 1 > datosB.valenciaMaxima
    ) {
        if (estado) {
            estado.textContent =
                "Enlace rechazado: uno de los átomos alcanzó su límite de valencia.";
        }

        primerAtomo = null;
        return;
    }

    if (existente) {
        existente.orden = nuevoOrden;
    } else {
        enlaces.push({
            a,
            b,
            orden: 1
        });
    }

    primerAtomo = null;

    actualizarDibujoEnlaces();
    actualizarInformacion();
    actualizarVista2D();

    if (estado) {
        const nombres = {
            1: "simple",
            2: "doble",
            3: "triple"
        };

        estado.textContent =
            `Enlace ${nombres[nuevoOrden]} creado correctamente.`;
    }
}

function iniciarCreacionEnlace() {
    modoColocacion = false;
    modoEliminacion = false;
    modoEnlace = true;
    primerAtomo = null;

    if (estado) {
        estado.textContent =
            "Haz clic en el primer átomo y después en el segundo.";
    }
}
