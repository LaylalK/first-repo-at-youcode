const { apprenants } = require("./data");
function normaliserNom(nom) {
    if (typeof nom !== "string") {
    return "";
    }
    return nom.trim().toLowerCase();
}
function estNomValide(nom) {
    return typeof nom === "string" && nom.trim() !== "";
}
function estIdValide(id) {
    return Number.isInteger(id) && id > 0;
}
function validerResultat(resultat) {
    if (!resultat) {
        return { valide: false, message: "Résultat invalide." };
    }
    if (resultat.jour < 1 || resultat.jour > 7) {
        return { valide: false, message: "Le jour doit être compris entre 1 et 7." };
    }
    if (resultat.exercicesTermines < 0) {
        return { valide: false, message: "Les exercices doivent être positifs." };
    }
    if (resultat.totalExercices <= 0) {
        return { valide: false, message: "Le total doit être supérieur à 0." };
    }
    if (resultat.exercicesTermines > resultat.totalExercices) {
        return { valide: false, message: "Exercices terminés dépassent le total." };
    }
    if (typeof resultat.challengeTermine !== "boolean") {
        return { valide: false, message: "Challenge doit être vrai ou faux." };
    }
    return { valide: true };
}
function ajouterApprenant(tableau, apprenant) {
    if (!apprenant || !estIdValide(apprenant.id)) {
        return { ok: false, message: "ID invalide." };
    }
    if (!estNomValide(apprenant.nomComplet)) {
        return { ok: false, message: "Nom obligatoire." };
    }
    for (let i = 0; i < tableau.length; i++) {
        if (tableau[i].id === apprenant.id) {
            return { ok: false, message: "ID existe déjà." };
        }
    }
    const nouvelApprenant = {
        id: apprenant.id,
        nomComplet: apprenant.nomComplet.trim(),
        ville: apprenant.ville || "",
        resultats: []
    };
    tableau.push(nouvelApprenant);
    return { ok: true, apprenant: nouvelApprenant };
}
function rechercherApprenantParId(tableau, id) {
    for (let i = 0; i < tableau.length; i++) {
        if (tableau[i].id === id) {
         return tableau[i];
        }
    }
    return null;
}
function rechercherApprenantParNom(tableau, nom) {
    const cible = normaliserNom(nom);
    if (!cible) return [];
    const resultats = [];
    for (let i = 0; i < tableau.length; i++) {
        const nomApprenant = normaliserNom(tableau[i].nomComplet);
        if (nomApprenant.includes(cible)) {
         resultats.push(tableau[i]);
        }
    }
    return resultats;
}
function enregistrerResultat(tableau, id, resultat) {
    const apprenant = rechercherApprenantParId(tableau, id);
    if (!apprenant) {
        return { ok: false, message: "Apprenant introuvable." };
    }
    const verif = validerResultat(resultat);
    if (!verif.valide) {
        return { ok: false, message: verif.message };
    }
    for (let i = 0; i < apprenant.resultats.length; i++) {
        if (apprenant.resultats[i].jour === resultat.jour) {
            apprenant.resultats[i] = resultat;
            return { ok: true, message: "Résultat mis à jour." };
        }
    }
    apprenant.resultats.push(resultat);
    return { ok: true, message: "Résultat ajouté." };
}
function calculerProgression(apprenant) {
    let exercicesTermines = 0;
    let exercicesProposes = 0;
    let challengesTermines = 0;
    let journeesRenseignees = 0;
    for (let i = 0; i < apprenant.resultats.length; i++) {
        const r = apprenant.resultats[i];
        exercicesTermines += r.exercicesTermines;
        exercicesProposes += r.totalExercices;
        if (r.challengeTermine === true) {
            challengesTermines++;
        }
        journeesRenseignees++;
    }
    let progression = 0;
    if (exercicesProposes > 0) {
        progression = Math.round((exercicesTermines / exercicesProposes) * 100);
    }
    return {
        id: apprenant.id,
        nomComplet: apprenant.nomComplet,
        ville: apprenant.ville,
        exercicesTermines: exercicesTermines,
        exercicesProposes: exercicesProposes,
        progression: progression,
        challengesTermines: challengesTermines,
        journeesRenseignees: journeesRenseignees,
    };
}
function determinerNiveau(progression) {
    if (progression >= 80) {
        return "Solide";
    }
    if (progression >= 50) {
        return "En progression";
    }
    return "À renforcer";
}
function calculerMoyenneGroupe(tableau) {
    if (tableau.length === 0) {
        return 0;
    }
    let totalProgression = 0;
    for (let i = 0; i < tableau.length; i++) {
        const info = calculerProgression(tableau[i]);
        totalProgression += info.progression;
    }
    return Math.round(totalProgression / tableau.length);
}
function journeesManquantes(apprenant) {
    const manquantes = [];
    for (let jour = 1; jour <= 7; jour++) {
        let trouve = false;
        for (let i = 0; i < apprenant.resultats.length; i++) {
           if (apprenant.resultats[i].jour === jour) {
          trouve = true;
         break;
            }
        }
        if (!trouve) {
            manquantes.push(jour);
        }
    }
    return manquantes;
}
function challengesManquants(apprenant) {
    const manquants = [];
    for (let i = 0; i < apprenant.resultats.length; i++) {
        const r = apprenant.resultats[i];
        if (!r.challengeTermine) {
            manquants.push(r.jour);
        }
    }
    return manquants;
}

function afficherTableauDeBord(tableau) {
    console.log("\n========== TABLEAU DE BORD ==========");
    console.log("Nombre total d'apprenants : " + tableau.length);
    console.log("Progression moyenne du groupe : " + calculerMoyenneGroupe(tableau) + " %");
    
    let solide = 0;
    let enProgression = 0;
    let aRenforcer = 0;
    
    for (let i = 0; i < tableau.length; i++) {
        let info = calculerProgression(tableau[i]);
        let niv = determinerNiveau(info.progression);
        if (niv === "Solide") {
            solide++;
        } else if (niv === "En progression") {
            enProgression++;
        } else {
            aRenforcer++;
        }
    }
    console.log("\n--- Répartition par niveau ---");
    console.log("Solide : " + solide);
    console.log("En progression : " + enProgression);
    console.log("À renforcer : " + aRenforcer);
    
    console.log("\n--- Liste des apprenants ---");
    for (let i = 0; i < tableau.length; i++) {
        let a = tableau[i];
        let p = calculerProgression(a);
        let niveau = determinerNiveau(p.progression);

        console.log("\n- " + p.nomComplet + " (" + p.ville + ")");
        console.log("   Progression : " + p.progression + " % [" + niveau + "]");
        console.log("   Exercices : " + p.exercicesTermines + " / " + p.exercicesProposes);
        console.log("   Challenges terminés : " + p.challengesTermines);
        console.log("   Journées renseignées : " + p.journeesRenseignees);

        let manquantes = journeesManquantes(a);
        if (manquantes.length > 0) {
            console.log("   Journées manquantes : " + manquantes.join(", "));
        } else {
            console.log("   Journées manquantes : aucune");
        }

        let chManquants = challengesManquants(a);
        if (chManquants.length > 0) {
            console.log("   Challenges non terminés : " + chManquants.join(", "));
        } else {
            console.log("   Challenges non terminés : aucun");
        }
    }

    console.log("\n=====================================\n");
}

module.exports = {
    normaliserNom,
    validerResultat,
    estNomValide,
    estIdValide,
    ajouterApprenant,
    rechercherApprenantParId,
    rechercherApprenantParNom,
    enregistrerResultat,
    calculerProgression,
    determinerNiveau,
    calculerMoyenneGroupe,
    journeesManquantes,
    challengesManquants,
    afficherTableauDeBord,
};