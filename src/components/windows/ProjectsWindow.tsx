import React from "react";
import { portfolioData } from "@/data/portfolio";
import { ExternalLink } from "lucide-react";

export function ProjectsWindow() {
  return (
    <div className="p-8 text-white h-full">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-white/90">Projects</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {portfolioData.projects.map((project) => (
            <div
              key={project.id}
              className="group rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:bg-white/10 transition-all hover:-translate-y-1 shadow-lg"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={project.thumbnail}
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <h3 className="text-xl font-bold">{project.name}</h3>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-colors"
                  >
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>

              <div className="p-5">
                <p className="text-white/70 mb-4 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded-md bg-primary/20 text-primary-foreground text-xs font-medium border border-primary/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
