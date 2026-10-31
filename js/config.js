/* ============================================================================
   CronoTimer — configuración de la landing
   Editá este archivo antes de publicar en GitHub Pages.
   ========================================================================== */
window.SITE_CONFIG = {
  brand: 'CronoTimer',
  version: '2.1.0',
  releaseDate: '30/10/2026',

  // Contacto comercial
  whatsapp: '51924589730',
  whatsappDisplay: '+51 924 589 730',
  email: 'kennyaquinoamachi@gmail.com',

  // GitHub: cambiá owner/repo por los de tu repositorio.
  // Si preferís no usar Releases, dejá owner vacío y subí los instaladores
  // dentro de la carpeta downloads/ (ver README.md).
  github: {
    owner: 'TU_USUARIO',
    repo: 'cronotimer',
    releaseTag: 'v2.1.0'
  },

  // Archivos descargables. Los locales se usan primero; si no existen,
  // el botón cae automáticamente al asset del GitHub Release.
  downloads: {
    server: {
      label: 'Servidor / Panel de administración',
      file: 'CronoTimer-Setup-2.1.0.exe',
      local: 'downloads/CronoTimer-Setup-2.1.0.exe',
      size: '85.4 MB',
      sha256: 'D7B25614B861DCD06DFB0A29063E1298EE33BC74343C53FE5F89A0CE851D8708'
    },
    client: {
      label: 'Cliente para cada PC',
      file: 'NetControl Client Setup 2.1.0.exe',
      local: 'downloads/NetControl Client Setup 2.1.0.exe',
      size: '79.6 MB',
      sha256: 'CD45E834277CFEC31BB2FC0D7361005EA132E178EA1EEF6D02BC6A5B15EBB8AB'
    },
    serverZip: {
      label: 'Servidor — ZIP portable',
      file: 'CronoTimer-Setup-2.1.0.zip',
      local: 'downloads/CronoTimer-Setup-2.1.0.zip',
      size: '116.5 MB'
    },
    clientZip: {
      label: 'Cliente — ZIP portable',
      file: 'NetControl Client-2.1.0-win.zip',
      local: 'downloads/NetControl Client-2.1.0-win.zip',
      size: '107.5 MB'
    }
  },

  // Licencias: si dejás annualPerPc / perpetualPerPc en null, la página
  // muestra "Cotización personalizada" y el botón de WhatsApp.
  // Si querés mostrar un precio referencial, poné el precio por PC.
  pricing: {
    currency: 'S/',
    annualPerPc: null,
    perpetualPerPc: null,
    minPcs: 5,
    maxPcs: 100,
    volumeTiers: [
      { min: 1, factor: 1 },
      { min: 20, factor: 0.9 },
      { min: 50, factor: 0.8 },
      { min: 100, factor: 0.7 }
    ],
    note: 'La cotización final se ajusta a la cantidad de PCs, soporte e instalación.'
  },

  // Video tutorial: pegá el ID de YouTube cuando esté publicado.
  // Ejemplo: 'dQw4w9WgXcQ'
  tutorial: {
    youtubeId: '',
    title: 'Tutorial de CronoTimer — instalación y primer uso'
  }
}
