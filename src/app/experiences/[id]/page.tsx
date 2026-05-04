import { notFound } from "next/navigation";

import { ExperienceDetailClient } from "@/components/ExperienceDetailClient";
import { experiences } from "@/data/experiences";

export function generateStaticParams() {
  return experiences.map((experience) => ({
    id: experience.id,
  }));
}

export default async function ExperienceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const experience = experiences.find((item) => item.id === id);

  if (!experience) {
    notFound();
  }

  return <ExperienceDetailClient experience={experience} />;
}
