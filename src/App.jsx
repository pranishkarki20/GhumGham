import React, { useEffect, useState } from 'react'
import { Home } from './component/home'
import Navbar from './component/Navbar'
import Placeto from './component/Placetovisti'
import Testimony from './component/testimony'
import Footer from './component/Footer'
import LoadingScreen from './component/LoadingScreen'

export default function App() {
  const [loading, setloading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setloading(false)
    }, 2000);
  })
  return (
<>
     {loading ? (
        <LoadingScreen />
      ) : (
    <div>
        <Navbar/>
      <Home/>
      <Placeto/>
      <Testimony/>
      <Footer/>
    </div>
      )}
    </>
  )
}
