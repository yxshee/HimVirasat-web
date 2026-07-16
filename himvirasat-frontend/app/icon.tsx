import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#FFC900",
          border: "4px solid #000000",
          borderRadius: 14,
          overflow: "hidden",
        }}
      >
        <svg
          width="64"
          height="64"
          viewBox="0 0 64 64"
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          <path
            d="M0 46 L11 30 L22 46 L33 30 L44 46 L55 30 L64 43 V64 H0 Z"
            fill="#000000"
          />
        </svg>
      </div>
    ),
    { ...size },
  );
}
