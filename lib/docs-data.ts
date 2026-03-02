export type NavSection = {
  title: string;
  items: NavItem[];
};

export type NavItem = {
  label: string;
  slug: string;
  href?: string;  // overrides the default /docs/${slug} if set
  icon?: string;
};

export type ComponentDoc = {
  name: string;
  description: string;
  slug: string;
  states: StateExample[];
  types: TypeExample[];
  tokens: DesignToken[];
};

export type StateExample = {
  state: string;
  description: string;
  preview: string; // JSX string to render
  code: string;
};

export type TypeExample = {
  variant: string;
  description: string;
  preview: string;
  code: string;
};

export type DesignToken = {
  name: string;
  value: string;
  usage: string;
  category: string;
};

export const navigation: NavSection[] = [
  {
    title: "Foundations",
    items: [
      { label: "Colors", slug: "colors" },
      { label: "Typography", slug: "typography" },
      { label: "Spacing", slug: "spacing" },
      { label: "Shadows", slug: "shadows" },
    ],
  },
  {
    title: "Components",
    items: [
      { label: "Button", slug: "button" },
      { label: "Badge", slug: "badge" },
      { label: "Input", slug: "input" },
      { label: "Checkbox", slug: "checkbox" },
      { label: "Card", slug: "card" },
      { label: "Dialog", slug: "dialog" },
      { label: "Toast", slug: "toast" },
      { label: "Tooltip", slug: "tooltip" },
    ],
  },
  {
    title: "Patterns",
    items: [
      { label: "Form Layout", slug: "form-layout" },
      { label: "Navigation", slug: "navigation" },
    ],
  },
  {
    title: "Tools",
    items: [
      { label: "Token Graph", slug: "token-graph", href: "/token-graph" },
    ],
  },
];

export const componentDocs: Record<string, ComponentDoc> = {
  button: {
    name: "Button",
    description:
      "Triggers an action or event, such as submitting a form, opening a dialog, or performing a delete operation.",
    slug: "button",
    states: [
      {
        state: "Default",
        description: "Baseline component styling. Ready for user interaction.",
        preview: "default",
        code: `<button
  className="inline-flex items-center justify-center
    rounded-md px-4 py-2 text-sm font-medium
    bg-terracotta-600 text-white
    transition-colors"
>
  Button
</button>`,
      },
      {
        state: "Hover",
        description:
          "Pointer hover feedback. Darkens background to terracotta-700.",
        preview: "hover",
        code: `<button
  className="inline-flex items-center justify-center
    rounded-md px-4 py-2 text-sm font-medium
    bg-terracotta-600 text-white
    hover:bg-terracotta-700
    transition-colors"
>
  Button
</button>`,
      },
      {
        state: "Focus",
        description: "Keyboard focus outline. Adds ring for accessibility.",
        preview: "focus",
        code: `<button
  className="inline-flex items-center justify-center
    rounded-md px-4 py-2 text-sm font-medium
    bg-terracotta-600 text-white
    focus:outline-none focus:ring-2
    focus:ring-terracotta-600 focus:ring-offset-2
    transition-colors"
>
  Button
</button>`,
      },
      {
        state: "Pressed",
        description: "Active press feedback. Scale down with darker fill.",
        preview: "pressed",
        code: `<button
  className="inline-flex items-center justify-center
    rounded-md px-4 py-2 text-sm font-medium
    bg-terracotta-600 text-white
    active:bg-terracotta-700 active:scale-[0.98]
    transition-all"
>
  Button
</button>`,
      },
      {
        state: "Disabled",
        description:
          "Muted, non-interactive state. Reduces opacity and removes pointer events.",
        preview: "disabled",
        code: `<button
  disabled
  className="inline-flex items-center justify-center
    rounded-md px-4 py-2 text-sm font-medium
    bg-terracotta-600 text-white
    opacity-40 cursor-not-allowed
    pointer-events-none"
>
  Button
</button>`,
      },
    ],
    types: [
      {
        variant: "Primary",
        description: "Main call-to-action. Use sparingly, one per view.",
        preview: "primary",
        code: `<Button variant="primary">Primary</Button>
// className: bg-terracotta-600 text-white hover:bg-terracotta-700`,
      },
      {
        variant: "Secondary",
        description:
          "Supporting action. Pairs with primary on the same surface.",
        preview: "secondary",
        code: `<Button variant="secondary">Secondary</Button>
// className: bg-gray-100 text-gray-900 hover:bg-gray-200`,
      },
      {
        variant: "Outline",
        description:
          "Border-only button for tertiary actions or less prominent CTAs.",
        preview: "outline",
        code: `<Button variant="outline">Outline</Button>
// className: border border-gray-300 bg-white text-gray-700
//            hover:bg-gray-50`,
      },
      {
        variant: "Ghost",
        description:
          "Minimal presence. Use inside menus, toolbars, or inline actions.",
        preview: "ghost",
        code: `<Button variant="ghost">Ghost</Button>
// className: text-gray-700 hover:bg-gray-100`,
      },
      {
        variant: "Destructive",
        description:
          "Irreversible or high-risk actions. Typically delete or remove.",
        preview: "destructive",
        code: `<Button variant="destructive">Delete</Button>
// className: bg-red-600 text-white hover:bg-red-700`,
      },
    ],
    tokens: [
      {
        name: "--btn-bg-primary",
        value: "#C67C4E",
        usage: "Primary button background",
        category: "Color",
      },
      {
        name: "--btn-bg-primary-hover",
        value: "#A8623A",
        usage: "Primary button hover state",
        category: "Color",
      },
      {
        name: "--btn-text-primary",
        value: "#FFFFFF",
        usage: "Primary button label",
        category: "Color",
      },
      {
        name: "--btn-radius",
        value: "6px",
        usage: "Button border radius",
        category: "Border",
      },
      {
        name: "--btn-padding-x",
        value: "16px",
        usage: "Horizontal padding",
        category: "Spacing",
      },
      {
        name: "--btn-padding-y",
        value: "8px",
        usage: "Vertical padding",
        category: "Spacing",
      },
      {
        name: "--btn-font-size",
        value: "14px",
        usage: "Button label size",
        category: "Typography",
      },
      {
        name: "--btn-font-weight",
        value: "500",
        usage: "Button label weight",
        category: "Typography",
      },
      {
        name: "--btn-transition",
        value: "150ms ease",
        usage: "State transition timing",
        category: "Motion",
      },
      {
        name: "--btn-focus-ring",
        value: "2px solid #C67C4E",
        usage: "Keyboard focus ring",
        category: "Accessibility",
      },
      {
        name: "--btn-disabled-opacity",
        value: "0.4",
        usage: "Disabled state opacity",
        category: "State",
      },
    ],
  },
  badge: {
    name: "Badge",
    description:
      "A small label used to highlight status, category, or count information alongside other elements.",
    slug: "badge",
    states: [
      {
        state: "Default",
        description: "Standard badge with label text. Neutral styling.",
        preview: "default",
        code: `<span
  className="inline-flex items-center rounded-full
    px-2.5 py-0.5 text-xs font-medium
    bg-gray-100 text-gray-700"
>
  Badge
</span>`,
      },
      {
        state: "Hover",
        description:
          "Hover state when badge is interactive (clickable/filterable).",
        preview: "hover",
        code: `<span
  className="inline-flex items-center rounded-full
    px-2.5 py-0.5 text-xs font-medium cursor-pointer
    bg-gray-100 text-gray-700
    hover:bg-gray-200 transition-colors"
>
  Badge
</span>`,
      },
      {
        state: "Active",
        description:
          "Selected/active filter badge. Terracotta fill indicates selection.",
        preview: "active",
        code: `<span
  className="inline-flex items-center rounded-full
    px-2.5 py-0.5 text-xs font-medium
    bg-terracotta-600 text-white"
>
  Active
</span>`,
      },
      {
        state: "Disabled",
        description: "Non-interactive badge in a disabled context.",
        preview: "disabled",
        code: `<span
  className="inline-flex items-center rounded-full
    px-2.5 py-0.5 text-xs font-medium
    bg-gray-100 text-gray-400 opacity-50"
>
  Disabled
</span>`,
      },
    ],
    types: [
      {
        variant: "Default",
        description: "Neutral badge for general categorization.",
        preview: "default",
        code: `<Badge>Default</Badge>
// className: bg-gray-100 text-gray-700`,
      },
      {
        variant: "Brand",
        description:
          "Terracotta brand highlight for featured or primary categories.",
        preview: "brand",
        code: `<Badge variant="brand">Brand</Badge>
// className: bg-terracotta-200 text-terracotta-700`,
      },
      {
        variant: "Success",
        description: "Positive status — completed, active, approved.",
        preview: "success",
        code: `<Badge variant="success">Success</Badge>
// className: bg-green-100 text-green-700`,
      },
      {
        variant: "Warning",
        description: "Caution state — pending, in review, expiring soon.",
        preview: "warning",
        code: `<Badge variant="warning">Warning</Badge>
// className: bg-amber-100 text-amber-700`,
      },
      {
        variant: "Destructive",
        description: "Error or danger state — failed, rejected, critical.",
        preview: "destructive",
        code: `<Badge variant="destructive">Error</Badge>
// className: bg-red-100 text-red-700`,
      },
    ],
    tokens: [
      {
        name: "--badge-radius",
        value: "9999px",
        usage: "Badge border radius (pill)",
        category: "Border",
      },
      {
        name: "--badge-px",
        value: "10px",
        usage: "Horizontal padding",
        category: "Spacing",
      },
      {
        name: "--badge-py",
        value: "2px",
        usage: "Vertical padding",
        category: "Spacing",
      },
      {
        name: "--badge-font-size",
        value: "12px",
        usage: "Badge label size",
        category: "Typography",
      },
      {
        name: "--badge-font-weight",
        value: "500",
        usage: "Badge label weight",
        category: "Typography",
      },
      {
        name: "--badge-bg-default",
        value: "#f3f4f6",
        usage: "Default badge background",
        category: "Color",
      },
      {
        name: "--badge-text-default",
        value: "#374151",
        usage: "Default badge text",
        category: "Color",
      },
      {
        name: "--badge-bg-brand",
        value: "#F3D9CF",
        usage: "Brand badge background",
        category: "Color",
      },
      {
        name: "--badge-text-brand",
        value: "#A8623A",
        usage: "Brand badge text",
        category: "Color",
      },
    ],
  },
  input: {
    name: "Input",
    description:
      "A text field that allows users to enter and edit single-line text values.",
    slug: "input",
    states: [
      {
        state: "Default",
        description:
          "Empty input, ready for entry. Subtle border on white background.",
        preview: "default",
        code: `<input
  type="text"
  placeholder="Enter text..."
  className="w-full rounded-md border border-gray-300
    bg-white px-3 py-2 text-sm text-gray-900
    placeholder:text-gray-400
    focus:outline-none
    transition-colors"
/>`,
      },
      {
        state: "Focus",
        description:
          "Active input receiving keyboard input. Terracotta ring for brand consistency.",
        preview: "focus",
        code: `<input
  type="text"
  className="w-full rounded-md border border-terracotta-600
    bg-white px-3 py-2 text-sm text-gray-900
    ring-2 ring-terracotta-600 ring-offset-0
    focus:outline-none"
/>`,
      },
      {
        state: "Filled",
        description: "Input with user-entered content.",
        preview: "filled",
        code: `<input
  type="text"
  value="John Doe"
  className="w-full rounded-md border border-gray-300
    bg-white px-3 py-2 text-sm text-gray-900
    focus:outline-none focus:ring-2
    focus:ring-terracotta-600"
/>`,
      },
      {
        state: "Error",
        description:
          "Validation failed. Red border and helper text indicate the issue.",
        preview: "error",
        code: `<div className="space-y-1">
  <input
    type="text"
    className="w-full rounded-md border border-red-500
      bg-white px-3 py-2 text-sm text-gray-900
      focus:outline-none focus:ring-2 focus:ring-red-500"
  />
  <p className="text-xs text-red-600">This field is required.</p>
</div>`,
      },
      {
        state: "Disabled",
        description:
          "Non-interactive. Grayed background signals unavailability.",
        preview: "disabled",
        code: `<input
  disabled
  type="text"
  placeholder="Disabled"
  className="w-full rounded-md border border-gray-200
    bg-gray-100 px-3 py-2 text-sm text-gray-400
    cursor-not-allowed opacity-60"
/>`,
      },
    ],
    types: [
      {
        variant: "Default",
        description: "Standard single-line text input.",
        preview: "default",
        code: `<Input type="text" placeholder="Enter text..." />`,
      },
      {
        variant: "With Label",
        description: "Input paired with a descriptive label above.",
        preview: "labeled",
        code: `<div className="space-y-1.5">
  <label className="text-sm font-medium text-gray-700">
    Email address
  </label>
  <Input type="email" placeholder="you@example.com" />
</div>`,
      },
      {
        variant: "With Icon",
        description: "Leading icon for context — search, email, password.",
        preview: "icon",
        code: `<div className="relative">
  <Search className="absolute left-3 top-1/2 -translate-y-1/2
    h-4 w-4 text-gray-400" />
  <Input
    type="search"
    placeholder="Search..."
    className="pl-9"
  />
</div>`,
      },
      {
        variant: "Textarea",
        description: "Multi-line variant for longer text entry.",
        preview: "textarea",
        code: `<textarea
  rows={4}
  placeholder="Write your message..."
  className="w-full rounded-md border border-gray-300
    bg-white px-3 py-2 text-sm text-gray-900
    placeholder:text-gray-400 resize-none
    focus:outline-none focus:ring-2
    focus:ring-terracotta-600 focus:border-terracotta-600"
/>`,
      },
    ],
    tokens: [
      {
        name: "--input-height",
        value: "36px",
        usage: "Default input height",
        category: "Spacing",
      },
      {
        name: "--input-radius",
        value: "6px",
        usage: "Input border radius",
        category: "Border",
      },
      {
        name: "--input-border",
        value: "#d1d5db",
        usage: "Default border color",
        category: "Color",
      },
      {
        name: "--input-border-focus",
        value: "#C67C4E",
        usage: "Focus border color",
        category: "Color",
      },
      {
        name: "--input-border-error",
        value: "#ef4444",
        usage: "Error border color",
        category: "Color",
      },
      {
        name: "--input-bg",
        value: "#ffffff",
        usage: "Input background",
        category: "Color",
      },
      {
        name: "--input-bg-disabled",
        value: "#f3f4f6",
        usage: "Disabled background",
        category: "Color",
      },
      {
        name: "--input-text",
        value: "#111827",
        usage: "Input text color",
        category: "Color",
      },
      {
        name: "--input-placeholder",
        value: "#9ca3af",
        usage: "Placeholder text",
        category: "Color",
      },
      {
        name: "--input-px",
        value: "12px",
        usage: "Horizontal padding",
        category: "Spacing",
      },
      {
        name: "--input-font-size",
        value: "14px",
        usage: "Input font size",
        category: "Typography",
      },
    ],
  },
  colors: {
    name: "Colors",
    description:
      "The design system color palette, including brand, semantic, and neutral tokens.",
    slug: "colors",
    states: [
      {
        state: "Brand Palette",
        description:
          "Core Terracotta brand colors used for primary actions and highlights.",
        preview: "brand",
        code: `/* Terracotta Brand Scale */
--color-terracotta-200: #F3D9CF; /* Light backgrounds, borders */
--color-terracotta-400: #D99A7D; /* Icons, secondary elements */
--color-terracotta-600: #C67C4E; /* Primary CTAs, buttons */
--color-terracotta-700: #A8623A; /* Hover states */

/* Tailwind custom config */
colors: {
  terracotta: {
    200: '#F3D9CF',
    400: '#D99A7D',
    600: '#C67C4E',
    700: '#A8623A',
  }
}`,
      },
      {
        state: "Neutral Scale",
        description:
          "Gray scale used for backgrounds, surfaces, borders, and text.",
        preview: "neutral",
        code: `/* Light Mode Backgrounds */
--color-gray-100: #f3f4f6;  /* Primary app background */
--color-gray-200: #e5e7eb;  /* Sidebar, secondary surfaces */
--color-gray-300: #d1d5db;  /* Borders, dividers */
--color-gray-400: #9ca3af;  /* Placeholder text */
--color-gray-700: #374151;  /* Secondary text */
--color-gray-900: #111827;  /* Primary text */
--color-white:    #ffffff;  /* Cards, inputs */`,
      },
      {
        state: "Semantic Colors",
        description:
          "Status and feedback colors: success, warning, error, info.",
        preview: "semantic",
        code: `/* Semantic — Success */
--color-success-bg:   #dcfce7;
--color-success-text: #15803d;

/* Semantic — Warning */
--color-warning-bg:   #fef9c3;
--color-warning-text: #a16207;

/* Semantic — Error */
--color-error-bg:   #fee2e2;
--color-error-text: #b91c1c;

/* Semantic — Info */
--color-info-bg:   #dbeafe;
--color-info-text: #1d4ed8;`,
      },
    ],
    types: [
      {
        variant: "Primary",
        description: "Terracotta 600 — main CTA, interactive elements.",
        preview: "primary",
        code: `className="bg-terracotta-600 text-white"
// #C67C4E`,
      },
      {
        variant: "Secondary",
        description:
          "Terracotta 200 — subtle highlights and tinted surfaces.",
        preview: "secondary",
        code: `className="bg-terracotta-200 text-terracotta-700"
// #F3D9CF / #A8623A`,
      },
      {
        variant: "Neutral",
        description: "Gray scale for text, borders, and backgrounds.",
        preview: "neutral",
        code: `className="bg-gray-100 border-gray-300 text-gray-900"
// #f3f4f6 / #d1d5db / #111827`,
      },
    ],
    tokens: [
      {
        name: "--color-brand-primary",
        value: "#C67C4E",
        usage: "Primary brand color",
        category: "Brand",
      },
      {
        name: "--color-brand-hover",
        value: "#A8623A",
        usage: "Brand hover state",
        category: "Brand",
      },
      {
        name: "--color-brand-light",
        value: "#F3D9CF",
        usage: "Brand tinted background",
        category: "Brand",
      },
      {
        name: "--color-bg-app",
        value: "#f3f4f6",
        usage: "App background",
        category: "Background",
      },
      {
        name: "--color-bg-card",
        value: "#ffffff",
        usage: "Card surface",
        category: "Background",
      },
      {
        name: "--color-bg-secondary",
        value: "#e5e7eb",
        usage: "Sidebar, secondary bg",
        category: "Background",
      },
      {
        name: "--color-border",
        value: "#d1d5db",
        usage: "Default borders",
        category: "Border",
      },
      {
        name: "--color-text-primary",
        value: "#111827",
        usage: "Headings, body",
        category: "Text",
      },
      {
        name: "--color-text-secondary",
        value: "#6b7280",
        usage: "Supporting text",
        category: "Text",
      },
      {
        name: "--color-text-muted",
        value: "#9ca3af",
        usage: "Placeholders, hints",
        category: "Text",
      },
    ],
  },
  typography: {
    name: "Typography",
    description:
      "The type scale, font weights, and line heights that define visual hierarchy across the system.",
    slug: "typography",
    states: [
      {
        state: "Display",
        description: "Largest text — hero headings, page titles.",
        preview: "display",
        code: `<h1 className="text-4xl font-bold tracking-tight text-gray-900">
  Display Heading
</h1>
/* font-size: 36px | line-height: 40px | weight: 700 */`,
      },
      {
        state: "Heading",
        description: "Section and component headings.",
        preview: "heading",
        code: `<h2 className="text-2xl font-semibold text-gray-900">Section Heading</h2>
<h3 className="text-xl font-semibold text-gray-900">Sub Heading</h3>
<h4 className="text-lg font-medium text-gray-900">Card Heading</h4>`,
      },
      {
        state: "Body",
        description: "Default prose text for descriptions and content.",
        preview: "body",
        code: `<p className="text-base text-gray-700 leading-relaxed">
  Body Regular — The primary reading size used across descriptions,
  documentation, and long-form content.
</p>
<p className="text-sm text-gray-600 leading-relaxed">
  Body Small — Compact body for secondary info, helper text.
</p>`,
      },
      {
        state: "Code",
        description:
          "Monospace for code snippets, tokens, and technical values.",
        preview: "code",
        code: `<code className="font-mono text-sm bg-gray-100
  px-1.5 py-0.5 rounded text-terracotta-700">
  font-mono text-sm
</code>`,
      },
    ],
    types: [
      {
        variant: "Inter",
        description:
          "Primary typeface — clean geometric sans-serif for all UI text.",
        preview: "inter",
        code: `import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });
// className: font-sans`,
      },
      {
        variant: "JetBrains Mono",
        description:
          "Code font — used exclusively in code blocks and token values.",
        preview: "mono",
        code: `// tailwind.config.ts
fontFamily: {
  mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
}
// className: font-mono`,
      },
    ],
    tokens: [
      {
        name: "--text-xs",
        value: "12px / 16px",
        usage: "Labels, captions",
        category: "Scale",
      },
      {
        name: "--text-sm",
        value: "14px / 20px",
        usage: "Body small, UI text",
        category: "Scale",
      },
      {
        name: "--text-base",
        value: "16px / 24px",
        usage: "Default body",
        category: "Scale",
      },
      {
        name: "--text-lg",
        value: "18px / 28px",
        usage: "Card headings",
        category: "Scale",
      },
      {
        name: "--text-xl",
        value: "20px / 28px",
        usage: "Sub headings",
        category: "Scale",
      },
      {
        name: "--text-2xl",
        value: "24px / 32px",
        usage: "Section headings",
        category: "Scale",
      },
      {
        name: "--text-4xl",
        value: "36px / 40px",
        usage: "Display / page title",
        category: "Scale",
      },
      {
        name: "--font-normal",
        value: "400",
        usage: "Body text",
        category: "Weight",
      },
      {
        name: "--font-medium",
        value: "500",
        usage: "UI labels, buttons",
        category: "Weight",
      },
      {
        name: "--font-semibold",
        value: "600",
        usage: "Section headings",
        category: "Weight",
      },
      {
        name: "--font-bold",
        value: "700",
        usage: "Display headings",
        category: "Weight",
      },
    ],
  },
  card: {
    name: "Card",
    description:
      "A contained surface that groups related content and actions into a distinct visual unit.",
    slug: "card",
    states: [
      {
        state: "Default",
        description:
          "Static card at rest. White surface with subtle border and shadow.",
        preview: "default",
        code: `<div className="rounded-lg border border-gray-200
  bg-white p-6 shadow-sm">
  <h3 className="text-base font-semibold text-gray-900">
    Card Title
  </h3>
  <p className="mt-1 text-sm text-gray-500">
    Supporting description text.
  </p>
</div>`,
      },
      {
        state: "Hover",
        description:
          "Interactive card hover — lifted shadow indicates clickability.",
        preview: "hover",
        code: `<div className="rounded-lg border border-gray-200
  bg-white p-6 shadow-sm cursor-pointer
  hover:shadow-md hover:border-gray-300
  transition-all duration-150">
  <h3 className="text-base font-semibold text-gray-900">
    Card Title
  </h3>
  <p className="mt-1 text-sm text-gray-500">
    Supporting description text.
  </p>
</div>`,
      },
      {
        state: "Selected",
        description:
          "Active/selected card — terracotta border highlights selection.",
        preview: "selected",
        code: `<div className="rounded-lg border-2 border-terracotta-600
  bg-terracotta-200/30 p-6 shadow-sm">
  <h3 className="text-base font-semibold text-gray-900">
    Selected Card
  </h3>
  <p className="mt-1 text-sm text-gray-500">
    This card is currently selected.
  </p>
</div>`,
      },
    ],
    types: [
      {
        variant: "Default",
        description: "Standard white card with border and shadow.",
        preview: "default",
        code: `<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content goes here.</CardContent>
</Card>`,
      },
      {
        variant: "Tinted",
        description:
          "Terracotta-tinted surface for featured or promotional content.",
        preview: "tinted",
        code: `<div className="rounded-lg bg-terracotta-200/40
  border border-terracotta-200 p-6">
  <h3 className="font-semibold text-terracotta-700">
    Featured
  </h3>
</div>`,
      },
      {
        variant: "Flat",
        description: "No shadow — sits flush within gray backgrounds.",
        preview: "flat",
        code: `<div className="rounded-lg border border-gray-200
  bg-white p-6">
  <h3 className="font-semibold text-gray-900">Flat Card</h3>
</div>`,
      },
    ],
    tokens: [
      {
        name: "--card-radius",
        value: "8px",
        usage: "Card border radius",
        category: "Border",
      },
      {
        name: "--card-border",
        value: "#e5e7eb",
        usage: "Default card border",
        category: "Color",
      },
      {
        name: "--card-border-hover",
        value: "#d1d5db",
        usage: "Hover border",
        category: "Color",
      },
      {
        name: "--card-border-selected",
        value: "#C67C4E",
        usage: "Selected state border",
        category: "Color",
      },
      {
        name: "--card-bg",
        value: "#ffffff",
        usage: "Card surface",
        category: "Color",
      },
      {
        name: "--card-shadow",
        value: "0 1px 3px rgba(0,0,0,.1)",
        usage: "Default shadow",
        category: "Shadow",
      },
      {
        name: "--card-shadow-hover",
        value: "0 4px 6px rgba(0,0,0,.1)",
        usage: "Hover shadow",
        category: "Shadow",
      },
      {
        name: "--card-padding",
        value: "24px",
        usage: "Inner padding",
        category: "Spacing",
      },
    ],
  },
};
