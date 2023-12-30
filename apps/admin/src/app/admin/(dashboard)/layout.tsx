

interface AdminLayoutProps {
    children: React.ReactNode;
}

export default function AdminLayout({
    children,
}: AdminLayoutProps): JSX.Element {

    return (
        <div className="flex min-h-screen flex-col">
            <div className="container flex-1 items-start lg:gap-10">
                <main className="flex w-full flex-col overflow-hidden">{children}</main>
            </div>
        </div>
    );
}
