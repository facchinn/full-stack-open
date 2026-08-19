# Parte 11 — CI/CD

En esta parte trabajé la automatización del repositorio con GitHub Actions.

Los workflows están en `.github/workflows/` y los usé para practicar:

- instalación y verificación automática de los proyectos
- lint, tests y build de los workspaces
- validación separada de la aplicación React Native
- ejecución en pushes y pull requests
- despliegue opcional desde `main`
- health checks
- creación de tags después de un despliegue exitoso
- avisos de fallos cuando hay un webhook configurado
- actualizaciones de dependencias con Dependabot

## Secretos opcionales

| Secreto | Uso |
| --- | --- |
| `DEPLOY_HOOK_URL` | Hook del proveedor de hosting |
| `HEALTHCHECK_URL` | URL para comprobar el estado de producción |
| `DISCORD_WEBHOOK` | Aviso cuando falla el pipeline |

Si esos secretos no están configurados, el pipeline puede seguir haciendo las verificaciones normales sin intentar un despliegue real.

La protección de la rama `main` es una configuración del repositorio de GitHub, no un archivo del proyecto.
