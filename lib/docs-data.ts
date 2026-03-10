export type NavSection = {
  title: string;
  items: NavItem[];
};

export type ComponentStatus = 'stable' | 'beta' | 'experimental' | 'deprecated';

export type NavItem = {
  label: string;
  slug: string;
  href?: string;  // overrides the default /docs/${slug} if set
  icon?: string;
  status?: ComponentStatus;
};

export type PropDef = {
  name: string;
  type: string;
  default: string;
  required: boolean;
  description: string;
};

export type PropSchemaField =
  | { type: 'select'; options: string[]; default: string }
  | { type: 'boolean'; default: boolean }
  | { type: 'string'; default: string }
  | { type: 'number'; default: number; min?: number; max?: number }
  | { type: 'color'; default: string };

export type PropSchema = Record<string, PropSchemaField>;

export type ComponentDoc = {
  name: string;
  description: string;
  slug: string;
  status?: ComponentStatus;
  states: StateExample[];
  types: TypeExample[];
  tokens: DesignToken[];
  props?: PropDef[];
  propSchema?: PropSchema;
  /** Complete single-block implementation showing all variants + states */
  fullCode?: string;
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
      { label: "Colors", slug: "colors", status: "stable" },
      { label: "Typography", slug: "typography", status: "stable" },
      { label: "Spacing", slug: "spacing", status: "beta" },
      { label: "Shadows", slug: "shadows", status: "beta" },
    ],
  },
  {
    title: "Components",
    items: [
      { label: "Button", slug: "button", status: "stable" },
      { label: "Badge", slug: "badge", status: "stable" },
      { label: "Input", slug: "input", status: "stable" },
      { label: "Checkbox", slug: "checkbox", status: "beta" },
      { label: "Card", slug: "card", status: "stable" },
      { label: "Dialog", slug: "dialog", status: "experimental" },
      { label: "Toast", slug: "toast", status: "experimental" },
      { label: "Tooltip", slug: "tooltip", status: "beta" },
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
    status: "stable",
    states: [
      {
        state: "Default",
        description: "Baseline component styling. Ready for user interaction.",
        preview: "default",
        code: `<button className="
  bg-[var(--btn-bg-primary)] text-[var(--btn-text-primary)]
  rounded-[var(--btn-radius)]
  px-[var(--btn-padding-x)] py-[var(--btn-padding-y)]
  text-sm font-medium transition-all duration-150
  inline-flex items-center justify-center
">
  Button
</button>`,
      },
      {
        state: "Hover",
        description: "Pointer hover feedback. Darkens background to brand-700.",
        preview: "hover",
        code: `{/* Add to base button className: */}
hover:bg-[var(--btn-bg-primary-hover)]`,
      },
      {
        state: "Focus",
        description: "Keyboard focus outline. Adds ring for accessibility.",
        preview: "focus",
        code: `{/* Add to base button className: */}
focus:outline-none
focus:ring-2
focus:ring-[var(--btn-focus-ring-color)]
focus:ring-offset-2`,
      },
      {
        state: "Pressed",
        description: "Active press feedback. Scale down with darker fill.",
        preview: "pressed",
        code: `{/* Add to base button className: */}
active:bg-[var(--btn-bg-primary-hover)]
active:scale-[0.97]`,
      },
      {
        state: "Disabled",
        description: "Muted, non-interactive state. Reduces opacity and removes pointer events.",
        preview: "disabled",
        code: `{/* Add to base button className: */}
disabled:opacity-[var(--btn-disabled-opacity)]
disabled:cursor-not-allowed
disabled:pointer-events-none`,
      },
    ],
    types: [
      {
        variant: "Primary",
        description: "Main call-to-action. Use sparingly, one per view.",
        preview: "primary",
        code: `<button className="
  bg-[var(--btn-bg-primary)] text-[var(--btn-text-primary)]
  hover:bg-[var(--btn-bg-primary-hover)]
  rounded-[var(--btn-radius)] px-[var(--btn-padding-x)] py-[var(--btn-padding-y)]
  text-sm font-medium transition-all duration-150
">Button</button>`,
      },
      {
        variant: "Secondary",
        description: "Supporting action. Pairs with primary on the same surface.",
        preview: "secondary",
        code: `<button className="
  bg-gray-100 text-gray-900 hover:bg-gray-200
  rounded-[var(--btn-radius)] px-[var(--btn-padding-x)] py-[var(--btn-padding-y)]
  text-sm font-medium transition-all duration-150
">Button</button>`,
      },
      {
        variant: "Outline",
        description: "Border-only button for tertiary actions or less prominent CTAs.",
        preview: "outline",
        code: `<button className="
  border border-gray-300 bg-white text-gray-700 hover:bg-gray-50
  rounded-[var(--btn-radius)] px-[var(--btn-padding-x)] py-[var(--btn-padding-y)]
  text-sm font-medium transition-all duration-150
">Button</button>`,
      },
      {
        variant: "Ghost",
        description: "Minimal presence. Use inside menus, toolbars, or inline actions.",
        preview: "ghost",
        code: `<button className="
  bg-transparent text-gray-700 hover:bg-gray-100
  rounded-[var(--btn-radius)] px-[var(--btn-padding-x)] py-[var(--btn-padding-y)]
  text-sm font-medium transition-all duration-150
">Button</button>`,
      },
      {
        variant: "Destructive",
        description: "Irreversible or high-risk actions. Typically delete or remove.",
        preview: "destructive",
        code: `<button className="
  bg-red-600 text-white hover:bg-red-700
  rounded-[var(--btn-radius)] px-[var(--btn-padding-x)] py-[var(--btn-padding-y)]
  text-sm font-medium transition-all duration-150
">Button</button>`,
      },
    ],
    tokens: [
      {
        name: "--btn-bg-primary",
        value: "#2563EB",
        usage: "Primary button background",
        category: "Color",
      },
      {
        name: "--btn-bg-primary-hover",
        value: "#1D4ED8",
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
        value: "2px solid #2563EB",
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
    props: [
      { name: 'variant', type: "'primary' | 'secondary' | 'ghost' | 'outline' | 'destructive'", default: "'primary'", required: false, description: 'Visual style of the button' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", required: false, description: 'Size of the button' },
      { name: 'disabled', type: 'boolean', default: 'false', required: false, description: 'Disables interaction and applies muted styles' },
      { name: 'children', type: 'React.ReactNode', default: '—', required: true, description: 'Button label or content' },
      { name: 'onClick', type: '() => void', default: '—', required: false, description: 'Click event handler' },
      { name: 'className', type: 'string', default: '—', required: false, description: 'Additional CSS classes' },
    ],
    propSchema: {
      variant: { type: 'select', options: ['primary', 'secondary', 'ghost', 'outline', 'destructive'], default: 'primary' },
      state:   { type: 'select', options: ['default', 'hover', 'focus', 'pressed', 'disabled'], default: 'default' },
      size:    { type: 'select', options: ['sm', 'md', 'lg'], default: 'md' },
      label:   { type: 'string', default: 'Button' },
    },
    fullCode: `// Button.tsx — complete Tailwind + token implementation
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
type Size    = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?:    Size;
}

// Base classes shared by every variant
const base =
  'inline-flex items-center justify-center font-medium transition-all duration-150 ' +
  'rounded-[var(--btn-radius)] ' +
  'focus:outline-none focus:ring-2 focus:ring-[var(--btn-focus-ring-color)] focus:ring-offset-2 ' +
  'active:scale-[0.97] ' +
  'disabled:opacity-[var(--btn-disabled-opacity)] disabled:cursor-not-allowed disabled:pointer-events-none';

// Variant-specific colour classes (reference design tokens where available)
const variantClass: Record<Variant, string> = {
  primary:
    'bg-[var(--btn-bg-primary)] text-[var(--btn-text-primary)] ' +
    'hover:bg-[var(--btn-bg-primary-hover)]',
  secondary:
    'bg-gray-100 text-gray-900 hover:bg-gray-200',
  outline:
    'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50',
  ghost:
    'bg-transparent text-gray-700 hover:bg-gray-100',
  destructive:
    'bg-red-600 text-white hover:bg-red-700',
};

// Size classes (md reuses token variables directly)
const sizeClass: Record<Size, string> = {
  sm: 'px-3 py-1 text-xs',
  md: 'px-[var(--btn-padding-x)] py-[var(--btn-padding-y)] text-sm',
  lg: 'px-6 py-3 text-base',
};

export function Button({
  variant = 'primary',
  size    = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(base, variantClass[variant], sizeClass[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}`,
  },
  badge: {
    name: "Badge",
    description:
      "A small label used to highlight status, category, or count information alongside other elements.",
    slug: "badge",
    status: "stable",
    states: [
      {
        state: "Default",
        description: "Standard badge with label text. Neutral styling.",
        preview: "default",
        code: `<span className="
  bg-[var(--badge-bg-default)] text-[var(--badge-text-default)]
  rounded-[var(--badge-radius)]
  px-[var(--badge-px)] py-[var(--badge-py)]
  text-xs font-medium
  inline-flex items-center
">
  Badge
</span>`,
      },
      {
        state: "Hover",
        description: "Hover state when badge is interactive (clickable/filterable).",
        preview: "hover",
        code: `{/* Add to badge className when interactive: */}
hover:bg-gray-200 cursor-pointer`,
      },
      {
        state: "Active",
        description: "Selected/active filter badge. Brand blue fill indicates selection.",
        preview: "active",
        code: `{/* Replace colour classes with: */}
bg-[var(--btn-bg-primary)] text-[var(--btn-text-primary)]`,
      },
      {
        state: "Disabled",
        description: "Non-interactive badge in a disabled context.",
        preview: "disabled",
        code: `{/* Add to badge className: */}
opacity-50 pointer-events-none`,
      },
    ],
    types: [
      {
        variant: "Default",
        description: "Neutral badge for general categorization.",
        preview: "default",
        code: `<span className="bg-[var(--badge-bg-default)] text-[var(--badge-text-default)] rounded-[var(--badge-radius)] px-[var(--badge-px)] py-[var(--badge-py)] text-xs font-medium">Default</span>`,
      },
      {
        variant: "Brand",
        description: "Brand blue brand highlight for featured or primary categories.",
        preview: "brand",
        code: `<span className="bg-[var(--badge-bg-brand)] text-[var(--badge-text-brand)] rounded-[var(--badge-radius)] px-[var(--badge-px)] py-[var(--badge-py)] text-xs font-medium">Brand</span>`,
      },
      {
        variant: "Success",
        description: "Positive status — completed, active, approved.",
        preview: "success",
        code: `<span className="bg-green-100 text-green-700 rounded-[var(--badge-radius)] px-[var(--badge-px)] py-[var(--badge-py)] text-xs font-medium">Success</span>`,
      },
      {
        variant: "Warning",
        description: "Caution state — pending, in review, expiring soon.",
        preview: "warning",
        code: `<span className="bg-amber-100 text-amber-700 rounded-[var(--badge-radius)] px-[var(--badge-px)] py-[var(--badge-py)] text-xs font-medium">Warning</span>`,
      },
      {
        variant: "Destructive",
        description: "Error or danger state — failed, rejected, critical.",
        preview: "destructive",
        code: `<span className="bg-red-100 text-red-700 rounded-[var(--badge-radius)] px-[var(--badge-px)] py-[var(--badge-py)] text-xs font-medium">Destructive</span>`,
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
        value: "#DBEAFE",
        usage: "Brand badge background",
        category: "Color",
      },
      {
        name: "--badge-text-brand",
        value: "#1D4ED8",
        usage: "Brand badge text",
        category: "Color",
      },
    ],
    props: [
      { name: 'variant', type: "'default' | 'brand' | 'success' | 'warning' | 'destructive'", default: "'default'", required: false, description: 'Visual style of the badge' },
      { name: 'children', type: 'React.ReactNode', default: '—', required: true, description: 'Badge label text' },
      { name: 'className', type: 'string', default: '—', required: false, description: 'Additional CSS classes' },
    ],
    propSchema: {
      variant: { type: 'select', options: ['default', 'brand', 'success', 'warning', 'destructive'], default: 'default' },
      state:   { type: 'select', options: ['default', 'hover', 'active', 'disabled'], default: 'default' },
      label:   { type: 'string', default: 'Badge' },
    },
    fullCode: `// Badge.tsx — complete Tailwind + token implementation
import { cn } from '@/lib/utils';

type Variant = 'default' | 'brand' | 'success' | 'warning' | 'destructive';

interface BadgeProps {
  variant?:    Variant;
  interactive?: boolean;   // adds hover + cursor styles
  disabled?:   boolean;
  children:    React.ReactNode;
  className?:  string;
}

// Base classes — token variables for shape & spacing
const base =
  'inline-flex items-center ' +
  'rounded-[var(--badge-radius)] ' +
  'px-[var(--badge-px)] py-[var(--badge-py)] ' +
  'text-xs font-medium';

// Colour classes — brand variants reference design tokens
const variantClass: Record<Variant, string> = {
  default:     'bg-[var(--badge-bg-default)] text-[var(--badge-text-default)]',
  brand:       'bg-[var(--badge-bg-brand)]   text-[var(--badge-text-brand)]',
  success:     'bg-green-100 text-green-700',
  warning:     'bg-amber-100 text-amber-700',
  destructive: 'bg-red-100   text-red-700',
};

export function Badge({
  variant     = 'default',
  interactive = false,
  disabled    = false,
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        base,
        variantClass[variant],
        interactive && 'hover:bg-gray-200 cursor-pointer',
        // active/selected state: swap to brand fill
        // aria-selected="true" → 'bg-[var(--btn-bg-primary)] text-[var(--btn-text-primary)]'
        disabled && 'opacity-50 pointer-events-none',
        className,
      )}
    >
      {children}
    </span>
  );
}`,
  },
  input: {
    name: "Input",
    description:
      "A text field that allows users to enter and edit single-line text values.",
    slug: "input",
    status: "stable",
    states: [
      {
        state: "Default",
        description: "Empty input, ready for entry. Subtle border on white background.",
        preview: "default",
        code: `<input className="
  w-full bg-[var(--input-bg)] text-[var(--input-text)]
  border border-[var(--input-border)] rounded-[var(--input-radius)]
  px-[var(--input-px)] py-[var(--input-py)] text-sm
  placeholder:text-[var(--input-placeholder)]
  transition-colors
" placeholder="Enter text..." />`,
      },
      {
        state: "Focus",
        description: "Active input receiving keyboard input. Brand blue ring for brand consistency.",
        preview: "focus",
        code: `{/* Add to input className: */}
focus:border-[var(--input-border-focus)]
focus:outline-none
focus:ring-2
focus:ring-[var(--input-border-focus)]`,
      },
      {
        state: "Filled",
        description: "Input with user-entered content.",
        preview: "filled",
        code: `{/* Same base classes — value attribute drives the filled appearance */}
<input className="
  w-full bg-[var(--input-bg)] text-[var(--input-text)]
  border border-[var(--input-border)] rounded-[var(--input-radius)]
  px-[var(--input-px)] py-[var(--input-py)] text-sm
" defaultValue="Filled value" />`,
      },
      {
        state: "Error",
        description: "Validation failed. Red border and helper text indicate the issue.",
        preview: "error",
        code: `<div className="flex flex-col gap-1">
  <input className="
    w-full bg-[var(--input-bg)] text-[var(--input-text)]
    border border-[var(--input-border-error)] rounded-[var(--input-radius)]
    px-[var(--input-px)] py-[var(--input-py)] text-sm
    focus:outline-none focus:ring-2 focus:ring-[var(--input-border-error)]
  " />
  <p className="text-xs text-[var(--input-border-error)]">
    This field is required.
  </p>
</div>`,
      },
      {
        state: "Disabled",
        description: "Non-interactive. Grayed background signals unavailability.",
        preview: "disabled",
        code: `<input className="
  w-full bg-[var(--input-bg-disabled)] text-gray-400
  border border-[var(--input-border)] rounded-[var(--input-radius)]
  px-[var(--input-px)] py-[var(--input-py)] text-sm
  cursor-not-allowed opacity-60
" disabled />`,
      },
    ],
    types: [
      {
        variant: "Default",
        description: "Standard single-line text input.",
        preview: "default",
        code: `<input
  type="text"
  placeholder="Enter text..."
  className="
    w-full bg-[var(--input-bg)] text-[var(--input-text)]
    border border-[var(--input-border)] rounded-[var(--input-radius)]
    px-[var(--input-px)] py-[var(--input-py)] text-sm
    placeholder:text-[var(--input-placeholder)]
    focus:outline-none focus:ring-2 focus:ring-[var(--input-border-focus)]
    focus:border-[var(--input-border-focus)] transition-colors
  "
/>`,
      },
      {
        variant: "With Label",
        description: "Input paired with a descriptive label above.",
        preview: "labeled",
        code: `<div className="flex flex-col gap-1.5">
  <label className="text-sm font-medium text-gray-700">
    Email address
  </label>
  <input
    type="email"
    placeholder="you@example.com"
    className="
      w-full bg-[var(--input-bg)] text-[var(--input-text)]
      border border-[var(--input-border)] rounded-[var(--input-radius)]
      px-[var(--input-px)] py-[var(--input-py)] text-sm
      placeholder:text-[var(--input-placeholder)]
      focus:outline-none focus:ring-2 focus:ring-[var(--input-border-focus)]
      focus:border-[var(--input-border-focus)] transition-colors
    "
  />
</div>`,
      },
      {
        variant: "With Icon",
        description: "Leading icon for context — search, email, password.",
        preview: "icon",
        code: `<div className="relative">
  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[var(--input-placeholder)]" />
  <input
    type="search"
    placeholder="Search..."
    className="
      w-full bg-[var(--input-bg)] text-[var(--input-text)]
      border border-[var(--input-border)] rounded-[var(--input-radius)]
      pl-9 pr-[var(--input-px)] py-[var(--input-py)] text-sm
      placeholder:text-[var(--input-placeholder)]
      focus:outline-none focus:ring-2 focus:ring-[var(--input-border-focus)]
      focus:border-[var(--input-border-focus)] transition-colors
    "
  />
</div>`,
      },
      {
        variant: "Textarea",
        description: "Multi-line variant for longer text entry.",
        preview: "textarea",
        code: `<textarea
  rows={4}
  placeholder="Enter a longer message..."
  className="
    w-full bg-[var(--input-bg)] text-[var(--input-text)]
    border border-[var(--input-border)] rounded-[var(--input-radius)]
    px-[var(--input-px)] py-[var(--input-py)] text-sm resize-none
    placeholder:text-[var(--input-placeholder)]
    focus:outline-none focus:ring-2 focus:ring-[var(--input-border-focus)]
    focus:border-[var(--input-border-focus)] transition-colors
  "
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
        value: "#2563EB",
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
    props: [
      { name: 'type', type: "'text' | 'email' | 'password' | 'search' | 'number'", default: "'text'", required: false, description: 'HTML input type' },
      { name: 'placeholder', type: 'string', default: '—', required: false, description: 'Placeholder text shown when empty' },
      { name: 'disabled', type: 'boolean', default: 'false', required: false, description: 'Disables the input' },
      { name: 'value', type: 'string', default: '—', required: false, description: 'Controlled value' },
      { name: 'onChange', type: '(e: React.ChangeEvent<HTMLInputElement>) => void', default: '—', required: false, description: 'Change event handler' },
      { name: 'className', type: 'string', default: '—', required: false, description: 'Additional CSS classes' },
    ],
    propSchema: {
      state:       { type: 'select', options: ['default', 'focus', 'filled', 'error', 'disabled'], default: 'default' },
      inputType:   { type: 'select', options: ['text', 'email', 'password', 'search'], default: 'text' },
      placeholder: { type: 'string', default: 'Enter text...' },
    },
    fullCode: `// Input.tsx — complete Tailwind + token implementation
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
  label?:    string;
}

// Base classes — token variables for shape, spacing & colour
const base =
  'w-full bg-[var(--input-bg)] text-[var(--input-text)] ' +
  'border border-[var(--input-border)] rounded-[var(--input-radius)] ' +
  'px-[var(--input-px)] py-[var(--input-py)] text-sm ' +
  'placeholder:text-[var(--input-placeholder)] ' +
  'transition-colors ' +
  // Focus state — brand ring
  'focus:outline-none focus:ring-2 focus:ring-[var(--input-border-focus)] ' +
  'focus:border-[var(--input-border-focus)] ' +
  // Disabled state
  'disabled:bg-[var(--input-bg-disabled)] disabled:text-gray-400 ' +
  'disabled:cursor-not-allowed disabled:opacity-60';

export function Input({ hasError, label, className, id, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={id}
        className={cn(
          base,
          // Error state — red ring instead of brand
          hasError && 'border-[var(--input-border-error)] focus:ring-[var(--input-border-error)] focus:border-[var(--input-border-error)]',
          className,
        )}
        {...props}
      />
      {hasError && (
        <p className="text-xs text-[var(--input-border-error)]">
          This field is required.
        </p>
      )}
    </div>
  );
}`,
  },
  colors: {
    name: "Colors",
    description:
      "The design system color palette, including brand, semantic, and neutral tokens.",
    slug: "colors",
    status: "stable",
    states: [
      {
        state: "Brand Palette",
        description:
          "Core brand blue colors used for primary actions and highlights.",
        preview: "brand",
        code: `/* Brand Blue Scale */
--color-brand-200: #BFDBFE; /* Light backgrounds, borders */
--color-brand-400: #60A5FA; /* Icons, secondary elements */
--color-brand-600: #2563EB; /* Primary CTAs, buttons */
--color-brand-700: #1D4ED8; /* Hover states */

/* Tailwind custom config */
colors: {
  brand: {
    200: '#BFDBFE',
    400: '#60A5FA',
    600: '#2563EB',
    700: '#1D4ED8',
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
        description: "Brand blue 600 — main CTA, interactive elements.",
        preview: "primary",
        code: `className="bg-brand-600 text-white"
// #2563EB`,
      },
      {
        variant: "Secondary",
        description:
          "Brand blue 200 — subtle highlights and tinted surfaces.",
        preview: "secondary",
        code: `className="bg-brand-200 text-brand-700"
// #DBEAFE / #1D4ED8`,
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
        value: "#2563EB",
        usage: "Primary brand color",
        category: "Brand",
      },
      {
        name: "--color-brand-hover",
        value: "#1D4ED8",
        usage: "Brand hover state",
        category: "Brand",
      },
      {
        name: "--color-brand-light",
        value: "#DBEAFE",
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
    status: "stable",
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
  px-1.5 py-0.5 rounded text-brand-700">
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
    status: "stable",
    states: [
      {
        state: "Default",
        description:
          "Static card at rest. White surface with subtle border and shadow.",
        preview: "default",
        code: `<div className="
  bg-[var(--card-bg)] border border-[var(--card-border)]
  rounded-[var(--card-radius)] shadow-[var(--card-shadow)]
  p-[var(--card-padding)]
">
  Card content
</div>`,
      },
      {
        state: "Hover",
        description:
          "Interactive card hover — lifted shadow indicates clickability.",
        preview: "hover",
        code: `{/* Add to base card className: */}
hover:border-[var(--card-border-hover)]
hover:shadow-[var(--card-shadow-hover)]
cursor-pointer transition-all duration-150`,
      },
      {
        state: "Selected",
        description:
          "Active/selected card — brand border highlights selection.",
        preview: "selected",
        code: `<div className="
  bg-[var(--card-bg)] border-2 border-[var(--card-border-selected)]
  rounded-[var(--card-radius)] shadow-[var(--card-shadow)]
  p-[var(--card-padding)]
" aria-selected="true">
  Selected card
</div>`,
      },
    ],
    types: [
      {
        variant: "Default",
        description: "Standard white card with border and shadow.",
        preview: "default",
        code: `<div className="
  bg-[var(--card-bg)] border border-[var(--card-border)]
  rounded-[var(--card-radius)] shadow-[var(--card-shadow)]
  p-[var(--card-padding)]
">
  Default card
</div>`,
      },
      {
        variant: "Tinted",
        description:
          "Brand-tinted surface for featured or promotional content.",
        preview: "tinted",
        code: `<div className="
  bg-brand-200/40 border border-brand-200
  rounded-[var(--card-radius)] shadow-none
  p-[var(--card-padding)]
">
  Tinted card
</div>`,
      },
      {
        variant: "Flat",
        description: "No shadow — sits flush within gray backgrounds.",
        preview: "flat",
        code: `<div className="
  bg-[var(--card-bg)] border border-[var(--card-border)]
  rounded-[var(--card-radius)] shadow-none
  p-[var(--card-padding)]
">
  Flat card
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
        value: "#2563EB",
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
    props: [
      { name: 'children', type: 'React.ReactNode', default: '—', required: true, description: 'Card content' },
      { name: 'variant', type: "'default' | 'tinted' | 'flat'", default: "'default'", required: false, description: 'Visual style of the card' },
      { name: 'className', type: 'string', default: '—', required: false, description: 'Additional CSS classes' },
    ],
    propSchema: {
      variant: { type: 'select', options: ['default', 'tinted', 'flat'], default: 'default' },
      state:   { type: 'select', options: ['default', 'hover', 'selected'], default: 'default' },
    },
    fullCode: `// Card.tsx — complete Tailwind + token implementation
import { cn } from '@/lib/utils';

type CardVariant = 'default' | 'tinted' | 'flat';

interface CardProps {
  children:    React.ReactNode;
  variant?:    CardVariant;
  interactive?: boolean;    // enables hover lift
  selected?:   boolean;     // brand border + subtle tint
  className?:  string;
}

// Base classes — token variables for shape, spacing & colour
const base =
  'rounded-[var(--card-radius)] p-[var(--card-padding)] ' +
  'transition-all duration-150';

// Variant colour classes
const variantClass: Record<CardVariant, string> = {
  default: 'bg-[var(--card-bg)] border border-[var(--card-border)] shadow-[var(--card-shadow)]',
  tinted:  'bg-brand-200/40 border border-brand-200 shadow-none',
  flat:    'bg-[var(--card-bg)] border border-[var(--card-border)] shadow-none',
};

export function Card({
  variant     = 'default',
  interactive = false,
  selected    = false,
  children,
  className,
}: CardProps) {
  return (
    <div
      className={cn(
        base,
        variantClass[variant],
        // Interactive hover state — lifted shadow + tighter border
        interactive && [
          'cursor-pointer',
          'hover:border-[var(--card-border-hover)]',
          'hover:shadow-[var(--card-shadow-hover)]',
        ],
        // Selected state — brand border overrides variant border
        selected && [
          'border-2 border-[var(--card-border-selected)]',
          'bg-brand-200/20',
        ],
        className,
      )}
    >
      {children}
    </div>
  );
}`,
  },
};
