import Sidebar from "@/components/sidebar";

export default function ServiceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex items-start">
      <Sidebar />
      <div className="w-full mx-12 mt-10">{children}</div>
    </main>
  );
}
