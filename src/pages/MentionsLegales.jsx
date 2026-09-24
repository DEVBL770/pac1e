import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './LegalPage.module.css';

const MentionsLegales = () => {
  return (
    <>
      <Header />
      <div className={`${styles.legalContainer} container`}>
        <h1>Mentions Légales</h1>
        <h2>1. Éditeur du site</h2>
        <p>
          <strong>Raison sociale :</strong>GLOBAL ENVIRONNEMENT<br/>
          <strong>Forme juridique :</strong>SAS<br/>
          <strong>Adresse :</strong> 112 Avenue de Paris 94300 Vincennes<br/>
          <strong>Capital social :</strong> 	31 000,00 €<br/>
          <strong>RCS :</strong> 878 837 475 R.C.S. Creteil<br/>
          <strong>Email :</strong> rg@global-environnement.com
        </p>
        <h2>2. Hébergeur du site</h2>
        <p>
          <strong>Vercel Inc.</strong> <br/>
        </p>
      </div>
      <Footer />
    </>
  );
};
export default MentionsLegales;