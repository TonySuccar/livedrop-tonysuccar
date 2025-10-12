// /src/components/molecules/SupportLauncher.tsx
import * as React from "react";

export function SupportLauncher({
  onClick,
  label = "Ask Support",
}: {
  onClick: () => void;
  label?: string;
}) {
  const [hint, setHint] = React.useState(() => !sessionStorage.getItem("supportHintSeen"));
  React.useEffect(() => {
    if (!hint) sessionStorage.setItem("supportHintSeen", "1");
  }, [hint]);

  return (
    <div
 className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-[90]"
      role="complementary"
      aria-label="Support Launcher"
    >
      {hint && (
        <div
          className="mb-2 inline-block rounded-full bg-white px-3 py-1 text-xs text-[var(--text)] shadow"
          onAnimationEnd={() => setHint(false)}
        >
          Need help? Press <kbd className="rounded bg-[#eee] px-1">?</kbd>
        </div>
      )}

      <button
        type="button"
        onClick={onClick}
        aria-label={label}
        className="
          group inline-flex items-center gap-2 rounded-full
          bg-white px-4 py-3 text-sm font-semibold text-[var(--brand)]
          shadow-lg ring-1 ring-black/10 transition
          hover:shadow-xl active:translate-y-[1px]
          focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]
        "
      >
        {/* chat icon */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"
             className="opacity-90 group-hover:opacity-100">
          <path d="M7 17.5 3.5 20V7a4 4 0 0 1 4-4h9a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4H7Z"
                stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7.5 9h9M7.5 12h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        </svg>
        <span>{label}</span>

        {/* status dot */}
        <span className="relative inline-flex h-2.5 w-2.5 items-center justify-center">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--brand)]/30"></span>
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--brand)]"></span>
        </span>
      </button>
    </div>
  );
}
