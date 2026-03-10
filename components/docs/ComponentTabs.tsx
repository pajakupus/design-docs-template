"use client";

import { useState, Suspense } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { ComponentDoc } from "@/lib/docs-data";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import StateExample from "./StateExample";
import TokenTable from "./TokenTable";
import PropsTable from "./PropsTable";
import CodeBlock from "./CodeBlock";
import ComponentPreview from "./ComponentPreview";
import ModeToggle from "./ModeToggle";
import ViewportSwitcher, { Viewport, viewportWidths } from "./ViewportSwitcher";

const Playground = dynamic(() => import("./Playground"), { ssr: false });

interface ComponentTabsProps {
  doc: ComponentDoc;
}

export default function ComponentTabs({ doc }: ComponentTabsProps) {
  const [isDark, setIsDark] = useState(false);
  const [viewport, setViewport] = useState<Viewport>("desktop");

  const tabs = [
    { id: "states", label: "States", count: doc.states.length },
    { id: "types", label: "Types", count: doc.types.length },
    { id: "tokens", label: "Tokens", count: doc.tokens.length },
    ...(doc.props ? [{ id: "props", label: "Props", count: doc.props.length }] : []),
    ...(doc.propSchema ? [{ id: "playground", label: "Playground", count: null }] : []),
  ];

  const viewportWidth = viewportWidths[viewport];

  return (
    <Tabs.Root defaultValue="states" className="w-full">
      {/* Tab list */}
      <Tabs.List className="flex items-center gap-1 border-b border-gray-200 mb-8">
        {tabs.map((tab) => (
          <Tabs.Trigger
            key={tab.id}
            value={tab.id}
            className={cn(
              "group relative flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors",
              "text-gray-500 hover:text-gray-900",
              "data-[state=active]:text-gray-900",
              "focus:outline-none"
            )}
          >
            {tab.label}
            {tab.count !== null && (
              <span
                className={cn(
                  "inline-flex items-center justify-center rounded-full w-5 h-5 text-xs transition-colors",
                  "bg-gray-100 text-gray-500",
                  "group-data-[state=active]:bg-brand-200 group-data-[state=active]:text-brand-700"
                )}
              >
                {tab.count}
              </span>
            )}
            {/* Active indicator */}
            <span
              className={cn(
                "absolute bottom-0 left-0 right-0 h-0.5 rounded-full transition-colors",
                "group-data-[state=active]:bg-brand-600"
              )}
            />
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      {/* States tab */}
      <Tabs.Content value="states" className="focus:outline-none">
        <div className="flex items-center gap-2 mb-4">
          <ViewportSwitcher current={viewport} onChange={setViewport} />
          <ModeToggle isDark={isDark} onToggle={() => setIsDark((d) => !d)} />
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {doc.states.map((example) => (
            <StateExample
              key={example.state}
              example={example}
              componentSlug={doc.slug}
              isDark={isDark}
              viewportWidth={viewportWidth}
            />
          ))}
        </div>
      </Tabs.Content>

      {/* Types tab */}
      <Tabs.Content value="types" className="focus:outline-none">
        <div className="flex items-center gap-2 mb-4">
          <ViewportSwitcher current={viewport} onChange={setViewport} />
          <ModeToggle isDark={isDark} onToggle={() => setIsDark((d) => !d)} />
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {doc.types.map((type) => (
            <div
              key={type.variant}
              className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm"
            >
              {/* Preview */}
              <div
                className={`px-8 py-10 border-b border-gray-200 flex items-center justify-center min-h-[120px] transition-colors ${
                  isDark ? "dark bg-gray-900" : "bg-gray-50"
                }`}
                style={viewportWidth ? { maxWidth: viewportWidth, margin: "0 auto" } : undefined}
              >
                <ComponentPreview
                  componentSlug={doc.slug}
                  variant={type.preview}
                />
              </div>
              {/* Info + Code */}
              <div className="p-5 space-y-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                      {type.variant}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {type.description}
                  </p>
                </div>
                <CodeBlock code={type.code} language="tsx" />
              </div>
            </div>
          ))}
        </div>
      </Tabs.Content>

      {/* Tokens tab */}
      <Tabs.Content value="tokens" className="focus:outline-none">
        <TokenTable tokens={doc.tokens} />
      </Tabs.Content>

      {/* Props tab */}
      {doc.props && (
        <Tabs.Content value="props" className="focus:outline-none">
          <PropsTable props={doc.props} />
        </Tabs.Content>
      )}

      {/* Playground tab */}
      {doc.propSchema && (
        <Tabs.Content value="playground" className="focus:outline-none">
          <Suspense fallback={<div className="text-sm text-gray-400 py-8 text-center">Loading playground…</div>}>
            <Playground doc={doc} />
          </Suspense>
        </Tabs.Content>
      )}
    </Tabs.Root>
  );
}
