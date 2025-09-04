import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={`${styles.footerContent} container`}>
                <div className={styles.footerColumn}>
                    <h3 className={styles.logo}>MaPACbyGE</h3>
                    <p>Votre expert en solutions de chauffage économiques et écologiques.</p>
                </div>
                <div className={styles.footerColumn}>
                    <h4>Liens Utiles</h4>
                    <ul>
                        <li><Link to="/mentions-legales">Mentions Légales</Link></li>
                        <li><Link to="/politique-de-confidentialite">Politique de Confidentialité</Link></li>
                        <li><Link to="/conditions-generales-utilisation">CGU</Link></li>
                    </ul>
                </div>
                <div className={styles.footerColumn}>
                    <h4>Contact</h4>
                    <p>123 Rue de l'Exemple<br/>75001 Paris<br/>contact@mapacbyge.fr</p>
                </div>
            </div>
            <div className={styles.footerBottom}>
                <p>© 2025 MaPACbyGE - Tous droits réservés.</p>
            </div>
        </footer>
    );
}
export default Footer;