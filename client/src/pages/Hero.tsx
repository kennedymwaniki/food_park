import bgImage from "../assets/images/banner_bg.jpg";
import HeroCarousel from "../components/Carousel";

const Hero = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        objectFit: "cover",
        backgroundPosition: "center",
      }}
      className="relative h-screen w-full"
    >
      <div className="absolute inset-0 bg-white opacity-80"></div>
      <div className="relative z-10 flex items-center justify-center h-full">
        <HeroCarousel />
      </div>
    </div>
  );
};

export default Hero;
