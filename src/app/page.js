import FAQ from "@/components/Home/FAQ";
import Features from "@/components/Home/Features";
import Footer from "@/components/Home/Footer";
import Hero from "@/components/Home/Hero";
import Navbar from "@/components/Home/Navbar";
import Testimonials from "@/components/Home/Testimonials";
import React from "react";

function page() {
  return (
    <div className="min-h-screen  bg-gradient-to-br from-blue-50 via-teal-50 to-white">
      <Navbar />
      <Hero />
      <Features />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  );
}

export default page;
