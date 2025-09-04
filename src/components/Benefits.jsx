import React from 'react';
import styles from './Benefits.module.css';

const Benefits = () => {
    const benefits = [
        { title: 'Économies Majeures', description: 'Réduisez jusqu\'à 70% sur vos factures de chauffage annuelles.' },
        { title: 'Valorisation Immobilière', description: 'Augmentez la classe énergétique (DPE) et la valeur de votre maison.' },
        { title: 'Confort Toute l\'Année', description: 'Profitez d\'une chaleur douce en hiver et d\'un rafraîchissement en été.' },
        { title: 'Geste Écologique', description: 'Utilisez une énergie renouvelable et réduisez votre empreinte carbone.' },
    ];
    return (
        <section className={styles.benefits}>
            <div className="container">
                <h2 className={styles.sectionTitle}>Vos Avantages</h2>
                <div className={styles.benefitsGrid}>
                    {benefits.map((benefit, i) => (
                         <div key={i} className={styles.benefitCard} data-aos="fade-up" data-aos-delay={i * 100}>
                            <h3>{benefit.title}</h3>
                            <p>{benefit.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
export default Benefits;