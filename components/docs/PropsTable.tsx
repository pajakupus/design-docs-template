import { PropDef } from "@/lib/docs-data";

interface PropsTableProps {
  props: PropDef[];
}

export default function PropsTable({ props }: PropsTableProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-[18%]">
              Prop
            </th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-[30%]">
              Type
            </th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-[12%]">
              Default
            </th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-[10%]">
              Required
            </th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop, i) => (
            <tr
              key={prop.name}
              className={`border-b border-gray-100 last:border-0 ${
                i % 2 === 0 ? "bg-white" : "bg-gray-50/50"
              }`}
            >
              <td className="px-4 py-3">
                <code className="text-xs font-mono text-brand-700 bg-brand-200/30 px-1.5 py-0.5 rounded">
                  {prop.name}
                </code>
              </td>
              <td className="px-4 py-3">
                <code className="text-xs font-mono text-gray-600 bg-gray-100 px-1.5 py-0.5 rounded">
                  {prop.type}
                </code>
              </td>
              <td className="px-4 py-3">
                <code className="text-xs font-mono text-gray-500">
                  {prop.default}
                </code>
              </td>
              <td className="px-4 py-3">
                {prop.required ? (
                  <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-red-100 text-red-700">
                    Yes
                  </span>
                ) : (
                  <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-500">
                    No
                  </span>
                )}
              </td>
              <td className="px-4 py-3 text-sm text-gray-500">
                {prop.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
