import React from 'react';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={`${styles.headerContent} container`}>
        <div className={styles.logo}>MaPACbyGE</div>
        <a href="#form" className="cta-button">Obtenir mon offre</a>
      </div>
    </header>
  );
};

export default Header;