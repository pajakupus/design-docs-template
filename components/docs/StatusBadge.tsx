import { ComponentStatus } from "@/lib/docs-data";

const statusConfig: Record<ComponentStatus, { label: string; className: string }> = {
  stable: { label: "Stable", className: "bg-green-100 text-green-700" },
  beta: { label: "Beta", className: "bg-blue-100 text-blue-700" },
  experimental: { label: "Experimental", className: "bg-amber-100 text-amber-700" },
  deprecated: { label: "Deprecated", className: "bg-red-100 text-red-700" },
};

interface StatusBadgeProps {
  status: ComponentStatus;
  size?: "sm" | "md";
}

export default function StatusBadge({ status, size = "sm" }: StatusBadgeProps) {
  const config = statusConfig[status];
  const sizeClass = size === "md"
    ? "px-2.5 py-0.5 text-xs"
    : "px-1.5 py-px text-[10px]";
  return (
    <span className={`inline-flex items-center rounded-full font-medium ${sizeClass} ${config.className}`}>
      {config.label}
    </span>
  );
}
