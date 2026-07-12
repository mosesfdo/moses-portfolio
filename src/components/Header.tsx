"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  const openPalette = () => {
    const event = new CustomEvent("open-command-palette");
    document.dispatchEvent(event);
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Work", href: "/projects" },
    { name: "Contact", href: "/links" },
  ];

  const menuVariants: Variants = {
    initial: {
      scaleY: 0,
      transformOrigin: "50% 0%",
    },
    animate: {
      scaleY: 1,
      transition: {
        duration: 0.6,
        ease: [0.76, 0, 0.24, 1],
      },
    },
    exit: {
      scaleY: 0,
      transformOrigin: "50% 0%",
      transition: {
        duration: 0.6,
        ease: [0.76, 0, 0.24, 1],
        delay: 0.1,
      },
    },
  };

  const linkContainerVariants: Variants = {
    initial: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
    animate: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
  };

  const linkVariants: Variants = {
    initial: { y: 80, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.215, 0.61, 0.355, 1] } },
    exit: { y: 50, opacity: 0, transition: { duration: 0.3, ease: "easeIn" } },
  };

  return (
    <>
      <header className="fixed top-6 md:top-8 left-4 sm:left-6 md:left-8 lg:left-12 right-4 sm:right-6 md:right-8 lg:right-12 z-40 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto">
          <button
            onClick={openPalette}
            type="button"
            className="flex items-center justify-center w-11 h-11 rounded-full bg-white/[0.03] border border-white/10 hover:border-white/20 hover:bg-white/[0.06] transition-all duration-300 text-white font-medium text-xl select-none cursor-pointer"
            aria-label="Open command palette"
          >
            ⌘
          </button>
        </div>

        <div className="pointer-events-auto">
          <button
            onClick={toggleMenu}
            type="button"
            className="flex flex-col items-center justify-center w-11 h-11 rounded-full bg-white/[0.03] border border-white/10 hover:border-white/20 hover:bg-white/[0.06] transition-all duration-300 gap-1.5 cursor-pointer relative group"
            aria-label="Menu"
          >
            <motion.span
              animate={isOpen ? { rotate: 45, y: 4.5 } : { rotate: 0, y: 0 }}
              className="bg-white h-[1.5px] w-5 relative z-10 transition-colors"
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
              className="bg-white h-[1.5px] w-5 relative z-10 transition-colors"
            />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 z-30 bg-black flex flex-col justify-between px-6 sm:px-12 md:px-24 pt-32 pb-12 w-full h-screen overflow-hidden"
          >
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)]" />
            </div>

            <motion.div
              variants={linkContainerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex flex-col space-y-4 md:space-y-6 max-w-4xl mt-6 sm:mt-10"
            >
              <p className="text-white/40 text-[11px] font-medium tracking-[0.3em] uppercase mb-2">Navigation</p>
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <div key={link.name} className="overflow-hidden">
                    <motion.div variants={linkVariants}>
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`group inline-flex items-center text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight uppercase leading-none transition-colors ${
                          isActive ? "text-[#ffffff]" : "text-white/60 hover:text-white"
                        }`}
                      >
                        <span className="mr-4 text-2xl sm:text-4xl text-white/20 group-hover:text-[#ffffff]/60 transition-colors font-mono font-light">
                          0{navLinks.indexOf(link) + 1}
                        </span>
                        {link.name}
                        <ArrowUpRight className="w-6 h-6 sm:w-10 sm:h-10 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-2 translate-y-2 group-hover:-translate-y-2 transition-all duration-300 text-[#ffffff]" />
                      </Link>
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-white/5 pt-8 text-xs text-white/30"
            >
              <div>
                <p className="font-medium tracking-widest uppercase mb-2 text-white/40">Social Channels</p>
                <div className="flex gap-4">
                  <a href="https://github.com/mosesfdo" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
                  <a href="https://www.linkedin.com/in/mosesfdo/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
                  <a href="https://instagram.com/mosesfdo" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
                  <a href="https://bsky.app/profile/mosesfdo.bsky.social" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Bluesky</a>
                </div>
              </div>
              <div className="sm:text-right">
                <p className="font-medium tracking-widest uppercase mb-2 text-white/40">Get in touch</p>
                <a href="mailto:mosesfdo@gmail.com" className="hover:text-white transition-colors text-sm font-light">mosesfdo@gmail.com</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
