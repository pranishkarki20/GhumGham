import { Link } from "react-router-dom";
export default function Signup(){
    return (
        <div className=" mt-50 flex justify-center items-center ">
            <diV className = 'flex flex-row rounded-md p-10 shadow-lg gap-20'>
                <div className="shadow-2xl rounded-md p-8">
                    <h1 className=" height-fit flex  justify-center  items-center mt-30 text-6xl font-['Great_Vibes']"
                    >Welcome</h1>

                    <p className="mx-auto mt-4 max-w-xl text-base text-center italic
                    ">
                        Create your account and start your journey with us.
                        <br/>
                         Access powerful tools and seamless experiences in one place.
                    </p>
                </div>
                <div className="flex flex-col gap-5 " >
                    <h1 className="place-self-center  font-bold text-3xl ">
                    Create an account
                </h1>

                    <div>
                    <label className="text-gray-600">Name</label>
                    <input
                    type="text"
                    placeholder="Full name"
                    className="w-full rounded-md shadow-lg  px-4 py-2"
                    /></div>

                    <div>
                    <label className="text-gray-600">Email</label>
                    <input
                    type = "email"
                    placeholder="Enter you email" 
                    className="w-full rounded-md shadow-lg  px-4 py-2" />
                     </div>

                     <div>
                    <label className="text-gray-600">Password</label>
                    <input 
                    type = "password" 
                    placeholder="Enter your Passowrd" 
                    className="w-full rounded-md shadow-lg  px-4 py-2" />
                    </div>

                    <button
                    onClick={()=>alert("Buttonclicek")}
                    className=" w-fit border rounded-md place-self-center px-6 py-2 font-semibold bg-indigo-600 hover:bg-indigo-700 text-white">
                        Signup
                    </button>

                    <button
                       type="button"
                       className="flex w-full items-center justify-center gap-3 rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-100">
                         <img
                         src="https://www.svgrepo.com/show/475656/google-color.svg"
                          alt="Google"
                          className="h-5 w-5"
                          />
                          <span>Sign in with Google</span>
                          </button>

                          <Link to="/login">
                          <h1>
                            Already have an account ?
                          </h1>
                          </Link>
                </div>

            </diV>
          
        </div>
    )
}