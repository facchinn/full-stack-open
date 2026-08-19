# Full Stack Open

Este repositorio es donde voy guardando mi progreso y los ejercicios que hice para **Full Stack Open**, el curso de desarrollo web de la Universidad de Helsinki.

La idea es tener todo ordenado por partes y, al mismo tiempo, dejar un registro claro de lo que fui practicando: React, Node.js, APIs, testing, TypeScript, GraphQL, React Native y CI/CD.

## Estructura

| Parte | Carpeta | Temas principales |
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
| 11 | `part11/` | CI/CD y GitHub Actions |

## Cómo ejecutar los proyectos

La mayoría de las partes se pueden levantar desde su propia carpeta:

```bash
cd part1
npm install
npm run dev
```

En los proyectos que necesitan variables de entorno dejé archivos `.env.example` como referencia. No subo credenciales al repositorio.

Para React Native uso la configuración de `part10` por separado para no mezclar dependencias de Expo con el resto del workspace.

## Sobre el repositorio

No intenté convertir los ejercicios en una sola aplicación grande. Cada parte mantiene el foco en los conceptos que se trabajan en ese punto del curso. Cuando varios ejercicios construyen la misma aplicación de forma incremental, conservo la versión final de esa etapa.

Voy actualizando este repositorio a medida que avanzo y reviso las soluciones.
