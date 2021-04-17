const carteModel = require('../models/carteModel');
const connection = require('../dbManager')
var pokemonsCtrl = require ('./PokemonController')

// recuperer la list 
exports.listCarte = function (req, res) { 
    connection.query("SELECT idcarte, pokemon.nom as nompokemon, carte.nom as nomcarte, attaque, puissance, IsBrillant, IsRare, pokemon, proprietaire, idpokemon, type, element FROM pokemon.carte JOIN pokemon.pokemon on pokemon=idpokemon", function (error, resultSQL) {
        if (error)  {
            console.log(error)
            res.status(400).send(error); //400=error       
        }
        else {
            res.status(200); //200: Ok pas d'erreur
            listCarte =  resultSQL; //pour changer le nom de la variable 
            var pokemons;
            pokemonsCtrl.listPokemons(function(result){
                pokemons=result
                res.render('listCarte.ejs',{listCarte:listCarte,pokemons:pokemons}) //premier listCarte se trouve ds ejs
            });
            
        }
    });
}
exports.manageCarte = function (req, res){
    //connection.query("UPDATE ")
    let idcarte = req.params.idcarte
    let update = req.query.update
    if (update) {
        console.log(req.query)
        let carteid = req.params.idcarte
        let cartenom = req.query.cartenom
        let brillant1 = req.query.isBrillant
        let rare1 = req.query.isRare
        let attaque = req.query.attaque
        let puissance1 = req.query.puissance
        let proprio = req.session.idutilisateur
        let idpokemon = req.query.pokemonattache
        let carte = new carteModel(cartenom, attaque, puissance1, brillant1, rare1, proprio, idpokemon) 
        console.log(carte)
        connection.query("UPDATE pokemon.carte SET ? WHERE idcarte=? " ,[carte,carteid],function(error,resultSQL){ 
            if (error){
                res.status(400).send(error);
            
            }
            else {
                res.status(201).redirect("/listCarte")
            }
        });
    
    }
    else{
        connection.query("DELETE FROM pokemon.carte where idcarte=? ", idcarte, function (error,resultSQL){
            if (error)  {
                console.log(error)
                res.status(400).send(error); //400=error  
            }
            else {
                res.status(200); //200: Ok pas d'erreur
                console.log("delete");
                res.redirect("/listCarte")
            }

        });
    }
    //redirect repasse par le routeur -> appel la fonction
    //render appel la page 

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
