// Takoyaki (たこ焼き) spinner — a rotating takoyaki ball with sauce drizzle,
// 鰹節 flakes and a pick. Osaka's street-food icon as a loading indicator.
// Drop-in replacement for <Loader2 /> when we want an Osaka motif.

export function TakoyakiSpinner({ size = 16 }: { size?: number }) {
  return (
    <span className="takoyaki-spinner" style={{ width: size, height: size }} aria-hidden="true">
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        {/* the ball */}
        <circle cx="12" cy="13" r="8" fill="currentColor" opacity="0.25" />
        <circle cx="12" cy="13" r="8" stroke="currentColor" strokeWidth="2" />
        {/* sauce drizzle */}
        <path
          d="M6.5 11.5c1.6-1.4 3.4 1.2 5.5 0s3.6 1.2 5.5 0"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        {/* katsuobushi flakes */}
        <path d="M9 15.6l1-.6M14 16.2l1-.6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        {/* the pick */}
        <path d="M15.5 6.5L20 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </span>
  );
}
