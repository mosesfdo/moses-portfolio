/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'motion/react';
import { ArrowLeft, ArrowRight, Menu, X, Github, Linkedin, Mail, ExternalLink, Download, Volume2, VolumeX, Globe } from 'lucide-react';
import { CircularTestimonials } from './components/ui/circular-testimonials';
import { Timeline } from './components/ui/timeline';
import mosesLogo from './components/img/mosesfdo.png';
import projectAmazonAi from './components/img/project_amazon_ai.png';
import projectFinance from './components/img/project_finance.png';
import projectTunegrab from './components/img/project_tunegrab.png';
import { ReactLenis } from 'lenis/react';

const LETTERBOXD_USERNAME = 'mosesfdo';
const MAL_USERNAME = 'mosesfdo';

const EXPERIENCES = [
  {
    id: 1,
    year: "Aug 2025 – Jan 2026",
    role: "Technical Associate",
    company: "Karunya Innovation and Design Studio",
    description: "Conducted technical workshops and coding sessions.",
    details: ["Organized events to promote hands-on learning", "Mentored peers through project-based guidance"],
    image: "https://picsum.photos/seed/tech/600/400?grayscale"
  },
  {
    id: 2,
    year: "May 2025 – Jul 2025",
    role: "Frontend Web Developer Intern",
    company: "Hicup Innovations",
    description: "Developed responsive web interfaces using React, HTML, CSS, and JavaScript.",
    details: ["Collaborated with team to improve UI/UX and implement features", "Contributed to deployment of a production-level business website", "Gained exposure to frontend and basic backend workflows"],
    image: "https://picsum.photos/seed/frontend/600/400?grayscale"
  },
  {
    id: 3,
    year: "Oct 2024 – Dec 2024",
    role: "Videographer",
    company: "Karunya Media Center",
    description: "Assisted in filming and editing promotional and event videos.",
    details: ["Managed camera operations, lighting, and audio setup", "Supported production planning and execution"],
    image: "https://picsum.photos/seed/video/600/400?grayscale"
  }
];

const PROJECTS = [
  {
    id: 1,
    title: "Amazon AI Assistant",
    category: "Chrome Extension / AI",
    image: projectAmazonAi,
    tech: "JavaScript, React, FastAPI, LLM APIs",
    description: "Chrome extension that extracts Amazon product data and generates AI-driven insights. Extracts product details and customer reviews in real time.",
    link: "https://github.com/mosesfdo/amazon-assistant"
  },
  {
    id: 2,
    title: "Finance Tracker",
    category: "Personal Finance",
    image: projectFinance,
    tech: "React, Backend API, Database",
    description: "A personal finance tracking application focused on helping users understand and manage their spending. Tracks daily expenses and categorizes transactions.",
    link: "https://github.com/mosesfdo/WhereDidMyMoneyGo"
  },
  {
    id: 4,
    title: "TuneGrab",
    category: "Desktop Application",
    image: projectTunegrab,
    tech: "Python, Tkinter",
    description: "Python-based desktop application for managing and downloading audio content. GUI built with CustomTkinter.",
    link: "https://github.com/mosesfdo/Tunegrab"
  }
];

// Custom Cursor Component
const CustomCursor = () => {
  const cursorX = useSpring(0, { stiffness: 500, damping: 28 });
  const cursorY = useSpring(0, { stiffness: 500, damping: 28 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, a, .magnetic, .interactive')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 bg-white rounded-full mix-blend-difference pointer-events-none z-[9999] hidden md:block"
      style={{ x: cursorX, y: cursorY, scale: isHovering ? 2 : 1 }}
    />
  );
};

// Magnetic Button Wrapper
const Magnetic = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPos({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => setPos({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      className={`magnetic inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
};

// AI Decoder Text Component
const ScrambleText = ({ text, className = "" }: { text: string, className?: string }) => {
  const [displayText, setDisplayText] = useState(text);
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()_+<>{}[]";

  const scramble = () => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(text.split("").map((letter, index) => {
        if (index < iteration) return text[index];
        return letters[Math.floor(Math.random() * letters.length)];
      }).join(""));
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 30);
  };

  useEffect(() => { scramble(); }, [text]);

  return <span className={`interactive ${className}`} onMouseEnter={scramble}>{displayText}</span>;
};

// Cinematic Preloader Component
const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [count, setCount] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(c => {
        if (c >= 100) {
          clearInterval(interval);
          setReady(true);
          return 100;
        }
        return c + Math.floor(Math.random() * 12) + 1;
      });
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      exit={{ y: "-100%" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className={`fixed inset-0 z-[100] bg-[#050505] text-white flex flex-col items-center justify-center transition-colors duration-500 ${ready ? 'cursor-pointer hover:bg-[#111]' : ''}`}
      onClick={() => ready && onComplete()}
    >
      <div className="text-8xl md:text-[12rem] font-display font-bold tracking-tighter overflow-hidden">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {Math.min(count, 100)}%
        </motion.div>
      </div>

      <div className="absolute bottom-1/4 w-64 h-1 bg-white/20 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-white"
          animate={{ width: `${Math.min(count, 100)}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      <div className="absolute bottom-12 text-xs tracking-[0.2em] uppercase text-gray-500 flex flex-col items-center gap-2">
        <AnimatePresence mode="wait">
          {!ready ? (
            <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="animate-pulse">
              DECODING EXPERIENCE...
            </motion.span>
          ) : (
            <motion.span key="ready" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-white font-bold">
              [ CLICK ANYWHERE TO ENTER ]
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollTo = (id: string) => {
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full pt-4 pb-6 px-6 md:px-8 flex justify-between items-center z-50 text-white bg-black/30 backdrop-blur-md pointer-events-none border-b border-white/5">
        <img src={mosesLogo} alt="mosesfdo" className="h-6 md:h-8 object-contain pointer-events-auto cursor-pointer interactive mt-1" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
        <nav className="hidden md:flex gap-8 text-sm tracking-[0.15em] uppercase pointer-events-auto items-center" style={{ fontFamily: 'Aespekta, sans-serif', fontWeight: 300 }}>
          <button onClick={() => scrollTo('experience')} className="hover:opacity-70 transition-opacity interactive">Experience</button>
          <button onClick={() => scrollTo('works')} className="hover:opacity-70 transition-opacity interactive">Works</button>
          <button onClick={() => scrollTo('about')} className="hover:opacity-70 transition-opacity interactive">About</button>
          <button onClick={() => scrollTo('contact')} className="hover:opacity-70 transition-opacity interactive">Contact</button>
        </nav>
        <button
          className="md:hidden pointer-events-auto mt-1 interactive"
          onClick={() => setIsOpen(true)}
        >
          <Menu className="w-8 h-8" />
        </button>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-[#050505] text-white z-[60] flex flex-col p-6 pointer-events-auto"
          >
            <div className="flex justify-between items-start">
              <img src={mosesLogo} alt="mosesfdo" className="h-8 object-contain" />
              <button onClick={() => setIsOpen(false)} className="mt-1">
                <X className="w-8 h-8" />
              </button>
            </div>
            <nav className="flex flex-col gap-8 mt-24 text-2xl tracking-[0.15em] uppercase items-center" style={{ fontFamily: 'Aespekta, sans-serif', fontWeight: 300 }}>
              <button onClick={() => scrollTo('experience')} className="hover:text-gray-400 transition-colors">Experience</button>
              <button onClick={() => scrollTo('works')} className="hover:text-gray-400 transition-colors">Works</button>
              <button onClick={() => scrollTo('about')} className="hover:text-gray-400 transition-colors">About</button>
              <button onClick={() => scrollTo('contact')} className="hover:text-gray-400 transition-colors">Contact</button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [hoveredExp, setHoveredExp] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [letterboxdMoviesWatched, setLetterboxdMoviesWatched] = useState<number | null>(null);
  const [malAnimeCompleted, setMalAnimeCompleted] = useState<number | null>(null);

  const audioRef = useRef<HTMLAudioElement>(null);

  // Spotlight effect values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const handleGlobalMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  const playBackgroundAudio = async () => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    audio.volume = 0.3;
    if (!isMuted) {
      audio.muted = false;
    }
    try {
      await audio.play();
    } catch (e) {
      console.log("Audio autoplay blocked", e);
    }
  };

  const handleEnterSite = () => {
    setLoading(false);
    void playBackgroundAudio();
  };

  const toggleMute = () => {
    if (audioRef.current) {
      const nextMuted = !isMuted;
      audioRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
      if (!nextMuted && audioRef.current.paused) {
        void playBackgroundAudio();
      }
    }
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const letterboxdUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://letterboxd.com/${LETTERBOXD_USERNAME}/`)}`;
        const letterboxdResponse = await fetch(letterboxdUrl);
        const letterboxdHtml = await letterboxdResponse.text();
        const letterboxdMatch = letterboxdHtml.match(/logged\s+([\d,]+)\s+films/i);
        if (letterboxdMatch?.[1]) {
          setLetterboxdMoviesWatched(Number(letterboxdMatch[1].replace(/,/g, '')));
        }
      } catch (e) {
        console.log('Letterboxd stats unavailable', e);
      }

      try {
        const malResponse = await fetch(`https://api.jikan.moe/v4/users/${MAL_USERNAME}/statistics`);
        const malJson = await malResponse.json();
        const completed = malJson?.data?.anime?.completed;
        if (typeof completed === 'number') {
          setMalAnimeCompleted(completed);
        }
      } catch (e) {
        console.log('MyAnimeList stats unavailable', e);
      }
    };

    void fetchStats();
  }, []);

  return (
    <ReactLenis root>
      <div className="bg-[#050505] min-h-screen font-sans selection:bg-white selection:text-black text-white" onMouseMove={handleGlobalMouseMove} onContextMenu={(e) => e.preventDefault()}>

        {/* Lofi Background Music */}
        <audio
          ref={audioRef}
          loop
          preload="auto"
          playsInline
          src="https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3"
        />

        <AnimatePresence mode="wait">
          {loading && <Preloader onComplete={handleEnterSite} />}
        </AnimatePresence>

        <CustomCursor />
        <Navbar />

        {/* Audio Toggle Button */}
        <div className="fixed bottom-6 right-6 z-50 pointer-events-auto hidden md:block">
          <Magnetic>
            <button
              onClick={toggleMute}
              className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors border border-white/10 interactive"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
          </Magnetic>
        </div>

        {/* Brutalist Grid Hero Section */}
        <section className="min-h-[100svh] w-full flex flex-col relative overflow-hidden bg-[#050505] pt-24 px-6 md:px-8">
          {/* Subtle Noise Background */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

          <div className="flex-1 flex flex-col w-full max-w-7xl mx-auto relative z-10">

            {/* Massive Typography */}
            <div className="flex-1 flex flex-col justify-center py-12 md:py-20 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                className="relative z-10"
              >
                <h1 className="font-block text-[16vw] md:text-[12vw] leading-[0.85] tracking-tighter text-white uppercase mix-blend-difference flex flex-col gap-4 md:gap-8">
                  <span>MOSES</span>
                  <span>FERNANDO</span>
                </h1>
              </motion.div>

              {/* Floating Element / Image */}
              <motion.div
                initial={{ opacity: 0, rotate: -10, x: 50 }}
                animate={{ opacity: 1, rotate: 0, x: 0 }}
                transition={{ duration: 1, delay: 0.6, type: "spring" }}
                className="absolute right-0 top-1/2 -translate-y-1/2 w-48 h-64 md:w-72 md:h-96 hidden sm:block z-0 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 interactive"
              >
                <img
                  src="https://picsum.photos/seed/moses/600/800?grayscale"
                  alt="Moses"
                  className="w-full h-full object-cover rounded-lg"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 border border-white/20 rounded-lg translate-x-4 translate-y-4 -z-10"></div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex flex-col md:flex-row justify-between items-start md:items-end mt-12 gap-8 z-10"
              >
                <p className="max-w-md text-gray-400 font-mono text-xs md:text-sm leading-relaxed uppercase tracking-wide">
                  Bridging the gap between complex machine learning models and intuitive user interfaces. Building software with purpose.
                </p>
              </motion.div>
            </div>

            {/* Bottom Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="grid grid-cols-1 md:grid-cols-3 border-t border-white/10"
            >
              <div className="p-6 border-b md:border-b-0 md:border-r border-white/10 font-mono text-[10px] md:text-xs uppercase tracking-widest text-gray-500 hover:text-white hover:bg-white/5 transition-colors cursor-default">
                01 / AI/ML Engineering
              </div>
              <div className="p-6 border-b md:border-b-0 md:border-r border-white/10 font-mono text-[10px] md:text-xs uppercase tracking-widest text-gray-500 hover:text-white hover:bg-white/5 transition-colors cursor-default">
                02 / Full Stack Dev
              </div>
              <div className="p-6 font-mono text-[10px] md:text-xs uppercase tracking-widest text-gray-500 hover:text-white hover:bg-white/5 transition-colors cursor-default">
                03 / Creative Coding
              </div>
            </motion.div>
          </div>
        </section>

        {/* Infinite Marquee */}
        <div className="w-full overflow-hidden bg-[#f5f5f5] text-[#111] py-4 border-y border-black/10 flex items-center">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
            className="flex whitespace-nowrap text-3xl md:text-5xl font-display uppercase tracking-widest"
          >
            <span className="px-4">PYTHON — JAVASCRIPT — REACT — FASTAPI — C — TKINTER —</span>
            <span className="px-4">PYTHON — JAVASCRIPT — REACT — FASTAPI — C — TKINTER —</span>
          </motion.div>
        </div>

        {/* Experience Section */}
        <section id="experience" className="w-full bg-[#f5f5f5] text-black relative overflow-hidden">
          <Timeline
            data={EXPERIENCES.map(exp => ({
              title: exp.year,
              content: (
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-1 mb-4">
                    <h4 className="text-3xl md:text-4xl font-display tracking-tight text-black uppercase">{exp.role}</h4>
                    <span className="text-lg md:text-xl font-serif italic text-gray-500">{exp.company}</span>
                  </div>
                  <p className="text-gray-600 leading-relaxed max-w-2xl text-lg">{exp.description}</p>
                  <div className="w-12 h-px bg-gray-300 my-4"></div>
                  <ul className="space-y-3">
                    {exp.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-4 text-gray-600">
                        <span className="font-mono text-xs text-gray-400 mt-1">0{i + 1}</span>
                        <span className="leading-relaxed">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            }))}
          />
        </section>

        {/* Arsenal Section */}
        <section className="py-24 md:py-32 px-6 md:px-8 max-w-7xl mx-auto w-full border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs font-bold tracking-[0.2em] uppercase text-gray-500 flex items-center gap-4"
            >
              <span className="w-8 h-[1px] bg-gray-500"></span> Arsenal
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl text-gray-400 max-w-md text-left md:text-right font-serif italic"
            >
              The tools and technologies I use to bring ideas to life.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Web & Programming",
                items: ["Python", "JavaScript", "C", "HTML/CSS", "React.js", "UI/UX Design"],
                icon: "01"
              },
              {
                title: "Tools & Tech",
                items: ["Git & GitHub", "FastAPI", "Chrome Extension APIs", "Tkinter"],
                icon: "02"
              },
              {
                title: "Core & AI/ML",
                items: ["Data Structures", "Algorithms", "OOP", "AI Fundamentals", "Machine Learning"],
                icon: "03"
              }
            ].map((category, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#0a0a0a] rounded-3xl p-8 border border-white/5 hover:border-white/20 transition-colors group relative overflow-hidden"
              >
                <div className="text-8xl font-display text-white/5 absolute -right-4 -top-8 group-hover:text-white/10 transition-colors">
                  {category.icon}
                </div>
                <h3 className="text-2xl font-medium tracking-tight mb-8 relative z-10">{category.title}</h3>
                <ul className="flex flex-col gap-4 relative z-10">
                  {category.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-400 group-hover:text-gray-200 transition-colors">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-white/50 transition-colors"></span>
                      <span className="font-mono text-sm tracking-wide">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Works Section */}
        <section id="works" className="min-h-[100svh] w-full bg-[#050505] p-6 md:p-8 py-24 md:py-32 flex flex-col justify-center relative overflow-hidden border-t border-white/5">
          <div className="max-w-7xl mx-auto w-full relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-xs font-bold tracking-[0.2em] uppercase text-gray-500 flex items-center gap-4"
              >
                <span className="w-8 h-[1px] bg-gray-500"></span> Selected Works
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-lg md:text-xl text-gray-400 max-w-md text-left md:text-right font-serif italic"
              >
                A curated selection of projects bridging AI, web development, and design.
              </motion.p>
            </div>

            <div className="w-full relative mt-8">
              {/* Subtle glow behind the slider */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-white/5 blur-[120px] rounded-full pointer-events-none"></div>

              <CircularTestimonials
                testimonials={PROJECTS.map(p => ({
                  quote: p.description || "",
                  name: p.title,
                  designation: p.category,
                  src: p.image,
                  link: p.link
                }))}
                autoplay={false}
                colors={{
                  name: "#ffffff",
                  designation: "#6b7280",
                  testimony: "#9ca3af",
                  arrowBackground: "rgba(255,255,255,0.05)",
                  arrowForeground: "#ffffff",
                  arrowHoverBackground: "rgba(255,255,255,0.15)",
                }}
                fontSizes={{
                  name: "clamp(2.5rem, 5vw, 4rem)",
                  designation: "0.875rem",
                  quote: "1.125rem",
                }}
              />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="min-h-[100svh] w-full bg-[#f5f5f5] text-black p-6 md:p-8 py-24 md:py-32 flex flex-col justify-center relative overflow-hidden">
          <div className="max-w-7xl mx-auto w-full relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16 md:mb-32">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="lg:col-span-7 flex flex-col justify-center"
              >
                <h2 className="text-xs font-bold tracking-[0.2em] uppercase mb-8 text-gray-500 flex items-center gap-4">
                  <span className="w-8 h-[1px] bg-gray-400"></span> About Me
                </h2>
                <h3 className="text-4xl md:text-5xl lg:text-7xl font-display tracking-tight text-black mb-8 leading-[0.9]">
                  I JUST LOVE <span className="text-gray-400 italic">BUILDING COOL THINGS</span> THAT <span className="text-gray-400 italic">PEOPLE ACTUALLY USE</span>.
                </h3>
                <p className="text-lg md:text-xl font-serif text-gray-600 max-w-2xl leading-relaxed mb-12">
                  I'm Moses — a developer who likes clean UI, useful products, and shipping fast. I work with web and AI tools, learn by building, and keep improving one project at a time.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12 max-w-2xl w-full">
                  <a
                    href={`https://letterboxd.com/${LETTERBOXD_USERNAME}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-2xl border border-black/10 bg-white px-5 py-4 flex items-center justify-between hover:border-black/30 transition-colors interactive"
                  >
                    <div className="flex flex-col">
                      <span className="text-xs uppercase tracking-[0.18em] text-gray-500 font-bold">Letterboxd</span>
                      <span className="text-3xl text-black leading-none mt-2">
                        {letterboxdMoviesWatched ?? '--'}
                      </span>
                      <span className="text-sm text-gray-500 mt-1">Movies watched</span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-500" />
                  </a>

                  <a
                    href={`https://myanimelist.net/profile/${MAL_USERNAME}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-2xl border border-black/10 bg-white px-5 py-4 flex items-center justify-between hover:border-black/30 transition-colors interactive"
                  >
                    <div className="flex flex-col">
                      <span className="text-xs uppercase tracking-[0.18em] text-gray-500 font-bold">MyAnimeList</span>
                      <span className="text-3xl text-black leading-none mt-2">
                        {malAnimeCompleted ?? '--'}
                      </span>
                      <span className="text-sm text-gray-500 mt-1">Anime completed</span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-500" />
                  </a>
                </div>

                <Magnetic>
                  <a
                    href="#"
                    className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-all hover:scale-105 w-fit interactive group"
                  >
                    <Download className="w-4 h-4 group-hover:-translate-y-1 transition-transform" /> Download Resume
                  </a>
                </Magnetic>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="lg:col-span-5 relative"
              >
                <div className="aspect-[3/4] rounded-3xl overflow-hidden relative group shadow-2xl">
                  <img
                    src="https://picsum.photos/seed/moses/800/1000?grayscale"
                    alt="Moses"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>

                {/* Floating badge */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="absolute -bottom-6 -left-6 md:-left-12 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 max-w-[200px]"
                >
                  <div className="text-4xl mb-1">100%</div>
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Driven by curiosity</div>
                </motion.div>
              </motion.div>
            </div>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1, ease: "circOut" }}
              viewport={{ once: true }}
              className="w-full h-px bg-black/20 mb-12 md:mb-20 origin-left"
            ></motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl lg:text-[7.5rem] leading-[0.9] font-bold tracking-tight uppercase text-center md:text-left text-black"
            >
              MAKE IT SIMPLE. MAKE IT USEFUL. SHIP IT.
            </motion.h2>
          </div>
        </section>

        {/* Contact / Footer */}
        <section id="contact" className="w-full bg-[#050505] text-white rounded-t-[3rem] md:rounded-t-[4rem] relative z-20 overflow-hidden px-6 md:px-12 pt-24 md:pt-32 pb-6 md:pb-8 flex flex-col items-center">
          <div className="max-w-7xl mx-auto w-full relative">

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 border-b border-white/10 pb-16 md:pb-24">

              {/* Left side: Typography */}
              <div className="lg:col-span-8 flex flex-col justify-between">
                <div>
                  <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-[4rem] sm:text-7xl md:text-[8rem] lg:text-[9rem] leading-[0.85] font-display tracking-tighter uppercase mb-8"
                  >
                    Let's Build <br className="hidden md:block " />
                    <span className="italic font-serif" style={{ WebkitTextStroke: '0.5px rgba(255, 255, 255, 0.9)', color: 'transparent' }}>Something</span>
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-lg md:text-2xl text-gray-400 max-w-xl font-light leading-relaxed"
                  >
                    Currently open for new opportunities, collaborations, or just a quick chat about tech and design.
                  </motion.p>
                </div>

                <div className="mt-12 md:mt-24">
                  <Magnetic>
                    <a
                      href="mailto:mosesfdo144@gmail.com"
                      className="inline-flex items-center gap-4 bg-white text-black px-8 py-5 md:px-12 md:py-6 rounded-full text-lg md:text-xl font-medium tracking-wide hover:bg-gray-200 transition-colors w-fit interactive group"
                    >
                      <span>Get In Touch</span>
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                    </a>
                  </Magnetic>
                </div>
              </div>

              {/* Right side: Info */}
              <div className="lg:col-span-4 flex flex-col justify-between lg:pl-12 lg:border-l lg:border-white/10 pt-8 lg:pt-0">
                <div className="flex flex-col gap-16">

                  {/* Contact Details */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                  >
                    <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-gray-500 mb-6 flex items-center gap-3">
                      <span className="w-4 h-[1px] bg-gray-500"></span> Contact Details
                    </h4>
                    <div className="flex flex-col gap-2 text-lg md:text-xl font-light">
                      <a href="mailto:mosesfdo144@gmail.com" className="hover:text-gray-300 transition-colors interactive inline-block w-fit">dmosesfernando@gmail.com</a>
                      <p className="text-gray-500 select-all font-serif italic text-base md:text-lg">Tamil Nadu, India</p>
                    </div>
                  </motion.div>

                  {/* Socials */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                  >
                    <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-gray-500 mb-6 flex items-center gap-3">
                      <span className="w-4 h-[1px] bg-gray-500"></span> Socials
                    </h4>
                    <div className="flex flex-col gap-4 text-base md:text-lg font-light">
                      {[
                        { name: "GitHub", url: "https://github.com/mosesfdo", icon: <Github className="w-5 h-5" /> },
                        { name: "LinkedIn", url: "https://linkedin.com/in/mosesfdo", icon: <Linkedin className="w-5 h-5" /> }
                      ].map((social, idx) => (
                        <div key={idx} className="w-fit">
                          <Magnetic>
                            <a
                              href={social.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-4 text-gray-400 hover:text-white transition-colors interactive group"
                            >
                              <span className="p-3 rounded-full border border-white/5 bg-white/5 group-hover:bg-white/10 group-hover:border-white/20 transition-colors">{social.icon}</span>
                              <span className="tracking-wide">{social.name}</span>
                            </a>
                          </Magnetic>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                </div>

                {/* Local Time Indicator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="mt-16 lg:mt-0 flex flex-col gap-2 text-sm text-gray-500 font-mono bg-white/5 p-6 rounded-3xl border border-white/5 w-fit hover:border-white/20 transition-colors interactive"
                >
                  <div className="flex flex-col gap-1 tracking-widest uppercase text-[10px] text-gray-600">Local Time</div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                    </span>
                    {new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' })} (IST)
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Footer Bottom Bar */}
            <div className="w-full pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] md:text-xs text-gray-600 tracking-widest uppercase gap-6 font-mono">
              <span>© {new Date().getFullYear()} Moses. All rights reserved.</span>

              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors interactive flex items-center gap-2 group">
                Back to top <span className="p-2 bg-white/5 rounded-full group-hover:bg-white/10 transition-colors"><ArrowRight className="w-3 h-3 -rotate-90" /></span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </ReactLenis>
  );
}
