import Link from "next/link";
import { Compass } from "lucide-react";

// Reusable blank-state block for pages that may not have matching/saved results.
interface EmptyStateProps {
  // title is required so every empty state has a clear user-facing reason.
  title: string;
  // description and actions are optional because some empty states only need a message.
  description?: string;
  actionLabel?: string;
  // Use actionHref for route navigation, or onAction for local state changes like clearing filters.
  actionHref?: string;
  onAction?: () => void;
}

export function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
}: EmptyStateProps) {
  // Shared button style keeps link-actions and callback-actions visually identical.
  const actionClass =
    "inline-flex items-center justify-center rounded-full bg-brand-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-800 focus:outline-none focus:ring-2 focus:ring-brand-700 focus:ring-offset-2";

  return (
    // Reusable empty state supports either a link action or an in-place callback action.
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center shadow-sm">
      {/* Compass icon matches the travel theme while signalling "nothing here yet." */}
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand-700">
        <Compass className="h-7 w-7" />
      </div>
      <h2 className="mt-5 text-xl font-semibold text-slate-950">{title}</h2>
      {/* Description is optional so short states do not need filler text. */}
      {description ? (
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
          {description}
        </p>
      ) : null}
      {/* Link action is used when the next step is another route. */}
      {actionLabel && actionHref ? (
        <Link href={actionHref} className={`mt-6 ${actionClass}`}>
          {actionLabel}
        </Link>
      ) : null}
      {/* Callback action is used when the next step changes state on the current page. */}
      {actionLabel && onAction ? (
        <button
          type="button"
          onClick={onAction}
          className={`mt-6 ${actionClass}`}
        >
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}
