# Full Stack Open

Este repositorio es donde voy guardando mis ejercicios y proyectos de **Full Stack Open**, el curso de desarrollo web de la Universidad de Helsinki.

Lo organicé por partes y por aplicación para que cada ejercicio se pueda revisar sin mezclar código que corresponde a temas distintos.

## Estructura

| Parte | Contenido principal |
| --- | --- |
| `part0/` | HTTP, SPA y diagramas de secuencia |
| `part1/` | React, componentes, props, estado y eventos |
| `part2/` | Colecciones, formularios, APIs y comunicación con servidor |
| `part3/` | Node.js, Express, MongoDB y validación |
| `part4/` | Blog List backend, testing, usuarios y JWT |
| `part5/` | Blog List frontend y testing |
| `part6/` | Redux Toolkit, TanStack Query y Context |
| `part7/` | React Router, hooks personalizados y Blog List ampliado |
| `part8/` | GraphQL, Apollo y subscriptions |
| `part9/` | TypeScript |
| `part10/` | React Native |
| `part11/` | CI/CD con GitHub Actions |

Las partes que contienen varias aplicaciones tienen carpetas separadas. Por ejemplo:

```text
part1/
├── courseinfo/
├── unicafe/
└── anecdotes/

part2/
├── courseinfo/
├── phonebook/
└── countries/
```

## Ejecutar un ejercicio

Cada aplicación se puede levantar desde su propia carpeta. Por ejemplo:

```bash
cd part1/unicafe
npm install
npm run dev
```

En proyectos que necesitan variables de entorno dejé archivos `.env.example` como referencia. Las credenciales reales no se suben al repositorio.

También dejé scripts en la raíz para verificar de una vez los proyectos que forman parte de los workspaces:

```bash
npm install
npm run verify
```

React Native (`part10`) se mantiene separado para no mezclar las dependencias de Expo con el resto de los proyectos.

## Tecnologías que fui practicando

JavaScript, TypeScript, React, Node.js, Express, MongoDB, REST APIs, testing, Redux, TanStack Query, GraphQL, Apollo, React Native, GitHub Actions y CI/CD.
