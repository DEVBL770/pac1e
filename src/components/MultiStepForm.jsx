import React, { useState } from 'react';
import styles from './MultiStepForm.module.css';

const incomeCeilings = {
  idf: {
    '1': { tresModeste: 23768, modeste: 28933 },
    '2': { tresModeste: 34884, modeste: 42463 },
    '3': { tresModeste: 41893, modeste: 51000 },
    '4': { tresModeste: 48914, modeste: 59549 },
    '5+': { tresModeste: 55961, modeste: 68123 },
  },
  horsIdf: {
    '1': { tresModeste: 17173, modeste: 22015 },
    '2': { tresModeste: 25115, modeste: 32197 },
    '3': { tresModeste: 30206, modeste: 38719 },
    '4': { tresModeste: 35285, modeste: 45234 },
    '5+': { tresModeste: 40388, modeste: 51775 },
  }
};

const isIleDeFrance = (postalCode) => {
  if (!postalCode || postalCode.length < 2) return false;
  const departement = postalCode.substring(0, 2);
  const idfDepartements = ['75', '77', '78', '91', '92', '93', '94', '95'];
  return idfDepartements.includes(departement);
};

const InputWithIcon = ({ icon, ...props }) => (
  <div className={styles.inputWrapper}>
    <span className={styles.icon} style={{ backgroundImage: `url("${icon}")` }} />
    <input className={styles.inputField} {...props} />
  </div>
);

const icons = {
  user: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23888'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E",
  email: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23888'%3E%3Cpath d='M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z'/%3E%3C/svg%3E",
  phone: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23888'%3E%3Cpath d='M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z'/%3E%3C/svg%3E",
  postal: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23888'%3E%3Cpath d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z'/%3E%3C/svg%3E",
};

const labelsMap = {
  postalCode: 'Code Postal',
  propertyStatus: 'Statut',
  propertyType: 'Type de logement',
  heatingType: 'Chauffage actuel',
  householdSize: 'Personnes dans le foyer',
  income: 'Revenu fiscal',
  name: 'Nom',
  email: 'Email',
  phone: 'Téléphone'
};

const MultiStepForm = () => {
  const TOTAL_STEPS = 5;
  const [step, setStep] = useState(1);
  const initialFormData = {
    postalCode: '',
    propertyStatus: '',
    propertyType: '',
    heatingType: '',
    householdSize: '',
    income: '',
    name: '',
    email: '',
    phone: '',
  };
  const [formData, setFormData] = useState(initialFormData);

  const [isDisqualified, setIsDisqualified] = useState(false);
  const [disqualificationMessage, setDisqualificationMessage] = useState('');

  const [locationKey, setLocationKey] = useState('horsIdf'); 
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const checkEligibility = (currentData) => {
    if (currentData.propertyStatus === 'Locataire') {
      setIsDisqualified(true);
      setDisqualificationMessage('Désolé, cette offre est réservée aux propriétaires.');
      return false;
    }
    if (currentData.propertyType === 'Appartement') {
      setIsDisqualified(true);
      setDisqualificationMessage('Désolé, cette offre n\'est pas disponible pour les appartements.');
      return false;
    }
    if (currentData.income.startsWith('Plus de')) {
      setIsDisqualified(true);
      setDisqualificationMessage('Vos revenus dépassent les plafonds d\'éligibilité pour cette offre.');
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };

    if (!checkEligibility(updatedData)) {
      setFormData(updatedData);
      return;
    }

    if (name === 'postalCode' && value.length >= 2) {
      setLocationKey(isIleDeFrance(value) ? 'idf' : 'horsIdf');
    }
    
    if (name === 'householdSize') {
      setFormData(prev => ({ ...prev, income: '', [name]: value }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
  
  const handleReset = () => {
    setFormData(initialFormData);
    setStep(1);
    setIsDisqualified(false);
    setDisqualificationMessage('');
    setErrors({});
  };

  const validateStep = () => {
    let tempErrors = {};
    switch (step) {
      case 1:
        if (!formData.postalCode || !/^\d{5}$/.test(formData.postalCode)) tempErrors.postalCode = 'Code postal invalide.';
        if (!formData.propertyStatus) tempErrors.propertyStatus = 'Champ requis.';
        if (!formData.propertyType) tempErrors.propertyType = 'Champ requis.';
        break;
      case 2:
        if (!formData.heatingType) tempErrors.heatingType = 'Champ requis.';
        if (!formData.householdSize) tempErrors.householdSize = 'Champ requis.';
        break;
      case 3:
        if (!formData.income) tempErrors.income = 'Champ requis.';
        break;
      case 4:
        if (!formData.name.trim()) tempErrors.name = 'Nom requis.';
        if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = 'Email invalide.';
        if (!/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/.test(formData.phone)) tempErrors.phone = 'Téléphone invalide.';
        break;
      default: break;
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const nextStep = () => { if (validateStep()) setStep((prev) => prev + 1); };
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

      // Signal de conversion pour Google Tag Manager : émis une seule fois,
      // uniquement après confirmation du serveur, sans aucune donnée personnelle.
      // La balise "Conversion Google Ads" dans GTM doit être déclenchée par cet événement.
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        'event': 'lead_submitted'
      });

      setIsSubmitted(true);
    } catch (error) {
      setErrors({ submit: 'Une erreur est survenue lors de l\'envoi. Vérifiez votre connexion puis réessayez : votre demande n\'a pas été enregistrée.' });
    } finally { setIsSubmitting(false); }
  };

  if (isSubmitted) {
    return (
      <div className={styles.formContainer}>
        <div className={styles.successMessage} role="status" aria-live="polite">
          <h3>Demande envoyée ✅</h3>
          <p>
            Merci {formData.name.split(' ')[0]} ! Votre demande de devis a bien été enregistrée.
            Un conseiller de <strong>GLOBAL ENVIRONNEMENT</strong> vous recontactera au numéro
            indiqué pour étudier votre projet et vos aides éventuelles.
          </p>
          <p className={styles.successNote}>
            Une question en attendant ? Appelez-nous au{' '}
            <a href="tel:0189213931">01 89 21 39 31</a>.
          </p>
        </div>
      </div>
    );
  }

  if (isDisqualified) {
    return (
      <div className={styles.formContainer}>
        <div className={styles.disqualifiedContainer}>
          <div className={styles.disqualifiedIcon}>✕</div>
          <h3>Vous n'êtes pas éligible</h3>
          <p>{disqualificationMessage}</p>
          <button type="button" onClick={handleReset} className="cta-button">
            Réessayer
          </button>
        </div>
      </div>
    );
  }
  
  const progress = ((step -1) / (TOTAL_STEPS - 1)) * 100;

  return (
    <div className={styles.formContainer}>
      <div className={styles.formHeader}>
        <h3>Estimez vos aides en 2 minutes</h3>
        <div
          className={styles.progressBarContainer}
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-label={`Étape ${step} sur ${TOTAL_STEPS}`}
        >
          <div className={styles.progressBar} style={{ width: `${progress}%` }}></div>
        </div>
        <p className={styles.stepIndicator} aria-hidden="true">Étape {step} / {TOTAL_STEPS}</p>
      </div>
      <form onSubmit={handleSubmit} className={styles.formBody}>
        
        {step === 1 && (
            <div className={styles.formStep}>
                <h4>Votre logement</h4>
                <InputWithIcon icon={icons.postal} type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} placeholder="Code Postal" maxLength="5" inputMode="numeric" autoComplete="postal-code" aria-label="Code postal" aria-invalid={!!errors.postalCode} />
                {errors.postalCode && <p className={styles.error} role="alert">{errors.postalCode}</p>}
                
                <select name="propertyStatus" value={formData.propertyStatus} onChange={handleChange} aria-label="Vous êtes propriétaire ou locataire" aria-invalid={!!errors.propertyStatus}>
                    <option value="">Vous êtes...</option>
                    <option value="Proprietaire">Propriétaire</option>
                    <option value="Locataire">Locataire</option>
                </select>
                {errors.propertyStatus && <p className={styles.error} role="alert">{errors.propertyStatus}</p>}

                <select name="propertyType" value={formData.propertyType} onChange={handleChange} aria-label="Type de logement" aria-invalid={!!errors.propertyType}>
                    <option value="">Votre logement est...</option>
                    <option value="Maison">Une maison</option>
                    <option value="Appartement">Un appartement</option>
                </select>
                {errors.propertyType && <p className={styles.error} role="alert">{errors.propertyType}</p>}
            </div>
        )}

        {step === 2 && (
             <div className={styles.formStep}>
                <h4>Votre situation énergétique</h4>
                <select name="heatingType" value={formData.heatingType} onChange={handleChange} aria-label="Chauffage actuel" aria-invalid={!!errors.heatingType}>
                    <option value="">Votre chauffage actuel...</option>
                    <option value="Fioul">Fioul</option>
                    <option value="Gaz">Gaz</option>
                    <option value="Electrique">Électrique</option>
                    <option value="Bois">Bois</option>
                    <option value="Autre">Autre</option>
                </select>
                {errors.heatingType && <p className={styles.error} role="alert">{errors.heatingType}</p>}

                <select name="householdSize" value={formData.householdSize} onChange={handleChange} aria-label="Nombre de personnes dans le foyer" aria-invalid={!!errors.householdSize}>
                    <option value="">Personnes dans le foyer...</option>
                    <option value="1">1 personne</option>
                    <option value="2">2 personnes</option>
                    <option value="3">3 personnes</option>
                    <option value="4">4 personnes</option>
                    <option value="5+">5 personnes ou plus</option>
                </select>
                {errors.householdSize && <p className={styles.error} role="alert">{errors.householdSize}</p>}
            </div>
        )}
        
        {step === 3 && (
            <div className={styles.formStep}>
                <h4>Vos revenus</h4>
                <p className={styles.infoText}>Cette information sert à vérifier votre éligibilité aux aides. Elle restera confidentielle.</p>
                <select 
                  name="income" 
                  value={formData.income} 
                  onChange={handleChange}
                  disabled={!formData.householdSize}
                  aria-label="Revenu fiscal de référence"
                  aria-invalid={!!errors.income}
                >
                    <option value="">Revenu fiscal de référence...</option>
                    
                    {formData.householdSize && (
                      <>
                        <option value={`Moins de ${incomeCeilings[locationKey][formData.householdSize].tresModeste} €`}>
                          Moins de {incomeCeilings[locationKey][formData.householdSize].tresModeste.toLocaleString('fr-FR')} €
                        </option>
                        <option value={`Entre ${incomeCeilings[locationKey][formData.householdSize].tresModeste} € et ${incomeCeilings[locationKey][formData.householdSize].modeste} €`}>
                          Entre {incomeCeilings[locationKey][formData.householdSize].tresModeste.toLocaleString('fr-FR')} € et {incomeCeilings[locationKey][formData.householdSize].modeste.toLocaleString('fr-FR')} €
                        </option>
                        <option value={`Plus de ${incomeCeilings[locationKey][formData.householdSize].modeste} €`}>
                          Plus de {incomeCeilings[locationKey][formData.householdSize].modeste.toLocaleString('fr-FR')} €
                        </option>
                      </>
                    )}
                </select>
                {!formData.householdSize && <p className={styles.infoText}>Veuillez d'abord sélectionner le nombre de personnes à l'étape précédente.</p>}
                {errors.income && <p className={styles.error} role="alert">{errors.income}</p>}
            </div>
        )}

        {step === 4 && (
            <div className={styles.formStep}>
                <h4>Vos coordonnées</h4>
                <InputWithIcon icon={icons.user} type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Nom complet" autoComplete="name" aria-label="Nom complet" aria-invalid={!!errors.name}/>
                {errors.name && <p className={styles.error} role="alert">{errors.name}</p>}
                <InputWithIcon icon={icons.email} type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" autoComplete="email" aria-label="Adresse e-mail" aria-invalid={!!errors.email}/>
                {errors.email && <p className={styles.error} role="alert">{errors.email}</p>}
                <InputWithIcon icon={icons.phone} type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Téléphone" autoComplete="tel" inputMode="tel" aria-label="Numéro de téléphone" aria-invalid={!!errors.phone}/>
                {errors.phone && <p className={styles.error} role="alert">{errors.phone}</p>}
            </div>
        )}
        
        {step === 5 && (
            <div className={styles.formStep}>
                <h4>Récapitulatif</h4>
                <ul className={styles.summaryList}>
                  {Object.keys(labelsMap).map(key => {
                    const value = formData[key];
                    return value && (
                      <li key={key}>
                        <strong>{labelsMap[key]}:</strong> {value}
                      </li>
                    );
                  })}
                </ul>
                {errors.submit && <p className={styles.error} role="alert">{errors.submit}</p>}
            </div>
        )}

        <div className={styles.buttonGroup}>
            {step > 1 && <button type="button" onClick={prevStep} className={styles.prevButton}>Retour</button>}
            {step < TOTAL_STEPS && <button type="button" onClick={nextStep} className="cta-button">Continuer</button>}
            {step === TOTAL_STEPS && <button type="submit" className="cta-button" disabled={isSubmitting}>{isSubmitting ? 'Envoi en cours...' : 'Envoyer ma demande de devis'}</button>}
        </div>

      </form>
    </div>
  );
};
export default MultiStepForm;