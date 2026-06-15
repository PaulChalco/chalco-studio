# Guía de portafolio — Chalco Studio · VFX + AI

> **Cómo usar este documento.** Hay dos fuentes de información para el sitio:
> - **Esta guía (`guia.md`) = la constitución.** Principios, reglas, qué no hacer, decisiones de stack. Lo que no cambia.
> - **El mockup (`Chalco_Studio_dc.html`) = el plano.** El layout exacto, los valores finales de color y tamaño, las interacciones.
>
> **Cuando guía y mockup difieran, gana el mockup.** Esta guía ya fue reconciliada con el mockup; los valores de abajo son los del prototipo.
>
> Nota técnica: el mockup está hecho en un framework basado en React (prototipo). **No se copia tal cual a Astro — se traduce.** La mayoría es estático; solo el grafo de skills y el formulario tienen estado real.

---

## Quién soy

VFX artist moviéndome hacia **Physical AI** como *creative technologist*. Mi trabajo vive en la intersección del movimiento, los sistemas y la forma: compositing nodal y simulación procedural (Houdini, Nuke, Davinci) por un lado; IA generativa, Python y automatización de pipeline (ComfyUI, Hugging Face, Linux, uv) por el otro.

El portafolio no es solo herramienta comercial: es una **bitácora viva**. La idea de redes sociales —mostrar lo que haces, poco a poco— llevada a una página propia. Documenta una transición en curso (VFX → AI → Physical AI), y por eso las secciones "en proceso" y "próximamente" no son huecos: son el motor del concepto.

**Decisión:** todo vive en un solo sitio que crece. No dividir VFX y Physical AI en dos portafolios — la transición visible *es* el producto.

---

## El proyecto

Portafolio web personal, pieza de diseño en sí misma. Quien lo visite debe sentir de inmediato que ve el trabajo de alguien con punto de vista visual propio.

### Stack técnico

- **Framework:** Astro (HTML estático, deploy en Netlify)
- **Estilos:** Tailwind CSS v4 (config vía `@theme` en `global.css`, sin `tailwind.config.js`) + CSS custom
- **Animación base:** scroll reveal nativo con IntersectionObserver (`.reveal` / `.reveal.active`) — ya funciona
- **Animación avanzada (por capas, al final):** GSAP + ScrollTrigger; Lenis para scroll suave
- **Video:** embeds de Vimeo con lazy load (iframe solo al hacer clic) — `VimeoPlayer.astro` ya existe
- **Formulario:** Netlify Forms (sin backend propio) o Formspree
- **Hosting:** Netlify (free tier, deploy automático desde GitHub) → cada push es "publicar un post"
- **Dominio:** por definir (Porkbun / Namecheap, ~$10/año)

### Lo que NO usar

- Vue, Next.js — innecesarios
- React **en todo el sitio** — permitido solo como *isla aislada* si el grafo de skills lo requiere (ver decisiones)
- Motion.dev — es para React
- jQuery ni alternativas a GSAP
- Bootstrap ni otro framework CSS aparte de Tailwind

---

## Identidad visual (valores del mockup)

### Dirección estética

Cinematográfico con energía urbana, atardecer GTA VI: calor, tensión, algo a punto de pasar. La página se siente como una **captura de una escena en movimiento**, no como un layout terminado. Lenguaje de viewfinder / terminal: marcas de encuadre, labels tipo `// SELECTED_WORKS`, `GRAPH_VIEW / PIPELINE.usd`.

Referencias: rockstargames.com/VI · juanmora.co · Awwwards scroll-driven.

### Paleta de colores (del mockup)

```css
--ink:        #0a0a0b   /* fondo base — near-black cálido */
--surface:    #121211   /* cards */
--surface-2:  #16140f   /* capas elevadas / chips */
--amber:      #f59e0b   /* acento primario — dorado cálido */
--orange:     #f26411   /* hover agresivo, tensión */
--blue:       #3b82f6   /* acento IA — marca el futuro/Physical AI */
--cyan:       #22d3ee   /* acento Python / código */
--cream:      #f1e9dd   /* texto principal */
--muted:      #9b9286   /* texto secundario */
--muted-2:    #8f8678   /* texto terciario */
--dim:        #5f594f   /* placeholders, separadores */
--dim-2:      #3a362d   /* decorativo apagado */
```

> Cambio respecto a la guía original: el fondo es near-black `#0a0a0b` (no `#1a1208`), y se **añade azul `#3b82f6` como acento de IA**. El azul no contradice la regla "no morados/azules de agencia": aquí es semántico — distingue lo que es IA/futuro de lo que es VFX/presente.

### Tipografía (del mockup)

- **Display / hero:** Bebas Neue — condensado, escala extrema (hasta clamp ~210px)
- **Headings / body:** DM Sans
- **Data / labels / código:** JetBrains Mono *(el mockup usa JetBrains Mono, no Fragment Mono)*

Reglas: contraste extremo de tamaños (display 88px+, labels 10-12px, nada en medio). Tracking display ajustado (~0.005em). Tracking labels amplio (0.12-0.42em), uppercase. Nunca Inter, Roboto, Arial, Space Grotesk.

### Efectos visuales

- **Film grain** — SVG feTurbulence fijo, opacidad ~0.055, `mix-blend-mode:overlay`, animación `grainShift`
- **Light leaks** — dos radiales fijos: ámbar arriba-derecha, azul abajo-izquierda
- **Scroll reveals** — `opacity 0→1` + `translateY(46px)→0`; cards con `clip-path: inset(0 0 100% 0) → inset(0 0 0 0)`
- **Hover de proyecto** — marcas de viewfinder (esquinas ámbar), `scale(1.05)` + saturación en media, panel de info que sube
- **Nav** — transparente arriba; al scroll: fondo translúcido + blur + padding reducido
- **Hero parallax** — bg embers se mueve a 0.34× del scroll
- **Cursor personalizado** (opcional, fase final) — dot ámbar que crece en hover

### Lo que NO hacer

Grids uniformes idénticos · layouts centrados simétricos · gradientes morado-azul de agencia · sombras Material difusas · border-radius > 8px en elementos grandes · easing bounce/elastic · fondos blancos.

---

## Estructura del sitio (orden del mockup)

`Hero → About → Proyectos → Skills (constelación) → Contacto → Footer`

### Hero (100vh)
Label `VFX & AI ARTIST` entre líneas. Nombre **CHALCO** (cream) / **STUDIO** (gradiente ámbar) en Bebas a escala enorme, centrado. Subtítulo. Fila de chips de skill con dot de color. CTA "VER PROYECTOS" + bloque de datos (STATUS/DISPONIBLE, BASE/REMOTE, FOCO/VFX·IA, STACK/HOUDINI·PY). Indicador de scroll animado. Bg embers con parallax + grain + scanlines.

### About
Label `// SOBRE EL ARTISTA`. Título "DONDE LA SIMULACIÓN SE ENCUENTRA CON EL CÓDIGO". Dos párrafos de bio. Tres stats grandes en Bebas (años en pipeline, disciplinas, herramientas en stack).

### Proyectos
Label `// SELECTED_WORKS`. Grid 2 columnas, cards 16/9. Barra de filtros por categoría (vanilla JS). Cada card: media (thumbnail o video), número, badge de categoría, marcas de viewfinder en hover, panel con título/rol/software/año. Reveal con clip-path al entrar.

Las cards integran el **lenguaje de 3 zonas** de la arquitectura de contenido:
- **Showreels (la prueba):** ShowReel Publicidad, Demo Reel Cine — *featured*
- **Proceso (bitácora técnica):** Air Crash, OSM-CDMX, Palacio de Bellas Artes, Journeys End
- **Pipeline AI (próximamente):** tarjetas wireframe/punteadas con ETA o link a GitHub

### Skills — Constelación (la pieza interactiva clave)
Label `// TECH_STACK`, título "CAPACIDADES". Grafo SVG de nodos conectados sobre tablero con grid. Al pasar el cursor sobre un nodo: resalta sus vecinos, atenúa el resto, y un panel lateral (`STANDBY` por defecto) muestra rol y descripción. Nodos AI en azul, resto en ámbar; nodos "en exploración" con borde punteado.

Nodos del mockup: `VFX`, `Compositing`, `Houdini`, `Nuke`, `GenAI`, `ComfyUI`, `Python`, `Linux`, y **NVIDIA Omniverse** (`kind: explore`, punteado — "USD y simulación física colaborativa, en exploración").

### Contacto
Label `NEW_MESSAGE.txt`. Form: nombre, email, mensaje, con validación inline (borde ámbar al llenar, naranja en error) y estado de éxito. **Debe conectarse a Netlify Forms** para enviar de verdad. Bloque de redes: GitHub, LinkedIn, Vimeo, Behance en JetBrains Mono.

### Footer
"CHALCO STUDIO" apagado + `© 2026` + `BUILT W/ ASTRO · GSAP · LENIS`.

---

## Concepto "vivo" — cómo crece el sitio

- **Git = el feed.** Nuevo experimento (ComfyUI, HF, script) → nuevo `.md` → push → Netlify rebuild → aparece. Eso es "publicar".
- **Campo `status` en el frontmatter controla la apariencia:**
  ```yaml
  status: "live"        # card sólida, video reproducible
  status: "in-progress" # borde wireframe, badge "en proceso" (ej. Omniverse)
  status: "planned"     # punteado, "Próximamente" + link a GitHub
  ```
  Promover un proyecto = cambiar una palabra.
- **Siguiente nivel (futuro):** en el build, consultar la **API de GitHub** (commits recientes) o **Hugging Face** (modelos/spaces) y mostrar actividad real. Ahí se siente verdaderamente vivo.

---

## Videos reales (Vimeo)

Todos **públicos** (los parámetros `?fl=tl&fe=ec` son tracking, no hash). **No llevan hash.**

| Proyecto | Vimeo ID | Zona | Estado |
|---|---|---|---|
| ShowReel Publicidad ★ | 1155606625 | Showreels | live · featured |
| Demo Reel Cine | 1002577974 | Showreels | live · featured |
| Air Crash (Houdini FX) | 1050329259 | Proceso | live · re-render IA pendiente |
| OSM–CDMX | 955752855 | Proceso | live |
| Palacio de Bellas Artes | 931562767 | Proceso | live |
| Journeys End (UT-Hub) | 841496306 | Proceso | live |

URL de embed (público, sin hash):
```
https://player.vimeo.com/video/[ID]?autoplay=1&title=0&byline=0&portrait=0&dnt=1
```

Comportamiento: thumbnail estático (WebP en `/public/thumbnails/`, máx 200KB) → iframe se inyecta solo al clic → ✕ lo remueve. Sin modal ni lightbox.

---

## Decisiones técnicas pendientes

1. **Grafo de skills:** ¿vanilla JS o isla de React?
   - Vanilla: cero dependencias, más trabajo. *Intentar primero.*
   - Isla React (`client:visible`): más fácil de mantener este widget; un solo componente aislado, no contamina el resto. Escape hatch si vanilla se vuelve frágil.
2. **Formulario:** Netlify Forms (recomendado, ya estás en Netlify) vs Formspree.

---

## Plan de construcción (fase por fase, cada una un commit)

```
Fase 0  Fundaciones    → @theme: paleta ámbar/near-black + Bebas Neue/DM Sans/JetBrains Mono
Fase 1  Estructura     → Layout (nav+footer) y Hero según mockup + film grain + light leaks
Fase 2  Proyectos      → card del mockup + VimeoPlayer existente; filtros vanilla; 6 .md
Fase 3  About + stats  → estático
Fase 4  Skills graph   → grafo interactivo (decidir vanilla vs isla)
Fase 5  Contacto       → form + Netlify Forms
Fase 6  Movimiento     → Lenis + GSAP ScrollTrigger + cursor custom (lo más frágil, al final)
Fase 7  "Vivo"         → campo status (live/in-progress/planned) → luego API GitHub/HF
```

**Fase 0 siempre primero:** mayor impacto visual, menor riesgo.

---

## Estructura de archivos esperada

```
src/
  components/
    VimeoPlayer.astro      ← lazy iframe + transición (ya existe)
    ProjectEntry.astro     ← entrada por proyecto (ya existe; adaptar a card del mockup)
    SkillsGraph.astro      ← constelación interactiva (vanilla o isla)
    ContactForm.astro      ← form + Netlify Forms
    Cursor.astro           ← cursor personalizado (fase 6)
    Grain.astro            ← film grain + light leaks
  content/
    projects/
      showreel-publicidad.md
      demo-reel-cine.md
      air-crash.md
      osm-cdmx.md
      palacio-bellas-artes.md
      journeys-end.md
  layouts/
    Layout.astro           ← nav, footer, fuentes, grain, (Lenis en fase 6)
  pages/
    index.astro
    proyectos/[slug].astro
  styles/
    global.css             ← @theme con paleta + tipografía
public/
  thumbnails/              ← WebP, máx 200KB
  assets/                  ← embers.png del hero, etc.
```

### Schema de cada `.md`
```yaml
title, year, category, tags[], description
vimeoId            # string
vimeoHash          # opcional, vacío para públicos
thumbnail          # /thumbnails/xxx.webp
featured           # boolean
orientation        # 'horizontal' | 'vertical', default horizontal
status             # 'live' | 'in-progress' | 'planned', default 'live'
```

---

## Reglas para el agente (Antigravity)

1. **Cuando guía y mockup difieran, gana el mockup.**
2. **Nunca modificar lo que no se pidió.** Solo el alcance del prompt.
3. **Construir fase por fase**, confirmando antes de seguir. Mostrar diffs, no archivos completos.
4. **Conservar lo que funciona:** `.reveal`, `VimeoPlayer`, lógica de filtros. No reemplazar sin justificación.
5. **El mockup es React — traducir a Astro**, no copiar. React solo como isla aislada para el grafo si se decide.
6. **GSAP/Lenis por capas, al final.** GSAP desde CDN; Lenis primero, luego `ScrollTrigger.scrollerProxy`.
7. CSS en `<style>` y JS en `<script>` por componente. No mezclar.
8. Colores y tipografías como variables en `@theme`. Nada hardcodeado.
9. `prefers-reduced-motion`: pausar todas las animaciones con `matchMedia`. Ya contemplado en `global.css`.
10. Imágenes: WebP, `loading="lazy"`, `decoding="async"`.
