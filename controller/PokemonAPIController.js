const pokemonModel = require('../models/pokemonModel');
const connection = require('../dbManager')


// recuperer la list 
exports.listPokemons = function (req, res) { 
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
            return res.json(pokemons);
        }
    });
}

