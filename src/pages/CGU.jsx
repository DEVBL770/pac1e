// src/pages/CGU.jsx

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
        <p><strong>Dernière mise à jour :</strong> 4 septembre 2025</p>

        <h2>Article 1 : Objet</h2>
        <p>
          Les présentes Conditions Générales d'Utilisation (CGU) ont pour objet de définir les modalités de mise à disposition du site MaPACbyGE et les conditions d'utilisation du service par l'Utilisateur.
        </p>

        <h2>Article 2 : Accès au site</h2>
        <p>
          Le site MaPACbyGE est accessible gratuitement en tout lieu à tout Utilisateur ayant un accès à Internet. Tous les frais supportés par l'Utilisateur pour accéder au service (matériel informatique, logiciels, connexion Internet, etc.) sont à sa charge. Le site met en œuvre tous les moyens mis à sa disposition pour assurer un accès de qualité à ses services.
        </p>

        <h2>Article 3 : Propriété intellectuelle</h2>
        <p>
          Les marques, logos, signes ainsi que tous les contenus du site (textes, images, son…) font l'objet d'une protection par le Code de la propriété intellectuelle et plus particulièrement par le droit d'auteur. L'Utilisateur doit solliciter l'autorisation préalable du site pour toute reproduction, publication, copie des différents contenus.
        </p>
        
        <h2>Article 4 : Responsabilité</h2>
        <p>
          Les sources des informations diffusées sur le site MaPACbyGE sont réputées fiables mais le site ne garantit pas qu’il soit exempt de défauts, d’erreurs ou d’omissions. L'information communiquée sur le site est présentée à titre indicatif et général sans valeur contractuelle.
        </p>
        
        <h2>Article 5 : Droit applicable et juridiction compétente</h2>
        <p>
          La législation française s'applique au présent contrat. En cas d'absence de résolution amiable d'un litige né entre les parties, les tribunaux français seront seuls compétents pour en connaître.
        </p>
      </div>
      <Footer />
    </>
  );
};

export default CGU;