import React from 'react'
import Navbar from '../components/LandingPage/Navbar'
import Hero from '../components/LandingPage/Hero'
import Features from '../components/LandingPage/Features'
import Banner from '../components/LandingPage/Banner'
import Footer from '../components/LandingPage/Footer'

const LandingPage = () => {
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
      <Footer /></>
  )
}

export default LandingPage