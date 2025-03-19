<<<<<<< HEAD
// import React from "react";
import "../styles/Hero.css"; // Ensure this file exists
import dark_arrow from "../assets/health_assets/dark-arrow.png";
import Navbar from "../components/Navbar"; // Import Navbar
import Hero from "../components/Hero"; // Import Hero
import Programs from "../components/Programs"; // Import Programs
=======
import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Programs from "../components/Programs";
import About from "../components/About";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
import "../styles/Home.css";
>>>>>>> 47c603eddf06446a51642f5c3fc0f0c0f852599a

const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <Hero />
      <Programs />
      <About />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Home;
