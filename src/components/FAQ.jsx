import React, { useState } from 'react';
import styles from './FAQ.module.css';

const faqs = [
  { q: 'Puis-je bénéficier des aides de l\'État pour une pompe à chaleur ?', a: 'Selon votre situation, plusieurs dispositifs peuvent s\'appliquer : MaPrimeRénov\', les certificats d\'économies d\'énergie (CEE), la TVA réduite... Leur montant dépend de vos revenus, de votre logement et des travaux réalisés, et les travaux doivent être effectués par un professionnel certifié RGE. Remplissez le formulaire pour une étude de votre éligibilité.' },
  { q: 'Les aides peuvent-elles vraiment réduire le coût de mon projet ?', a: 'Oui : lorsque votre dossier y ouvre droit, plusieurs aides peuvent se cumuler (MaPrimeRénov\', prime CEE des fournisseurs d\'énergie, TVA à taux réduit) et réduire sensiblement le coût des travaux. Leur montant n\'est toutefois ni identique ni automatique : il dépend de vos revenus, de la composition de votre foyer, de votre logement, des travaux retenus et des règles en vigueur au moment de votre demande. Seul un devis établi après étude de votre situation vous indique le prix des équipements et de la pose, les aides réellement mobilisables et votre reste à charge exact, avant tout engagement de votre part.' },
  { q: 'Quel sera mon reste à charge ?', a: 'Il n\'existe pas de prix unique : le reste à charge dépend du montant des travaux, des aides auxquelles vous avez réellement droit et de votre projet. Il est déterminé précisément dans un devis personnalisé, avant tout engagement.' },
  { q: 'Comment connaître mon prix et mon reste à charge exacts ?', a: 'Après étude de votre situation, nous établissons un devis détaillé listant les équipements, la pose, les aides mobilisables (MaPrimeRénov\', prime CEE, TVA réduite) et votre reste à charge exact. Vous pouvez aussi vérifier les montants en vigueur sur le portail public France Rénov\' (france-renov.gouv.fr). Vous ne vous engagez qu\'après acceptation du devis.' },
  { q: 'Que se passe-t-il après l\'envoi du formulaire ?', a: 'Un conseiller de GLOBAL ENVIRONNEMENT vous recontacte pour étudier votre situation, puis vous propose une étude et un devis. Vos données sont transmises uniquement à notre équipe (voir notre politique de confidentialité).' },
  { q: 'PAC + ballon thermodynamique à 1 € : est-ce possible pour vous ?', a: 'Faites vérifier votre éligibilité : nous étudions les aides et remises mobilisables pour votre logement, pour une PAC seule ou avec ballon thermodynamique. Si votre dossier permet un reste à charge de 1 €, votre devis le précisera. Découvrez votre montant avant tout engagement.' },
  { q: 'Combien de temps dure l\'installation ?', a: 'L\'installation d\'une pompe à chaleur air/eau dure généralement entre 1 et 2 jours, selon la complexité du chantier.' },
  { q: 'Quel entretien pour une pompe à chaleur ?', a: 'Un entretien annuel par un professionnel qualifié est recommandé pour garantir le bon fonctionnement et la longévité de votre installation.' },
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