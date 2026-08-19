# Parte 0 — fundamentos de aplicaciones web

Los tres diagramas representan los ejercicios 0.4, 0.5 y 0.6. Se usa sintaxis Mermaid para que GitHub pueda renderizarlos directamente.

## 0.4 — crear una nota en la aplicación tradicional

```mermaid
sequenceDiagram
    participant browser as Navegador
    participant server as Servidor
    browser->>server: POST /new_note (contenido del formulario)
    activate server
    server-->>browser: 302 Found, Location: /notes
    deactivate server
    browser->>server: GET /notes
    server-->>browser: HTML
    browser->>server: GET /main.css
    server-->>browser: CSS
    browser->>server: GET /main.js
    server-->>browser: JavaScript
    browser->>server: GET /data.json
    server-->>browser: JSON con todas las notas
    Note right of browser: El navegador vuelve a renderizar la lista
```
## 0.5 — abrir la versión SPA

```mermaid
sequenceDiagram
    participant browser as Navegador
    participant server as Servidor
    browser->>server: GET /spa
    server-->>browser: HTML de la SPA
    browser->>server: GET /main.css
    server-->>browser: CSS
    browser->>server: GET /spa.js
    server-->>browser: JavaScript
    browser->>server: GET /data.json
    server-->>browser: JSON con las notas
    Note right of browser: JavaScript construye la vista sin recargar la página
```

## 0.6 — crear una nota en la SPA

```mermaid
sequenceDiagram
    participant browser as Navegador
    participant server as Servidor
    Note right of browser: El manejador del formulario agrega la nota a la vista
    browser->>server: POST /new_note_spa (JSON)
    activate server
    server-->>browser: 201 Created
    deactivate server
    Note right of browser: No hay redirección ni nueva descarga del HTML
```
