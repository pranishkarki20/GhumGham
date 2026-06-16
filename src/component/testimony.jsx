import React from "react";

export default function Testimony() {
  return (
    <div className="flex flex-wrap justify-center px-6 py-6 mt-20 gap-10 md:gap-20">
      <div className="w-84 p-15 rounded-xl shadow-md">
        <h1 className="italic text-gray-600 text-lg">
          "Planning our trip was effortless. Everything from the accommodations
          to the activities was perfectly organized. We had an unforgettable
          experience! "
        </h1> 

        <h1 className="mt-5 flex justify-center text-gray-500 italic" > 
            — Sarah Khadka , Biratnagar 
        </h1>
      </div>

      <div className="w-84 p-15 rounded-xl shadow-md">
        <h1 className="italic text-gray-600 text-lg">
          "The itinerary was well planned, and the support team was always available when we needed assistance. Highly recommended for stress-free travel."
        </h1>

        <h1 className="mt-5 flex justify-center text-gray-500 italic" >
            — Pranish Karki , Kathmandu
        </h1>
      </div>

      <div className="w-84 p-15 rounded-xl shadow-md">
        <h1 className="italic text-gray-600 text-lg">
          "Our family vacation exceeded all expectations. Every destination was beautiful, and the recommendations were spot on."
        </h1>
        <h1 className="mt-5 flex justify-center text-gray-500 italic" >
            -Alen Shrestha , Pokhara
        </h1>
      </div>

      <div className="w-84 p-15 rounded-xl shadow-md text-grey-500">
        <h1 className=" italic text-gray-600 text-lg ">
          "From start to finish, the experience was seamless. I can't wait to plan my next adventure here!"
        </h1>
        <h1 className="mt-5 flex justify-center text-gray-500 italic" >
            -Aryan Shah , Chitwan
        </h1>
      </div>
    </div>
  );
}