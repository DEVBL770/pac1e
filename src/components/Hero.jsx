import React from 'react';
import MultiStepForm from './MultiStepForm';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section id="form" className={styles.hero}>
      <div className={`${styles.heroContent} container`}>
        <div className={styles.leftPanel} data-aos="fade-up">
          <h1 className={styles.title}>Pompe à chaleur air/eau et chauffe-eau thermodynamique : vérifiez vos aides et demandez un devis personnalisé</h1>
          <p className={styles.subtitle}>
            Remplacez votre chaudière par une pompe à chaleur air/eau et, si besoin, un
            chauffe-eau thermodynamique pour l'eau chaude sanitaire. Selon votre situation,
            des aides financières peuvent s'appliquer (MaPrimeRénov', certificats d'économies
            d'énergie, TVA à taux réduit).
          </p>
          <ul className={styles.benefitsList}>
            <li>✅ Réduction possible de vos consommations de chauffage</li>
            <li>✅ Valorisation de votre bien</li>
            <li>✅ Un geste pour la planète</li>
          </ul>
          <p className={styles.disclaimer}>
            Le montant des aides et votre reste à charge dépendent de vos revenus, de votre
            logement, des travaux réalisés et de votre éligibilité réelle aux dispositifs en
            vigueur. Chaque projet fait l'objet d'un devis personnalisé, détaillant
            équipements, pose, aides mobilisables et reste à charge exact, avant tout engagement.
          </p>
          <p className={styles.disclaimer}>
            <strong>Vous avez entendu parler d'une pompe à chaleur à 1&nbsp;€&nbsp;?</strong>{' '}
            Vérifiez ce que votre projet vous coûterait réellement, aides et éventuelles
            remises comprises.
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