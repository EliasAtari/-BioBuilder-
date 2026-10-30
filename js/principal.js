
"use strict";

// Elementos de la interfaz
const botonAgregar = document.getElementById("agregar-atomo");
const botonEliminar = document.getElementById("eliminar");
const botonEnlace = document.getElementById("crear-enlace");
const botonVista2D = document.getElementById("modo-2d");
const botonVista3D = document.getElementById("modo-3d");

const visor = document.getElementById("visor");
const mensajeInicial = document.getElementById("mensaje-inicial");

// Estados de las herramientas
let modoColocacion = false;
let modoEnlace = false;
let modoEliminacion = false;
let primerAtomo = null;

// Dibujo SVG de los enlaces
let dibujoEnlaces = null;

// Actualizar la vista 2D
function actualizarVista2D() {
    if (typeof dibujarPlano2D === "function") {
        dibujarPlano2D();
    }
}

// Cambiar entre las vistas
function alternarVista(vista) {
    const mostrar2D = vista === "2D";

    activarPlano2D(mostrar2D);

    if (dibujoEnlaces) {
        dibujoEnlaces.style.display =
            mostrar2D ? "none" : "";
    }

    for (const atomo of atomos) {
        atomo.esfera.style.display =
            mostrar2D ? "none" : "";
    }
}

// Crear la capa SVG de enlaces
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

// Eventos de los botones
if (botonAgregar) {
    botonAgregar.addEventListener("click", agregarAtomo);
}

if (botonEliminar) {
    botonEliminar.addEventListener("click", iniciarEliminacion);
}

if (botonEnlace) {
    botonEnlace.addEventListener("click", iniciarCreacionEnlace);
}

if (botonVista2D) {
    botonVista2D.addEventListener("click", () => {
        alternarVista("2D");
    });
}

if (botonVista3D) {
    botonVista3D.addEventListener("click", () => {
        alternarVista("3D");
    });
}

// Interacciones dentro del visor
if (visor) {
    visor.addEventListener("click", function(evento) {
        const rect = visor.getBoundingClientRect();

        const x = evento.clientX - rect.left;
        const y = evento.clientY - rect.top;

        if (modoEliminacion) {
            const cercano = buscarAtomoCercano(x, y);

            if (cercano) {
                eliminarAtomo(cercano);
            } else if (estado) {
                estado.textContent =
                    "Haz clic más cerca de una esfera.";
            }

            return;
        }

        if (modoColocacion) {
            colocarAtomo(x, y);
            return;
        }

        if (modoEnlace) {
            seleccionarAtomoParaEnlace(x, y);
        }
    });

    visor.addEventListener("scroll", actualizarDibujoEnlaces);
}

// Actualizar los enlaces al cambiar el tamaño
window.addEventListener("resize", 
"use strict";

// Elementos de la interfaz
const botonAgregar = document.getElementById("agregar-atomo");
const botonEliminar = document.getElementById("eliminar");
const botonEnlace = document.getElementById("crear-enlace");
const botonVista2D = document.getElementById("modo-2d");
const botonVista3D = document.getElementById("modo-3d");

const visor = document.getElementById("visor");
const mensajeInicial = document.getElementById("mensaje-inicial");

// Estados de las herramientas
let modoColocacion = false;
let modoEnlace = false;
let modoEliminacion = false;
let primerAtomo = null;

// Dibujo SVG de los enlaces
let dibujoEnlaces = null;

// Actualizar la vista 2D
function actualizarVista2D() {
    if (typeof dibujarPlano2D === "function") {
        dibujarPlano2D();
    }
}

// Cambiar entre las vistas
function alternarVista(vista) {
    const mostrar2D = vista === "2D";

    activarPlano2D(mostrar2D);

    if (dibujoEnlaces) {
        dibujoEnlaces.style.display =
            mostrar2D ? "none" : "";
    }

    for (const atomo of atomos) {
        atomo.esfera.style.display =
            mostrar2D ? "none" : "";
    }
}

// Crear la capa SVG de enlaces
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

// Eventos de los botones
if (botonAgregar) {
    botonAgregar.addEventListener("click", agregarAtomo);
}

if (botonEliminar) {
    botonEliminar.addEventListener("click", iniciarEliminacion);
}

if (botonEnlace) {
    botonEnlace.addEventListener("click", iniciarCreacionEnlace);
}

if (botonVista2D) {
    botonVista2D.addEventListener("click", () => {
        alternarVista("2D");
    });
}

if (botonVista3D) {
    botonVista3D.addEventListener("click", () => {
        alternarVista("3D");
    });
}

// Interacciones dentro del visor
if (visor) {
    visor.addEventListener("click", function(evento) {
        const rect = visor.getBoundingClientRect();

        const x = evento.clientX - rect.left;
        const y = evento.clientY - rect.top;

        if (modoEliminacion) {
            const cercano = buscarAtomoCercano(x, y);

            if (cercano) {
                eliminarAtomo(cercano);
            } else if (estado) {
                estado.textContent =
                    "Haz clic más cerca de una esfera.";
            }

            return;
        }

        if (modoColocacion) {
            colocarAtomo(x, y);
            return;
        }

        if (modoEnlace) {
            seleccionarAtomoParaEnlace(x, y);
        }
    });

    visor.addEventListener("scroll", actualizarDibujoEnlaces);
}

// Actualizar los enlaces al cambiar el tamaño
window.addEventListener("resize", actualizarDibujoEnlaces);

// Inicialización
actualizarInformacion();
actualizarDibujoEnlaces();
alternarVista("3D");

console.log("BBM WEB: JavaScript cargado correctamente.");
que);

actualizarInformacion();
actualizarDibujoEnlaces();
alternarVista("3D");

console.log("BBM WEB: JavaScript cargado correctamente.");
