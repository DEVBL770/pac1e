import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './ConsentBanner.module.css';

const STORAGE_KEY = 'ge-consent';
const SIX_MONTHS_MS = 180 * 24 * 3600 * 1000;

const readValidConsent = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    if (saved && saved.t && Date.now() - saved.t < SIX_MONTHS_MS) return saved;
    if (saved) localStorage.removeItem(STORAGE_KEY);
  } catch (e) {}
  return null;
};

const applyConsent = (prefs) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...prefs, t: Date.now() }));
  } catch (e) {}
  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      ad_storage: prefs.ads ? 'granted' : 'denied',
      ad_user_data: prefs.ads ? 'granted' : 'denied',
      ad_personalization: prefs.ads ? 'granted' : 'denied',
      analytics_storage: prefs.analytics ? 'granted' : 'denied',
    });
  }
};

const ConsentBanner = () => {
  const [visible, setVisible] = useState(false);
  const [customizing, setCustomizing] = useState(false);
  const [prefs, setPrefs] = useState({ ads: false, analytics: false });

  useEffect(() => {
    const open = () => setVisible(true);
    window.addEventListener('ge-open-consent', open);
    const saved = readValidConsent();
    if (saved) {
      setPrefs(saved);
    } else {
      setVisible(true);
    }
    return () => window.removeEventListener('ge-open-consent', open);
  }, []);

  if (!visible) return null;

  const choose = (choice) => {
    applyConsent(choice);
    setPrefs(choice);
    setVisible(false);
  };

  return (
    <div className={styles.banner} role="dialog" aria-modal="false" aria-label="Bandeau de consentement aux cookies">
      <div className={styles.content}>
        <p className={styles.text}>
          Nous utilisons des cookies pour mesurer l'audience et le suivi publicitaire.
          Vous pouvez accepter, refuser ou personnaliser votre choix. Consultez notre{' '}
          <Link to="/politique-de-confidentialite">politique de confidentialité</Link>.
        </p>

        {customizing && (
          <div className={styles.options}>
            <label className={styles.option}>
              <input
                type="checkbox"
                checked={prefs.analytics}
                onChange={(e) => setPrefs((p) => ({ ...p, analytics: e.target.checked }))}
              />
              Mesure d'audience
            </label>
            <label className={styles.option}>
              <input
                type="checkbox"
                checked={prefs.ads}
                onChange={(e) => setPrefs((p) => ({ ...p, ads: e.target.checked }))}
              />
              Publicité
            </label>
          </div>
        )}

        <div className={styles.actions}>
          <button type="button" className={styles.btnSecondary} onClick={() => choose({ ads: false, analytics: false })}>
            Refuser
          </button>
          {customizing ? (
            <button type="button" className={styles.btnPrimary} onClick={() => choose(prefs)}>
              Enregistrer mes choix
            </button>
          ) : (
            <button type="button" className={styles.btnSecondary} onClick={() => setCustomizing(true)}>
              Personnaliser
            </button>
          )}
          <button type="button" className={styles.btnPrimary} onClick={() => choose({ ads: true, analytics: true })}>
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsentBanner;
