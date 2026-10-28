
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
    H: { nombre: "Hidrógeno", color: "#f2f2f2", texto: "#202020" },
    C: { nombre: "Carbono", color: "#50545c", texto: "#ffffff" },
    N: { nombre: "Nitrógeno", color: "#4169e1", texto: "#ffffff" },
    O: { nombre: "Oxígeno", color: "#ed4141", texto: "#ffffff" },
    S: { nombre: "Azufre", color: "#e6ce35", texto: "#202020" },
    P: { nombre: "Fósforo", color: "#e88a36", texto: "#202020" }
};

const atomos = [];
const enlaces = [];

let siguienteId = 0;
let elementoSeleccionado = "H";
let modoEliminacion = false;
let modoColocacion = false;
let modoEnlace = false;
let primerAtomo = null;

function actualizarInformacion() {
    contadorAtomos.textContent = atomos.length;

    if (contadorEnlaces) {
        contadorEnlaces.textContent = enlaces.length;
    }

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

function crearEsfera(simbolo, datos) {
    const ns = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(ns, "svg");
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
        overflow: "visible",
        zIndex: "2",
        pointerEvents: "none"
    });

    const defs = document.createElementNS(ns, "defs");
    const gradiente = document.createElementNS(ns, "radialGradient");

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
    circulo.setAttribute("fill", `url(#${id})`);
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

const capaEnlaces = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
);

Object.assign(capaEnlaces.style, {
    position: "absolute",
    left: "0",
    top: "0",
    width: "100%",
    height: "100%",
    zIndex: "1",
    pointerEvents: "none",
    overflow: "visible"
});

capaEnlaces.setAttribute("aria-label", "Enlaces moleculares");

if (visor) {
    visor.style.position = "relative";
    visor.insertBefore(capaEnlaces, visor.firstChild);
}

function actualizarDibujoEnlaces() {
    if (!visor) return;

    const ancho = visor.clientWidth;
    const alto = visor.clientHeight;

    capaEnlaces.setAttribute(
        "viewBox",
        `0 0 ${ancho} ${alto}`
    );

    capaEnlaces.replaceChildren();

    for (const enlace of enlaces) {
        const linea = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "line"
        );

        linea.setAttribute("x1", enlace.a.x);
        linea.setAttribute("y1", enlace.a.y);
        linea.setAttribute("x2", enlace.b.x);
        linea.setAttribute("y2", enlace.b.y);
        linea.setAttribute("stroke", "#d7e8f5");
        linea.setAttribute("stroke-width", "5");
        linea.setAttribute("stroke-linecap", "round");

        capaEnlaces.appendChild(linea);
    }
}

function agregarAtomo() {
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
        estado.textContent = "Elemento no válido.";
        return;
    }

    elementoSeleccionado = simbolo;
    modoColocacion = true;
    modoEnlace = false;
    primerAtomo = null;

    estado.textContent =
        `Seleccionaste ${elementos[simbolo].nombre}. ` +
        "Haz clic en el espacio molecular.";
}

function colocarAtomo(x, y) {
    const simbolo = elementoSeleccionado;
    const datos = elementos[simbolo];
    const esfera = crearEsfera(simbolo, datos);

    esfera.style.left = `${x - 24}px`;
    esfera.style.top = `${y - 24}px`;

    if (mensajeInicial) {
        mensajeInicial.style.display = "none";
    }

    visor.appendChild(esfera);

    atomos.push({
        id: siguienteId - 1,
        elemento: simbolo,
        esfera: esfera,
        x: x,
        y: y
    });

    actualizarInformacion();

    estado.textContent = `Átomo añadido: ${datos.nombre}`;
}

function iniciarEliminacion() {
    modoColocacion = false;
    modoEnlace = false;
    modoEliminacion = true;
    primerAtomo = null;

    estado.textContent = "Haz click cerca del átomo que quieres eliminar.";
}

function eliminarAtomo(atomo) {
    for (let i = enlaces.length - 1; i >= 0; i--) {
         if {
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

    estado.textContent = "Átomo y sus enlaces eliminados.";
    }

function iniciarCreacionEnlace() {
    if (atomos.length < 2) {
        estado.textContent =
            "Añade al menos dos átomos antes de crear un enlace.";
        return;
    }

    modoColocacion = false;
    modoEnlace = true;
    primerAtomo = null;

    estado.textContent =
        "Haz clic cerca del primer átomo.";
}

function seleccionarAtomoParaEnlace(x, y) {
    let encontrado = null;
    let distanciaMinima = Infinity;

    for (const atomo of atomos) {
        const distancia = Math.hypot(
            atomo.x - x,
            atomo.y - y
        );

        if (distancia < distanciaMinima) {
            distanciaMinima = distancia;
            encontrado = atomo;
        }
    }

    if (!encontrado || distanciaMinima > 32) {
        estado.textContent =
            "Pulsa cerca de una esfera para seleccionar el átomo.";
        return;
    }

    if (primerAtomo === null) {
        primerAtomo = encontrado;
        estado.textContent =
            `Primer átomo: ${encontrado.elemento}. ` +
            "Ahora selecciona el segundo.";
        return;
    }

    if (primerAtomo.id === encontrado.id) {
        estado.textContent =
            "Selecciona un átomo diferente.";
        return;
    }

    const yaExiste = enlaces.some(enlace =>
        (enlace.a.id === primerAtomo.id &&
         enlace.b.id === encontrado.id) ||
        (enlace.a.id === encontrado.id &&
         enlace.b.id === primerAtomo.id)
    );

    if (yaExiste) {
        estado.textContent = "Estos átomos ya están conectados.";
        primerAtomo = null;
        return;
    }

    enlaces.push({
        a: primerAtomo,
        b: encontrado
    });

    actualizarDibujoEnlaces();
    actualizarInformacion();

    estado.textContent =
        `Enlace creado: ${primerAtomo.elemento}–${encontrado.elemento}.`;

    primerAtomo = null;
    modoEnlace = false;
}

if (botonAgregar && visor && contadorAtomos && formula && estado) {
    botonAgregar.addEventListener("click", agregarAtomo);

    if (botonEnlace) {
        botonEnlace.addEventListener(
            "click",
            iniciarCreacionEnlace
        );
    }

    if (botonEliminar) {
        botonEliminar.addEventListenner("click",
                                        iniciarEleminacion
                                       );
    }
    
    visor.addEventListener("click", function(evento) {
        const rect = visor.getBoundingClientRect();
        const x = evento.clientX - rect.left;
        const y = evento.clientY - rect.top;
        
if (modoEliminacion) {
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

    if (cercano && distanciaMinima <= 32) {
        eliminarAtomo(cercano);
        modoEliminacion = false;
    } else {
        estado.textContent = "Haz clic más cerca de una esfera.";
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

    actualizarInformacion();
    actualizarDibujoEnlaces();
} else {
    console.error(
        "BBM WEB: faltan elementos HTML necesarios."
    );
    }
        
