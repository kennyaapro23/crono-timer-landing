# CronoTimer — Landing page

Landing oficial de **CronoTimer 2.1.0**, el sistema de gestión para LAN centers y cibercafés.
Es un sitio estático (HTML + CSS + JavaScript, sin build) listo para publicar gratis en **GitHub Pages**.

---

## 1. Vista previa local

Podés abrir `index.html` directamente con doble clic. Para probar las descargas y el fallback de GitHub Releases conviene levantar un servidor local:

```bash
# Desde esta carpeta
npx serve .
# o con Python
python -m http.server 8200
```

Luego abrí `http://localhost:8200`.

---

## 2. Publicar en GitHub Pages

1. Subí **el contenido de esta carpeta** a la raíz de tu repositorio.
2. En GitHub abrí **Settings → Pages**.
3. En *Build and deployment* elegí **Deploy from a branch**.
4. Seleccioná la rama `main` y la carpeta **`/ (root)`**.
5. Guardá y esperá unos minutos. GitHub te da la URL pública.

El archivo `.nojekyll` ya está incluido para que GitHub Pages no procese el sitio con Jekyll.

---

## 3. Configurar la página

Todo lo comercial se edita en **`js/config.js`**:

```js
window.SITE_CONFIG = {
  version: '2.1.0',
  whatsapp: '51924589730',
  whatsappDisplay: '+51 924 589 730',
  email: 'kennyaquinoamachi@gmail.com',

  github: {
    owner: 'TU_USUARIO',   // ← tu usuario de GitHub
    repo: 'cronotimer',    // ← nombre del repositorio
    releaseTag: 'v2.1.0'   // ← tag del release con los instaladores
  },

  pricing: {
    annualPerPc: null,      // null = muestra "A consultar"
    perpetualPerPc: null,   // podés poner un precio referencial por PC
    ...
  },

  tutorial: {
    youtubeId: ''           // pegá el ID cuando subas el video
  }
}
```

### Cambiar precios referenciales

Si querés que la calculadora muestre un estimado automático, poné un número en `annualPerPc` y/o `perpetualPerPc` (precio por PC). Si los dejás en `null`, la página muestra **“Cotización personalizada”** y el botón de WhatsApp, que es la opción recomendada para cotizar según cantidad de PCs.

### Video tutorial

Cuando publiques el video en YouTube, pegá solo el ID en `tutorial.youtubeId` (por ejemplo `dQw4w9WgXcQ`). El botón del tutorial abrirá el video en un modal dentro de la misma página.

---

## 4. Instaladores y descargas

La carpeta `downloads/` contiene los instaladores para probar la página en local:

| Archivo | Qué es |
|---|---|
| `CronoTimer-Setup-2.1.0.exe` | Servidor + panel de administración |
| `NetControl Client Setup 2.1.0.exe` | Cliente para cada PC |
| `CronoTimer-Setup-2.1.0.zip` | ZIP portable del servidor |
| `NetControl Client-2.1.0-win.zip` | ZIP portable del cliente |

> **Importante:** GitHub rechaza archivos de más de **100 MB** en el repositorio. Los ZIP superan ese límite, así que **no los subas con `git add`**. La carpeta ya está excluida en `.gitignore`.

### Subir los instaladores a GitHub Releases

1. En tu repositorio abrí **Releases → Draft a new release**.
2. Usá el tag **`v2.1.0`** (el mismo que pusiste en `config.js`).
3. Adjuntá los cuatro archivos con **exactamente estos nombres**:
   - `CronoTimer-Setup-2.1.0.exe`
   - `NetControl Client Setup 2.1.0.exe`
   - `CronoTimer-Setup-2.1.0.zip`
   - `NetControl Client-2.1.0-win.zip`
4. Publicá el release.

La página intenta primero el archivo local; si no existe en el servidor, abre automáticamente el asset del release de GitHub. No hace falta cambiar el HTML.

### Verificar los instaladores

Los hashes SHA-256 están publicados en las tarjetas de descarga:

- Servidor: `D7B25614B861DCD06DFB0A29063E1298EE33BC74343C53FE5F89A0CE851D8708`
- Cliente: `CD45E834277CFEC31BB2FC0D7361005EA132E178EA1EEF6D02BC6A5B15EBB8AB`

---

## 5. Estructura

```
.
├── index.html                  Página completa
├── css/styles.css              Sistema de diseño y responsive
├── js/config.js                Datos comerciales y enlaces (editar acá)
├── js/main.js                  Galería, calculadora, modales, descargas
├── assets/
│   ├── favicon.svg
│   ├── lan-center-background.jpg
│   └── screenshots/            Capturas reales del sistema
├── downloads/                  Instaladores locales (no se suben a git)
├── .gitignore
├── .nojekyll
└── README.md
```

---

## 6. Secciones de la página

- **Hero** con la imagen del LAN center y capturas reales del panel.
- **Funciones**: 15 módulos del sistema (estaciones, sesiones, caja, clientes, tarifas, tienda, pedidos, reportes, control remoto, lockscreen, permisos, puntos, alertas, backups y red local).
- **Tienda + Pedidos**: flujo de compra con saldo, stock y edición de pedidos.
- **Galería**: capturas ampliables del panel y del kiosco.
- **Cómo funciona**: instalación en cuatro pasos y note de red local sin internet.
- **Tutorial**: bloque preparado para el video de YouTube.
- **Planes**: licencia anual, permanente y cotización para varias sedes, con calculadora según cantidad de PCs.
- **Descargas**: instaladores, ZIP portables, requisitos, pasos de instalación y hashes.
- **FAQ** y cierre con contacto por WhatsApp.

---

## 7. Notas comerciales (para mantener el texto coherente)

- El **modo trial** permite operar con hasta **10 PCs activas** sin licencia.
- Las licencias se emiten **por cantidad de PCs**; el servidor no consume una licencia.
- Si una licencia anual vence, el sistema **no se bloquea**: pasa al modo básico de 10 PCs hasta que se renueve.
- Los datos viven en **SQLite local** en la PC del servidor.

Si cambiás alguna de estas condiciones comerciales, actualizá también los textos de `index.html` y las preguntas frecuentes.

---

## 8. Contacto

- WhatsApp: **+51 924 589 730**
- Email: **kennyaquinoamachi@gmail.com**
- Desarrollado por **Kenny Aquino**

---

© CronoTimer · Todos los derechos reservados.
