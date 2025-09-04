import React from 'react';
import styles from './HowItWorks.module.css';

const HowItWorks = () => {
  const steps = [
    { title: '1. Testez votre éligibilité', description: 'Remplissez notre formulaire en 2 minutes pour savoir si vous êtes éligible aux aides.' },
    { title: '2. Visite technique gratuite', description: 'Un de nos experts se déplace chez vous pour valider la faisabilité du projet.' },
    { title: '3. Installation et économies', description: 'Nos techniciens certifiés installent votre pompe à chaleur. Vous commencez à économiser !' },
  ];

  return (
    <section className={styles.howItWorks}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Comment ça marche ?</h2>
        <div className={styles.stepsGrid}>
          {steps.map((step, index) => (
            <div key={index} className={styles.stepCard} data-aos="fade-up" data-aos-delay={index * 100}>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;