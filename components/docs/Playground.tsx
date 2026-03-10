"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ComponentDoc, PropSchema } from "@/lib/docs-data";
import ComponentPreview from "./ComponentPreview";
import PropControls from "./PropControls";
import CodeBlock from "./CodeBlock";
import A11yPanel from "./A11yPanel";

interface PlaygroundProps {
  doc: ComponentDoc;
}

function getDefaults(schema: PropSchema): Record<string, unknown> {
  const defaults: Record<string, unknown> = {};
  for (const [key, field] of Object.entries(schema)) {
    defaults[key] = field.default;
  }
  return defaults;
}

// "state" and "inputType" are playground-only simulation controls, not real props
const PLAYGROUND_ONLY_KEYS = new Set(["state", "inputType", "label"]);

// Keys that control interactivity — hidden in Real World mode
const INTERACTIVE_KEYS = new Set(["state"]);

function buildCodeSnippet(slug: string, values: Record<string, unknown>): string {
  const componentName = slug.charAt(0).toUpperCase() + slug.slice(1);
  const label = values.label as string | undefined;
  const state = values.state as string | undefined;

  // Derive real props from the playground state
  const derivedProps: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(values)) {
    if (PLAYGROUND_ONLY_KEYS.has(k)) continue;
    derivedProps[k] = v;
  }
  // Map state → real prop
  if (state === "disabled") derivedProps.disabled = true;
  if (slug === "input" && values.inputType) derivedProps.type = values.inputType;

  const propsStr = Object.entries(derivedProps)
    .map(([k, v]) => {
      if (typeof v === 'boolean') return v ? k : `${k}={false}`;
      if (typeof v === 'number')  return `${k}={${v}}`;
      return `${k}="${v}"`;
    })
    .join('\n  ');

  const hasChildren = ["button", "badge", "card"].includes(slug);
  const children = label ?? (slug === "card" ? "<CardContent />" : "Content");

  if (hasChildren) {
    return propsStr
      ? `<${componentName}\n  ${propsStr}\n>\n  ${children}\n</${componentName}>`
      : `<${componentName}>\n  ${children}\n</${componentName}>`;
  }
  return propsStr
    ? `<${componentName}\n  ${propsStr}\n/>`
    : `<${componentName} />`;
}

export default function Playground({ doc }: PlaygroundProps) {
  const schema = doc.propSchema!;
  const router = useRouter();
  const searchParams = useSearchParams();
  const previewRef = useRef<HTMLDivElement>(null);

  // Read initial values from URL, fall back to schema defaults
  const values = useMemo(() => {
    const defaults = getDefaults(schema);
    const result: Record<string, unknown> = { ...defaults };
    for (const [key, field] of Object.entries(schema)) {
      const param = searchParams.get(key);
      if (param === null) continue;
      if (field.type === 'boolean') result[key] = param === 'true';
      else if (field.type === 'number') result[key] = Number(param);
      else result[key] = param;
    }
    return result;
  }, [schema, searchParams]);

  const handleChange = useCallback(
    (key: string, value: unknown) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(key, String(value));
      router.replace(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  const [realWorld, setRealWorld] = useState(false);
  const codeSnippet = buildCodeSnippet(doc.slug, values);

  return (
    <div className="space-y-6">
      {/* Live preview */}
      <div className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm">
        {/* Real World toggle */}
        <div className="px-5 pt-4 pb-0 flex items-center gap-2.5">
          <button
            type="button"
            role="switch"
            aria-checked={realWorld}
            onClick={() => setRealWorld(!realWorld)}
            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-terracotta-600 focus:ring-offset-1 ${
              realWorld ? "bg-terracotta-600" : "bg-gray-200"
            }`}
          >
            <span
              className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${
                realWorld ? "translate-x-4" : "translate-x-0.5"
              }`}
            />
          </button>
          <span className="text-xs font-medium text-gray-600 select-none">
            Real World
          </span>
          {realWorld && (
            <span className="text-[10px] text-terracotta-600 bg-terracotta-50 px-1.5 py-0.5 rounded font-medium">
              Interactive
            </span>
          )}
        </div>

        <div
          ref={previewRef}
          className="px-8 py-12 bg-gray-50 border-b border-gray-200 flex items-center justify-center min-h-[140px]"
        >
          <ComponentPreview
            componentSlug={doc.slug}
            variant="default"
            dynamicProps={values}
            realWorld={realWorld}
          />
        </div>

        {/* Controls — in real world mode, only show appearance controls */}
        <div className="p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">
            Controls
          </p>
          <PropControls
            schema={schema}
            values={values}
            onChange={handleChange}
            hiddenKeys={realWorld ? INTERACTIVE_KEYS : undefined}
          />
        </div>
      </div>

      {/* Generated code — hidden in real world mode */}
      {!realWorld && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
            Generated code
          </p>
          <CodeBlock code={codeSnippet} language="tsx" />
        </div>
      )}

      {/* A11y audit */}
      <A11yPanel targetRef={previewRef} deps={realWorld ? { realWorld } : values} />
    </div>
  );
}
