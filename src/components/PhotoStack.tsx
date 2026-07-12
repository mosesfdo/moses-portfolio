"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";

const INITIAL_PHOTOS = [
  { id: 1, src: "/photo1.jpg", rotation: -3 },
  { id: 2, src: "/photo2.jpg", rotation: 2 },
  { id: 3, src: "/photo3.jpg", rotation: -1 },
  { id: 4, src: "/photo4.jpg", rotation: 4 },
];

export default function PhotoStack() {
  const [photos, setPhotos] = useState(INITIAL_PHOTOS);

  const handleDragEnd = (event: any, info: any, id: number) => {
    // If dragged horizontally past threshold
    if (Math.abs(info.offset.x) > 120) {
      // Cycle card to the bottom of the deck
      setPhotos((prev) => {
        const next = [...prev];
        const swiped = next.find((p) => p.id === id);
        if (swiped) {
          const index = next.indexOf(swiped);
          next.splice(index, 1);
          next.push(swiped);
        }
        return next;
      });
    }
  };

  return (
    <div className="relative w-full h-[400px] flex items-center justify-center select-none">
      <AnimatePresence>
        {photos.map((photo, index) => {
          // Cards are stacked: photos[0] is the top draggable card (index 0)
          // The last in the array is visual bottom, but we want photos[0] on top.
          // Therefore, z-index should be (photos.length - index).
          const zIndex = photos.length - index;
          const isTop = index === 0;

          return (
            <PhotoCard
              key={photo.id}
              photo={photo}
              index={index}
              zIndex={zIndex}
              isTop={isTop}
              onDragEnd={handleDragEnd}
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
}

interface PhotoCardProps {
  photo: { id: number; src: string; rotation: number };
  index: number;
  zIndex: number;
  isTop: boolean;
  onDragEnd: (event: any, info: any, id: number) => void;
}

function PhotoCard({ photo, index, zIndex, isTop, onDragEnd }: PhotoCardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0.5, 1, 1, 1, 0.5]);

  // Stacking style effects
  const scale = 1 - index * 0.04;
  const translateY = index * 12;
  const initialRotate = photo.rotation;

  return (
    <motion.div
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      style={{
        zIndex,
        x,
        rotate: isTop ? rotate : initialRotate,
        opacity: isTop ? opacity : 1 - index * 0.15,
        scale: isTop ? 1 : scale,
        y: isTop ? 0 : translateY,
        cursor: isTop ? "grab" : "default",
        position: "absolute",
      }}
      whileTap={isTop ? { scale: 1.02, cursor: "grabbing" } : {}}
      onDragEnd={(e, info) => onDragEnd(e, info, photo.id)}
      transition={isTop ? {} : { type: "spring", stiffness: 300, damping: 25 }}
      className="w-[280px] sm:w-[320px] aspect-[3/4] bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl p-3"
    >
      <div className="w-full h-full rounded-xl overflow-hidden bg-zinc-950 relative">
        <img
          src={photo.src}
          alt={`Studio photograph ${photo.id}`}
          className="object-cover w-full h-full pointer-events-none"
        />
        <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md px-3 py-2 rounded-xl border border-white/5 text-[11px] text-white/60 text-center font-light uppercase tracking-widest font-mono">
          Drag to swipe deck
        </div>
      </div>
    </motion.div>
  );
}
