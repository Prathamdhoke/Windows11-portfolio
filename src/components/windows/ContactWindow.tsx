import React, { useState } from "react";
import { portfolioData } from "@/data/portfolio";
import { Send, MapPin, Mail } from "lucide-react";

export function ContactWindow() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 1500);
  };

  return (
    <div className="p-8 text-white h-full flex flex-col md:flex-row gap-12 max-w-5xl mx-auto items-center">
      <div className="flex-1 w-full space-y-8">
        <div>
          <h2 className="text-4xl font-bold mb-4 tracking-tight">
            Let's connect
          </h2>
          <p className="text-white/60 text-lg">
            I'm currently open for new opportunities. Whether you have a
            question or just want to say hi, I'll try my best to get back to
            you!
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4 text-white/80 bg-white/5 p-4 rounded-xl border border-white/5">
            <Mail className="text-primary" />
            <span>{portfolioData.social.email}</span>
          </div>
          {/* <div className="flex items-center gap-4 text-white/80 bg-white/5 p-4 rounded-xl border border-white/5">
            <MapPin className="text-primary" />
            <span>San Francisco, CA</span>
          </div> */}
        </div>
      </div>

      <div className="flex-1 w-full">
        <form
          onSubmit={handleSubmit}
          className="bg-white/5 border border-white/10 p-6 rounded-2xl shadow-xl flex flex-col gap-4"
        >
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/70">Name</label>
            <input
              type="text"
              required
              className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:border-primary transition-colors"
              placeholder="Your Name"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white/70">Email</label>
            <input
              type="email"
              required
              className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:border-primary transition-colors"
              placeholder="youremail@example.com"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white/70">Message</label>
            <textarea
              required
              rows={4}
              className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:border-primary transition-colors resize-none"
              placeholder="Let's connect"
            />
          </div>

          <button
            type="submit"
            disabled={status !== "idle"}
            className="mt-2 w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
          >
            {status === "idle" && (
              <>
                <Send size={18} /> Send Message
              </>
            )}
            {status === "sending" && "Sending..."}
            {status === "sent" && "Message Sent!"}
          </button>
        </form>
      </div>
    </div>
  );
}
