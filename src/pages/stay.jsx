import React, {  useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BedDouble,
  CalendarDays,
  Coffee,
  House,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Wifi,
} from "lucide-react";
import ktm from "../assets/ktm.jpg";
import pokhara from "../assets/pokhara.jpg";
import mustang from "../assets/mustang.jpg";
import { check } from "prettier/standalone.js";

const featuredStays = [
  {
    name: "Himalayan Courtyard Hotel",
    type: "Hotel",
    address: "Thamel, Kathmandu",
    rooms: 18,
    price: "Rs. 4,500",
    rating: "4.8",
    image: ktm,
    amenities: ["Wifi", "Breakfast", "Airport pickup"],
  },
  {
    name: "Phewa Lake View Villa",
    type: "Villa",
    address: "Lakeside, Pokhara",
    rooms: 6,
    price: "Rs. 8,200",
    rating: "4.9",
    image: pokhara,
    amenities: ["Lake view", "Kitchen", "Private balcony"],
  },
  {
    name: "Mustang Stone Home",
    type: "Home",
    address: "Jomsom, Mustang",
    rooms: 4,
    price: "Rs. 5,800",
    rating: "4.7",
    image: mustang,
    amenities: ["Mountain view", "Heating", "Local meals"],
  },
];

const features = [
  {
    icon: ShieldCheck,
    title: "Verified properties",
    text: "Browse stays with clear details, real locations, and helpful room info.",
  },
  {
    icon: Coffee,
    title: "Trip-ready comfort",
    text: "Find stays with breakfast, wifi, views, and the essentials travelers need.",
  },
  {
    icon: Sparkles,
    title: "Local picks",
    text: "Choose hotels, homes, and villas near Nepal's most loved destinations.",
  },
];
function Stay() {
  const navigate = useNavigate();
  const [destination, setdestination] = useState("");
const [checkin, setcheckin] = useState("");
const [checkout, setcheckout] = useState("");

const [stays, setStays] = useState([]);
const [propertytype, setPropertyType] = useState("hotel");
const [rooms, setrooms] = useState("1");
const [guests , setguests] = useState("1")
const [searched, setSearched] = useState(false);
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
  const handleBookStay = async (stay) => {
    // UI-only: create a local booking object and open Payment page.
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const localBooking = {
      _id: `local-${Date.now()}`,
      tripTitle: stay.Name,
      tripType: 'Stay',
      destination: stay.Address,
      startDate: checkin || new Date().toISOString(),
      endDate: checkout || new Date().toISOString(),
      amount: Number(stay.pricePerNight || 0),
      status: 'Pending',
    };

    navigate('/payment', { state: { booking: localBooking } });
  };

  const handleSearch = async (event) => {
  event.preventDefault();

  if (!destination.trim() || !checkin || !checkout) {
    alert("Fill all fields before searching");
    return;
  }

  setLoading(true);
  setError("");
  setSearched(true);

  try {
    const query = new URLSearchParams({
      where: destination.trim(),
      propertytype,
      checkinDate: checkin,
      checkoutDate: checkout,
      rooms,
    });

    const token = localStorage.getItem("token");

    const response = await fetch(
      `http://localhost:4000/api/v1/stay/search?${query.toString()}`,
      {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      }
    );

    if (response.status === 401) {
      setStays([]);
      alert("Please login to search stays.");
      navigate("/login");
      return;
    }

    if (!response.ok) {
      throw new Error("No stays found");
    }

    const data = await response.json();
    console.log("DATA",data)
    setStays(data);
  } catch (err) {
    setStays([]);
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
  return (
    <main className="bg-slate-50 text-slate-950">
      <section className="relative overflow-hidden bg-slate-950">
        <img
          src={pokhara}
          alt="Pokhara lakeside stay"
          className="absolute inset-0 h-full w-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-slate-950/55" />

        <div className="relative z-10 mx-auto grid min-h-[calc(100vh-72px)] w-full max-w-7xl items-center gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-12">
          <div className="max-w-2xl text-white">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
              <BedDouble size={17} />
              Hotels, homes, and villas
            </div>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Find a stay that feels right for the journey.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/85 sm:text-lg">
              Search comfortable places near your destination, compare rooms,
              and pick the stay that matches your travel mood.
            </p>

            <div className="mt-8 grid max-w-xl grid-cols-3 gap-3 text-center">
              <div className="rounded-lg border border-white/15 bg-white/10 p-4 backdrop-blur">
                <p className="text-2xl font-bold">80+</p>
                <p className="mt-1 text-xs font-semibold uppercase text-white/70">
                  Stays
                </p>
              </div>
              <div className="rounded-lg border border-white/15 bg-white/10 p-4 backdrop-blur">
                <p className="text-2xl font-bold">3</p>
                <p className="mt-1 text-xs font-semibold uppercase text-white/70">
                  Types
                </p>
              </div>
              <div className="rounded-lg border border-white/15 bg-white/10 p-4 backdrop-blur">
                <p className="text-2xl font-bold">4.8</p>
                <p className="mt-1 text-xs font-semibold uppercase text-white/70">
                  Rating
                </p>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSearch}
            className="rounded-lg bg-white p-4 shadow-2xl shadow-slate-950/30 sm:p-6"
          >
            <div className="mb-6 flex flex-wrap gap-2">
             {["Hotel", "Home", "Villa"].map((type) => (
  <button
    type="button"
    key={type}
    onClick={() => setPropertyType(type.toLowerCase())}
    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
      propertytype === type.toLowerCase()
        ? "bg-blue-600 text-white"
        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
    }`}
  >
    {type}
  </button>
))}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="group block rounded-lg border border-slate-200 bg-slate-50 p-4 transition focus-within:border-blue-500 focus-within:bg-white md:col-span-2">
                <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-500">
                  <MapPin size={16} />
                  Destination
                </span>
                <input
                  type="text"
                  placeholder="Pokhara, Kathmandu, Mustang"
                  className="w-full bg-transparent text-lg font-bold outline-none placeholder:text-slate-400"
                  value={destination}
                  onChange={(e) => setdestination(e.target.value)}
                />
              </label>

              <label className="group block rounded-lg border border-slate-200 bg-slate-50 p-4 transition focus-within:border-blue-500 focus-within:bg-white">
                <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-500">
                  <CalendarDays size={16} />
                  Check in
                </span>
                <input
                  type="date"
                  value={checkin}
                  onChange={(e) => setcheckin(e.target.value)}
                  className="w-full bg-transparent text-lg font-bold outline-none"
                />
              </label>

              <label className="group block rounded-lg border border-slate-200 bg-slate-50 p-4 transition focus-within:border-blue-500 focus-within:bg-white">
                <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-500">
                  <CalendarDays size={16} />
                  Check out
                </span>
                <input
                  type="date"
                  value={checkout}
                  onChange={(e) => setcheckout(e.target.value)}
                  className="w-full bg-transparent text-lg font-bold outline-none"
                />
              </label>

              <label className="group block rounded-lg border border-slate-200 bg-slate-50 p-4 transition focus-within:border-blue-500 focus-within:bg-white">
                <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-500">
                  <Users size={16} />
                  Guests
                </span>
                <select
                value={guests}
                onChange={(e) => setguests(e.target.value)}
                 className="w-full bg-transparent text-lg font-bold outline-none ">
                  <option value = "1" >1 guests</option>
                  <option value = "2">2 guests</option>
                  <option value = "3">3 guests</option>
                  <option value = "4">4 guests</option>
                </select>
              </label>

              <label className="group block rounded-lg border border-slate-200 bg-slate-50 p-4 transition focus-within:border-blue-500 focus-within:bg-white">
                <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-500">
                  <BedDouble size={16} />
                  Rooms
                </span>
                <select 
                value = {rooms}
                onChange={(e) => setrooms(e.target.value)}
                className="w-full bg-transparent text-lg font-bold outline-none">
                  <option value="1">1 room</option>
                  <option value="2">2 rooms</option>
                  <option value="3">3 rooms</option>
                  <option value="4">4 rooms</option>
                </select>
              </label>
            </div>

            <button
  type="submit"
  disabled={loading}
  className="mt-5 flex w-full items-center justify-center gap-3 rounded-lg bg-blue-600 px-6 py-4 text-base font-bold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700"
>
  <Search size={20} />
  {loading ? "Searching..." : "Search Stay"}
</button>
          </form>
        </div>
      </section>
{searched && (
  <section className="mx-auto w-full max-w-7xl px-5 pt-12 sm:px-8 lg:px-12">
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        <p className="text-sm font-bold uppercase text-blue-600">
          Search Results
        </p>
        <h2 className="mt-2 text-3xl font-bold text-slate-950">
          Available Stays
        </h2>
      </div>

      {!loading && !error && (
  <p className="font-semibold text-slate-500">
    {stays.length} stay{stays.length === 1 ? "" : "s"} found
  </p>
)}
    </div>

    {error && (
      <div className="rounded-lg border border-red-200 bg-red-50 p-5 font-semibold text-red-700">
        {error}
      </div>
    )}

    {!loading && !error && stays.length === 0 && (
      <div className="rounded-lg border border-slate-200 bg-white p-6 text-slate-600 shadow-sm">
        No stays found for this destination.
      </div>
    )}

    <div className="grid gap-4">
      {stays.map((stay) => (
        <article key={stay._id}
          className="grid gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-[1fr_auto] md:items-center"
        >
          <div>
            <p className="mb-2 text-sm font-bold uppercase text-blue-600">
              {stay.Propertytype}
            </p>

            <h3 className="text-xl font-bold">
              {stay.Name}
            </h3>

            <p className="mt-2 text-sm font-medium text-slate-500">
              📍 {stay.Address}
            </p>

            <p className="mt-1 text-sm font-medium text-slate-500">
              🛏️ {stay.Rooms} Rooms
            </p>

            <p className="mt-1 text-sm font-medium text-slate-500">
              👥 Max Guests: {stay.maxGuests}
            </p>
          </div>

          <div className="flex items-center justify-between gap-4 md:flex-col md:items-end">
            <div>
              <p className="text-xs font-bold uppercase text-slate-400">
                Per Night
              </p>

              <p className="text-2xl font-bold text-slate-950">
                Rs. {stay.pricePerNight}
              </p>
            </div>

            <button
              onClick={() => handleBookStay(stay)}
              className="rounded-full bg-blue-600 px-5 py-2 text-sm font-bold text-white transition hover:bg-blue-700"
            >
              Book stay
            </button>
          </div>
        </article>
      ))}
    </div>
  </section>
)}
      <section className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-8 lg:px-12">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase text-blue-600">
              Featured stays
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-950">
              Places guests keep coming back to
            </h2>
          </div>
          <button className="rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-bold text-slate-700 transition hover:border-blue-600 hover:text-blue-600">
            View all
          </button>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {featuredStays.map((stay) => (
            <article
              key={stay.name}
              className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={stay.image}
                  alt={stay.Name}
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                />
                <div className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-800 shadow">
                   {stay.Propertytype}
                </div>
                <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-slate-950/80 px-3 py-1 text-xs font-bold text-white">
                  <Star size={13} className="fill-yellow-400 text-yellow-400" />
                  {stay.rating}
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-xl font-bold">{stay.name}</h3>
                <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-slate-500">
                  <MapPin size={15} />
                  {stay.address}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {stay.aminitire?.map((amenity) => (
                    <span
                      key={amenity}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                  <div>
                    <p className="text-xs font-bold uppercase text-slate-400">
                      From
                    </p>
                    <p className="text-2xl font-bold">{stay.price}</p>
                  </div>
                  <p className="rounded-full bg-blue-50 px-3 py-1 text-sm font-bold text-blue-700">
                    {stay.rooms} rooms
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid w-full max-w-7xl gap-4 px-5 py-10 sm:px-8 md:grid-cols-3 lg:px-12">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article key={feature.title} className="rounded-lg bg-slate-50 p-5">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                  <Icon size={22} />
                </div>
                <h3 className="text-lg font-bold">{feature.title}</h3>
                <p className="mt-2 leading-6 text-slate-600">{feature.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-6 px-5 py-12 sm:px-8 lg:grid-cols-[1fr_1fr] lg:px-12">
        <div className="rounded-lg bg-slate-950 p-6 text-white sm:p-8">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-white/10">
            <House size={25} />
          </div>
          <h2 className="text-3xl font-bold">Have a stay to list?</h2>
          <p className="mt-4 leading-7 text-white/75">
            Add hotels, homes, and villas to GhumGham with room counts,
            amenities, photos, contact details, and address information.
          </p>
          <button className="mt-6 rounded-full bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-blue-100">
            Add stay
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <Wifi className="text-blue-600" size={26} />
            <h3 className="mt-4 text-lg font-bold">Amenity first</h3>
            <p className="mt-2 leading-6 text-slate-600">
              Make wifi, meals, views, parking, and room features easy to scan.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <MapPin className="text-blue-600" size={26} />
            <h3 className="mt-4 text-lg font-bold">Location clear</h3>
            <p className="mt-2 leading-6 text-slate-600">
              Help travelers choose stays close to their route and activities.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Stay;
