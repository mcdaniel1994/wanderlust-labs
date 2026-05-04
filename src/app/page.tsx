"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Binoculars,
  Compass,
  Leaf,
  Search,
  Sparkles,
  Utensils,
} from "lucide-react";
import { FormEvent, useState } from "react";

import { CategoryPill } from "@/components/CategoryPill";
import { ExperienceGrid } from "@/components/ExperienceGrid";
import { experiences } from "@/data/experiences";
import { categoryPhotos, sitePhotos } from "@/data/photos";

const categoryTiles = [
  {
    label: "Adventure",
    category: "Adventure",
    icon: Compass,
    imageUrl: categoryPhotos.Adventure,
  },
  {
    label: "Culture",
    category: "Culture",
    icon: Binoculars,
    imageUrl: categoryPhotos.Culture,
  },
  {
    label: "Food & Drink",
    category: "Food",
    icon: Utensils,
    imageUrl: categoryPhotos.Food,
  },
  {
    label: "Nature",
    category: "Nature",
    icon: Leaf,
    imageUrl: categoryPhotos.Nature,
  },
  {
    label: "Wellness",
    category: "Wellness",
    icon: Sparkles,
    imageUrl: categoryPhotos.Wellness,
  },
];

export default function HomePage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const trendingExperiences = experiences.slice(0, 4);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedSearch = search.trim();
    const href = trimmedSearch
      ? `/experiences?search=${encodeURIComponent(trimmedSearch)}`
      : "/experiences";

    router.push(href);
  };

  return (
    <div>
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1fr_0.95fr] md:items-center lg:px-8 lg:py-16">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">
            Wanderlust Labs
          </p>
          <h1 className="mt-4 max-w-2xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Discover experiences worth traveling for
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
            Explore curated adventures, cultural walks, food experiences, nature
            escapes, and wellness moments from destinations around the world.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/experiences"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-800 focus:outline-none focus:ring-2 focus:ring-brand-700 focus:ring-offset-2"
            >
              Explore Experiences
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <form
            onSubmit={handleSubmit}
            className="mt-6 flex max-w-xl flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm sm:flex-row"
          >
            <label className="relative flex-1">
              <span className="sr-only">Search experience titles</span>
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by experience title"
                className="h-12 w-full rounded-xl border-0 bg-transparent pl-12 pr-4 text-base text-slate-950 placeholder:text-slate-400 focus:ring-0"
              />
            </label>
            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-brand-700 px-5 text-sm font-semibold text-white transition hover:bg-brand-800 focus:outline-none focus:ring-2 focus:ring-brand-700 focus:ring-offset-2"
            >
              Search
            </button>
          </form>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-slate-200 shadow-card">
          <Image
            src={sitePhotos.hero}
            alt="Turquoise mountain lake surrounded by alpine peaks"
            fill
            unoptimized
            priority
            sizes="(min-width: 1024px) 560px, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">
            Browse by category
          </h2>
          <Link
            href="/experiences"
            className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:text-brand-800"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {categoryTiles.map((tile) => (
            <CategoryPill key={tile.category} {...tile} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 pb-16 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">
            Trending experiences
          </h2>
          <Link
            href="/experiences"
            className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:text-brand-800"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <ExperienceGrid experiences={trendingExperiences} />
      </section>
    </div>
  );
}
