import './home.css';
import { ArrowRight, BedDouble, Plane, Search, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";

const highlights = [
  {
    title: "Curated stays",
    description: "Sleep in scenic hotels and cozy mountain retreats near your route.",
    icon: BedDouble,
  },
  {
    title: "Seamless flights",
    description: "Book flexible flight options for quick escapes and long adventures.",
    icon: Plane,
  },
  {
    title: "Trusted planning",
    description: "Enjoy a stress-free experience backed by secure payments and support.",
    icon: ShieldCheck,
  },
];

const stats = [
  { value: "50+", label: "Destinations" },
  { value: "4.9/5", label: "Traveler rating" },
  { value: "24/7", label: "Trip support" },
];

export function Home() {
  return (
    <div className="bg-slate-950 text-slate-100">
      <section className="relative overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source
            src="https://res.cloudinary.com/dxcz6k6as/video/upload/q_auto/f_auto/v1781595354/bg_ivr5zr.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/85 via-slate-900/70 to-cyan-900/50" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.22),_transparent_36%)]" />

        <div className="relative z-10 mx-auto flex min-h-[80vh] max-w-7xl flex-col justify-center px-6 py-20 md:px-8 lg:px-10">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-slate-100 backdrop-blur">
              <Sparkles size={16} className="text-cyan-300" />
              Discover Nepal with comfort and style
            </div>

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
              className="block text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl"
            />

            <p className="mt-5 max-w-2xl text-lg text-slate-200 sm:text-xl">
              Plan flights, stays, and unforgettable experiences in one place with a smooth journey from start to finish.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/flight"
                className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                Explore flights
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/stay"
                className="rounded-full border border-white/25 bg-white/10 px-5 py-3 font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                Browse stays
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {stats.map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur">
                  <div className="text-xl font-semibold text-white">{item.value}</div>
                  <div className="text-sm text-slate-300">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}