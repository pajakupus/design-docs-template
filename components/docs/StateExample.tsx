import CodeBlock from "./CodeBlock";
import { StateExample as StateExampleType } from "@/lib/docs-data";
import ComponentPreview from "./ComponentPreview";

interface StateExampleProps {
  example: StateExampleType;
  componentSlug: string;
}

export default function StateExample({ example, componentSlug }: StateExampleProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm">
      {/* Preview area */}
      <div className="px-8 py-10 bg-gray-50 border-b border-gray-200 flex items-center justify-center min-h-[120px]">
        <ComponentPreview componentSlug={componentSlug} variant={example.preview} />
      </div>

      {/* Info + Code */}
      <div className="p-5 space-y-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-terracotta-200 text-terracotta-700">
              {example.state}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">{example.description}</p>
        </div>
        <CodeBlock code={example.code} language="tsx" />
      </div>
    </div>
  );
}
