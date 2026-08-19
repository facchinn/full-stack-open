# Parte 2 — Comunicando con el servidor

En esta parte separé los tres grupos de ejercicios para que cada aplicación quede independiente y sea fácil de revisar.

## Ejercicios

- `courseinfo/` — ejercicios 2.1 a 2.5
- `phonebook/` — ejercicios 2.6 a 2.17
- `countries/` — ejercicios 2.18 a 2.20

## Qué practiqué

- renderizado de colecciones y módulos
- formularios controlados
- filtros
- `useEffect`
- comunicación HTTP con Axios
- JSON Server
- creación, actualización y eliminación de datos
- manejo de errores y notificaciones
- consumo de APIs externas

## Phonebook

Para levantar la agenda uso dos terminales:

```bash
cd part2/phonebook
npm install
npm run server
```

Y en otra terminal:

```bash
cd part2/phonebook
npm run dev
```

## Countries

La aplicación consulta la API de países usada por el curso y agrega información meteorológica de la capital con Open-Meteo.
