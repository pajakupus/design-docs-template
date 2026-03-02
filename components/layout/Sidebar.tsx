"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/lib/docs-data";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-52 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col overflow-y-auto">
      {/* Logo / Brand */}
      <div className="px-4 py-5 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-terracotta-600 flex items-center justify-center">
            <span className="text-white text-xs font-bold">D</span>
          </div>
          <span className="text-sm font-semibold text-gray-900">Design System</span>
        </div>
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
                          ? "bg-terracotta-600 text-white font-medium"
                          : isSpecial
                          ? "text-gray-600 hover:bg-terracotta-200/50 hover:text-terracotta-700 font-medium"
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
                      {item.label}
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
