import type { Metadata } from "next";
import type { ReactNode } from "react";

import { FavoritesProvider } from "@/components/FavoritesProvider";
import { Navbar } from "@/components/Navbar";

import "./globals.css";

// Default SEO metadata for routes that do not set their own title/description.
export const metadata: Metadata = {
  title: "Wanderlust Labs",
  description:
    "A clean travel marketplace MVP for discovering curated experiences around the world.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Shared client state lives here so the navbar, favorites page, and cards stay in sync. */}
        <FavoritesProvider>
          {/* Navbar appears on every route and reads the global favorites count. */}
          <Navbar />
          {/* Padding leaves room for fixed navigation on mobile and desktop. */}
          <main className="pb-24 md:pb-0 md:pt-[65px]">{children}</main>
        </FavoritesProvider>
      </body>
    </html>
  );
}
