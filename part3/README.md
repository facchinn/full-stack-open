# Parte 3 — Backend de Phonebook

En esta parte pasé la agenda telefónica a un backend con Node.js y Express.

## Qué practiqué

- API REST con Express
- rutas y middleware
- logging con Morgan
- MongoDB y Mongoose
- validaciones del modelo
- manejo centralizado de errores
- variables de entorno
- pruebas de la API con Supertest

La aplicación usa MongoDB cuando `MONGODB_URI` está configurada. Para poder probarla localmente sin una base externa también dejé un almacenamiento en memoria como alternativa de desarrollo.

## Ejecutar

```bash
cd part3
npm install
cp .env.example .env
npm run dev
```

Para correr las pruebas:

```bash
npm test
```

No guardo credenciales ni cadenas de conexión reales en el repositorio.
