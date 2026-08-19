# Parte 4 — Blog List backend

En esta parte trabajé sobre el backend de Blog List y agregué autenticación, usuarios y pruebas.

## Qué practiqué

- estructura de una aplicación backend
- pruebas unitarias y de integración
- MongoDB y relaciones entre modelos
- creación de usuarios
- hash de contraseñas con bcrypt
- autenticación con JWT
- middleware para extraer token y usuario
- autorización para borrar recursos
- utilidades como `listHelper`

## Ejecutar

```bash
cd part4
npm install
cp .env.example .env
npm run dev
```

Para las pruebas:

```bash
npm test
```

Las variables sensibles quedan fuera de Git y los valores necesarios están documentados en `.env.example`.
