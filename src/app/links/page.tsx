"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Clipboard, Check, ExternalLink, ArrowUpRight, Clock } from "lucide-react";
import Header from "@/components/Header";
import CommandPalette from "@/components/CommandPalette";

const COLLAB_TAGS = [
  "Web Development",
  "App Development",
  "Product & Graphics Design",
  "Open Source",
  "Startups",
  "Freelance Projects",
  "Consulting",
  "Mentorship"
];

const SOCIALS = [
  { name: "GitHub", handle: "@mosesfdo", href: "https://github.com/mosesfdo", color: "hover:border-zinc-700 hover:shadow-white/5" },
  { name: "LinkedIn", handle: "/in/mosesfdo", href: "https://www.linkedin.com/in/mosesfdo/", color: "hover:border-blue-500/30 hover:shadow-blue-500/5" },
  { name: "Instagram", handle: "@moses_fdo", href: "https://instagram.com/moses_fdo", color: "hover:border-pink-500/30 hover:shadow-pink-500/5" },
  { name: "Bluesky", handle: "@mosesfdo.bsky", href: "https://bsky.app/profile/mosesfdo.bsky.social", color: "hover:border-blue-400/30 hover:shadow-blue-400/5" }
];

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [istTime, setIstTime] = useState("");

  const handleCopy = () => {
    navigator.clipboard.writeText("dmosesfernando@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const updateTime = () => {
      const options = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit" as const,
        minute: "2-digit" as const,
        second: "2-digit" as const,
        hour12: true,
      };
      setIstTime(new Date().toLocaleTimeString("en-US", options));
    };
    updateTime(); 
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <Header />
      <CommandPalette />

      {/* BACKGROUND GLOW */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-radial-[ellipse_at_center] from-white/[0.01] via-transparent to-transparent" />

      {/* HEADER SECTION */}
      <section className="relative px-6 sm:px-12 md:px-24 pt-36 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-6">
            <p className="text-[#ffffff] text-xs sm:text-sm tracking-[0.4em] uppercase font-light">
              GET IN TOUCH
            </p>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 max-w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-emerald-500 text-xs font-light tracking-wide">Available for work</span>
            </div>
          </div>
          
          <h1 className="text-white text-6xl sm:text-8xl font-big-shoulders font-black tracking-tight uppercase leading-[0.85]">
            Let's Connect<span className="text-[#ffffff]">.</span>
          </h1>
          <p className="text-gray-400 text-base sm:text-lg font-light mt-6 max-w-2xl leading-relaxed">
            Whether you have a project in mind, want to collaborate, or just want to say hi — I'd love to hear from you.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT WIDGETS */}
      <section className="relative px-6 sm:px-12 md:px-24 pb-32">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Top Row: Email & Calendar widgets */}
          <div className="grid grid-cols-1 gap-6">
            
            {/* Email Card (full width) */}
            <div className="group relative rounded-2xl bg-gradient-to-br from-white/[0.05] to-white/[0.01] border border-white/10 hover:border-white/20 p-6 flex flex-col justify-between overflow-hidden transition-all duration-500 min-h-[160px]">
              <div className="flex items-center gap-2 text-white/40 text-xs font-mono uppercase tracking-wider">
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                <span>Primary Email</span>
              </div>
              
              <div className="my-4">
                <p className="text-white text-xl sm:text-3xl font-light select-all truncate">
                  dmosesfernando@gmail.com
                </p>
                <p className="text-gray-500 text-xs font-light mt-1">Expected response within 24 hours</p>
              </div>

              <div className="flex justify-start">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-light transition-all cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Clipboard className="w-3.5 h-3.5" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>

          {/* Middle Row: Socials Title and Grid */}
          <div className="space-y-6">
            <div>
              <h2 className="text-white text-xl sm:text-2xl font-light">Social Channels</h2>
              <p className="text-gray-500 text-sm font-light mt-1">Find me on other online networks</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {SOCIALS.map((soc, idx) => (
                <a
                  key={idx}
                  href={soc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative rounded-2xl bg-white/[0.02] border border-white/[0.06] p-6 hover:bg-white/[0.04] transition-all duration-500 flex flex-col justify-between min-h-[140px] shadow-lg ${soc.color}`}
                >
                  <div className="flex justify-between items-start">
                    <span className="text-white font-medium text-lg tracking-wide uppercase font-big-shoulders">
                      {soc.name}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>

                  <div className="mt-4">
                    <p className="text-gray-500 text-sm font-light truncate">{soc.handle}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Bottom Row: Resume Download & Time widgets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Resume Link */}
            <a
              href="/resume"
              className="group relative rounded-2xl bg-zinc-950 border border-white/[0.06] hover:border-white/20 p-6 flex items-center justify-between transition-all duration-500 cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <Clipboard className="w-4 h-4 text-white/60" />
                </div>
                <div>
                  <h3 className="text-white text-base font-medium">View Resume</h3>
                  <p className="text-gray-500 text-xs font-light mt-0.5">View credentials (PDF)</p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-white transition-all" />
            </a>

            {/* India Standard Time widget */}
            <div className="group relative rounded-2xl bg-zinc-950 border border-white/[0.06] p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-[#ffffff]" />
                </div>
                <div>
                  <h3 className="text-white text-base font-mono font-medium tracking-wide min-w-[90px]">
                    {istTime || "12:00:00 PM"}
                  </h3>
                  <p className="text-gray-500 text-xs font-light mt-0.5">IST (GMT +5:30)</p>
                </div>
              </div>
              <span className="text-white/20 text-[10px] font-mono uppercase tracking-wider">Local Time</span>
            </div>

          </div>

          {/* Collaboration Grid */}
          <div className="bg-zinc-950 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
            <h3 className="text-white font-medium text-lg">Open to Collaborate On</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {COLLAB_TAGS.map((collab, idx) => (
                <div
                  key={idx}
                  className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-white/70 text-xs sm:text-sm font-light text-center hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300"
                >
                  {collab}
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      <footer className="bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-24 py-12 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/30 font-light">
          <p>© 2026 Moses Fernando. All rights reserved.</p>
          <p>Designed & Developed by Moses</p>
        </div>
      </footer>
    </div>
  );
}
