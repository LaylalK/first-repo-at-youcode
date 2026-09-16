/**
 * ─────────────────────────────────────────────────────────────
 * JOUR 05 · EXERCICE 15 · NIVEAU 3 : DÉFI (AVANCÉS)
 * FUSION TRIÉE
 * ─────────────────────────────────────────────────────────────
 *
 * 🎯 MISSION
 * Vous avez deux tableaux DÉJÀ triés : [1, 3, 5] et [2, 4, 6]. Écrivez un algorithme pour les fusionner en un seul tableau trié [1, 2, 3, 4, 5, 6] (sans utiliser .sort()).
 *
 * 📖 Consigne détaillée : ../03-exercices.md#exercice-15
 * ▶️ Commande : node day05/exercices/exercice-15.js
 */
'use strict';

// 1. Identifie les données nécessaires.
// 2. Écris ta solution sous cette ligne.
// TODO: écris ta solution ici.
let tab1 =[1, 3, 5];
let tab2 =[2, 4, 6];
function fusionnerTries(t1, t2){
    let resultat = [];
    let i = 0;
    let j = 0;
    while (i <t1.length && j <t2.length){
  if (t1[i] < t2[j]) {
     resultat.push(t1[i]);
 i++;
  } else {
     resultat.push(t2[j]);
 j++;
        }
    }
    while (i < t1.length) {
        resultat.push(t1[i]);
        i++;
    }
    while (j < t2.length) {
 resultat.push(t2[j]);
 j++;
    }

    return resultat;
}

console.log(fusionnerTries(tab1, tab2));
    