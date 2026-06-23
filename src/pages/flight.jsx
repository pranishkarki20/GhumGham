import React, { useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  MapPin,
  Plane,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

const popularFlights = [
  {
    route: "Kathmandu to Pokhara",
    code: "KTM - PKR",
    time: "25 min",
    price: "Rs. 4,800",
    tag: "Best value",
  },
  {
    route: "Kathmandu to Janakpur",
    code: "KTM - JKR",
    time: "35 min",
    price: "Rs. 5,600",
    tag: "Morning deals",
  },
  {
    route: "Pokhara to Bharatpur",
    code: "PKR - BHR",
    time: "20 min",
    price: "Rs. 4,200",
    tag: "Quick hop",
  },
];

const benefits = [
  {
    icon: ShieldCheck,
    title: "Verified flights",
    text: "Compare trusted domestic carriers and choose seats with confidence.",
  },
  {
    icon: Clock3,
    title: "Fast booking",
    text: "Find available flights, check timings, and reserve your trip in minutes.",
  },
  {
    icon: Sparkles,
    title: "Nepal focused",
    text: "Routes, prices, and timing suggestions built around local travel plans.",
  },
];

function Flight() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [tripType, setTripType] = useState("Round trip");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [flights, setFlights] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (event) => {
    event.preventDefault();

    if (!from.trim() || !to.trim() || !departureDate || (tripType === "Round trip" && !returnDate)) {
      alert("Fill this before search");
      return;
    }

    setLoading(true);
    setError("");
    setSearched(true);

    try {
      const query = new URLSearchParams({
        from: from.trim(),
        to: to.trim(),
        departureDate,
      });

      const response = await fetch(
        `http://localhost:4000/api/v1/flight/search?${query.toString()}`
      );

      if (!response.ok) {
        throw new Error("Could not search flights");
      }

      const data = await response.json();
      setFlights(data);
    } catch (err) {
      setFlights([]);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-slate-50 text-slate-950">
      <section className="relative flex min-h-[calc(100vh-72px)] w-full items-center overflow-hidden">
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
        <div className="absolute inset-0 bg-slate-950/65" />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-12">
          <div className="max-w-2xl text-white">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
              <Plane size={17} />
              Domestic flights across Nepal
            </div>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Book your next flight without the travel desk drama.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/85 sm:text-lg">
              Search routes, compare trip times, and pick flight options that
              fit your GhumGham plans.
            </p>

            <div className="mt-8 grid max-w-xl grid-cols-3 gap-3 text-center">
              <div className="rounded-lg border border-white/15 bg-white/10 p-4 backdrop-blur">
                <p className="text-2xl font-bold">12+</p>
                <p className="mt-1 text-xs font-semibold uppercase text-white/70">
                  Routes
                </p>
              </div>
              <div className="rounded-lg border border-white/15 bg-white/10 p-4 backdrop-blur">
                <p className="text-2xl font-bold">24/7</p>
                <p className="mt-1 text-xs font-semibold uppercase text-white/70">
                  Support
                </p>
              </div>
              <div className="rounded-lg border border-white/15 bg-white/10 p-4 backdrop-blur">
                <p className="text-2xl font-bold">15m</p>
                <p className="mt-1 text-xs font-semibold uppercase text-white/70">
                  Alerts
                </p>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSearch}
            className="rounded-lg bg-white p-4 shadow-2xl shadow-slate-950/30 sm:p-6"
          >
            <div className="mb-6 flex flex-wrap gap-2">
              {["Round trip", "One way"].map((type) => (
                <button
                  type="button"
                  key={type}
                  onClick={() => setTripType(type)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    tripType === type
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="group block rounded-lg border border-slate-200 bg-slate-50 p-4 transition focus-within:border-blue-500 focus-within:bg-white">
                <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-500">
                  <MapPin size={16} />
                  From
                </span>
                <input
                  type="text"
                  placeholder="Kathmandu"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="w-full bg-transparent text-lg font-bold outline-none placeholder:text-slate-400"
                />
              </label>

              <label className="group block rounded-lg border border-slate-200 bg-slate-50 p-4 transition focus-within:border-blue-500 focus-within:bg-white">
                <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-500">
                  <MapPin size={16} />
                  To
                </span>
                <input
                  type="text"
                  placeholder="Pokhara"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="w-full bg-transparent text-lg font-bold outline-none placeholder:text-slate-400"
                />
              </label>

              <label className="group block rounded-lg border border-slate-200 bg-slate-50 p-4 transition focus-within:border-blue-500 focus-within:bg-white">
                <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-500">
                  <CalendarDays size={16} />
                  Departure
                </span>
                <input
                  type="date"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className="w-full bg-transparent text-lg font-bold outline-none"
                />
              </label>

              {tripType === "Round trip" && (
                <label className="group block rounded-lg border border-slate-200 bg-slate-50 p-4 transition focus-within:border-blue-500 focus-within:bg-white">
                  <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-500">
                    <CalendarDays size={16} />
                    Return
                  </span>
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full bg-transparent text-lg font-bold outline-none"
                  />
                </label>
              )}

              <label className="group block rounded-lg border border-slate-200 bg-slate-50 p-4 transition focus-within:border-blue-500 focus-within:bg-white">
                <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-500">
                  <Users size={16} />
                  Travellers
                </span>
                <select className="w-full bg-transparent text-lg font-bold outline-none">
                  <option>1 traveller</option>
                  <option>2 travellers</option>
                  <option>3 travellers</option>
                  <option>4 travellers</option>
                </select>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-5 flex w-full items-center justify-center gap-3 rounded-lg bg-blue-600 px-6 py-4 text-base font-bold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700"
            >
              <Search size={20} />
              {loading ? "Searching..." : "Search flights"}
            </button>
          </form>
        </div>
      </section>

      {searched && (
        <section className="mx-auto w-full max-w-7xl px-5 pt-12 sm:px-8 lg:px-12">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-sm font-bold uppercase text-blue-600">
                Search results
              </p>
              <h2 className="mt-2 text-3xl font-bold text-slate-950">
                Available flights
              </h2>
            </div>

            {!loading && !error && (
              <p className="font-semibold text-slate-500">
                {flights.length} flight{flights.length === 1 ? "" : "s"} found
              </p>
            )}
          </div>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-5 font-semibold text-red-700">
              {error}
            </div>
          )}

          {!loading && !error && flights.length === 0 && (
            <div className="rounded-lg border border-slate-200 bg-white p-6 text-slate-600 shadow-sm">
              No flights found for this route. Try another city code.
            </div>
          )}

          <div className="grid gap-4">
            {flights.map((flight) => (
              <article
                key={flight._id}
                className="grid gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-[1fr_auto] md:items-center"
              >
                <div>
                  <p className="mb-2 text-sm font-bold uppercase text-blue-600">
                    {flight.flightID}
                  </p>
                  <h3 className="text-xl font-bold">
                    {flight.from} to {flight.to}
                  </h3>
                  <p className="mt-2 text-sm font-medium text-slate-500">
                    Departure:{" "}
                    {new Date(flight.deperaturetime).toLocaleString()}
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-500">
                    Arrival: {new Date(flight.arrivaltime).toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-4 md:flex-col md:items-end">
                  <div>
                    <p className="text-xs font-bold uppercase text-slate-400">
                      Price
                    </p>
                    <p className="text-2xl font-bold text-slate-950">
                      Rs. {flight.price}
                    </p>
                  </div>
                  <button className="rounded-full bg-blue-600 px-5 py-2 text-sm font-bold text-white transition hover:bg-blue-700">
                    Book now
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto grid w-full max-w-7xl gap-6 px-5 py-12 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-12">
        <div>
          <p className="text-sm font-bold uppercase text-blue-600">
            Flight deals
          </p>
          <h2 className="mt-2 text-3xl font-bold text-slate-950">
            Popular routes ready for your next trip
          </h2>
          <p className="mt-4 leading-7 text-slate-600">
            Start with frequently searched routes, then adjust the form above
            for dates, passengers, and destinations.
          </p>
        </div>

        <div className="grid gap-4">
          {popularFlights.map((flight) => (
            <article
              key={flight.code}
              className="grid gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl md:grid-cols-[1fr_auto] md:items-center"
            >
              <div>
                <div className="mb-3 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                  {flight.tag}
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-xl font-bold">{flight.route}</h3>
                  <span className="flex items-center gap-2 text-sm font-semibold text-slate-500">
                    <ArrowRight size={15} />
                    {flight.code}
                  </span>
                </div>
                <p className="mt-2 text-sm font-medium text-slate-500">
                  Approx. flight time: {flight.time}
                </p>
              </div>

              <div className="flex items-center justify-between gap-4 md:flex-col md:items-end">
                <div>
                  <p className="text-xs font-bold uppercase text-slate-400">
                    From
                  </p>
                  <p className="text-2xl font-bold text-slate-950">
                    {flight.price}
                  </p>
                </div>
                <button className="rounded-full bg-slate-950 px-5 py-2 text-sm font-bold text-white transition hover:bg-blue-600">
                  View
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto grid w-full max-w-7xl gap-4 px-5 py-10 sm:px-8 md:grid-cols-3 lg:px-12">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <article key={benefit.title} className="rounded-lg bg-slate-50 p-5">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                  <Icon size={22} />
                </div>
                <h3 className="text-lg font-bold">{benefit.title}</h3>
                <p className="mt-2 leading-6 text-slate-600">{benefit.text}</p>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default Flight;
