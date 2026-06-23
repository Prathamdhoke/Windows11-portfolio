import React from "react";
import { portfolioData } from "@/data/portfolio";

export function SkillsWindow() {
  const { skills } = portfolioData;

  return (
    <div className="p-8 text-white h-full relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto z-10 relative">
        <h2 className="text-2xl font-bold mb-8 text-white/90">Skills & Expertise</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <SkillCategory title="Ablilities" skills={skills.abilities} color="bg-red-500" />
          <SkillCategory title="Languages" skills={skills.languages} color="bg-blue-500" />
          <SkillCategory title="Frameworks" skills={skills.frameworks} color="bg-purple-500" />
          <SkillCategory title="Tools & DevOps" skills={skills.tools} color="bg-emerald-500" />
          {/* <SkillCategory title="Design" skills={skills.design} color="bg-pink-500" /> */}
        </div>
      </div>
    </div>
  );
}

function SkillCategory({ title, skills, color }: { title: string; skills: string[], color: string }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4 text-white/80">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map(skill => (
          <div
            key={skill}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10"
          >
            <div className={`w-2 h-2 rounded-full ${color}`} />
            <span className="text-sm text-white/90">{skill}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
