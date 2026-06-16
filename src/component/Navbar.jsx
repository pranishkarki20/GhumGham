import { Link } from 'react-router-dom';

export default function Navbar() {
  const navbar = [
    { name: "Home", Link: "/" },
    { name: "Flight", Link: "/flight" },
    { name: "Stay", Link: "/stay" },
  ];

  return (
    <div className="flex justify-between items-center p-4 bg-gray-900 text-white">
      <h1 className="text-2xl font-bold">GhumGham</h1>
       <ul className="absolute left-1/2 -translate-x-1/2 flex gap-50 font-sans font-semibold  text-xl">
    {navbar.map((item, index) => (
      <li key={index}>
        <Link
          to={item.Link}
          className="hover:text-blue-400"
        >
          {item.name}
        </Link>
      </li>
    ))}
  </ul>

<div>
 <Link to="/login">
  <button className="px-5 py-2 rounded-full border border-white text-white hover:bg-white hover:text-black hover:scale-105 transition-all duration-300">
    Login
  </button>
</Link>

<Link to="/signup">
  <button className="ml-3 px-5 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 hover:scale-105 transition-all duration-300">
    Signup
  </button>
</Link>
</div>
    </div>
  );
}