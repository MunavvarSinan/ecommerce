import Navbar from "@/components/dashboard/navbar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}): JSX.Element {
    return (
        <>
            <Navbar />
            <div className="p-5">
                {children}
            </div>
        </>
    );
}