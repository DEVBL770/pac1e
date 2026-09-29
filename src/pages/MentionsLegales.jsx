import React from 'react';
import { Link } from 'react-router-dom';
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
          Le site global-environnement.fr est exploité sous la marque commerciale{' '}
          <strong>GLOBAL ENVIRONNEMENT</strong> par la société :<br/>
          <strong>Raison sociale :</strong> ISOLTIME<br/>
          <strong>Forme juridique :</strong> SAS<br/>
          <strong>Capital social :</strong> 31 000,00 €<br/>
          <strong>Siège social :</strong> CS 60002, 112 avenue de Paris, 94300 Vincennes<br/>
          <strong>SIRET (siège) :</strong> 878 837 475 00010<br/>
          <strong>RCS :</strong> 878 837 475 R.C.S. Créteil<br/>
          <strong>N° de TVA intracommunautaire :</strong> FR57878837475<br/>
          <strong>Téléphone :</strong> 01 89 21 39 31<br/>
          <strong>Email :</strong> rg@global-environnement.com
        </p>
        <h2>2. Direction de la publication</h2>
        <p>LK CONSEIL, en sa qualité de Président de la société ISOLTIME.</p>
        <h2>3. Hébergeur du site</h2>
        <p>
          <strong>Vercel Inc.</strong>, 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis —{' '}
          <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">vercel.com</a>
        </p>
        <h2>4. Propriété intellectuelle</h2>
        <p>
          Les contenus du site (textes, logos, images) sont la propriété de son éditeur
          ou utilisés avec autorisation. Toute reproduction sans accord écrit est interdite.
        </p>
        <h2>5. Données personnelles et cookies</h2>
        <p>
          Consultez notre{' '}
          <Link to="/politique-de-confidentialite">politique de confidentialité et cookies</Link>{' '}
          ainsi que nos{' '}
          <Link to="/conditions-generales-utilisation">conditions générales d'utilisation</Link>.
        </p>
      </div>
      <Footer />
    </>
  );
};
export default MentionsLegales;
