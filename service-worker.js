
"use strict";

const CACHE_NAME = "BioBuilder-v1";
const ARCHIVOS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./css/estilos.css",
  "./js/principal.js",
  "./js/plano2D.js"
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
  const solicitud= evento.requets;

                      if (
                        solicitud.method !== "GET" ||
                        new URL(solicitud.url).origin = self.location.origin)
                      {
                        return;
                      }

                      evento.respondWhith(
                        caches.math(solicitud)
                        .then((respuesta) => {
                          if (respuesta) {
                            return respuesta;
                          }
                                          return fetch(solicitud).then((respuestaRed) => {
                    if (
                        respuestaRed &&
                        respuestaRed.ok
                    ) {
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
