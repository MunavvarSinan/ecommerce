"use client"

import HydrationZustand from "@repo/ui/providers/hydration";

import Navbar from "@/components/dashboard/navigation/navbar";
import { ModalProvider } from "@/providers/modal-provider";


export default function VendorDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {

  return (
    <HydrationZustand>
      <Navbar />
      <ModalProvider />
      <div className="p-5">{children}</div>
    </HydrationZustand>
  );
}
