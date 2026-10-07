// =============================================================================
// Web App Apps Script — relais formulaire site -> Google Sheets
// v2 : routage par marqueur sans casser le flux historique.
//   - data.source === 'PAC_2026_ADS'  -> ecriture UNIQUEMENT dans ADS
//   - sinon                           -> Feuille 1 PUIS copie ADS (comportement
//                                        actuel conserve integralement)
// Journaux = durees uniquement, sans nom ni telephone. Aucun timeout ajoute.
// Aucune feuille videe ni renommee, aucune ligne existante touchee.
// =============================================================================

var ADS_TAB_GID = 1109975430;
var ADS_MARKER = 'PAC_2026_ADS';
var LEGACY_TAB_NAME = 'Feuille 1';
var SCRIPT_VERSION = 'ads-routing-v2';

// Ordre EXACT des six colonnes de l'onglet ADS (valide par l'exploitant) :
// timestamp, logement, chauffage, nom, telephone('texte), code postal('texte)
function buildAdsRow_(data, timestamp) {
  return [
    timestamp,
    data.propertyType || '',
    data.heatingType || '',
    data.name || '',
    data.phone ? "'" + data.phone : '',
    data.postalCode ? "'" + data.postalCode : ''
  ];
}

// Ordre historique "Feuille 1" (longueur complete, champs inconnus = vides).
function buildLegacyRow_(data, timestamp) {
  return [
    timestamp,
    data.postalCode || '',
    data.propertyStatus || '',
    data.propertyType || '',
    data.heatingType || '',
    data.householdSize || '',
    data.income || '',
    data.name || '',
    data.email || '',
    data.phone || '',
  ];
}

function json_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function findTabByGid_(spreadsheet, gid) {
  var sheets = spreadsheet.getSheets();
  for (var i = 0; i < sheets.length; i++) {
    if (sheets[i].getSheetId() === gid) return sheets[i];
  }
  return null;
}

function doPost(e) {
  var t0 = Date.now();
  try {
    var data = JSON.parse(e.postData.contents);
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var timestamp = new Date();

    if (data && data.source === ADS_MARKER) {
      var adsTab = findTabByGid_(spreadsheet, ADS_TAB_GID);
      if (!adsTab) throw new Error('Onglet ADS introuvable');
      // --- Flux ADS uniquement (nouveau formulaire PAC) ---
      var tWrite0 = Date.now();
      adsTab.appendRow(buildAdsRow_(data, timestamp)); // aucun appendRow dans Feuille 1
      var writeMs = Date.now() - tWrite0;

      console.info('lead_write', {
        target: 'ADS-only',
        writeMs: writeMs,
        totalMs: Date.now() - t0,
        version: SCRIPT_VERSION
      });
      return json_({
        status: 'success',
        target: 'ADS',
        timings: { writeMs: writeMs, totalMs: Date.now() - t0 }
      });
    }

    // --- Flux historique CONSERVE INTEGRALEMENT : Feuille 1 + copie ADS ---
    var legacyTab = spreadsheet.getSheetByName(LEGACY_TAB_NAME);
    if (!legacyTab) throw new Error('Onglet "' + LEGACY_TAB_NAME + '" introuvable.');

    var tWrite1 = Date.now();
    legacyTab.appendRow(buildLegacyRow_(data, timestamp));
    var feuille1WriteMs = Date.now() - tWrite1;

    // Comme dans le script historique, un echec de la copie ADS ne fait pas
    // echouer l'envoi deja enregistre dans Feuille 1.
    var adsCopyMs = null;
    try {
      var legacyAdsTab = findTabByGid_(spreadsheet, ADS_TAB_GID);
      if (!legacyAdsTab) throw new Error('Onglet ADS introuvable');
      var tWrite2 = Date.now();
      legacyAdsTab.appendRow(buildAdsRow_(data, timestamp));
      adsCopyMs = Date.now() - tWrite2;
    } catch (adsError) {
      console.error('lead_ads_copy_failed', {
        errorName: adsError.name,
        totalMs: Date.now() - t0,
        version: SCRIPT_VERSION
      });
    }

    console.info('lead_write', {
      target: LEGACY_TAB_NAME + '+ADS-copy',
      feuille1WriteMs: feuille1WriteMs,
      adsCopyMs: adsCopyMs,
      totalMs: Date.now() - t0,
      version: SCRIPT_VERSION
    });
    return json_({
      status: 'success',
      timings: {
        feuille1WriteMs: feuille1WriteMs,
        adsCopyMs: adsCopyMs,
        totalMs: Date.now() - t0
      }
    });

  } catch (error) {
    // Jamais { status: 'success' } en cas d'echec : le relais Vercel
    // renvoie 502, le formulaire n'affiche pas de fausse confirmation.
    console.error('lead_write_failed', {
      errorName: error.name,
      totalMs: Date.now() - t0,
      version: SCRIPT_VERSION
    });
    return json_({ status: 'error', message: 'Ecriture indisponible.' });
  }
}
