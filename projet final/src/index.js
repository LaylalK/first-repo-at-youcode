const readline = require('readline');
const {apprenants} = require('./data');
const {afficherTableauDeBord} = require('./progression');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
function demarrerMenu(){
    console.log("\n==============================");
    console.log("    SAS PROGRESS CONSOLE      ");
    console.log("==============================");
    console.log("1. Afficher le tableau de bord");
    console.log("2. Quitter");
    console.log("==============================");
    rl.question("Votre choix: ", function(choix){
       if (choix.trim() === "1"){
         afficherTableauDeBord(apprenants);
         demarrerMenu();
        }
else if (choix.trim() === "2"){
    console.log("Programme fermé avec succès. Au revoir!");
    rl.close();
}
else{
    console.log("choix invalide, tapez 1 ou 2.");
    demarrerMenu();
}
    });
    }
    demarrerMenu();
