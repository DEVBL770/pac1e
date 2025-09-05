import React from 'react';
import styles from './ProductCard.module.css';

// Remplacez cette URL par une belle image de votre pompe à chaleur
const productImage = '/path/to/votre/pompe-a-chaleur.png'; 

const ProductCard = () => {
  return (
    <section className={styles.productSection}>
      <div className={`${styles.productCard} container`} data-aos="fade-up">
        <div className={styles.imageWrapper}>
          <img src={productImage} alt="Pompe à chaleur haute performance" />
        </div>
        <div className={styles.contentWrapper}>
          <span className={styles.tag}>Notre matériel</span>
          <h2 className={styles.title}>Une Pompe à Chaleur Haute Performance</h2>
          <p className={styles.description}>
            Nous installons des pompes à chaleur de dernière génération, sélectionnées pour leur fiabilité, leur performance énergétique et leur fonctionnement silencieux.
          </p>
          <ul className={styles.featuresList}>
            <li>✅ Classe énergétique A+++</li>
            <li>✅ Connectivité Wi-Fi pour un contrôle à distance</li>
            <li>✅ Fonctionnement ultra-silencieux</li>
            <li>✅ Eligible à toutes les aides de l'État</li>
          </ul>
          <a href="#form" className="cta-button">Vérifier mon éligibilité</a>
        </div>
      </div>
    </section>
  );
};

export default ProductCard;