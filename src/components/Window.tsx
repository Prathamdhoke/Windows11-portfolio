import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, Minimize2, X } from "lucide-react";

interface WindowProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  isActive: boolean;
  isMinimized: boolean;
  zIndex: number;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onFocus: (id: string) => void;
}

export function Window({
  id,
  title,
  icon,
  children,
  isActive,
  isMinimized,
  zIndex,
  onClose,
  onMinimize,
  onFocus,
}: WindowProps) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [position, setPosition] = useState({ x: window.innerWidth / 2 - 300, y: window.innerHeight / 2 - 200 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{ startX: number; startY: number; initialX: number; initialY: number } | null>(null);

  useEffect(() => {
    const randX = Math.floor(Math.random() * 100) + window.innerWidth / 2 - 400;
    const randY = Math.floor(Math.random() * 100) + window.innerHeight / 2 - 300;
    setPosition({ x: randX, y: randY });
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (isMaximized) return;
    setIsDragging(true);
    onFocus(id);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialX: position.x,
      initialY: position.y,
    };
    const target = e.target as HTMLElement;
    target.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !dragRef.current) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    setPosition({
      x: dragRef.current.initialX + dx,
      y: Math.max(0, dragRef.current.initialY + dy),
    });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    dragRef.current = null;
    const target = e.target as HTMLElement;
    if (target.hasPointerCapture(e.pointerId)) {
      target.releasePointerCapture(e.pointerId);
    }
  };

  if (isMinimized) return null;

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ duration: 0.2 }}
      onPointerDown={() => onFocus(id)}
      style={{
        position: "fixed",
        top: isMaximized ? 0 : position.y,
        left: isMaximized ? 0 : position.x,
        width: isMaximized ? "100%" : 800,
        height: isMaximized ? "calc(100% - 48px)" : 600,
        zIndex,
        boxShadow: isActive ? "0 12px 48px rgba(0,0,0,0.6)" : "0 8px 32px rgba(0,0,0,0.5)",
      }}
      className={`glass-panel flex flex-col rounded-xl overflow-hidden border border-white/10 ${
        isActive ? "border-white/20" : ""
      }`}
    >
      {/* Title Bar */}
      <div
        className="flex items-center justify-between px-4 py-2 bg-black/20 backdrop-blur-md select-none touch-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onDoubleClick={() => setIsMaximized(!isMaximized)}
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
      >
        <div className="flex items-center gap-2 pointer-events-none">
          <div className="text-primary">{icon}</div>
          <span className="text-sm font-medium text-white/90">{title}</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={(e) => { e.stopPropagation(); onMinimize(id); }}
            className="p-1.5 rounded-md hover:bg-white/10 text-white/70 hover:text-white transition-colors"
          >
            <Minimize2 size={14} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setIsMaximized(!isMaximized); }}
            className="p-1.5 rounded-md hover:bg-white/10 text-white/70 hover:text-white transition-colors"
          >
            <Maximize2 size={14} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onClose(id); }}
            className="p-1.5 rounded-md hover:bg-red-500 text-white/70 hover:text-white transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto win-scrollbar bg-background/80 relative">
        {isActive && <div className="absolute inset-0 pointer-events-none border-[0.5px] border-white/5" />}
        {children}
      </div>
    </motion.div>
  );
}
