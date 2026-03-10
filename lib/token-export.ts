import { DesignToken } from "./docs-data";

export function toCssVariables(tokens: DesignToken[]): string {
  const lines = tokens.map((t) => `  ${t.name}: ${t.value}; /* ${t.usage} */`);
  return `:root {\n${lines.join("\n")}\n}`;
}

export function toJsObject(tokens: DesignToken[]): string {
  const entries = tokens.map((t) => {
    const key = t.name
      .replace(/^--/, "")
      .replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
    return `  ${key}: "${t.value}",`;
  });
  return `export const tokens = {\n${entries.join("\n")}\n};`;
}

export function toTailwindConfig(tokens: DesignToken[]): string {
  const colorTokens = tokens.filter((t) => /^#[0-9A-Fa-f]{3,8}$/.test(t.value));
  if (colorTokens.length === 0) {
    return `// No color tokens found for this component.`;
  }
  const entries = colorTokens.map((t) => {
    const key = t.name.replace(/^--/, "").replace(/-/g, ".");
    return `  "${key}": "${t.value}",`;
  });
  return `// tailwind.config.ts — extend.colors\n{\n${entries.join("\n")}\n}`;
}
