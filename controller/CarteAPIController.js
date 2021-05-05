const carteModel = require('../models/carteModel');
const connection = require('../dbManager')
var pokemonsCtrl = require ('./PokemonController');
const { json } = require('express');

// recuperer la list 
exports.listCarte = function (req, res) { 
    let idutilisateur = req.params.idutilisateur;
    connection.query("SELECT idcarte, pokemon.nom as nompokemon, carte.nom as nomcarte, attaque, puissance,\
                             IsBrillant, IsRare, pokemon, proprietaire, idpokemon, type, element \
                             FROM pokemon.carte JOIN pokemon.pokemon on pokemon=idpokemon\
                             where proprietaire = ?", idutilisateur, function (error, resultSQL) {
        if (error)  {
            console.log(error)
            res.status(400).json({"error":error}); //400=error       
        }
        else {
            res.status(200); //200: Ok pas d'erreur
            listCarte =  resultSQL; //pour changer le nom de la variable 
            var pokemons;
            pokemonsCtrl.listPokemons(function(result){
                pokemons=result
            res.json({listCarte:listCarte,pokemons:pokemons}) //premier listCarte se trouve ds ejs
            });
            
        }
    });
}
exports.manageCarte = function (req, res){
    console.log(req.body)
    let idcarte = req.params.idcarte
    let update = req.body.update
    if (update) {
        let carteid = req.params.idcarte
        let cartenom = req.body.nomcarte
        let brillant1 = req.body.IsBrillant
        let rare1 = req.body.IsRare
        let attaque = req.body.attaque
        let puissance1 = req.body.puissance
        let proprio = req.body.proprietaire
        let idpokemon = req.body.pokemon
        let carte = new carteModel(cartenom, attaque, puissance1, brillant1, rare1, proprio, idpokemon) 
        console.log(carte)
        connection.query("UPDATE pokemon.carte SET ? WHERE idcarte=? " ,[carte,carteid],function(error,resultSQL){ 
            if (error){
                res.status(400).json({"error":error});
            
            }
            else {
                res.status(201).json({"message":"success"});
            }
        });
    
    }
    else{
        console.log(idcarte)
        connection.query("DELETE FROM pokemon.carte where idcarte=? ", idcarte, function (error,resultSQL){
            if (error)  {
                console.log(error)
                res.status(400).json({"error":error}); //400=error  
            }
            else {
                res.status(200); //200: Ok pas d'erreur
                console.log("delete");
                res.json({"message":"success"});
            }

        });
    }
    //redirect repasse par le routeur -> appel la fonction
    //render appel la page 

}
exports.carteNew =  function(req, res) {
    console.log(req.body) //affiche console log dans le terminale
    //let todoid = req.body.todoid;
    let cartenom = req.body.nom
    let brillant1 = req.body.isBrillant
    let rare1 = req.body.isRare
    let attaque = req.body.attaque
    let puissance1 = req.body.puissance
    let proprio = req.body.proprietaire
    let pokemon = req.body.pokemon
    let carte = new carteModel(cartenom, attaque, puissance1, brillant1, rare1, proprio, pokemon) 
    connection.query("INSERT INTO pokemon.carte set ?",carte,function(error,resultSQL){ 
        if (error){
            console.log(resultSQL)
            res.json({"error":error});
        
        }
        else {
            res.status(201).json({"message":"succes"})
        }
    });


}




