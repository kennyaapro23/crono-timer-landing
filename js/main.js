/* ============================================================================
   CronoTimer — interacciones de la landing
   ========================================================================== */
(() => {
  'use strict'

  const cfg = window.SITE_CONFIG || {}
  const $  = (sel, root = document) => root.querySelector(sel)
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel))
  const money = (n) => `${cfg.pricing?.currency || 'S/'} ${Number(n).toFixed(2)}`
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  /* ── Año y versión ─────────────────────────────────────────────────────── */
  $$('#year').forEach(el => { el.textContent = new Date().getFullYear() })
  $$('[data-version]').forEach(el => { el.textContent = cfg.version || '2.1.0' })
  $$('[data-release-date]').forEach(el => { el.textContent = cfg.releaseDate || '' })
  $$('[data-wa-display]').forEach(el => { el.textContent = cfg.whatsappDisplay || '' })
  $$('[data-email]').forEach(el => {
    if (el.tagName === 'A') el.href = `mailto:${cfg.email || ''}`
  })
  $$('[data-email-text]').forEach(el => { el.textContent = cfg.email || '' })
  $$('[data-wa]').forEach(el => {
    const msg = el.dataset.wa || 'Hola, quiero información sobre CronoTimer.'
    el.href = `https://wa.me/${cfg.whatsapp || ''}?text=${encodeURIComponent(msg)}`
    el.target = '_blank'
    el.rel = 'noopener'
  })

  /* ── Header, progreso y menú móvil ─────────────────────────────────────── */
  const header = $('.site-header')
  const progress = $('.scroll-progress span')
  const backTop = $('.back-top')

  const onScroll = () => {
    const y = window.scrollY || document.documentElement.scrollTop
    if (header) header.classList.toggle('is-scrolled', y > 24)
    if (backTop) backTop.classList.toggle('is-visible', y > 700)
    if (progress) {
      const max = document.documentElement.scrollHeight - window.innerHeight
      progress.style.width = `${max > 0 ? Math.min(100, (y / max) * 100) : 0}%`
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()

  const menuBtn = $('.menu-toggle')
  const nav = $('.main-nav')
  const closeMenu = () => {
    if (!menuBtn || !nav) return
    menuBtn.setAttribute('aria-expanded', 'false')
    nav.classList.remove('is-open')
    document.body.classList.remove('nav-open')
  }
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      const open = menuBtn.getAttribute('aria-expanded') === 'true'
      menuBtn.setAttribute('aria-expanded', String(!open))
      nav.classList.toggle('is-open', !open)
      document.body.classList.toggle('nav-open', !open)
    })
    $$('a', nav).forEach(a => a.addEventListener('click', closeMenu))
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu() })
  }

  /* ── Reveal on scroll ──────────────────────────────────────────────────── */
  const revealEls = $$('[data-reveal]')
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(el => el.classList.add('is-visible'))
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          io.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' })
    revealEls.forEach(el => io.observe(el))
  }

  /* ── Contadores ────────────────────────────────────────────────────────── */
  const counters = $$('[data-count]')
  const animateCounter = (el) => {
    const target = Number(el.dataset.count)
    const suffix = el.dataset.suffix || ''
    if (!Number.isFinite(target)) return
    if (reduceMotion) { el.textContent = `${target}${suffix}`; return }
    const start = performance.now()
    const duration = 1100
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      el.textContent = `${Math.round(target * eased)}${suffix}`
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }
  if ('IntersectionObserver' in window) {
    const co = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { animateCounter(entry.target); co.unobserve(entry.target) }
      })
    }, { threshold: 0.4 })
    counters.forEach(el => co.observe(el))
  } else {
    counters.forEach(animateCounter)
  }

  /* ── Galería de capturas ───────────────────────────────────────────────── */
  const galleryTabs = $$('.gallery-tab')
  const galleryPanels = $$('.gallery-panel')
  const galleryCounter = $('.gallery-counter')

  const showShot = (key) => {
    if (!galleryTabs.length) return
    galleryTabs.forEach(tab => {
      const active = tab.dataset.shot === key
      tab.classList.toggle('is-active', active)
      tab.setAttribute('aria-selected', String(active))
      tab.tabIndex = active ? 0 : -1
    })
    galleryPanels.forEach(panel => {
      const active = panel.dataset.shot === key
      panel.hidden = !active
      panel.classList.toggle('is-active', active)
    })
    const idx = galleryTabs.findIndex(t => t.dataset.shot === key)
    if (galleryCounter) galleryCounter.textContent = `${String(idx + 1).padStart(2, '0')} / ${String(galleryTabs.length).padStart(2, '0')}`
  }

  galleryTabs.forEach((tab, i) => {
    tab.addEventListener('click', () => showShot(tab.dataset.shot))
    tab.addEventListener('keydown', e => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
      e.preventDefault()
      const next = e.key === 'ArrowRight' ? (i + 1) % galleryTabs.length : (i - 1 + galleryTabs.length) % galleryTabs.length
      galleryTabs[next].focus()
      showShot(galleryTabs[next].dataset.shot)
    })
  })
  if (galleryTabs.length) showShot(galleryTabs[0].dataset.shot)

  /* ── Lightbox ──────────────────────────────────────────────────────────── */
  const lightbox = $('#lightbox')
  const lightboxImg = $('#lightboxImg')
  const lightboxCaption = $('#lightboxCaption')
  let lastFocus = null

  const openLightbox = (src, caption) => {
    if (!lightbox || !lightboxImg) return
    lastFocus = document.activeElement
    lightboxImg.src = src
    lightboxImg.alt = caption || 'Captura de CronoTimer'
    if (lightboxCaption) lightboxCaption.textContent = caption || ''
    lightbox.hidden = false
    document.body.classList.add('modal-open')
    $('.lightbox-close', lightbox)?.focus()
  }
  const closeLightbox = () => {
    if (!lightbox) return
    lightbox.hidden = true
    document.body.classList.remove('modal-open')
    lastFocus?.focus?.()
  }
  $$('.shot-open').forEach(btn => {
    btn.addEventListener('click', () => {
      const panel = btn.closest('.gallery-panel') || btn.closest('figure')
      const img = panel?.querySelector('img')
      const cap = panel?.querySelector('.gallery-caption h3, figcaption')?.textContent?.trim()
      if (img) openLightbox(img.src, cap)
    })
  })
  if (lightbox) {
    $('.lightbox-close', lightbox)?.addEventListener('click', closeLightbox)
    lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox() })
  }
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox()
  })

  /* ── Video tutorial ────────────────────────────────────────────────────── */
  const videoModal = $('#videoModal')
  const videoFrame = $('#videoFrame')
  const videoFallback = $('#videoFallback')
  const openVideo = () => {
    if (!videoModal) return
    const id = cfg.tutorial?.youtubeId
    lastFocus = document.activeElement
    if (id) {
      if (videoFrame) {
        videoFrame.hidden = false
        videoFrame.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0" title="${cfg.tutorial.title || 'Tutorial de CronoTimer'}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
      }
      if (videoFallback) videoFallback.hidden = true
    } else {
      if (videoFrame) { videoFrame.hidden = true; videoFrame.innerHTML = '' }
      if (videoFallback) videoFallback.hidden = false
    }
    videoModal.hidden = false
    document.body.classList.add('modal-open')
    $('.video-close', videoModal)?.focus()
  }
  const closeVideo = () => {
    if (!videoModal) return
    videoModal.hidden = true
    if (videoFrame) videoFrame.innerHTML = ''
    document.body.classList.remove('modal-open')
    lastFocus?.focus?.()
  }
  $$('.video-open').forEach(btn => btn.addEventListener('click', openVideo))
  if (videoModal) {
    $('.video-close', videoModal)?.addEventListener('click', closeVideo)
    $('.video-close-inner', videoModal)?.addEventListener('click', closeVideo)
    videoModal.addEventListener('click', e => { if (e.target === videoModal) closeVideo() })
  }
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeVideo() })

  /* ── Planes y calculadora ──────────────────────────────────────────────── */
  const planButtons = $$('.plan-toggle')
  const priceCards = $$('.price-card')
  const pcRange = $('#pcCount')
  const pcValue = $('#pcCountValue')
  const quotePlan = $('#quotePlan')
  const quotePcs = $('#quotePcs')
  const quoteEstimate = $('#quoteEstimate')
  const quoteWhatsapp = $('#quoteWhatsapp')
  const quoteNote = $('#quoteNote')
  const state = { plan: 'annual', pcs: Number(pcRange?.value || 20) }

  const fillPrice = (sel, rate) => {
    const el = $(sel)
    if (!el) return
    const value = Number(rate)
    el.textContent = Number.isFinite(value) && value > 0 ? money(value) : 'A consultar'
  }
  fillPrice('[data-price-annual]', cfg.pricing?.annualPerPc)
  fillPrice('[data-price-perpetual]', cfg.pricing?.perpetualPerPc)

  const planLabel = () => state.plan === 'perpetual' ? 'Licencia permanente' : 'Licencia anual'
  const tierFactor = (pcs) => {
    const tiers = Array.isArray(cfg.pricing?.volumeTiers) ? cfg.pricing.volumeTiers : []
    return tiers.reduce((factor, tier) => pcs >= Number(tier.min) ? Number(tier.factor) : factor, 1)
  }
  const estimate = () => {
    const rate = state.plan === 'perpetual' ? cfg.pricing?.perpetualPerPc : cfg.pricing?.annualPerPc
    if (!Number.isFinite(Number(rate)) || Number(rate) <= 0) return null
    return Math.round(state.pcs * Number(rate) * tierFactor(state.pcs) * 100) / 100
  }
  const whatsappUrl = () => {
    const msg = `Hola, quiero cotizar la ${planLabel().toLowerCase()} de ${cfg.brand || 'CronoTimer'} para ${state.pcs} PCs.`
    return `https://wa.me/${cfg.whatsapp || ''}?text=${encodeURIComponent(msg)}`
  }

  const renderQuote = () => {
    if (pcValue) pcValue.textContent = String(state.pcs)
    if (pcRange) {
      const min = Number(pcRange.min || 0)
      const max = Number(pcRange.max || 100)
      const pct = max > min ? ((state.pcs - min) / (max - min)) * 100 : 0
      pcRange.style.setProperty('--range-progress', `${Math.max(0, Math.min(100, pct))}%`)
    }
    $$('.pc-preset').forEach(b => b.classList.toggle('is-active', Number(b.dataset.pcs) === state.pcs))
    if (quotePlan) quotePlan.textContent = planLabel()
    if (quotePcs) quotePcs.textContent = `${state.pcs} ${state.pcs === 1 ? 'PC' : 'PCs'}`
    const value = estimate()
    if (quoteEstimate) {
      quoteEstimate.textContent = value == null ? 'Cotización personalizada' : `${money(value)} aprox.`
      quoteEstimate.classList.toggle('is-quote', value == null)
    }
    if (quoteNote) {
      quoteNote.textContent = value == null
        ? (cfg.pricing?.note || 'Te pasamos el precio por WhatsApp según tu cantidad de PCs.')
        : 'Precio referencial. La cotización final se confirma por WhatsApp.'
    }
    if (quoteWhatsapp) quoteWhatsapp.href = whatsappUrl()
    planButtons.forEach(btn => {
      const active = btn.dataset.plan === state.plan
      btn.classList.toggle('is-active', active)
      btn.setAttribute('aria-pressed', String(active))
    })
    priceCards.forEach(card => card.classList.toggle('is-featured', card.dataset.plan === state.plan))
  }

  planButtons.forEach(btn => btn.addEventListener('click', () => {
    state.plan = btn.dataset.plan === 'perpetual' ? 'perpetual' : 'annual'
    renderQuote()
  }))
  pcRange?.addEventListener('input', () => {
    state.pcs = Number(pcRange.value)
    renderQuote()
  })
  $$('.pc-preset').forEach(btn => btn.addEventListener('click', () => {
    const pcs = Number(btn.dataset.pcs)
    state.pcs = pcs
    if (pcRange) pcRange.value = String(Math.min(Number(pcRange.max), pcs))
    renderQuote()
  }))
  $$('[data-quote]').forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault()
    state.plan = btn.dataset.quote === 'perpetual' ? 'perpetual' : 'annual'
    if (pcRange) state.pcs = Number(pcRange.value) || state.pcs
    renderQuote()
    $('#cotizador')?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' })
  }))
  if (pcRange) renderQuote()

  /* ── Descargas ─────────────────────────────────────────────────────────── */
  const releaseAsset = (file) => {
    const gh = cfg.github || {}
    if (!gh.owner || !gh.repo || gh.owner === 'TU_USUARIO' || !gh.releaseTag) return ''
    return `https://github.com/${gh.owner}/${gh.repo}/releases/download/${gh.releaseTag}/${encodeURIComponent(file)}`
  }
  const toast = $('#toast')
  let toastTimer = null
  const showToast = (msg, type = '') => {
    if (!toast) return
    toast.textContent = msg
    toast.className = `toast is-visible ${type}`.trim()
    clearTimeout(toastTimer)
    toastTimer = setTimeout(() => { toast.className = 'toast' }, 4200)
  }

  $$('[data-download]').forEach(link => {
    const key = link.dataset.download
    const item = cfg.downloads?.[key]
    if (!item) return
    link.href = item.local || '#'
    link.setAttribute('download', '')
    const release = releaseAsset(item.file)
    if (release) link.dataset.release = release

    link.addEventListener('click', async (e) => {
      if (location.protocol === 'file:') return // vista local: el archivo existe
      let exists = false
      try {
        const res = await fetch(item.local, { method: 'HEAD', cache: 'no-store' })
        exists = res.ok
      } catch { /* archivo local no disponible */ }
      if (exists) return
      e.preventDefault()
      const releaseUrl = link.dataset.release
      if (releaseUrl) {
        window.open(releaseUrl, '_blank', 'noopener')
      } else {
        showToast('El instalador aún no está publicado. Subilo a GitHub Releases y configurá js/config.js.', 'error')
      }
    })
  })

  $$('[data-copy]').forEach(btn => btn.addEventListener('click', async () => {
    const text = btn.dataset.copy || ''
    try {
      await navigator.clipboard.writeText(text)
      showToast('SHA-256 copiado al portapapeles', 'success')
    } catch {
      showToast('No se pudo copiar. Seleccioná el texto manualmente.', 'error')
    }
  }))

  $$('[data-releases]').forEach(link => {
    const gh = cfg.github || {}
    if (gh.owner && gh.repo && gh.owner !== 'TU_USUARIO') {
      link.href = `https://github.com/${gh.owner}/${gh.repo}/releases`
    } else {
      link.addEventListener('click', (e) => {
        e.preventDefault()
        showToast('Configurá tu usuario y repo de GitHub en js/config.js', 'error')
      })
    }
  })

  /* ── FAQ: mantener un solo abierto ─────────────────────────────────────── */
  const faqs = $$('.faq-item')
  faqs.forEach(item => item.addEventListener('toggle', () => {
    if (!item.open) return
    faqs.forEach(other => { if (other !== item) other.open = false })
  }))

  /* ── Nav activo según sección ──────────────────────────────────────────── */
  const navLinks = $$('.main-nav a[href^="#"]')
  const sections = navLinks
    .map(a => document.getElementById(a.getAttribute('href').slice(1)))
    .filter(Boolean)
  if ('IntersectionObserver' in window && sections.length) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        navLinks.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === `#${entry.target.id}`))
      })
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 })
    sections.forEach(s => navObserver.observe(s))
  }

  /* ── Botón volver arriba ───────────────────────────────────────────────── */
  backTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }))
})()
