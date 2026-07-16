import { cn } from "@/lib/utils";

/**
 * HimVirasat brand mark: marigold tile with a hard offset edge, black
 * sawtooth ridgeline, and the Takri HA monogram (first letter of
 * 𑚩𑚮𑚢𑚦𑚮𑚤𑚭𑚨𑚙). Decorative — adjacent text names the brand.
 */
export function LogoMark({
  size = 32,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={cn("shrink-0 select-none", className)}
    >
      <defs>
        <clipPath id="hv-tile">
          <rect x="2" y="2" width="54" height="54" rx="10" />
        </clipPath>
      </defs>
      {/* offset brut edge */}
      <rect x="8" y="8" width="54" height="54" rx="10" fill="#000000" />
      {/* tile */}
      <rect
        x="2"
        y="2"
        width="54"
        height="54"
        rx="10"
        fill="var(--marigold, #FFC900)"
        stroke="#000000"
        strokeWidth="3"
      />
      {/* ridgeline */}
      <path
        d="M2 46 L12 32 L22 46 L32 32 L42 46 L52 32 L56 38 V56 H2 Z"
        fill="#000000"
        clipPath="url(#hv-tile)"
      />
      {/* Takri HA monogram */}
      <text
        x="29"
        y="24"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="26"
        fill="#000000"
        className="font-takri"
      >
        𑚩
      </text>
    </svg>
  );
}
