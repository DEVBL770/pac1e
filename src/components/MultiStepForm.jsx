import React, { useRef, useState } from 'react';
import styles from './MultiStepForm.module.css';

const initialFormData = {
  propertyType: '',
  heatingType: '',
  name: '',
  phone: '',
  postalCode: '',
};

const propertyTypes = ['Maison', 'Appartement'];
const heatingTypes = ['Fioul', 'Gaz', 'Autre'];

const MultiStepForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTakingLong, setIsTakingLong] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const submittingRef = useRef(false);
  const propertyTypeRef = useRef(null);
  const heatingTypeRef = useRef(null);
  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const postalCodeRef = useRef(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const nextValue = name === 'postalCode' ? value.replace(/\D/g, '').slice(0, 5) : value;
    setFormData((currentData) => ({ ...currentData, [name]: nextValue }));
    setErrors((currentErrors) => {
      const nextErrors = { ...currentErrors };
      delete nextErrors[name];
      delete nextErrors.submit;
      return nextErrors;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = {};
    if (!formData.propertyType) nextErrors.propertyType = 'Choisissez votre type de logement.';
    if (!formData.heatingType) nextErrors.heatingType = 'Choisissez votre chauffage actuel.';
    if (!formData.name.trim()) nextErrors.name = 'Indiquez votre nom.';
    if (!/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/.test(formData.phone)) {
      nextErrors.phone = 'Numéro de téléphone invalide.';
    }
    if (!/^\d{5}$/.test(formData.postalCode)) {
      nextErrors.postalCode = 'Code postal à 5 chiffres.';
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const firstInvalidField = Object.keys(nextErrors)[0];
      const fieldRefs = {
        propertyType: propertyTypeRef,
        heatingType: heatingTypeRef,
        name: nameRef,
        phone: phoneRef,
        postalCode: postalCodeRef,
      };
      fieldRefs[firstInvalidField].current?.focus();
      return;
    }

    // Garde synchrone : un double clic dans le meme cycle ne doit pas re-soumettre.
    if (submittingRef.current) return;
    submittingRef.current = true;
    setIsSubmitting(true);
    setIsTakingLong(false);
    const slowNoticeTimeout = window.setTimeout(() => setIsTakingLong(true), 8000);

    try {
      // Ces clés et leur ordre sont identiques à l'ancien formulaire pour conserver les colonnes Sheets ; les questions supprimées sont envoyées vides.
      const payload = {
        postalCode: formData.postalCode,
        propertyStatus: '',
        propertyType: formData.propertyType,
        heatingType: formData.heatingType,
        householdSize: '',
        income: '',
        name: formData.name.trim(),
        email: '',
        phone: formData.phone.trim(),
      };
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error('Erreur serveur.');

      // Signal de conversion pour Google Tag Manager : émis une seule fois,
      // uniquement après confirmation du serveur, sans aucune donnée personnelle.
      // La balise "Conversion Google Ads" dans GTM doit être déclenchée par cet événement.
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        'event': 'lead_submitted'
      });

      setIsSubmitted(true);
    } catch (error) {
      submittingRef.current = false; // autorise une nouvelle tentative apres echec
      setErrors({
        submit: "Nous n'avons pas pu confirmer l'enregistrement. Votre demande a peut-être été reçue : ne la renvoyez pas immédiatement. Appelez-nous au 01 89 21 39 31 pour vérifier.",
      });
    } finally {
      window.clearTimeout(slowNoticeTimeout);
      setIsTakingLong(false);
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className={styles.formContainer}>
        <div className={styles.successMessage} role="status" aria-live="polite">
          <h3>Demande envoyée</h3>
          <p>
            Merci {formData.name.trim().split(/\s+/)[0]} ! Votre demande d'étude a bien été enregistrée.
            Un conseiller de <strong>GLOBAL ENVIRONNEMENT</strong> vous recontactera au numéro
            indiqué (sous 5 jours ouvrés au maximum) pour étudier votre projet et vos aides
            éventuelles.
          </p>
          <p className={styles.successNote}>
            Une question en attendant ? Appelez-nous au{' '}
            <a href="tel:0189213931">01 89 21 39 31</a>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.formContainer}>
      <div className={styles.formHeader}>
        <h3>Demandez votre étude d'aides</h3>
        <p>5 informations, puis un conseiller vous rappelle pour étudier votre projet.</p>
      </div>
      <form
        noValidate
        onSubmit={handleSubmit}
        className={styles.formBody}
        data-gtm-form-interact-ignore="true"
        data-gtm-form-submit-ignore="true"
      >
        <fieldset className={styles.choiceGroup}>
          <legend>Votre logement <span aria-hidden="true">*</span></legend>
          <div className={`${styles.choiceGrid} ${styles.choiceGrid2}`}>
            {propertyTypes.map((propertyType, index) => (
              <label
                key={propertyType}
                className={`${styles.choiceLabel} ${formData.propertyType === propertyType ? styles.selected : ''}`}
              >
                <input
                  ref={index === 0 ? propertyTypeRef : undefined}
                  className={styles.radioInput}
                  type="radio"
                  name="propertyType"
                  value={propertyType}
                  checked={formData.propertyType === propertyType}
                  onChange={handleChange}
                  required
                  aria-invalid={Boolean(errors.propertyType)}
                  aria-describedby={errors.propertyType ? 'propertyType-error' : undefined}
                />
                <span className={styles.choiceText}>{propertyType}</span>
              </label>
            ))}
          </div>
          {errors.propertyType && <p id="propertyType-error" className={styles.error} role="alert">{errors.propertyType}</p>}
        </fieldset>

        <fieldset className={styles.choiceGroup}>
          <legend>Chauffage actuel <span aria-hidden="true">*</span></legend>
          <div className={styles.choiceGrid}>
            {heatingTypes.map((heatingType, index) => (
              <label
                key={heatingType}
                className={`${styles.choiceLabel} ${formData.heatingType === heatingType ? styles.selected : ''}`}
              >
                <input
                  ref={index === 0 ? heatingTypeRef : undefined}
                  className={styles.radioInput}
                  type="radio"
                  name="heatingType"
                  value={heatingType}
                  checked={formData.heatingType === heatingType}
                  onChange={handleChange}
                  required
                  aria-invalid={Boolean(errors.heatingType)}
                  aria-describedby={errors.heatingType ? 'heatingType-error' : undefined}
                />
                <span className={styles.choiceText}>{heatingType}</span>
              </label>
            ))}
          </div>
          {errors.heatingType && <p id="heatingType-error" className={styles.error} role="alert">{errors.heatingType}</p>}
        </fieldset>

        <div className={styles.field}>
          <label htmlFor="lead-name">Nom <span aria-hidden="true">*</span></label>
          <input
            ref={nameRef}
            id="lead-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Votre nom"
            value={formData.name}
            onChange={handleChange}
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && <p id="name-error" className={styles.error} role="alert">{errors.name}</p>}
        </div>

        <div className={styles.contactGrid}>
          <div className={styles.field}>
            <label htmlFor="lead-phone">Téléphone <span aria-hidden="true">*</span></label>
            <input
              ref={phoneRef}
              id="lead-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="06 12 34 56 78"
              value={formData.phone}
              onChange={handleChange}
              required
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
            />
            {errors.phone && <p id="phone-error" className={styles.error} role="alert">{errors.phone}</p>}
          </div>
          <div className={styles.field}>
            <label htmlFor="lead-postal">Code postal <span aria-hidden="true">*</span></label>
            <input
              ref={postalCodeRef}
              id="lead-postal"
              name="postalCode"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={5}
              autoComplete="postal-code"
              placeholder="94300"
              value={formData.postalCode}
              onChange={handleChange}
              required
              aria-invalid={Boolean(errors.postalCode)}
              aria-describedby={errors.postalCode ? 'postalCode-error' : undefined}
            />
            {errors.postalCode && <p id="postalCode-error" className={styles.error} role="alert">{errors.postalCode}</p>}
          </div>
        </div>

        {errors.submit && <p className={`${styles.error} ${styles.submitError}`} role="alert">{errors.submit}</p>}
        {isTakingLong && <p className={styles.legalNotice} role="status">La confirmation prend plus de temps que prévu. Veuillez patienter sans renvoyer la demande.</p>}
        <button
          type="submit"
          className={`cta-button ${styles.submitButton}`}
          disabled={isSubmitting}
          aria-busy={isSubmitting}
        >
          {isSubmitting ? 'Envoi en cours…' : "Demander mon étude d'aides"}
        </button>
        <p className={styles.legalNotice}>
          En envoyant cette demande, vous demandez à être recontacté(e) par GLOBAL ENVIRONNEMENT <strong>uniquement au sujet de votre
          projet</strong> (pompe à chaleur et/ou chauffe-eau thermodynamique), dans un
          délai maximum de 5 jours ouvrés. Vos données ne sont pas cédées à des
          partenaires pour d'autres sollicitations. Consultez notre{' '}
          <a href="/politique-de-confidentialite">politique de confidentialité</a>.
        </p>
      </form>
    </div>
  );
};

export default MultiStepForm;
