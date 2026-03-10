"use client";

import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import { componentDocs } from "@/lib/docs-data";
import { Search, X } from "lucide-react";

interface SearchItem {
  id: string;
  label: string;
  type: "Component" | "State" | "Type" | "Token";
  href: string;
  description?: string;
}

function buildIndex(): SearchItem[] {
  const items: SearchItem[] = [];
  for (const [slug, doc] of Object.entries(componentDocs)) {
    items.push({
      id: `component-${slug}`,
      label: doc.name,
      type: "Component",
      href: `/docs/${slug}`,
      description: doc.description,
    });
    for (const s of doc.states) {
      items.push({
        id: `state-${slug}-${s.state}`,
        label: `${doc.name} — ${s.state}`,
        type: "State",
        href: `/docs/${slug}`,
        description: s.description,
      });
    }
    for (const t of doc.types) {
      items.push({
        id: `type-${slug}-${t.variant}`,
        label: `${doc.name} — ${t.variant}`,
        type: "Type",
        href: `/docs/${slug}`,
        description: t.description,
      });
    }
    for (const token of doc.tokens) {
      items.push({
        id: `token-${slug}-${token.name}`,
        label: token.name,
        type: "Token",
        href: `/docs/${slug}`,
        description: `${token.usage} · ${token.value}`,
      });
    }
  }
  return items;
}

const typeBadgeClass: Record<SearchItem["type"], string> = {
  Component: "bg-terracotta-200 text-terracotta-700",
  State: "bg-blue-100 text-blue-700",
  Type: "bg-green-100 text-green-700",
  Token: "bg-gray-100 text-gray-600",
};

export default function SearchModal() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const index = useMemo(() => buildIndex(), []);
  const fuse = useMemo(
    () =>
      new Fuse(index, {
        keys: ["label", "description"],
        threshold: 0.3,
        includeScore: true,
      }),
    [index]
  );

  const results = useMemo(() => {
    if (!query.trim()) return index.slice(0, 8);
    return fuse.search(query).slice(0, 12).map((r) => r.item);
  }, [query, fuse, index]);

  const handleOpen = useCallback(() => {
    setOpen(true);
    setQuery("");
    setActiveIdx(0);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setQuery("");
  }, []);

  const navigate = useCallback(
    (item: SearchItem) => {
      router.push(item.href);
      handleClose();
    },
    [router, handleClose]
  );

  // Cmd/Ctrl+K global shortcut
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (open) handleClose();
        else handleOpen();
      }
      if (e.key === "Escape" && open) handleClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, handleOpen, handleClose]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4"
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={handleClose} />

      {/* Modal */}
      <div className="relative w-full max-w-xl bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200">
          <Search className="h-4 w-4 text-gray-400 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setActiveIdx(0); }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") { e.preventDefault(); setActiveIdx((i) => Math.min(i + 1, results.length - 1)); }
              if (e.key === "ArrowUp") { e.preventDefault(); setActiveIdx((i) => Math.max(i - 1, 0)); }
              if (e.key === "Enter" && results[activeIdx]) navigate(results[activeIdx]);
            }}
            placeholder="Search components, states, tokens…"
            className="flex-1 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none bg-transparent"
          />
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto">
          {results.length === 0 ? (
            <p className="px-4 py-6 text-sm text-center text-gray-400">No results found.</p>
          ) : (
            <ul className="py-1">
              {results.map((item, i) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => navigate(item)}
                    onMouseEnter={() => setActiveIdx(i)}
                    className={`w-full text-left flex items-start gap-3 px-4 py-2.5 transition-colors ${
                      i === activeIdx ? "bg-terracotta-200/30" : "hover:bg-gray-50"
                    }`}
                  >
                    <span className={`mt-0.5 inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium flex-shrink-0 ${typeBadgeClass[item.type]}`}>
                      {item.type}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{item.label}</p>
                      {item.description && (
                        <p className="text-xs text-gray-500 truncate">{item.description}</p>
                      )}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer hint */}
        <div className="px-4 py-2 border-t border-gray-100 flex items-center gap-3 text-[10px] text-gray-400">
          <span><kbd className="font-mono bg-gray-100 px-1 rounded">↑↓</kbd> navigate</span>
          <span><kbd className="font-mono bg-gray-100 px-1 rounded">↵</kbd> open</span>
          <span><kbd className="font-mono bg-gray-100 px-1 rounded">Esc</kbd> close</span>
        </div>
      </div>
    </div>
  );
}
