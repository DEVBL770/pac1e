import React, { useState } from 'react';
import styles from './FAQ.module.css';

const faqs = [
  { q: 'L\'offre à 1€ est-elle vraiment réelle ?', a: 'Oui, grâce au cumul des aides de l\'État (MaPrimeRénov\', CEE...), les ménages les plus modestes peuvent bénéficier d\'une installation avec un reste à charge de seulement 1€.' },
  { q: 'Suis-je éligible ?', a: 'L\'éligibilité dépend de vos revenus, de votre logement et de votre système de chauffage actuel. Remplissez notre formulaire pour une réponse rapide et gratuite.' },
  { q: 'Combien de temps dure l\'installation ?', a: 'L\'installation d\'une pompe à chaleur air/eau dure généralement entre 1 et 2 jours, selon la complexité du chantier.' },
  { q: 'Quel entretien pour une pompe à chaleur ?', a: 'Un entretien annuel par un professionnel certifié est obligatoire pour garantir le bon fonctionnement et la longévité de votre installation.' },
];

const FAQItem = ({ faq, index, toggleFAQ, active }) => {
  return (
    <div className={`${styles.faqItem} ${active ? styles.active : ''}`} onClick={() => toggleFAQ(index)}>
      <div className={styles.faqQuestion}>
        {faq.q}
        <span className={styles.arrow}>{active ? '-' : '+'}</span>
      </div>
      <div className={styles.faqAnswer}>
        <p>{faq.a}</p>
      </div>
    </div>
  );
};

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const toggleFAQ = index => setActiveIndex(activeIndex === index ? null : index);

  return (
    <section className={styles.faqSection} data-aos="fade-up">
      <div className="container">
        <h2 className={styles.sectionTitle}>Questions Fréquentes</h2>
        <div className={styles.faqContainer}>
          {faqs.map((faq, index) => (
            <FAQItem key={index} faq={faq} index={index} toggleFAQ={toggleFAQ} active={activeIndex === index} />
          ))}
        </div>
      </div>
    </section>
  );
};
export default FAQ;