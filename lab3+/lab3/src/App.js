import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Components/NavBar';
import HotelPage from './Pages/HotelPage';
import Browse from './Pages/Browse';
import Home from './Pages/Home';
import SignUp from './Pages/SignUp';
import Favorites from './Pages/Favorites';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/hotels/:id" element={<HotelPage />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
