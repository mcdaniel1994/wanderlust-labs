"use client";

import Image from "next/image";
import { Heart, MapPin, Mountain, Sparkles } from "lucide-react";

import { ExperienceGrid } from "@/components/ExperienceGrid";
import { experiences } from "@/data/experiences";
import { sitePhotos } from "@/data/photos";
import { useFavorites } from "@/hooks/useFavorites";

const stats = [
  { label: "Explored destinations", value: "12" },
  { label: "Experiences explored", value: "18" },
];

const highlights = [
  { label: "Top category", value: "Adventure", icon: Mountain },
  { label: "Most explored region", value: "Asia", icon: MapPin },
  { label: "Travel style", value: "Explorer", icon: Sparkles },
];

export default function ProfilePage() {
  const { favorites, count } = useFavorites();
  const recentlySaved = favorites
    .slice()
    .reverse()
    .map((id) => experiences.find((experience) => experience.id === id))
    .filter((experience): experience is (typeof experiences)[number] =>
      Boolean(experience),
    )
    .slice(0, 4);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="relative h-28 w-28 flex-none overflow-hidden rounded-full border-4 border-brand-50 bg-slate-100">
            <Image
              src={sitePhotos.profileAvatar}
              alt="Emma Walker travel profile portrait"
              fill
              unoptimized
              priority
              sizes="112px"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">
              Mock profile
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
              Emma Walker
            </h1>
            <p className="mt-1 text-sm font-medium text-slate-500">
              @emmaexplores
            </p>
            <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
              <MapPin className="h-4 w-4 text-brand-700" />
              Austin, Texas, USA
            </p>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              Curious traveler drawn to outdoor adventures, lively food markets,
              quiet design hotels, and long walks through unfamiliar cities.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-medium text-slate-500">Favorites</p>
            <Heart className="h-5 w-5 text-red-500" />
          </div>
          <p className="mt-3 text-3xl font-bold text-slate-950">{count}</p>
        </div>
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
            <p className="mt-3 text-3xl font-bold text-slate-950">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        {highlights.map((highlight) => {
          const Icon = highlight.icon;

          return (
            <div
              key={highlight.label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                <Icon className="h-5 w-5" />
              </span>
              <p className="mt-4 text-sm font-medium text-slate-500">
                {highlight.label}
              </p>
              <p className="mt-1 text-lg font-semibold text-slate-950">
                {highlight.value}
              </p>
            </div>
          );
        })}
      </div>

      {recentlySaved.length > 0 ? (
        <div className="mt-12">
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-slate-950">
            Recently saved
          </h2>
          <ExperienceGrid experiences={recentlySaved} />
        </div>
      ) : null}
    </section>
  );
}
