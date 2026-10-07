import React from 'react';
import styles from './TrustBar.module.css';

// Les logos officiels (Anah, MaPrimeRénov', CEE) ont été retirés du site.
// Les dispositifs restent mentionnés en texte, à titre informatif,
// sans suggestion d'affiliation ou d'approbation officielle.

const TrustBar = () => {
  return (
    <div className={styles.trustBar}>
      <div className={`${styles.content} container`}>
        <p className={styles.text}>
          Nous vous aidons à étudier les dispositifs d'aides mobilisables pour votre projet :
          MaPrimeRénov', certificats d'économies d'énergie (CEE) et, selon votre situation, aides locales.
        </p>
      </div>
    </div>
  );
};

export default TrustBar;
