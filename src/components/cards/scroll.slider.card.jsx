"use client";
import React, { useRef } from "react";
import { IconsReact } from "@/library/icons";
import H2Tag from "../tags/h2.tag";
import "./ScrollSliderCard.css";

const ScrollSliderCard = ({ children }) => {
  const carouselRef = useRef(null);
  const scrollPrev = () => {
    if (!carouselRef.current) return;
    const width = carouselRef.current.clientWidth;
    carouselRef.current.scrollLeft -= width;
  };
  const scrollNext = () => {
    if (!carouselRef.current) return;
    const width = carouselRef.current.clientWidth;
    carouselRef.current.scrollLeft += width;
  };

  return (
    <div className="scroll-slider">
      <div className="scroll-slider-header">
        <H2Tag tittle="Connect With Astrologers" />
        <div className="scroll-slider-actions">
          <button
            className="slider-btn"
            onClick={scrollPrev}
            aria-label="Previous"
          >
            {IconsReact.Left}
          </button>
          <button
            className="slider-btn"
            onClick={scrollNext}
            aria-label="Next"
          >
            {IconsReact.Right}
          </button>
        </div>
      </div>
      <div ref={carouselRef} className="scroll-slider-track">
        {children}
      </div>
    </div>
  );
};

export default ScrollSliderCard;
