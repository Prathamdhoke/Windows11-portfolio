import React, { useState, useEffect, useRef } from "react";
import { portfolioData } from "@/data/portfolio";

interface CommandLog {
  command: string;
  output: React.ReactNode;
}

export function TerminalWindow() {
  const [input, setInput] = useState("");
  const [logs, setLogs] = useState<CommandLog[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLogs([
      {
        command: "",
        output: (
          <div className="text-emerald-400 mb-4 whitespace-pre font-mono">
            {`   __      __(_)___  ___/ /___ _      _______  / __ |/ /
   \\ \\ /\\ / / / __ \\/ __  / __ \\ | /| / / ___/ / / / / __ \\
    \\ V  V / / / / / /_/ / /_/ / |/ |/ (__  ) / /_/ / / / /
     \\_/\\_/_/_/ /_/\\__,_/\\____/|__/|__/____/  \\____/_/ /_/
                                                             
Welcome to Windows 11 Terminal [Version 10.0.22621.1]
(c) Microsoft Corporation. All rights reserved.`}
          </div>
        ),
      },
      {
        command: "",
        output: (
          <div className="text-white/70 mb-4 font-mono">
            Type 'help' to see available commands.
          </div>
        ),
      },
    ]);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    let output: React.ReactNode = "";

    switch (trimmed) {
      case "help":
        output = (
          <div className="text-white/80 font-mono">
            Available commands:
            <br />
            - help: Show this message
            <br />
            - about: Display information about Pratham
            <br />
            - projects: List portfolio projects
            <br />
            - skills: Display Pratham's skills
            <br />- clear: Clear the terminal
          </div>
        );
        break;
      case "about":
        output = (
          <div className="text-white/80 font-mono">
            {portfolioData.user.bio}
          </div>
        );
        break;
      case "projects":
        output = (
          <div className="text-white/80 font-mono">
            {portfolioData.projects.map((p) => (
              <div key={p.id}>
                - {p.name}: {p.tags.join(", ")}
              </div>
            ))}
          </div>
        );
        break;
      case "skills":
        output = (
          <div className="text-white/80 font-mono">
            Languages: {portfolioData.skills.languages.join(", ")}
            <br />
            Frameworks: {portfolioData.skills.frameworks.join(", ")}
            <br />
            Tools: {portfolioData.skills.tools.join(", ")}
            <br />
            Design: {portfolioData.skills.design.join(", ")}
          </div>
        );
        break;
      case "clear":
        setLogs([]);
        return;
      case "":
        output = "";
        break;
      default:
        output = (
          <div className="text-red-400 font-mono">
            Command not found: {trimmed}
          </div>
        );
    }

    setLogs((prev) => [...prev, { command: cmd, output }]);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    }
  };

  return (
    <div
      className="p-4 bg-[#0c0c0c] text-white/90 h-full font-mono text-sm"
      onClick={() => document.getElementById("terminal-input")?.focus()}
    >
      {logs.map((log, i) => (
        <div key={i} className="mb-2">
          {log.command && (
            <div className="flex text-white/50">
              <span className="text-emerald-500 mr-2">
                C:\Users\Pratham&gt;
              </span>
              {log.command}
            </div>
          )}
          <div className="mt-1">{log.output}</div>
        </div>
      ))}

      <div className="flex">
        <span className="text-emerald-500 mr-2">C:\Users\Pratham&gt;</span>
        <input
          id="terminal-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          className="bg-transparent outline-none flex-1 font-mono text-white/90"
          autoComplete="off"
          spellCheck={false}
          autoFocus
        />
      </div>
      <div ref={bottomRef} />
    </div>
  );
}
