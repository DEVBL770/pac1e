import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './LegalPage.module.css';

const PolitiqueConfidentialite = () => {
  return (
    <>
      <Header />
      <div className={`${styles.legalContainer} container`}>
        <h1>Politique de Confidentialité</h1>
        <p><strong>Dernière mise à jour :</strong> 4 septembre 2025</p>
        <h2>1. Collecte de l'information</h2>
        <p>Nous collectons les informations que vous nous fournissez via notre formulaire, incluant : nom, e-mail, téléphone et code postal.</p>
        <h2>2. Utilisation des informations</h2>
        <p>Ces informations sont utilisées pour traiter votre demande de devis, vous contacter et personnaliser votre expérience.</p>
        <h2>3. Stockage des données</h2>
        <p>Vos informations sont transmises de manière sécurisée et stockées dans un fichier Google Sheets géré par notre entreprise, accessible uniquement à nos équipes.</p>
        <h2>4. Vos droits</h2>
        <p>Conformément à la loi RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données en nous contactant à contact@mapacbyge.fr.</p>
      </div>
      <Footer />
    </>
  );
};
export default PolitiqueConfidentialite;