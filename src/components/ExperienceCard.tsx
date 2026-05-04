import Image from "next/image";
import Link from "next/link";
import { MapPin, Star } from "lucide-react";

import { HeartButton } from "@/components/HeartButton";
import type { Experience } from "@/types/experience";

interface ExperienceCardProps {
  experience: Experience;
}

export function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
      <HeartButton
        id={experience.id}
        className="absolute right-3 top-3 z-10"
      />
      <Link
        href={`/experiences/${experience.id}`}
        className="block focus:outline-none focus:ring-2 focus:ring-brand-700 focus:ring-offset-2"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
          <Image
            src={experience.imageUrl}
            alt={`${experience.title} in ${experience.destination}`}
            fill
            unoptimized
            sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
        <div className="space-y-3 p-4">
          <div>
            <p className="line-clamp-2 min-h-12 text-base font-semibold leading-6 text-slate-950">
              {experience.title}
            </p>
            <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-500">
              <MapPin className="h-4 w-4 flex-none text-brand-700" />
              <span className="truncate">{experience.destination}</span>
            </p>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-1 text-sm font-medium text-slate-700">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              {experience.rating.toFixed(1)}
            </span>
            <span className="text-sm font-semibold text-brand-700">
              From ${experience.price}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
