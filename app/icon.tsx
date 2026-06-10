import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

// Dotonbori-inspired PWA icon — warm rose paper background, neon-rose disc,
// "Y&J" + "大阪" stamped over. Stays in the center 70% for Android masking.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(180deg, #fbf0ec 0%, #f3e0d8 100%)"
        }}
      >
        {/* hinomaru red disc */}
        <div
          style={{
            width: 320,
            height: 320,
            borderRadius: 9999,
            background: "#d4356c",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
            boxShadow: "0 12px 28px rgba(140, 30, 74, 0.28)"
          }}
        >
          <div
            style={{
              fontSize: 132,
              fontWeight: 900,
              color: "#fdf3f0",
              lineHeight: 1,
              letterSpacing: "-0.02em"
            }}
          >
            Y&amp;S
          </div>
          <div
            style={{
              fontSize: 40,
              fontWeight: 800,
              color: "#fdf3f0",
              letterSpacing: "0.22em",
              opacity: 0.85
            }}
          >
            大阪
          </div>
        </div>
      </div>
    ),
    size
  );
}
