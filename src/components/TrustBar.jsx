// Fichier à modifier : src/components/TrustBar.jsx

import React from 'react';
import styles from './TrustBar.module.css';

// --- DÉBUT DE LA MODIFICATION ---

// AVANT, vous aviez un tableau de liens externes :
// const logos = [ 'https://via.placeholder.com/...', ... ];

// MAINTENANT, on importe les images depuis votre dossier local.
// Assurez-vous que les noms (rge.png, etc.) sont corrects.
import logoRGE from '../assets/logos/rge.png';
import logoQualipac from '../assets/logos/qualipac.png';
import logoCee from '../assets/logos/cee.png';
import logoMaprimrenov from '../assets/logos/mpr.png';
import logoAnah from '../assets/logos/anah.png';

// Et on utilise ces images importées dans le tableau.
const logos = [
    { src: logoRGE, alt: 'Certification RGE' },
    { src: logoQualipac, alt: 'Certification Qualipac' },
    { src: logoCee, alt: 'Certification CEE' },
    { src: logoMaprimrenov, alt: 'Logo MPR' },
    { src: logoAnah, alt: 'Logo ANAH' },
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