
"use strict";

let capaAtomos3D = null;
let dibujoEnlaces3D = null;

const espacioSVG = "http://www.w3.org/2000/svg";

function iniciarVista3D() {
    const visor = document.getElementById("visor");

    if (!visor) {
        throw new Error("No se encontró el visor molecular.");
    }

    visor.style.position = "relative";

    dibujoEnlaces3D = document.createElementNS(
        espacioSVG,
        "svg"
    );

    dibujoEnlaces3D.style.position = "absolute";
    dibujoEnlaces3D.style.inset = "0";
    dibujoEnlaces3D.style.width = "100%";
    dibujoEnlaces3D.style.height = "100%";
    dibujoEnlaces3D.style.overflow = "visible";
    dibujoEnlaces3D.style.pointerEvents = "none";
    dibujoEnlaces3D.style.zIndex = "1";

    capaAtomos3D = document.createElement("div");

    Object.assign(capaAtomos3D.style, {
        position: "absolute",
        inset: "0",
        pointerEvents: "none",
        zIndex: "2"
    });

    visor.appendChild(dibujoEnlaces3D);
    visor.appendChild(capaAtomos3D);

    actualizarVista3D();
}

function crearEsfera(simbolo, datos, id) {
    const svg = document.createElementNS(
        espacioSVG,
        "svg"
    );

    svg.setAttribute("width", "48");
    svg.setAttribute("height", "48");
    svg.setAttribute("viewBox", "0 0 48 48");

    const defs = document.createElementNS(
        espacioSVG,
        "defs"
    );

    const gradiente = document.createElementNS(
        espacioSVG,
        "radialGradient"
    );

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
        const stop = document.createElementNS(
            espacioSVG,
            "stop"
        );

        stop.setAttribute("offset", posicion);
        stop.setAttribute("stop-color", color);

        gradiente.appendChild(stop);
    }

    defs.appendChild(gradiente);
    svg.appendChild(defs);

    const circulo = document.createElementNS(
        espacioSVG,
        "circle"
    );

    circulo.setAttribute("cx", "24");
    circulo.setAttribute("cy", "24");
    circulo.setAttribute("r", "22");
    circulo.setAttribute(
        "fill",
        `url(#bbm-gradiente-${id})`
    );

    svg.appendChild(circulo);

    const texto = document.createElementNS(
        espacioSVG,
        "text"
    );

    texto.setAttribute("x", "24");
    texto.setAttribute("y", "25");
    texto.setAttribute("text-anchor", "middle");
    texto.setAttribute("dominant-baseline", "middle");
    texto.setAttribute("font-size", "15");
    texto.setAttribute("font-weight", "bold");
    texto.setAttribute("fill", datos.texto);
    texto.textContent = simbolo;

    svg.appendChild(texto);

    Object.assign(svg.style, {
        position: "absolute",
        width: "48px",
        height: "48px",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none"
    });

    return svg;
}

function dibujarEnlaces3D() {
    if (!dibujoEnlaces3D) return;

    dibujoEnlaces3D.replaceChildren();

    const ancho = dibujoEnlaces3D.clientWidth;
    const alto = dibujoEnlaces3D.clientHeight;

    dibujoEnlaces3D.setAttribute("viewBox", `0 0 ${ancho} ${alto}`);

    for (const enlace of enlaces) {
        const a = molecularAPantalla(enlace.a.x, enlace.a.y);
        const b = molecularAPantalla(enlace.b.x, enlace.b.y);

        const dx = b.x - a.x;
        const dy = b.y - a.y;
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
                espacioSVG,
                "line"
            );

            linea.setAttribute("x1", a.x + px * desplazamiento);
            linea.setAttribute("y1", a.y + py * desplazamiento);
            linea.setAttribute("x2", b.x + px * desplazamiento);
            linea.setAttribute("y2", b.y + py * desplazamiento);

            linea.setAttribute("stroke", "#b9d5e8");
            linea.setAttribute("stroke-width", "3");
            linea.setAttribute("stroke-linecap", "round");

            dibujoEnlaces3D.appendChild(linea);
        }
    }
}

function dibujarAtomos3D() {
    if (!capaAtomos3D) return;

    capaAtomos3D.replaceChildren();

    for (const atomo of atomos) {
        const posicion = molecularAPantalla(
            atomo.x,
            atomo.y
        );

        const esfera = crearEsfera(
            atomo.elemento,
            elementos[atomo.elemento],
            atomo.id
        );

        esfera.style.left = `${posicion.x}px`;
        esfera.style.top = `${posicion.y}px`;

        atomo.esfera = esfera;

        capaAtomos3D.appendChild(esfera);
    }
}

function actualizarVista3D() {
    if (!capaAtomos3D || !dibujoEnlaces3D) return;

    dibujarEnlaces3D();
    dibujarAtomos3D();
}
    
