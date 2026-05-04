"use client";

import Image from "next/image";
import Link from "next/link";
import { Bell, Heart, Home, Mountain, Search, User, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { sitePhotos } from "@/data/photos";
import { useFavorites } from "@/hooks/useFavorites";

// One link list feeds both desktop and mobile navigation so labels/routes stay aligned.
const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/experiences", label: "Explorer", icon: Search },
  { href: "/favorites", label: "Favorites", icon: Heart },
  { href: "/profile", label: "Profile", icon: User },
];

// Shared active-route helper is used by both desktop and mobile nav renders.
function isActivePath(pathname: string, href: string) {
  // Home should only be active at "/", while nested routes keep their parent nav item active.
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  // pathname drives active nav styling for top nav and bottom mobile nav.
  const pathname = usePathname();
  // count powers the favorites badges in both nav layouts.
  const { count } = useFavorites();
  // Notifications are a local demo-only modal, not connected to backend data.
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <>
      {/* Desktop/tablet sticky header with brand, center nav, and profile controls. */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <nav className="mx-auto flex w-screen max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-2 font-semibold text-slate-950"
            aria-label="Wanderlust Labs home"
          >
            <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-brand-700 text-white">
              <Mountain className="h-5 w-5" />
            </span>
            <span className="flex-none text-sm sm:text-base">
              Wanderlust Labs
            </span>
          </Link>

          <div className="hidden flex-1 items-center justify-center gap-2 md:flex">
            {/* Desktop nav text links share the same route definitions as mobile icons. */}
            {links.map((link) => {
              const active = isActivePath(pathname, link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative whitespace-nowrap px-2 py-2 text-sm font-medium transition sm:px-3 ${
                    active
                      ? "text-brand-700"
                      : "text-slate-600 hover:text-brand-700"
                  }`}
                >
                  {link.label}
                  {link.href === "/favorites" && count > 0 ? (
                    <span className="ml-1 rounded-full bg-brand-50 px-1.5 py-0.5 text-xs text-brand-700">
                      {count}
                    </span>
                  ) : null}
                  {active ? (
                    <span className="absolute inset-x-2 -bottom-1 h-0.5 rounded-full bg-brand-700" />
                  ) : null}
                </Link>
              );
            })}
          </div>

          {/* Right-side actions stay visible even when the center nav hides on mobile. */}
          <div className="ml-auto flex items-center gap-3 md:ml-0">
            <button
              type="button"
              aria-label="Notifications"
              aria-haspopup="dialog"
              aria-expanded={showNotifications}
              onClick={() => setShowNotifications(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-brand-100 hover:text-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-700 focus:ring-offset-2"
            >
              <Bell className="h-4 w-4" />
            </button>
            <Link
              href="/profile"
              aria-label="Open Emma Walker profile"
              className="relative h-10 w-10 flex-none overflow-hidden rounded-full border border-slate-200 bg-slate-100 transition hover:border-brand-200 focus:outline-none focus:ring-2 focus:ring-brand-700 focus:ring-offset-2"
            >
              <Image
                src={sitePhotos.profileAvatar}
                alt="Emma Walker"
                fill
                unoptimized
                sizes="40px"
                className="object-cover"
              />
            </Link>
          </div>
        </nav>
      </header>

      {/* Mobile bottom nav keeps the main routes reachable with one thumb. */}
      <nav
        aria-label="Primary mobile navigation"
        className="fixed bottom-0 left-0 z-50 w-screen border-t border-slate-200 bg-white/95 px-3 pb-[calc(env(safe-area-inset-bottom)+0.5rem)] pt-2 shadow-[0_-12px_30px_rgba(15,23,42,0.08)] backdrop-blur md:hidden"
      >
        <div className="mx-auto grid w-full max-w-md grid-cols-4 gap-2">
          {/* Mobile nav renders icons plus labels from the shared links list. */}
          {links.map((link) => {
            const active = isActivePath(pathname, link.href);
            const Icon = link.icon;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative flex min-h-14 min-w-0 flex-col items-center justify-center gap-1 rounded-2xl px-1 text-xs font-semibold transition sm:px-2 ${
                  active
                    ? "bg-brand-50 text-brand-700"
                    : "text-slate-500 hover:bg-slate-50 hover:text-brand-700"
                }`}
              >
                <span className="relative">
                  <Icon
                    className={`h-5 w-5 ${
                      link.href === "/favorites" && active
                        ? "fill-current"
                        : ""
                    }`}
                    strokeWidth={2.2}
                  />
                  {link.href === "/favorites" && count > 0 ? (
                    <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] leading-none text-white">
                      {count}
                    </span>
                  ) : null}
                </span>
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Demo notification dialog: opened from the bell, dismissed by backdrop or X. */}
      {showNotifications ? (
        <div
          className="fixed inset-0 z-[70] flex items-start justify-center bg-slate-950/20 px-4 pt-20 backdrop-blur-sm"
          role="presentation"
          onClick={() => setShowNotifications(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="notifications-title"
            className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-5 shadow-card"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2
                  id="notifications-title"
                  className="text-base font-semibold text-slate-950"
                >
                  Notifications
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  No notifications in the demo version.
                </p>
              </div>
              <button
                type="button"
                aria-label="Close notifications"
                onClick={() => setShowNotifications(false)}
                className="flex h-9 w-9 flex-none items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-700 focus:ring-offset-2"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
