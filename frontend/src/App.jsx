import React, { useEffect, useState } from 'react';
import { Home } from './component/home';
import Navbar from './component/Navbar';
import Placeto from './component/Placetovisti';
import Testimony from './component/testimony';
import Footer from './component/Footer';
import LoadingScreen from './component/LoadingScreen';
import Flight from './pages/flight';
import Stay from './pages/stay';
import Login from './pages/login';
import Signup from './pages/singup';
import Profile from './pages/profile';
import AdminDashboard from './pages/AdminDashboard';
import MyBookings from './pages/MyBookings';
import Payment from './pages/Payment';
import { Routes, Route } from 'react-router-dom';

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
        <Routes>
          <Route
            path="/"
            element={
              <>
               <Navbar />
                <Home />
                <Placeto />
                <Testimony />
                <Footer />
              </>
            }
          />

          <Route path="/flight" element={
            <>
             <Navbar />
            <Flight />  </> }
          />
          <Route path= "/stay" element={
            <>
            <Navbar/>
            <Stay />
            </>} />
          <Route path="/login" element= {
            <>
            <Navbar/>
            <Login />
            </>} />
          <Route path="/signup" element= {
            <>
            <Navbar/>
            <Signup />
            </>} />

          <Route path="/profile" element={
              <>
                <Navbar />
                <Profile />
              </>
            } />

            <Route path="/admin" element={
              <>
                <Navbar />
                <AdminDashboard />
              </>
            } />

            <Route path="/my-bookings" element={
              <>
                <Navbar />
                <MyBookings />
              </>
            } />
            <Route path="/payment" element={
              <>
                <Navbar />
                <Payment />
              </>
            } />
        </Routes>
      </>
    )}
  </>
) }