# Design Docs Template — Project Reference

> This file is a Claude context document. Use it at the start of a new session to give Claude full understanding of this project without re-exploration.

---

## Overview

A custom design system documentation site built with **Next.js 15 + TypeScript**. It serves as the canonical reference for a design system that may power one or more production projects (React/TS or jQuery/AdminLTE). The site documents components, their states, variants, and design tokens in a structured, visual way.

It is conceptually similar to Storybook but fully custom — giving complete control over layout, branding, and content structure at the cost of missing advanced tooling (live prop controls, a11y auditing, visual regression, etc.).

**Deployed on:** Vercel
**Local path:** `C:\Things\PROJEKTI\claude-design-system\design-docs-template`
**Production URL:** `https://design-docs-template-pnbtslgd7-pajakupus-projects.vercel.app`

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15.2.8 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3.4.1 |
| Variant management | class-variance-authority (CVA) |
| ClassName merging | clsx + tailwind-merge |
| Accessible primitives | Radix UI (Tabs, Tooltip) |
| Icons | Lucide React |
| Fonts | Inter (UI), JetBrains Mono (code) |
| Deployment | Vercel |

---

## Project Structure

```
design-docs-template/
├── app/
│   ├── layout.tsx                  # Root layout + metadata
│   ├── page.tsx                    # Redirects to /docs/button
│   ├── globals.css                 # Global styles + font imports
│   ├── docs/
│   │   ├── layout.tsx              # Docs shell: Sidebar + main area
│   │   └── [component]/
│   │       └── page.tsx            # Dynamic component doc page
│   └── token-graph/
│       ├── layout.tsx
│       └── page.tsx                # Token relationship visualizer
│
├── components/
│   ├── docs/
│   │   ├── ComponentPreview.tsx    # Renders live React previews per component
│   │   ├── ComponentTabs.tsx       # States / Types / Tokens tab switcher
│   │   ├── CodeBlock.tsx           # Syntax-highlighted code + copy button
│   │   ├── StateExample.tsx        # Single state card (preview + badge + code)
│   │   └── TokenTable.tsx          # Token reference table with color swatches
│   ├── layout/
│   │   └── Sidebar.tsx             # Left nav with sections + active state
│   └── token-graph/
│       └── TokenGraph.tsx          # Token hierarchy visualization
│
├── lib/
│   ├── docs-data.ts                # ALL component docs + navigation config (main data file)
│   ├── tokens.ts                   # Design token definitions (3-tier hierarchy)
│   └── utils.ts                    # cn() classname utility
│
├── tailwind.config.ts              # Custom terracotta palette + font config
├── tsconfig.json                   # Path alias: @/* → root
└── next.config.ts                  # Minimal Next.js config
```

---

## Architecture

### Data-Driven Documentation

All component documentation lives in **`lib/docs-data.ts`** as TypeScript data. There is no CMS or MDX. Every component entry has:

- `name` — Display name
- `description` — Overview paragraph
- `slug` — URL path segment
- `states` — Array of `StateExample` objects (each has label, description, code, preview key)
- `types` — Array of variant examples (same shape as states)
- `tokens` — Array of `DesignToken` objects (name, value, category, description)

The navigation structure (sidebar sections) is also defined in `docs-data.ts`.

### Token System — Three-Tier Hierarchy

Defined in `lib/tokens.ts`:

```
Primitive tokens       →   Raw values (hex colors, px sizes, rem)
       ↓
Semantic tokens        →   Contextual meaning (color.bg.brand, color.text.primary)
       ↓
Component tokens       →   Per-component mappings (button.bg.default, badge.radius)
```

### Page Rendering Flow

```
/docs/[component]
  → generateStaticParams() reads navigation from docs-data.ts
  → page.tsx fetches componentDocs[slug]
  → renders ComponentTabs (States | Types | Tokens)
      → States tab: maps states[] → StateExample cards
          → each StateExample renders: ComponentPreview + CodeBlock
      → Tokens tab: maps tokens[] → TokenTable (grouped by category)
```

### Adding a New Component

1. Add to `navigation` array in `lib/docs-data.ts` under the correct section
2. Add a `componentDocs` entry with states, types, and tokens arrays
3. Add a preview case in `components/docs/ComponentPreview.tsx` (switch on slug)
4. Static params auto-update via `generateStaticParams()`

---

## Current Features

### Documentation
- States tab: shows all interactive/visual states (default, hover, focus, disabled, error, etc.)
- Types/Variants tab: shows all visual variants (primary, secondary, ghost, destructive, etc.)
- Tokens tab: grouped design token tables with auto-rendered color swatches

### UI
- Left sidebar with 4 sections: Foundations, Components, Patterns, Tools
- Active state highlighting (terracotta accent color)
- Responsive grid (1 col mobile → 2 col desktop)
- Version badge in sidebar footer (v1.0.0)

### Code Blocks
- Custom regex-based syntax highlighting (no external lib)
- Copy-to-clipboard with visual feedback ("Copied!" + green check, resets after 2s)
- Language label in VSCode-style header

### Token Graph
- Separate `/token-graph` page visualizing the primitive → semantic → component token chain

### Accessibility (existing baseline)
- Keyboard navigation via Radix UI Tabs (arrow keys, Home/End)
- Semantic HTML: heading hierarchy, nav landmarks
- Focus ring demos in component previews
- Radix UI ARIA attributes built-in

---

## Design Language

| Element | Value |
|---|---|
| Brand accent | Terracotta `#C67C4E` (terracotta-600) |
| Background | `#f3f4f6` (gray-100) |
| Sidebar | White + `gray-200` border |
| Cards | White + `gray-200` border |
| Primary text | `#111827` (gray-900) |
| Active nav | Terracotta bg + white text |
| Code font | JetBrains Mono |

---

## Documented Components (as of initial build)

**Foundations:** Colors, Typography
**Components:** Button, Badge, Input, Card
**Patterns:** (stubs in nav, not yet documented)
**Tools:** Token Graph

---

## Known Gaps / Planned Work

See `PLANS.md` for the full roadmap toward Storybook feature parity.

Key gaps:
- No live prop controls / interactive playground
- No automated accessibility auditing
- No visual regression testing
- No search
- No responsive viewport switching in previews
- No dark mode preview
- Prop tables are not auto-generated from TypeScript types (hand-written)
