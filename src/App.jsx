import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./sections/navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Experiences from "./sections/Experiences";
import Testimonial from "./sections/Testimonial";
import Contact from "./sections/Contact";
import Footer from './sections/Footer';

// Admin Imports
import AdminLayout from "./admin/AdminLayout";
import AdminLogin from "./admin/pages/Login";
import AdminHome from "./admin/pages/Home";
import AdminAbout from "./admin/pages/About";
import AdminWork from "./admin/pages/Work";
import AdminContact from "./admin/pages/Contact";
import AdminCV from "./admin/pages/CV";

const PublicPortfolio = () => {
  return (
    <div className="container mx-auto max-w-7xl">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Experiences />
      <Testimonial />
      <Contact />
      <Footer/>
    </div>
  );
};

const App = () => {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<PublicPortfolio />} />

      {/* Admin Login (Outside Layout) */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Admin Protected Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="home" replace />} />
        <Route path="home" element={<AdminHome />} />
        <Route path="about" element={<AdminAbout />} />
        <Route path="work" element={<AdminWork />} />
        <Route path="contact" element={<AdminContact />} />
        <Route path="cv" element={<AdminCV />} />
      </Route>
    </Routes>
  );
};

export default App;
