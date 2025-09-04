import React from 'react';
import MultiStepForm from './MultiStepForm';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section id="form" className={styles.hero}>
      <div className={`${styles.heroContent} container`}>
        <div className={styles.leftPanel} data-aos="fade-up">
          <h1 className={styles.title}>Votre Pompe à Chaleur installée pour 1€*</h1>
          <p className={styles.subtitle}>
            Grâce aux aides de l'État, réduisez vos factures de chauffage jusqu'à 70% en remplaçant votre ancienne chaudière.
          </p>
          <ul className={styles.benefitsList}>
            <li>✅ Économies d'énergie massives</li>
            <li>✅ Valorisation de votre bien immobilier</li>
            <li>✅ Un geste concret pour la planète</li>
            <li>✅ Installation par des artisans certifiés RGE</li>
          </ul>
        </div>
        <div className={styles.rightPanel} data-aos="fade-up" data-aos-delay="200">
          <MultiStepForm />
        </div>
      </div>
    </section>
  );
};

export default Hero;