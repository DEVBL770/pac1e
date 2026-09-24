import React from 'react';
import styles from './ProductCard.module.css';

// Remplacez cette URL par une belle image de votre pompe à chaleur
const productImage = '/pompe-a-chaleur.png'; 

const ProductCard = () => {
  return (
    <section className={styles.productSection}>
      <div className={`${styles.productCard} container`} data-aos="fade-up">
        <div className={styles.imageWrapper}>
          <img src={productImage} alt="Pompe à chaleur haute performance" />
        </div>
        <div className={styles.contentWrapper}>
          <span className={styles.tag}>Notre matériel</span>
          <h2 className={styles.title}>Des pompes à chaleur air/eau performantes</h2>
          <p className={styles.description}>
            Nous installons des pompes à chaleur de dernière génération, sélectionnées pour leur fiabilité, leur performance énergétique et leur fonctionnement silencieux.
          </p>
          <ul className={styles.featuresList}>
            <li>✅ Équipements sélectionnés pour leur performance énergétique</li>
            <li>✅ Modèles récents, pilotables à distance selon références</li>
            <li>✅ Fonctionnement silencieux</li>
            <li>✅ Peut ouvrir droit aux aides de l'État, selon votre éligibilité</li>
          </ul>
          <a href="#form" className="cta-button">Vérifier mon éligibilité</a>
        </div>
      </div>
    </section>
  );
};

export default ProductCard;