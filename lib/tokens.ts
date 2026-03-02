// ─── TYPES ────────────────────────────────────────────────────────────────────

export type TokenType = "color" | "spacing" | "radius" | "fontSize" | "fontWeight" | "shadow";

export type PrimitiveToken = {
  id: string;     // e.g. "terracotta.600"
  name: string;   // display label e.g. "600"
  value: string;  // raw CSS value e.g. "#C67C4E"
  type: TokenType;
};

export type PrimitiveGroup = {
  id: string;
  name: string;
  type: TokenType;
  tokens: PrimitiveToken[];
};

export type SemanticToken = {
  id: string;           // e.g. "color.bg.brand"
  name: string;         // display e.g. "color.bg.brand"
  value: string;        // resolved value
  primitiveRef: string; // id of the primitive it maps to
  category: string;     // "Background" | "Text" | "Border" | "Space" | "Radius"
  description: string;
};

export type ComponentToken = {
  id: string;           // e.g. "button.bg.default"
  name: string;
  value: string;        // resolved value
  semanticRef: string;  // id of the semantic token it maps to
  component: string;    // "button" | "badge" | "input" | "card" | etc.
  description: string;
};

// ─── PRIMITIVE GROUPS ─────────────────────────────────────────────────────────

export const primitiveGroups: PrimitiveGroup[] = [
  {
    id: "terracotta",
    name: "Terracotta",
    type: "color",
    tokens: [
      { id: "terracotta.50",  name: "50",  value: "#fdf5f2", type: "color" },
      { id: "terracotta.100", name: "100", value: "#fae8df", type: "color" },
      { id: "terracotta.200", name: "200", value: "#F3D9CF", type: "color" },
      { id: "terracotta.300", name: "300", value: "#e8b99e", type: "color" },
      { id: "terracotta.400", name: "400", value: "#D99A7D", type: "color" },
      { id: "terracotta.500", name: "500", value: "#cc8760", type: "color" },
      { id: "terracotta.600", name: "600", value: "#C67C4E", type: "color" },
      { id: "terracotta.700", name: "700", value: "#A8623A", type: "color" },
      { id: "terracotta.800", name: "800", value: "#8a4d2c", type: "color" },
      { id: "terracotta.900", name: "900", value: "#6e3b21", type: "color" },
    ],
  },
  {
    id: "neutral",
    name: "Neutral",
    type: "color",
    tokens: [
      { id: "neutral.0",   name: "0",   value: "#ffffff", type: "color" },
      { id: "neutral.50",  name: "50",  value: "#f9fafb", type: "color" },
      { id: "neutral.100", name: "100", value: "#f3f4f6", type: "color" },
      { id: "neutral.200", name: "200", value: "#e5e7eb", type: "color" },
      { id: "neutral.300", name: "300", value: "#d1d5db", type: "color" },
      { id: "neutral.400", name: "400", value: "#9ca3af", type: "color" },
      { id: "neutral.500", name: "500", value: "#6b7280", type: "color" },
      { id: "neutral.600", name: "600", value: "#4b5563", type: "color" },
      { id: "neutral.700", name: "700", value: "#374151", type: "color" },
      { id: "neutral.800", name: "800", value: "#1f2937", type: "color" },
      { id: "neutral.900", name: "900", value: "#111827", type: "color" },
      { id: "neutral.950", name: "950", value: "#030712", type: "color" },
    ],
  },
  {
    id: "green",
    name: "Green",
    type: "color",
    tokens: [
      { id: "green.50",  name: "50",  value: "#f0fdf4", type: "color" },
      { id: "green.100", name: "100", value: "#dcfce7", type: "color" },
      { id: "green.300", name: "300", value: "#86efac", type: "color" },
      { id: "green.500", name: "500", value: "#22c55e", type: "color" },
      { id: "green.700", name: "700", value: "#15803d", type: "color" },
      { id: "green.900", name: "900", value: "#14532d", type: "color" },
    ],
  },
  {
    id: "red",
    name: "Red",
    type: "color",
    tokens: [
      { id: "red.50",  name: "50",  value: "#fef2f2", type: "color" },
      { id: "red.100", name: "100", value: "#fee2e2", type: "color" },
      { id: "red.300", name: "300", value: "#fca5a5", type: "color" },
      { id: "red.500", name: "500", value: "#ef4444", type: "color" },
      { id: "red.700", name: "700", value: "#b91c1c", type: "color" },
      { id: "red.900", name: "900", value: "#7f1d1d", type: "color" },
    ],
  },
  {
    id: "amber",
    name: "Amber",
    type: "color",
    tokens: [
      { id: "amber.50",  name: "50",  value: "#fffbeb", type: "color" },
      { id: "amber.100", name: "100", value: "#fef9c3", type: "color" },
      { id: "amber.300", name: "300", value: "#fcd34d", type: "color" },
      { id: "amber.500", name: "500", value: "#f59e0b", type: "color" },
      { id: "amber.700", name: "700", value: "#a16207", type: "color" },
      { id: "amber.900", name: "900", value: "#713f12", type: "color" },
    ],
  },
  {
    id: "blue",
    name: "Blue",
    type: "color",
    tokens: [
      { id: "blue.50",  name: "50",  value: "#eff6ff", type: "color" },
      { id: "blue.100", name: "100", value: "#dbeafe", type: "color" },
      { id: "blue.300", name: "300", value: "#93c5fd", type: "color" },
      { id: "blue.500", name: "500", value: "#3b82f6", type: "color" },
      { id: "blue.700", name: "700", value: "#1d4ed8", type: "color" },
      { id: "blue.900", name: "900", value: "#1e3a8a", type: "color" },
    ],
  },
  {
    id: "space",
    name: "Space",
    type: "spacing",
    tokens: [
      { id: "space.0",  name: "0",  value: "0px",   type: "spacing" },
      { id: "space.1",  name: "1",  value: "4px",   type: "spacing" },
      { id: "space.2",  name: "2",  value: "8px",   type: "spacing" },
      { id: "space.3",  name: "3",  value: "12px",  type: "spacing" },
      { id: "space.4",  name: "4",  value: "16px",  type: "spacing" },
      { id: "space.5",  name: "5",  value: "20px",  type: "spacing" },
      { id: "space.6",  name: "6",  value: "24px",  type: "spacing" },
      { id: "space.8",  name: "8",  value: "32px",  type: "spacing" },
      { id: "space.10", name: "10", value: "40px",  type: "spacing" },
      { id: "space.12", name: "12", value: "48px",  type: "spacing" },
      { id: "space.16", name: "16", value: "64px",  type: "spacing" },
    ],
  },
  {
    id: "radius",
    name: "Radius",
    type: "radius",
    tokens: [
      { id: "radius.none", name: "none", value: "0px",     type: "radius" },
      { id: "radius.sm",   name: "sm",   value: "4px",     type: "radius" },
      { id: "radius.md",   name: "md",   value: "6px",     type: "radius" },
      { id: "radius.lg",   name: "lg",   value: "8px",     type: "radius" },
      { id: "radius.xl",   name: "xl",   value: "12px",    type: "radius" },
      { id: "radius.full", name: "full", value: "9999px",  type: "radius" },
    ],
  },
  {
    id: "fontSize",
    name: "Font Size",
    type: "fontSize",
    tokens: [
      { id: "fontSize.xs",   name: "xs",   value: "12px", type: "fontSize" },
      { id: "fontSize.sm",   name: "sm",   value: "14px", type: "fontSize" },
      { id: "fontSize.base", name: "base", value: "16px", type: "fontSize" },
      { id: "fontSize.lg",   name: "lg",   value: "18px", type: "fontSize" },
      { id: "fontSize.xl",   name: "xl",   value: "20px", type: "fontSize" },
      { id: "fontSize.2xl",  name: "2xl",  value: "24px", type: "fontSize" },
      { id: "fontSize.3xl",  name: "3xl",  value: "30px", type: "fontSize" },
      { id: "fontSize.4xl",  name: "4xl",  value: "36px", type: "fontSize" },
    ],
  },
];

// ─── SEMANTIC TOKENS ──────────────────────────────────────────────────────────

export const semanticTokens: SemanticToken[] = [
  // Background
  { id: "color.bg.app",          name: "color.bg.app",          value: "#f3f4f6", primitiveRef: "neutral.100",      category: "Background", description: "Primary app background" },
  { id: "color.bg.card",         name: "color.bg.card",         value: "#ffffff", primitiveRef: "neutral.0",        category: "Background", description: "Card and surface background" },
  { id: "color.bg.elevated",     name: "color.bg.elevated",     value: "#ffffff", primitiveRef: "neutral.0",        category: "Background", description: "Elevated surfaces, popovers" },
  { id: "color.bg.overlay",      name: "color.bg.overlay",      value: "#f9fafb", primitiveRef: "neutral.50",       category: "Background", description: "Subtle overlay, hover tints" },
  { id: "color.bg.brand",        name: "color.bg.brand",        value: "#C67C4E", primitiveRef: "terracotta.600",   category: "Background", description: "Primary brand fill" },
  { id: "color.bg.brand-hover",  name: "color.bg.brand-hover",  value: "#A8623A", primitiveRef: "terracotta.700",   category: "Background", description: "Brand fill on hover" },
  { id: "color.bg.brand-subtle", name: "color.bg.brand-subtle", value: "#F3D9CF", primitiveRef: "terracotta.200",   category: "Background", description: "Tinted brand background" },
  { id: "color.bg.muted",        name: "color.bg.muted",        value: "#f3f4f6", primitiveRef: "neutral.100",      category: "Background", description: "Muted / inactive fill" },
  { id: "color.bg.danger",       name: "color.bg.danger",       value: "#fee2e2", primitiveRef: "red.100",          category: "Background", description: "Error state background" },
  { id: "color.bg.success",      name: "color.bg.success",      value: "#dcfce7", primitiveRef: "green.100",        category: "Background", description: "Success state background" },
  { id: "color.bg.warning",      name: "color.bg.warning",      value: "#fef9c3", primitiveRef: "amber.100",        category: "Background", description: "Warning state background" },
  { id: "color.bg.info",         name: "color.bg.info",         value: "#dbeafe", primitiveRef: "blue.100",         category: "Background", description: "Info state background" },

  // Text
  { id: "color.text.primary",    name: "color.text.primary",    value: "#111827", primitiveRef: "neutral.900",      category: "Text", description: "Primary body and heading text" },
  { id: "color.text.secondary",  name: "color.text.secondary",  value: "#6b7280", primitiveRef: "neutral.500",      category: "Text", description: "Supporting / secondary text" },
  { id: "color.text.muted",      name: "color.text.muted",      value: "#9ca3af", primitiveRef: "neutral.400",      category: "Text", description: "Placeholder and hint text" },
  { id: "color.text.inverse",    name: "color.text.inverse",    value: "#ffffff", primitiveRef: "neutral.0",        category: "Text", description: "Text on dark/brand surfaces" },
  { id: "color.text.brand",      name: "color.text.brand",      value: "#C67C4E", primitiveRef: "terracotta.600",   category: "Text", description: "Brand-colored text and links" },
  { id: "color.text.danger",     name: "color.text.danger",     value: "#b91c1c", primitiveRef: "red.700",          category: "Text", description: "Error and destructive text" },
  { id: "color.text.success",    name: "color.text.success",    value: "#15803d", primitiveRef: "green.700",        category: "Text", description: "Success state text" },
  { id: "color.text.warning",    name: "color.text.warning",    value: "#a16207", primitiveRef: "amber.700",        category: "Text", description: "Warning state text" },

  // Border
  { id: "color.border.default",  name: "color.border.default",  value: "#d1d5db", primitiveRef: "neutral.300",      category: "Border", description: "Default border color" },
  { id: "color.border.subtle",   name: "color.border.subtle",   value: "#e5e7eb", primitiveRef: "neutral.200",      category: "Border", description: "Subtle divider border" },
  { id: "color.border.strong",   name: "color.border.strong",   value: "#9ca3af", primitiveRef: "neutral.400",      category: "Border", description: "Strong / emphasis border" },
  { id: "color.border.focus",    name: "color.border.focus",    value: "#C67C4E", primitiveRef: "terracotta.600",   category: "Border", description: "Keyboard focus ring" },
  { id: "color.border.danger",   name: "color.border.danger",   value: "#ef4444", primitiveRef: "red.500",          category: "Border", description: "Error / danger border" },

  // Space
  { id: "space.xs",  name: "space.xs",  value: "8px",  primitiveRef: "space.2", category: "Space", description: "Extra small spacing" },
  { id: "space.sm",  name: "space.sm",  value: "12px", primitiveRef: "space.3", category: "Space", description: "Small spacing" },
  { id: "space.md",  name: "space.md",  value: "16px", primitiveRef: "space.4", category: "Space", description: "Medium spacing" },
  { id: "space.lg",  name: "space.lg",  value: "24px", primitiveRef: "space.6", category: "Space", description: "Large spacing" },
  { id: "space.xl",  name: "space.xl",  value: "32px", primitiveRef: "space.8", category: "Space", description: "Extra large spacing" },

  // Radius
  { id: "radius.sm",   name: "radius.sm",   value: "4px",    primitiveRef: "radius.sm",   category: "Radius", description: "Small radius — badges, chips" },
  { id: "radius.md",   name: "radius.md",   value: "6px",    primitiveRef: "radius.md",   category: "Radius", description: "Medium radius — buttons, inputs" },
  { id: "radius.lg",   name: "radius.lg",   value: "8px",    primitiveRef: "radius.lg",   category: "Radius", description: "Large radius — cards, modals" },
  { id: "radius.pill", name: "radius.pill", value: "9999px", primitiveRef: "radius.full", category: "Radius", description: "Pill shape — tags, full-round badges" },

  // Font
  { id: "font.size.label", name: "font.size.label", value: "12px", primitiveRef: "fontSize.xs",   category: "Typography", description: "Badge and label text size" },
  { id: "font.size.body",  name: "font.size.body",  value: "14px", primitiveRef: "fontSize.sm",   category: "Typography", description: "Body and UI text size" },
  { id: "font.size.base",  name: "font.size.base",  value: "16px", primitiveRef: "fontSize.base", category: "Typography", description: "Default body size" },
];

// ─── COMPONENT TOKENS ─────────────────────────────────────────────────────────

export const componentTokens: ComponentToken[] = [
  // ── Button ──
  { id: "button.bg.default",  name: "button.bg.default",  value: "#C67C4E", semanticRef: "color.bg.brand",        component: "button", description: "Default background" },
  { id: "button.bg.hover",    name: "button.bg.hover",    value: "#A8623A", semanticRef: "color.bg.brand-hover",  component: "button", description: "Hover background" },
  { id: "button.bg.muted",    name: "button.bg.muted",    value: "#f3f4f6", semanticRef: "color.bg.muted",        component: "button", description: "Secondary/ghost background" },
  { id: "button.text.label",  name: "button.text.label",  value: "#ffffff", semanticRef: "color.text.inverse",    component: "button", description: "Primary button label" },
  { id: "button.text.muted",  name: "button.text.muted",  value: "#9ca3af", semanticRef: "color.text.muted",      component: "button", description: "Disabled label color" },
  { id: "button.border.focus",name: "button.border.focus",value: "#C67C4E", semanticRef: "color.border.focus",    component: "button", description: "Keyboard focus ring" },
  { id: "button.radius",      name: "button.radius",      value: "6px",     semanticRef: "radius.md",             component: "button", description: "Border radius" },
  { id: "button.padding.x",   name: "button.padding.x",   value: "16px",    semanticRef: "space.md",              component: "button", description: "Horizontal padding" },
  { id: "button.padding.y",   name: "button.padding.y",   value: "8px",     semanticRef: "space.xs",              component: "button", description: "Vertical padding" },

  // ── Badge ──
  { id: "badge.bg.default",  name: "badge.bg.default",  value: "#f3f4f6", semanticRef: "color.bg.muted",        component: "badge", description: "Default background" },
  { id: "badge.bg.brand",    name: "badge.bg.brand",    value: "#F3D9CF", semanticRef: "color.bg.brand-subtle", component: "badge", description: "Brand tinted background" },
  { id: "badge.bg.danger",   name: "badge.bg.danger",   value: "#fee2e2", semanticRef: "color.bg.danger",       component: "badge", description: "Error state background" },
  { id: "badge.text.default",name: "badge.text.default",value: "#6b7280", semanticRef: "color.text.secondary",  component: "badge", description: "Default label text" },
  { id: "badge.text.brand",  name: "badge.text.brand",  value: "#C67C4E", semanticRef: "color.text.brand",      component: "badge", description: "Brand label text" },
  { id: "badge.border",      name: "badge.border",      value: "#e5e7eb", semanticRef: "color.border.subtle",   component: "badge", description: "Badge border" },
  { id: "badge.radius",      name: "badge.radius",      value: "9999px",  semanticRef: "radius.pill",           component: "badge", description: "Pill border radius" },

  // ── Input ──
  { id: "input.bg",              name: "input.bg",              value: "#ffffff", semanticRef: "color.bg.card",        component: "input", description: "Input background" },
  { id: "input.border.default",  name: "input.border.default",  value: "#d1d5db", semanticRef: "color.border.default", component: "input", description: "Resting border" },
  { id: "input.border.focus",    name: "input.border.focus",    value: "#C67C4E", semanticRef: "color.border.focus",   component: "input", description: "Focus ring color" },
  { id: "input.border.error",    name: "input.border.error",    value: "#ef4444", semanticRef: "color.border.danger",  component: "input", description: "Validation error border" },
  { id: "input.text",            name: "input.text",            value: "#111827", semanticRef: "color.text.primary",   component: "input", description: "Input text color" },
  { id: "input.placeholder",     name: "input.placeholder",     value: "#9ca3af", semanticRef: "color.text.muted",     component: "input", description: "Placeholder text" },
  { id: "input.radius",          name: "input.radius",          value: "6px",     semanticRef: "radius.md",            component: "input", description: "Border radius" },
  { id: "input.padding.x",       name: "input.padding.x",       value: "16px",    semanticRef: "space.md",             component: "input", description: "Horizontal padding" },

  // ── Card ──
  { id: "card.bg",              name: "card.bg",              value: "#ffffff", semanticRef: "color.bg.card",          component: "card", description: "Card surface" },
  { id: "card.border",          name: "card.border",          value: "#e5e7eb", semanticRef: "color.border.subtle",    component: "card", description: "Card border" },
  { id: "card.border.selected", name: "card.border.selected", value: "#C67C4E", semanticRef: "color.bg.brand",        component: "card", description: "Selected state border" },
  { id: "card.radius",          name: "card.radius",          value: "8px",     semanticRef: "radius.lg",             component: "card", description: "Border radius" },
  { id: "card.padding",         name: "card.padding",         value: "24px",    semanticRef: "space.lg",              component: "card", description: "Inner padding" },

  // ── Dialog ──
  { id: "dialog.bg",      name: "dialog.bg",      value: "#ffffff", semanticRef: "color.bg.elevated", component: "dialog", description: "Dialog surface" },
  { id: "dialog.border",  name: "dialog.border",  value: "#e5e7eb", semanticRef: "color.border.subtle", component: "dialog", description: "Dialog border" },
  { id: "dialog.overlay", name: "dialog.overlay", value: "#f9fafb", semanticRef: "color.bg.overlay",   component: "dialog", description: "Backdrop overlay" },
  { id: "dialog.radius",  name: "dialog.radius",  value: "8px",     semanticRef: "radius.lg",          component: "dialog", description: "Border radius" },
  { id: "dialog.padding", name: "dialog.padding", value: "24px",    semanticRef: "space.lg",           component: "dialog", description: "Content padding" },

  // ── Toast ──
  { id: "toast.bg",          name: "toast.bg",          value: "#ffffff", semanticRef: "color.bg.elevated",   component: "toast", description: "Toast surface" },
  { id: "toast.border",      name: "toast.border",      value: "#d1d5db", semanticRef: "color.border.default", component: "toast", description: "Toast border" },
  { id: "toast.text",        name: "toast.text",        value: "#111827", semanticRef: "color.text.primary",   component: "toast", description: "Toast body text" },
  { id: "toast.text.sub",    name: "toast.text.sub",    value: "#6b7280", semanticRef: "color.text.secondary", component: "toast", description: "Toast description text" },

  // ── Tooltip ──
  { id: "tooltip.bg",   name: "tooltip.bg",   value: "#111827", semanticRef: "color.text.primary",  component: "tooltip", description: "Tooltip background (inverted)" },
  { id: "tooltip.text", name: "tooltip.text", value: "#ffffff", semanticRef: "color.text.inverse",  component: "tooltip", description: "Tooltip label text" },
  { id: "tooltip.radius",name:"tooltip.radius",value: "4px",    semanticRef: "radius.sm",           component: "tooltip", description: "Border radius" },

  // ── Checkbox ──
  { id: "checkbox.bg.checked",  name: "checkbox.bg.checked",  value: "#C67C4E", semanticRef: "color.bg.brand",       component: "checkbox", description: "Checked fill" },
  { id: "checkbox.bg.default",  name: "checkbox.bg.default",  value: "#ffffff", semanticRef: "color.bg.card",        component: "checkbox", description: "Unchecked background" },
  { id: "checkbox.border",      name: "checkbox.border",      value: "#d1d5db", semanticRef: "color.border.default", component: "checkbox", description: "Box border" },
  { id: "checkbox.border.focus",name: "checkbox.border.focus",value: "#C67C4E", semanticRef: "color.border.focus",   component: "checkbox", description: "Focus ring" },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────

/** All primitive tokens flattened */
export const allPrimitives = primitiveGroups.flatMap((g) => g.tokens);

/** Count how many semantic tokens reference a given primitive id */
export function primRefCount(primId: string): number {
  return semanticTokens.filter((s) => s.primitiveRef === primId).length;
}

/** Count how many component tokens reference a given semantic id */
export function semRefCount(semId: string): number {
  return componentTokens.filter((c) => c.semanticRef === semId).length;
}

/** Count total refs from a primitive (through semantics to components) */
export function primTotalRefs(primId: string): number {
  const sems = semanticTokens.filter((s) => s.primitiveRef === primId);
  const compCount = sems.reduce(
    (acc, s) => acc + componentTokens.filter((c) => c.semanticRef === s.id).length,
    0
  );
  return sems.length + compCount;
}

/** Given a hovered token id, return the full chain of connected token ids */
export function getHoverChain(id: string): Set<string> {
  const chain = new Set<string>([id]);

  const isPrim = allPrimitives.some((t) => t.id === id);
  const isSem  = semanticTokens.some((t) => t.id === id);
  const isComp = componentTokens.some((t) => t.id === id);

  if (isPrim) {
    const linkedSems = semanticTokens.filter((s) => s.primitiveRef === id);
    linkedSems.forEach((s) => {
      chain.add(s.id);
      componentTokens.filter((c) => c.semanticRef === s.id).forEach((c) => chain.add(c.id));
    });
  } else if (isSem) {
    const sem = semanticTokens.find((s) => s.id === id)!;
    chain.add(sem.primitiveRef);
    componentTokens.filter((c) => c.semanticRef === id).forEach((c) => chain.add(c.id));
  } else if (isComp) {
    const comp = componentTokens.find((c) => c.id === id)!;
    chain.add(comp.semanticRef);
    const sem = semanticTokens.find((s) => s.id === comp.semanticRef);
    if (sem) chain.add(sem.primitiveRef);
  }

  return chain;
}

/** Group semantic tokens by category */
export function groupedSemantics(): Record<string, SemanticToken[]> {
  return semanticTokens.reduce<Record<string, SemanticToken[]>>((acc, t) => {
    if (!acc[t.category]) acc[t.category] = [];
    acc[t.category].push(t);
    return acc;
  }, {});
}

/** Group component tokens by component name */
export function groupedComponents(): Record<string, ComponentToken[]> {
  return componentTokens.reduce<Record<string, ComponentToken[]>>((acc, t) => {
    if (!acc[t.component]) acc[t.component] = [];
    acc[t.component].push(t);
    return acc;
  }, {});
}
