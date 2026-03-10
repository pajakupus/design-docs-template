"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/lib/docs-data";
import { cn } from "@/lib/utils";
import StatusBadge from "@/components/docs/StatusBadge";
import { Search } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col overflow-y-auto">
      {/* Logo / Brand */}
      <div className="px-4 py-5 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-brand-600 flex items-center justify-center">
            <span className="text-white text-xs font-bold">D</span>
          </div>
          <span className="text-sm font-semibold text-gray-900">Design System</span>
        </div>
      </div>

      {/* Search trigger */}
      <div className="px-3 py-2 border-b border-gray-200">
        <button
          type="button"
          onClick={() => {
            window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true }));
          }}
          className="w-full flex items-center gap-2 rounded-md border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors text-left"
        >
          <Search className="h-3.5 w-3.5 flex-shrink-0" />
          <span className="flex-1">Search…</span>
          <kbd className="font-mono text-[10px] bg-white border border-gray-200 rounded px-1">⌘K</kbd>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-6">
        {navigation.map((section) => (
          <div key={section.title}>
            <p className="px-2 mb-1.5 text-xs font-semibold uppercase tracking-wider text-gray-400">
              {section.title}
            </p>
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const href     = item.href ?? `/docs/${item.slug}`;
                const isActive = pathname === href || pathname.startsWith(href + "/");
                const isSpecial = !!item.href; // Tools section items

                return (
                  <li key={item.slug}>
                    <Link
                      href={href}
                      className={cn(
                        "flex items-center gap-2 px-2.5 py-1.5 rounded-md text-sm transition-colors",
                        isActive
                          ? "bg-brand-600 text-white font-medium"
                          : isSpecial
                          ? "text-gray-600 hover:bg-brand-200/50 hover:text-brand-700 font-medium"
                          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      )}
                    >
                      {isSpecial && (
                        <svg className="h-3.5 w-3.5 flex-shrink-0" viewBox="0 0 16 16" fill="none">
                          <circle cx="4" cy="8" r="2" fill="currentColor" opacity=".6" />
                          <circle cx="8" cy="4" r="2" fill="currentColor" opacity=".8" />
                          <circle cx="12" cy="8" r="2" fill="currentColor" />
                          <line x1="6" y1="8" x2="10" y2="8" stroke="currentColor" strokeWidth="1" opacity=".4" />
                          <line x1="6" y1="6.5" x2="10" y2="4.8" stroke="currentColor" strokeWidth="1" opacity=".4" />
                        </svg>
                      )}
                      <span className="flex-1 truncate">{item.label}</span>
                      {item.status && !isActive && (
                        <StatusBadge status={item.status} size="sm" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-gray-200">
        <p className="text-xs text-gray-400">v1.0.0 · Design System</p>
      </div>
    </aside>
  );
}
