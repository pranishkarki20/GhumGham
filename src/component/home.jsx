import './home.css';

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

      <input
        type="text"
        placeholder="Enter your destination"
        className="
          z-10
          w-[85%]
          md:w-1/2
          p-4
          md:p-7
          rounded-2xl
          text-lg
          shadow-md
          bg-white
        "
      />
    </div>
  );
}