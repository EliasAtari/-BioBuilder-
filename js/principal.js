
"use strict";

const botonAgregar = document.getElementById("agregar-atomo");
const botonEliminar = document.getElementById("eliminar");
const botonEnlace = document.getElementById("crear-enlace");
const visor = document.getElementById("visor");
const mensajeInicial = document.getElementById("mensaje-inicial");
const contadorAtomos = document.getElementById("cantidad-atomos");
const contadorEnlaces = document.getElementById("cantidad-enlaces");
const formula = document.getElementById("formula");
const estado = document.getElementById("estado");
const elementos = {
    H: {
        nombre: "Hidrógeno",
        color: "#f2f2f2",
        texto: "#202020",
        valenciaMaxima: 1
    },
    C: {
        nombre: "Carbono",
        color: "#50545c",
        texto: "#ffffff",
        valenciaMaxima: 4
    },
    N: {
        nombre: "Nitrógeno",
        color: "#4169e1",
        texto: "#ffffff",
        valenciaMaxima: 3
    },
    O: {
        nombre: "Oxígeno",
        color: "#ed4141",
        texto: "#ffffff",
        valenciaMaxima: 2
    },
    S: {
        nombre: "Azufre",
        color: "#e6ce35",
        texto: "#202020",
        valenciaMaxima: 2
    },
    P: {
        nombre: "Fósforo",
        color: "#e88a36",
        texto: "#202020",
        valenciaMaxima: 3
    }
};
const atomos = [];
const enlaces = [];

let siguienteId = 0;
let elementoSeleccionado = "H";
let modoColocacion = false;
let modoEnlace = false;
let modoEliminacion = false;
let primerAtomo = null;
let dibujoEnlaces = null;

let zoom2D = 1;
let desplazamientoX = 0;
let desplazamientoY = 0;

let arrastrandoPlano = false;
let inicioArrastreX = 0;
let inicioArrastreY = 0;

if (visor) {
    if (!visor.style.position) {
        visor.style.position = "relative";
    }

    dibujoEnlaces = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
    );

    dibujoEnlaces.setAttribute("aria-hidden", "true");

    Object.assign(dibujoEnlaces.style, {
        position: "absolute",
        left: "0",
        top: "0",
        width: "100%",
        height: "100%",
        overflow: "visible",
        pointerEvents: "none",
        zIndex: "1"
    });

    visor.insertBefore(dibujoEnlaces, visor.firstChild);
}


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


function crearEsfera(simbolo, datos, id) {
    const ns = "http://www.w3.org/2000/svg";

    const svg = document.createElementNS(ns, "svg");

    svg.setAttribute("width", "48");
    svg.setAttribute("height", "48");
    svg.setAttribute("viewBox", "0 0 48 48");
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", datos.nombre);

    Object.assign(svg.style, {
        position: "absolute",
        width: "48px",
        height: "48px",
        display: "block",
        overflow: "visible",
        zIndex: "2",
        pointerEvents: "none"
    });

    const defs = document.createElementNS(ns, "defs");
    const gradiente = document.createElementNS(ns, "radialGradient");

    gradiente.setAttribute("id", `bbm-gradiente-${id}`);
    gradiente.setAttribute("cx", "30%");
    gradiente.setAttribute("cy", "25%");
    gradiente.setAttribute("r", "75%");

    const paradas = [
        ["0%", "#ffffff"],
        ["45%", datos.color],
        ["100%", "#202631"]
    ];

    for (const [posicion, color] of paradas) {
        const stop = document.createElementNS(ns, "stop");
        stop.setAttribute("offset", posicion);
        stop.setAttribute("stop-color", color);
        gradiente.appendChild(stop);
    }

    defs.appendChild(gradiente);
    svg.appendChild(defs);

    const circulo = document.createElementNS(ns, "circle");

    circulo.setAttribute("cx", "24");
    circulo.setAttribute("cy", "24");
    circulo.setAttribute("r", "23");
    circulo.setAttribute("fill", `url(#bbm-gradiente-${id})`);
    circulo.setAttribute("stroke", "#ffffff66");
    circulo.setAttribute("stroke-width", "1");

    svg.appendChild(circulo);

    const letra = document.createElementNS(ns, "text");

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

    actualizarInformacion();

    if (estado) {
        estado.textContent = `Átomo añadido: ${datos.nombre}`;
    }
}

function actualizarDibujoEnlaces() {
    if (!dibujoEnlaces || !visor) return;

    const ancho = visor.clientWidth;
    const alto = visor.clientHeight;

    dibujoEnlaces.setAttribute("width", ancho);
    dibujoEnlaces.setAttribute("height", alto);
    dibujoEnlaces.setAttribute(
        "viewBox",
        `0 0 ${ancho} ${alto}`
    );

    dibujoEnlaces.replaceChildren();

    const ns = "http://www.w3.org/2000/svg";

    for (const enlace of enlaces) {
        const dx = enlace.b.x - enlace.a.x;
        const dy = enlace.b.y - enlace.a.y;
        const longitud = Math.hypot(dx, dy);

        if (longitud === 0) continue;

        const px = -dy / longitud;
        const py = dx / longitud;

        const orden = enlace.orden || 1;
        const separacion = 5;

        for (let i = 0; i < orden; i++) {
            const desplazamiento =
                (i - (orden - 1) / 2) * separacion;

            const linea = document.createElementNS(
                ns,
                "line"
            );

            linea.setAttribute(
                "x1",
                enlace.a.x + px * desplazamiento
            );
            linea.setAttribute(
                "y1",
                enlace.a.y + py * desplazamiento
            );
            linea.setAttribute(
                "x2",
                enlace.b.x + px * desplazamiento
            );
            linea.setAttribute(
                "y2",
                enlace.b.y + py * desplazamiento
            );

            linea.setAttribute("stroke", "#b9d5e8");
            linea.setAttribute("stroke-width", "3");
            linea.setAttribute("stroke-linecap", "round");

            dibujoEnlaces.appendChild(linea);
        }
    }
}

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

function buscarAtomoCercano(x, y) {
    let cercano = null;
    let distanciaMinima = Infinity;

    for (const atomo of atomos) {
        const distancia = Math.hypot(
            atomo.x - x,
            atomo.y - y
        );

        if (distancia < distanciaMinima) {
            distanciaMinima = distancia;
            cercano = atomo;
        }
    }

    return cercano && distanciaMinima <= 32
        ? cercano
        : null;
}

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

    if (atomos.length === 0 && mensajeInicial) {
        mensajeInicial.style.display = "";
    }

    if (estado) {
        estado.textContent = "Átomo y sus enlaces eliminados.";
    }
}


if (botonAgregar) {
    botonAgregar.addEventListener("click", agregarAtomo);
}

if (botonEnlace) {
    botonEnlace.addEventListener("click", iniciarCreacionEnlace);
}

if (botonEliminar) {
    botonEliminar.addEventListener("click", iniciarEliminacion);
}


if (visor) {
    visor.addEventListener("click", function(evento) {
        const rect = visor.getBoundingClientRect();

        const x = evento.clientX - rect.left;
        const y = evento.clientY - rect.top;

        if (modoEliminacion) {
            const cercano = buscarAtomoCercano(x, y);

            if (cercano) {
                eliminarAtomo(cercano);
                modoEliminacion = false;
            } else if (estado) {
                estado.textContent =
                    "Haz clic más cerca de una esfera.";
            }

            return;
        }

        if (modoColocacion) {
            colocarAtomo(x, y);
            modoColocacion = false;
            return;
        }

        if (modoEnlace) {
            seleccionarAtomoParaEnlace(x, y);
        }
    });

    visor.addEventListener("scroll", actualizarDibujoEnlaces);
}

window.addEventListener("resize", actualizarDibujoEnlaces);

actualizarInformacion();
actualizarDibujoEnlaces();

console.log("BBM WEB: JavaScript cargado correctamente.");
  
