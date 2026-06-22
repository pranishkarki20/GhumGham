import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const[email , setemail]= useState("");
  const[password , setpassword]= useState("");
  const [message, setMessage] = useState("");
  async function handleLogin(e) {
    e.preventDefault();
    const response  = await fetch("http://localhost:4000/api/v1/users/login",{
      method: "POST",
      headers:{
        "Content-Type" : "application/json",
      },
      body: JSON.stringify({
        email,
        password
      })
    })
    const data = await response.json() ;
    if(response.ok){
      localStorage.setItem("token" , data.token);
      navigate("/")
    }else{
      setMessage(data.message);
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-md bg-white p-6 shadow-lg sm:p-8 md:p-12">
        <div className="flex flex-col items-center gap-8">
          <h1 className="text-center text-2xl font-bold md:text-3xl">
            Welcome Back !!
          </h1>
 <form onSubmit={handleLogin}>
          <div className="flex w-full flex-col gap-5">
            <div className="flex flex-col gap-1">
             
              <label className="text-gray-600">Email</label>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                className="w-full rounded-md border px-4 py-2 shadow-sm outline-none focus:border-indigo-500"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-gray-600">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                   value={password}
                   onChange={(e) => setpassword(e.target.value)}
                className="w-full rounded-md border px-4 py-2 shadow-sm outline-none focus:border-indigo-500"
              />
            </div>
            {
  message && (
    <p className="text-red-500 text-sm mt-2">
      {message}
    </p>
  )
}
          </div>
          <div className="flex w-full flex-col gap-4">
            <button
            type="submit"
              className="mt-5 w-full rounded-md bg-indigo-600 px-6 py-2 font-semibold text-white hover:bg-indigo-700"
            >
              Login
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
          </div>

          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="font-semibold text-indigo-600 hover:underline">
              Signup
            </Link>
          </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;