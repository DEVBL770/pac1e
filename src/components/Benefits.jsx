import React, { useEffect, useRef } from 'react';
import styles from './Benefits.module.css';

// On ajoute une icône à chaque avantage
const benefitsData = [
    { icon: '💰', title: 'Économies Majeures', description: 'Réduisez jusqu\'à 70% sur vos factures de chauffage annuelles.' },
    { icon: '🏠', title: 'Valorisation Immobilière', description: 'Augmentez la classe énergétique (DPE) et la valeur de votre maison.' },
    { icon: '쾌', title: 'Confort Toute l\'Année', description: 'Profitez d\'une chaleur douce en hiver et d\'un rafraîchissement en été.' },
    { icon: '🌍', title: 'Geste Écologique', description: 'Utilisez une énergie renouvelable et réduisez votre empreinte carbone.' },
];

// On crée un sous-composant pour la carte pour mieux gérer l'effet de survol
const BenefitCard = ({ icon, title, description, delay }) => {
    const cardRef = useRef(null);

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        const handleMouseMove = (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        };

        card.addEventListener('mousemove', handleMouseMove);

        return () => {
            card.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div ref={cardRef} className={styles.benefitCard} data-aos="fade-up" data-aos-delay={delay}>
            <div className={styles.iconWrapper}>{icon}</div>
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
};


const Benefits = () => {
    return (
        <section className={styles.benefits}>
            <div className="container">
                <h2 className={styles.sectionTitle}>Des Avantages Concrets Pour Vous</h2>
                <div className={styles.benefitsGrid}>
                    {benefitsData.map((benefit, i) => (
                        <BenefitCard 
                            key={i} 
                            icon={benefit.icon}
                            title={benefit.title}
                            description={benefit.description}
                            delay={i * 100}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
export default Benefits;