// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import MahjongScoreCalculator from './components/MahjongScoreCalculator';
import LoginForm from './components/LoginForm';
import PlayerStats from './components/PlayerStats';
import TimeLine from './components/TimeLine';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calculator" element={<MahjongScoreCalculator />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/player" element={<PlayerStats />} />
        <Route path="/timeline" element={<TimeLine />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
