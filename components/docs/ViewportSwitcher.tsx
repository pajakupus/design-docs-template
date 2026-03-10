"use client";

import { Smartphone, Tablet, Monitor } from "lucide-react";

export type Viewport = "mobile" | "tablet" | "desktop";

export const viewportWidths: Record<Viewport, number | null> = {
  mobile: 375,
  tablet: 768,
  desktop: null,
};

interface ViewportSwitcherProps {
  current: Viewport;
  onChange: (v: Viewport) => void;
}

const viewports: { id: Viewport; label: string; Icon: React.FC<{ className?: string }> }[] = [
  { id: "mobile", label: "Mobile (375px)", Icon: Smartphone },
  { id: "tablet", label: "Tablet (768px)", Icon: Tablet },
  { id: "desktop", label: "Desktop", Icon: Monitor },
];

export default function ViewportSwitcher({ current, onChange }: ViewportSwitcherProps) {
  return (
    <div className="inline-flex items-center rounded-md border border-gray-200 bg-white overflow-hidden">
      {viewports.map(({ id, label, Icon }) => (
        <button
          key={id}
          type="button"
          title={label}
          onClick={() => onChange(id)}
          className={`px-2.5 py-1.5 transition-colors ${
            current === id
              ? "bg-gray-100 text-gray-900"
              : "text-gray-400 hover:text-gray-700 hover:bg-gray-50"
          } ${id !== "mobile" ? "border-l border-gray-200" : ""}`}
        >
          <Icon className="h-3.5 w-3.5" />
        </button>
      ))}
    </div>
  );
}
