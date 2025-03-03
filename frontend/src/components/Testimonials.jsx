import React from 'react';
import '../styles/Testimonials.css';

const Testimonials = () => {
  return (
    <section className="testimonials">
      <h2>What Our Clients Say</h2>
      <div className="testimonial-container">
        <div className="testimonial">
          <p>"This gym has changed my life! The trainers are amazing!"</p>
          <h4>- Alex</h4>
        </div>
        <div className="testimonial">
          <p>"Best fitness programs I have ever attended! Highly recommended!"</p>
          <h4>- Sarah</h4>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
