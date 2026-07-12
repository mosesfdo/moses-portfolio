"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import CommandPalette from "@/components/CommandPalette";
import PhotoStack from "@/components/PhotoStack";

const EXPERIENCES = [
  { id: 1, title: "Independent Developer", role: "Full Stack Developer", period: "2024 - Present" },
  { id: 2, title: "University Coursework", role: "Software Engineering Student", period: "2023 - Present" },
  { id: 3, title: "Open Source Community", role: "Python & Automation Contributor", period: "2024 - Present" }
];

const PHOTOGRAPHS = [
  { id: 1, src: "/photographs/ph1.png", title: "Midnight Walk", location: "Kolkata, India" },
  { id: 2, src: "/photographs/ph2.png", title: "Golden Hours", location: "Goa, India" },
  { id: 3, src: "/photographs/ph3.png", title: "Foggy Mornings", location: "Himalayas, India" },
  { id: 4, src: "/photographs/ph4.png", title: "City Lights", location: "Mumbai, India" },
  { id: 5, src: "/photographs/ph5.png", title: "Rainy Cafe", location: "Bangalore, India" },
  { id: 6, src: "/photographs/ph6.png", title: "Alleyways", location: "Delhi, India" }
];

export default function About() {
  const [greeting, setGreeting] = useState("Good Morning");
  const [activeCell, setActiveCell] = useState<{ row: number; col: number; count: number } | null>(null);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 17) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  // Generate GitHub contribution grid (24 columns x 7 rows)
  const gridRows = 7;
  const gridCols = 24;
  const totalCells = gridRows * gridCols;

  // Mock contribution shades (0 = empty, 1 = light green, 2 = medium, 3 = high, 4 = max green)
  const mockContributions = Array.from({ length: totalCells }, () => {
    const rand = Math.random();
    if (rand < 0.4) return 0;
    if (rand < 0.7) return 1;
    if (rand < 0.9) return 2;
    if (rand < 0.97) return 3;
    return 4;
  });

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <Header />
      <CommandPalette />

      {/* BACKGROUND GRADIENT DECORATION */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-radial-[ellipse_at_center] from-white/[0.01] via-transparent to-transparent" />

      {/* HERO SECTION */}
      <section className="relative px-6 sm:px-12 md:px-24 pt-36 pb-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
          
          {/* Left Description */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <p className="text-[#ffffff] text-xs sm:text-sm tracking-[0.4em] uppercase font-light">
                STACK & PROFILE
              </p>
              <h1 className="text-white text-5xl sm:text-7xl font-light leading-tight">
                {greeting}. <br />
                I'm <span className="font-semibold text-[#ffffff]">Moses Fernando.</span>
              </h1>
            </div>

            <div className="space-y-6 text-gray-400 text-base sm:text-lg font-light leading-relaxed max-w-2xl">
              <p>
                I am a Full Stack Developer based in India. I specialize in coding web applications, designing interactive micro-interactions, and building Python workflow automation utilities.
              </p>
              <p>
                My focus centers on developer efficiency — creating scripts and tools that solve repetitive, boring work so developers can stay productive. I enjoy pairing frontend technologies like React and Tailwind CSS with robust backend systems.
              </p>
              <p>
                When I'm not writing code, you can find me contributing to open-source script repositories, exploring developer layouts, or organizing software configurations.
              </p>
            </div>
          </div>

          {/* Right Draggable Photo Stack */}
          <div className="lg:col-span-5 flex justify-center mt-8 lg:mt-0">
            <PhotoStack />
          </div>

        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section className="py-24 sm:py-32 px-6 sm:px-12 md:px-24 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-white text-6xl sm:text-8xl lg:text-9xl font-big-shoulders font-black tracking-tight uppercase leading-none mb-16">
            Timeline<span className="text-[#ffffff]">.</span>
          </h2>

          <div className="border border-white/10 rounded-2xl overflow-hidden bg-zinc-950/20">
            {EXPERIENCES.map((exp, idx) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className={`grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 p-6 md:p-8 lg:p-10 hover:bg-white/[0.03] transition-colors items-center ${
                  idx !== EXPERIENCES.length - 1 ? "border-b border-white/10" : ""
                }`}
              >
                <div className="md:col-span-1 text-white/30 font-mono text-sm">
                  0{exp.id}
                </div>
                <div className="md:col-span-4 text-white font-medium text-lg">
                  {exp.title}
                </div>
                <div className="md:col-span-5 text-gray-400 text-sm font-light uppercase tracking-wide">
                  {exp.role}
                </div>
                <div className="md:col-span-2 md:text-right text-gray-500 text-sm font-mono font-light">
                  {exp.period}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GITHUB JOURNEY BLOCK */}
      <section className="py-24 sm:py-32 px-6 sm:px-12 md:px-24 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-white text-6xl sm:text-8xl lg:text-9xl font-big-shoulders font-black tracking-tight uppercase leading-none">
              Coding Journey<span className="text-[#ffffff]">.</span>
            </h2>
            <p className="mt-4 text-gray-400 text-sm sm:text-base font-light max-w-md">
              My open-source coding activity, repositories, and community milestones.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left: GitHub Metrics Stats */}
            <div className="lg:col-span-4 grid grid-cols-2 gap-4">
              <div className="bg-zinc-950 border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
                <span className="text-gray-500 text-xs font-mono uppercase tracking-wider">Repositories</span>
                <span className="text-white text-4xl sm:text-5xl font-big-shoulders font-black mt-4">17+</span>
              </div>
              <div className="bg-zinc-950 border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
                <span className="text-gray-500 text-xs font-mono uppercase tracking-wider">Total Stars</span>
                <span className="text-white text-4xl sm:text-5xl font-big-shoulders font-black mt-4">5+</span>
              </div>
              <div className="bg-zinc-950 border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
                <span className="text-gray-500 text-xs font-mono uppercase tracking-wider">Followers</span>
                <span className="text-white text-4xl sm:text-5xl font-big-shoulders font-black mt-4">6</span>
              </div>
              <div className="bg-zinc-950 border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
                <span className="text-gray-500 text-xs font-mono uppercase tracking-wider">Contributions</span>
                <span className="text-[#ffffff] text-4xl sm:text-5xl font-big-shoulders font-black mt-4">200+</span>
              </div>
            </div>

            {/* Right: Contribution Calendar simulation */}
            <div className="lg:col-span-8 bg-zinc-950 border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
              <div>
                <h3 className="text-white font-medium text-lg mb-2">Contribution Activity</h3>
                <p className="text-gray-500 text-xs font-light mb-6">Interactive activity map showing commit logs.</p>
              </div>

              {/* Grid map */}
              <div className="relative">
                <div className="grid grid-flow-col grid-rows-7 gap-1.5 overflow-x-auto pb-4 scrollbar-none">
                  {mockContributions.map((shade, idx) => {
                    const row = idx % gridRows;
                    const col = Math.floor(idx / gridRows);
                    const commits = shade === 0 ? 0 : shade * 3 + Math.floor(Math.random() * 3);

                    let bgColor = "bg-white/[0.04]"; // empty
                    if (shade === 1) bgColor = "bg-white/[0.08] border border-white/5";
                    if (shade === 2) bgColor = "bg-white/[0.25]";
                    if (shade === 3) bgColor = "bg-white/[0.60]";
                    if (shade === 4) bgColor = "bg-white"; // Highlight max

                    return (
                      <div
                        key={idx}
                        onClick={() => setActiveCell({ row, col, count: commits })}
                        className={`w-3.5 h-3.5 rounded-sm cursor-pointer transition-all hover:scale-125 ${bgColor}`}
                      />
                    );
                  })}
                </div>

                {/* Floating click tip */}
                {activeCell && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute -top-12 left-4 bg-white text-black text-[11px] font-medium px-3 py-1.5 rounded-lg shadow-xl"
                  >
                    {activeCell.count === 0 ? "No contributions" : `${activeCell.count} commits`} on day {activeCell.col + 1}
                  </motion.div>
                )}
              </div>

              <div className="flex items-center justify-between text-[11px] text-gray-500 font-mono mt-4">
                <span>Less</span>
                <div className="flex gap-1">
                  <div className="w-2.5 h-2.5 rounded-sm bg-white/[0.04]" />
                  <div className="w-2.5 h-2.5 rounded-sm bg-emerald-950/40" />
                  <div className="w-2.5 h-2.5 rounded-sm bg-emerald-900/80" />
                  <div className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />
                  <div className="w-2.5 h-2.5 rounded-sm bg-[#ffffff]" />
                </div>
                <span>More</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* PHOTOGRAPHY SECTION */}
      <section className="py-24 sm:py-32 px-6 sm:px-12 md:px-24 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <p className="text-white/40 text-xs font-mono uppercase tracking-[0.4em] mb-3">GALLERY</p>
              <h2 className="text-white text-5xl font-light font-cedarville tracking-wide leading-none -rotate-1">
                I Click Pictures
              </h2>
            </div>
            <p className="text-gray-400 text-sm font-light max-w-xs md:text-right">
              A curated collection of snapshots capturing daily visual textures, architecture, and lighting.
            </p>
          </div>

          {/* Grid layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PHOTOGRAPHS.map((photo) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-900 border border-white/5 cursor-pointer shadow-lg"
              >
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Hover overlay metadata */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h4 className="text-white font-medium text-lg uppercase tracking-wide">
                    {photo.title}
                  </h4>
                  <p className="text-[#ffffff] text-xs font-light tracking-widest uppercase mt-1">
                    {photo.location}
                  </p>
                </div>
              </motion.div>
            ))}
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
