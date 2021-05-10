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
                res.json({listProprio:listProprio, listPokemon:listPokemon, message:"success"})
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
            console.log(req.session.idutilisateur)
            req.session.login = login;
            req.session.email = email;
            res.json({"message":"succes","idutilisateur":req.session.idutilisateur});
        }
        else {
            error = "information incorrecte, "
            res.json({error:error})
        
        }
        });

}
exports.inscription = function (req, res) {
    console.log (req.body);
    var login = req.body.uname;
    var email = req.body.email;
    var password = req.body.psw;
    var utilisateur = new utilisateurModel (login, email, password)
    connection.query(" INSERT INTO pokemon.utilisateur set ?",utilisateur,
        function(error,resultSQL) {
        console.log(resultSQL)
        console.log(error)
        if (error){
            error = "utilisateur existant"
            res.json({"error":error});
        
        }
        else {
            res.status(201).json({"message":"succes"})
        }
         });
        
}



