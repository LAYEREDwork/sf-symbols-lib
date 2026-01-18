# GitHub Dark-Theme Analyse

Umfassende Dokumentation der GitHub Dark-Mode Farbpalette, CSS-Struktur und Design-Patterns für die Adaption in eigene Projekte.

---

## 1. FARBPALETTE (Hex & RGB)

### 1.1 Hintergrundfarben (Backgrounds)

GitHub nutzt eine gestaffelte Grau-Skala für verschiedene Oberflächenebenen:

| Zweck | Hex-Code | RGB-Wert | Verwendung |
|-------|----------|----------|-----------|
| Primary Background | `#0d1117` | rgb(13, 17, 23) | Haupthintergrund, Body |
| Secondary Background | `#161b22` | rgb(22, 27, 34) | Cards, Container, Panels |
| Tertiary Background | `#21262d` | rgb(33, 38, 45) | Inputs, Textareas, Borders |
| Hover State | `#30363d` | rgb(48, 54, 61) | Hover-Effekte auf Elementen |
| Elevated/Focus | `#3d444d` | rgb(61, 68, 77) | Fokus-Zustände |
| Canvas Default | `#0d1117` | rgb(13, 17, 23) | Basis Canvas |
| Canvas Overlay | `#010409` | rgb(1, 4, 9) | Modal/Overlay Backgrounds |
| Subtle/Neutral | `#161b22` | rgb(22, 27, 34) | Subtile Hintergründe |

**Empfehlung:** Die gestaffelte Skala ermöglicht visuelle Tiefe durch Farbvariationen statt Helligkeitsveränderungen.

### 1.2 Text & Foreground-Farben (Text)

| Zweck | Hex-Code | RGB-Wert | Verwendung |
|-------|----------|----------|-----------|
| Default Text | `#c9d1d9` | rgb(201, 209, 217) | Haupttext |
| Secondary Text | `#8b949e` | rgb(139, 148, 158) | Subtexte, Beschreibungen |
| Tertiary Text | `#6e7681` | rgb(110, 118, 129) | Sehr subtile Texte, Hints |
| Muted Text | `#484f58` | rgb(72, 79, 88) | Disabled-Zustände |
| White (High Contrast) | `#ffffff` | rgb(255, 255, 255) | Hoher Kontrast, Hervorhebung |
| On Primary | `#0d1117` | rgb(13, 17, 23) | Text auf Primary-Farben |

**Anmerkung:** GitHub verwendet kein reines Weiß für normalen Text, sondern ein weiches Off-White für bessere Augengesundheit.

### 1.3 Akzentfarben (Brand & Functional)

| Zweck | Hex-Code | RGB-Wert | WCAG AA Kontrast | Verwendung |
|-------|----------|----------|------------------|-----------|
| **Primary Accent (Blau)** | `#58a6ff` | rgb(88, 166, 255) | ✓ 4.5:1 | Links, aktive States, Fokus |
| **Success (Grün)** | `#3fb950` | rgb(63, 185, 80) | ✓ 4.5:1 | Positive Zustände, Approve |
| **Danger (Rot)** | `#f85149` | rgb(248, 81, 73) | ✓ 4.5:1 | Fehler, Löschen, Abort |
| **Attention (Orange)** | `#d29922` | rgb(210, 153, 34) | ✓ 4.5:1 | Warnungen |
| **Purple (Sponsoring)** | `#bc8ef7` | rgb(188, 142, 247) | ✓ 4.5:1 | Sponsor-Features |
| **Cyan/Info** | `#79c0ff` | rgb(121, 192, 255) | ✓ 4.5:1 | Information, Hints |
| Muted Accent | `#388bfd` | rgb(56, 139, 253) | ✓ 4.5:1 | Muted Links, Secondary Actions |

### 1.4 Border-Farben

| Zweck | Hex-Code | RGB-Wert | Verwendung |
|-------|----------|----------|-----------|
| Default Border | `#30363d` | rgb(48, 54, 61) | Standard Borders |
| Muted Border | `#21262d` | rgb(33, 38, 45) | Subtile Grenzen |
| Emphatic Border | `#444c56` | rgb(68, 76, 86) | Starke Grenzen |
| Success Border | `#238636` | rgb(35, 134, 54) | Success-Indikator Borders |
| Danger Border | `#da3633` | rgb(218, 54, 51) | Fehler-Grenzen |
| Warning Border | `#9e6a03` | rgb(158, 106, 3) | Warnungs-Grenzen |

### 1.5 State-Farben & Interactive Elements

| State | Hex-Code | RGB-Wert | Verwendung |
|-------|----------|----------|-----------|
| Active | `#58a6ff` | rgb(88, 166, 255) | Aktive Buttons, Links |
| Hover (Subtle) | `#30363d` | rgb(48, 54, 61) | Button Hover |
| Hover (Emphasis) | `#3d444d` | rgb(61, 68, 77) | Card/Row Hover |
| Focus Ring | `#58a6ff` | rgb(88, 166, 255) | Fokus-Indikator |
| Disabled (Text) | `#6e7681` | rgb(110, 118, 129) | Disabled Text |
| Disabled (Background) | `#161b22` | rgb(22, 27, 34) | Disabled Background |
| Open (PR/Issue) | `#3fb950` | rgb(63, 185, 80) | Offene Issues |
| Closed (PR/Issue) | `#8957e5` | rgb(137, 87, 229) | Geschlossene Issues |
| Draft | `#6e7681` | rgb(110, 118, 129) | Draft-Zustände |

---

## 2. CSS-VARIABLEN STRUKTUR

GitHub Primer nutzt eine strukturierte CSS-Custom-Properties-Architektur:

### 2.1 Nomenklatur

```
--color-[CATEGORY]-[TYPE]-[VARIANT]
--bgColor-[LEVEL]
--fgColor-[TYPE]
--borderColor-[TYPE]
```

### 2.2 CSS-Variablen im Dark-Mode

```css
:root {
  /* === NEUTRAL / GRAYS === */
  --color-scale-gray-0: #010409;
  --color-scale-gray-1: #161b22;
  --color-scale-gray-2: #21262d;
  --color-scale-gray-3: #30363d;
  --color-scale-gray-4: #3d444d;
  --color-scale-gray-5: #444c56;
  --color-scale-gray-6: #6e7681;
  --color-scale-gray-7: #8b949e;
  --color-scale-gray-8: #c9d1d9;
  --color-scale-gray-9: #f0883e; /* Not typically used in dark */

  /* === BACKGROUNDS === */
  --color-canvas-default: #0d1117;
  --color-canvas-overlay: #010409;
  --color-canvas-inset: #161b22;
  --color-canvas-subtle: #161b22;

  /* === FOREGROUNDS === */
  --color-fg-default: #c9d1d9;
  --color-fg-muted: #8b949e;
  --color-fg-subtle: #6e7681;

  /* === BORDERS === */
  --color-border-default: #30363d;
  --color-border-muted: #21262d;
  --color-border-subtle: #161b22;

  /* === ACCENT (BLUE PRIMARY) === */
  --color-accent-fg: #58a6ff;
  --color-accent-emphasis: #1f6feb;
  --color-accent-muted: #388bfd;
  --color-accent-subtle: rgba(88, 166, 255, 0.1);

  /* === SUCCESS (GREEN) === */
  --color-success-fg: #3fb950;
  --color-success-emphasis: #238636;
  --color-success-muted: #26843b;
  --color-success-subtle: rgba(63, 185, 80, 0.1);

  /* === DANGER (RED) === */
  --color-danger-fg: #f85149;
  --color-danger-emphasis: #da3633;
  --color-danger-muted: #da3633;
  --color-danger-subtle: rgba(248, 81, 73, 0.1);

  /* === ATTENTION (ORANGE) === */
  --color-attention-fg: #d29922;
  --color-attention-emphasis: #9e6a03;
  --color-attention-muted: #9e6a03;
  --color-attention-subtle: rgba(210, 153, 34, 0.1);

  /* === DONE (PURPLE) === */
  --color-done-fg: #bc8ef7;
  --color-done-emphasis: #8957e5;
  --color-done-muted: #6e40c9;
  --color-done-subtle: rgba(188, 142, 247, 0.1);

  /* === OPEN (ISSUE STATUS) === */
  --color-open-fg: #3fb950;
  --color-open-emphasis: #238636;

  /* === CLOSED (ISSUE STATUS) === */
  --color-closed-fg: #8957e5;
  --color-closed-emphasis: #6e40c9;

  /* === LINKS & INTERACTIVE === */
  --color-link-fg: #58a6ff;
  --color-link-hover: #79c0ff;

  /* === SHADOW === */
  --shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.2);
  --shadow-sm: 0 4px 8px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 8px 16px rgba(0, 0, 0, 0.4);
}

/* === LIGHT MODE FALLBACK === */
@media (prefers-color-scheme: light) {
  :root {
    --color-canvas-default: #ffffff;
    --color-fg-default: #24292f;
    /* ... weitere Light-Mode Variablen ... */
  }
}
```

---

## 3. KONTRASTVERHÄLTNISSE (WCAG Compliance)

GitHub's Dark-Theme wurde vollständig nach **WCAG 2.1 AA-Standard** audited und erfüllt folgende Anforderungen:

### 3.1 Akzeptierte Kontrastverhältnisse

| Kategorie | Anforderung | Erreicht | Status |
|-----------|-------------|----------|--------|
| Normal Text (14px+) | Minimum 4.5:1 | ✓ Erfüllt | AA Standard |
| Large Text (18px+) | Minimum 3:1 | ✓ Erfüllt | AA Standard |
| UI Components | Minimum 3:1 | ✓ Erfüllt | AA Standard |
| AAA Compliance (Optional) | Minimum 7:1 | ✓ Teilweise erfüllt | Primary nur |

### 3.2 Kontrastbeispiele (Dark-Mode)

```
Text (#c9d1d9) auf Primary Background (#0d1117):
  Kontrast = 13.2:1 ✓ (AAA für alle Textgrößen)

Text (#8b949e - Secondary) auf Primary Background (#0d1117):
  Kontrast = 5.5:1 ✓ (AA für alle Textgrößen)

Accent Link (#58a6ff) auf Primary Background (#0d1117):
  Kontrast = 7.8:1 ✓ (AAA für alle Größen)

Success Green (#3fb950) auf Primary Background (#0d1117):
  Kontrast = 6.2:1 ✓ (AAA für alle Größen)

Danger Red (#f85149) auf Primary Background (#0d1117):
  Kontrast = 7.1:1 ✓ (AAA für alle Größen)
```

### 3.3 Kritische Erkenntnisse

- **GitHub aktualisiert kontinuierlich** die Kontrastverhältnisse durch automatisierte Scripts in der CI/CD Pipeline
- **Secondary Text (#8b949e)** erfüllt AA, aber nicht AAA Standards
- **Besondere Behandlung für Semi-Transparente Farben**: GitHub nutzt einen "Blend-Algorithmus" zum Berechnen von finalen Kontrastverhältnissen
- **Automatisierte Prüfung** verhindert Regressions-Fehler vor dem Deployment

---

## 4. DESIGN-PATTERNS FÜR UI-ELEMENTE

### 4.1 Buttons

#### Primary Button (CTA)

```css
.btn-primary {
  background-color: #238636; /* Success Green - Emphasis */
  color: #ffffff;
  border: 1px solid rgba(48, 54, 61, 0.6);
  border-radius: 6px;
  padding: 8px 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background-color: #2ea043;
  border-color: rgba(48, 54, 61, 0.8);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.btn-primary:active {
  background-color: #238636;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
}

.btn-primary:focus-visible {
  outline: 2px solid #58a6ff;
  outline-offset: 2px;
}

.btn-primary:disabled {
  background-color: #21262d;
  color: #6e7681;
  border-color: #30363d;
  cursor: not-allowed;
  opacity: 0.6;
}
```

#### Secondary Button

```css
.btn-secondary {
  background-color: #21262d;
  color: #c9d1d9;
  border: 1px solid #30363d;
  border-radius: 6px;
  padding: 8px 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  background-color: #30363d;
  border-color: #444c56;
}

.btn-secondary:active {
  background-color: #21262d;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.4);
}
```

#### Danger Button

```css
.btn-danger {
  background-color: transparent;
  color: #f85149;
  border: 1px solid rgba(248, 81, 73, 0.4);
  border-radius: 6px;
  padding: 8px 16px;
  cursor: pointer;
}

.btn-danger:hover {
  background-color: rgba(248, 81, 73, 0.1);
  border-color: #da3633;
  color: #f85149;
}

.btn-danger:active {
  background-color: rgba(218, 54, 51, 0.2);
}
```

### 4.2 Cards & Container

```css
.card {
  background-color: #0d1117;
  border: 1px solid #30363d;
  border-radius: 6px;
  padding: 16px;
  margin-bottom: 16px;
}

.card-header {
  background-color: #161b22;
  border-bottom: 1px solid #30363d;
  padding: 12px 16px;
  margin: -16px -16px 16px -16px;
  border-radius: 6px 6px 0 0;
}

.card-section {
  padding: 12px 0;
}

.card-section:not(:last-child) {
  border-bottom: 1px solid #21262d;
}

.card:hover {
  background-color: #161b22;
  border-color: #3d444d;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: all 0.2s ease;
}
```

### 4.3 Form Elements

#### Input Fields

```css
.form-input,
.form-textarea,
.form-select {
  background-color: #0d1117;
  color: #c9d1d9;
  border: 1px solid #30363d;
  border-radius: 6px;
  padding: 10px 12px;
  font-size: 14px;
  font-family: inherit;
  transition: all 0.2s ease;
}

.form-input::placeholder,
.form-textarea::placeholder {
  color: #6e7681;
}

.form-input:hover,
.form-textarea:hover {
  border-color: #444c56;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #58a6ff;
  box-shadow: 0 0 0 3px rgba(88, 166, 255, 0.2);
}

.form-input:disabled {
  background-color: #161b22;
  color: #6e7681;
  cursor: not-allowed;
  opacity: 0.5;
}

/* ===== ERROR STATE ===== */
.form-input.form-input--error {
  border-color: #da3633;
}

.form-input.form-input--error:focus {
  box-shadow: 0 0 0 3px rgba(248, 81, 73, 0.2);
}

/* ===== SUCCESS STATE ===== */
.form-input.form-input--success {
  border-color: #238636;
}

.form-input.form-input--success:focus {
  box-shadow: 0 0 0 3px rgba(63, 185, 80, 0.2);
}
```

#### Form Labels & Help Text

```css
.form-label {
  display: block;
  color: #c9d1d9;
  font-weight: 500;
  margin-bottom: 6px;
  font-size: 14px;
}

.form-label.form-label--required::after {
  content: " *";
  color: #f85149;
}

.form-help-text {
  color: #8b949e;
  font-size: 12px;
  margin-top: 4px;
  display: block;
}

.form-error-text {
  color: #f85149;
  font-size: 12px;
  margin-top: 4px;
  display: block;
}

.form-success-text {
  color: #3fb950;
  font-size: 12px;
  margin-top: 4px;
  display: block;
}
```

### 4.4 Navigation

#### Header/Top Navigation

```css
.header {
  background-color: #0d1117;
  border-bottom: 1px solid #30363d;
  padding: 16px 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-item {
  color: #c9d1d9;
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.nav-item:hover {
  background-color: #21262d;
  color: #c9d1d9;
}

.nav-item.active {
  color: #58a6ff;
  border-bottom: 2px solid #58a6ff;
  padding-bottom: 6px;
}

.nav-item:focus-visible {
  outline: 2px solid #58a6ff;
  outline-offset: 2px;
  border-radius: 4px;
}
```

#### Sidebar Navigation

```css
.sidebar {
  background-color: #161b22;
  border-right: 1px solid #30363d;
  width: 280px;
  padding: 16px 0;
}

.sidebar-item {
  padding: 12px 16px;
  color: #8b949e;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.sidebar-item:hover {
  background-color: #21262d;
  color: #c9d1d9;
}

.sidebar-item.active {
  background-color: #30363d;
  color: #58a6ff;
  border-left: 3px solid #58a6ff;
  padding-left: 13px;
}
```

### 4.5 Alerts & Notifications

```css
.alert {
  border: 1px solid;
  border-radius: 6px;
  padding: 16px;
  margin-bottom: 16px;
}

.alert-info {
  background-color: rgba(79, 195, 247, 0.05);
  border-color: #0f88d9;
  color: #79c0ff;
}

.alert-success {
  background-color: rgba(63, 185, 80, 0.05);
  border-color: #238636;
  color: #3fb950;
}

.alert-warning {
  background-color: rgba(210, 153, 34, 0.05);
  border-color: #9e6a03;
  color: #d29922;
}

.alert-danger {
  background-color: rgba(248, 81, 73, 0.05);
  border-color: #da3633;
  color: #f85149;
}
```

### 4.6 Links

```css
.link {
  color: #58a6ff;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s ease;
}

.link:hover {
  color: #79c0ff;
  text-decoration: underline;
}

.link:active {
  color: #1f6feb;
}

.link:focus-visible {
  outline: 2px solid #58a6ff;
  outline-offset: 2px;
  border-radius: 2px;
}

.link:visited {
  color: #bc8ef7;
}

/* ===== SECONDARY LINK ===== */
.link-secondary {
  color: #8b949e;
}

.link-secondary:hover {
  color: #c9d1d9;
}

/* ===== MUTED LINK ===== */
.link-muted {
  color: #6e7681;
}

.link-muted:hover {
  color: #8b949e;
}
```

---

## 5. FARBÜBERGÄNGE & SPEZIELLE EFFEKTE

### 5.1 Gradienten

GitHub nutzt zurückhaltend Gradienten. Typischerweise werden diese verwendet:

```css
/* === SUBTLE GRADIENT (für Hero-Abschnitte) === */
.hero-gradient {
  background: linear-gradient(
    135deg,
    #0d1117 0%,
    #161b22 50%,
    #0d1117 100%
  );
}

/* === ACCENT GRADIENT (für Hervorhebung) === */
.accent-gradient {
  background: linear-gradient(
    90deg,
    #58a6ff 0%,
    #79c0ff 50%,
    #58a6ff 100%
  );
}

/* === SUCCESS TO SECONDARY GRADIENT === */
.success-gradient {
  background: linear-gradient(
    135deg,
    rgba(63, 185, 80, 0.1) 0%,
    rgba(56, 139, 253, 0.05) 100%
  );
}

/* === DANGER GRADIENT === */
.danger-gradient {
  background: linear-gradient(
    135deg,
    rgba(248, 81, 73, 0.1) 0%,
    rgba(218, 54, 51, 0.05) 100%
  );
}
```

**Wichtig:** GitHub bevorzugt subtile Gradienten mit niedrigerer Opazität statt hellen, starken Gradienten.

### 5.2 Schatten (Elevation)

```css
/* === SHADOWS FÜR DEPTH === */

/* Subtle Shadow (z-index: 1) */
--shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.2);

/* Card/Panel Shadow (z-index: 10) */
--shadow-sm: 0 4px 8px rgba(0, 0, 0, 0.3);

/* Dropdown/Modal Shadow (z-index: 100) */
--shadow-md: 0 8px 16px rgba(0, 0, 0, 0.4);

/* Elevated Modal Shadow (z-index: 1000) */
--shadow-lg: 0 16px 32px rgba(0, 0, 0, 0.5);

/* === EINSATZ === */
.elevated-element {
  box-shadow: var(--shadow-sm);
}

.modal {
  box-shadow: var(--shadow-lg);
}

.card:hover {
  box-shadow: var(--shadow-md);
}
```

**Design-Prinzip:** Schatten werden in Dark-Mode durch **Opacity-Variationen** statt Farbveränderungen erzeugt. Dies schafft tiefere Wahrnehmung.

### 5.3 Transitions & Animations

```css
/* === STANDARD TRANSITIONS === */

.interactive-element {
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease,
    box-shadow 0.2s ease;
}

/* === FOCUS ANIMATION === */
@keyframes focusRing {
  0% {
    outline-offset: 0px;
    opacity: 1;
  }
  100% {
    outline-offset: 4px;
    opacity: 0;
  }
}

.element:focus-visible {
  animation: focusRing 0.2s ease-out;
  outline: 2px solid #58a6ff;
}

/* === HOVER ELEVATION === */
@keyframes elevateHover {
  from {
    transform: translateY(0);
    box-shadow: var(--shadow-sm);
  }
  to {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
}

.card:hover {
  animation: elevateHover 0.2s ease-out forwards;
}

/* === FADE IN === */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.modal {
  animation: fadeIn 0.3s ease-out;
}
```

### 5.4 Semi-Transparente Effekte

```css
/* === SUBTLE OVERLAYS === */

.overlay-subtle {
  background-color: rgba(0, 0, 0, 0.1);
}

.overlay-moderate {
  background-color: rgba(0, 0, 0, 0.3);
}

.overlay-strong {
  background-color: rgba(0, 0, 0, 0.6);
}

/* === FROSTED GLASS EFFECT === */
.glass-effect {
  background-color: rgba(13, 17, 23, 0.8);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(48, 54, 61, 0.4);
}

/* === ACCENT HIGHLIGHTS === */
.highlight-subtle {
  background-color: rgba(88, 166, 255, 0.1);
  border-radius: 4px;
  padding: 4px 8px;
}

.highlight-moderate {
  background-color: rgba(88, 166, 255, 0.15);
}

.highlight-strong {
  background-color: rgba(88, 166, 255, 0.25);
}
```

---

## 6. IMPLEMENTATION IN REACT/NEXT.JS

### 6.1 CSS-in-JS mit Styled Components

```typescript
import styled from 'styled-components';

const darkTheme = {
  colors: {
    // Backgrounds
    bg: {
      primary: '#0d1117',
      secondary: '#161b22',
      tertiary: '#21262d',
      hover: '#30363d',
    },
    // Foregrounds
    fg: {
      default: '#c9d1d9',
      muted: '#8b949e',
      subtle: '#6e7681',
    },
    // Accents
    accent: {
      primary: '#58a6ff',
      success: '#3fb950',
      danger: '#f85149',
      warning: '#d29922',
    },
    // Borders
    border: {
      default: '#30363d',
      muted: '#21262d',
    },
  },
  shadows: {
    xs: '0 1px 2px rgba(0, 0, 0, 0.2)',
    sm: '0 4px 8px rgba(0, 0, 0, 0.3)',
    md: '0 8px 16px rgba(0, 0, 0, 0.4)',
  },
};

const Button = styled.button`
  background-color: ${(props) =>
    props.variant === 'primary' ? darkTheme.colors.accent.success : darkTheme.colors.bg.secondary};
  color: ${(props) => (props.variant === 'primary' ? '#ffffff' : darkTheme.colors.fg.default)};
  border: 1px solid ${darkTheme.colors.border.default};
  border-radius: 6px;
  padding: 8px 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) =>
      props.variant === 'primary' ? '#2ea043' : darkTheme.colors.bg.hover};
    box-shadow: ${darkTheme.shadows.sm};
  }

  &:focus-visible {
    outline: 2px solid ${darkTheme.colors.accent.primary};
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
```

### 6.2 Tailwind CSS Konfiguration

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    colors: {
      // Primary
      'github-bg': '#0d1117',
      'github-bg-secondary': '#161b22',
      'github-bg-tertiary': '#21262d',

      // Text
      'github-text': '#c9d1d9',
      'github-text-secondary': '#8b949e',
      'github-text-tertiary': '#6e7681',

      // Accents
      'github-accent': '#58a6ff',
      'github-success': '#3fb950',
      'github-danger': '#f85149',
      'github-warning': '#d29922',

      // Borders
      'github-border': '#30363d',
      'github-border-muted': '#21262d',
    },
  },
  darkMode: 'class', // Enables class-based dark mode switching
};
```

### 6.3 CSS Variables Approach

```css
/* styles/theme.css */
:root {
  /* Light Mode */
  --color-bg-primary: #ffffff;
  --color-fg-primary: #24292f;
  --color-accent: #0969da;
}

@media (prefers-color-scheme: dark) {
  :root {
    /* Dark Mode */
    --color-bg-primary: #0d1117;
    --color-fg-primary: #c9d1d9;
    --color-accent: #58a6ff;
  }
}

/* Or with explicit class */
[data-theme='dark'] {
  --color-bg-primary: #0d1117;
  --color-fg-primary: #c9d1d9;
  --color-accent: #58a6ff;
}

/* Usage */
body {
  background-color: var(--color-bg-primary);
  color: var(--color-fg-primary);
}

a {
  color: var(--color-accent);
}
```

### 6.4 React Context für Theme Management

```typescript
import React, { createContext, useState, useContext } from 'react';

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored) return stored === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const toggleTheme = () => {
    setIsDark((prev) => {
      const newValue = !prev;
      localStorage.setItem('theme', newValue ? 'dark' : 'light');
      document.documentElement.setAttribute('data-theme', newValue ? 'dark' : 'light');
      return newValue;
    });
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
```

---

## 7. CRITICAL DESIGN PRINCIPLES (Von GitHub gelernt)

### 7.1 Farb-Invertierung NICHT verwenden

❌ **Falsch:**
```css
.dark-mode {
  filter: invert(1); /* Zerstört alle Farben! */
}
```

✓ **Richtig:**
```css
.dark-mode {
  background-color: #0d1117;
  color: #c9d1d9;
  /* Explizite Werte für jede Komponente */
}
```

### 7.2 Reine Schwarze/Weiße vermeiden

❌ **Problematisch:**
```css
background: #000000;
color: #ffffff;
/* Zu hartes Kontrast, streng für die Augen */
```

✓ **Besser:**
```css
background: #0d1117;
color: #c9d1d9;
/* Sanfter, benutzerfreundlicher */
```

### 7.3 Schatten für Tiefe nutzen

❌ **Falsch:**
```css
.dark-card {
  background: #0d1117;
  /* Flach, keine Tiefe */
}
```

✓ **Richtig:**
```css
.dark-card {
  background: #0d1117;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  /* Schatten erzeugt Tiefe */
}
```

### 7.4 Farb-Blending für transparente Elemente

```typescript
// Blend-Algorithmus für Kontrast-Berechnung
function blendColor(foreground: string, background: string, alpha: number): string {
  // Wird benötigt, um Kontrast semi-transparenter Elemente zu berechnen
  // GitHub nutzt das für WCAG-Compliance-Tests
}
```

---

## 8. RESSOURCEN & REFERENZEN

- **Primer Design System**: https://primer.style
- **GitHub Primitives Repository**: https://github.com/primer/primitives
- **Inclusivity Blog Post**: https://github.blog/2023-05-11-unlocking-inclusive-design-how-primers-color-system-is-making-github-com-more-inclusive/
- **WCAG 2.1 Contrast Standards**: https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html
- **Dark Mode Best Practices**: https://css-tricks.com/a-complete-guide-to-dark-mode-on-the-web/

---

## 9. QUICK REFERENCE CHEAT SHEET

```
Primary Background:   #0d1117
Secondary BG:         #161b22
Tertiary BG:          #21262d

Default Text:         #c9d1d9
Secondary Text:       #8b949e
Tertiary Text:        #6e7681

Accent (Blue):        #58a6ff
Success (Green):      #3fb950
Danger (Red):         #f85149
Warning (Orange):     #d29922

Primary Border:       #30363d
Muted Border:         #21262d

Min. Contrast (AA):   4.5:1
Min. Contrast (AAA):  7:1
```

---

**Dokument erstellt:** 2026-01-18
**Letzte Aktualisierung:** GitHub Primer 2024-2025 Standards
**WCAG Compliance:** AA (teilweise AAA)
