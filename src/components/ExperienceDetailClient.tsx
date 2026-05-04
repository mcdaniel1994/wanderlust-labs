"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock3, Heart, Star, Target, Users } from "lucide-react";
import { useEffect } from "react";

import { useFavorites } from "@/hooks/useFavorites";
import type { Experience } from "@/types/experience";

interface ExperienceDetailClientProps {
  experience: Experience;
}

const highlights = [
  { label: "Duration", value: "4-5 hours", icon: Clock3 },
  { label: "Small group", value: "Max 12 people", icon: Users },
  { label: "Beginner friendly", value: "No experience needed", icon: Target },
  { label: "Best for", value: "Couples and friends", icon: Heart },
];

export function ExperienceDetailClient({
  experience,
}: ExperienceDetailClientProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const saved = isFavorite(experience.id);

  useEffect(() => {
    document.title = `${experience.title} | Wanderlust Labs`;
  }, [experience.title]);

  return (
    <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <Link
          href="/experiences"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-brand-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to results
        </Link>
        <button
          type="button"
          onClick={() => toggleFavorite(experience.id)}
          className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold shadow-sm transition focus:outline-none focus:ring-2 focus:ring-brand-700 focus:ring-offset-2 ${
            saved
              ? "border-red-100 bg-red-50 text-red-600 hover:bg-red-100"
              : "border-slate-200 bg-white text-slate-700 hover:border-brand-100 hover:text-brand-700"
          }`}
        >
          <Heart
            className={`h-4 w-4 ${saved ? "fill-red-500 text-red-500" : ""}`}
          />
          {saved ? "Saved" : "Save"}
        </button>
      </div>

      <div className="relative aspect-[16/9] overflow-hidden rounded-3xl bg-slate-200 shadow-card">
        <Image
          src={experience.detailImageUrl}
          alt={experience.title}
          fill
          unoptimized
          priority
          sizes="(min-width: 1024px) 1024px, 100vw"
          className="object-cover"
        />
      </div>

      <div className="mt-4 grid grid-cols-4 gap-3">
        {experience.galleryImageUrls.map((imageUrl, index) => (
          <div
            key={imageUrl}
            className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-200"
          >
            <Image
              src={imageUrl}
              alt={`${experience.title} related photo ${index + 1}`}
              fill
              unoptimized
              sizes="25vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">
            {experience.category}
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            {experience.title}
          </h1>
          <p className="mt-3 text-base text-slate-500">
            {experience.destination} · {experience.category}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:min-w-56">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
            {experience.rating.toFixed(1)}
            <span className="font-normal text-slate-400">(128 reviews)</span>
          </div>
          <p className="mt-4 text-2xl font-bold text-brand-700">
            From ${experience.price}
          </p>
        </div>
      </div>

      <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-600">
        {experience.description}
      </p>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
              <h2 className="mt-4 text-sm font-semibold text-slate-950">
                {highlight.label}
              </h2>
              <p className="mt-1 text-sm text-slate-500">{highlight.value}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
