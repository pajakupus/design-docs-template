interface ComponentPreviewProps {
  componentSlug: string;
  variant: string;
  dynamicProps?: Record<string, unknown>;
  realWorld?: boolean;
}

export default function ComponentPreview({ componentSlug, variant, dynamicProps, realWorld }: ComponentPreviewProps) {
  if (realWorld) {
    switch (componentSlug) {
      case "button":    return <ButtonRealWorld dynamicProps={dynamicProps} />;
      case "badge":     return <BadgeRealWorld dynamicProps={dynamicProps} />;
      case "input":     return <InputRealWorld dynamicProps={dynamicProps} />;
      case "card":      return <CardRealWorld dynamicProps={dynamicProps} />;
      default:
        return <div className="text-sm text-gray-400 italic">Real world preview unavailable</div>;
    }
  }

  switch (componentSlug) {
    case "button":    return <ButtonPreview variant={variant} dynamicProps={dynamicProps} />;
    case "badge":     return <BadgePreview  variant={variant} dynamicProps={dynamicProps} />;
    case "input":     return <InputPreview  variant={variant} dynamicProps={dynamicProps} />;
    case "card":      return <CardPreview   variant={variant} dynamicProps={dynamicProps} />;
    case "colors":    return <ColorsPreview    variant={variant} />;
    case "typography":return <TypographyPreview variant={variant} />;
    default:
      return <div className="text-sm text-gray-400 italic">Preview unavailable</div>;
  }
}

// ─── Shared base styles (layout only — no color tokens) ───────────────────────

const BTN_BASE = "inline-flex items-center justify-center transition-all focus:outline-none";
const BADGE_BASE = "inline-flex items-center font-medium";

// ─── Button ───────────────────────────────────────────────────────────────────

function renderButton(
  variant: string,
  state: string,
  label: string,
  size: string
) {
  // Size overrides
  const sizeStyle: React.CSSProperties =
    size === "sm"  ? { fontSize: "12px", padding: "4px 12px" } :
    size === "lg"  ? { fontSize: "16px", padding: "12px 24px" } :
    { fontSize: "var(--btn-font-size)", padding: "var(--btn-padding-y) var(--btn-padding-x)" };

  const baseStyle: React.CSSProperties = {
    borderRadius: "var(--btn-radius)",
    fontWeight: "var(--btn-font-weight)" as React.CSSProperties["fontWeight"],
    transition: "var(--btn-transition)",
    border: "1px solid transparent",
    ...sizeStyle,
  };

  // Variant × state matrix
  if (variant === "primary" || variant === "default") {
    const hovered  = state === "hover"   || state === "pressed";
    const focused  = state === "focus";
    const disabled = state === "disabled";
    return (
      <button
        disabled={disabled}
        style={{
          ...baseStyle,
          backgroundColor: hovered ? "var(--btn-bg-primary-hover)" : "var(--btn-bg-primary)",
          color: "var(--btn-text-primary)",
          outline: focused ? "2px solid var(--btn-focus-ring-color)" : undefined,
          outlineOffset: focused ? "2px" : undefined,
          transform: state === "pressed" ? "scale(0.97)" : undefined,
          opacity: disabled ? "var(--btn-disabled-opacity)" as unknown as number : undefined,
          cursor: disabled ? "not-allowed" : undefined,
        }}
        className={BTN_BASE}
      >
        {label}
      </button>
    );
  }

  if (variant === "secondary") {
    return (
      <button
        disabled={state === "disabled"}
        style={{
          ...baseStyle,
          backgroundColor: state === "hover" ? "#e5e7eb" : "#f3f4f6",
          color: "#111827",
          opacity: state === "disabled" ? (0.4 as unknown as number) : undefined,
          cursor: state === "disabled" ? "not-allowed" : undefined,
        }}
        className={BTN_BASE}
      >
        {label}
      </button>
    );
  }

  if (variant === "outline") {
    return (
      <button
        disabled={state === "disabled"}
        style={{
          ...baseStyle,
          backgroundColor: state === "hover" ? "#f9fafb" : "#ffffff",
          color: "#374151",
          borderColor: "#d1d5db",
          opacity: state === "disabled" ? (0.4 as unknown as number) : undefined,
        }}
        className={BTN_BASE}
      >
        {label}
      </button>
    );
  }

  if (variant === "ghost") {
    return (
      <button
        disabled={state === "disabled"}
        style={{
          ...baseStyle,
          backgroundColor: state === "hover" ? "#f3f4f6" : "transparent",
          color: "#374151",
          opacity: state === "disabled" ? (0.4 as unknown as number) : undefined,
        }}
        className={BTN_BASE}
      >
        {label}
      </button>
    );
  }

  if (variant === "destructive") {
    return (
      <button
        disabled={state === "disabled"}
        style={{
          ...baseStyle,
          backgroundColor: state === "hover" ? "#b91c1c" : "#dc2626",
          color: "#ffffff",
          opacity: state === "disabled" ? (0.4 as unknown as number) : undefined,
        }}
        className={BTN_BASE}
      >
        {label}
      </button>
    );
  }

  return (
    <button style={{ ...baseStyle, backgroundColor: "var(--btn-bg-primary)", color: "var(--btn-text-primary)" }} className={BTN_BASE}>
      {label}
    </button>
  );
}

function ButtonPreview({ variant, dynamicProps }: { variant: string; dynamicProps?: Record<string, unknown> }) {
  if (dynamicProps) {
    return renderButton(
      (dynamicProps.variant as string) ?? "primary",
      (dynamicProps.state  as string) ?? "default",
      (dynamicProps.label  as string) ?? "Button",
      (dynamicProps.size   as string) ?? "md",
    );
  }
  // Static state previews (States tab)
  const stateToVariantState: Record<string, [string, string]> = {
    default:     ["primary", "default"],
    hover:       ["primary", "hover"],
    focus:       ["primary", "focus"],
    pressed:     ["primary", "pressed"],
    disabled:    ["primary", "disabled"],
    primary:     ["primary", "default"],
    secondary:   ["secondary", "default"],
    outline:     ["outline", "default"],
    ghost:       ["ghost", "default"],
    destructive: ["destructive", "default"],
  };
  const [v, s] = stateToVariantState[variant] ?? ["primary", "default"];
  const labelMap: Record<string, string> = {
    primary: "Primary", secondary: "Secondary", outline: "Outline",
    ghost: "Ghost", destructive: "Delete",
  };
  return renderButton(v, s, labelMap[variant] ?? "Button", "md");
}

// ─── Badge ────────────────────────────────────────────────────────────────────

function renderBadge(variant: string, state: string, label: string) {
  const baseStyle: React.CSSProperties = {
    borderRadius: "var(--badge-radius)",
    fontSize: "var(--badge-font-size)",
    fontWeight: "var(--badge-font-weight)" as React.CSSProperties["fontWeight"],
    padding: "var(--badge-py) var(--badge-px)",
  };

  if (state === "disabled") {
    return <span style={{ ...baseStyle, backgroundColor: "var(--badge-bg-default)", color: "#9ca3af", opacity: 0.5 }} className={BADGE_BASE}>{label}</span>;
  }
  if (state === "active") {
    return <span style={{ ...baseStyle, backgroundColor: "var(--btn-bg-primary)", color: "#ffffff" }} className={BADGE_BASE}>{label}</span>;
  }
  if (state === "hover") {
    return <span style={{ ...baseStyle, backgroundColor: "#e5e7eb", color: "var(--badge-text-default)" }} className={BADGE_BASE}>{label}</span>;
  }

  const variantStyles: Record<string, React.CSSProperties> = {
    default:     { backgroundColor: "var(--badge-bg-default)", color: "var(--badge-text-default)" },
    brand:       { backgroundColor: "var(--badge-bg-brand)", color: "var(--badge-text-brand)" },
    success:     { backgroundColor: "#dcfce7", color: "#15803d" },
    warning:     { backgroundColor: "#fef9c3", color: "#a16207" },
    destructive: { backgroundColor: "#fee2e2", color: "#b91c1c" },
  };

  return (
    <span style={{ ...baseStyle, ...(variantStyles[variant] ?? variantStyles.default) }} className={BADGE_BASE}>
      {label}
    </span>
  );
}

function BadgePreview({ variant, dynamicProps }: { variant: string; dynamicProps?: Record<string, unknown> }) {
  if (dynamicProps) {
    return renderBadge(
      (dynamicProps.variant as string) ?? "default",
      (dynamicProps.state  as string) ?? "default",
      (dynamicProps.label  as string) ?? "Badge",
    );
  }
  const stateMap: Record<string, [string, string]> = {
    default:     ["default", "default"],
    hover:       ["default", "hover"],
    active:      ["default", "active"],
    disabled:    ["default", "disabled"],
    brand:       ["brand", "default"],
    success:     ["success", "default"],
    warning:     ["warning", "default"],
    destructive: ["destructive", "default"],
  };
  const [v, s] = stateMap[variant] ?? ["default", "default"];
  const labelMap: Record<string, string> = {
    default: "Badge", hover: "Badge", active: "Active", disabled: "Disabled",
    brand: "Brand", success: "Success", warning: "Warning", destructive: "Error",
  };
  return renderBadge(v, s, labelMap[variant] ?? "Badge");
}

// ─── Input ────────────────────────────────────────────────────────────────────

function renderInput(state: string, inputType: string, placeholder: string, value?: string) {
  const baseStyle: React.CSSProperties = {
    width: "256px",
    borderRadius: "var(--input-radius)",
    fontSize: "var(--input-font-size)",
    padding: "var(--input-py) var(--input-px)",
    backgroundColor: state === "disabled" ? "var(--input-bg-disabled)" : "var(--input-bg)",
    color: state === "disabled" ? "#9ca3af" : "var(--input-text)",
    border: `1px solid ${
      state === "focus"    ? "var(--input-border-focus)" :
      state === "error"    ? "var(--input-border-error)" :
      "var(--input-border)"
    }`,
    outline: state === "focus" ? "2px solid var(--input-border-focus)" : "none",
    outlineOffset: state === "focus" ? "0px" : undefined,
    boxShadow: "none",
    cursor: state === "disabled" ? "not-allowed" : undefined,
    opacity: state === "disabled" ? 0.6 : undefined,
  };

  if (state === "error") {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <input type={inputType} readOnly style={baseStyle} placeholder={placeholder} />
        <p style={{ fontSize: "12px", color: "var(--input-border-error)", margin: 0 }}>
          This field is required.
        </p>
      </div>
    );
  }

  return (
    <input
      type={inputType}
      readOnly
      disabled={state === "disabled"}
      placeholder={state === "filled" ? undefined : placeholder}
      defaultValue={state === "filled" ? (value ?? "John Doe") : undefined}
      style={baseStyle}
    />
  );
}

function InputPreview({ variant, dynamicProps }: { variant: string; dynamicProps?: Record<string, unknown> }) {
  if (dynamicProps) {
    return renderInput(
      (dynamicProps.state       as string) ?? "default",
      (dynamicProps.inputType   as string) ?? "text",
      (dynamicProps.placeholder as string) ?? "Enter text...",
    );
  }
  if (variant === "labeled") {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "6px", width: "256px" }}>
        <label style={{ fontSize: "14px", fontWeight: 500, color: "#374151" }}>Email address</label>
        {renderInput("default", "email", "you@example.com")}
      </div>
    );
  }
  if (variant === "icon") {
    return (
      <div style={{ position: "relative", width: "256px" }}>
        <svg style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", width: "16px", height: "16px", color: "#9ca3af" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input type="text" readOnly placeholder="Search..." style={{
          width: "256px",
          borderRadius: "var(--input-radius)",
          fontSize: "var(--input-font-size)",
          padding: "var(--input-py) var(--input-px) var(--input-py) 36px",
          backgroundColor: "var(--input-bg)",
          color: "var(--input-text)",
          border: "1px solid var(--input-border)",
          outline: "none",
        }} />
      </div>
    );
  }
  if (variant === "textarea") {
    return (
      <textarea readOnly rows={3} placeholder="Write your message..." style={{
        width: "256px",
        borderRadius: "var(--input-radius)",
        fontSize: "var(--input-font-size)",
        padding: "var(--input-py) var(--input-px)",
        backgroundColor: "var(--input-bg)",
        color: "var(--input-text)",
        border: "1px solid var(--input-border)",
        outline: "none",
        resize: "none",
      }} />
    );
  }
  const stateMap: Record<string, string> = {
    default: "default", focus: "focus", filled: "filled", error: "error", disabled: "disabled",
  };
  return renderInput(stateMap[variant] ?? "default", "text", "Enter text...");
}

// ─── Card ─────────────────────────────────────────────────────────────────────

function renderCard(variant: string, state: string) {
  const baseStyle: React.CSSProperties = {
    width: "272px",
    borderRadius: "var(--card-radius)",
    padding: "var(--card-padding)",
    backgroundColor:
      variant === "tinted" ? "#dbeafe33" : "var(--card-bg)",
    border:
      state  === "selected"  ? `2px solid var(--card-border-selected)` :
      state  === "hover"     ? `1px solid var(--card-border-hover)` :
      variant === "tinted"   ? `1px solid var(--badge-bg-brand)` :
      `1px solid var(--card-border)`,
    boxShadow:
      variant === "flat"  ? "none" :
      state   === "hover" ? "var(--card-shadow-hover)" :
      "var(--card-shadow)",
    cursor: state === "hover" ? "pointer" : undefined,
    transition: "box-shadow 150ms ease, border-color 150ms ease",
  };

  const titleColor = variant === "tinted" ? "var(--badge-text-brand)" : "#111827";
  const bodyColor  = variant === "tinted" ? "#1d4ed8cc" : "#6b7280";

  return (
    <div style={baseStyle}>
      <p style={{ fontSize: "14px", fontWeight: 600, color: titleColor, margin: 0 }}>
        {state === "selected" ? "Selected Card" : "Card Title"}
      </p>
      <p style={{ fontSize: "12px", color: bodyColor, marginTop: "4px" }}>
        {state === "hover"    ? "Hover state — elevated shadow." :
         state === "selected" ? "Brand border signals selection." :
         variant === "tinted" ? "Brand-tinted surface." :
         "Supporting description text."}
      </p>
    </div>
  );
}

function CardPreview({ variant, dynamicProps }: { variant: string; dynamicProps?: Record<string, unknown> }) {
  if (dynamicProps) {
    return renderCard(
      (dynamicProps.variant as string) ?? "default",
      (dynamicProps.state  as string) ?? "default",
    );
  }
  const stateMap: Record<string, [string, string]> = {
    default:  ["default",  "default"],
    hover:    ["default",  "hover"],
    selected: ["default",  "selected"],
    tinted:   ["tinted",   "default"],
    flat:     ["flat",     "default"],
  };
  const [v, s] = stateMap[variant] ?? ["default", "default"];
  return renderCard(v, s);
}

// ─── Colors ───────────────────────────────────────────────────────────────────

function ColorsPreview({ variant }: { variant: string }) {
  if (variant === "brand") {
    return (
      <div className="flex gap-2">
        {[
          { bg: "bg-brand-200", label: "200" },
          { bg: "bg-brand-400", label: "400" },
          { bg: "bg-brand-600", label: "600" },
          { bg: "bg-brand-700", label: "700" },
        ].map((c) => (
          <div key={c.label} className="text-center">
            <div className={`w-16 h-16 rounded-lg ${c.bg} shadow-sm`} />
            <p className="mt-1 text-xs text-gray-500">{c.label}</p>
          </div>
        ))}
      </div>
    );
  }
  if (variant === "neutral") {
    return (
      <div className="flex gap-2">
        {["100","200","300","400","700","900"].map((l) => (
          <div key={l} className="text-center">
            <div className={`w-12 h-12 rounded-lg bg-gray-${l} border border-gray-200 shadow-sm`} />
            <p className="mt-1 text-xs text-gray-500">{l}</p>
          </div>
        ))}
      </div>
    );
  }
  if (variant === "semantic") {
    return (
      <div className="flex gap-3">
        {[["bg-green-100 border-green-200 text-green-700","Success"],["bg-amber-100 border-amber-200 text-amber-700","Warning"],["bg-red-100 border-red-200 text-red-700","Error"],["bg-blue-100 border-blue-200 text-blue-700","Info"]].map(([cls, label]) => (
          <div key={label} className={`w-20 h-12 rounded-lg border flex items-center justify-center ${cls}`}>
            <span className="text-xs font-medium">{label}</span>
          </div>
        ))}
      </div>
    );
  }
  if (variant === "primary") {
    return <div className="w-32 h-12 rounded-lg bg-brand-600 flex items-center justify-center"><span className="text-sm font-medium text-white">#2563EB</span></div>;
  }
  if (variant === "secondary") {
    return <div className="w-32 h-12 rounded-lg bg-brand-200 border border-brand-400/30 flex items-center justify-center"><span className="text-sm font-medium text-brand-700">#BFDBFE</span></div>;
  }
  return (
    <div className="flex gap-2">
      {[["bg-gray-100 border border-gray-200","bg"],["bg-gray-300","border"],["bg-gray-900","text"]].map(([cls, lbl]) => (
        <div key={lbl} className={`w-20 h-12 rounded-lg ${cls} flex items-center justify-center`}>
          <span className={`text-xs ${lbl === "text" ? "text-white" : "text-gray-700"}`}>{lbl}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Typography ───────────────────────────────────────────────────────────────

function TypographyPreview({ variant }: { variant: string }) {
  if (variant === "display")  return <h1 className="text-4xl font-bold tracking-tight text-gray-900">Display</h1>;
  if (variant === "heading")  return <div className="space-y-1"><h2 className="text-2xl font-semibold text-gray-900">Section Heading</h2><h3 className="text-xl font-semibold text-gray-700">Sub Heading</h3><h4 className="text-lg font-medium text-gray-600">Card Heading</h4></div>;
  if (variant === "body")     return <div className="space-y-2 max-w-xs"><p className="text-base text-gray-700 leading-relaxed">Body Regular — Primary reading size.</p><p className="text-sm text-gray-500 leading-relaxed">Body Small — Secondary information.</p></div>;
  if (variant === "code")     return <code className="font-mono text-sm bg-gray-100 px-2 py-1 rounded text-brand-700">font-mono text-sm</code>;
  if (variant === "inter")    return <span className="text-2xl font-medium text-gray-900" style={{ fontFamily: "Inter, sans-serif" }}>Inter Typeface Aa</span>;
  if (variant === "mono")     return <span className="text-xl font-mono text-gray-900">JetBrains Mono 01</span>;
  return <p className="text-base text-gray-700">Typography Preview</p>;
}

// ─── Real World Previews ─────────────────────────────────────────────────────
// These render fully interactive components with real CSS hover/focus/active states.

function ButtonRealWorld({ dynamicProps }: { dynamicProps?: Record<string, unknown> }) {
  const variant = (dynamicProps?.variant as string) ?? "primary";
  const size = (dynamicProps?.size as string) ?? "md";
  const label = (dynamicProps?.label as string) ?? "Button";

  const sizeClasses =
    size === "sm" ? "text-xs px-3 py-1" :
    size === "lg" ? "text-base px-6 py-3" :
    "text-sm px-4 py-2";

  const variantClasses: Record<string, string> = {
    primary:
      "bg-brand-600 text-white hover:bg-brand-700 active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-2",
    secondary:
      "bg-gray-100 text-gray-900 hover:bg-gray-200 active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2",
    outline:
      "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-2",
    ghost:
      "bg-transparent text-gray-700 hover:bg-gray-100 active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-2",
    destructive:
      "bg-red-600 text-white hover:bg-red-700 active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2",
  };

  return (
    <button
      className={`${BTN_BASE} rounded-lg font-medium transition-all ${sizeClasses} ${variantClasses[variant] ?? variantClasses.primary}`}
    >
      {label}
    </button>
  );
}

function BadgeRealWorld({ dynamicProps }: { dynamicProps?: Record<string, unknown> }) {
  const variant = (dynamicProps?.variant as string) ?? "default";
  const label = (dynamicProps?.label as string) ?? "Badge";

  const variantClasses: Record<string, string> = {
    default:     "bg-gray-100 text-gray-700 hover:bg-gray-200",
    brand:       "bg-brand-100 text-brand-700 hover:bg-brand-200",
    success:     "bg-green-100 text-green-700 hover:bg-green-200",
    warning:     "bg-amber-100 text-amber-700 hover:bg-amber-200",
    destructive: "bg-red-100 text-red-700 hover:bg-red-200",
  };

  return (
    <span
      className={`${BADGE_BASE} rounded-full text-xs px-2.5 py-0.5 transition-colors cursor-default ${variantClasses[variant] ?? variantClasses.default}`}
    >
      {label}
    </span>
  );
}

function InputRealWorld({ dynamicProps }: { dynamicProps?: Record<string, unknown> }) {
  const inputType = (dynamicProps?.inputType as string) ?? "text";
  const placeholder = (dynamicProps?.placeholder as string) ?? "Enter text...";

  return (
    <input
      type={inputType}
      placeholder={placeholder}
      className="w-64 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-brand-600 hover:border-gray-400 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed"
    />
  );
}

function CardRealWorld({ dynamicProps }: { dynamicProps?: Record<string, unknown> }) {
  const variant = (dynamicProps?.variant as string) ?? "default";

  const isTinted = variant === "tinted";
  const isFlat = variant === "flat";

  return (
    <div
      className={`w-[272px] rounded-xl p-5 border transition-all cursor-pointer
        ${isTinted
          ? "bg-brand-50/20 border-brand-200 hover:border-brand-400 hover:shadow-md"
          : "bg-white border-gray-200 hover:border-gray-300 hover:shadow-md"}
        ${isFlat ? "shadow-none" : "shadow-sm"}
        focus-within:ring-2 focus-within:ring-brand-600 focus-within:ring-offset-2
        active:scale-[0.99]`}
      tabIndex={0}
    >
      <p className={`text-sm font-semibold ${isTinted ? "text-brand-700" : "text-gray-900"}`}>
        Card Title
      </p>
      <p className={`text-xs mt-1 ${isTinted ? "text-brand-600/80" : "text-gray-500"}`}>
        Hover, focus, and click this card — it behaves like production.
      </p>
    </div>
  );
}
