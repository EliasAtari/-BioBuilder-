
"use strict";


const botonAgregar = document.getElementById("agregar-atomo");
const visor = document.getElementById("visor");
const mensajeInicial = document.getElementById("mensaje-inicial");

const contadorAtomos = document.getElementById("cantidad-atomos");
const formula = document.getElementById("formula");
const estado = document.getElementById("estado");

const elementos = {
    H: { nombre: "Hidrógeno", color: "#f2f2f2", texto: "#202020" },
    C: { nombre: "Carbono", color: "#50545c", texto: "#ffffff" },
    N: { nombre: "Nitrógeno", color: "#4169e1", texto: "#ffffff" },
    O: { nombre: "Oxígeno", color: "#ed4141", texto: "#ffffff" },
    S: { nombre: "Azufre", color: "#e6ce35", texto: "#202020" },
    P: { nombre: "Fósforo", color: "#e88a36", texto: "#202020" }
};

const atomos = [];
let siguienteId = 0;

function actualizarInformacion() {
    contadorAtomos.textContent = atomos.length;

    const cantidades = {};

    for (const atomo of atomos) {
        cantidades[atomo.elemento] =
            (cantidades[atomo.elemento] || 0) + 1;
    }

    const orden = Object.keys(cantidades).sort((a, b) => {
        const prioridad = { C: 0, H: 1 };

        return (prioridad[a] ?? 2) - (prioridad[b] ?? 2)
            || a.localeCompare(b);
    });

    formula.textContent = orden.length
        ? orden.map(simbolo =>
            simbolo + (
                cantidades[simbolo] > 1
                    ? cantidades[simbolo]
                    : ""
            )
        ).join("")
        : "—";
}

function crearEsfera(simbolo, datos) {
    const espacioSVG = "http://www.w3.org/2000/svg";

    const svg = document.createElementNS(espacioSVG, "svg");
    const id = `bbm-atomo-${siguienteId++}`;

    svg.setAttribute("width", "48");
    svg.setAttribute("height", "48");
    svg.setAttribute("viewBox", "0 0 48 48");
    svg.setAttribute("aria-label", datos.nombre);
    svg.setAttribute("role", "img");

    Object.assign(svg.style, {
        position: "absolute",
        width: "48px",
        height: "48px",
        display: "block",
        overflow: "hidden",
        zIndex: "2",
        pointerEvents: "none"
    });

    const defs = document.createElementNS(espacioSVG, "defs");
    const gradiente = document.createElementNS(
        espacioSVG,
        "radialGradient"
    );

    gradiente.setAttribute("id", id);
    gradiente.setAttribute("cx", "30%");
    gradiente.setAttribute("cy", "25%");
    gradiente.setAttribute("r", "75%");

    const paradas = [
        ["0%", "#ffffff"],
        ["45%", datos.color],
        ["100%", "#202631"]
    ];

    for (const [posicion, color] of paradas) {
        const stop = document.createElementNS(espacioSVG, "stop");
        stop.setAttribute("offset", posicion);
        stop.setAttribute("stop-color", color);
        gradiente.appendChild(stop);
    }

    defs.appendChild(gradiente);
    svg.appendChild(defs);

    const circulo = document.createElementNS(espacioSVG, "circle");
    circulo.setAttribute("cx", "24");
    circulo.setAttribute("cy", "24");
    circulo.setAttribute("r", "23");
    circulo.setAttribute("fill", `url(#${id})`);
    circulo.setAttribute("stroke", "#ffffff66");
    circulo.setAttribute("stroke-width", "1");

    svg.appendChild(circulo);

    const letra = document.createElementNS(espacioSVG, "text");
    letra.setAttribute("x", "24");
    letra.setAttribute("y", "29");
    letra.setAttribute("text-anchor", "middle");
    letra.setAttribute("font-size", "16");
    letra.setAttribute("font-weight", "bold");
    letra.setAttribute("fill", datos.texto);
    letra.textContent = simbolo;

    svg.appendChild(letra);

    return svg;
}
let elementoSeleccionado = "H";
let modoColocacion = false;
function colocarAtomo(x, y) {
    const simbolo = elementoSeleccionado;
    const datos = elementos[simbolo];
    const esfera = crearEsfera(simbolo, datos);

    esfera.style.left = `${x - 24}px`;
    esfera.style.top = `${y - 24}px`;
    esfera.style.pointerEvents = "none";
    esfera.style.cursor = "pointer";

    if (mensajeInicial) {
        mensajeInicial.style.display = "none"
    }

    visor.appendChild(esfera);
    atomos.push({
        id: siguienteId -1,
        elemento: simbolo,
        esfera: esfera,
        x: x,
        y: y
    });

    actualizarInformacion();

    estado.textContent = `Átomo añadido: ${datos.nombre}`;
}


    const respuesta = prompt(
        "¿Qué átomo quieres colocar?\n\n" +
        opciones +
        "\n\nEscribe el símbolo:"
    );

    if (respuesta === null) return;

    const simbolo = respuesta.trim().toUpperCase();

    if (!elementos[simbolo]) {
        estado.textContent = "Elemento no válido.";
        return;
    }

    elementoSeleccionado = simbolo;
    modoColocacion = true;

    estado.textContent =
        `Elemento seleccionado: ${elementos[simbolo].nombre}. ` +
        "Haz clic en el espacio molecular.";
}
function agregarAtomo() {
    const opciones = Object.entries(elementos)
        .map(([simbolo, datos]) =>
            `${simbolo} = ${datos.nombre}`
        )
        .join("\n");

    const respuesta = prompt(
        "¿Qué átomo quieres añadir?\n\n" +
        opciones +
        "\n\nEscribe el símbolo del elemento:"
    );

    if (respuesta === null) return;

    const simbolo = respuesta.trim().toUpperCase();

    if (!elementos[simbolo]) {
        alert("Elemento no disponible. Prueba con H, C, N, O, S o P.");
        return;
    }

    const datos = elementos[simbolo];
    const esfera = crearEsfera(simbolo, datos);

    if (mensajeInicial) {
        mensajeInicial.style.display = "none";
    }

    visor.style.position = "relative";

    visor.appendChild(esfera);

    atomos.push({
        elemento: simbolo,
        esfera: esfera
    });

    dibujarAtomos();
    actualizarInformacion();

    estado.textContent = `Átomo añadido: ${datos.nombre}`;
}

if (botonAgregar && visor && contadorAtomos && formula && estado) {
    botonAgregar.addEventListener("click", agregarAtomo);

    visor.addEventListener("click", function(evento) {
        if (!modoColocacion) return;

        const rectangulo = visor.getBoundingClientRect();
        const x = evento.clientX - rectangulo.left;
        const y = evento.clientY - rectangulo.top;

        colocarAtomo(x, y);
        modoColocacion = false;
    });

    actualizarInformacion();
} else {
    console.error(
        "BBM WEB: falta un elemento HTML necesario. Revisa los IDs."
    );
}

      
