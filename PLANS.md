# Design Docs — Storybook Parity Plans

> Roadmap for evolving this custom design docs site to match (or exceed) Storybook's core capabilities.
> Each item includes: what it is, why it matters, and implementation notes for this specific codebase.

---

## Priority Tiers

| Tier | Label | Meaning |
|---|---|---|
| 🔴 | P0 — Core | Fundamental parity with Storybook; highest value |
| 🟡 | P1 — High | Significantly improves DX or design handoff |
| 🟢 | P2 — Nice | Polishing and advanced features |

---

## 🔴 P0 — Core Features

### 1. Interactive Prop Playground

**What:** A live controls panel (like Storybook's Controls addon) that lets users tweak component props and see the component re-render in real time.

**Why:** Currently previews are static — they show hardcoded states. A playground lets developers and designers experiment freely without reading code.

**Implementation plan:**
- Add a `propSchema` field to each `ComponentDoc` entry in `docs-data.ts`:
  ```ts
  propSchema: {
    variant: { type: 'select', options: ['primary', 'secondary', 'ghost', 'outline', 'destructive'], default: 'primary' },
    size: { type: 'select', options: ['sm', 'md', 'lg'], default: 'md' },
    disabled: { type: 'boolean', default: false },
    label: { type: 'string', default: 'Button' },
  }
  ```
- Build a `PropControls` component that renders appropriate input per type:
  - `select` → `<select>` dropdown
  - `boolean` → toggle switch
  - `string` → text input
  - `number` → number input + range slider
  - `color` → color picker
- Build a `Playground` tab (4th tab alongside States / Types / Tokens)
- `ComponentPreview.tsx` already accepts a slug — extend it to accept a `props` object and pass it to the rendered component
- Sync state with URL search params so playground configs are shareable (`?variant=ghost&disabled=true`)
- Show the generated code snippet below the playground, updating live as props change

**Files to touch:**
- `lib/docs-data.ts` — add `propSchema` to each component
- `components/docs/ComponentPreview.tsx` — accept dynamic props
- `components/docs/ComponentTabs.tsx` — add Playground tab
- New file: `components/docs/PropControls.tsx`
- New file: `components/docs/Playground.tsx`

---

### 2. Accessibility (A11y) Auditor

**What:** Run automated accessibility checks against live component previews and display results inline — like Storybook's `@storybook/addon-a11y` which uses axe-core.

**Why:** Catches WCAG violations (contrast, missing ARIA labels, keyboard traps) without leaving the docs site.

**Implementation plan:**
- Install `axe-core`: `npm install axe-core`
- In the Playground tab (or as a persistent panel), add an "Accessibility" section
- After each render, run `axe.run()` against the preview container's DOM node:
  ```ts
  import axe from 'axe-core'
  const results = await axe.run(previewRef.current)
  ```
- Display results grouped by severity:
  - 🔴 Violations (must fix — WCAG fail)
  - 🟡 Incomplete (needs manual review)
  - ✅ Passes (collapsed by default)
- Each violation shows:
  - Rule ID + description
  - Impact level (critical / serious / moderate / minor)
  - Affected element (highlighted in the preview)
  - Link to axe rule documentation
- Re-run automatically when playground props change

**Files to touch:**
- New file: `components/docs/A11yPanel.tsx`
- `components/docs/Playground.tsx` — mount A11yPanel below preview
- `components/docs/ComponentPreview.tsx` — expose a `ref` for axe to target

---

### 3. Props / API Reference Table (Auto-Generated)

**What:** A dedicated "Props" tab showing a structured table of all component props — type, default value, required/optional, description. Like Storybook's ArgsTable.

**Why:** Currently tokens are documented but not the React prop API. Developers need both.

**Implementation plan for now (manual with schema):**
- Add a `props` array to each `ComponentDoc` in `docs-data.ts`:
  ```ts
  props: [
    { name: 'variant', type: "'primary' | 'secondary' | 'ghost'", default: "'primary'", required: false, description: 'Visual style of the button' },
    { name: 'disabled', type: 'boolean', default: 'false', required: false, description: 'Disables interaction and applies muted styles' },
    { name: 'onClick', type: '() => void', default: '—', required: false, description: 'Click handler' },
  ]
  ```
- Build `PropsTable` component rendering a styled table
- Add as a "Props" tab in `ComponentTabs.tsx`

**Future (auto-generation):**
- Use `react-docgen-typescript` or `ts-morph` at build time to extract prop types from source component files
- Write a Next.js build script that reads component `.tsx` files and generates `propSchema` + `props` arrays automatically
- Store output as JSON, import into docs-data

**Files to touch:**
- `lib/docs-data.ts` — add `props` arrays
- New file: `components/docs/PropsTable.tsx`
- `components/docs/ComponentTabs.tsx` — add Props tab

---

## 🟡 P1 — High Value

### 4. Responsive Viewport Switcher

**What:** Buttons to preview components at mobile / tablet / desktop breakpoints — like Storybook's viewport toolbar.

**Why:** Design handoff must show how components behave at different sizes.

**Implementation plan:**
- Add a viewport selector above each preview area (icons: phone / tablet / desktop)
- Wrap `ComponentPreview` in a container with constrained max-width per viewport:
  - Mobile: 375px
  - Tablet: 768px
  - Desktop: 1280px (full width, default)
- Apply overflow hidden + fixed height to simulate viewport
- Persist selected viewport in component state or URL param

**Files to touch:**
- New file: `components/docs/ViewportSwitcher.tsx`
- `components/docs/StateExample.tsx` — wrap preview in constrained container
- `components/docs/Playground.tsx` — add ViewportSwitcher to toolbar

---

### 5. Dark Mode Preview

**What:** A toggle to switch component previews between light and dark mode — without affecting the docs UI itself.

**Why:** Design systems must document both modes. Currently only light mode is shown.

**Implementation plan:**
- Add a dark/light toggle button to the preview toolbar (sun/moon icon from Lucide)
- Wrap each preview container in a div with `dark` class when dark mode is active
- Ensure Tailwind dark mode is set to `class` strategy in `tailwind.config.ts`
- Component tokens and styles must use `dark:` variants
- This also forces documenting dark mode token mappings — add a `darkValue` field to `DesignToken`

**Files to touch:**
- `tailwind.config.ts` — set `darkMode: 'class'`
- `lib/docs-data.ts` / `lib/tokens.ts` — add dark token values
- New file: `components/docs/ModeToggle.tsx`
- `components/docs/StateExample.tsx` + `Playground.tsx` — integrate ModeToggle

---

### 6. Global Search

**What:** A keyboard-triggered search (Cmd/Ctrl+K) that fuzzy-searches all component names, states, variants, and tokens.

**Why:** As the design system grows, navigation alone doesn't scale. Essential for large systems.

**Implementation plan:**
- Install `fuse.js` for client-side fuzzy search: `npm install fuse.js`
- Build a search index at startup from `docs-data.ts` + `tokens.ts`
- Create a `SearchModal` component (full-screen overlay with input + results list)
- Bind `Cmd+K` / `Ctrl+K` globally via `useEffect` keydown listener
- Results link directly to component page + anchor (e.g. `/docs/button#focus-state`)
- Show result type as a badge: Component / State / Variant / Token

**Files to touch:**
- New file: `components/docs/SearchModal.tsx`
- `app/docs/layout.tsx` — mount SearchModal + register keybinding
- `components/layout/Sidebar.tsx` — add search trigger button

---

### 7. Component Status Badges

**What:** A status label on each component indicating its maturity — like `stable`, `beta`, `experimental`, `deprecated`.

**Why:** Prevents teams from adopting unstable components in production without awareness.

**Implementation plan:**
- Add `status: 'stable' | 'beta' | 'experimental' | 'deprecated'` to `NavItem` and `ComponentDoc` in `docs-data.ts`
- Render a colored badge in the sidebar next to each item and in the component page header
- Add a filter in the sidebar to show only stable components
- For `deprecated`, show a warning banner at the top of the doc page

**Files to touch:**
- `lib/docs-data.ts` — add `status` field
- `components/layout/Sidebar.tsx` — render status badges
- `app/docs/[component]/page.tsx` — render status + deprecation banner

---

### 8. Copy Design Tokens as Code

**What:** In the Tokens tab, allow copying tokens as CSS custom properties, JS/TS object, or Tailwind config — not just viewing them.

**Why:** Speeds up developer adoption of the token system into production codebases.

**Implementation plan:**
- Add a format selector above the token table: `CSS Variables` | `JS Object` | `Tailwind Config`
- Generate the corresponding output from the token data in `lib/tokens.ts`
- Render in a `CodeBlock` with the existing copy-to-clipboard functionality
- Example outputs:
  ```css
  /* CSS Variables */
  --color-bg-brand: #C67C4E;
  --button-bg-default: var(--color-bg-brand);
  ```
  ```ts
  // JS Object
  export const tokens = {
    color: { bg: { brand: '#C67C4E' } },
    button: { bg: { default: 'var(--color-bg-brand)' } }
  }
  ```

**Files to touch:**
- New file: `lib/token-export.ts` — format conversion functions
- `components/docs/TokenTable.tsx` — add format selector + export block

---

## 🟢 P2 — Polish & Advanced

### 9. Figma Embed Integration

**What:** Embed the Figma design frame for each component directly in the docs, so designers and developers see the design source alongside the implementation.

**Why:** Closes the design-development gap. Storybook has a Figma addon; this would match it.

**Implementation plan:**
- Add a `figmaUrl` field to `ComponentDoc` in `docs-data.ts`
- Add a "Design" tab in `ComponentTabs.tsx` (only shows if `figmaUrl` is set)
- Embed via `<iframe src={figmaUrl} />` using Figma's embed API format
- Show a fallback message if no Figma URL is configured

---

### 10. Keyboard Shortcut Navigation

**What:** Keyboard shortcuts to move between components, tabs, and playground controls without a mouse.

**Why:** Power-user DX. Storybook supports this natively.

**Shortcuts to implement:**
- `J` / `K` — next / previous component in sidebar
- `1`, `2`, `3`, `4` — switch between States / Types / Tokens / Playground tabs
- `Cmd+K` — open search (see item 6)
- `Shift+D` — toggle dark mode (see item 5)

**Files to touch:**
- New file: `hooks/useKeyboardNav.ts`
- `app/docs/layout.tsx` — mount keyboard listener

---

### 11. Visual Regression Snapshot Tool

**What:** Capture PNG snapshots of component previews and compare them across versions to catch unintended visual changes.

**Why:** Prevents silent regressions when tokens or component styles change.

**Implementation plan:**
- Use Playwright's screenshot API in a CI script
- For each component + state: navigate to the page, screenshot the preview container
- Store baseline images in `/snapshots/baseline/`
- On each PR: run again, diff against baseline using `pixelmatch` or `looks-same`
- Report diffs as a GitHub PR comment with before/after images
- This is a CI concern, not a UI feature — add a `scripts/snapshot.ts` file

---

### 12. Changelog / Version History

**What:** A page showing what changed between versions of the design system — new components, token changes, deprecations.

**Why:** Teams consuming the design system need to know what changed to safely upgrade.

**Implementation plan:**
- Add a `CHANGELOG.md` to the repo (standard Keep a Changelog format)
- Create a `/changelog` page in Next.js that renders it (use `remark` to parse MD)
- Link from the sidebar version badge
- Optionally: add a "What's new" banner that shows on first visit after a version bump (using localStorage)

---

## Implementation Order Recommendation

```
Phase 1 (Core parity)
  ├── Props API table            [P0 — manual first, auto-gen later]
  ├── Interactive playground     [P0 — highest visual impact]
  └── A11y auditor               [P0 — unique value, not just parity]

Phase 2 (DX & handoff)
  ├── Dark mode preview          [P1]
  ├── Responsive viewport        [P1]
  ├── Global search              [P1]
  └── Token export formats       [P1]

Phase 3 (Polish)
  ├── Component status badges    [P1 — low effort, high signal]
  ├── Keyboard navigation        [P2]
  ├── Figma embed                [P2]
  ├── Visual regression CI       [P2]
  └── Changelog page             [P2]
```

---

## Notes

- The existing `ComponentPreview.tsx` switch-case pattern will need refactoring when the playground lands — components need to accept dynamic props rather than hardcoded state names.
- `axe-core` must only run client-side (`"use client"` + `useEffect`) — it manipulates the DOM.
- The prop schema defined for the playground doubles as the source of truth for the Props API table, so implement both together.
- All features should degrade gracefully: if a component has no `propSchema`, the Playground tab simply doesn't appear.
