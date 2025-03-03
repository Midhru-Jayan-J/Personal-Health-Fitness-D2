import React from "react";
import "../styles/Hero.css";

const Hero = () => {
  return (
    <div className="hero-container">
      <div className="hero"></div>
      <div className="hero-txt">
        <h1>Welcome to Maka Fitness</h1>
        <p>Achieve your fitness goals with expert training and guidance.</p>
        <button className="btn">
          Get Started <img src="../assets/health_assets/dark-arrow.png" alt="Arrow" />
        </button>
      </div>
    </div>
  );
};

export default Hero;
