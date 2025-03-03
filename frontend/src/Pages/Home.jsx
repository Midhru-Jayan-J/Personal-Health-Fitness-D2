import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Programs from "../components/Programs";
import About from "../components/About";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
import "../styles/Home.css";

const Home = () => {
  return (
    <div>
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
