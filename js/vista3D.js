
"use strict";

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
    circulo.setAttribute("stroke", "none");

    svg.appendChild(circulo);

    return svg;
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

            const linea = document.createElementNS(ns, "line");

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
      
