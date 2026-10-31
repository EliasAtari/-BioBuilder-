
"use strict";

const CACHE_NAME = "biobuilder-v2";

const ARCHIVOS = [
    "./",
    "./index.html",
    "./manifest.json",
    "./css/estilos.css",
    "./js/datosMoleculares.js",
    "./js/interfaz.js",
    "./js/herramientaAgregar.js",
    "./js/herramientaEliminar.js",
    "./js/herramientaEnlaces.js",
    "./js/vista2D.js",
    "./js/vista3D.js",
    "./js/principal.js"
];

self.addEventListener("install", (evento) => {
    evento.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(ARCHIVOS))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener("activate", (evento) => {
    evento.waitUntil(
        caches.keys()
            .then((nombres) => {
                return Promise.all(
                    nombres
                        .filter((nombre) =>
                            nombre.startsWith("biobuilder-") &&
                            nombre !== CACHE_NAME
                        )
                        .map((nombre) => caches.delete(nombre))
                );
            })
            .then(() => self.clients.claim())
    );
});

self.addEventListener("fetch", (evento) => {
    const solicitud = evento.request;

    if (
        solicitud.method !== "GET" ||
        new URL(solicitud.url).origin !== self.location.origin
    ) {
        return;
    }

    evento.respondWith(
        caches.match(solicitud)
            .then((respuesta) => {
                if (respuesta) {
                    return respuesta;
                }

                return fetch(solicitud).then((respuestaRed) => {
                    if (respuestaRed && respuestaRed.ok) {
                        const copia = respuestaRed.clone();

                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(solicitud, copia);
                            });
                    }

                    return respuestaRed;
                });
            })
            .catch(() => {
                if (solicitud.mode === "navigate") {
                    return caches.match("./index.html");
                }
            })
    );
});
