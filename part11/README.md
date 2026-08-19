# Parte 11 — CI/CD

La automatización se encuentra en `.github/workflows/` y cubre:

- instalación reproducible con `npm ci`;
- lint, pruebas y compilación de todos los workspaces;
- cancelación de ejecuciones obsoletas;
- despliegue sólo desde `main`, mediante un hook secreto;
- health check posterior y diario;
- etiquetado automático de despliegues exitosos;
- notificación de fallos cuando existe un webhook;
- actualizaciones de dependencias agrupadas con Dependabot.

## Secretos opcionales

| Secreto | Uso |
| --- | --- |
| `DEPLOY_HOOK_URL` | Hook del proveedor de hosting |
| `HEALTHCHECK_URL` | Endpoint `/api/health` de producción |
| `DISCORD_WEBHOOK` | Avisos cuando falla el pipeline |

La protección de ramas debe activarse desde GitHub: requerir el job `verify`, una revisión y una rama actualizada antes de hacer merge. Esa configuración pertenece al repositorio remoto y no se puede expresar de forma portable en los archivos del proyecto.
