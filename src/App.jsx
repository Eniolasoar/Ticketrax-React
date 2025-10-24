import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import "./App.css";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <section className="container section">
          <Features />
        </section>
        <section className="container section">
          <Banner />
        </section>
      </main>
      <Footer />
    </>
  );
}
