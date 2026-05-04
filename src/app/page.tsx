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

// Home page category shortcuts. Each tile links into the explorer with a category query string.
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
  // useRouter is only needed on this page to submit the hero search form.
  const router = useRouter();
  // Local draft text stays on the home page until the user submits the form.
  const [search, setSearch] = useState("");
  // The home page previews the first four records as the MVP's trending set.
  const trendingExperiences = experiences.slice(0, 4);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedSearch = search.trim();
    // Search on the home page hands off to the explorer route, where URL filters are managed.
    const href = trimmedSearch
      ? `/experiences?search=${encodeURIComponent(trimmedSearch)}`
      : "/experiences";

    router.push(href);
  };

  return (
    <div>
      {/* Hero: image-led first impression with search and primary catalog entry point. */}
      <section className="relative isolate min-h-[620px] overflow-hidden bg-slate-950 sm:min-h-[680px] lg:min-h-[720px]">
        <div className="absolute inset-0">
          {/* priority keeps the above-the-fold hero image from loading late. */}
          <Image
            src={sitePhotos.hero}
            alt="Turquoise mountain lake surrounded by alpine peaks"
            fill
            unoptimized
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/45 to-slate-950/10" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-950/70 to-transparent" />
        </div>

        <div className="relative mx-auto flex min-h-[620px] max-w-7xl items-end px-4 pb-12 pt-20 sm:min-h-[680px] sm:px-6 sm:pb-16 lg:min-h-[720px] lg:px-8 lg:pb-20">
          <div className="min-w-0 max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-cyan-100">
              Wanderlust Labs
            </p>
            <h1 className="mt-4 max-w-[22rem] text-4xl font-bold tracking-tight text-white sm:max-w-3xl sm:text-5xl lg:text-7xl">
              Discover experiences worth traveling for
            </h1>
            <p className="mt-5 max-w-[22rem] text-base leading-7 text-slate-100 sm:max-w-2xl sm:text-lg sm:leading-8">
              Explore curated adventures, cultural walks, food experiences,
              nature escapes, and wellness moments from destinations around the
              world.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              {/* Primary CTA starts users directly in the full catalog. */}
              <Link
                href="/experiences"
                className="inline-flex h-12 w-full max-w-[22rem] items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-cyan-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-950 sm:w-auto"
              >
                Explore Experiences
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-6 flex w-full max-w-[22rem] flex-col gap-2 rounded-[1.75rem] border border-white/40 bg-white/95 p-2 shadow-[0_24px_60px_rgba(15,23,42,0.28)] backdrop-blur sm:max-w-3xl sm:flex-row sm:items-center sm:rounded-full"
            >
              {/* This input only searches titles; useFilters/useExperiences handle filtering on /experiences. */}
              <label className="relative min-w-0 flex-1">
                <span className="sr-only">Search experience titles</span>
                <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search by experience title"
                  className="h-14 w-full rounded-2xl border-0 bg-transparent pl-12 pr-4 text-base text-slate-950 placeholder:text-slate-500 focus:ring-0 sm:rounded-full"
                />
              </label>
              <button
                type="submit"
                className="inline-flex h-12 items-center justify-center rounded-2xl bg-brand-700 px-7 text-sm font-semibold text-white transition hover:bg-brand-800 focus:outline-none focus:ring-2 focus:ring-brand-700 focus:ring-offset-2 sm:h-14 sm:rounded-full sm:px-9"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Category shortcuts: each card preloads one filter on the explorer page. */}
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

      {/* Trending preview reuses the same grid/card system as the explorer. */}
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
