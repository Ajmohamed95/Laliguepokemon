const proprioModel = require('../models/utilisateurModel');
const connection = require('../dbManager');
const carteModel = require('../models/carteModel');
const utilisateurModel = require('../models/utilisateurModel');


// recuperer la list 
exports.listProprio = function (req, res) { 
    connection.query("SELECT * FROM pokemon.utilisateur", function (error, resultSQL) {
        if (error)  {
            res.status(400).json({"error":error}); //400=error       
        }
        else {
            res.status(200); //200: Ok pas d'erreur
            listProprio =  resultSQL;
            console.log(listProprio);
            var listPokemon ;
            connection.query("SELECT * FROM pokemon.pokemon", function (error, resultSQL) {
                if (error)  {
                    res.status(400).json({"error":error}); //400=error       
                }
                else {
                    res.status(200); //200: Ok pas d'erreur
                    listPokemon =  resultSQL;
                    console.log(listPokemon);
                }
                res.json({listProprio:listProprio, listPokemon:listPokemon})
            });

        }
    });
}
exports.login = function (req, res) {
    error = ""
    res.json({error:error})

}
exports.logon = function (req, res){
    console.log (req.body);
    var login = req.body.uname;
    var email = req.body.email;
    var password = req.body.psw;
    connection.query("select idutilisateur from pokemon.utilisateur where login= ? and email= ? and password= ?", [login,email,password],
        function(error,resultSQL) {
        console.log(resultSQL)
        if (resultSQL.length == 1){
            console.log("test");
            console.log(resultSQL[0].idutilisateur);
            req.session.idutilisateur = resultSQL[0].idutilisateur;
            req.session.login = login;
            req.session.email = email;
            res.json({"message":"succes"});
        }
        else {
            error = "information incorrecte, "
            res.json({error:error})
        
        }
        });

}
exports.inscription = function (req, res) {
    error = ""
    res.json({error:error})
}
exports.inscrit = function (req, res) {
    console.log (req.body);
    var login = req.body.uname;
    var email = req.body.email;
    var password = req.body.psw;
    var utilisateur = new utilisateurModel (login, email, password)
    connection.query(" INSERT INTO pokemon.utilisateur set ?",utilisateur,
        function(error,resultSQL) {
        console.log(resultSQL)
        if (error){
            error = "utilisateur existant"
            res.status(400).json({"error":error});
        
        }
        else {
            res.status(201).json({"message":"succes"})
        }
         });
        
}

exports.carteNew =  function(req, res) {
    console.log(req.body) //affiche console log dans le terminale
    //let todoid = req.body.todoid;
    let cartenom = req.body.cartes
    let brillant1 = req.body.brillant1
    let rare1 = req.body.rare1
    let attaque = req.body.attaque
    let puissance1 = req.body.puissance1
    let proprio = req.body.proprio
    let pokemon = req.body.pokemon
    let carte = new carteModel(cartenom, attaque, puissance1, brillant1, rare1, proprio, pokemon) 
    connection.query("INSERT INTO pokemon.carte set ?",carte,function(error,resultSQL){ 
        if (error){
            res.status(400).json({"error":error});
        
        }
        else {
            res.status(201).json({"message":"succes"})
        }
    });


}

