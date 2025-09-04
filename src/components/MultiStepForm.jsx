import React, { useState } from 'react';
import styles from './MultiStepForm.module.css';

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ postalCode: '', name: '', email: '', phone: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateStep1 = () => {
    if (!formData.postalCode || !/^\d{5}$/.test(formData.postalCode)) {
      setErrors({ postalCode: 'Code postal invalide (5 chiffres).' }); return false;
    } return true;
  };

  const validateStep2 = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Le nom est requis.';
    if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = 'Email invalide.';
    if (!/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/.test(formData.phone)) tempErrors.phone = 'Téléphone invalide.';
    setErrors(tempErrors); return Object.keys(tempErrors).length === 0;
  };

  const nextStep = () => {
    setErrors({});
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2 && validateStep2()) setStep(3);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/send', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Erreur serveur.');
      setIsSubmitted(true);
    } catch (error) {
      setErrors({ submit: 'Erreur lors de l\'envoi. Veuillez réessayer.' });
    } finally { setIsSubmitting(false); }
  };

  if (isSubmitted) {
    return (
      <div className={styles.formContainer}>
        <div className={styles.successMessage}>
          <h3>Merci !</h3>
          <p>Votre demande a été envoyée. Un conseiller vous recontactera bientôt.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.formContainer}>
      <div className={styles.formHeader}><h3>Testez votre éligibilité</h3></div>
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className={styles.formStep}>
            <label htmlFor="postalCode">Votre code postal</label>
            <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} placeholder="Ex: 75001" maxLength="5"/>
            {errors.postalCode && <p className={styles.error}>{errors.postalCode}</p>}
            <button type="button" onClick={nextStep} className="cta-button">Continuer</button>
          </div>
        )}
        {step === 2 && (
          <div className={styles.formStep}>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Nom complet"/>
            {errors.name && <p className={styles.error}>{errors.name}</p>}
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email"/>
            {errors.email && <p className={styles.error}>{errors.email}</p>}
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Téléphone"/>
            {errors.phone && <p className={styles.error}>{errors.phone}</p>}
            <div className={styles.buttonGroup}>
              <button type="button" onClick={prevStep} className={styles.prevButton}>Retour</button>
              <button type="button" onClick={nextStep} className="cta-button">Valider</button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className={styles.formStep}>
            <h4>Confirmez vos informations :</h4>
            <ul className={styles.summaryList}>
                <li><strong>Code Postal :</strong> {formData.postalCode}</li>
                <li><strong>Nom :</strong> {formData.name}</li>
                <li><strong>Email :</strong> {formData.email}</li>
                <li><strong>Téléphone :</strong> {formData.phone}</li>
            </ul>
            {errors.submit && <p className={styles.error}>{errors.submit}</p>}
            <div className={styles.buttonGroup}>
              <button type="button" onClick={prevStep} className={styles.prevButton}>Modifier</button>
              <button type="submit" className="cta-button" disabled={isSubmitting}>{isSubmitting ? 'Envoi...' : 'Obtenir mon aide'}</button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};
export default MultiStepForm;