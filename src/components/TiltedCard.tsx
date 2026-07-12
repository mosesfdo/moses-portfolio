"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltedCardProps {
  imageSrc: string;
  altText?: string;
  captionText?: string;
  containerHeight?: string;
  containerWidth?: string;
  imageHeight?: string;
  imageWidth?: string;
  scaleOnHover?: number;
  rotateAmplitude?: number;
  showTooltip?: boolean;
  overlayContent?: React.ReactNode;
  displayOverlayContent?: boolean;
}

export default function TiltedCard({
  imageSrc,
  altText = "Tilted card image",
  captionText = "",
  containerHeight = "300px",
  containerWidth = "100%",
  imageHeight = "300px",
  imageWidth = "100%",
  scaleOnHover = 1.05,
  rotateAmplitude = 12,
  showTooltip = true,
  overlayContent = null,
  displayOverlayContent = false,
}: TiltedCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // Normalised coords [0, 1] relative to the card container
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const springConfig = { damping: 30, stiffness: 100, mass: 2 };
  const rotateX = useSpring(useTransform(y, [0, 1], [rotateAmplitude, -rotateAmplitude]), springConfig);
  const rotateY = useSpring(useTransform(x, [0, 1], [-rotateAmplitude, rotateAmplitude]), springConfig);
  const scale = useSpring(hovered ? scaleOnHover : 1, springConfig);

  // Floating tooltip position relative to card top-left
  const tooltipX = useMotionValue(0);
  const tooltipY = useMotionValue(0);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    x.set(mouseX / width);
    y.set(mouseY / height);

    tooltipX.set(mouseX);
    tooltipY.set(mouseY);
  };

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        height: containerHeight,
        width: containerWidth,
        perspective: "1000px",
      }}
      className="relative flex items-center justify-center cursor-pointer group"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          scale,
          width: imageWidth,
          height: imageHeight,
          transformStyle: "preserve-3d",
        }}
        className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-gray-900 transition-shadow duration-300 group-hover:shadow-[#ffffff]/5"
      >
        <img
          src={imageSrc}
          alt={altText}
          style={{ width: "100%", height: "100%" }}
          className="object-cover pointer-events-none"
        />

        {displayOverlayContent && overlayContent && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center pointer-events-none">
            {overlayContent}
          </div>
        )}
      </motion.div>

      {showTooltip && captionText && hovered && (
        <motion.div
          style={{
            left: tooltipX,
            top: tooltipY,
            x: "-50%",
            y: "-150%",
          }}
          className="absolute z-20 pointer-events-none px-3 py-1.5 rounded-lg bg-black/90 border border-white/20 text-white text-xs font-light tracking-wide shadow-xl whitespace-nowrap"
        >
          {captionText}
        </motion.div>
      )}
    </div>
  );
}
