import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/Loginpage";
import Layout from "./Layout";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import UserContextProvider from "./userContex";

import { useEffect } from "react";
import AccountPage from "./pages/Account";
import PlacesPage from "./pages/PlacesPage";
import PlacesForm from "./pages/PlacesForms";
import PlacePages from "./pages/Placepage";
import BookingPage from "./pages/BookingPage";
import BookingPages from "./pages/BookingsPage";







axios.defaults.baseURL = 'http://localhost:5000';
// axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
// axios.defaults.withCredentials = true;

function App() {

  
  return (
   <UserContextProvider>
     <Routes>
        
        {/* The layout component allows os to access the design for our header */}
        <Route path="/" element={<Layout />}>
           <Route path="/" element={<Homepage />} />
           <Route path="/login" element={<LoginPage />} />
           <Route path="/register" element={<RegisterPage />} />
           <Route path="/account" element={<AccountPage />} />
           <Route path="/account/places" element={<PlacesPage />} />
           <Route path="/account/places/new" element={<PlacesForm />} />
           <Route path="/account/places/:id" element={<PlacesForm />} />
           <Route path="/place/:id" element={<PlacePages />} />
           <Route path="/account/bookings/:id" element={<BookingPage /> } />
           <Route path="/account/bookings/" element={<BookingPages />} />
         </Route>
   </Routes>     
   </UserContextProvider>
  )
}

export default App;
