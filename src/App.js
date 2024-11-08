// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Components/User/HomePage';
import Header from './Components/User/Header';
import Footer from './Components/User/Footer';
import MatchDetails from './Components/User/MatchDetails';

function App() {
  return (
    <Router>
       <Header />
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/match/:id" element={<MatchDetails />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
