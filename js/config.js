
/* ============================================================================
   CronoTimer — configuración de la landing
   GitHub Pages + GitHub Releases
   ========================================================================== */

window.SITE_CONFIG = {
  brand: 'CronoTimer',
  version: '2.1.0',
  releaseDate: '30/10/2026',

  // Contacto comercial
  whatsapp: '51924589730',
  whatsappDisplay: '+51 924 589 730',
  email: 'kennyaquinoamachi@gmail.com',

  // Repositorio oficial de CronoTimer
  github: {
    owner: 'kennyaapro23',
    repo: 'crono-timer-landing',
    releaseTag: 'V2.1.0'
  },

  // Instaladores disponibles en GitHub Releases
  downloads: {
    server: {
      label: 'Servidor / Panel de administración',
      file: 'CronoTimer-Setup-2.1.0.exe',
      local: '',
      size: '85.4 MB',
      sha256: 'D7B25614B861DCD06DFB0A29063E1298EE33BC74343C53FE5F89A0CE851D8708'
    },

    client: {
      label: 'Cliente para cada PC',
      file: 'NetControl.Client.Setup.2.1.0.exe',
      local: '',
      size: '79.6 MB',
      sha256: 'CD45E834277CFEC31BB2FC0D7361005EA132E178EA1EEF6D02BC6A5B15EBB8AB'
    }
  },

  // Licencias y precios
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

  // Versión gratuita: hasta 10 PCs
  freeVersion: {
    enabled: true,
    maxPcs: 10,
    label: 'Gratis hasta 10 PCs'
  },

  // Video tutorial
  tutorial: {
    youtubeId: '',
    title: 'Tutorial de CronoTimer — instalación y primer uso'
  }
};
