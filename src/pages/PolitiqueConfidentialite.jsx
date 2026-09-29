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
        <p><strong>Dernière mise à jour :</strong> 29 septembre 2026</p>

        <h2>1. Responsable du traitement</h2>
        <p>
          Les traitements décrits ci-dessous sont mis en œuvre par la société ISOLTIME,
          exploitant le site sous la marque GLOBAL ENVIRONNEMENT (SAS, CS 60002, 112 avenue
          de Paris, 94300 Vincennes — voir nos{' '}
          <a href="/mentions-legales">mentions légales</a>).
          Contact pour toute question relative à vos données : rg@global-environnement.com.
        </p>

        <h2>2. Données collectées et finalités</h2>
        <p>Via notre formulaire en plusieurs étapes, nous collectons uniquement :</p>
        <ul>
          <li><strong>Votre logement</strong> : code postal, statut (propriétaire/locataire), type de logement ;</li>
          <li><strong>Votre situation</strong> : type de chauffage actuel, nombre de personnes au foyer, tranche de revenu fiscal de référence ;</li>
          <li><strong>Vos coordonnées</strong> : nom, adresse e-mail, numéro de téléphone.</li>
        </ul>
        <p>
          Ces informations servent <strong>exclusivement</strong> à étudier votre demande de devis
          pour un projet de pompe à chaleur air/eau ou de chauffe-eau thermodynamique
          et à vous recontacter à ce sujet. Tous les champs du formulaire sont nécessaires
          à cette étude ; sans eux, la demande ne peut pas être traitée.
        </p>

        <h2>3. Rappel téléphonique</h2>
        <p>
          Conformément à la réglementation applicable depuis le 11 août 2026, vous ne pouvez
          être démarché(e) par téléphone sans consentement. En soumettant le formulaire, vous
          demandez explicitement à être recontacté(e) : un conseiller de GLOBAL ENVIRONNEMENT
          peut alors vous rappeler, <strong>uniquement au sujet de ce projet</strong>, dans un
          délai maximum de <strong>5 jours ouvrés</strong>. Passé ce délai ou hors de ce cadre,
          aucun appel ne vous sera adressé.
        </p>

        <h2>4. Destinataires des données</h2>
        <p>
          Vos réponses sont transmises de manière sécurisée (HTTPS) à notre outil interne :
          un fichier Google Sheets hébergé par Google, accessible uniquement à notre équipe.
          <strong> Vos données ne sont ni vendues ni transmises à des partenaires</strong> à des
          fins de prospection commerciale.
        </p>

        <h2>5. Sous-traitants et transferts hors UE</h2>
        <p>
          Google (formulaire Sheets / Apps Script) et Vercel Inc. (hébergement du site) traitent
          des données pour notre compte. Certains traitements peuvent impliquer des serveurs
          situés aux États-Unis ; ils sont encadrés par les mécanismes de transfert prévus par
          le RGPD (notamment le cadre EU–US Data Privacy Framework pour les entités certifiées).
        </p>

        <h2>6. Durées de conservation</h2>
        <p>
          Vos données de demande de devis sont conservées au maximum <strong>3 ans à compter de
          notre dernier contact</strong>, puis supprimées ou archivées de manière intermédiaire
          lorsque des obligations légales l'exigent. Les journaux techniques d'hébergement ont
          une durée limitée, définie par l'hébergeur.
        </p>

        <h2>7. Cookies et traceurs</h2>
        <p>
          Le site utilise des traceurs de mesure d'audience et de suivi publicitaire,
          déposés via Google Tag Manager, <strong>uniquement après votre consentement</strong>.
          Lors de votre première visite, un bandeau vous permet d'accepter, de refuser ou de
          personnaliser ces traceurs ; le refus est aussi simple que l'acceptation. Votre choix
          est conservé <strong>6 mois</strong> sur votre appareil, puis il vous sera à nouveau
          demandé. Vous pouvez le modifier à tout moment via le lien « Gérer mes cookies »
          en bas de chaque page.
        </p>

        <h2>8. Vos droits</h2>
        <p>
          Vous disposez de droits d'accès, de rectification, d'effacement, d'opposition, de
          limitation et de portabilité de vos données, que vous pouvez exercer à tout moment
          en écrivant à rg@global-environnement.com. Vous pouvez également introduire une
          réclamation auprès de la{' '}
          <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">CNIL</a>.
        </p>
      </div>
      <Footer />
    </>
  );
};
export default PolitiqueConfidentialite;
