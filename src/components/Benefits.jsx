import React, { useEffect, useRef } from 'react';
import styles from './Benefits.module.css';

// On ajoute l'offre à 1€ en premier et on lui donne une propriété `highlight: true`
const benefitsData = [
    { 
        icon: '💶', 
        title: 'Votre PAC pour 1€ Seulement !', 
        description: 'Grâce aux aides de l\'État (MaPrimeRénov\', CEE), financez l\'installation de votre pompe à chaleur avec un reste à charge de 1€ symbolique sous conditions de revenus.',
        highlight: true 
    },
    { 
        icon: '💰', 
        title: 'Des Factures Allégées', 
        description: 'Une pompe à chaleur bien dimensionnée consomme moins qu\'un système au fioul ou électrique. L\'économie réelle dépend de votre logement.' 
    },
    { 
        icon: '🏠', 
        title: 'Valorisation Immobilière', 
        description: 'Une rénovation énergétique peut améliorer la classe énergétique (DPE) et la valeur de votre maison.' 
    },
    { 
        icon: '❄️', 
        title: 'Confort Toute l\'Année', 
        description: 'Profitez d\'une chaleur douce en hiver et, selon le modèle, d\'un rafraîchissement en été.' 
    },
    { 
        icon: '🌍', 
        title: 'Geste Écologique', 
        description: 'Utilisez une énergie renouvelable et réduisez votre empreinte carbone.' 
    },
];

// On ajoute la prop `highlight` au composant BenefitCard
const BenefitCard = ({ icon, title, description, delay, highlight }) => {
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
        <div 
            ref={cardRef} 
            // Si highlight est true, on ajoute une classe CSS spécifique pour la faire ressortir
            className={`${styles.benefitCard} ${highlight ? styles.highlightedCard : ''}`} 
            data-aos="fade-up" 
            data-aos-delay={delay}
        >
            {/* Badge promotionnel qui ne s'affiche que sur la carte à 1€ */}
            {highlight && <span className={styles.badgePromo}>🔥 Offre Spéciale</span>}
            
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
                {/* Ajout d'un petit sous-titre accrocheur */}
                <p className={styles.sectionSubtitle} data-aos="fade-up">
                    Découvrez pourquoi passer à la pompe à chaleur est le meilleur choix aujourd'hui.
                </p>
                
                <div className={styles.benefitsGrid}>
                    {benefitsData.map((benefit, i) => (
                        <BenefitCard 
                            key={i} 
                            icon={benefit.icon}
                            title={benefit.title}
                            description={benefit.description}
                            highlight={benefit.highlight} // On passe l'information de mise en avant
                            delay={i * 100}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Benefits;