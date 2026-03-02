import { DesignToken } from "@/lib/docs-data";

interface TokenTableProps {
  tokens: DesignToken[];
}

export default function TokenTable({ tokens }: TokenTableProps) {
  // Group by category
  const categories = Array.from(new Set(tokens.map((t) => t.category)));

  return (
    <div className="space-y-6">
      {categories.map((category) => {
        const categoryTokens = tokens.filter((t) => t.category === category);
        return (
          <div key={category}>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
              {category}
            </h3>
            <div className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-[40%]">
                      Token
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-[25%]">
                      Value
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Usage
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {categoryTokens.map((token, i) => (
                    <tr
                      key={token.name}
                      className={`border-b border-gray-100 last:border-0 ${
                        i % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                      }`}
                    >
                      <td className="px-4 py-3">
                        <code className="text-xs font-mono text-terracotta-700 bg-terracotta-200/30 px-1.5 py-0.5 rounded">
                          {token.name}
                        </code>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          {/* Color swatch if value looks like a hex color */}
                          {/^#[0-9A-Fa-f]{3,8}$/.test(token.value) && (
                            <span
                              className="inline-block w-4 h-4 rounded-sm border border-gray-200 flex-shrink-0"
                              style={{ backgroundColor: token.value }}
                            />
                          )}
                          <code className="text-xs font-mono text-gray-700">
                            {token.value}
                          </code>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {token.usage}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
}
