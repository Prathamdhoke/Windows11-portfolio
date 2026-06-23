import React from "react";
import { motion } from "framer-motion";
import { Search, Power, UserRound, FolderKanban, Cpu, MessageCircle, Terminal, Github, Linkedin } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenApp: (id: string) => void;
  onShutdown: () => void;
}

export function StartMenu({ isOpen, onClose, onOpenApp, onShutdown }: StartMenuProps) {
  if (!isOpen) return null;

  const pinnedApps = [
    { id: "about", name: "About Me", icon: <UserRound size={26} className="text-sky-300" /> },
    { id: "projects", name: "Projects", icon: <FolderKanban size={26} className="text-amber-300" /> },
    { id: "skills", name: "Skills", icon: <Cpu size={26} className="text-emerald-300" /> },
    { id: "contact", name: "Contact", icon: <MessageCircle size={26} className="text-violet-300" /> },
    { id: "terminal", name: "Terminal", icon: <Terminal size={26} className="text-white/75" /> },
  ];

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="fixed bottom-16 left-1/2 -translate-x-1/2 w-[600px] h-[700px] glass-panel rounded-xl border border-white/10 shadow-2xl z-50 flex flex-col overflow-hidden bg-[#1e1e24]/90"
      >
        {/* Search */}
        <div className="p-6 pb-2">
          <div className="bg-black/30 border border-white/10 rounded-full px-4 py-2 flex items-center gap-3">
            <Search size={16} className="text-white/50" />
            <input
              type="text"
              placeholder="Type here to search"
              className="bg-transparent border-none outline-none text-white/90 text-sm flex-1 placeholder:text-white/50"
            />
          </div>
        </div>

        {/* Pinned */}
        <div className="p-6 pt-4 flex-1">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-semibold text-white/90">Pinned</h3>
            <button className="text-xs bg-white/5 hover:bg-white/10 px-2 py-1 rounded text-white/80 transition-colors">
              All apps
            </button>
          </div>

          <div className="grid grid-cols-6 gap-y-6">
            {pinnedApps.map(app => (
              <button
                key={app.id}
                onClick={() => { onOpenApp(app.id); onClose(); }}
                className="flex flex-col items-center gap-2 hover:bg-white/5 p-2 rounded-lg transition-colors group"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-xl border border-white/5 group-hover:border-white/15 transition-colors">
                  {app.icon}
                </div>
                <span className="text-xs text-white/80 truncate w-full text-center">{app.name}</span>
              </button>
            ))}
          </div>

          <div className="mt-8 flex justify-between items-center mb-4">
            <h3 className="text-sm font-semibold text-white/90">Recommended</h3>
            <button className="text-xs bg-white/5 hover:bg-white/10 px-2 py-1 rounded text-white/80 transition-colors">
              More
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <a
              href={portfolioData.social.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
            >
              <div className="bg-white/10 p-2 rounded-md"><Github size={18} className="text-white/80" /></div>
              <div>
                <div className="text-sm text-white/90">GitHub Profile</div>
                <div className="text-xs text-white/50">Recently updated</div>
              </div>
            </a>
            <a
              href={portfolioData.social.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
            >
              <div className="bg-white/10 p-2 rounded-md"><Linkedin size={18} className="text-blue-400" /></div>
              <div>
                <div className="text-sm text-white/90">LinkedIn</div>
                <div className="text-xs text-white/50">Connect</div>
              </div>
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="h-16 bg-black/20 backdrop-blur-md flex items-center justify-between px-6 border-t border-white/5">
          <div className="flex items-center gap-3 hover:bg-white/5 p-2 rounded-lg cursor-pointer transition-colors">
            <img
              src={portfolioData.user.avatar}
              className="w-8 h-8 rounded-full border border-white/20"
              alt="User"
            />
            <span className="text-sm font-medium text-white/90">{portfolioData.user.greeting}</span>
          </div>

          <button
            onClick={onShutdown}
            data-testid="start-menu-power"
            title="Shut down"
            className="p-2 hover:bg-red-500/20 hover:text-red-400 rounded-lg transition-colors text-white/60 group"
          >
            <Power size={18} />
          </button>
        </div>
      </motion.div>
    </>
  );
}
