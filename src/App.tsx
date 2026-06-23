import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  UserRound,
  FolderKanban,
  Cpu,
  MessageCircle,
  Terminal,
} from "lucide-react";
import { Desktop } from "./components/Desktop";
import { Taskbar } from "./components/Taskbar";
import { StartMenu } from "./components/StartMenu";
import { Window } from "./components/Window";
import { AboutWindow } from "./components/windows/AboutWindow";
import { ProjectsWindow } from "./components/windows/ProjectsWindow";
import { SkillsWindow } from "./components/windows/SkillsWindow";
import { ContactWindow } from "./components/windows/ContactWindow";
import { TerminalWindow } from "./components/windows/TerminalWindow";

interface AppState {
  id: string;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
}

const APPS = [
  {
    id: "about",
    title: "About Me",
    icon: <UserRound size={16} />,
    component: <AboutWindow />,
  },
  {
    id: "projects",
    title: "Projects",
    icon: <FolderKanban size={16} />,
    component: <ProjectsWindow />,
  },
  {
    id: "skills",
    title: "Skills",
    icon: <Cpu size={16} />,
    component: <SkillsWindow />,
  },
  {
    id: "contact",
    title: "Contact",
    icon: <MessageCircle size={16} />,
    component: <ContactWindow />,
  },
  {
    id: "terminal",
    title: "Terminal",
    icon: <Terminal size={16} />,
    component: <TerminalWindow />,
  },
];

function App() {
  const [windows, setWindows] = useState<AppState[]>([]);
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [maxZIndex, setMaxZIndex] = useState(10);
  const [isShuttingDown, setIsShuttingDown] = useState(false);
  const [shutdownPhase, setShutdownPhase] = useState<
    "idle" | "shutting" | "off"
  >("idle");

  const handleShutdown = () => {
    setIsShuttingDown(true);
    setShutdownPhase("shutting");
    setStartMenuOpen(false);
    setTimeout(() => setShutdownPhase("off"), 2500);
  };

  const handlePowerOn = () => {
    setShutdownPhase("shutting");
    setTimeout(() => {
      setIsShuttingDown(false);
      setShutdownPhase("idle");
    }, 800);
  };

  const handleOpenApp = (id: string) => {
    setWindows((prev) => {
      const existing = prev.find((w) => w.id === id);
      const newZ = maxZIndex + 1;
      setMaxZIndex(newZ);
      if (existing) {
        return prev.map((w) =>
          w.id === id
            ? { ...w, isOpen: true, isMinimized: false, zIndex: newZ }
            : w,
        );
      } else {
        return [
          ...prev,
          { id, isOpen: true, isMinimized: false, zIndex: newZ },
        ];
      }
    });
    setStartMenuOpen(false);
  };

  const handleCloseApp = (id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  };

  const handleMinimizeApp = (id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w)),
    );
  };

  const handleFocusApp = (id: string) => {
    setWindows((prev) => {
      const window = prev.find((w) => w.id === id);
      if (!window || window.zIndex === maxZIndex) return prev;
      const newZ = maxZIndex + 1;
      setMaxZIndex(newZ);
      return prev.map((w) =>
        w.id === id ? { ...w, zIndex: newZ, isMinimized: false } : w,
      );
    });
    setStartMenuOpen(false);
  };

  const handleTaskbarAppClick = (id: string) => {
    const w = windows.find((w) => w.id === id);
    if (!w) {
      handleOpenApp(id);
    } else if (w.isMinimized) {
      handleFocusApp(id);
    } else if (w.zIndex === maxZIndex) {
      handleMinimizeApp(id);
    } else {
      handleFocusApp(id);
    }
  };

  const activeWindow =
    windows.filter((w) => !w.isMinimized).sort((a, b) => b.zIndex - a.zIndex)[0]
      ?.id || null;

  return (
    <div className="w-screen h-screen overflow-hidden bg-black text-foreground font-sans relative selection:bg-primary/50">
      <Desktop
        onOpenApp={handleOpenApp}
        openWindows={windows.map((w) => w.id)}
      />

      <AnimatePresence>
        {windows
          .filter((w) => w.isOpen)
          .map((w) => {
            const appDef = APPS.find((a) => a.id === w.id);
            if (!appDef) return null;
            return (
              <Window
                key={w.id}
                id={w.id}
                title={appDef.title}
                icon={appDef.icon}
                isActive={w.id === activeWindow}
                isMinimized={w.isMinimized}
                zIndex={w.zIndex}
                onClose={handleCloseApp}
                onMinimize={handleMinimizeApp}
                onFocus={handleFocusApp}
              >
                {appDef.component}
              </Window>
            );
          })}
      </AnimatePresence>

      <AnimatePresence>
        <StartMenu
          isOpen={startMenuOpen}
          onClose={() => setStartMenuOpen(false)}
          onOpenApp={handleOpenApp}
          onShutdown={handleShutdown}
        />
      </AnimatePresence>

      <Taskbar
        onStartClick={() => setStartMenuOpen(!startMenuOpen)}
        openWindows={windows.filter((w) => w.isOpen).map((w) => w.id)}
        activeWindow={activeWindow}
        onAppClick={handleTaskbarAppClick}
      />

      {/* Shutdown overlay */}
      <AnimatePresence>
        {isShuttingDown && (
          <motion.div
            key="shutdown"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-[999] bg-black flex flex-col items-center justify-center gap-8"
          >
            {shutdownPhase === "shutting" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex flex-col items-center gap-6"
              >
                <div className="w-12 h-12">
                  <svg
                    viewBox="0 0 88 88"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="opacity-60"
                  >
                    <path
                      d="M0 12.402l35.687-4.86.016 34.423-35.67.203L0 12.402z"
                      fill="#0078D4"
                    />
                    <path
                      d="M39.89 6.958L87.314 0v41.527l-47.424.476V6.958z"
                      fill="#0078D4"
                    />
                    <path
                      d="M.033 45.396l35.67.195-.052 34.39L.024 75.17l.009-29.774z"
                      fill="#0078D4"
                    />
                    <path
                      d="M39.89 46.371l47.424.476V88L39.89 81.052V46.371z"
                      fill="#0078D4"
                    />
                  </svg>
                </div>
                <div className="flex gap-1.5">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 rounded-full bg-white/60"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        delay: i * 0.15,
                      }}
                    />
                  ))}
                </div>
                <p className="text-white/50 text-sm tracking-widest uppercase">
                  Shutting down
                </p>
              </motion.div>
            )}

            {shutdownPhase === "off" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center gap-6"
              >
                <p className="text-white/30 text-sm tracking-widest uppercase">
                  This PC has been shut down
                </p>
                <button
                  onClick={handlePowerOn}
                  className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white/60 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all text-sm tracking-wide"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18.36 6.64A9 9 0 1 1 5.64 6.64" />
                    <line x1="12" y1="2" x2="12" y2="12" />
                  </svg>
                  Power on
                </button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
