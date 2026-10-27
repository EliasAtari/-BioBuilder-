
const visor = document.getElementById("visor");
const botonAgregar = document.getElementById("agregar-atomo");
const estado = document.getElementById("estado");
const cantidadAtomos = document.getElementById("cantidad-atomos");
const formula = document.getElementById("formula");

const elementos = {
    C: { nombre: "Carbono", color: "#424b57" },
    H: { nombre: "Hidrógeno", color: "#f2f5f8" },
    O: { nombre: "Oxígeno", color: "#ff4545" },
    N: { nombre: "Nitrógeno", color: "#397bff" }
};

const atomos = [];

let elementoActual = "C";

const selector = document.createElement("select");
selector.id = "selector-elemento";
selector.setAttribute("aria-label", "Elemento químico");

Object.entries(elementos).forEach(([simbolo, elemento]) => {
    const opcion = document.createElement("option");
    opcion.value = simbolo;
    opcion.textContent = `${simbolo} - ${elemento.nombre}`;
    selector.appendChild(opcion);
});

visor.prepend(selector);

selector.addEventListener("change", () => {
    elementoActual = selector.value;
    estado.textContent =
        `Elemento seleccionado: ${elementos[elementoActual].nombre}`;
});

botonAgregar.addEventListener("click", () => {
    const elemento = elementos[elementoActual];

    const atomo = document.createElement("button");
    atomo.type = "button";
    atomo.className = "atomo";
    atomo.title = elemento.nombre;
    atomo.setAttribute(
        "aria-label",
        `Átomo de ${elemento.nombre}`
    );

    const margen = 45;
    const anchoDisponible = Math.max(visor.clientWidth - margen * 2, 1);
    const altoDisponible = Math.max(visor.clientHeight - margen * 2, 1);

    const x = margen + Math.random() * anchoDisponible;
    const y = margen + Math.random() * altoDisponible;

    atomo.style.left = `${x}px`;
    atomo.style.top = `${y}px`;
    atomo.style.background = `
        radial-gradient(
            circle at 30% 25%,
            #ffffff,
            ${elemento.color} 35%,
            ${elemento.color} 70%,
            #17212b
        )
    `;

    atomo.dataset.elemento = elementoActual;

    atomo.addEventListener("click", () => {
        estado.textContent =
            `Átomo seleccionado: ${elementos[atomo.dataset.elemento].nombre}`;
    });

    visor.appendChild(atomo);
    atomos.push(atomo);

    actualizarInformacion();

    estado.textContent =
        `Se añadió un átomo de ${elemento.nombre}`;
});

function actualizarInformacion() {
    cantidadAtomos.textContent = atomos.length;

    const conteo = {};

    atomos.forEach((atomo) => {
        const simbolo = atomo.dataset.elemento;
        conteo[simbolo] = (conteo[simbolo] || 0) + 1;
    });

    const orden = ["C", "H", ...Object.keys(elementos).filter(
        simbolo => simbolo !== "C" && simbolo !== "H"
    )];

    const resultado = orden
        .filter(simbolo => conteo[simbolo])
        .map(simbolo =>
            simbolo + (conteo[simbolo] > 1 ? conteo[simbolo] : "")
        )
        .join("");

    formula.textContent = resultado || "—";
                              }
