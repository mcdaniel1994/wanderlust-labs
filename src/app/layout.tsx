import type { Metadata } from "next";
import type { ReactNode } from "react";

import { FavoritesProvider } from "@/components/FavoritesProvider";
import { Navbar } from "@/components/Navbar";

import "./globals.css";

export const metadata: Metadata = {
  title: "Wanderlust Labs",
  description:
    "A clean travel marketplace MVP for discovering curated experiences around the world.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <FavoritesProvider>
          <Navbar />
          <main className="pb-24 md:pb-0">{children}</main>
        </FavoritesProvider>
      </body>
    </html>
  );
}
