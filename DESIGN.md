# DESAIN.SISTEM — Website SAPALA 67

**Versi:** 1.0
**Tanggal:** Juni 2026
**Proyek:** Website Resmi SAPALA 67 (Santri Pecinta Alam)
**Stack:** SvelteKit 5 · TailwindCSS 3 · TypeScript · Static Adapter

---

## Daftar Isi

1. [Identitas Proyek](#1-identitas-proyek)
2. [Arsitektur Teknologi](#2-arsitektur-teknologi)
3. [Sistem Warna](#3-sistem-warna)
4. [Tipografi](#4-tipografi)
5. [Struktur File](#5-struktur-file)
6. [Layout & Grid](#6-layout--grid)
7. [Komponen UI](#7-komponen-ui)
8. [Halaman & Section](#8-halaman--section)
9. [Animasi & Transisi](#9-animasi--transisi)
10. [Responsivitas](#10-responsivitas)
11. [Data Layer](#11-data-layer)
12. [Utility Functions](#12-utility-functions)
13. [SEO & Metadata](#13-seo--metadata)
14. [Aksesibilitas](#14-aksesibilitas)
15. [Performa](#15-performa)
16. [Deployment](#16-deployment)
17. [Catatan Pengembangan](#17-catatan-pengembangan)

---

## 1. Identitas Proyek

### Organisasi

| Properti | Nilai |
|----------|-------|
| **Nama** | SAPALA 67 |
| **Nama Lengkap** | Santri Pecinta Alam 67 |
| **Moto** | MENGENALIMU UNTUK MENGENALINYA |
| **Slogan** | Mengenalmu untuk Mengenali-Nya |
| **Tagline** | Melangkah Menjelajah, Berkarya untuk Alam. |
| **Didirikan** | 12 November 2004 |
| **Pendiri** | Ust. Budi Setiadi |
| **Lokasi Pendirian** | Puncak Gunung Ciremai |
| **Markas** | Pesantren Persatuan Islam 67 Benda, Tasikmalaya |
| **Alamat** | Jln. Benda-Nagarasari No. 15 Cipedes, Tasikmalaya 46132 |
| **Anggota** | 57 anggota resmi |
| **Angkatan** | 6 angkatan |
| **Keanggotaan** | Seumur hidup |

### Filosofi Logo

Lima elemen simbolis yang menjadi identitas visual dan nilai inti organisasi:

| Elemen | Ikon Lucide | Makna |
|--------|-------------|-------|
| **Gunung** | `Mountain` | Tantangan, cita-cita luhur, ketabahan, kesabaran, keberanian |
| **Bintang Kompas** | `Compass` | Arah, petualangan, penunjuk jalan yang benar |
| **Tali** | `Cable` | Persaudaraan, kekuatan ikatan, kesatuan |
| **Jejak Kaki** | `Footprints` | Eksplorasi, perjalanan, jejak pengabdian untuk alam |
| **Pena & Tinta** | `PenTool` | Intelektualitas, dokumentasi, pelestarian sejarah |

Moto visual: *"Jejak yang Menginspirasi, Langkah yang Mengabdi untuk Alam."*

### Maksud & Tujuan

1. Dakwah bi lisanil hal
2. Mendidik anggota untuk berpikir dan bertindak lebih dewasa dalam berorganisasi
3. Mengembangkan minat, bakat, dan kemampuan anggota secara maksimal
4. Mendidik dan membina anggota agar kreatif

### Bentuk Kegiatan

1. Berpartisipasi aktif dalam pelestarian lingkungan hidup dan kebersihan
2. Observasi desa binaan
3. Silaturahim dengan masyarakat dan alam
4. Tadabur alam
5. Diskusi interaktif dalam usaha pemberdayaan masyarakat

---

## 2. Arsitektur Teknologi

### Stack

```
┌──────────────────────────────────────────────┐
│                 SAPALA 67                     │
│                                              │
│  Runtime      Bun / Node.js                  │
│  Frontend     SvelteKit 5 + TypeScript       │
│  Styling      TailwindCSS 3                  │
│  Icons        Lucide Svelte                  │
│  Fonts        Fontsource Variable            │
│  Adapter      Static (HTML export)           │
│  Hosting      Cloudflare Pages (target)      │
│  Storage      Cloudflare R2 (target)         │
│  Database     Cloudflare D1 (future)         │
└──────────────────────────────────────────────┘
```

### Dependencies

| Paket | Versi | Kegunaan |
|-------|-------|----------|
| `svelte` | ^5.0.0 | Framework UI (runes mode) |
| `@sveltejs/kit` | ^2.5.0 | Meta-framework |
| `@sveltejs/adapter-static` | ^3.0.0 | Static site generation |
| `tailwindcss` | ^3.4.13 | Utility-first CSS |
| `lucide-svelte` | ^0.460.0 | Icon set |
| `@fontsource-variable/cinzel` | ^5.1.0 | Heading font |
| `@fontsource-variable/inter` | ^5.1.0 | Body font |
| `@fontsource-variable/cormorant-garamond` | ^5.1.0 | Serif/quote font |
| `tailwind-merge` | ^2.5.0 | Class merging utility |
| `clsx` | ^2.1.1 | Conditional classes |
| `embla-carousel-svelte` | ^8.3.0 | Carousel (installed, not yet used) |

### Dev Dependencies

| Paket | Kegunaan |
|-------|----------|
| `typescript` | Type checking |
| `svelte-check` | Svelte type checking |
| `eslint` + plugin | Linting |
| `prettier` + plugins | Formatting |
| `vite` | Build tool |
| `postcss` + `autoprefixer` | CSS processing |

### Script Commands

```
npm run dev          → vite dev (localhost:3000)
npm run build        → vite build → static HTML output
npm run preview      → Preview production build
npm run check        → svelte-kit sync + svelte-check
npm run check:watch  → svelte-check --watch
npm run format       → prettier --write
npm run lint         → prettier --check + eslint
```

### Konfigurasi Svelte

```js
// svelte.config.js
adapter: adapter({ fallback: '404.html' })
paths.base: ''
```

### Konfigurasi Vite

```js
// vite.config.js
server.port: 3000
server.open: true
```

---

## 3. Sistem Warna

Warna diekstraksi langsung dari file `logo.png` menggunakan analisis pixel distribution (Pillow). Distribusi warna dominan:

| Warna | Persentase | Sumber di Logo |
|-------|-----------|----------------|
| Sky Blue (#76C5F0) | 51.9% | Background / langit |
| Earth Orange (#EE9B6B) | 11.0% | Tanah / elemen bumi |
| Pure White (#FFFFFF) | 6.8% | Ruang negatif / teks |
| Deep Blue (#007CC2) | 4.8% | Biru tengah / air |
| Earth Brown (#A36B49) | 0.3% | Coklat gelap |
| Red (#DA251C) | 0.8% | Merah nasionalisme |

### Palet Token (tailwind.config.js)

| Token | Nama | Hex | RGB | CSS Variable |
|-------|------|-----|-----|-------------|
| `sapala-sky` | Sky Blue | `#76C5F0` | 118, 197, 240 | `--color-sky` |
| `sapala-primary` | Blue | `#0B78B8` | 11, 120, 184 | `--color-primary` |
| `sapala-deep` | Deep Blue | `#007CC2` | 0, 124, 194 | `--color-deep` |
| `sapala-dark` | Dark Blue | `#1E4878` | 30, 72, 120 | `--color-dark` |
| `sapala-earth` | Earth Orange | `#EE9B6A` | 238, 155, 106 | `--color-earth` |
| `sapala-brown` | Earth Brown | `#A36B49` | 163, 107, 73 | `--color-brown` |
| `sapala-red` | Red | `#DA251C` | 218, 37, 28 | `--color-red` |
| `sapala-white` | White | `#F7F7F7` | 247, 247, 247 | `--color-white` |
| `sapala-charcoal` | Charcoal | `#222222` | 34, 34, 34 | `--color-charcoal` |
| `sapala-darkgray` | Dark Gray | `#2E2927` | 46, 41, 39 | — |

### Pola Penggunaan Warna

```
BACKGROUND
  Utama:              bg-sapala-charcoal (#222222)
  Section alternate:  bg-sapala-gray-dark/30-50 (opacity)
  Section gradient:   bg-gradient-to-b from-sapala-charcoal via-sapala-dark/50 to-sapala-charcoal

SURFACE / CARD
  Glass:              bg-white/5 backdrop-blur-md border border-white/10
  Card hover:         bg-white/10 border-sapala-sky/30
  Card overlay:       bg-sapala-charcoal/60

TEKS
  Heading:            text-white
  Body:               text-white/70
  Muted:              text-white/50
  Subtle:             text-white/30-40
  Link default:       text-white/60
  Link hover:         text-sapala-sky

GRADIENT
  Utama:              from-sapala-sky via-sapala-primary to-sapala-deep
  Text gradient:      bg-clip-text text-transparent + gradient
  Sekunder:           from-sapala-sky to-sapala-primary
  Aksen:              from-sapala-earth to-sapala-brown
  Button:             from-sapala-primary to-sapala-deep
  Timeline line:      from-sapala-sky via-sapala-primary to-sapala-earth

BORDER
  Default:            border-white/10
  Hover (sky):        border-sapala-sky/30
  Hover (earth):      border-sapala-earth/30
  Active link:        bg-sapala-sky/15 text-sapala-sky

DIVIDER
  Line:               h-px bg-gradient-to-r from-transparent via-sapala-sky/20 to-transparent
  Mountain:           clip-path polygon divider
```

### Warna Kategori Badge

```
Diklat:      bg-sapala-sky/15    border-sapala-sky/30    text-sapala-sky
Ekspedisi:   bg-sapala-primary/15 border-sapala-primary/30 text-sapala-primary
Pengabdian:  bg-sapala-earth/15  border-sapala-earth/30  text-sapala-earth
Latihan:     bg-green-500/15     border-green-500/30     text-green-400
Konservasi:  bg-green-600/15     border-green-600/30     text-green-500
```

### Warna Media Sosial Hover

```
Instagram  → pink-400
YouTube    → red-400 / sapala-red
WhatsApp   → green-400 / green-500
```

---

## 4. Tipografi

### Font Families (tailwind.config.js)

| Token | Font | Fallback Stack | Kegunaan |
|-------|------|----------------|----------|
| `font-heading` | Cinzel Variable | Cinzel, serif | Judul, heading, logo text, nav brand |
| `font-body` | Inter Variable | Inter, sans-serif | Body text, UI, form, badge |
| `font-serif` | Cormorant Garamond Variable | Cormorant Garamond, serif | Quote, moto, teks italic bernada klasik |

### Heading Scale

```
.section-heading:
  Font:     Cinzel Variable (font-heading), weight 700
  Tracking: wide
  Mobile:   text-3xl (30px)
  md 768:   text-4xl (36px)
  lg 1024:  text-5xl (48px)
  Special:  text-shadow-glow untuk hero (text-shadow: 0 0 30px rgba(118,197,240,0.5))

Hero Title:
  Mobile:   text-5xl (48px)
  sm 640:   text-6xl (60px)
  md 768:   text-7xl (72px)
  lg 1024:  text-8xl (96px)

Section Subheading:
  Font:     Inter Variable, weight 400
  Color:    text-sapala-sky/80
  Max-w:    max-w-2xl mx-auto
  Mobile:   text-base (16px)
  md 768:   text-lg (18px)
```

### Body Scale

```
Standard:     text-sm (14px) — badge, label, meta
              text-base (16px) — body paragraph
Lead:         text-lg-2xl (18-20px) — intro paragraph
Quote:        text-xl-3xl (20-30px) serif italic
Number:       text-3xl-4xl (30-36px) counter
```

### Tracking & Spacing

```
tracking-widest:    0.3em  → "SANTIR PECINTA ALAM" hero subtitle
tracking-[0.3em]:   0.3em  → Hero sublabel
tracking-[0.2em]:   0.2em  → Navbar "SANTRI PECINTA ALAM"
tracking-[0.15em]:  0.15em → Footer subtitle
tracking-wide:      0.02em → .section-heading
leading-tight:      1.25  → Logo text
leading-relaxed:    1.625 → Body paragraph default
```

### Text Styles

```
.gradient-text:
  bg-gradient-to-r from-sapala-sky via-sapala-primary to-sapala-deep
  bg-clip-text text-transparent

.text-shadow-glow:
  text-shadow: 0 0 30px rgba(118, 197, 240, 0.5)
  → Digunakan pada hero title "SAPALA"

Selection:
  bg-sapala-sky text-sapala-charcoal
```

### Font Loading

Variable fonts dimuat via Fontsource NPM packages, di-import di `app.css`:

```css
@import '@fontsource-variable/cinzel';
@import '@fontsource-variable/inter';
@import '@fontsource-variable/cormorant-garamond';
```

Tidak ada request eksternal pada runtime — semua font di-bundle.

---

## 5. Struktur File

```
SAPALA 67/
├── DESAIN.md                        ← Dokumen ini
├── package.json                     → Dependencies & scripts
├── svelte.config.js                 → SvelteKit + adapter config
├── vite.config.js                   → Vite server + plugins
├── tailwind.config.js               → Theme, colors, fonts, animations
├── tsconfig.json                    → TypeScript config
├── postcss.config.js                → PostCSS + Tailwind + Autoprefixer
├── eslint.config.js                 → ESLint flat config
├── prettier.config.js               → Prettier + svelte + tailwind plugins
├── .gitignore
│
├── src/
│   ├── app.html                         → HTML shell
│   ├── app.d.ts                        → TypeScript declarations
│   │
│   ├── routes/
│   │   ├── +layout.svelte               → Root layout (imports global CSS)
│   │   └── +page.svelte                 → Single-page app (all sections)
│   │
│   ├── lib/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.svelte        → Sticky navigation bar
│   │   │   │   └── Footer.svelte        → 4-column footer
│   │   │   └── sections/
│   │   │       ├── Hero.svelte          → Full-screen hero
│   │   │       ├── About.svelte         → Tentang + stats + visi misi
│   │   │       ├── LogoPhilosophy.svelte → Interactive logo philosophy
│   │   │       ├── CoreValues.svelte    → 5 pilar kartu
│   │   │       ├── Activities.svelte    → Filterable activity grid
│   │   │       ├── Gallery.svelte       → Masonry gallery + lightbox
│   │   │       ├── Articles.svelte      → Featured article + grid
│   │   │       ├── Timeline.svelte      → Organization history
│   │   │       ├── OrgStructure.svelte  → Struktur kepengurusan
│   │   │       └── Contact.svelte       → Contact form + info
│   │   │
│   │   ├── data/
│   │   │   └── site.ts                  → All site content (single source of truth)
│   │   │
│   │   └── utils/
│   │       ├── scroll.ts                → useScrollReveal, scrollY store
│   │       ├── counter.ts               → animateCounter function
│   │       └── cn.ts                    → Class merging utility (clsx + twMerge)
│   │
│   └── styles/
│       └── app.css                      → Tailwind entry + custom components/utilities
│
└── static/
    ├── logo.png                         → Original SAPALA 67 logo
    ├── favicon.png                      → 32×32 favicon
    ├── favicon-16x16.png               → 16×16 favicon
    ├── favicon-48x48.png               → 48×48 favicon
    ├── apple-touch-icon.png             → 180×180 iOS icon
    └── images/
        ├── activities/                  → Activity image placeholders
        ├── articles/                    → Article image placeholders
        └── gallery/                     → Gallery image placeholders
```

### Pola Penamaan

```
Komponen: PascalCase → Navbar.svelte, LogoPhilosophy.svelte
Data/Util: camelCase → site.ts, scroll.ts, counter.ts
Route: +page.svelte, +layout.svelte (SvelteKit convention)
CSS class: Tailwind utilities + .@layer components
```

### Alur Data

```
site.ts (single source of truth)
    ↓ import
Section Components (+page.svelte)
    ↓ render
User View

Semua teks konten tersentralisasi di site.ts.
Tidak ada hardcoded text di dalam Svelte components
kecuali text yang bersifat UI/struktur (label form, dll).
```

---

## 6. Layout & Grid

### Container System

```
Max Width:    max-w-7xl (1280px / 80rem)
Padding:      px-4 (16px) mobile
              px-6 (24px) sm (640px)
              px-8 (32px) lg (1024px)
```

### Section Vertical Spacing

```
Standard:   py-24 md:py-32 (mobile 96px, desktop 128px)
Dengan decorative overlays dan blur backgrounds antar section
```

### Grid Patterns per Section

```
Section              Mobile      Tablet      Desktop
─────────────────────────────────────────────────────
Hero                 1 col       1 col       1 col (centered)
About                1 col       1 col       2 col (text | stats)
Philosophy           1 col       2 col       5 col
Core Values          1 col       2 col       5 col
Activities           1 col       2 col       4 col
Gallery (masonry)    2 col       3 col       4 col (auto-rows)
Articles (grid)      1 col       2 col       3 col
Timeline             1 col       1 col       2 col alternating
Org Structure        1 col       1 col       1 col
Contact              1 col       1 col       2 col
Footer               1 col       2 col       4 col
```

### Masonry Span Pattern (Gallery)

```
Item 1:  col-span-2 row-span-2   (large, 2×2)
Item 2:  col-span-1 row-span-1   (small, 1×1)
Item 3:  col-span-1 row-span-1   (small, 1×1)
Item 4:  col-span-1 row-span-2   (tall, 1×2)
Item 5:  col-span-1 row-span-1   (small, 1×1)
Item 6:  col-span-2 row-span-1   (wide, 2×1)
Item 7+: col-span-1 row-span-1   (small, 1×1)

Row height: auto-rows-[180px] mobile
            auto-rows-[200px] md (desktop)
```

### Section Dividers

```css
/* Mountain silhouette divider */
.mountain-divider {
  clip-path: polygon(
    0 100%, 20% 60%, 40% 80%, 60% 40%, 80% 70%, 100% 30%, 100% 100%
  );
  height: h-24 md:h-32
}

/* Gradient line divider */
height: h-px
bg-gradient-to-r from-transparent via-sapala-sky/20 to-transparent
```

---

## 7. Komponen UI

### 7.1 Glass Card (`.glass-card`)

```
Class:        .glass-card
Effect:       bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl
Hover:        border-sapala-sky/30 atau border-sapala-earth/30
Shadow:       shadow-xl shadow-sapala-sky/10 (saat active/hover di philosophy)
Transition:   transition-all duration-500

Digunakan di: About cards, Philosophy items, Value cards, Activities,
              Articles, Gallery hover overlay, Contact info cards,
              Timeline cards, Org structure roles
```

### 7.2 Buttons

#### Primary Button (`.btn-primary`)

```
Display:     inline-flex items-center gap-2
Background:  bg-gradient-to-r from-sapala-primary to-sapala-deep
Shape:       rounded-full
Padding:     px-6 py-3 (standard) / px-8 py-4 (hero CTA)
Typography:  text-white font-semibold
Border:      none
Hover:       hover:shadow-lg hover:shadow-sapala-sky/30 hover:scale-105
Active:      active:scale-95
Transition:  transition-all duration-300
```

#### Outline Button (`.btn-outline`)

```
Display:     inline-flex items-center gap-2
Border:      border-2 border-sapala-sky
Text:        text-sapala-sky font-semibold
Shape:       rounded-full
Padding:     px-6 py-3 (standard) / px-8 py-4 (hero CTA)
Hover:       hover:bg-sapala-sky hover:text-sapala-charcoal
             hover:shadow-lg hover:shadow-sapala-sky/30
Transition:  transition-all duration-300
```

### 7.3 Section Header Pattern

Setiap section mengikuti pola yang konsisten:

```
┌──────────────────────────────────────────────────┐
│  [BADGE]                                         │ ← span, px-4 py-1.5, rounded-full
│                                                  │
│  SECTION TITLE (.section-heading)               │ ← font-heading, gradient-text
│  text-3xl md:text-4xl lg:text-5xl               │
│                                                  │
│  Subtitle (.section-subheading)                  │ ← text-sapala-sky/80, max-w-2xl
└──────────────────────────────────────────────────┘
```

### 7.4 Badge Pola

```
Base:     inline-block px-4 py-1.5 rounded-full border text-sm font-medium

Variants by section:
  Sky:    bg-sapala-sky/10    border-sapala-sky/20    text-sapala-sky
          → Hero, Tentang, Filosofi badge, Contact

  Earth:  bg-sapala-earth/10  border-sapala-earth/20  text-sapala-earth
          → Timeline badge, Articles badge

  Blue:   bg-sapala-primary/10 border-sapala-primary/20 text-sapala-primary
          → Activities badge, Org Structure badge
```

### 7.5 Stats Counter Card

```
Container:  grid grid-cols-3 gap-4
Card:       glass-card p-5 md:p-6 text-center
Hover:      border-sapala-sky/30 atau border-sapala-earth/30
Number:     font-heading text-3xl md:text-4xl font-bold
            gradient-text atau text-sapala-earth
Label:      text-white/50 text-xs md:text-sm

Animation:
  Trigger:  IntersectionObserver threshold 0.3
  Easing:   easeOutCubic: 1 - Math.pow(1 - progress, 3)
  Duration: 2000ms
  Counter:  requestAnimationFrame loop
```

### 7.6 Contact Form Input

```
Style:
  bg-white/5 border border-white/10 rounded-xl
  text-white placeholder-white/30
  px-4 py-3 text-sm w-full
  resize-none (textarea)

Focus:
  outline-none
  border-sapala-sky/50
  ring-1 ring-sapala-sky/30

Success State:
  bg-green-500/10 border-green-500/30 rounded-xl p-6 text-center
  text-green-400 font-medium
  Auto-clear setelah 3000ms
```

### 7.7 Gradient Border (`.gradient-border`)

```
Pseudo-element ::before:
  absolute inset-0 rounded-2xl p-[1px]
  background: linear-gradient(135deg, #76c5f0, #0b78b8, #1e4878)
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)
  mask-composite: exclude
```

### 7.8 Scrollbar Styling

```
Width:            8px
Track:            bg-sapala-dark
Thumb:            bg-sapala-sky/50 rounded-full
Thumb hover:      bg-sapala-sky
```

---

## 8. Halaman & Section

Arsitektur single-page — semua section dalam satu halaman (`/+page.svelte`) dengan scroll-based navigation.

### 8.1 Loading Screen

```
Trigger:       componentDidMount, 1500ms delay
Position:      Fixed inset, z-[200], bg-sapala-charcoal
Content:
  - Logo image (w-20 h-20, rounded-full, pulse-glow)
  - "SAPALA 67" heading (gradient-text)
  - "Memuat..." (text-sapala-sky/50, animate-pulse)
  - Progress bar: w-32 h-0.5 bg-white/10, filling keyframe 0→100%

Keyframe:      loadProgress 1.5s ease-in-out forwards
Cleanup:       isLoading = false → component unmount
```

### 8.2 Navbar (Layout Component)

```
Position:      Fixed top-0 left-0 right-0, z-50
Default:       bg-transparent, py-5
Scrolled:      bg-sapala-charcoal/95 backdrop-blur-md shadow-lg shadow-black/30, py-3
Deteksi:       window.scrollY > 50
Transition:    transition-all duration-500

Logo:
  - Mountain icon (w-10-12 h-10-12, rounded-full, gradient sky→primary)
  - "SAPALA" (font-heading, text-lg-xl, gradient-text)
  - "SANTRI PECINTA ALAM" (text-[10px]-xs, sky/70, tracking 0.2em)

Desktop (lg+):
  - 8 pill-style links, rounded-full
  - Active: bg-sapala-sky/15 text-sapala-sky
  - Inactive: text-white/70 hover:text-sapala-sky hover:bg-white/5

Mobile (<lg):
  - Hamburger button (Menu/X icon)
  - Full-screen overlay: fixed inset top-[60px], bg-charcoal/98 backdrop-blur-lg
  - Links: vertical stack, px-4 py-3, text-lg
  - Link animation: slide from top, staggered delay i*50ms

Active Section Detection:
  - Map navLinks → section IDs
  - Loop bottom-up, check rect.top <= 100
  - Update activeSection state
```

### 8.3 Hero Section (`#beranda`)

```
Height:        min-h-screen, flex centered, overflow-hidden

Background Layers:
  1. Gradient: sapala-dark → sapala-charcoal → sapala-charcoal
  2. Mountain SVG silhouette: bottom, opacity 20%, viewBox 1440×400
  3. Dot pattern: radial-gradient circle 1px, size 50px, opacity 30%
  4. Radial glow: 800px×800px, bg-sapala-sky/5, blur-3xl

Content (centered, max-w-5xl, fade-in staged):
  1. Logo image        w-24-32 h-24-32, rounded-full, animate-float
  2. "SAPALA 67"       gradient + muted, text-5xl→8xl, text-shadow-glow
  3. "SANTIR PECINTA ALAM"  uppercase, tracking 0.3em, sky/60
  4. Moto              serif italic, xl→3xl, white/80
  5. Tagline           body text, base-lg, white/50
  6. CTA buttons       btn-primary + btn-outline, gap-4

Scroll Indicator:
  - Bottom center, animate-bounce-slow
  - "JELAJAHI" + ChevronDown
  - opacity-40 → hover sapala-sky

Transition Delays:
  fade 1000ms → fly+200ms → fly+400ms → fly+600ms → fly+800ms → fly+1000ms → fade+1500ms
```

### 8.4 About Section (`#tentang`)

```
Layout:        lg:grid-cols-2 gap-12 lg:gap-16 items-start
Background:    Dot pattern overlay (opacity 5%, size 30px)

LEFT COLUMN:
  - Moto quote (font-serif italic 2xl-3xl, sapala-sky/80)
  - "Sekilas Tentang" (User icon + heading + aboutIntro text)
  - "Sejarah Berdiri" (Calendar icon + aboutStory text + founder footnote)
  - "Keanggotaan" (Users icon + aboutMembership text)
  - Visi card (glass-card, heading + text)
  - Misi card (glass-card, 5 numbered items with sky circle badges)

RIGHT COLUMN:
  - Stats grid (3 cols): 57 Anggota | 22 Tahun | 6 Angkatan
  - Maksud & Tujuan (Target icon, 4 numbered items with sky badges)
  - Bentuk Kegiatan (Handshake icon, 5 numbered items with earth badges)
  - Prestasi (trophy, 3 achievements with colored left-border)
  - Fasilitas (badge tags: Wall Climbing, Basecamp, Area Latihan, Peralatan Lengkap)

Counter:       57 anggota | yearsSinceFounded tahun | 6 angkatan
               Animated easeOutCubic, 2000ms, IO threshold 0.3
```

### 8.5 Logo Philosophy Section (`#filosofi`)

```
Layout:        lg:grid-cols-5 gap-6
Background:    charcoal → dark/50 → charcoal gradient
Decorative:    Two blur-3xl circles (sky top-left + earth bottom-right)

5 Cards (icon → heading → description):
  1. Gunung       → icon gradient sky→primary
  2. Bintang      → icon gradient earth→brown
  3. Tali         → icon gradient primary→dark
  4. Jejak Kaki   → icon gradient sky→deep
  5. Pena & Tinta → icon gradient earth→sky

Card Interaction:
  Default:     glass-card p-6, description hidden (max-h-0 opacity-0)
  Hover/focus: scale-105, border-sapala-sky/40, bg-white/10, shadow-xl
               Icon: scale-110 rotate-6
               Title: text-sapala-sky
               Description: max-h-48, opacity-100
  Mobile:      Description always visible

Motto Footer:
  "Jejak yang Menginspirasi, Langkah yang Mengabdi untuk Alam"
  glass-card, serif italic xl-2xl, sapala-sky/80
```

### 8.6 Core Values Section

```
Layout:        lg:grid-cols-5 gap-6
Cards:         glass-card p-6 text-center

5 Values:
  1. Pendidikan    → icon book-open, gradient sky→primary
  2. Ekspedisi     → icon compass, gradient primary→dark
  3. Konservasi    → icon tree-pine, gradient green-400→600
  4. Pengabdian    → icon heart-handshake, gradient earth→brown
  5. Persaudaraan  → icon users, gradient deep→sky

Hover:         bg-white/10, border-sapala-sky/30, shadow-xl, -translate-y-2
Transition:    duration-500
```

### 8.7 Activities Section (`#kegiatan`)

```
Layout:        Filter row + lg:grid-cols-4 gap-6
Background:    charcoal → dark/30 → charcoal gradient

Filter Tabs:
  Semua | Diklat | Ekspedisi | Pengabdian | Latihan | Konservasi
  Active:   bg-sapala-sky text-sapala-charcoal shadow-lg
  Inactive: bg-white/5 border-white/10 text-white/60

Activity Cards (8):
  - Top gradient bar (h-3, gradient sky→primary→dark)
  - Icon (gradient box) + category badge
  - Title (hover: text-sapala-sky)
  - Description
  - "Selengkapnya →" (visible on hover only)

Icon Mapping:
  Pendidikan Dasar → Users
  Pendakian Gunung → Mountain
  Arung Jeram      → Waves
  Bakti Sosial     → Heart
  Wall Climbing    → ArrowUpToLine
  SAR              → Search
  MABIM            → Sword
  Penghijauan      → TreePine
```

### 8.8 Gallery Section (`#galeri`)

```
Layout:        Masonry grid, lg:grid-cols-4, gap-3-4
Row height:    auto-rows-[180px] mobile, auto-rows-[200px] md
Items:         10 gallery items with varied col-span / row-span

Per Item:
  Background:  bg-gradient-to-br (unique per item from palette)
  Pattern:     radial-gradient dot overlay (20% opacity)
  Text:        text-white/60, centered
  Hover:       bg-charcoal/60 overlay, ZoomIn icon + title + category

Lightbox:
  Position:    Fixed inset, z-[100], bg-black/95
  Nav:         Close (top-right), Prev (left), Next (right)
  Content:     gradient background matching item, title + category
  Counter:     "{activeImage + 1} / {gallery.length}"
  Keyboard:    Escape → close, ArrowLeft/Right → navigate
  Scroll:      Locked on open (document.body.style.overflow)
```

### 8.9 Articles Section (`#artikel`)

```
Layout:        1 featured (horizontal) + lg:grid-cols-3 (5 articles)
Background:    charcoal → dark/30 → charcoal gradient

Featured Article:
  md:grid-cols-2
  Left:  gradient background (from gradients[0]), centered "Featured" text
  Right: category badge + date + xl title + excerpt + author/read-time + "Baca →"

Article Cards (5):
  glass-card, h-40 gradient header + content
  Category badge (colored per article) + read-time
  Title (base, line-clamp-2, hover: sapala-sky)
  Excerpt (text-sm, line-clamp-2)
  Author + "Baca →" (hover only, opacity 0→100)

Category Colors:
  Tips & Trik → sky
  Konservasi  → green-400
  Teknik      → primary
  Keselamatan → red
  Sejarah     → earth
```

### 8.10 Timeline Section (`#timeline`)

```
Layout:        Vertical line + alternating cards
Background:    dark/20 → charcoal → dark/20 gradient

Desktop (md+):
  - Center line: gradient sky → primary → earth
  - Alternating: even=left card, odd=right card
  - Center dot: w-4 h-4, gradient circle, border-4 charcoal
  - Card: glass-card p-6, year (3xl gradient/earth) + title + description

Mobile:
  - Left line: left-6, gradient
  - Numbered dot: w-9 h-9, gradient, white text, bold
  - Card: glass-card p-5, year (2xl) + title + description

Animation:
  Scroll reveal, opacity 0→1
  Staggered delay: i * 150ms per item

6 Timeline Entries:
  2004 → Pendirian SAPALA 67 (Ust. Budi Setiadi, Gunung Ciremai)
  2005 → Angkatan Pertama
  2008 → Ekspansi Kegiatan
  2012 → Era Pembinaan
  2015 → Fasilitas & Prestasi
  2024 → Prestasi Arung Jeram
```

### 8.11 Organization Structure Section

```
Layout:        8 role groups, stacked vertically, max-w-4xl mx-auto
Background:    charcoal

Per Group:
  glass-card p-6, hover:border-sapala-sky/20
  Role name: font-heading text-lg, sapala-sky
  Members: grid sm:grid-cols-2 gap-3
  Member card: bg-white/5 rounded-xl p-4, name + title

8 Roles:
  Pembina (2 members)
  Ketua Umum (1 member)
  Wakil Ketua (1 member)
  Sekretaris (1 member)
  Bendahara (1 member)
  Divisi Teknik (2 members)
  Divisi Humas (2 members)
  Divisi Logistik (2 members)
```

### 8.12 Contact Section (`#kontak`)

```
Layout:        lg:grid-cols-2 gap-12
Background:    charcoal → dark/40 → dark gradient
Decorative:    Two blur-3xl circles (sky top-right + earth bottom-left)

LEFT — Contact Info (4 cards):
  Alamat:      MapPin icon (sky→primary gradient) + address + basecamp
  Email:       Mail icon (earth→brown gradient) + mailto link
  Telepon:     Phone icon (green gradient) + tel link
  Sosial Media: Instagram + YouTube + WhatsApp (with hover colors)

RIGHT — Form + Map:
  Form (glass-card p-8):
    - Nama Lengkap (text input)
    - Email (email input)
    - Pesan (textarea, rows=5)
    - Submit: full-width btn-primary with Send icon
    - Success: green card, auto-clear 3s

  Map Placeholder (glass-card p-1 mt-6):
    - h-48 gradient bg
    - Compass icon (sky/30)
    - "Peta Lokasi" + address text
```

### 8.13 Footer (Layout Component)

```
Background:    charcoal → dark gradient, border-t border-white/5

4 Columns:
  1. Brand:
     - Logo (Mountain icon + SAPALA + subtitle)
     - Description text
     - 3 social icons (Instagram, YouTube, WhatsApp)

  2. Navigasi:
     - 8 nav links (smooth scroll to sections)

  3. Akses Cepat:
     - 5 quick links (Tentang, Kegiatan, Galeri, Artikel, Kontak)

  4. Kontak:
     - Address (MapPin icon)
     - Email (Mail icon, mailto)
     - Phone (Phone icon, tel)
     - Basecamp (Compass icon)

Bottom Bar:
  - Copyright: "© {year} SAPALA 67 Tasikmalaya. All rights reserved. Made with ❤️ untuk alam."
  - Back to top button (rounded-full, ArrowUp icon)

Social Icon Hover:
  Instagram → bg-sapala-sky text-sapala-charcoal
  YouTube   → bg-sapala-red text-white
  WhatsApp  → bg-green-500 text-white
```

---

## 9. Animasi & Transisi

### 9.1 CSS Keyframe Animations (tailwind.config.js)

```css
/* Fade In — scroll reveal base */
@keyframes fadeIn {
  0%   { opacity: 0; }
  100% { opacity: 1; }
}
Class: .animate-fade-in (0.8s ease-out forwards)

/* Slide Up — content entrance */
@keyframes slideUp {
  0%   { opacity: 0; transform: translateY(60px); }
  100% { opacity: 1; transform: translateY(0); }
}
Class: .animate-slide-up (0.8s ease-out forwards)

/* Slide Down — dropdown */
@keyframes slideDown {
  0%   { opacity: 0; transform: translateY(-20px); }
  100% { opacity: 1; transform: translateY(0); }
}
Class: .animate-slide-down (0.4s ease-out forwards)

/* Scale In — modal/pop */
@keyframes scaleIn {
  0%   { opacity: 0; transform: scale(0.9); }
  100% { opacity: 1; transform: scale(1); }
}
Class: .animate-scale-in (0.6s ease-out forwards)

/* Float — hero logo */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-20px); }
}
Class: .animate-float (6s ease-in-out infinite)

/* Pulse Glow — loading logo */
@keyframes pulseGlow {
  0%, 100% { box-shadow: 0 0 20px rgba(118, 197, 240, 0.3); }
  50%      { box-shadow: 0 0 40px rgba(118, 197, 240, 0.6); }
}
Class: .animate-pulse-glow (2s ease-in-out infinite)

/* Bounce Slow — scroll indicator */
Class: .animate-bounce-slow (3s ease-in-out infinite)

/* Spin Slow — decorative */
Class: .animate-spin-slow (20s linear infinite)

/* Timeline Pulse — timeline dot */
@keyframes timelinePulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50%      { transform: scale(1.1); opacity: 0.8; }
}
Class: .animate-timeline-pulse (2s ease-in-out infinite)

/* Load Progress — loading bar */
@keyframes loadProgress {
  0%   { width: 0%; }
  100% { width: 100%; }
}
Inline style: animation: loadProgress 1.5s ease-in-out forwards
```

### 9.2 Stagger Delay Utilities

```
.animate-delay-100  → 100ms
.animate-delay-200  → 200ms
.animate-delay-300  → 300ms
.animate-delay-400  → 400ms
.animate-delay-500  → 500ms
.animate-delay-600  → 600ms
.animate-delay-700  → 700ms
.animate-delay-800  → 800ms
```

### 9.3 Svelte Transitions

```
Hero Content:
  Logo:       in:fade, duration 1000ms
  Title:      in:fly y:40, duration 800ms, delay 200ms
  Subtitle:   in:fly y:30, duration 800ms, delay 400ms
  Quote:      in:fly y:30, duration 800ms, delay 600ms
  Tagline:    in:fly y:30, duration 800ms, delay 800ms
  CTA:        in:fly y:30, duration 800ms, delay 1000ms
  Scroll:     in:fade, duration 600ms, delay 1500ms

Mobile Menu:
  Overlay:    transition:fade, duration 300ms
  Links:      transition:slide, delay i*50ms per item

Gallery Lightbox:
  Overlay:    transition:fade, duration 200ms

Philosophy Cards:
  Description: max-h + opacity transition, duration 500ms
  Icon hover:  scale + rotate, duration 500ms
```

### 9.4 Scroll Reveal System

```
Mechanism:       IntersectionObserver
Target:          .scroll-reveal class elements
Threshold:       0.1
Root Margin:     0px 0px -50px 0px
Initial State:   opacity: 0 (set via JS on mount)
Active State:    opacity: 1 + add class "animate-fade-in"
Cleanup:         observer.disconnect() on unmount
```

### 9.5 Counter Animation

```
Function:      animateCounter(element, target, duration, suffix)
Easing:        easeOutCubic: 1 - Math.pow(1 - progress, 3)
Loop:          requestAnimationFrame
Format:        toLocaleString('id-ID') + suffix
Trigger:       IntersectionObserver threshold 0.3
```

---

## 10. Responsivitas

### Breakpoints (Tailwind Default)

```
sm:   640px   → Small tablets
md:   768px   → Tablets
lg:   1024px  → Laptops
xl:   1280px  → Desktops
2xl:  1536px  → Large monitors
```

### Responsive Patterns

```
NAVBAR:
  <lg:   Hamburger + full-screen overlay
  ≥lg:   Horizontal pill links

HERO:
  Logo:    w-24 h-24 → md:w-32 md:h-32
  Title:   text-5xl → sm:text-6xl → md:text-7xl → lg:text-8xl
  Subtitle: text-sm → md:text-base
  Quote:   text-xl → md:text-2xl → lg:text-3xl
  CTA:     flex-col → sm:flex-row

SECTION HEADINGS:
  text-3xl → md:text-4xl → lg:text-5xl

GRID LAYOUTS:
  About:       1 col → lg:2 col
  Philosophy:  1 col → md:2 col → lg:5 col
  Values:      1 col → sm:2 col → lg:5 col
  Activities:  1 col → sm:2 col → lg:4 col
  Gallery:     2 col → md:3 col → lg:4 col
  Articles:    1 col → sm:2 col → lg:3 col
  Timeline:    1 col → md:2 col alternating
  Contact:     1 col → lg:2 col
  Footer:      1 col → md:2 col → lg:4 col

TIMELINE:
  Mobile:  Left line + numbered dots + right cards
  Desktop: Center line + alternating left/right cards + center dots

PHILOSOPHY:
  Mobile:  Description always visible
  Desktop: Description hidden, shown on hover/focus

STATS:
  Number:  text-3xl → md:text-4xl
  Gap:     gap-4

SECTION PADDING:
  py-24 md:py-32 (consistent across all sections)
```

### Touch Targets

```
Minimum touch target: 44×44px (Tailwind p-2 = 40px, p-3 = 48px)
Nav links:    py-2 px-3-4 (desktop), py-3 px-4 (mobile)
Buttons:      py-3 px-6 minimum
Social icons: w-10 h-10
```

---

## 11. Data Layer

### Single Source of Truth: `src/lib/data/site.ts`

Semua konten teks tersentralisasi di satu file. Komponen hanya mengimpor dan merender.

### Data Structures

```
siteData:          Organization info, contact, social, vision, mission,
                   about sections, goals, activity forms
navLinks:          8 navigation items { label, href }
logoPhilosophy:    5 items { icon, title, description }
coreValues:        5 items { icon, title, description }
activities:        8 items { title, category, description, image }
achievements:      4 items { year, event, competition, organization }
timeline:          6 items { year, title, description }
articles:          6 items { title, slug, category, excerpt, author, date, readTime, image }
gallery:           10 items { src, alt, category, span }
orgStructure:      8 groups { role, members: [{ name, title }] }
alumni:            8 items { name, year, profession }
```

### Icon Mapping (Lucide Svelte)

```
Logo Philosophy:
  mountain    → Mountain
  compass     → Compass
  rope        → Cable
  footprints  → Footprints
  pen         → PenTool

Core Values:
  book-open       → BookOpen
  compass         → Compass
  tree-pine       → TreePine
  heart-handshake → HeartHandshake
  users           → Users

Activities:
  Pendidikan Dasar → Users
  Pendakian Gunung → Mountain
  Arung Jeram      → Waves
  Bakti Sosial     → Heart
  Wall Climbing    → ArrowUpToLine
  SAR              → Search
  MABIM            → Sword
  Penghijauan      → TreePine

Layout:
  Menu/X           → Menu, X
  Mountain         → Mountain (logo)
  MapPin           → MapPin
  Mail             → Mail
  Phone            → Phone
  Instagram        → Instagram
  Youtube          → Youtube
  MessageCircle    → MessageCircle
  Send             → Send
  Compass          → Compass
  ArrowUp          → ArrowUp
  ChevronDown      → ChevronDown
  ChevronRight     → ChevronRight
  Clock            → Clock
  User             → User
  Tag              → Tag
  Target           → Target
  Handshake        → Handshake
  Users            → Users
  Calendar         → Calendar
  Heart            → Heart
  Search           → Search
  ZoomIn           → ZoomIn
```

---

## 12. Utility Functions

### `src/lib/utils/scroll.ts`

```typescript
// Scroll reveal via IntersectionObserver
export function useScrollReveal(): void
  - Queries .scroll-reveal elements
  - Sets initial opacity: 0
  - Observes and reveals on intersection
  - Cleanup on unmount

// Writable store for scroll position
export const scrollY: Writable<number>

// Smooth scroll to element by ID
export function scrollToElement(id: string): void
  - document.getElementById(id).scrollIntoView({ behavior: 'smooth' })
```

### `src/lib/utils/counter.ts`

```typescript
// Animate number counter
export function animateCounter(
  element: HTMLElement,
  target: number,
  duration: number = 2000,
  suffix: string = ''
): void
  - requestAnimationFrame loop
  - easeOutCubic easing
  - toLocaleString('id-ID') formatting
  - Appends suffix after number
```

### `src/lib/utils/cn.ts`

```typescript
// Class name merger (clsx + tailwind-merge)
export function cn(...inputs: ClassValue[]): string
  - Conditional class merging
  - Tailwind class deduplication
```

---

## 13. SEO & Metadata

### Meta Tags (in `+page.svelte` `<svelte:head>`)

```html
<title>{siteData.name} - {siteData.fullName} | {siteData.moto}</title>
→ "SAPALA 67 - Santri Pecinta Alam 67 | MENGENALIMU UNTUK MENGENALINYA"

<meta name="description" content={siteData.description} />
→ Full organization description

<meta property="og:title" content="{siteData.name} - {siteData.fullName}" />
<meta property="og:description" content={siteData.description} />
<meta property="og:type" content="website" />
<meta name="twitter:card" content="summary_large_image" />
<link rel="icon" type="image/png" href="/logo.png" />
```

### Semantic HTML

```
<nav>         → Navbar
<main>        → Main content wrapper
<section>     → Each content section with id
<footer>      → Footer
<h1-h4>       → Heading hierarchy
<a>           → Navigation links (href="#section")
<button>      → Interactive elements
<form>        → Contact form
<img>         → Logo with alt text
```

### robots.txt & Sitemap

```
Belum diimplementasikan — direkomendasikan untuk production:
- static/robots.txt
- src/routes/sitemap.xml/+server.ts
```

---

## 14. Aksesibilitas

### Implementasi Saat Ini

```
Semantic HTML:     <nav>, <main>, <section>, <footer>, <h1>-<h4>, <a>, <button>, <form>
Alt text:          Logo image alt="SAPALA 67 Logo"
ARIA labels:       aria-label="Toggle menu", aria-label="Close", aria-label="Previous/Next"
Keyboard nav:      Gallery lightbox (Escape, ArrowLeft, ArrowRight)
                   Philosophy cards (tabindex="0", onfocus/onblur)
Focus states:      focus:outline-none focus:border-sapala-sky/50 focus:ring-1
Color contrast:    white/70 on charcoal (WCAG AA compliant for large text)
                   sapala-sky on charcoal (WCAG AA compliant)
```

### Area Perbaikan

```
[ ] Skip to content link
[ ] ARIA landmarks (role="banner", role="main", role="contentinfo")
[ ] Form error states dengan aria-describedby
[ ] Reduced motion preference: @media (prefers-reduced-motion: reduce)
[ ] Focus trap pada lightbox dan mobile menu
[ ] Alt text untuk semua gambar konten (saat gambar asli ditambahkan)
```

---

## 15. Performa

### Optimasi yang Sudah Dilakukan

```
Font Loading:      Fontsource variable fonts (self-hosted, no external requests)
                   3 font families × variable weights = minimal requests

CSS:               TailwindCSS purging — hanya class yang digunakan di-bundle
                   PostCSS + Autoprefixer untuk browser compatibility

JavaScript:        SvelteKit code splitting per route
                   Single-page app → minimal JS overhead
                   Runes mode (Svelte 5) — compiled, no runtime overhead

Images:            Logo PNG dengan multiple favicon sizes
                   Placeholder directories untuk konten gambar

Build Output:      Static HTML via adapter-static
                   Fully pre-rendered, zero server runtime
                   Gzip compression pada semua assets
```

### Build Output Size

```
Client bundle (gzip):
  CSS:         ~7.5 KB
  JS (app):    ~2.7 KB
  JS (page):   ~26-28 KB
  Fonts:       ~85 KB (latin-ext Inter, largest)
  Total:       ~120-140 KB gzipped initial load
```

### Rekomendasi Optimasi

```
[ ] Lazy load images dengan loading="lazy"
[ ] Responsive images dengan srcset
[ ] Preload critical fonts
[ ] Service worker untuk offline support
[ ] Image CDN (Cloudflare R2) untuk konten gambar
[ ] Prefetch visible links
```

---

## 16. Deployment

### Target: Cloudflare Pages

```
Build command:     npm run build
Output directory:  build/
Adapter:           @sveltejs/adapter-static
                   → Generates static HTML files
                   → No server-side runtime needed
                   → CDN-distributed globally

Environment:       Production
Node version:      Latest LTS
```

### Custom Domain

```
Domain:      (belum dikonfigurasi)
SSL:         Automatic via Cloudflare
DNS:         Cloudflare Nameservers
```

### Future Integrations

```
Cloudflare R2:     Image storage untuk gallery, articles, activities
Cloudflare D1:     Database untuk CMS (Phase 3)
Cloudflare KV:     Key-value store untuk settings
Cloudflare AI:     Optional AI features
```

---

## 17. Catatan Pengembangan

### Status Implementasi per Epic (task.md)

| Epic | Status | Catatan |
|------|--------|---------|
| 1. Setup Project | ✅ Selesai | SvelteKit 5 + TS + ESLint + Prettier |
| 2. Design System | ✅ Selesai | Warna, font, komponen UI |
| 3. Navbar | ✅ Selesai | Sticky, scroll effect, mobile menu |
| 4. Hero Section | ✅ Selesai | Animasi, parallax, CTA |
| 5. About Section | ✅ Selesai | Stats, visi misi, sejarah, keanggotaan |
| 6. Logo Philosophy | ✅ Selesai | Interactive hover cards |
| 7. Core Values | ✅ Selesai | 5 pilar kartu |
| 8. Activities | ✅ Selesai | Filterable grid |
| 9. Gallery | ✅ Selesai | Masonry + lightbox |
| 10. Articles | ✅ Selesai | Featured + grid |
| 11. Timeline | ✅ Selesai | Alternating layout |
| 12. Org Structure | ✅ Selesai | Struktur kepengurusan |
| 13. Alumni | ⚠️ Partial | Data ada, belum ada section UI |
| 14. Contact | ✅ Selesai | Form + info + map placeholder |
| 15. Footer | ✅ Selesai | 4 kolom + social |
| 16. Animations | ✅ Selesai | Scroll reveal, counter, hover |
| 17. SEO | ⚠️ Partial | Meta tags done, sitemap/robots.txt belum |
| 18. Performance | ⚠. Partial | Font optimization done, lazy images belum |
| 19. Accessibility | ⚠. Partial | Semantic HTML done, ARIA landmarks belum |
| 20. Responsive | ✅ Selesai | Mobile-first, semua breakpoint |
| 21. Deployment | ⏳ Pending | Belum di-deploy |

### Fase Berikutnya (dari task.md)

```
Phase 2 — Organization Features:
  - Alumni section UI
  - Event detail pages
  - Organization structure enhancements

Phase 3 — CMS:
  - Admin dashboard
  - Article CRUD
  - Gallery CRUD
  - Event CRUD
  - User management

Future Features:
  - Event registration
  - Member area (login, profile, certificates)
  - Google Maps integration
  - Sitemap.xml + robots.txt
  - Analytics integration
```

### Known Issues

```
1. Gallery menggunakan placeholder gradient — perlu gambar asli
2. Contact form adalah placeholder — perlu backend integration
3. Map placeholder — perlu Google Maps embed
4. Alumni data ada tapi belum ada UI section
5. Beberapa data (org structure, alumni) masih menggunakan data contoh
6. Counter animation hanya berjalan sekali (tidak reset saat scroll away)
7. Mobile menu tidak ada focus trap
8. Tidak ada 404 custom page (menggunakan fallback)
```

### Panduan Kontribusi

```
1. Semua teks konten → edit site.ts, jangan hardcode di component
2. Gunakan .glass-card untuk surface/card baru
3. Gunakan .section-heading dan .section-subheading untuk judul section
4. Gunakan .btn-primary dan .btn-outline untuk tombol
5. Ikuti pola badge: bg-{color}/10 border-{color}/20 text-{color}
6. Responsive: mobile-first, test di sm/md/lg
7. Animasi: tambahkan .scroll-reveal untuk elemen yang perlu reveal
8. Warna: gunakan token sapala-* , jangan hardcode hex
9. Font: gunakan font-heading, font-body, font-serif
10. Commit message: format "type: description" (feat:, fix:, docs:, style:)
```

---

*Dokumen ini mencerminkan state proyek per Juni 2026. Update saat ada perubahan signifikan pada desain atau arsitektur.*
