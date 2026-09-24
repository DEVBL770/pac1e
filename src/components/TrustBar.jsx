// Fichier à modifier : src/components/TrustBar.jsx

import React from 'react';
import styles from './TrustBar.module.css';

// --- DÉBUT DE LA MODIFICATION ---

// AVANT, vous aviez un tableau de liens externes :
// const logos = [ 'https://via.placeholder.com/...', ... ];

// MAINTENANT, on importe les images depuis votre dossier local.
// Assurez-vous que les noms (rge.png, etc.) sont corrects.
import logoCee from '../assets/logos/cee.png';
import logoMaprimrenov from '../assets/logos/mpr.png';
import logoAnah from '../assets/logos/anah.png';

// Logos des dispositifs d'aides publiques mobilisables selon l'éligibilité du foyer.
// NB : les logos RGE et QualiPAC ont été retirés du bandeau car ils désignent des
// certifications de l'entreprise/installateurs, non démontrées à ce jour. Ils pourront
// être réintégrés avec les justificatifs de certification correspondants.
const logos = [
    { src: logoCee, alt: 'Dispositif des certificats d’économies d’énergie (CEE)' },
    { src: logoMaprimrenov, alt: 'Dispositif d’aide MaPrimeRénov’' },
    { src: logoAnah, alt: 'Agence nationale de l’habitat (Anah)' },
];

// --- FIN DE LA MODIFICATION ---


// Le reste du composant utilise simplement le nouveau tableau 'logos'.
const TrustBar = () => {
  return (
    <div className={styles.trustBar}>
      <div className={styles.marquee}>
        <div className={styles.marqueeContent}>
          {[...logos, ...logos].map((logo, index) => (
            <img 
              key={index} 
              src={logo.src} 
              alt={logo.alt} 
              className={styles.logo} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustBar;