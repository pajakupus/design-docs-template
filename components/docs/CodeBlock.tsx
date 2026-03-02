"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

export default function CodeBlock({ code, language = "tsx", className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Simple tokenizer for basic syntax highlighting
  const highlightCode = (rawCode: string) => {
    const lines = rawCode.split("\n");
    return lines
      .map((line) => {
        // Escape HTML entities first to prevent XSS
        const escaped = line
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");

        const highlighted = escaped
          // String literals
          .replace(
            /(&quot;(?:[^&]|&(?!quot;))*&quot;|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g,
            '<span style="color:#86efac">$1</span>'
          )
          // Keywords
          .replace(
            /\b(const|let|var|function|return|import|export|from|default|type|interface|extends|implements|class|new|if|else|for|while|async|await|typeof|keyof)\b/g,
            '<span style="color:#93c5fd">$1</span>'
          )
          // Literals
          .replace(
            /\b(true|false|null|undefined|void)\b/g,
            '<span style="color:#f9a8d4">$1</span>'
          )
          // Comments
          .replace(
            /(\/\/[^\n]*)/g,
            '<span style="color:#6b7280;font-style:italic">$1</span>'
          )
          // Component names (PascalCase)
          .replace(
            /\b([A-Z][a-zA-Z]+)\b/g,
            '<span style="color:#fde68a">$1</span>'
          )
          // Common JSX props
          .replace(
            /\b(className|variant|type|size|disabled|onClick|onChange|value|placeholder|href|src|alt|rows|readOnly|defaultValue)\b/g,
            '<span style="color:#c4b5fd">$1</span>'
          );

        return `<span>${highlighted}\n</span>`;
      })
      .join("");
  };

  return (
    <div className={cn("relative rounded-lg overflow-hidden bg-gray-900", className)}>
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <span className="text-xs text-gray-500 font-mono">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-200 transition-colors"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-green-400" />
              <span className="text-green-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code content */}
      <div className="overflow-x-auto">
        <pre className="px-4 py-4 text-sm font-mono text-gray-300 leading-relaxed">
          <code
            dangerouslySetInnerHTML={{ __html: highlightCode(code) }}
          />
        </pre>
      </div>
    </div>
  );
}
