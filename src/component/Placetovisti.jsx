import ktm from "../assets/ktm.jpg";
import pokh from "../assets/pokhara.jpg"
import mus from "../assets/mustang.jpg"
import man from "../assets/manang.jpg"
import jak from "../assets/janakpur.jpg"
import { Link } from "react-router-dom";

export default function Placeto() {
  return (
    <div className=" mr-9 mt-4 w-full bg-white">
      <h1 className="text-center text-4xl font-bold mb-8">
        Place to Visit
      </h1>

      <div className="flex gap-50 px-8 overflow-x-scroll">
        <Link to = "/">
        <div
          className="w-90 h-100 shrink-0 rounded-xl overflow-hidden shadow-lg bg-cover bg-center flex items-end"
          style={{ backgroundImage: `url(${pokh})` }}
        >
          <div className="w-full bg-black/50 p-4">
            <h2 className="font-bold text-2xl text-white">
              Pokhara
            </h2>

            <p className="text-gray-200">
              Experience beautiful lakes, mountains, and adventure sports.
            </p>
          </div>
        </div>
        </Link>
        
        <div
          className="w-90 h-100  shrink-0 rounded-xl overflow-hidden shadow-lg bg-cover bg-center flex items-end"
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
          className="w-90 h-100 shrink-0 rounded-xl overflow-hidden shadow-lg bg-cover bg-center flex items-end"
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
          className="w-90 h-100 shrink-0 rounded-xl overflow-hidden shadow-lg bg-cover bg-center flex items-end"
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
          className="w-90 h-100 shrink-0 rounded-xl overflow-hidden shadow-lg bg-cover bg-center flex items-end"
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