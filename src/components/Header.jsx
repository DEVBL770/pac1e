import React from 'react';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={`${styles.headerContent} container`}>
        <img 
          src="/logo.png" 
          alt="Logo Global Environnement" 
          className={styles.logo} 
        />
        
        <div className={styles.rightSection}>
          
          {/* L'encart "Contact" est maintenant un seul lien cliquable */}
          <a href="tel:0189213931" className={styles.contactLink}>
            <svg xmlns="http://www.w3.org/2000/svg" className={styles.phoneIcon} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.067a1.5 1.5 0 01-1.11 1.752l-1.072.46a11.135 11.135 0 005.42 5.42l.46-1.072a1.5 1.5 0 011.752-1.11l3.067.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5h-.058a16.5 16.5 0 01-15-15H1.5A1.5 1.5 0 013.5 2H5c.414 0 .75.336.75.75v3.5a.75.75 0 01-1.5 0V4.382c.11.42.272.827.48 1.214l.235.422z" clipRule="evenodd" />
            </svg>
            <div className={styles.contactText}>
              <span className={styles.contactLabel}>Un conseiller vous répond</span>
              <span className={styles.phoneNumber}>01 89 21 39 31</span>
            </div>
          </a>
          
          <a href="#form" className="cta-button">Obtenir mon devis !</a>
        </div>

      </div>
    </header>
  );
};

export default Header;