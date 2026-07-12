"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowDown, ArrowUpRight, Volume2, VolumeX } from "lucide-react";
import Header from "@/components/Header";
import CommandPalette from "@/components/CommandPalette";
import CircularText from "@/components/CircularText";
import TiltedCard from "@/components/TiltedCard";
import Link from "next/link";

// ─── Data ───────────────────────────────────────────────
const GREETINGS = [
  "• नमस्ते •",
  "• வணக்கம் •",
  "• నమస్కారం •",
  "• നമസ്കാരം •",
  "• ನಮಸ್ಕಾರ •",
  "• নমস্কার •",
  "• ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ •",
  "• Welcome •",
];

const SKILLS_ROW_1 = ["PYTHON", "REACT", "NEXT.JS", "TYPESCRIPT", "TAILWIND CSS", "NODE.JS", "YT-DLP", "GIT", "DOCKER", "AI UTILITIES"];
const SKILLS_ROW_2 = ["NEXT.JS", "REACT", "PYTHON", "NODE.JS", "YT-DLP", "DOCKER", "GIT", "TYPESCRIPT", "CSS", "JAVASCRIPT"];

const EXPERIENCES = [
  { id: 1, title: "Independent Developer", role: "Full Stack Developer", period: "2024 — Present" },
  { id: 2, title: "Karunya's Inovation Studio", role: "Team Leader", period: " Jan 2026 — May 2026" },
  { id: 3, title: "HICUP INOVATIONS", role: "Frontend Intern", period: " July 2025 — October 2025" },
];

const PROJECTS = [
  { id: 1, title: "TuneGrab", category: "Python Utility", desc: "Automated Spotify playlist downloader powered by yt-dlp and the Spotify API", image: "/project-tunegrab.png", href: "https://github.com/mosesfdo/tunegrab", tags: ["Python", "yt-dlp", "Spotify API"] },
  { id: 2, title: "TempMail", category: "Web App", desc: "Disposable mailbox utility with lightweight task tracking and workflow logs", image: "/project-tempmail.png", href: "https://github.com/mosesfdo/TempMail", tags: ["HTML", "JavaScript", "CSS"] },
  { id: 3, title: "React Portfolio", category: "Portfolio", desc: "Clean developer profile showcasing resume milestones and coding statistics", image: "/project-portfolio.png", href: "https://github.com/mosesfdo/Portfolio-react", tags: ["React", "JavaScript", "CSS"] },
  { id: 4, title: "Amazon AI Assistant", category: "Chrome Extension", desc: "Chrome extension and FastAPI backend extracting product info and reviews to generate LLM insights", image: "/project-amazon-assistant.png", href: "https://github.com/mosesfdo", tags: ["JavaScript", "HTML5", "FastAPI"] },
];

// ─── Animation Primitives ───────────────────────────────

function ScrollReveal({
  children, className = "", delay = 0, direction = "up" as "up" | "down" | "left" | "right", distance = 80,
}: {
  children: React.ReactNode; className?: string; delay?: number; direction?: "up" | "down" | "left" | "right"; distance?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const map = { up: { x: 0, y: distance }, down: { x: 0, y: -distance }, left: { x: distance, y: 0 }, right: { x: -distance, y: 0 } };
  const from = map[direction];
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: from.x, y: from.y, filter: "blur(4px)" }}
      animate={isInView ? { opacity: 1, x: 0, y: 0, filter: "blur(0px)" } : undefined}
      transition={{ duration: 1, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ParallaxLayer({ children, speed = 0.5, className = "" }: { children: React.ReactNode; speed?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, speed * -180]);
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

function LineReveal({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ scaleX: 0 }}
      animate={isInView ? { scaleX: 1 } : undefined}
      transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`section-line origin-center ${className}`}
    />
  );
}

function SectionLabel({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-center gap-4 mb-8 sm:mb-12">
      <span className="text-white/20 text-xs font-mono tracking-widest">{number}</span>
      <div className="w-8 h-px bg-white/15" />
      <span className="text-white/40 text-xs tracking-[0.3em] uppercase font-light">{label}</span>
    </div>
  );
}

// ─── Main Content (separate component so useScroll only runs when mounted) ───

function MainContent({ soundEnabled }: { soundEnabled: boolean }) {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroProgress, [0, 1], [0, -180]);
  const heroOpacity = useTransform(heroProgress, [0, 0.55], [1, 0]);
  const heroScale = useTransform(heroProgress, [0, 1], [1, 0.9]);

  const [isMuted, setIsMuted] = useState(!soundEnabled);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // "Empty Mind" — royalty-free ambient lofi loop (CC0, via riccardobertolini/lofi-music)
    const audio = new Audio("/bg-music.mp3");
    audio.loop = true;
    audio.volume = 0.3;
    audioRef.current = audio;
    if (soundEnabled) {
      audio.play().catch(() => { });
    }
    return () => {
      audio.pause();
      audio.src = "";
    };
  }, [soundEnabled]);

  const toggleSound = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.play().catch(() => { });
      setIsMuted(false);
    } else {
      audioRef.current.pause();
      setIsMuted(true);
    }
  };

  return (
    <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="relative">
      {/* Floating sound toggle */}
      <button
        onClick={toggleSound}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-90 active:scale-95 transition-transform duration-200 shadow-lg"
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </button>
      <Header />
      <CommandPalette />

      {/* ═══════════════════════════════════════════
                01 — HERO
            ═══════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-screen bg-[#050505] flex flex-col justify-between pt-36 pb-12 px-6 sm:px-12 md:px-24 overflow-hidden">
        {/* Radial glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(255,255,255,0.03)_0%,transparent_70%)]" />
        </div>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
          className="relative z-10 flex flex-col items-center justify-center my-auto w-full"
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-white/40 text-xs sm:text-sm tracking-[0.4em] uppercase font-light mb-8"
          >
            Full Stack Developer & AIML Engineer
          </motion.p>

          <div className="relative w-full max-w-[1400px] select-none text-center">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="font-big-shoulders font-black leading-[0.8] tracking-tight uppercase"
            >
              <span className="block text-white text-[clamp(4.5rem,15vw,13rem)]">MOSES</span>
              <span className="block text-white/20 text-[clamp(4.5rem,15vw,13rem)]">FERNANDO</span>
            </motion.h1>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex justify-between items-end pt-8 text-xs text-white/30"
        >
          <p className="max-w-xs font-light leading-relaxed">
            I build apps that do the boring stuff — so I can pretend I&apos;m being productive. Based in India.
          </p>
          <div
            className="flex items-center gap-2 cursor-pointer font-light hover:text-white/60 transition-colors"
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
          >
            <span>Scroll</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </div>
        </motion.div>
      </section>

      <LineReveal />

      {/* ═══════════════════════════════════════════
                02 — ABOUT
            ═══════════════════════════════════════════ */}
      <section className="relative py-28 sm:py-40 px-6 sm:px-12 md:px-24 bg-[#050505] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <SectionLabel number="01" label="About" />
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">
            <div className="lg:col-span-7 space-y-10">
              <ScrollReveal delay={0.05}>
                <h2 className="text-white text-3xl sm:text-5xl lg:text-6xl font-light leading-[1.1]">
                  Designer. Builder. <br />
                  <span className="text-white/30">Lifelong learner.</span>
                </h2>
              </ScrollReveal>

              <ScrollReveal delay={0.15} distance={50}>
                <div className="space-y-6 text-white/50 text-base sm:text-lg font-light leading-[1.8] max-w-2xl">
                  <p>
                    I&apos;m Moses Fernando — a Full Stack Developer with a passion for coding tools, backend scripts, and interactive interfaces. I build products that automate workflows and streamline systems.
                  </p>
                  <p>
                    My skillset ranges from Python scripting and API-driven automation to responsive interfaces with React. I chose both paths to build holistic developer solutions.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.25} distance={30}>
                <Link
                  href="/resume"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black text-sm font-semibold rounded-full hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                >
                  View Resume
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-5">
              <ParallaxLayer speed={-0.2}>
                <ScrollReveal delay={0.2} direction="right" distance={80}>
                  <div className="flex justify-center relative">
                    <TiltedCard
                      imageSrc="/portrait.jpg"
                      altText="Portrait of Moses Fernando"
                      captionText="மோசஸ் டி"
                      containerHeight="clamp(320px, 45vw, 520px)"
                      containerWidth="clamp(260px, 35vw, 420px)"
                      imageHeight="100%"
                      imageWidth="100%"
                      rotateAmplitude={12}
                      scaleOnHover={1.03}
                      showTooltip={true}
                    />
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 0.7, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1, duration: 0.6 }}
                      className="hidden lg:flex flex-col items-end absolute -right-12 top-6 pointer-events-none select-none"
                    >
                      <span className="text-white/50 font-cedarville text-xl whitespace-nowrap -rotate-3 mb-1 mr-3">try hovering</span>
                      <svg width="48" height="60" viewBox="0 0 48 64" fill="none" className="text-white/25 mr-8">
                        <path d="M 38 6 C 42 28, 20 48, 8 58" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                        <path d="M 17 56 L 8 58 L 12 50" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                      </svg>
                    </motion.div>
                  </div>
                </ScrollReveal>
              </ParallaxLayer>
            </div>
          </div>
        </div>
      </section>

      <LineReveal />

      {/* ═══════════════════════════════════════════
                03 — SELECTED WORKS
            ═══════════════════════════════════════════ */}
      <section className="py-28 sm:py-40 px-6 sm:px-12 md:px-24 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <SectionLabel number="02" label="Selected Works" />
          </ScrollReveal>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-20">
            <ScrollReveal>
              <h2 className="text-white text-5xl sm:text-7xl lg:text-8xl font-big-shoulders font-black tracking-tight uppercase leading-[0.85]">
                Works<span className="text-white/20">.</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.15} direction="right">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 text-white/70 text-sm font-light hover:bg-white hover:text-black transition-all duration-300"
              >
                View All
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </ScrollReveal>
          </div>

          {/* Project cards — staggered masonry */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16 md:gap-y-24">
            {PROJECTS.map((project, idx) => (
              <ScrollReveal key={project.id} delay={idx * 0.08} distance={90} className={idx % 2 === 1 ? "md:mt-16" : ""}>
                <a href={project.href} target="_blank" rel="noopener noreferrer" className="group block">
                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-zinc-950 border border-white/5 mb-6 flex items-center justify-center p-6">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="object-contain max-w-full max-h-full group-hover:scale-102 transition-transform duration-700 ease-out"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <span className="text-white text-sm font-medium tracking-wider bg-white/10 backdrop-blur-xl px-6 py-3 rounded-full border border-white/10 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        View Project →
                      </span>
                    </div>
                    {/* Top corner number */}
                    <span className="absolute top-4 left-5 text-white/25 text-xs font-mono">0{project.id}</span>
                  </div>
                  {/* Meta */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-white text-2xl sm:text-3xl font-big-shoulders font-black uppercase tracking-wide group-hover:text-white/80 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-white/35 text-sm font-light mt-1.5 max-w-sm leading-relaxed">{project.desc}</p>
                    </div>
                    <span className="text-white/20 text-xs font-mono tracking-wider uppercase shrink-0 mt-2">{project.category}</span>
                  </div>
                  {/* Tags */}
                  <div className="flex gap-2 mt-4">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-white/25 text-[11px] font-mono border border-white/8 rounded-full px-3 py-1">
                        {tag}
                      </span>
                    ))}
                  </div>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <LineReveal />

      {/* ═══════════════════════════════════════════
                04 — EXPERIENCE
            ═══════════════════════════════════════════ */}
      <section className="py-28 sm:py-40 px-6 sm:px-12 md:px-24 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <SectionLabel number="03" label="Experience" />
          </ScrollReveal>

          <ScrollReveal delay={0.05}>
            <h2 className="text-white text-5xl sm:text-7xl lg:text-8xl font-big-shoulders font-black tracking-tight uppercase leading-[0.85] mb-16">
              Experience<span className="text-white/20">.</span>
            </h2>
          </ScrollReveal>

          <div className="border border-white/8 rounded-2xl overflow-hidden">
            {EXPERIENCES.map((exp, idx) => (
              <ScrollReveal key={exp.id} delay={idx * 0.06} distance={40}>
                <div
                  className={`group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 p-6 md:p-8 lg:p-10 hover:bg-white/[0.02] transition-all duration-500 items-center ${idx !== EXPERIENCES.length - 1 ? "border-b border-white/8" : ""
                    }`}
                >
                  <div className="md:col-span-1 text-white/15 font-mono text-sm">0{exp.id}</div>
                  <div className="md:col-span-4 text-white font-medium text-lg group-hover:translate-x-1 transition-transform duration-500">{exp.title}</div>
                  <div className="md:col-span-4 text-white/40 text-sm font-light uppercase tracking-wider">{exp.role}</div>
                  <div className="md:col-span-3 md:text-right text-white/25 text-sm font-mono font-light whitespace-nowrap">{exp.period}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <LineReveal />

      {/* ═══════════════════════════════════════════
                05 — SKILLS MARQUEE
            ═══════════════════════════════════════════ */}
      <ScrollReveal distance={30}>
        <section className="py-16 sm:py-20 bg-[#050505] overflow-hidden">
          <div className="space-y-5">
            <div className="marquee-fade">
              <div className="flex overflow-hidden select-none gap-6 w-full">
                <div className="flex shrink-0 items-center gap-6 min-w-full animate-marquee">
                  {SKILLS_ROW_1.map((skill, idx) => (
                    <div key={idx} className="flex items-center gap-6">
                      <span className="text-white/15 text-5xl sm:text-7xl font-big-shoulders font-black tracking-wider uppercase">{skill}</span>
                      <span className="text-white/8 text-3xl">✦</span>
                    </div>
                  ))}
                </div>
                <div className="flex shrink-0 items-center gap-6 min-w-full animate-marquee" aria-hidden="true">
                  {SKILLS_ROW_1.map((skill, idx) => (
                    <div key={`dup-${idx}`} className="flex items-center gap-6">
                      <span className="text-white/15 text-5xl sm:text-7xl font-big-shoulders font-black tracking-wider uppercase">{skill}</span>
                      <span className="text-white/8 text-3xl">✦</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="marquee-fade">
              <div className="flex overflow-hidden select-none gap-6 w-full [direction:rtl]">
                <div className="flex shrink-0 items-center gap-6 min-w-full animate-marquee">
                  {SKILLS_ROW_2.map((skill, idx) => (
                    <div key={idx} className="flex items-center gap-6">
                      <span className="text-white/10 text-5xl sm:text-7xl font-big-shoulders font-black tracking-wider uppercase">{skill}</span>
                      <span className="text-white/5 text-3xl">✦</span>
                    </div>
                  ))}
                </div>
                <div className="flex shrink-0 items-center gap-6 min-w-full animate-marquee" aria-hidden="true">
                  {SKILLS_ROW_2.map((skill, idx) => (
                    <div key={`dup-${idx}`} className="flex items-center gap-6">
                      <span className="text-white/10 text-5xl sm:text-7xl font-big-shoulders font-black tracking-wider uppercase">{skill}</span>
                      <span className="text-white/5 text-3xl">✦</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <LineReveal />

      {/* ═══════════════════════════════════════════
                06 — FOOTER
            ═══════════════════════════════════════════ */}
      <footer className="relative bg-[#050505] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-24 pt-24 pb-8 relative z-10">
          <ScrollReveal distance={50}>
            <SectionLabel number="04" label="Contact" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 pb-20">
              {/* Email */}
              <div>
                <h3 className="text-white/25 text-xs font-semibold tracking-[0.2em] uppercase mb-6">Get in Touch</h3>
                <a href="mailto:dmosesfernando@gmail.com" className="group block">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white/8 group-hover:border-white/20 transition-colors duration-500">
                      <img alt="Moses Fernando" className="object-cover w-full h-full" src="/portrait2.png" />
                    </div>
                    <div className="inline-flex items-center gap-2 text-white/70 text-base font-light group-hover:text-white transition-colors duration-300">
                      dmosesfernando@gmail.com
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    </div>
                  </div>
                </a>
                <p className="text-white/25 text-sm font-light leading-relaxed max-w-xs mt-4">
                  Open to collaboration, automation projects, and full-stack development.
                </p>
              </div>

              {/* Nav */}
              <div>
                <h3 className="text-white/25 text-xs font-semibold tracking-[0.2em] uppercase mb-6">Navigation</h3>
                <ul className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Home", href: "/" }, { label: "About", href: "/about" },
                    { label: "Work", href: "/projects" },
                    { label: "Contact", href: "/links" },
                  ].map((link) => (
                    <li key={link.label}>
                      <Link className="text-white/40 hover:text-white text-sm font-light transition-colors duration-300" href={link.href}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Socials */}
              <div>
                <h3 className="text-white/25 text-xs font-semibold tracking-[0.2em] uppercase mb-6">Connect</h3>
                <div className="flex flex-wrap gap-4 text-white/40 text-sm font-light">
                  {[
                    { label: "GitHub", href: "https://github.com/mosesfdo" },
                    { label: "LinkedIn", href: "https://www.linkedin.com/in/mosesfdo/" },
                    { label: "Instagram", href: "https://instagram.com/mosesfdo" },
                    { label: "Bluesky", href: "https://bsky.app/profile/mosesfdo.bsky.social" },
                  ].map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">{s.label}</a>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Watermark */}
          <div className="border-t border-white/5 py-16 text-center select-none overflow-hidden">
            <ParallaxLayer speed={0.15}>
              <h2
                className="text-[clamp(3.5rem,15vw,20rem)] font-big-shoulders tracking-tight uppercase leading-none font-black text-transparent opacity-[0.04]"
                style={{ WebkitTextStroke: "1px rgba(255,255,255,0.3)" }}
              >
                MOSESFDO
              </h2>
            </ParallaxLayer>
          </div>

          <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-white/20 font-light tracking-wider">
            <p>© 2026 Moses Fernando</p>
            <p>Designed & Developed by Moses</p>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}

// ─── Page Component ─────────────────────────────────────

type Phase = "greetings" | "musicPrompt" | "done";

export default function Home() {
  const [phase, setPhase] = useState<Phase>("greetings");
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [promptVisible, setPromptVisible] = useState(false);

  // Phase 1: cycle through greetings, then move to music prompt
  useEffect(() => {
    if (phase !== "greetings") return;
    const interval = setInterval(() => {
      setGreetingIndex((prev) => {
        if (prev < GREETINGS.length - 1) return prev + 1;
        clearInterval(interval);
        setTimeout(() => setPhase("musicPrompt"), 400);
        return prev;
      });
    }, 600);
    return () => clearInterval(interval);
  }, [phase]);

  // Phase 2: fade in the music prompt text after a brief pause
  useEffect(() => {
    if (phase !== "musicPrompt") return;
    const timer = setTimeout(() => setPromptVisible(true), 500);
    return () => clearTimeout(timer);
  }, [phase]);

  const enterSite = (withSound: boolean) => {
    setSoundEnabled(withSound);
    setPhase("done");
  };

  return (
    <AnimatePresence mode="wait">
      {phase === "greetings" && (
        <motion.div
          key="greetings"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1 } }}
          className="fixed inset-0 bg-[#050505] z-50 flex items-center justify-center"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={greetingIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              className="text-white text-3xl sm:text-5xl font-light font-cedarville tracking-wider"
            >
              {GREETINGS[greetingIndex]}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      {phase === "musicPrompt" && (
        <motion.div
          key="musicPrompt"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 bg-[#050505] z-50 flex flex-col items-center justify-center gap-8 px-6"
        >
          <div className="flex flex-col items-center gap-8">
            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={promptVisible ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-white/50 text-lg sm:text-2xl font-light text-center max-w-md leading-relaxed"
            >
              <>
                full stack developer
                <br />
                {"& AI engineer based in india"}
              </>
            </motion.p>

            {/* Enter with sound button */}
            <motion.button
              initial={{ opacity: 0, y: 15 }}
              animate={promptVisible ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={() => enterSite(true)}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black text-sm font-semibold rounded-full hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
            >
              enter with music
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </motion.button>
          </div>

          {/* Enter without sound — pinned to bottom center */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={promptVisible ? { opacity: 0.5 } : undefined}
            transition={{ duration: 0.8, delay: 0.3 }}
            onClick={() => enterSite(false)}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-sm font-light hover:opacity-80 transition-opacity cursor-pointer after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-white/30 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left"
          >
            enter without sound
          </motion.button>
        </motion.div>
      )}

      {phase === "done" && (
        <MainContent soundEnabled={soundEnabled} />
      )}
    </AnimatePresence>
  );
}
