"use strict";

const contenedorPlano2D = document.getElementById("contenedor-plano2D");
const dibujoPlano2D = document.getElementById("dibujo-plano2D");

let zoom2D = 1;
let desplazamientoX = 0;
let desplazamientoY = 0;

let plano2DActivo = false;
let arrastrandoPlano = false;

let inicioArrastreX = 0;
let inicioArrastreY = 0;

let grupoPlano2D = null;

function dibujarAtomos2D() {
  if (!dibujoPlano2D) return;

    dibujoPlano2D.replaceChildren();

    const ns = "http://www.w3.org/2000/svg";

    for (const atomo of atomos) {
        const datos = elementos[atomo.elemento];

        const texto = document.createElementNS(ns, "text");

        texto.setAttribute("x", atomo.x);
        texto.setAttribute("y", atomo.y);
        texto.setAttribute("text-anchor", "middle");
        texto.setAttribute("dominant-baseline", "central");
        texto.setAttribute("font-size", "20");
        texto.setAttribute("font-weight", "bold");
        texto.setAttribute("fill", datos.texto);

        texto.textContent = atomo.elemento;

        grupoPlano2D.appendChild(texto);
    }
}

function dibujarEnlaces2D() {
    if (!dibujoPlano2D) return;

    const ns = "http://www.w3.org/2000/svg";

    for (const enlace of enlaces) {
        const dx = enlace.b.x - enlace.a.x;
        const dy = enlace.b.y - enlace.a.y;

        const longitud = Math.hypot(dx, dy);

        if (longitud === 0) continue;

        const ux = dx / longitud;
        const uy = dy / longitud;

        const radioA = 12;
        const radioB = 12;

        const x1 = enlace.a.x + ux * radioA;
        const y1 = enlace.a.y + uy * radioA;

        const x2 = enlace.b.x - ux * radioB;
        const y2 = enlace.b.y - uy * radioB;

        const orden = enlace.orden || 1;
        const separacion = 5;
      
        const px = -uy;
        const py = ux;

        for (let i = 0; i < orden; i++) {
            const desplazamiento =
                (i - (orden - 1) / 2) * separacion;

            const linea = document.createElementNS(ns, "line");

            linea.setAttribute("x1", x1 + px * desplazamiento);
            linea.setAttribute("y1", y1 + py * desplazamiento);
            linea.setAttribute("x2", x2 + px * desplazamiento);
            linea.setAttribute("y2", y2 + py * desplazamiento);

            linea.setAttribute("stroke", "#b9d5e8");
            linea.setAttribute("stroke-width", "3");
            linea.setAttribute("stroke-linecap", "round");

            dibujoPlano2D.insertBefore(
              grupoPlano2D.appendChild(linea)
            );
        }
    }
}

function actualizarVista2D() {
  if (!dibujoPlano2D) return;


  
dibujoPlano2D.replaceChildren();
  
grupoPlano2D = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "g"
);

dibujoPlano2D.appendChild(grupoPlano2D);

    dibujarEnlaces2D();
    dibujarAtomos2D();
    aplicarTransformacion2D();
}

function activarPlano2D(activar) {
  if (!contenedorPlano2D) return;

plano2DActivo = activar;


contenedorPlano2D.style.display = activar ? "block" : "none";

    if (activar) {
        actualizarVista2D();
    }
}

function aplicarTransformacion2D() {
    if (!grupoPlano2D) return;

    grupoPlano2D.setAttribute(
        "transform",
        `translate(${desplazamientoX} ${desplazamientoY}) scale(${zoom2D})`
    );
}

function iniciarEventosPlano2D() {
    if (!contenedorPlano2D) return;

    window.addEventListener("resize", () => {
        if (plano2DActivo) {
            actualizarVista2D();
        }
    });
}

iniciarEventosPlano2D();
