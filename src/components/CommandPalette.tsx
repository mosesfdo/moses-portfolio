"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Compass, ExternalLink, Mail, FileText, X } from "lucide-react";

interface CommandItem {
  id: string;
  title: string;
  category: "Navigation" | "Action" | "Socials";
  icon: React.ReactNode;
  action: () => void;
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };

    const handleCustomEvent = () => {
      setOpen(true);
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("open-command-palette", handleCustomEvent);
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("open-command-palette", handleCustomEvent);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setActiveIndex(0);
      setSearch("");
    }
  }, [open]);

  const items: CommandItem[] = [
    {
      id: "nav-home",
      title: "Go to Home",
      category: "Navigation",
      icon: <Compass className="w-4 h-4" />,
      action: () => { router.push("/"); setOpen(false); },
    },
    {
      id: "nav-about",
      title: "Go to About",
      category: "Navigation",
      icon: <Compass className="w-4 h-4" />,
      action: () => { router.push("/about"); setOpen(false); },
    },
    {
      id: "nav-projects",
      title: "Go to Work (Projects)",
      category: "Navigation",
      icon: <Compass className="w-4 h-4" />,
      action: () => { router.push("/projects"); setOpen(false); },
    },
    {
      id: "nav-contact",
      title: "Go to Links & Contact",
      category: "Navigation",
      icon: <Compass className="w-4 h-4" />,
      action: () => { router.push("/links"); setOpen(false); },
    },
    {
      id: "action-email",
      title: "Copy Email Address",
      category: "Action",
      icon: <Mail className="w-4 h-4" />,
      action: () => {
        navigator.clipboard.writeText("mosesfdo@gmail.com");
        alert("Email address copied to clipboard!");
        setOpen(false);
      },
    },
    {
      id: "action-resume",
      title: "View Resume PDF",
      category: "Action",
      icon: <FileText className="w-4 h-4" />,
      action: () => {
        window.open("/resume", "_blank");
        setOpen(false);
      },
    },
    {
      id: "soc-github",
      title: "GitHub Profile",
      category: "Socials",
      icon: <ExternalLink className="w-4 h-4" />,
      action: () => { window.open("https://github.com/mosesfdo", "_blank"); setOpen(false); },
    },
    {
      id: "soc-linkedin",
      title: "LinkedIn Profile",
      category: "Socials",
      icon: <ExternalLink className="w-4 h-4" />,
      action: () => { window.open("https://www.linkedin.com/in/mosesfdo/", "_blank"); setOpen(false); },
    },
    {
      id: "soc-instagram",
      title: "Instagram Profile",
      category: "Socials",
      icon: <ExternalLink className="w-4 h-4" />,
      action: () => { window.open("https://instagram.com/mosesfdo", "_blank"); setOpen(false); },
    },
    {
      id: "soc-bluesky",
      title: "Bluesky Profile",
      category: "Socials",
      icon: <ExternalLink className="w-4 h-4" />,
      action: () => { window.open("https://bsky.app/profile/mosesfdo.bsky.social", "_blank"); setOpen(false); },
    },
  ];

  const filtered = items.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (filtered.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[activeIndex]) {
        filtered[activeIndex].action();
      }
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-full max-w-lg bg-[#141414] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10 m-4"
          >
            <div className="flex items-center gap-3 px-4 border-b border-white/10 h-14">
              <Search className="w-5 h-5 text-gray-500 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Type a command or search..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setActiveIndex(0);
                }}
                onKeyDown={handleKeyDown}
                className="w-full h-full bg-transparent text-white text-[15px] placeholder:text-gray-600 focus:outline-none font-light"
              />
              <button
                onClick={() => setOpen(false)}
                className="p-1 hover:bg-white/5 rounded-lg text-gray-500 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-[350px] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-white/10">
              {filtered.length === 0 ? (
                <div className="text-gray-500 text-sm font-light text-center py-8">
                  No results found.
                </div>
              ) : (
                ["Navigation", "Action", "Socials"].map((category) => {
                  const categoryItems = filtered.filter((item) => item.category === category);
                  if (categoryItems.length === 0) return null;
                  return (
                    <div key={category} className="mb-2 last:mb-0">
                      <div className="text-[11px] font-medium tracking-wider text-gray-600 uppercase px-3 py-2">
                        {category}
                      </div>
                      <div className="space-y-1">
                        {categoryItems.map((item) => {
                          const globalIdx = filtered.findIndex((f) => f.id === item.id);
                          const isActive = globalIdx === activeIndex;
                          return (
                            <button
                              key={item.id}
                              onClick={item.action}
                              onMouseEnter={() => setActiveIndex(globalIdx)}
                              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all cursor-pointer ${
                                isActive
                                  ? "bg-white text-black font-semibold"
                                  : "text-gray-400 font-light hover:text-white"
                              }`}
                            >
                              <span className={isActive ? "text-black" : "text-gray-500"}>
                                {item.icon}
                              </span>
                              <span className="text-[14px] flex-1 truncate">{item.title}</span>
                              {isActive && (
                                <span className="text-[11px] font-medium bg-black/10 px-1.5 py-0.5 rounded text-black shrink-0 uppercase tracking-wide">
                                  Enter
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <div className="flex items-center justify-between px-4 py-3 border-t border-white/5 bg-black/20 text-[11px] text-gray-600 font-light">
              <div className="flex items-center gap-2">
                <span>Use</span>
                <span className="bg-white/5 border border-white/10 px-1 py-0.5 rounded">↑↓</span>
                <span>to navigate</span>
              </div>
              <div className="flex items-center gap-2">
                <span>Press</span>
                <span className="bg-white/5 border border-white/10 px-1 py-0.5 rounded">⌘ K</span>
                <span>to toggle</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
