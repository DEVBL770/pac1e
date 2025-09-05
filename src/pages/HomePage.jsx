import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import TrustBar from '../components/TrustBar';
import HowItWorks from '../components/HowItWorks';
import Benefits from '../components/Benefits';
// --- DÉBUT DES MODIFICATIONS ---
// 1. Importer les deux nouveaux composants
import ProductCard from '../components/ProductCard';
import BtdSection from '../components/BtdSection';
// --- FIN DES MODIFICATIONS ---
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <HowItWorks />
        <Benefits />
        {/* --- DÉBUT DES MODIFICATIONS --- */}
        {/* 2. Placer les composants au bon endroit */}
        <ProductCard />
        <BtdSection />
        {/* --- FIN DES MODIFICATIONS --- */}
        <FAQ />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;