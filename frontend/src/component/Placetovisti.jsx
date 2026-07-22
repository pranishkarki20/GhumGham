import ktm from "../assets/ktm.jpg";
import pokh from "../assets/pokhara.jpg"
import mus from "../assets/mustang.jpg"
import man from "../assets/manang.jpg"
import jak from "../assets/janakpur.jpg"
import { Link } from "react-router-dom";

export default function Placeto() {
  return (
    <div className=" w-full mt-10 shadow-lg ">
      <h1 className="text-center text-2xl md:text-4xl lg:text-6xl font-bold mb-8 text-gray-600">
        Top Destination
      </h1>

      <div className="flex gap-50 p-8  overflow-x-auto">
        <Link to = "/">
        <div
          className="w-80  h-100 shrink-0  rounded-xl overflow-hidden shadow-lg bg-cover bg-center flex items-end"
          style={{ backgroundImage: `url(${pokh})` }}
        >
          <div className="w-full bg-black/50 p-4">
            <h2 className="font-bold text-2xl text-white md:text-xl">
              Pokhara
            </h2>

            <p className="text-gray-200">
              Experience beautiful lakes, mountains, and adventure sports.
            </p>
          </div>
        </div>
        </Link>
        
        <div
          className="w-80 h-100  shrink-0 rounded-xl overflow-hidden shadow-lg bg-cover bg-center flex items-end"
          style={{ backgroundImage: `url(${ktm})` }}>
          <div className="w-full bg-black/50 p-4">
            <h2 className="font-bold text-2xl text-white">
              Kathmandu
            </h2>

            <p className="text-gray-200">
              Explore temples, heritage sites, and Nepalese culture.
            </p>
          </div>
        </div>

        <div
          className="w-80 h-100 shrink-0 rounded-xl overflow-hidden shadow-lg bg-cover bg-center flex items-end"
          style={{ backgroundImage: `url(${mus})` }}>
          <div className="w-full bg-black/50 p-4">
            <h2 className="font-bold text-2xl text-white">
              Mustang
            </h2>

            <p className="text-gray-200">
              Explore different hills , off roading experience.
            </p>
          </div>
        </div>

        <div
          className="w-80 h-100 shrink-0 rounded-xl overflow-hidden shadow-lg bg-cover bg-center flex items-end"
          style={{ backgroundImage: `url(${man})` }}>
          <div className="w-full bg-black/50 p-4">
            <h2 className="font-bold text-2xl text-white">
              Manang
            </h2>

            <p className="text-gray-200">
              Explore temples, heritage sites, and Nepalese culture.
            </p>
          </div>
        </div>
        
        <div
          className="w-80 h-100 shrink-0 rounded-xl overflow-hidden shadow-lg bg-cover bg-center flex items-end"
          style={{ backgroundImage: `url(${jak})` }}>
          <div className="w-full bg-black/50 p-4">
            <h2 className="font-bold text-2xl text-white">
              Janakpur
            </h2>

            <p className="text-gray-200">
              Explore the birth place of sita.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}