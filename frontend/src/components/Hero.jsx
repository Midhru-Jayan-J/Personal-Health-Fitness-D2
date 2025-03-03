import React from "react";
import "../styles/Hero.css";
import darkArrow from "../assets/health_assets/dark-arrow.png"; 

const Hero = () => {
  return (
    <div className="hero-container" >
      <div className="hero-txt" >
        <h1>Welcome to MAKA Fitness</h1>
        <p>Achieve your fitness goals with expert training and guidance.</p>
        <button className="btn">
          Get Started <img src={darkArrow} alt="Arrow" />
        </button>
      </div>
    </div>
  );
};

export default Hero;

