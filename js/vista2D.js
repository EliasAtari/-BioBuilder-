
"use strict";

const contenedorPlano2D = document.getElementById(
    "contenedor-plano2D"
);

const dibujoPlano2D = document.getElementById(
    "dibujo-plano2D"
);

let plano2DActivo = false;

function iniciarVista2D() {
    if (!contenedorPlano2D || !dibujoPlano2D) {
        throw new Error("No se encontró el visor 2D.");
    }

    Object.assign(contenedorPlano2D.style, {
        position: "absolute",
        inset: "0",
        width: "100%",
        height: "100%",
        zIndex: "3"
    });

    Object.assign(dibujoPlano2D.style, {
        display: "block",
        width: "100%",
        height: "100%",
        overflow: "visible"
    });

    contenedorPlano2D.hidden = true;

    actualizarVista2D();
}

function dibujarEnlaces2D() {
    const ns = espacioSVG;

    for (const enlace of enlaces) {
        const a = molecularAPantalla(
            enlace.a.x,
            enlace.a.y
        );

        const b = molecularAPantalla(
            enlace.b.x,
            enlace.b.y
        );

        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const longitud = Math.hypot(dx, dy);

        if (longitud === 0) continue;

        const ux = dx / longitud;
        const uy = dy / longitud;

        const px = -uy;
        const py = ux;

        const radioA = configuracionMolecular.radioAtomo2D *
            camara.zoom;

        const radioB = radioA;

        const x1 = a.x + ux * radioA;
        const y1 = a.y + uy * radioA;
        const x2 = b.x - ux * radioB;
        const y2 = b.y - uy * radioB;

        const orden = enlace.orden || 1;
        const separacion = 5 * camara.zoom;

        for (let i = 0; i < orden; i++) {
            const desplazamiento =
                (i - (orden - 1) / 2) * separacion;

            const linea = document.createElementNS(
                ns,
                "line"
            );

            linea.setAttribute(
                "x1",
                x1 + px * desplazamiento
            );

            linea.setAttribute(
                "y1",
                y1 + py * desplazamiento
            );

            linea.setAttribute(
                "x2",
                x2 + px * desplazamiento
            );

            linea.setAttribute(
                "y2",
                y2 + py * desplazamiento
            );

            linea.setAttribute("stroke", "#b9d5e8");
            linea.setAttribute(
                "stroke-width",
                Math.max(1, 3 * camara.zoom)
            );

            linea.setAttribute("stroke-linecap", "round");

            dibujoPlano2D.appendChild(linea);
        }
    }
}

function dibujarAtomos2D() {
    const ns = espacioSVG;

    for (const atomo of atomos) {
        const posicion = molecularAPantalla(
            atomo.x,
            atomo.y
        );

        const datos = elementos[atomo.elemento];

        const circulo = document.createElementNS(
            ns,
            "circle"
        );

        circulo.setAttribute("cx", posicion.x);
        circulo.setAttribute("cy", posicion.y);
        circulo.setAttribute(
            "r",
            configuracionMolecular.radioAtomo2D * camara.zoom
        );

        circulo.setAttribute("fill", datos.color);
        circulo.setAttribute("stroke", "#ffffff");
        circulo.setAttribute("stroke-width", "1.5");

        dibujoPlano2D.appendChild(circulo);

        const texto = document.createElementNS(
            ns,
            "text"
        );

        texto.setAttribute("x", posicion.x);
        texto.setAttribute("y", posicion.y);
        texto.setAttribute("text-anchor", "middle");
        texto.setAttribute("dominant-baseline", "central");
        texto.setAttribute(
            "font-size",
            Math.max(8, 15 * camara.zoom)
        );

        texto.setAttribute("font-weight", "bold");
        texto.setAttribute("fill", datos.texto);
        texto.textContent = atomo.elemento;

        dibujoPlano2D.appendChild(texto);
    }
}

function actualizarVista2D() {
    if (!dibujoPlano2D) return;

    const ancho = contenedorPlano2D.clientWidth;
    const alto = contenedorPlano2D.clientHeight;

    dibujoPlano2D.setAttribute(
        "viewBox",
        `0 0 ${ancho} ${alto}`
    );

    dibujoPlano2D.replaceChildren();

    dibujarEnlaces2D();
    dibujarAtomos2D();
}

function activarPlano2D(activar) {
    if (!contenedorPlano2D) return;

    plano2DActivo = activar;
    contenedorPlano2D.hidden = !activar;

    if (activar) {
        actualizarVista2D();
    }
}
