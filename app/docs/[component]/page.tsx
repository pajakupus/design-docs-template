import { componentDocs, navigation } from "@/lib/docs-data";
import ComponentTabs from "@/components/docs/ComponentTabs";

interface PageProps {
  params: Promise<{ component: string }>;
}

export function generateStaticParams() {
  return navigation.flatMap((section) =>
    section.items.map((item) => ({ component: item.slug }))
  );
}

export default async function ComponentPage({ params }: PageProps) {
  const { component } = await params;
  const doc = componentDocs[component];

  if (!doc) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">Coming soon</h2>
          <p className="mt-2 text-sm text-gray-500">
            Documentation for{" "}
            <span className="font-medium text-terracotta-600">{component}</span>{" "}
            is being written.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-8 py-8">
      {/* Page header */}
      <div className="mb-8 pb-6 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-medium text-terracotta-600 uppercase tracking-wider">
            Component
          </span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          {doc.name}
        </h1>
        <p className="mt-2 text-base text-gray-500 max-w-2xl">
          {doc.description}
        </p>
      </div>

      {/* Tabs */}
      <ComponentTabs doc={doc} />
    </div>
  );
}
