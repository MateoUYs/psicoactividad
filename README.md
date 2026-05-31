# Desafío de la Motivación

Aplicación web interactiva para presentaciones universitarias de Psicología de la Educación. Esta experiencia propone analizar situaciones reales de aula y vincularlas con teorías de la motivación, con una interfaz moderna, responsive y optimizada para uso desde celular mediante QR.

## Caracteristicas principales

- Experiencia interactiva no tradicional (no tipo Kahoot ni cuestionario infantil).
- 5 situaciones educativas con devolución inmediata y explicación conceptual.
- Barra de progreso visual (Pregunta X de 5).
- Fondo animado sutil inspirado en aprendizaje/educacion.
- Sonidos opcionales y discretos al responder.
- Pantalla final con resultados pedagógicos diferenciados según puntaje.
- Nube animada de palabras clave para cierre reflexivo.
- Modo claro/oscuro automático según configuración del dispositivo.
- Compatible con Chrome, Edge y Safari.
- Sin login, sin registro, sin instalación.

## Estructura del proyecto

```text
.
|- index.html
|- styles.css
|- script.js
|- vercel.json
|- netlify.toml
`- README.md
```

## 1) Cómo ejecutar la aplicación localmente

No requiere dependencias ni instalación de paquetes.

### Opción A (recomendada) - Python

Desde la carpeta del proyecto:

```bash
python -m http.server 5500
```

Abrir en el navegador:

```text
http://localhost:5500
```

### Opción B - VS Code Live Server

1. Abrir la carpeta del proyecto en VS Code.
2. Instalar la extensión **Live Server** (si no está instalada).
3. Click derecho en `index.html` -> **Open with Live Server**.

## 2) Cómo generar la versión de producción

Este proyecto es estático, por lo tanto la versión de producción es el mismo conjunto de archivos (`index.html`, `styles.css`, `script.js` y configuraciones).

Para preparar una carpeta publicable:

1. Crear una carpeta, por ejemplo `dist/`.
2. Copiar dentro:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `vercel.json` (si desplegas en Vercel)
   - `netlify.toml` (si desplegas en Netlify)

## 3) Cómo subirla a Vercel (preferido)

1. Crear cuenta o iniciar sesión en [Vercel](https://vercel.com).
2. Subir el proyecto desde GitHub (recomendado) o con drag-and-drop.
3. Si usas GitHub:
   - Importar repositorio.
   - Framework preset: **Other**.
   - Build command: vacio.
   - Output directory: `.`
4. Publicar con **Deploy**.
5. Vercel devolverá un enlace público HTTPS (ideal para QR).

## 4) Cómo subirla a Netlify

1. Iniciar sesión en [Netlify](https://www.netlify.com).
2. Opción rápida: arrastrar la carpeta del proyecto en **Deploy manually**.
3. Opción Git:
   - Conectar repositorio.
   - Build command: vacio.
   - Publish directory: `.`
4. Confirmar deploy y copiar URL pública.

## 5) Cómo obtener el enlace público

- En Vercel: aparece en el panel del proyecto luego de cada deploy.
- En Netlify: aparece como **Site URL** en el dashboard.
- En GitHub Pages: aparece en Settings -> Pages.

Recomendación: usar un dominio corto y fácil de escribir para la presentación.

## 6) Cómo generar un código QR para proyectarlo en clase

Con la URL pública lista:

1. Entrar a un generador de QR (por ejemplo `https://www.qr-code-generator.com/` o `https://www.canva.com/qr-code-generator/`).
2. Pegar la URL HTTPS de la aplicacion.
3. Generar y descargar el código QR (PNG o SVG).
4. Insertarlo en tu diapositiva final o inicial.

Tip: probar el QR con datos móviles antes de la presentación.

## 7) Cómo compartir la actividad con participantes

1. Publicar el enlace en Vercel/Netlify/GitHub Pages.
2. Mostrar QR en la proyeccion al inicio de la actividad.
3. Compartir tambien el enlace corto en el chat del curso.
4. Pedir que abran desde el navegador del celular (sin instalar apps).
5. Ejecutar la dinámica en vivo y usar la pantalla final como disparador de reflexión pedagógica.

## Publicacion alternativa en GitHub Pages

1. Subir el proyecto a un repositorio en GitHub.
2. Ir a **Settings -> Pages**.
3. En **Build and deployment**, seleccionar:
   - Source: **Deploy from a branch**
   - Branch: `main` (root)
4. Guardar y esperar la URL publicada.

## Rendimiento y compatibilidad

- Proyecto liviano (HTML + CSS + JS vanilla).
- Sin librerías pesadas ni dependencias innecesarias.
- Carga rápida en datos móviles.
- Diseño adaptado para celular, tablet y escritorio.
