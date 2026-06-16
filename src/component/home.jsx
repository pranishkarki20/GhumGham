import './home.css';

export function Home() {
  return (
    <div className="relative flex w-full h-screen items-center justify-center">
      <video
        autoPlay
        loop
        muted
        className="absolute w-full h-full object-cover"
      >
        <source src="https://res.cloudinary.com/dxcz6k6as/video/upload/q_auto/f_auto/v1781595354/bg_ivr5zr.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/60"></div>
      <input
        type="text"
        placeholder="Enter your destination"
        className="z-10 w-1/2 p-[30px] rounded-[20px] border-0 text-[1.2rem] shadow-md bg-white"
      />
    </div>
  );
}