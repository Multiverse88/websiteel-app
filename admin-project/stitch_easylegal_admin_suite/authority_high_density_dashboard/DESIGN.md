---
name: Authority High-Density Dashboard
colors:
  surface: '#f8f9fa'
  surface-dim: '#d9dadb'
  surface-bright: '#f8f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f5'
  surface-container: '#edeeef'
  surface-container-high: '#e7e8e9'
  surface-container-highest: '#e1e3e4'
  on-surface: '#191c1d'
  on-surface-variant: '#5b403c'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#8f706b'
  outline-variant: '#e4beb8'
  surface-tint: '#b82116'
  primary: '#6f0000'
  on-primary: '#ffffff'
  primary-container: '#990202'
  on-primary-container: '#ffa193'
  inverse-primary: '#ffb4a8'
  secondary: '#5c5e64'
  on-secondary: '#ffffff'
  secondary-container: '#dedfe6'
  on-secondary-container: '#606369'
  tertiary: '#003c17'
  on-tertiary: '#ffffff'
  tertiary-container: '#005624'
  on-tertiary-container: '#27d467'
  error: '#DC2626'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad5'
  primary-fixed-dim: '#ffb4a8'
  on-primary-fixed: '#410000'
  on-primary-fixed-variant: '#930001'
  secondary-fixed: '#e1e2e9'
  secondary-fixed-dim: '#c4c6cd'
  on-secondary-fixed: '#191c21'
  on-secondary-fixed-variant: '#44474c'
  tertiary-fixed: '#66ff8e'
  tertiary-fixed-dim: '#3de273'
  on-tertiary-fixed: '#002109'
  on-tertiary-fixed-variant: '#005322'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
  oxblood-hover: '#7A0101'
  oxblood-soft: '#FEF2F2'
  canvas-white: '#FFFFFF'
  text-headline: '#111827'
  text-body: '#0F172A'
  text-muted: '#6B7280'
  border-base: '#E5E7EB'
  success: '#059669'
  warning: '#D97706'
typography:
  display-lg:
    fontFamily: DM Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: DM Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  section-title:
    fontFamily: DM Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-base:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-bold:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 22px
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.05em
  stat-metric:
    fontFamily: DM Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  table-header:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.03em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  sidebar-width: 260px
  header-height: 64px
  gutter: 24px
  card-padding: 20px
  section-gap: 32px
---

## Brand & Style

The design system is a high-productivity administrative environment that balances legal authority with modern technical efficiency. It draws inspiration from "linear-style" productivity tools, utilizing a minimalist, modular approach to organize dense legal data.

The aesthetic is **Corporate / Modern** with elements of **Minimalism**. It emphasizes structural clarity through hair-line borders, a disciplined vertical rhythm, and a high-contrast palette. The interface evokes a sense of reliability and speed, transitioning from the warm, client-facing brand to a focused, operative dashboard for legal professionals.

**Key Visual Principles:**
- **Productivity First:** High information density without visual clutter.
- **Editorial Authority:** Strategic use of display serifs for high-level metrics to inject a premium, established feel.
- **Modular Logic:** Content is organized into distinct panels with varying radii to define hierarchy.

## Colors

The palette is anchored by **Oxblood Crimson**, a color that conveys gravitas and legal heritage. This is contrasted against a **Modular Dark** sidebar and an ultra-clean **Slate** workspace.

- **Primary (Oxblood):** Reserved for core CTAs, active states, and critical brand moments.
- **Secondary (Deep Charcoal):** Used for the primary navigation shell to frame the content.
- **Tertiary (WhatsApp Green):** A functional brand color specifically for client communication triggers.
- **Neutrals:** A layered system of white (surfaces), off-white (canvas), and slate (borders) to create depth without shadows.
- **Semantic Palette:** High-saturation tokens for success, warning, and error states, always paired with their soft-tinted background counterparts for accessible status badges.

## Typography

This design system uses a multi-family approach to distinguish between editorial impact, functional reading, and technical data.

- **Headlines:** DM Sans provides a clean, modern geometric structure that feels professional yet approachable.
- **Body & Operations:** Inter is utilized for its exceptional legibility in dense data environments, particularly in tables and forms.
- **Metadata & Status:** JetBrains Mono is used for system-level information, badges, and technical IDs to provide a precise, "verified" quality.

**Usage Rules:**
- **Tracking:** Apply negative tracking to display styles for a tighter, more modern look. Use increased tracking for uppercase labels and table headers to improve scannability.
- **Hierarchy:** Use weight over color to establish hierarchy. Muted text should be used sparingly for secondary metadata only.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy for the navigation shell, with a fluid, modular workspace for the content area.

- **Shell Structure:** A fixed 260px sidebar for global navigation and a 64px top bar for contextual actions and breadcrumbs.
- **Grid System:** Content is housed in modular cards that utilize a 24px gutter. On desktop, sections should follow a 12-column logic, typically spanning 3, 4, 6, or 12 columns depending on data density.
- **Rhythm:** A consistent 8px/4px base unit controls all internal component padding.
- **Responsive:**
    - **Tablet:** Sidebar collapses into a hamburger menu; card gutters reduce to 16px.
    - **Mobile:** All cards stack vertically; horizontal scrolling is enabled for data tables to maintain legibility without font scaling.

## Elevation & Depth

This design system utilizes **Tonal Layers** and **Low-Contrast Outlines** rather than heavy shadows to convey depth. This maintains a "flat" productivity aesthetic that feels fast and lightweight.

- **Base Layer:** The Canvas Background (#F9FAFB) acts as the foundation.
- **Surface Layer:** Dashboard cards and panels use pure White (#FFFFFF) with a 1px solid hairline border (#E5E7EB).
- **Depth Cues:** A single, extremely soft ambient shadow (4px blur, 2% opacity) may be applied to the "active" surface or modal to separate it from the background.
- **Glassmorphism:** Navigation headers or sticky action bars may use a 12px backdrop blur with 88% opacity white to maintain context while scrolling.

## Shapes

The shape language is disciplined and varied by component scale to create a "nested" visual logic.

- **Standard (8px):** Buttons, input fields, and small UI controls.
- **Large (12px - 16px):** Primary content cards and data table wrappers.
- **Panel (32px):** Hero sections or major dashboard containers, reflecting the "Eco-Tech" modular panels.
- **Pill (9999px):** Strictly reserved for status badges, tags, and toggle switches.

## Components

### Buttons
- **Primary:** Solid Oxblood Crimson with white text. 8px radius. High-contrast and impactful.
- **Secondary:** White surface with 1px border. Dark gray text.
- **Ghost:** No border or background unless hovered. Used for utility actions (e.g., "Cancel", "Export").

### Inputs & Forms
- **Fields:** Background-filled (pure white) with a 1px border. 8px radius.
- **Focus State:** 2px Oxblood Crimson border with a soft red glow.
- **Labels:** 12px, bold, uppercase. Positioned 6px above the field.

### Cards & Panels
- **Stat Cards:** Feature a large metric (DM Sans) and a small 48px icon container with a soft red background tint (8% opacity).
- **Modular Panels:** Use the largest 32px radius. Should contain multiple sub-components or data visualisations.

### Data Tables
- **Headers:** Light gray background (#F9FAFB) with uppercase, monospaced-style labels.
- **Rows:** 52px height. Hover state triggers a subtle Oxblood tint (2% opacity).
- **Badges:** Pill-shaped with monospaced text. Color-coded by status (Success, Warning, Error).

### Navigation
- **Active State:** In the sidebar, active items receive a soft red background tint and a 4px vertical "indicator" bar on the far left in solid Oxblood.