// src/pages/PolitiqueConfidentialite.jsx

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './LegalPage.module.css'; // On utilise le même style que les autres pages légales

const PolitiqueConfidentialite = () => {
  return (
    <>
      <Header />
      <div className={`${styles.legalContainer} container`}>
        <h1>Politique de Confidentialité</h1>
        <p><strong>Dernière mise à jour :</strong> 4 septembre 2025</p>

        <p>
          La présente Politique de Confidentialité décrit la manière dont MaPACbyGE collecte, utilise et protège les informations que vous nous transmettez lorsque vous utilisez notre site web pour une demande de devis concernant l'installation de pompes à chaleur.
        </p>

        <h2>1. Collecte de l'information</h2>
        <p>
          Nous collectons les informations que vous nous fournissez directement via le formulaire de contact sur notre site. Les informations personnelles collectées incluent :
        </p>
        <ul>
          <li>Votre nom complet</li>
          <li>Votre adresse e-mail</li>
          <li>Votre numéro de téléphone</li>
          <li>Votre code postal</li>
        </ul>

        <h2>2. Utilisation des informations</h2>
        <p>
          Toutes les informations que nous recueillons auprès de vous sont utilisées dans le but de :
        </p>
        <ul>
          <li>Traiter votre demande de devis et d'éligibilité aux aides de l'État.</li>
          <li>Vous contacter par téléphone ou par e-mail pour qualifier votre projet.</li>
          <li>Personnaliser votre expérience et répondre à vos besoins individuels.</li>
          <li>Améliorer notre site Web et nos offres de services.</li>
        </ul>

        <h2>3. Stockage et Sécurité des données</h2>
        <p>
          Les informations soumises via notre formulaire sont transmises de manière sécurisée et stockées dans un fichier Google Sheets géré par notre entreprise. Nous mettons en œuvre des mesures de sécurité pour préserver la sécurité de vos informations personnelles. L'accès à ces données est strictement limité aux équipes internes chargées du traitement de votre demande.
        </p>
        
        <h2>4. Partage à des tiers</h2>
        <p>
          Nous ne vendons, n'échangeons et ne transférons pas vos informations personnelles identifiables à des tiers. Cela ne comprend pas les artisans partenaires certifiés RGE qui pourraient être amenés à vous contacter pour finaliser le devis et l'installation, et qui sont également tenus de respecter la confidentialité de ces informations.
        </p>

        <h2>5. Durée de conservation</h2>
        <p>
          Vos informations sont conservées pendant la durée nécessaire au traitement de votre demande et au suivi commercial qui en découle, dans une limite de 3 ans après notre dernier contact avec vous.
        </p>

        <h2>6. Vos droits</h2>
        <p>
          Conformément à la loi "Informatique et Libertés" et au RGPD, vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition aux données personnelles vous concernant. Pour exercer ce droit, veuillez nous contacter à l'adresse e-mail : contact@mapacbyge.fr.
        </p>

        <h2>7. Consentement</h2>
        <p>
          En utilisant notre site et en soumettant notre formulaire, vous consentez à notre politique de confidentialité.
        </p>
      </div>
      <Footer />
    </>
  );
};

export default PolitiqueConfidentialite;