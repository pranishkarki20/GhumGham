import React, { useEffect, useState } from 'react';
import { Home } from './component/home';
import Navbar from './component/Navbar';
import Placeto from './component/Placetovisti';
import Testimony from './component/testimony';
import Footer from './component/Footer';
import LoadingScreen from './component/LoadingScreen';
import Flight from './pages/flight';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App() {
  const [loading, setloading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setloading(false);
    }, 2000);
  }, []);

  return (
  <>
    {loading ? (
      <LoadingScreen />
    ) : (
      <>
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <Home />
                <Placeto />
                <Testimony />
                <Footer />
              </>
            }
          />

          <Route path="/flight" element={<Flight />} />
        </Routes>
      </>
    )}
  </>
) }