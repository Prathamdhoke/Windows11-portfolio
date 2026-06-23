import React from "react";
import { portfolioData } from "@/data/portfolio";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

export function AboutWindow() {
  const { user, social } = portfolioData;

  return (
    <div className="p-8 text-white h-full flex flex-col items-center justify-center relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="flex flex-col items-center max-w-2xl text-center z-10">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-primary rounded-full blur-xl opacity-30 animate-pulse" />
          <img
            src={user.avatar}
            alt={user.name}
            className="w-32 h-32 rounded-full border-2 border-white/20 object-cover shadow-2xl relative z-10"
          />
        </div>

        <h1 className="text-4xl font-bold mb-2 tracking-tight">{user.name}</h1>
        <p className="text-xl text-primary mb-6">{user.role}</p>
        <p className="text-white/60 text-sm
         mb-6">{user.education}</p>
        <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-xl">
          {user.bio}
        </p>

        <div className="flex items-center gap-4">
          <SocialLink href={social.github} icon={<Github />} label="GitHub" />
          <SocialLink href={social.linkedin} icon={<Linkedin />} label="LinkedIn" />
          <SocialLink href={social.twitter} icon={<Twitter />} label="Twitter" />
          <SocialLink href={`mailto:${social.email}`} icon={<Mail />} label="Email" />
        </div>
      </div>
    </div>
  );
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all hover:scale-105"
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </a>
  );
}
