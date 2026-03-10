import Sidebar from "@/components/layout/Sidebar";
import SearchModal from "@/components/docs/SearchModal";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
      <SearchModal />
    </div>
  );
}
