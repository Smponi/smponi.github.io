# Performance-Optimierungen

Dieses Dokument beschreibt die durchgeführten Performance-Optimierungen, die die Scroll-Performance und allgemeine Reaktionsfähigkeit der Anwendung erheblich verbessert haben.

## Ausgangssituation

React Scan zeigte folgende Metriken während des Scrollens:
- **React Render Time:** 0ms
- **Other Time:** 156.7ms

Die hohe "Other Time" bei 0ms Render-Zeit deutete darauf hin, dass das Problem **nicht** im React-Rendering lag, sondern in:
- JavaScript-Ausführung außerhalb des React-Renderings (Event Handler, Hooks)
- Layout-Berechnungen (Layout Thrashing)
- CSS-Effekte (backdrop-blur, Transitions)

---

## Durchgeführte Optimierungen

### 1. Layout Thrashing in ScrollGlow behoben

**Datei:** `src/components/ui/Background.tsx`

**Problem:**
```tsx
// VORHER - Verursacht Layout Thrashing
const handleScroll = () => {
  const scrollY = window.scrollY
  const maxScroll = document.body.scrollHeight - window.innerHeight // Erzwingt Layout-Berechnung!
  const scrollPercent = Math.min(scrollY / maxScroll, 1)
  glowRef.current.style.transform = `translateY(${scrollPercent * 50}vh)`
}
```

Das Lesen von `document.body.scrollHeight` bei jedem Scroll-Event erzwingt eine synchrone Layout-Berechnung. In Kombination mit dem anschließenden Schreiben auf `style.transform` entsteht "Layout Thrashing" - ein extrem teurer Vorgang.

**Lösung:**
```tsx
// NACHHER - Cached maxScroll, RAF-Throttling
const maxScrollRef = useRef(0)
const rafIdRef = useRef<number | null>(null)

useEffect(() => {
  const updateMaxScroll = () => {
    maxScrollRef.current = document.body.scrollHeight - window.innerHeight
  }
  updateMaxScroll()

  const handleScroll = () => {
    if (rafIdRef.current !== null) return

    rafIdRef.current = requestAnimationFrame(() => {
      rafIdRef.current = null
      const scrollPercent = Math.min(window.scrollY / maxScrollRef.current, 1)
      glowRef.current.style.transform = `translateY(${scrollPercent * 50}vh)`
    })
  }

  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', updateMaxScroll, { passive: true })
  // ...
}, [])
```

**Verbesserungen:**
- `maxScroll` wird nur einmal beim Mount und bei Resize berechnet
- `requestAnimationFrame` limitiert Updates auf 60fps
- `passive: true` ermöglicht Browser-Scroll-Optimierungen

---

### 2. Navbar Scroll Handler optimiert

**Datei:** `src/components/Navbar.tsx`

**Problem:**
```tsx
// VORHER
useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 50) // Läuft bei JEDEM Scroll-Event
  }
  window.addEventListener('scroll', handleScroll) // Kein passive!
  // ...
}, [])
```

**Lösung:**
```tsx
// NACHHER
const rafIdRef = useRef<number | null>(null)

useEffect(() => {
  const handleScroll = () => {
    if (rafIdRef.current !== null) return

    rafIdRef.current = requestAnimationFrame(() => {
      rafIdRef.current = null
      setScrolled(window.scrollY > 50)
    })
  }

  window.addEventListener('scroll', handleScroll, { passive: true })
  // ...
}, [])
```

**Verbesserungen:**
- RAF-Throttling reduziert unnötige State-Updates
- `passive: true` für bessere Scroll-Performance

---

### 3. CSS `transition-all` entfernt

**Datei:** `src/components/Navbar.tsx`

**Problem:**
```tsx
// VORHER
className={`... transition-all duration-300 ${scrolled ? 'glass-strong' : ''}`}
```

`transition-all` animiert **alle** CSS-Properties, einschließlich teurer Effekte wie `backdrop-blur`.

**Lösung:**
```tsx
// NACHHER
className={`... transition-[padding,background-color,box-shadow,border-color] duration-300 ...`}
```

Nur die tatsächlich benötigten Properties werden animiert.

---

### 4. Konfliktende CSS-Transition entfernt

**Datei:** `src/components/ui/Background.tsx`

**Problem:**
```tsx
// VORHER
<div style={{ transition: 'transform 0.1s ease-out' }}>
```

Die 100ms CSS-Transition kollidierte mit den RAF-basierten Updates (16ms), was zu "janky" Animationen führte.

**Lösung:** Inline-Transition komplett entfernt. RAF sorgt bereits für smooth scrolling.

---

### 5. Backdrop-Blur reduziert

**Datei:** `src/index.css`

**Problem:** `backdrop-blur-xl` und `backdrop-blur-2xl` sind GPU-intensive Effekte.

**Lösung:**
```css
/* VORHER */
.glass { @apply backdrop-blur-xl; }
.glass-strong { @apply backdrop-blur-2xl; }

/* NACHHER */
.glass { @apply backdrop-blur-lg; }
.glass-strong { @apply backdrop-blur-xl; }
```

Die Reduktion um eine Stufe spart GPU-Leistung bei minimalem visuellen Unterschied.

---

### 6. Background Blur reduziert

**Datei:** `src/components/ui/Background.tsx`

Alle `blur-3xl` Effekte wurden zu `blur-2xl` reduziert:
- Mesh-Gradient Orbs (3 Elemente)
- ScrollGlow Element

---

### 7. `prefers-reduced-motion` Support

**Datei:** `src/index.css`

Für User mit Bewegungsempfindlichkeit werden alle Animationen deaktiviert:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  .animate-spin-slow,
  .animate-role-carousel,
  .gradient-text {
    animation: none !important;
  }

  .will-change-transform {
    will-change: auto;
  }
}
```

---

### 8. Shared Mobile Detection Hook

**Dateien:**
- `src/hooks/useIsMobile.ts` (neu)
- `src/components/ui/GlassCard.tsx` (aktualisiert)

**Problem:** Jede GlassCard-Instanz führte einen eigenen `useEffect` für Mobile-Detection aus.

**Lösung:** Neuer `useIsMobile()` Hook mit `useSyncExternalStore`:

```tsx
// useIsMobile.ts - Singleton-Pattern
let isMobileCache: boolean | null = null

function getIsMobile(): boolean {
  if (isMobileCache === null) {
    isMobileCache = window.matchMedia('(hover: none)').matches || 'ontouchstart' in window
  }
  return isMobileCache
}

export function useIsMobile(): boolean {
  return useSyncExternalStore(subscribe, getIsMobile, getServerSnapshot)
}
```

**Vorteile:**
- Mobile-Detection nur einmal ausgeführt (Singleton)
- Kein `useEffect` pro Komponente
- SSR-kompatibel
- Reagiert auf Media-Query-Änderungen

---

## Zusammenfassung der Änderungen

| Optimierung | Datei | Auswirkung |
|-------------|-------|------------|
| Layout Thrashing Fix | Background.tsx | Eliminiert synchrone Layout-Berechnungen |
| RAF Throttling | Background.tsx, Navbar.tsx | Limitiert Updates auf 60fps |
| `passive: true` | Background.tsx, Navbar.tsx | Ermöglicht Browser-Optimierungen |
| `transition-all` entfernt | Navbar.tsx | Verhindert Animation von backdrop-blur |
| Inline transition entfernt | Background.tsx | Verhindert RAF/CSS Konflikte |
| Backdrop-blur reduziert | index.css | Reduziert GPU-Last |
| Background blur reduziert | Background.tsx | Reduziert GPU-Last |
| Reduced motion Support | index.css | Barrierefreiheit + Performance |
| Shared mobile detection | useIsMobile.ts | Eliminiert redundante useEffects |

---

## Erwartete Verbesserungen

- **Scroll-Performance:** ~150ms → <16ms (ein Frame)
- **GPU-Last:** Reduziert durch geringere Blur-Werte
- **Barrierefreiheit:** Respektiert User-Präferenzen für reduzierte Bewegung
- **Code-Qualität:** Weniger redundante Hook-Aufrufe

---

## Testing

Um die Verbesserungen zu verifizieren:

1. **React Scan** verwenden und Scroll-Interaktion testen
2. **Chrome DevTools Performance Tab** für detaillierte Analyse
3. **Lighthouse** Performance-Score überprüfen
4. Mit `prefers-reduced-motion` im Browser testen (DevTools → Rendering → Emulate CSS media feature)
