// import React from 'react';
import "../styles/About.css";

const About = () => {
  return (
    <section className="about">
      <div className="about-container">
        <h2>Why Choose Us?</h2>
        <p>
          Our fitness programs are tailored to challenge your limits, build
          strength, and boost confidence. With expert trainers and world-class
          facilities, we provide the best environment to achieve your fitness
          goals.
        </p>
        <div className="about-cards">
          <div className="card">
            <h3>Expert Advice</h3>
            <p>Get to know about fitness using our AI Chat-man</p>
          </div>
          <div className="card">
            <h3>Get your Exercises</h3>
            <p>Proper workout instructions</p>
          </div>
          <div className="card">
            <h3>What you consume</h3>
            <p>Protein intake and BMI calculator</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
