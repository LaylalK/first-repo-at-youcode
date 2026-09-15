/**
 * ─────────────────────────────────────────────────────────────
 * JOUR 04 · EXERCICE 18 · NIVEAU 3 : DÉFI (AVANCÉS)
 * COMPTEUR D'OCCURRENCES DE LETTRE
 * ─────────────────────────────────────────────────────────────
 *
 * 🎯 MISSION
 * Créez une fonction qui compte combien de fois la lettre "e" (minuscule ou majuscule) apparaît dans un long paragraphe.
 *
 * 📖 Consigne détaillée : ../03-exercices.md#exercice-18
 * ▶️ Commande : node day04/exercices/exercice-18.js
 */
'use strict';

// 1. Identifie les données nécessaires.
// 2. Écris ta solution sous cette ligne.
// TODO: écris ta solution ici.
function compterLettreE(texte) {
    let compteur = 0;
    const texteMinuscule = texte.toLowerCase();

  for (let i = 0; i < texteMinuscule.length; i++) {
    if (texteMinuscule[i] === 'e') {
      compteur++;
    }
  }

  return compteur;
}
const paragraphe = "j'ai étudié le code de javascript";
console.log(compterLettreE(paragraphe));