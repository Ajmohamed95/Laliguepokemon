class carteModel {

    attaque = "";
    puissance = "";
    isBrillant = "";
    isRare = "";
    proprietaire = "";
    pokemon = "";


    constructor(attaque, puissance, isBrillant, isRare, proprietaire, pokemon) {
        this.attaque = attaque;
        this.puissance = puissance;
        this.isBrillant = isBrillant;
        this.isRare = isRare;
        this.proprietaire = proprietaire;
        this.pokemon = pokemon;

    }

};

module.exports = carteModel;
