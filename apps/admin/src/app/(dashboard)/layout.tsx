import Navbar from "@/components/dashboard/navbar";
import React from "react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}): JSX.Element {
    return (
        <React.Fragment>
            <Navbar />
            <div className="p-5">
                {children}
            </div>
        </React.Fragment>
    );
}