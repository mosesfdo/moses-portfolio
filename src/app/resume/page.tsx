"use client";

import React from "react";
import { ArrowLeft, Printer } from "lucide-react";
import Link from "next/link";

export default function Resume() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-black text-white py-12 px-6 sm:px-12 md:px-24">
      {/* Print overrides styling */}
      <style jsx global>{`
        @media print {
          body {
            background: white !important;
            color: black !important;
          }
          .no-print {
            display: none !important;
          }
          .print-border {
            border-color: #ddd !important;
          }
          .text-muted {
            color: #444 !important;
          }
          .text-white {
            color: black !important;
          }
          span.text-white\/30, span.text-white\/40, span.text-white\/50, p.text-white\/40 {
            color: #555 !important;
          }
          .bg-zinc-900 {
            background: #f4f4f5 !important;
            border-color: #ccc !important;
          }
        }
      `}</style>

      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Navigation & Print Actions */}
        <div className="flex justify-between items-center no-print border-b border-white/10 pb-6">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Portfolio</span>
          </Link>
          
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg text-sm font-semibold hover:bg-gray-200 transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print Resume</span>
          </button>
        </div>

        {/* Header Personal Info */}
        <div className="space-y-4 text-center sm:text-left">
          <h1 className="text-4xl sm:text-5xl font-bold font-big-shoulders tracking-wider text-white uppercase">
            Moses Fernando
          </h1>
          <p className="text-[#ffffff] text-lg font-medium tracking-wide uppercase">
            Full-Stack Developer & AIMl Engineer
          </p>
          <div className="flex flex-wrap justify-center sm:justify-start gap-x-6 gap-y-2 text-sm text-gray-400 text-muted">
            <span>dmosesfernando@gmail.com</span>
            <span>•</span>
            <a href="https://github.com/mosesfdo" target="_blank" rel="noopener" className="hover:underline">github.com/mosesfdo</a>
            <span>•</span>
            <a href="https://www.linkedin.com/in/mosesfdo/" target="_blank" rel="noopener" className="hover:underline">linkedin.com/in/mosesfdo</a>
          </div>
        </div>

        <hr className="border-white/10 print-border" />

        {/* Profile summary */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-3 text-gray-500 text-sm font-semibold tracking-wider uppercase">
            Profile
          </div>
          <div className="md:col-span-9 text-gray-300 text-muted text-sm sm:text-base font-light leading-relaxed">
            Full-Stack Developer with expertise in building automated backend scripts, custom developer utilities, and clean frontend web designs. Proficient in Python systems automation (API integration, yt-dlp automation) and React/TypeScript web apps, creating applications that eliminate repetitive task flows.
          </div>
        </div>

        <hr className="border-white/10 print-border" />

        {/* Experience Timeline details */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-3 text-gray-500 text-sm font-semibold tracking-wider uppercase">
            Experience
          </div>
          <div className="md:col-span-9 space-y-8">
            
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                <h3 className="text-white text-lg font-semibold uppercase">Independent Development</h3>
                <span className="text-gray-400 text-muted text-sm font-mono">2024 - Present</span>
              </div>
              <p className="text-[#ffffff] text-sm uppercase">Full Stack Developer</p>
              <ul className="list-disc pl-5 text-gray-300 text-muted text-sm font-light leading-relaxed space-y-1">
                <li>Designed and built <strong>TuneGrab</strong>, a Python automation utility to download Spotify playlists.</li>
                <li>Created <strong>TempMail</strong>, a disposable email web app with task tracking logs.</li>
                <li>Engineered custom automation scripts in Python to clean and sync directory systems.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                <h3 className="text-white text-lg font-semibold uppercase">University Projects</h3>
                <span className="text-gray-400 text-muted text-sm font-mono">2023 - Present</span>
              </div>
              <p className="text-[#ffffff] text-sm uppercase">Software Engineering Student</p>
              <ul className="list-disc pl-5 text-gray-300 text-muted text-sm font-light leading-relaxed space-y-1">
                <li>Collaborate on academic web project lifecycles, database structures, and testing.</li>
                <li>Implement modular algorithms and clean data structures for class assignments.</li>
              </ul>
            </div>

          </div>
        </div>

        <hr className="border-white/10 print-border" />

        {/* Skills Tag chips */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-3 text-gray-500 text-sm font-semibold tracking-wider uppercase">
            Skills
          </div>
          <div className="md:col-span-9 flex flex-wrap gap-2">
            {["Python", "React", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS", "Node.js", "Express", "Tailwind CSS", "yt-dlp", "API Integration", "Docker", "Git"].map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 rounded-md bg-zinc-900 border border-white/10 text-white/80 text-xs font-mono"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
