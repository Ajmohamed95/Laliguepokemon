class carteModel {

    nom = "";
    attaque = "";
    puissance = "";
    isBrillant = "";
    isRare = "";
    proprietaire = "";
    pokemon = "";


    constructor(nom, attaque, puissance, isBrillant, isRare, proprietaire, pokemon) {
        this.nom = nom;
        this.attaque = attaque;
        this.puissance = puissance;
        this.isBrillant = isBrillant;
        this.isRare = isRare;
        this.proprietaire = proprietaire;
        this.pokemon = pokemon;

    }

};

module.exports = carteModel;
