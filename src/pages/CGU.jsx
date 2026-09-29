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
        <p><strong>Dernière mise à jour :</strong> 29 septembre 2026</p>

        <h2>Article 1 : Objet</h2>
        <p>
          Les présentes conditions définissent les modalités d'utilisation du site
          global-environnement.fr, site de présentation édité par la société ISOLTIME sous la
          marque GLOBAL ENVIRONNEMENT. Elles ne constituent ni un devis ni des conditions
          générales de vente de travaux : toute prestation fait l'objet d'un devis écrit,
          présenté et accepté séparément.
        </p>

        <h2>Article 2 : Accès au site</h2>
        <p>Le site est accessible gratuitement à tout utilisateur disposant d'un accès à Internet.</p>

        <h2>Article 3 : Test d'éligibilité et demande de devis</h2>
        <p>
          Le questionnaire proposé sur le site fournit une <strong>indication préliminaire</strong>{' '}
          de votre éligibilité possible à certains dispositifs d'aides. Cette indication ne vaut
          ni décision administrative, ni garantie d'obtention d'une aide, ni engagement de prix :
          les montants réels dépendent des règles en vigueur au moment de votre demande et de
          votre dossier. Seul un devis détaillé, établi après étude de votre situation, précise
          le prix, les aides mobilisables et le reste à charge. Le formulaire ne constitue en
          aucun cas un contrat ni une commande.
        </p>

        <h2>Article 4 : Propriété intellectuelle</h2>
        <p>Les contenus du site (logos, textes, images...) sont la propriété de l'éditeur du site ou utilisés avec autorisation.</p>

        <h2>Article 5 : Liens</h2>
        <p>
          Le site peut contenir des liens vers des sites publics d'information, notamment{' '}
          <a href="https://france-renov.gouv.fr/" target="_blank" rel="noopener noreferrer">
            france-renov.gouv.fr
          </a>. Ces liens sont fournis à titre informatif : ils n'impliquent aucune affiliation
          de l'éditeur à ces organismes.
        </p>

        <h2>Article 6 : Contact</h2>
        <p>Pour toute question : rg@global-environnement.com ou 01 89 21 39 31.</p>
      </div>
      <Footer />
    </>
  );
};
export default CGU;
