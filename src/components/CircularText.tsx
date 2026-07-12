"use client";

import React from "react";
import { motion, useAnimation } from "framer-motion";

interface CircularTextProps {
  text: string;
  spinDuration?: number;
  onHover?: "slowDown" | "speedUp" | "pause" | "goBonkers";
  className?: string;
}

export default function CircularText({
  text,
  spinDuration = 10,
  onHover = "slowDown",
  className = "",
}: CircularTextProps) {
  const chars = Array.from(text);
  const controls = useAnimation();

  React.useEffect(() => {
    controls.start({
      rotate: 360,
      transition: {
        repeat: Infinity,
        ease: "linear",
        duration: spinDuration,
      },
    });
  }, [spinDuration, controls]);

  const handleMouseEnter = () => {
    let duration = spinDuration;
    if (onHover === "slowDown") duration = spinDuration * 2;
    else if (onHover === "speedUp") duration = spinDuration / 2.5;
    else if (onHover === "goBonkers") duration = spinDuration / 6;
    else if (onHover === "pause") {
      controls.stop();
      return;
    }

    controls.start({
      rotate: 360,
      transition: {
        repeat: Infinity,
        ease: "linear",
        duration: duration,
      },
    });
  };

  const handleMouseLeave = () => {
    controls.start({
      rotate: 360,
      transition: {
        repeat: Infinity,
        ease: "linear",
        duration: spinDuration,
      },
    });
  };

  return (
    <motion.div
      className={`circular-text select-none cursor-pointer ${className}`}
      animate={controls}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ originX: "50%", originY: "50%" }}
    >
      {chars.map((char, idx) => {
        const rotation = (360 / chars.length) * idx;
        return (
          <span
            key={idx}
            style={{
              transform: `translate(-50%, -50%) rotate(${rotation}deg) translateY(-50px)`,
              position: "absolute",
              left: "50%",
              top: "50%",
            }}
          >
            {char === "*" ? "•" : char}
          </span>
        );
      })}
    </motion.div>
  );
}
