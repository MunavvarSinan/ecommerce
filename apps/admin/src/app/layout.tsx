import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { cn } from "@repo/ui/lib/utils";
import { NextThemesProvider } from "@repo/ui/providers/theme-provider";
import { ApolloWrapper } from "@repo/ui/providers/apollo-provider";

import { ReactHotToast } from "@/providers/hot-toast-provider";

import "@repo/ui/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Turborepo",
  description: "Generated by create turbo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const cookieStore = cookies();
  const delay = Number(cookieStore.get("apollo-x-custom-delay")?.value ?? 1000);
  const token = cookieStore.get("token")?.value ?? "";
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          "min-h-screen bg-background font-sans antialiased",
        )}
      >
        <NextThemesProvider>
          <ApolloWrapper delay={delay} token={token}>
            <ReactHotToast />
            {children}
          </ApolloWrapper>
        </NextThemesProvider>
      </body>
    </html>
  );
}
