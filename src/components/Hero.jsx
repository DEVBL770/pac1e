import React from 'react';
import MultiStepForm from './MultiStepForm';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section id="form" className={styles.hero}>
      <div className={`${styles.heroContent} container`}>
        <div className={styles.leftPanel} data-aos="fade-up">
          <h1 className={styles.title}>Pompe à chaleur et eau chaude : vérifiez vos aides et demandez un devis personnalisé</h1>
          <p className={styles.subtitle}>
            Remplacez votre chaudière par une pompe à chaleur air/eau et produisez votre eau chaude
            plus efficacement. Selon votre situation, vous pouvez bénéficier d'aides financières
            (MaPrimeRénov', certificats d'économies d'énergie...).
          </p>
          <ul className={styles.benefitsList}>
            <li>✅ Réduction possible de vos consommations de chauffage</li>
            <li>✅ Valorisation de votre bien</li>
            <li>✅ Un geste pour la planète</li>
          </ul>
          <p className={styles.disclaimer}>
            Le montant des aides et votre reste à charge dépendent de vos revenus, de votre
            logement, des travaux réalisés et de votre éligibilité réelle aux dispositifs en
            vigueur. Chaque projet fait l'objet d'un devis personnalisé.
          </p>
        </div>
        <div className={styles.rightPanel} data-aos="fade-up" data-aos-delay="200">
          <MultiStepForm />
        </div>
      </div>
    </section>
  );
};

export default Hero;