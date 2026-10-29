
"use strict";

const visor2D = document.getElementById("visor");

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
  
function obtenerUniones() {
  const uniones = [];

  for (const enlace of enlaces) {
    if (
      enlace.a === this.atomo.id ||
      enlace.b === this.atomo.id)
    {
      uniones.push(enlace);
    }
  }
  return uniones;
}

function contarHidrogenos() {
  const uniones = this.obtenerUniones();
  let cantidad = 0:

  for (const enlace of uniones) {
    let idVecino;

    if (enlace.a === this.atomo.id) {
      idVecino = enlace.b;
    } else {
      idVecino = enlace.a;
    }
    const vecino = atomos.find(
            atomo => atomo.id === idVecino
        );

        if (vecino && vecino.elemento === "H") {
            cantidad += enlace.orden;
        }
    }

    return cantidad;
}

function obtenerEtiqueta() {
  const elemento = this.atomo.elemento;
  const hidrogenos = this.contarHidrogenos();

  if (
    elemento === "C" ||
    elemento === "H")
  {
    return "";
  }

  if (hidrogenos > 0) {
    return elemento + "H" +
      (hidrogenos > 1 ? hidrogenos : "");
  }
  return elemento;
}

function dibujarAtomo() {
}

function dibujarEnlaces() {
}
