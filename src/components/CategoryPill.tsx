import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";

interface CategoryPillProps {
  label: string;
  category: string;
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
    <Link
      href={`/experiences?category=${encodeURIComponent(category)}`}
      className="group relative flex min-h-40 flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 p-5 shadow-sm transition hover:-translate-y-1 hover:border-brand-100 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-brand-700 focus:ring-offset-2"
    >
      <Image
        src={imageUrl}
        alt={`${label} travel experience`}
        fill
        unoptimized
        sizes="(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover transition duration-500 group-hover:scale-105"
      />
      <span className="absolute inset-0 bg-gradient-to-b from-slate-950/25 via-slate-950/20 to-slate-950/75" />
      <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-brand-700 shadow-sm transition group-hover:bg-brand-700 group-hover:text-white">
        <Icon className="h-5 w-5" />
      </span>
      <span className="relative text-base font-semibold text-white">
        {label}
      </span>
    </Link>
  );
}
