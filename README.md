# Full Stack Open — partes 0 a 11

Este repositorio reúne una implementación final, ejecutable y organizada de las doce partes solicitadas (numeradas del 0 al 11) del curso Full Stack Open. Los ejercicios que construyen una misma aplicación de forma incremental están representados por su versión final.

## Mapa del repositorio

| Parte | Entregable | Temas principales |
| --- | --- | --- |
| 0 | `part0/` | HTTP, SPA y diagramas de secuencia |
| 1 | `part1/` | React, componentes, props, estado y eventos |
| 2 | `part2/` | Formularios, colecciones, servicios REST y estilos |
| 3 | `part3/` | Express, MongoDB, validación y middleware |
| 4 | `part4/` | API de blogs, autenticación JWT y pruebas |
| 5 | `part5/` | Frontend de blogs, pruebas de componentes y E2E |
| 6 | `part6/` | Redux Toolkit, TanStack Query y Context |
| 7 | `part7/` | Router, hooks personalizados y vistas avanzadas |
| 8 | `part8/` | GraphQL, Apollo, caché y suscripciones |
| 9 | `part9/` | TypeScript, validación y Patientor |
| 10 | `part10/` | React Native, Apollo, formularios y paginación |
| 11 | `part11/` y `.github/` | Integración y entrega continua |

El curso oficial ahora contiene catorce partes (0–13). Este repositorio se limita deliberadamente a 0–11 para respetar el alcance de “12 partes”.

## Uso

1. Instala las dependencias web y backend desde la raíz: `npm install`.
2. Copia los archivos `.env.example` de los backends a `.env` y completa las variables necesarias.
3. Ejecuta una aplicación con `npm run dev -w partN` o desde el directorio de esa parte.
4. Ejecuta la verificación global con `npm run verify`.

React Native se mantiene separado del workspace principal para no mezclar las dependencias de Expo: entra en `part10/`, ejecuta `npm install` y luego `npm start`. El pipeline lo valida en un job independiente con ESLint y una exportación web de Metro.

## Servicios que se conectan entre sí

- `part5` consume la API de blogs de `part4`.
- `part7` consume la misma API ampliada de `part4`.
- `part8/client` consume `part8/server`.
- `part9/frontend` consume `part9/backend`.

No se incluyen credenciales, despliegues reales ni envíos al sistema de evaluación de la Universidad de Helsinki.
