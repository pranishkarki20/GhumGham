import './home.css';
import { Search } from "lucide-react";
import { TypeAnimation } from "react-type-animation";
export function Home() {
  return (
    <div className="relative flex w-full h-[60vh] md:h-screen items-center justify-center">
      <video
        autoPlay
        loop
        muted
        className="absolute w-full h-full object-cover"
      >
        <source
          src="https://res.cloudinary.com/dxcz6k6as/video/upload/q_auto/f_auto/v1781595354/bg_ivr5zr.mp4"
          type="video/mp4"
        />
      </video>
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative flex flex-col items-center gap-3 md:gap-29 z-10 w-[85%] md:w-1/2">
      <TypeAnimation
          sequence={[
            "Where do you want to go?",
            2000,
            "Explore Nepal with GhumGham",
            2000,
            "Find your next destination",
            2000,
          ]}
          wrapper="span"
          speed={50}
          repeat={Infinity}
          className="text-center text-3xl font-bold text-white md:text-5xl"
        />
      
      <div className = "relative w-full">
  <Search
    size={20}
    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
  />

  <input
    type="text"
    placeholder="Enter your destination"
    className="
      w-full
      p-4
      md:p-7
      md:pl-12
      pl-14
      rounded-2xl
      text-lg
      shadow-md
      bg-white
      outline-none
    "
  />
</div>
    </div>
    </div>
  );
}