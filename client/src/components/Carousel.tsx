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
    <div className="relative w-full h-full flex items-center justify-center">
      <div
        className="flex transition-transform duration-1000 w-full h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {carouselData.map((slide, index) => (
          <div
            key={index}
            className="min-w-full h-screen flex items-center justify-center px-20"
          >
            <div className="flex items-center justify-between w-full">
              <div className="w-1/2 pr-10">
                <div className="relative inline-block">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-[500px] h-[500px] object-cover rounded-full"
                  />
                  <div className="absolute top-10 right-10 bg-orange-500 text-white font-bold px-4 py-2 rounded-full text-2xl">
                    {slide.discount}
                  </div>
                </div>
              </div>
              <div className="w-1/2 text-left">
                <h2 className="text-5xl font-bold text-gray-900 mb-4">
                  {slide.title}
                </h2>
                <h3 className="text-3xl text-orange-500 font-semibold mb-6">
                  {slide.subtitle}
                </h3>
                <p className="text-gray-700 mb-8 text-lg">
                  {slide.description}
                </p>
                <button className="bg-orange-500 text-white font-semibold py-3 px-6 rounded-full text-lg">
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {carouselData.map((_, index) =>
          React.createElement(
            index === currentIndex ? BsCircleFill : BsCircle,
            {
              key: index,
              className: `cursor-pointer text-2xl ${
                index === currentIndex ? "text-orange-500" : "text-gray-400"
              }`,
              onClick: () => setCurrentIndex(index),
            }
          )
        )}
      </div>
    </div>
  );
};

export default HeroCarousel;
