
"use strict";

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

alert("DATOS MOLECULARES CARGADO");
