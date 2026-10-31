
"use strict";

let elementoSeleccionado = "H";

function agregarAtomo() {
  if (!visor) return;

    const opciones = Object.entries(elementos)
        .map(([simbolo, datos]) =>
            `${simbolo} = ${datos.nombre}`
        )
        .join("\n");

    const respuesta = prompt(
        "¿Qué átomo quieres colocar?\n\n" +
        opciones +
        "\n\nEscribe el símbolo:"
    );

    if (respuesta === null) return;

    const simbolo = respuesta.trim().toUpperCase();

    if (!elementos[simbolo]) {
        if (estado) estado.textContent = "Elemento no válido.";
        return;
    }

    elementoSeleccionado = simbolo;

    modoColocacion = true;
    modoEnlace = false;
    modoEliminacion = false;
    primerAtomo = null;

    if (estado) {
        estado.textContent =
            `Seleccionaste ${elementos[simbolo].nombre}. ` +
            "Haz clic en el espacio molecular.";
    }
}

function colocarAtomo(x, y) {
    const simbolo = elementoSeleccionado;
    const datos = elementos[simbolo];

    const id = siguienteId++;

    const esfera = crearEsfera(simbolo, datos, id);

    esfera.style.left = `${x - 24}px`;
    esfera.style.top = `${y - 24}px`;

    esfera.style.display = plano2DActivo ? "none" : "";

    if (mensajeInicial) {
        mensajeInicial.style.display = "none";
    }

    visor.appendChild(esfera);

    atomos.push({
        id,
        elemento: simbolo,
        esfera,
        x,
        y
    });

    actualizarDibujoEnlaces();
    actualizarVista2D();
    actualizarInformacion();

    if (estado) {
        estado.textContent =
            `Átomo añadido: ${datos.nombre}`;
    }
}
