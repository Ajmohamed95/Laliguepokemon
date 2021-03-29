const proprioModel = require('../models/utilisateurModel');
const connection = require('../dbManager');
const carteModel = require('../models/carteModel');


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
            });
            res.render('collectionCarte.ejs',{listProprio:listProprio, listPokemon:listPokemon})
        }
    });
}

exports.listnomFormAdd = function(req, res) {
    res.render("listnomAdd.ejs", {todoid:'-1',name:""});
}

exports.listnomUpdate =  function(req, res) {
    let todoid = req.params.todoid
    let name =  listnom[todoid].name;
    res.render("listnomAdd.ejs", { todoid:todoid, name:name } )
}

exports.carteNew =  function(req, res) {
    
    //let todoid = req.body.todoid;
    let cartenom = req.body.cartes
    let brillant1 = req.body.brillant1
    let rare1 = req.body.rare1
    let attaque = req.body.attaque
    let puissance1 = req.body.puissance1
    let proprio = req.body.proprio
    let carte = new carteModel(attaque, puissance1, brillant1, rare1, proprio, pokemon) 
    res.redirect('/collectionCarte')

}

exports.listnomRemove = function(req,res) { 
    let todoid = req.params.todoid;
    listnom.splice(todoid,1);
    res.redirect('/')
}