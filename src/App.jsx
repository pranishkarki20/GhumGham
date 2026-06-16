import React from 'react'
import { Home } from './component/home'
import Navbar from './component/Navbar'
import Placeto from './component/Placetovisti'
import Testimony from './component/testimony'
import Footer from './component/Footer'

export default function App() {
  return (
    <div>
        <Navbar/>
      <Home/>
      <Placeto/>
      <Testimony/>
      <Footer/>
    </div>
    
  )
}
