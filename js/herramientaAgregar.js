
"use strict";

let elementoSeleccionado = "H";

function seleccionarElemento(simbolo) {
    if (!elementos[simbolo]) {
        mostrarEstado("Elemento químico no válido.");
        return;
    }

    elementoSeleccionado = simbolo;

    mostrarEstado(
        `Elemento seleccionado: ${elementos[simbolo].nombre}`
    );
}

function iniciarAgregarAtomo() {
    mostrarEstado(
        `Selecciona dónde colocar el átomo ${elementoSeleccionado}.`
    );
}

function colocarAtomo(x, y) {
    if (!elementos[elementoSeleccionado]) {
        mostrarEstado("No se reconoce el elemento seleccionado.");
        return;
    }

    const posicion = pantallaAMolecular(x, y);

    const id = siguienteId++;

    const atomo = {
        id: id,
        elemento: elementoSeleccionado,
        x: posicion.x,
        y: posicion.y,
        esfera: null
    };

    atomos.push(atomo);

    // Actualizar las representaciones
    actualizarVista3D();
    actualizarVista2D();
    actualizarInterfaz();

    mostrarEstado(
        `${elementos[elementoSeleccionado].nombre} agregado correctamente.`
    );
}
