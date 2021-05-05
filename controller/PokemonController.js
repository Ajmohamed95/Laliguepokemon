const pokemonModel = require('../models/pokemonModel');
const connection = require('../dbManager')


// recuperer la list 
exports.listPokemons = function (res) { 
    var pokemons;
    connection.query("SELECT * FROM pokemon.pokemon", function (error, resultSQL) {
        if (error)  {
            //res.status(400).send(error); //400=error
            console.log("error listpokemons")       
        }
        else {
            //res.status(200); //200: Ok pas d'erreur
            pokemons =  resultSQL;
            //console.log(pokemons);
            //res.render('todo.ejs',{listnom:listPokemon})
            return res(pokemons);
        }
    });
}
exports.getPokemons = function (req,res){ 
    var pokemons;
    connection.query("SELECT * FROM pokemon.pokemon", function (error, resultSQL) {
        if (error)  {
            //res.status(400).send(error); //400=error
            console.log("error listpokemons")       
        }
        else {
            //res.status(200); //200: Ok pas d'erreur
            pokemons =  resultSQL;
            //console.log(pokemons);
            res.render('listpokemon.ejs',{listpokemon:pokemons})
            //return res(pokemons);
        }
    });
}
exports.managepokemon = function (req, res){
    //connection.query("UPDATE ")
    let idpokemon = req.params.idpokemon
    let update = req.query.update
    console.log(req.params)
    if (update) {
        console.log(req.query)
        let idpokemon = req.params.idpokemon
        let nom = req.query.nom
        let typepokemon= req.query.type
        let elementpokemon= req.query.element
        let pokemon = new pokemonModel(nom,typepokemon,elementpokemon) 
        connection.query("UPDATE pokemon.pokemon SET ? WHERE idpokemon=? ",[pokemon,idpokemon],function(error,resultSQL){ 
            if (error){
                res.status(400).send(error);
            
            }
            else {
                res.status(201).redirect("/getpokemon")
            }
        });
    
    }
    else{
        connection.query("DELETE FROM pokemon.pokemon where idpokemon=? ",idpokemon, function (error,resultSQL){
            if (error)  {
                console.log(error)
                res.status(400).send(error); //400=error  
            }
            else {
                res.status(200); //200: Ok pas d'erreur
                console.log("delete");
                res.redirect("/getpokemon")
            }

        });
    }
    //redirect repasse par le routeur -> appel la fonction
    //render appel la page 

}
exports.createpokemon = function(req, res) {
    res.render("collectionpokemon.ejs")
     }

exports.newpokemon =  function(req, res) {
    console.log(req.body) //affiche console log dans le terminale
    //let todoid = req.body.todoid;
    let nompokemon = req.body.nom
    let typepokemon = req.body.type
    let elementpokemon = req.body.element
    let pokemon = new pokemonModel(nompokemon,typepokemon,elementpokemon) 
    connection.query("INSERT INTO pokemon.pokemon set ?",pokemon,function(error,resultSQL){ 
        if (error){
            res.status(400).send(error);
        
        }
        else {
            res.status(201).redirect("/getpokemon")
        }
    });

 }
