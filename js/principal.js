
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

function actualizarInformacion() {
    contadorAtomos.textContent = atomos.length;

    const cantidades = {};

    for (const atomo of atomos) {
        cantidades[atomo.elemento] =
            (cantidades[atomo.elemento] || 0) + 1;
    }

    // Orden convencional: carbono, hidrógeno y los  demás.
    const orden = Object.keys(cantidades).sort((a, b) => {
        const prioridad = { C: 0, H: 1 };
        return (prioridad[a] ?? 2) - (prioridad[b] ?? 2)
            || a.localeCompare(b);
    });

    formula.textContent = orden.length
        ? orden.map(simbolo =>
            simbolo + (cantidades[simbolo] > 1
                ? cantidades[simbolo]
                : "")
        ).join("")
        : "—";
}

function dibujarAtomos() {
    // Distribuye las esferas en filas para evitar que se amontonen.
    const ancho = visor.clientWidth;
    const separacion = 68;
    const columnas = Math.max(
        1,
        Math.floor((ancho - 12) / separacion)
    );

    atomos.forEach((atomo, indice) => {
        const columna = indice % columnas;
        const fila = Math.floor(indice / columnas);

        atomo.esfera.style.left = `${12 + columna * separacion}px`;
        atomo.esfera.style.top = `${24 + fila * separacion}px`;
    });
}

function agregarAtomo() {
    const opciones = Object.entries(elementos)
        .map(([simbolo, dato]) =>
            `${simbolo} = ${dato.nombre}`
        )
        .join("\n");

    const respuesta = prompt(
        "¿Qué átomo quieres añadir?\n\n" +
        opciones +
        "\n\nEscribe su símbolo, por ejemplo: O"
    );

    if (respuesta === null) return;

    const simbolo = respuesta.trim().toUpperCase();

    if (!elementos[simbolo]) {
        alert("Ese elemento todavía no está disponible.");
        return;
    }

    if (mensajeInicial) {
        mensajeInicial.style.display = "none";
    }

    // Prepara el visor para colocar las esferas.
    visor.style.position = "relative";
    visor.style.overflow = "auto";

    const esfera = document.createElement("div");
    const datos = elementos[simbolo];

    esfera.textContent = simbolo;
    esfera.title = datos.nombre;
    
Object.assign(esfera.style, {
    position: "absolute",
    width: "48px",
    height: "48px",
    minWidth: "48px",
    minHeight: "48px",
    boxSizing: "border-box",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: "16px",
    color: datos.texto,
    background: `radial-gradient(circle at 30% 25%, #ffffff 0%, ${datos.color} 45%, #222831 100%)`,
    border: "1px solid #ffffff66",
    boxShadow: "inset -4px -5px 8px #00000055, 0 3px 8px #00000055",
    padding: "0",
    margin: "0",
    flex: "none",
    appearance: "none",
    transform: "none",
    clipPath: "none",
    zIndex: "10"
});
    esfera.style.setProperty("width", "48px", "important");
esfera.style.setProperty("height", "48px", "important");
esfera.style.setProperty("min-width", "48px", "important");
esfera.style.setProperty("min-height", "48px", "important");
esfera.style.setProperty("border-radius", "50%", "important");
esfera.style.setProperty("display", "flex", "important");
esfera.style.setProperty("flex-shrink", "0", "important");
esfera.style.setProperty("background-image", "none", "important");
    visor.appendChild(esfera);

    atomos.push({
        elemento: simbolo,
        esfera: esfera
    });

    dibujarAtomos();
    actualizarInformacion();

    estado.textContent = `Átomo añadido: ${datos.nombre}`;
}

botonAgregar.addEventListener("click", agregarAtomo);

window.addEventListener("resize", dibujarAtomos);

actualizarInformacion();
      
