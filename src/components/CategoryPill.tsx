import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";

// CategoryPill is used on the home page as a visual shortcut into filtered browsing.
interface CategoryPillProps {
  // label is what users see; category is the exact query-string value.
  label: string;
  category: string;
  // icon and imageUrl let each tile feel distinct while sharing one layout.
  icon: LucideIcon;
  imageUrl: string;
}

export function CategoryPill({
  label,
  category,
  icon: Icon,
  imageUrl,
}: CategoryPillProps) {
  return (
    // Category tiles are deep links into the explorer with the matching filter preselected.
    <Link
      href={`/experiences?category=${encodeURIComponent(category)}`}
      className="group relative flex min-h-40 flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 p-5 shadow-sm transition hover:-translate-y-1 hover:border-brand-100 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-brand-700 focus:ring-offset-2"
    >
      {/* Full-bleed image sets the travel context behind the label/icon. */}
      <Image
        src={imageUrl}
        alt={`${label} travel experience`}
        fill
        unoptimized
        sizes="(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover transition duration-500 group-hover:scale-105"
      />
      {/* Gradient overlay keeps white text readable across different photo brightness. */}
      <span className="absolute inset-0 bg-gradient-to-b from-slate-950/25 via-slate-950/20 to-slate-950/75" />
      {/* Icon chip gives the tile a quick scannable category cue. */}
      <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-brand-700 shadow-sm transition group-hover:bg-brand-700 group-hover:text-white">
        <Icon className="h-5 w-5" />
      </span>
      {/* The label is intentionally short so the category grid stays compact on mobile. */}
      <span className="relative text-base font-semibold text-white">
        {label}
      </span>
    </Link>
  );
}
