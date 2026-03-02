interface ComponentPreviewProps {
  componentSlug: string;
  variant: string;
}

export default function ComponentPreview({ componentSlug, variant }: ComponentPreviewProps) {
  switch (componentSlug) {
    case "button":
      return <ButtonPreview variant={variant} />;
    case "badge":
      return <BadgePreview variant={variant} />;
    case "input":
      return <InputPreview variant={variant} />;
    case "card":
      return <CardPreview variant={variant} />;
    case "colors":
      return <ColorsPreview variant={variant} />;
    case "typography":
      return <TypographyPreview variant={variant} />;
    default:
      return (
        <div className="text-sm text-gray-400 italic">Preview unavailable</div>
      );
  }
}

function ButtonPreview({ variant }: { variant: string }) {
  const baseClass =
    "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-all";

  if (variant === "default") {
    return (
      <button className={`${baseClass} bg-terracotta-600 text-white`}>
        Button
      </button>
    );
  }
  if (variant === "hover") {
    return (
      <button className={`${baseClass} bg-terracotta-700 text-white`}>
        Button
      </button>
    );
  }
  if (variant === "focus") {
    return (
      <button
        className={`${baseClass} bg-terracotta-600 text-white ring-2 ring-terracotta-600 ring-offset-2`}
      >
        Button
      </button>
    );
  }
  if (variant === "pressed") {
    return (
      <button className={`${baseClass} bg-terracotta-700 text-white scale-[0.97]`}>
        Button
      </button>
    );
  }
  if (variant === "disabled") {
    return (
      <button
        disabled
        className={`${baseClass} bg-terracotta-600 text-white opacity-40 cursor-not-allowed`}
      >
        Button
      </button>
    );
  }
  if (variant === "primary") {
    return (
      <button className={`${baseClass} bg-terracotta-600 text-white`}>
        Primary
      </button>
    );
  }
  if (variant === "secondary") {
    return (
      <button className={`${baseClass} bg-gray-100 text-gray-900`}>
        Secondary
      </button>
    );
  }
  if (variant === "outline") {
    return (
      <button
        className={`${baseClass} border border-gray-300 bg-white text-gray-700`}
      >
        Outline
      </button>
    );
  }
  if (variant === "ghost") {
    return (
      <button className={`${baseClass} text-gray-700 hover:bg-gray-100`}>
        Ghost
      </button>
    );
  }
  if (variant === "destructive") {
    return (
      <button className={`${baseClass} bg-red-600 text-white`}>Delete</button>
    );
  }

  return (
    <button className={`${baseClass} bg-terracotta-600 text-white`}>
      Button
    </button>
  );
}

function BadgePreview({ variant }: { variant: string }) {
  const baseClass =
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium";

  if (variant === "default") {
    return (
      <span className={`${baseClass} bg-gray-100 text-gray-700`}>Badge</span>
    );
  }
  if (variant === "hover") {
    return (
      <span className={`${baseClass} bg-gray-200 text-gray-700`}>Badge</span>
    );
  }
  if (variant === "active") {
    return (
      <span className={`${baseClass} bg-terracotta-600 text-white`}>
        Active
      </span>
    );
  }
  if (variant === "disabled") {
    return (
      <span className={`${baseClass} bg-gray-100 text-gray-400 opacity-50`}>
        Disabled
      </span>
    );
  }
  if (variant === "brand") {
    return (
      <span className={`${baseClass} bg-terracotta-200 text-terracotta-700`}>
        Brand
      </span>
    );
  }
  if (variant === "success") {
    return (
      <span className={`${baseClass} bg-green-100 text-green-700`}>
        Success
      </span>
    );
  }
  if (variant === "warning") {
    return (
      <span className={`${baseClass} bg-amber-100 text-amber-700`}>
        Warning
      </span>
    );
  }
  if (variant === "destructive") {
    return (
      <span className={`${baseClass} bg-red-100 text-red-700`}>Error</span>
    );
  }

  return (
    <span className={`${baseClass} bg-gray-100 text-gray-700`}>Badge</span>
  );
}

function InputPreview({ variant }: { variant: string }) {
  if (variant === "default") {
    return (
      <input
        type="text"
        placeholder="Enter text..."
        readOnly
        className="w-64 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
      />
    );
  }
  if (variant === "focus") {
    return (
      <input
        type="text"
        placeholder="Focused..."
        readOnly
        className="w-64 rounded-md border border-terracotta-600 bg-white px-3 py-2 text-sm text-gray-900 ring-2 ring-terracotta-600 ring-offset-0 focus:outline-none"
      />
    );
  }
  if (variant === "filled") {
    return (
      <input
        type="text"
        defaultValue="John Doe"
        readOnly
        className="w-64 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none"
      />
    );
  }
  if (variant === "error") {
    return (
      <div className="space-y-1">
        <input
          type="text"
          readOnly
          className="w-64 rounded-md border border-red-500 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none"
        />
        <p className="text-xs text-red-600">This field is required.</p>
      </div>
    );
  }
  if (variant === "disabled") {
    return (
      <input
        type="text"
        placeholder="Disabled"
        disabled
        className="w-64 rounded-md border border-gray-200 bg-gray-100 px-3 py-2 text-sm text-gray-400 cursor-not-allowed opacity-60"
      />
    );
  }
  if (variant === "labeled") {
    return (
      <div className="space-y-1.5 w-64">
        <label className="text-sm font-medium text-gray-700">
          Email address
        </label>
        <input
          type="email"
          placeholder="you@example.com"
          readOnly
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none"
        />
      </div>
    );
  }
  if (variant === "icon") {
    return (
      <div className="relative w-64">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search..."
          readOnly
          className="w-full rounded-md border border-gray-300 bg-white pl-9 pr-3 py-2 text-sm focus:outline-none"
        />
      </div>
    );
  }
  if (variant === "textarea") {
    return (
      <textarea
        rows={3}
        placeholder="Write your message..."
        readOnly
        className="w-64 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm resize-none focus:outline-none"
      />
    );
  }
  return (
    <input
      type="text"
      placeholder="Enter text..."
      readOnly
      className="w-64 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none"
    />
  );
}

function CardPreview({ variant }: { variant: string }) {
  if (variant === "default") {
    return (
      <div className="w-72 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-900">Card Title</h3>
        <p className="mt-1 text-xs text-gray-500">
          Supporting description text for this card component.
        </p>
      </div>
    );
  }
  if (variant === "hover") {
    return (
      <div className="w-72 rounded-lg border border-gray-300 bg-white p-5 shadow-md cursor-pointer">
        <h3 className="text-sm font-semibold text-gray-900">Card Title</h3>
        <p className="mt-1 text-xs text-gray-500">
          Hover state — elevated shadow.
        </p>
      </div>
    );
  }
  if (variant === "selected") {
    return (
      <div className="w-72 rounded-lg border-2 border-terracotta-600 bg-terracotta-200/20 p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-900">Selected Card</h3>
        <p className="mt-1 text-xs text-gray-500">
          Terracotta border signals selection.
        </p>
      </div>
    );
  }
  if (variant === "tinted") {
    return (
      <div className="w-72 rounded-lg border border-terracotta-200 bg-terracotta-200/30 p-5">
        <h3 className="text-sm font-semibold text-terracotta-700">Featured</h3>
        <p className="mt-1 text-xs text-terracotta-600/80">
          Terracotta-tinted surface.
        </p>
      </div>
    );
  }
  if (variant === "flat") {
    return (
      <div className="w-72 rounded-lg border border-gray-200 bg-white p-5">
        <h3 className="text-sm font-semibold text-gray-900">Flat Card</h3>
        <p className="mt-1 text-xs text-gray-500">No shadow, flush surface.</p>
      </div>
    );
  }
  return (
    <div className="w-72 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="text-sm font-semibold text-gray-900">Card Title</h3>
    </div>
  );
}

function ColorsPreview({ variant }: { variant: string }) {
  if (variant === "brand") {
    return (
      <div className="flex gap-2">
        {[
          { bg: "bg-terracotta-200", label: "200" },
          { bg: "bg-terracotta-400", label: "400" },
          { bg: "bg-terracotta-600", label: "600" },
          { bg: "bg-terracotta-700", label: "700" },
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
        {[
          { bg: "bg-gray-100", label: "100" },
          { bg: "bg-gray-200", label: "200" },
          { bg: "bg-gray-300", label: "300" },
          { bg: "bg-gray-400", label: "400" },
          { bg: "bg-gray-700", label: "700" },
          { bg: "bg-gray-900", label: "900" },
        ].map((c) => (
          <div key={c.label} className="text-center">
            <div
              className={`w-12 h-12 rounded-lg ${c.bg} border border-gray-200 shadow-sm`}
            />
            <p className="mt-1 text-xs text-gray-500">{c.label}</p>
          </div>
        ))}
      </div>
    );
  }
  if (variant === "semantic") {
    return (
      <div className="flex gap-3">
        <div className="w-20 h-12 rounded-lg bg-green-100 border border-green-200 flex items-center justify-center">
          <span className="text-xs font-medium text-green-700">Success</span>
        </div>
        <div className="w-20 h-12 rounded-lg bg-amber-100 border border-amber-200 flex items-center justify-center">
          <span className="text-xs font-medium text-amber-700">Warning</span>
        </div>
        <div className="w-20 h-12 rounded-lg bg-red-100 border border-red-200 flex items-center justify-center">
          <span className="text-xs font-medium text-red-700">Error</span>
        </div>
        <div className="w-20 h-12 rounded-lg bg-blue-100 border border-blue-200 flex items-center justify-center">
          <span className="text-xs font-medium text-blue-700">Info</span>
        </div>
      </div>
    );
  }
  if (variant === "primary") {
    return (
      <div className="w-32 h-12 rounded-lg bg-terracotta-600 flex items-center justify-center">
        <span className="text-sm font-medium text-white">#C67C4E</span>
      </div>
    );
  }
  if (variant === "secondary") {
    return (
      <div className="w-32 h-12 rounded-lg bg-terracotta-200 border border-terracotta-400/30 flex items-center justify-center">
        <span className="text-sm font-medium text-terracotta-700">#F3D9CF</span>
      </div>
    );
  }
  if (variant === "neutral") {
    return (
      <div className="flex gap-2">
        <div className="w-20 h-12 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center">
          <span className="text-xs text-gray-600">bg</span>
        </div>
        <div className="w-20 h-12 rounded-lg bg-gray-300 flex items-center justify-center">
          <span className="text-xs text-gray-700">border</span>
        </div>
        <div className="w-20 h-12 rounded-lg bg-gray-900 flex items-center justify-center">
          <span className="text-xs text-white">text</span>
        </div>
      </div>
    );
  }
  return <div className="w-16 h-16 rounded-lg bg-terracotta-600" />;
}

function TypographyPreview({ variant }: { variant: string }) {
  if (variant === "display") {
    return (
      <h1 className="text-4xl font-bold tracking-tight text-gray-900">
        Display
      </h1>
    );
  }
  if (variant === "heading") {
    return (
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold text-gray-900">
          Section Heading
        </h2>
        <h3 className="text-xl font-semibold text-gray-700">Sub Heading</h3>
        <h4 className="text-lg font-medium text-gray-600">Card Heading</h4>
      </div>
    );
  }
  if (variant === "body") {
    return (
      <div className="space-y-2 max-w-xs">
        <p className="text-base text-gray-700 leading-relaxed">
          Body Regular — Primary reading size.
        </p>
        <p className="text-sm text-gray-500 leading-relaxed">
          Body Small — Secondary information.
        </p>
      </div>
    );
  }
  if (variant === "code") {
    return (
      <code className="font-mono text-sm bg-gray-100 px-2 py-1 rounded text-terracotta-700">
        font-mono text-sm
      </code>
    );
  }
  if (variant === "inter") {
    return (
      <span
        className="text-2xl font-medium text-gray-900"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        Inter Typeface Aa
      </span>
    );
  }
  if (variant === "mono") {
    return (
      <span className="text-xl font-mono text-gray-900">
        JetBrains Mono 01
      </span>
    );
  }
  return <p className="text-base text-gray-700">Typography Preview</p>;
}
