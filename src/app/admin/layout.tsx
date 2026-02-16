import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import SessionProvider from "@/components/admin/SessionProvider";
import Sidebar from "@/components/admin/Sidebar";

export const metadata = {
  title: "Admin | TITAAN DEVELOPMENT",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <SessionProvider>
      <div className="min-h-screen bg-[#0d1f0d]">
        <Sidebar />
        <main className="ml-64 p-8 min-h-screen">{children}</main>
      </div>
    </SessionProvider>
  );
}
