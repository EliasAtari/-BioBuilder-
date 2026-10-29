
"use strict";

const contenedorPlano2D = document.getElementById("contenedor-plano2D");
const dibujoPlano2D = document.getElementById("dibujo-plano2D");

let zoom2D = 1;
let desplazamientoX = 0;
let desplazamientoY = 0;

let arrastrandoPlano = false;
let inicioArrastreX = 0;
let inicioArrastreY = 0;

let plano2DActivo = true;

class Atomo2D {
    constructor(atomo) {
        this.atomo = atomo;
    }

    obtenerUniones() {
        const uniones = [];

        for (const enlace of enlaces) {
            if (
                enlace.a.id === this.atomo.id ||
                enlace.b.id === this.atomo.id
            ) {
                uniones.push(enlace);
            }
        }

        return uniones;
    }

    contarHidrogenos() {
        const uniones = this.obtenerUniones();
        let cantidad = 0;

        for (const enlace of uniones) {
            const vecino =
                enlace.a.id === this.atomo.id
                    ? enlace.b
                    : enlace.a;

            if (vecino.elemento === "H") {
                cantidad += enlace.orden;
            }
        }

        return cantidad;
    }

    obtenerEtiqueta() {
        const elemento = this.atomo.elemento;
        const hidrogenos = this.contarHidrogenos();

        if (elemento === "C" || elemento === "H") {
            return "";
        }

        if (hidrogenos > 0) {
            return elemento + "H" +
                (hidrogenos > 1 ? hidrogenos : "");
        }

        return elemento;
    }

    dibujarAtomo(contenedor) {
        const etiqueta = this.obtenerEtiqueta();

        if (etiqueta === "") {
            return null;
        }

        const texto = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "text"
        );

        texto.setAttribute("x", this.atomo.x);
        texto.setAttribute("y", this.atomo.y);
        texto.setAttribute("text-anchor", "middle");
        texto.setAttribute("dominant-baseline", "middle");
        texto.setAttribute("fill", "#eaf5ff");
        texto.setAttribute("font-size", "16");
        texto.textContent = etiqueta;

        contenedor.appendChild(texto);

        return texto;
    }

    dibujarEnlaces(contenedor) {
        const uniones = this.obtenerUniones();

        for (const enlace of uniones) {
            if (enlace.a.id !== this.atomo.id) {
                continue;
            }

            const atomoA = enlace.a;
            const atomoB = enlace.b;

            const dx = atomoB.x - atomoA.x;
            const dy = atomoB.y - atomoA.y;
            const distancia = Math.hypot(dx, dy);

            if (distancia === 0) continue;

            const offsetX = -dy / distancia;
            const offsetY = dx / distancia;

            const cantidadLineas = enlace.orden || 1;

            for (let i = 0; i < cantidadLineas; i++) {
                const desplazamiento =
                    (i - (cantidadLineas - 1) / 2) * 8;

                const linea = document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "line"
                );

                linea.setAttribute(
                    "x1",
                    atomoA.x + offsetX * desplazamiento
                );
                linea.setAttribute(
                    "y1",
                    atomoA.y + offsetY * desplazamiento
                );
                linea.setAttribute(
                    "x2",
                    atomoB.x + offsetX * desplazamiento
                );
                linea.setAttribute(
                    "y2",
                    atomoB.y + offsetY * desplazamiento
                );

                linea.setAttribute("stroke", "#eaf5ff");
                linea.setAttribute("stroke-width", "2");

                contenedor.appendChild(linea);
            }
        }
    }
}

function dibujarPlano2D() {
    if (!dibujoPlano2D || !contenedorPlano2D) {
        return;
    }

    const ancho = contenedorPlano2D.clientWidth;
    const alto = contenedorPlano2D.clientHeight;

    dibujoPlano2D.setAttribute("width", ancho);
    dibujoPlano2D.setAttribute("height", alto);
    dibujoPlano2D.setAttribute(
        "viewBox",
        `0 0 ${ancho} ${alto}`
    );

    dibujoPlano2D.replaceChildren();

    for (const atomo of atomos) {
        const atomo2D = new Atomo2D(atomo);
        atomo2D.dibujarEnlaces(dibujoPlano2D);
    }

    for (const atomo of atomos) {
        const atomo2D = new Atomo2D(atomo);
        atomo2D.dibujarAtomo(dibujoPlano2D);
    }
}

function activarPlano2D(activar) {
    if (!contenedorPlano2D) return;

    plano2DActivo = activar;
    contenedorPlano2D.hidden = !activar;

    if (activar) {
        dibujarPlano2D();
    }
                  }
                  
