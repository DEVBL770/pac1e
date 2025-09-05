import React from 'react';
import styles from './BtdSection.module.css';

// Remplacez cette URL par une image de votre ballon thermodynamique
const btdImage = '/path/to/votre/btd.png';

const BtdSection = () => {
  return (
    <section className={styles.btdSection}>
      <div className={`${styles.btdContent} container`} data-aos="zoom-in">
        <div className={styles.imageWrapper}>
            <img src={btdImage} alt="Ballon thermodynamique pour l'eau chaude sanitaire" />
        </div>
        <h2 className={styles.title}>Complétez votre installation et maximisez vos économies</h2>
        <p className={styles.description}>
          Ajoutez un ballon thermodynamique pour produire votre eau chaude sanitaire et réalisez jusqu'à 75% d'économies supplémentaires sur cette dépense. C'est la solution idéale pour un confort total et des factures allégées.
        </p>
        <a href="#form" className="cta-button">En savoir plus</a>
      </div>
    </section>
  );
};

export default BtdSection;