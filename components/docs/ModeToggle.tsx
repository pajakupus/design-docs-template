"use client";

import { Sun, Moon } from "lucide-react";

interface ModeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export default function ModeToggle({ isDark, onToggle }: ModeToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="inline-flex items-center gap-1.5 rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
    >
      {isDark ? (
        <>
          <Sun className="h-3.5 w-3.5" />
          Light
        </>
      ) : (
        <>
          <Moon className="h-3.5 w-3.5" />
          Dark
        </>
      )}
    </button>
  );
}
