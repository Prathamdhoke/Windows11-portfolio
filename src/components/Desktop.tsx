import React from "react";
import { UserRound, FolderKanban, Cpu, MessageCircle, Terminal } from "lucide-react";

interface DesktopProps {
  onOpenApp: (id: string) => void;
  openWindows: string[];
}

const PANES = [
  { word: "Welcome" },
  { word: "to" },
  { word: "my" },
  { word: "Portfolio" },
];

function WelcomeLogo() {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
      style={{ paddingBottom: "48px", zIndex: 1 }}
    >
      {/* 3D perspective wrapper */}
      <div
        style={{
          transform: "perspective(900px) rotateY(-6deg) rotateX(3deg)",
          filter:
            "drop-shadow(0 30px 60px rgba(0,80,200,0.55)) drop-shadow(0 8px 20px rgba(0,40,140,0.6))",
        }}
      >
        {/* Outer glass shell — fills the cross-gap so the logo reads as one solid object */}
        <div
          style={{
            padding: "18px",
            borderRadius: "18px",
            background:
              "linear-gradient(145deg, rgba(20,70,160,0.55) 0%, rgba(8,35,100,0.70) 100%)",
            backdropFilter: "blur(22px)",
            WebkitBackdropFilter: "blur(22px)",
            border: "1px solid rgba(120,180,255,0.22)",
            boxShadow:
              "inset 0 1.5px 0 rgba(255,255,255,0.28), inset 0 -1px 0 rgba(0,0,0,0.25), 0 2px 0 rgba(255,255,255,0.08)",
          }}
        >
          {/* 2×2 grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
            }}
          >
            {PANES.map(({ word }, i) => (
              <div
                key={word}
                style={{
                  width: "158px",
                  height: "158px",
                  borderRadius: "10px",
                  position: "relative",
                  overflow: "hidden",
                  background:
                    i % 2 === 0
                      ? "linear-gradient(145deg, #1e7ee8 0%, #0d52c0 55%, #0a3ea0 100%)"
                      : "linear-gradient(145deg, #2490f5 0%, #1268d0 55%, #0d50b8 100%)",
                  boxShadow:
                    "inset 0 1.5px 0 rgba(255,255,255,0.35), inset 0 -1.5px 0 rgba(0,0,0,0.30), inset 1.5px 0 rgba(255,255,255,0.12), inset -1.5px 0 rgba(0,0,0,0.15)",
                  border: "1px solid rgba(120,180,255,0.28)",
                }}
              >
                {/* Top specular gloss */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "52%",
                    background:
                      "linear-gradient(to bottom, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.06) 70%, transparent 100%)",
                    borderRadius: "10px 10px 0 0",
                    pointerEvents: "none",
                  }}
                />
                {/* Subtle diagonal sheen */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(130deg, rgba(255,255,255,0.10) 0%, transparent 55%, rgba(0,0,0,0.08) 100%)",
                    pointerEvents: "none",
                  }}
                />
                {/* Word */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Inter', 'Segoe UI', sans-serif",
                      fontSize: word.length > 7 ? "1.05rem" : "1.20rem",
                      fontWeight: 300,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.95)",
                      textShadow:
                        "0 1px 8px rgba(0,0,0,0.40), 0 0 20px rgba(120,200,255,0.30)",
                    }}
                  >
                    {word}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom edge glow / ground reflection */}
        <div
          style={{
            marginTop: "6px",
            height: "10px",
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse at center, rgba(0,120,255,0.35) 0%, transparent 75%)",
            filter: "blur(6px)",
          }}
        />
      </div>
    </div>
  );
}

export function Desktop({ onOpenApp }: DesktopProps) {
  const apps = [
    { id: "about", name: "About Me", icon: <UserRound size={26} className="text-sky-300" /> },
    { id: "projects", name: "Projects", icon: <FolderKanban size={26} className="text-amber-300" /> },
    { id: "skills", name: "Skills", icon: <Cpu size={26} className="text-emerald-300" /> },
    { id: "contact", name: "Contact", icon: <MessageCircle size={26} className="text-violet-300" /> },
    { id: "terminal", name: "Terminal", icon: <Terminal size={26} className="text-white/75" /> },
  ];

  return (
    <div
      className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
      style={{
        background: "linear-gradient(135deg, #0a1628 0%, #0d2248 25%, #0f3460 50%, #0d2248 75%, #0a1628 100%)",
      }}
      onContextMenu={(e) => e.preventDefault()}
    >
      <WelcomeLogo />

      {/* Desktop icons */}
      <div className="relative z-10 p-4 flex flex-col gap-3 h-[calc(100vh-48px)] flex-wrap content-start">
        {apps.map((app) => (
          <button
            key={app.id}
            onClick={() => onOpenApp(app.id)}
            onDoubleClick={() => onOpenApp(app.id)}
            data-testid={`desktop-icon-${app.id}`}
            className="flex flex-col items-center justify-center w-20 h-20 gap-1.5 rounded-lg hover:bg-white/10 hover:backdrop-blur-sm transition-all group focus:bg-white/20 outline-none"
          >
            <div className="w-12 h-12 flex items-center justify-center bg-black/25 rounded-2xl shadow-lg border border-white/5 group-hover:border-white/25 group-hover:bg-black/35 transition-all">
              {app.icon}
            </div>
            <span className="text-white text-[11px] font-medium drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] tracking-wide">
              {app.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
