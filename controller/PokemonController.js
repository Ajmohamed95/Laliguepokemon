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

exports.listnomFormAdd = function(req, res) {
    res.render("listnomAdd.ejs", {todoid:'-1',name:""});
}

exports.listnomUpdate =  function(req, res) {
    let todoid = req.params.todoid
    let name =  listnom[todoid].name;
    res.render("listnomAdd.ejs", { todoid:todoid, name:name } )
}

exports.listnomNew =  function(req, res) {
    
    let todoid = req.body.todoid;
    let newname = req.body.newList;

    if( todoid >= 0) {
        listnom[todoid].name = newname;
    }else{
        let name = new todomodel(newname);
        listnom.push(name);
        console.log (listnom)
    }

    res.redirect('/')

}

exports.listnomRemove = function(req,res) { 
    let todoid = req.params.todoid;
    listnom.splice(todoid,1);
    res.redirect('/')
}
