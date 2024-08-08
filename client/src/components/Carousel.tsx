import React, { useState, useEffect } from "react";
import { BsCircle, BsCircleFill } from "react-icons/bs";
import slider1 from "../assets/images/slider_img_1.png";
import slider2 from "../assets/images/slider_img_2.png";
import slider3 from "../assets/images/slider_img_3.png";
import "../index.css";

const carouselData = [
  {
    image: slider1,
    title: "Eat Healthy. Stay Healthy.",
    subtitle: "Fast Food & Restaurants",
    discount: "70% off",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum fugit minima et debitis ut distinctio optio qui voluptate natus.",
  },
  {
    image: slider2,
    title: "Eat Healthy. Stay Healthy.",
    subtitle: "Fast Food & Restaurants",
    discount: "70% off",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum fugit minima et debitis ut distinctio optio qui voluptate natus.",
  },
  {
    image: slider3,
    title: "Great Food. Tastes Good.",
    subtitle: "Fast Food & Restaurants",
    discount: "50% off",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum fugit minima et debitis ut distinctio optio qui voluptate natus.",
  },
];

const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-screen h-full flex items-center justify-center py-2 md:py-4">
      <div
        className="flex transition-transform duration-1000 w-full h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {carouselData.map((slide, index) => (
          <div
            key={index}
            className="min-w-full h-screen flex items-center justify-center md:px-20 sm:mb-8 sm:p-8"
          >
            <div className="flex flex-col md:flex-row items-center justify-between w-full gap-1 md:gap-0">
              <div className="w-full md:w-1/2 pr-0 md:pr-10 flex justify-center md:justify-end">
                <div className="relative inline-block">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[400px] md:h-[400px] object-cover rounded-full"
                  />
                  <div className="absolute top-5 right-5 sm:top-10 sm:right-10 bg-orange-500 text-white font-bold px-3 py-1 sm:px-4 sm:py-2 rounded-full text-lg sm:text-2xl">
                    {slide.discount}
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 text-center md:text-left">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2 sm:mb-4">
                  {slide.title}
                </h2>
                <h3 className="text-2xl sm:text-3xl text-orange-500 font-semibold mb-4 sm:mb-6">
                  {slide.subtitle}
                </h3>
                <p className="text-gray-700 mb-6 sm:mb-8 text-base sm:text-lg">
                  {slide.description}
                </p>
                <button className="bg-orange-500 text-white font-semibold py-2 px-4 sm:py-3 sm:px-6 rounded-full text-sm sm:text-lg mb-4">
                  Shop Now
                </button>
                <div className="flex justify-center md:justify-start space-x-2 mt-2">
                  {carouselData.map((_, index) =>
                    React.createElement(
                      index === currentIndex ? BsCircleFill : BsCircle,
                      {
                        key: index,
                        className: `cursor-pointer text-lg sm:text-2xl ${
                          index === currentIndex
                            ? "text-orange-500"
                            : "text-gray-400"
                        }`,
                        onClick: () => setCurrentIndex(index),
                      }
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
