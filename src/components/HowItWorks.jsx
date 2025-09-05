import React from 'react';
import styles from './HowItWorks.module.css';

// On définit les étapes avec des icônes SVG pour un look plus pro
const stepsData = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.125 2.25h-4.5c-1.125 0-2.063.938-2.063 2.063v15.375c0 1.125.938 2.063 2.063 2.063h12.75c1.125 0 2.063-.938 2.063-2.063V13.5M10.125 2.25h4.5v4.5h-4.5v-4.5zM10.125 2.25L5.625 6.75M18.375 2.25l-4.5 4.5M15.75 11.25a3.375 3.375 0 01-3.375 3.375h-1.5a3.375 3.375 0 01-3.375-3.375V8.625c0-1.864 1.51-3.375 3.375-3.375h1.5c1.864 0 3.375 1.511 3.375 3.375v2.625z" />
      </svg>
    ),
    title: 'Testez votre éligibilité',
    description: 'Remplissez notre formulaire en 2 minutes pour savoir si vous êtes éligible aux aides.'
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.624l.259 1.035.259-1.035a3.375 3.375 0 00-2.456-2.456L14.25 18l1.035.259a3.375 3.375 0 002.456 2.456z" />
      </svg>
    ),
    title: 'Visite technique gratuite',
    description: 'Un de nos experts se déplace chez vous pour valider la faisabilité du projet.'
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.83-5.83M11.42 15.17L14.49 12.1M11.42 15.17l-1.42 1.42M14.49 12.1L12.1 14.49M14.49 12.1l-5.83-5.83A2.652 2.652 0 005.25 3L3 5.25A2.652 2.652 0 003 9l5.83 5.83M11.42 15.17L5.83 9.58" />
      </svg>
    ),
    title: 'Installation et économies',
    description: 'Nos techniciens certifiés installent votre pompe à chaleur. Vous commencez à économiser !'
  },
];

const HowItWorks = () => {
  return (
    <section className={styles.howItWorks}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Comment ça marche ?</h2>
        <p className={styles.sectionSubtitle}>Un processus simple en 3 étapes claires, de la demande à l'installation.</p>
        <div className={styles.timeline}>
          {stepsData.map((step, index) => (
            <div key={index} className={styles.stepCard} data-aos="fade-up" data-aos-delay={index * 150}>
              <div className={styles.stepIcon}>{step.icon}</div>
              <div className={styles.stepContent}>
                <span className={styles.stepNumber}>0{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;