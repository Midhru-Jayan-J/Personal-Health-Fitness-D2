import React from "react";
import "../styles/Hero.css"; // Ensure this file exists
import dark_arrow from "../assets/health_assets/dark-arrow.png";
import Navbar from "../components/Navbar"; // Import Navbar
import Hero from "../components/Hero"; // Import Hero
import Programs from "../components/Programs"; // Import Programs

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <div className="hero container">
        <div className="hero-txt">
          <h1>Your Transformation Starts Here!</h1>
          <p>
            Our fitness programs challenge limits, build strength, and boost confidence. 
            With expert trainers, top equipment, and a supportive community, we help you reach your goals.
          </p>
          <button className="btn">
            Explore More <img src={dark_arrow} alt="Arrow Icon" />
          </button>
        </div>
      </div>
      <Programs />
    </div>
  );
};

export default Home;

