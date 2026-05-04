import { notFound } from "next/navigation";

import { ExperienceDetailClient } from "@/components/ExperienceDetailClient";
import { experiences } from "@/data/experiences";

// The detail pages can be statically generated because every experience is local data.
export function generateStaticParams() {
  // Each generated param maps directly to /experiences/[id].
  return experiences.map((experience) => ({
    id: experience.id,
  }));
}

export default async function ExperienceDetailPage({
  params,
}: {
  // Next 16 passes route params as a promise in async App Router pages.
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // Route params come from /experiences/[id]; find the matching local record or show Next's 404.
  const experience = experiences.find((item) => item.id === id);

  if (!experience) {
    // notFound renders the framework-level 404 page for unknown ids.
    notFound();
  }

  // The client component handles favorites state and document title updates.
  return <ExperienceDetailClient experience={experience} />;
}
