import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './LegalPage.module.css';

const CGU = () => {
  return (
    <>
      <Header />
      <div className={`${styles.legalContainer} container`}>
        <h1>Conditions Générales d'Utilisation</h1>
        <h2>Article 1 : Objet</h2>
        <p>Les présentes CGU définissent les modalités d'utilisation du site MaPACbyGE.</p>
        <h2>Article 2 : Accès au site</h2>
        <p>Le site est accessible gratuitement à tout Utilisateur disposant d'un accès à Internet.</p>
        <h2>Article 3 : Propriété intellectuelle</h2>
        <p>Les contenus du site (logos, textes, images...) sont la propriété de MaPACbyGE.</p>
      </div>
      <Footer />
    </>
  );
};
export default CGU;