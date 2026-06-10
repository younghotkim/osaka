import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
        <div
          style={{
            width: 116,
            height: 116,
            borderRadius: 9999,
            background: "#d4356c",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            boxShadow: "0 4px 12px rgba(140, 30, 74, 0.28)"
          }}
        >
          <div
            style={{
              fontSize: 48,
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
              fontSize: 15,
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
