import { Suspense } from "react";

import { ExplorerPageClient } from "@/components/ExplorerPageClient";

// This fallback shows while the client explorer reads search params and builds filtered results.
function ExplorerFallback() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Skeleton title block mirrors the real explorer header. */}
      <div className="h-10 w-64 animate-pulse rounded-xl bg-slate-200" />
      {/* Skeleton search/filter surface keeps layout stable during hydration. */}
      <div className="mt-8 h-14 animate-pulse rounded-2xl bg-slate-200" />
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Eight placeholder cards approximate the initial catalog grid. */}
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
    // useSearchParams needs a Suspense boundary in the App Router.
    <Suspense fallback={<ExplorerFallback />}>
      <ExplorerPageClient />
    </Suspense>
  );
}
