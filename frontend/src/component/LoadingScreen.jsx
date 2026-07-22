import React from 'react'

function LoadingScreen() {
  return (
    <div className="flex h-screen items-center justify-center bg-white">
         <div className="text-center">
        <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-slate-700 border-t-cyan-400"></div>

        <h1 className="mt-6 text-2xl font-bold text-white">
          Loading...
        </h1>

        <p className="mt-2 text-slate-400">
          Preparing your experience
        </p>
      </div>


      </div>
  )
}

export default LoadingScreen
