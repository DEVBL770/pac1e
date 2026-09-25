import React from 'react';
import styles from './BtdSection.module.css';

// Remplacez cette URL par une image de votre ballon thermodynamique
const btdImage = '/btd.png';

const BtdSection = () => {
  return (
    <section className={styles.btdSection}>
      <div className={`${styles.btdContent} container`} data-aos="zoom-in">
        <div className={styles.imageWrapper}>
            <img src={btdImage} alt="Ballon thermodynamique pour l'eau chaude sanitaire" />
        </div>
        <h2 className={styles.title}>Complétez votre installation avec un chauffe-eau thermodynamique</h2>
        <p className={styles.description}>
          Un chauffe-eau thermodynamique produit votre eau chaude en récupérant les calories de
          l'air : il consomme généralement moins qu'un chauffe-eau électrique classique.
          Demandez une étude personnalisée pour connaître le gain applicable à votre foyer.
        </p>
        <a href="#form" className="cta-button">Vérifier mon éligibilité</a>
      </div>
    </section>
  );
};

export default BtdSection;