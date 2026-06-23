import React, { useState, useEffect } from "react";
import { Wifi, Volume2, Battery, ChevronUp, UserRound, FolderKanban, Cpu, MessageCircle, Terminal } from "lucide-react";

function WindowsLogo({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 12.402l35.687-4.86.016 34.423-35.67.203L0 12.402z" fill="#0078D4"/>
      <path d="M39.89 6.958L87.314 0v41.527l-47.424.476V6.958z" fill="#0078D4"/>
      <path d="M.033 45.396l35.67.195-.052 34.39L.024 75.17l.009-29.774z" fill="#0078D4"/>
      <path d="M39.89 46.371l47.424.476V88L39.89 81.052V46.371z" fill="#0078D4"/>
    </svg>
  );
}

interface TaskbarProps {
  onStartClick: () => void;
  openWindows: string[];
  activeWindow: string | null;
  onAppClick: (id: string) => void;
}

export function Taskbar({ onStartClick, openWindows, activeWindow, onAppClick }: TaskbarProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const apps = [
    { id: "about", name: "About Me", icon: <UserRound size={20} className="text-sky-300" /> },
    { id: "projects", name: "Projects", icon: <FolderKanban size={20} className="text-amber-300" /> },
    { id: "skills", name: "Skills", icon: <Cpu size={20} className="text-emerald-300" /> },
    { id: "contact", name: "Contact", icon: <MessageCircle size={20} className="text-violet-300" /> },
    { id: "terminal", name: "Terminal", icon: <Terminal size={20} className="text-white/70" /> },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 h-12 glass-panel border-t border-white/10 z-[100] flex items-center justify-between px-4 select-none">

      <div className="flex-1" />

      {/* Center — Start + open apps */}
      <div className="flex items-center gap-1">
        <button
          onClick={onStartClick}
          data-testid="taskbar-start"
          className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-white/10 transition-colors"
        >
          <WindowsLogo size={20} />
        </button>

        {apps.filter(app => openWindows.includes(app.id)).map(app => (
          <button
            key={app.id}
            onClick={() => onAppClick(app.id)}
            data-testid={`taskbar-app-${app.id}`}
            className={`w-10 h-10 flex items-center justify-center rounded-md transition-colors relative ${
              activeWindow === app.id ? "bg-white/10" : "hover:bg-white/5"
            }`}
          >
            {app.icon}
            <div
              className={`absolute bottom-0 h-[3px] rounded-t-full transition-all ${
                activeWindow === app.id ? "w-4 bg-[#0078D4]" : "w-1.5 bg-white/40"
              }`}
            />
          </button>
        ))}
      </div>

      {/* Right — System tray */}
      <div className="flex-1 flex justify-end">
        <div className="flex items-center gap-2 px-2 hover:bg-white/10 rounded-md transition-colors cursor-default py-1">
          <ChevronUp size={14} className="text-white/70 mr-0.5" />
          <Wifi size={15} className="text-white/80" />
          <Volume2 size={15} className="text-white/80" />
          <Battery size={15} className="text-white/80" />
          <div className="flex flex-col items-end ml-2 text-[11px] text-white/90 font-medium leading-tight">
            <span>{time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
            <span>{time.toLocaleDateString([], { month: "2-digit", day: "2-digit", year: "numeric" })}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
