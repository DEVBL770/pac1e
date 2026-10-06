import React from 'react';
import MultiStepForm from './MultiStepForm';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={`${styles.heroContent} container`}>
        <div className={styles.leftPanel} data-aos="fade-up">
          <h1 className={styles.title}>Pompe à chaleur : jusqu'à 12 000 € d'aides cumulées possibles*</h1>
          <p className={styles.subtitle}>
            Bénéficiez des aides mobilisables pour votre projet : MaPrimeRénov', primes CEE
            et, selon votre situation, aides locales. Étudiez votre pompe à chaleur air/eau,
            avec ou sans chauffe-eau thermodynamique.
          </p>
          <p className={styles.footnote}>
            * Le montant total dépend de votre éligibilité et des aides effectivement
            accordées à votre projet, en cumulant les dispositifs applicables. Votre devis
            détaille votre reste à charge exact avant tout engagement.
          </p>
        </div>
        <div id="form" className={styles.rightPanel} data-aos="fade-up" data-aos-delay="200">
          <MultiStepForm />
        </div>
      </div>
    </section>
  );
};

export default Hero;