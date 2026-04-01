import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "SCM Blog - 공급망 관리 실무 지식";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: "#111827",
              letterSpacing: "-0.025em",
            }}
          >
            SCM Blog
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#6b7280",
            }}
          >
            공급망 관리 실무 지식을 쉽게 풀어서
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
