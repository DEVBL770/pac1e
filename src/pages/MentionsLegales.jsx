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
          <strong>Raison sociale :</strong> MaPACbyGE<br/>
          <strong>Forme juridique :</strong> SASU<br/>
          <strong>Adresse :</strong> 123 Rue de l'Exemple, 75001 Paris, France<br/>
          <strong>Capital social :</strong> 1 000 €<br/>
          <strong>RCS :</strong> Paris B 123 456 789<br/>
          <strong>Email :</strong> contact@mapacbyge.fr
        </p>
        <h2>2. Directeur de la publication</h2>
        <p><strong>Nom :</strong> Jean Dupont</p>
        <h2>3. Hébergeur du site</h2>
        <p>
          <strong>Nom :</strong> Vercel Inc.<br/>
          <strong>Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, USA
        </p>
      </div>
      <Footer />
    </>
  );
};
export default MentionsLegales;