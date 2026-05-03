import { Outlet, Link } from "react-router-dom";
import { Box, Text, Title } from "@mantine/core";
import { BrandName } from "../components/BrandName";

export default function AuthLayout({ tagline }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Left branding panel — desktop only */}
      <Box
        visibleFrom="lg"
        style={{
          width: "50%",
          position: "relative",
          background: "linear-gradient(160deg, #0a2a7a 0%, #0d3494 40%, #0a1f5e 75%, #060f30 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "3rem",
          color: "#fff",
          overflow: "hidden",
        }}
      >
        {/* Philippines map — large decorative background */}
        <img
          src="/images/philippines.svg"
          alt=""
          style={{
            position: "absolute",
            bottom: "-5%",
            right: "-10%",
            width: "85%",
            opacity: 0.12,
            pointerEvents: "none",
            userSelect: "none",
          }}
        />

        {/* Glow orbs — PH flag colors: blue, white, gold, red */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          {/* Blue glow — top right */}
          <div style={{
            position: "absolute",
            top: "-20%", right: "-20%",
            width: "90%", height: "80%",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,56,168,0.18) 0%, transparent 70%)",
            filter: "blur(80px)",
          }} />
          {/* Red glow — bottom right */}
          <div style={{
            position: "absolute",
            bottom: "-20%", right: "-10%",
            width: "85%", height: "75%",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(206,17,38,0.14) 0%, transparent 70%)",
            filter: "blur(90px)",
          }} />
          {/* Gold glow — center */}
          <div style={{
            position: "absolute",
            top: "25%", left: "-10%",
            width: "80%", height: "60%",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(252,209,22,0.1) 0%, transparent 70%)",
            filter: "blur(80px)",
          }} />
          {/* White glow — top left */}
          <div style={{
            position: "absolute",
            top: "-10%", left: "-10%",
            width: "65%", height: "55%",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 70%)",
            filter: "blur(70px)",
          }} />
        </div>

        {/* Content */}
        <Text
          component={Link}
          to="/"
          fw={500}
          size="xl"
          style={{ letterSpacing: "-0.02em", color: "#fff", textDecoration: "none", position: "relative", zIndex: 1 }}
        >
          <BrandName />
        </Text>

        <div style={{ position: "relative", zIndex: 1 }}>
          <Title
            order={1}
            mb={48}
            style={{
              fontSize: "3.5rem",
              lineHeight: 1.1,
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: "#fff",
            }}
          >
            {tagline}
          </Title>
          <Text size="xs" style={{ color: "rgba(255,255,255,0.35)", letterSpacing: "0.05em" }}>
            Built by Filipinos, for Filipinos.
          </Text>
        </div>
      </Box>

      {/* Right panel — dark blue on mobile, white on desktop */}
      <Box
        className="auth-right-panel"
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        <style>{`
          .auth-right-panel { background-color: #060f30; }
          @media (min-width: 75em) { .auth-right-panel { background-color: #ffffff; } }
        `}</style>

        {/* Mobile logo */}
        <Box
          hiddenFrom="lg"
          style={{ position: "absolute", top: "1.5rem", left: "50%", transform: "translateX(-50%)" }}
        >
          <Text fw={600} size="xl" style={{ color: "#fff", letterSpacing: "-0.02em" }}>
            <BrandName />
          </Text>
        </Box>

        <Outlet />
      </Box>
    </div>
  );
}
