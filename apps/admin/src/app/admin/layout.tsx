import HydrationZustand from "@repo/ui/providers/hydration";

import Navbar from "@/components/dashboard/navigation/navbar";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <HydrationZustand>
      <Navbar />
      <div className="p-5">{children}</div>
    </HydrationZustand>
  );
}
