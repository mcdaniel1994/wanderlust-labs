import { ExperienceCard } from "@/components/ExperienceCard";
import type { Experience } from "@/types/experience";

// Grid receives already-filtered/sliced data from its parent route or component.
interface ExperienceGridProps {
  experiences: Experience[];
}

export function ExperienceGrid({ experiences }: ExperienceGridProps) {
  return (
    // Shared responsive grid used by home, explorer, favorites, and profile sections.
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {/* Card rendering stays centralized so visual changes apply everywhere. */}
      {experiences.map((experience) => (
        // The catalog id is stable and also matches the detail route id.
        <ExperienceCard key={experience.id} experience={experience} />
      ))}
    </div>
  );
}
