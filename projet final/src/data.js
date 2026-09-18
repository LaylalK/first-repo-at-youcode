const apprenants = [
    {
        id: 1,
        nomComplet: "Douae Code",
        ville: "Tanger",
        resultats:[
            { jour: 1, exercicesTermines: 19, totalExercices: 20, challengeTermine: true },
            { jour: 2, exercicesTermines: 16, totalExercices: 20, challengeTermine: false },
        ]
    },
    {
        id: 2,
        nomComplet: "Reda js",
        ville: "Rabat",
        resultats:[
            { jour: 1, exercicesTermines: 12, totalExercices: 20, challengeTermine: false },
            { jour: 2, exercicesTermines: 18, totalExercices: 20, challengeTermine: true },
        ]
    }
];

module.exports = { apprenants };
