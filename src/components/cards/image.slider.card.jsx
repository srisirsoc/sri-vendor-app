"use client";
import { useEffect, useState } from "react";
import { IconsReact } from "../../library/icons";
import ImgTags from '@/components/tags/image.tag';
import './ImageSlider.css';  // Import the CSS

const ImageSlider = ({ imgs = [], btn = false, time = 6000 }) => {
  const [ind, setInd] = useState(0);

  // Automatically change the image after a set interval
  useEffect(() => {
    const intervalId = setInterval(() => {
      setInd(prevInd => (prevInd === imgs.length - 1 ? 0 : prevInd + 1));
    }, time);

    return () => clearInterval(intervalId);
  }, [imgs.length, time]);

  // Handle image change based on user click (Prev / Next)
  const changeBanner = (direction) => {
    setInd((prevInd) => {
      if (direction === "prev") {
        return prevInd === 0 ? imgs.length - 1 : prevInd - 1;
      } else {
        return prevInd === imgs.length - 1 ? 0 : prevInd + 1;
      }
    });
  };

  // Handle click to redirect to the image URL
  const handleRedirect = (url) => {
    if (url) {
      window.open(url, "_blank");  // Open in new tab
    }
  };

  return (
    <div className="image-slider-container">
      {/* Prev Button */}
      {btn && (
        <button
          onClick={() => changeBanner("prev")}
          className="image-slider-btn image-slider-btn-left"
          aria-label="Previous Slide"
        >
          {IconsReact.Left}
        </button>
      )}

      {/* Image Container */}
      <div
        onClick={() => handleRedirect(imgs[ind]?.url)}
        className="image-slider-img-container"
      >
        <ImgTags
          src={imgs[ind]?.url || imgs[ind]?.imageURL}
          alt="Banner"
          className="image-slider-img image-slider-transition"
          width={2200}
          height={1800}
        />
      </div>

      {/* Next Button */}
      {btn && (
        <button
          onClick={() => changeBanner("next")}
          className="image-slider-btn image-slider-btn-right"
          aria-label="Next Slide"
        >
          {IconsReact.Right}
        </button>
      )}
    </div>
  );
};

const FaqSection = () => {
  const images = [
    { url: 'https://via.placeholder.com/1500x500', alt: 'Image 1' },
    { url: 'https://via.placeholder.com/1500x500', alt: 'Image 2' },
    { url: 'https://via.placeholder.com/1500x500', alt: 'Image 3' }
  ];

  return (
    <div>
      <ImageSlider imgs={images} btn={true} time={5000} />
    </div>
  );
};

export default FaqSection;
