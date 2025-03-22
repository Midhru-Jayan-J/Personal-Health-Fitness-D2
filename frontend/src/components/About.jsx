// import React from 'react';
import '../styles/About.css';

const About = () => {
  return (
    <section className="about">
      <div className="about-container">
        <h2>Why Choose Us?</h2>
        <p>
          Our fitness programs are tailored to challenge your limits, build strength, and boost confidence. 
          With expert trainers and world-class facilities, we provide the best environment to achieve your fitness goals.
        </p>
        <div className="about-cards">
          <div className="card">
            <h3>Expert Trainers</h3>
            <p>Get trained by certified professionals.</p>
          </div>
          <div className="card">
            <h3>Modern Equipment</h3>
            <p>Latest fitness machines and gear.</p>
          </div>
          <div className="card">
            <h3>Supportive Community</h3>
            <p>Join a group of fitness enthusiasts.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
