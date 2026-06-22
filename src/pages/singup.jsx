import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="flex w-full max-w-5xl flex-col overflow-hidden rounded-md bg-white shadow-lg md:flex-row">
        <div className="flex flex-col items-center justify-center bg-indigo-50 p-8 text-center md:w-1/2 md:p-12">
          <h1 className="text-5xl font-['Great_Vibes'] md:text-6xl">
            Welcome
          </h1>

          <p className="mx-auto mt-4 max-w-md text-base italic text-gray-700">
            Create your account and start your journey with us.
            <br />
            Access powerful tools and seamless experiences in one place.
          </p>
        </div>

        <div className="flex w-full flex-col gap-5 p-6 sm:p-8 md:w-1/2 md:p-12">
          <h1 className="text-center text-2xl font-bold md:text-3xl">
            Create an account
          </h1>

          <div className="flex flex-col gap-1">
            <label className="text-gray-600">Name</label>
            <input
              type="text"
              placeholder="Full name"
              className="w-full rounded-md border px-4 py-2 shadow-sm outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-gray-600">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-md border px-4 py-2 shadow-sm outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-gray-600">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full rounded-md border px-4 py-2 shadow-sm outline-none focus:border-indigo-500"
            />
          </div>

          <button
            onClick={() => alert("Button clicked")}
            className="w-full rounded-md bg-indigo-600 px-6 py-2 font-semibold text-white hover:bg-indigo-700"
          >
            Signup
          </button>

          <button
            type="button"
            className="flex w-full items-center justify-center gap-3 rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="h-5 w-5"
            />
            <span>Sign in with Google</span>
          </button>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-indigo-600 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}