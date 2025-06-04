import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import HomeMainSection from "../components/HomeMainSection";
import Footer from "../components/Footer";
import HowDoWeWorkSection from "../components/HowDoWeWorkSection";
import Testimonial from "../components/Testimonial";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <HomeMainSection />
      <HowDoWeWorkSection />
      <Testimonial />
    </div>
  );
};

export default Home;
