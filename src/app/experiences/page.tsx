import { Suspense } from "react";

import { ExplorerPageClient } from "@/components/ExplorerPageClient";

function ExplorerFallback() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="h-10 w-64 animate-pulse rounded-xl bg-slate-200" />
      <div className="mt-8 h-14 animate-pulse rounded-2xl bg-slate-200" />
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }, (_, index) => (
          <div
            key={index}
            className="h-80 animate-pulse rounded-2xl bg-slate-200"
          />
        ))}
      </div>
    </section>
  );
}

export default function ExperiencesPage() {
  return (
    <Suspense fallback={<ExplorerFallback />}>
      <ExplorerPageClient />
    </Suspense>
  );
}
