"use client";

import { PropSchema, PropSchemaField } from "@/lib/docs-data";

interface PropControlsProps {
  schema: PropSchema;
  values: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
  hiddenKeys?: Set<string>;
}

export default function PropControls({ schema, values, onChange, hiddenKeys }: PropControlsProps) {
  const entries = Object.entries(schema).filter(
    ([key]) => !hiddenKeys || !hiddenKeys.has(key)
  );

  if (entries.length === 0) return null;

  return (
    <div className="space-y-3">
      {entries.map(([key, field]) => (
        <div key={key} className="flex items-center gap-4">
          <label className="w-24 flex-shrink-0 text-xs font-medium text-gray-600 font-mono">
            {key}
          </label>
          <div className="flex-1">
            <FieldControl
              field={field}
              value={values[key]}
              onChange={(v) => onChange(key, v)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

interface FieldControlProps {
  field: PropSchemaField;
  value: unknown;
  onChange: (value: unknown) => void;
}

function FieldControl({ field, value, onChange }: FieldControlProps) {
  if (field.type === "select") {
    return (
      <div className="flex flex-wrap gap-1">
        {field.options.map((opt) => {
          const active = value === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
                active
                  ? "bg-brand-600 text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    );
  }

  if (field.type === "boolean") {
    const checked = value as boolean;
    return (
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-1 ${
          checked ? "bg-brand-600" : "bg-gray-200"
        }`}
      >
        <span
          className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-4" : "translate-x-0.5"
          }`}
        />
      </button>
    );
  }

  if (field.type === "string") {
    return (
      <input
        type="text"
        value={value as string}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-brand-600"
      />
    );
  }

  if (field.type === "number") {
    return (
      <div className="flex items-center gap-2">
        <input
          type="range"
          min={field.min ?? 0}
          max={field.max ?? 100}
          value={value as number}
          onChange={(e) => onChange(Number(e.target.value))}
          className="flex-1 accent-brand-600"
        />
        <span className="w-8 text-right text-xs font-mono text-gray-600">
          {value as number}
        </span>
      </div>
    );
  }

  if (field.type === "color") {
    return (
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value as string}
          onChange={(e) => onChange(e.target.value)}
          className="h-7 w-12 rounded border border-gray-300 cursor-pointer"
        />
        <code className="text-xs font-mono text-gray-500">{value as string}</code>
      </div>
    );
  }

  return null;
}
