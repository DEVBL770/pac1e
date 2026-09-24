import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={`${styles.footerContent} container`}>
                <div className={styles.footerColumn}>
                    {/* On utilise l'image du logo comme dans le header */}
                    <img src="/logo1.png" alt="Logo Global Environnement" className={styles.logo} />
                    <p className={styles.description}>
                        Votre expert en solutions de chauffage économiques, écologiques et conformes aux dernières normes environnementales.
                    </p>
                </div>
                <div className={styles.footerColumn}>
                    <h4>Navigation</h4>
                    <ul className={styles.navList}>
                        <li><Link to="/mentions-legales">Mentions Légales</Link></li>
                        <li><Link to="/politique-de-confidentialite">Politique de Confidentialité</Link></li>
                        <li><Link to="/conditions-generales-utilisation">Conditions d'Utilisation</Link></li>
                        <li>
                            <button
                                type="button"
                                className={styles.linkButton}
                                onClick={() => window.dispatchEvent(new Event('ge-open-consent'))}
                            >
                                Gérer mes cookies
                            </button>
                        </li>
                    </ul>
                </div>
                <div className={styles.footerColumn}>
                    <h4>Nous Contacter</h4>
                    <ul className={styles.contactList}>
                        <li className={styles.contactItem}>
                            {/* Icône SVG pour l'adresse */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.1.4-.27.61-.473A10.95 10.95 0 0014.25 16c1.25-1.25 1.75-2.956 1.75-4.5 0-4.006-3.244-7.25-7.25-7.25S3 7.494 3 11.5c0 1.544.5 3.25 1.75 4.5.62.62 1.287 1.16 2.008 1.624a10.95 10.95 0 00.61.473c.07.044.14.086.21.125.072.04.146.078.22.113.065.03.13.057.19.082l.026.012.006.002zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                            <span>112 Avenue de Paris<br/>94300 Vincennes</span>
                        </li>
                        <li className={styles.contactItem}>
                            {/* Icône SVG pour l'email */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" /><path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" /></svg>
                            <span>rg@global-environnement.com</span>
                        </li>
                        <li className={styles.contactItem}>
                            {/* Icône SVG pour le téléphone */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.067a1.5 1.5 0 01-1.11 1.752l-1.072.46a11.135 11.135 0 005.42 5.42l.46-1.072a1.5 1.5 0 011.752-1.11l3.067.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5h-.058a16.5 16.5 0 01-15-15H1.5A1.5 1.5 0 013.5 2H5c.414 0 .75.336.75.75v3.5a.75.75 0 01-1.5 0V4.382c.11.42.272.827.48 1.214l.235.422z" clipRule="evenodd" /></svg>
                            <span>01 89 21 39 31</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={styles.footerBottom}>
                <p>© {new Date().getFullYear()} GLOBAL ENVIRONNEMENT - Tous droits réservés.</p>
            </div>
        </footer>
    );
}
export default Footer;