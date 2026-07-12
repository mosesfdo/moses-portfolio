"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Header from "@/components/Header";
import CommandPalette from "@/components/CommandPalette";

const PROJECTS = [
  {
    id: 1,
    title: "TuneGrab",
    description: "A Python utility that automates downloading Spotify tracks and playlists using Spotify API metadata and yt-dlp downloading",
    category: "Python Utility",
    year: "2026",
    image: "/project-tunegrab.png",
    tags: ["Python", "yt-dlp", "Spotify API", "JSON", "CLI"],
    href: "https://github.com/mosesfdo/tunegrab"
  },
  {
    id: 2,
    title: "TempMail",
    description: "A custom web utility app providing disposable mailbox solutions and lightweight workflow task logging",
    category: "Web Utility",
    year: "2025",
    image: "/project-tempmail.png",
    tags: ["HTML", "JavaScript", "CSS", "APIs"],
    href: "https://github.com/mosesfdo/TempMail"
  },
  {
    id: 3,
    title: "React Portfolio",
    description: "A clean developer profile portfolio displaying resume milestones and personal coding statistics",
    category: "Portfolio",
    year: "2025",
    image: "/project-portfolio.png",
    tags: ["React", "JavaScript", "CSS", "Single Page App"],
    href: "https://github.com/mosesfdo/Portfolio-react"
  },
  {
    id: 4,
    title: "Amazon AI Assistant",
    description: "A Chrome extension that extracts product information and customer reviews from Amazon pages and uses a FastAPI backend with LLM integration to generate structured insights such as sentiment score, key pros and cons, and overall product analysis.",
    category: "Chrome Extension",
    year: "2026",
    image: "/project-amazon-assistant.png",
    tags: ["JavaScript", "HTML5", "FastAPI", "Python", "LLMs"],
    href: "https://github.com/mosesfdo"
  }
];

export default function Projects() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <Header />
      <CommandPalette />

      {/* BACKGROUND ACCENT */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-radial-[ellipse_at_center] from-white/[0.01] via-transparent to-transparent" />

      {/* HEADER SECTION */}
      <section className="relative px-6 sm:px-12 md:px-24 pt-36 pb-20">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#ffffff] text-xs sm:text-sm tracking-[0.4em] uppercase font-light mb-6">
            SELECTED WORKS
          </p>
          <h1 className="text-white text-6xl sm:text-8xl font-big-shoulders font-black tracking-tight uppercase leading-[0.85] max-w-5xl">
            Projects<span className="text-[#ffffff]">.</span>
          </h1>
          <p className="text-gray-400 text-base sm:text-lg font-light mt-8 max-w-2xl leading-relaxed">
            A curated collection of work by Moses Fernando that showcases automation, utility, and coding skills across Python scripting and full stack engineering.
          </p>
        </div>
      </section>

      {/* PROJECTS LIST GRID */}
      <section className="relative px-6 sm:px-12 md:px-24 pb-32">
        <div className="max-w-7xl mx-auto space-y-12">
          {PROJECTS.map((project, idx) => {
            const isLarge = idx % 3 === 0; // Alternating large cards
            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 45 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx % 2 * 0.05 }}
                className="group"
              >
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative rounded-3xl overflow-hidden bg-zinc-950 border border-white/5 hover:border-white/10 hover:bg-zinc-900/[0.3] transition-all duration-700 h-[450px] md:h-[550px] lg:h-[650px]"
                >
                  {/* Image Background */}
                  <div className="absolute inset-0 flex items-center justify-center p-8 sm:p-16 md:p-24 bg-zinc-950/90">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="object-contain max-w-full max-h-full transition-transform duration-1000 group-hover:scale-102"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/5 pointer-events-none" />
                  </div>

                  {/* Top Header metadata */}
                  <div className="absolute inset-0 p-6 sm:p-10 md:p-12 flex flex-col justify-between z-10">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-white/40 text-xs font-medium uppercase tracking-wider">
                          {project.category}
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                        <span className="text-white/40 text-xs font-mono font-light">
                          {project.year}
                        </span>
                      </div>

                      {/* Hover Arrow circle */}
                      <div className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-white/20 hover:border-white/30 hover:scale-110">
                        <ArrowUpRight className="w-5 h-5 text-white" />
                      </div>
                    </div>

                    {/* Bottom Metadata */}
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <h3 className="text-white font-big-shoulders font-black text-4xl sm:text-6xl tracking-wide uppercase leading-none group-hover:text-[#ffffff] transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-gray-300 text-sm sm:text-base font-light max-w-2xl leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      {/* Staggered tags */}
                      <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                        {project.tags.map((tag, tagIdx) => (
                          <span
                            key={tagIdx}
                            className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs font-light"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </a>
              </motion.article>
            );
          })}
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
