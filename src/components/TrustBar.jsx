import React from 'react';
import styles from './TrustBar.module.css';

// Remplacez ces URLs par les vôtres (logos de certifications)
const logos = [
    'https://via.placeholder.com/150x60.png/000000/FFFFFF?text=RGE',
    'https://via.placeholder.com/150x60.png/000000/FFFFFF?text=QUALIPAC',
    'https://via.placeholder.com/150x60.png/000000/FFFFFF?text=AFPAC',
    'https://via.placeholder.com/150x60.png/000000/FFFFFF?text=MANDATAIRE',
    'https://via.placeholder.com/150x60.png/000000/FFFFFF?text=GARANTIE',
];

const TrustBar = () => {
  return (
    <div className={styles.trustBar}>
      <div className={styles.marquee}>
        <div className={styles.marqueeContent}>
          {[...logos, ...logos].map((logo, index) => (
            <img key={index} src={logo} alt={`Certification logo ${index + 1}`} className={styles.logo} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustBar;