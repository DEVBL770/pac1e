import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './LegalPage.module.css';

const PageIntrouvable = () => {
  return (
    <>
      <Header />
      <div className={`${styles.legalContainer} container`}>
        <h1>Page introuvable</h1>
        <p>La page demandée n'existe pas ou a été déplacée.</p>
        <p>
          <Link to="/">Retour à l'accueil</Link> —{' '}
          <a href="https://france-renov.gouv.fr/" target="_blank" rel="noopener noreferrer">
            Consulter le portail public France Rénov'
          </a>
        </p>
      </div>
      <Footer />
    </>
  );
};
export default PageIntrouvable;
