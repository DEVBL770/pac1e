import React, { useState } from 'react';
import styles from './MultiStepForm.module.css';

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    postalCode: '',
    name: '',
    email: '',
    phone: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateStep1 = () => {
    let tempErrors = {};
    if (!formData.postalCode || !/^\d{5}$/.test(formData.postalCode)) {
      tempErrors.postalCode = 'Veuillez entrer un code postal valide (5 chiffres).';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const validateStep2 = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Le nom est requis.';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Veuillez entrer un email valide.';
    }
    if (!formData.phone || !/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/.test(formData.phone)) {
      tempErrors.phone = 'Veuillez entrer un numéro de téléphone valide.';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const nextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Une erreur est survenue lors de l\'envoi.');
      }
      
      setIsSubmitted(true);

    } catch (error) {
      setErrors({ submit: error.message || 'Impossible de soumettre le formulaire. Veuillez réessayer.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className={styles.formContainer}>
        <div className={styles.successMessage}>
          <h3>Merci !</h3>
          <p>Votre demande a bien été prise en compte. Un de nos conseillers vous recontactera très prochainement.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.formContainer}>
      <div className={styles.formHeader}>
        <h3>Testez votre éligibilité en 2 minutes</h3>
      </div>
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className={styles.formStep}>
            <label htmlFor="postalCode">Votre code postal</label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              placeholder="Ex: 75001"
              maxLength="5"
            />
            {errors.postalCode && <p className={styles.error}>{errors.postalCode}</p>}
            <button type="button" onClick={nextStep} className="cta-button">
              Continuer
            </button>
          </div>
        )}

        {step === 2 && (
          <div className={styles.formStep}>
            <label htmlFor="name">Nom complet</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Jean Dupont"/>
            {errors.name && <p className={styles.error}>{errors.name}</p>}

            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="jean.dupont@email.com"/>
            {errors.email && <p className={styles.error}>{errors.email}</p>}
            
            <label htmlFor="phone">Téléphone</label>
            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="06 12 34 56 78"/>
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
                <p><strong>Code Postal :</strong> {formData.postalCode}</p>
                <p><strong>Nom :</strong> {formData.name}</p>
                <p><strong>Email :</strong> {formData.email}</p>
                <p><strong>Téléphone :</strong> {formData.phone}</p>
                {errors.submit && <p className={styles.error}>{errors.submit}</p>}
                <div className={styles.buttonGroup}>
                    <button type="button" onClick={prevStep} className={styles.prevButton}>Modifier</button>
                    <button type="submit" className="cta-button" disabled={isSubmitting}>
                        {isSubmitting ? 'Envoi en cours...' : 'Obtenir mon aide'}
                    </button>
                </div>
            </div>
        )}
      </form>
    </div>
  );
};

export default MultiStepForm;