"use client";

import { useState } from "react";
import { ComponentDoc } from "@/lib/docs-data";
import CodeBlock from "./CodeBlock";

interface FullReferenceProps {
  doc: ComponentDoc;
}

export default function FullReference({ doc }: FullReferenceProps) {
  const [open, setOpen] = useState(false);

  // Prefer the hand-crafted complete implementation; fall back to concatenated snippets
  const snippet = doc.fullCode ?? buildFallbackSnippet(doc);
  const language = doc.fullCode ? "tsx" : "css";

  return (
    <div className="mt-8 border-t border-gray-200 pt-8">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors group"
      >
        <span
          className={`inline-block transition-transform ${open ? "rotate-90" : "rotate-0"}`}
        >
          ▶
        </span>
        Complete component reference
        <span className="text-xs text-gray-400 font-normal">
          — all variants, states &amp; props in one snippet
        </span>
      </button>

      {open && (
        <div className="mt-4">
          <CodeBlock code={snippet} language={language} />
        </div>
      )}
    </div>
  );
}

/** Fallback: concatenate individual state + type snippets for components without fullCode */
function buildFallbackSnippet(doc: ComponentDoc): string {
  const lines: string[] = [];

  if (doc.states.length > 0) {
    lines.push(`/* ════ STATES ════════════════════════════════════════════ */\n`);
    for (const s of doc.states) {
      lines.push(`/* ${s.state} — ${s.description} */`);
      lines.push(s.code.trim());
      lines.push("");
    }
  }

  if (doc.types.length > 0) {
    lines.push(`/* ════ TYPES / VARIANTS ══════════════════════════════════ */\n`);
    for (const t of doc.types) {
      lines.push(`/* ${t.variant} — ${t.description} */`);
      lines.push(t.code.trim());
      lines.push("");
    }
  }

  return lines.join("\n").trimEnd();
}
