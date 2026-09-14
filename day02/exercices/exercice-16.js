/**
 * ─────────────────────────────────────────────────────────────
 * JOUR 02 · EXERCICE 16 · NIVEAU 3 : DÉFI (AVANCÉS)
 * SAPIN CENTRÉ
 * ─────────────────────────────────────────────────────────────
 *
 * 🎯 MISSION
 * Allez plus loin, dessinez une pyramide centrée de 5 lignes :
 *
 *     *
 *    *
 *   *
 *  *
 * -
 *
 * 📖 Consigne détaillée : ../03-exercices.md#exercice-16
 * ▶️ Commande : node day02/exercices/exercice-16.js
 */
'use strict';

// 1. Identifie les données nécessaires.
// 2. Écris ta solution sous cette ligne.
// TODO: écris ta solution ici.
const hauteur = 5;

for (let i = 1; i <= hauteur; i++){  
const espaces = " ".repeat(hauteur - i);
 const etoiles = "*".repeat(2 * i - 1);
    console.log(espaces + etoiles);}
