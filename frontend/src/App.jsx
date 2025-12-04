import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Timeline from './components/Timeline';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
        <Route path="/" element={<MainPortfolio />} />
      </Routes>
    </Router>
  );
}

const MainPortfolio = () => {
  return (
    <div className="app">
      <Navigation />
      <main>
        <Hero />
        <About />
        <section id="experience" className="section">
          <div className="container">
            <h2 className="section-title gradient-text">Experience</h2>
            <Timeline type="experience" />
          </div>
        </section>
        <section id="education" className="section">
          <div className="container">
            <h2 className="section-title gradient-text">Education</h2>
            <Timeline type="education" />
          </div>
        </section>
        <Projects />
        <Achievements />
        <Contact />
      </main>
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Portfolio. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
