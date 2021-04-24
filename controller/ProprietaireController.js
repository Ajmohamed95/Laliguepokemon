const proprioModel = require('../models/utilisateurModel');
const connection = require('../dbManager');
const carteModel = require('../models/carteModel');
const utilisateurModel = require('../models/utilisateurModel');
const session = require('express-session');


// recuperer la list 
exports.listProprio = function (req, res) { 
    connection.query("SELECT * FROM pokemon.utilisateur", function (error, resultSQL) {
        if (error)  {
            res.status(400).send(error); //400=error       
        }
        else {
            res.status(200); //200: Ok pas d'erreur
            listProprio =  resultSQL;
            console.log(listProprio);
            var listPokemon ;
            connection.query("SELECT * FROM pokemon.pokemon", function (error, resultSQL) {
                if (error)  {
                    res.status(400).send(error); //400=error       
                }
                else {
                    res.status(200); //200: Ok pas d'erreur
                    listPokemon =  resultSQL;
                    console.log(listPokemon);
                }
                res.render('collectionCarte.ejs',{listProprio:listProprio, listPokemon:listPokemon})
            });

        }
    });
}
exports.login = function (req, res) {
    error = ""
    res.render("login.ejs", {error:error})

}
exports.logon = function (req, res){
    if(req.session.idutilisateur){
        res.redirect("/listCarte")
        
    }
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
            res.redirect("/listCarte")
        }
        else {
            error = "information incorrecte, "
            res.render("login.ejs", {error:error})
        
        }
        });

}
exports.inscription = function (req, res) {
    error = ""
    res.render("inscription.ejs", {error:error})
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
            res.status(400).render("inscription.ejs", {error:error});
        
        }
        else {
            res.status(201).redirect("/login")
        }
         });
        

}
exports.logout = function (req, res){
    req.session.destroy();
    res.redirect("/login")
}


