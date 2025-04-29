// resources/js/app.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import WorkshopPage from './pages/WorkshopPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

import '../css/app.css';

const App = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/tienda" element={<ShopPage />} />
      <Route path="/taller" element={<WorkshopPage />} />
      <Route path="/sobre-nosotros" element={<AboutPage />} />
      <Route path="/contacto" element={<ContactPage />} />
    </Routes>
    <Footer />
  </Router>
);

ReactDOM.createRoot(
  document.getElementById('react-root')!
).render(<App />);
