let express = require('express');
let router = express.Router();
var todoController = require('./controller/TodooController');
const pokemonModel = require('./controller/PokemonController');



router.get('/',(req,res)=> res.redirect('/listnom'))

// router.get('/add',(req,res)=> {let newList = req.query.newList;listnom.push(newList);res.render("todo.ejs",{listnom:listnom,message:"ajout reussi"})})
router.get('/listnom',pokemonModel.listnom);
router.get('/listnom/add', todoController.listnomFormAdd);
router.post('/listnom/new', todoController.listnomNew);
router.get('/listnom/update/:todoid',todoController.listnomUpdate)



router.get('/listnom/remove/:todoid',todoController.listnomRemove)


// importation controller

module.exports = router; 

//Liste des routes vers les contrôleurs
//routeur.get('/',(req,res)=> res.render('todo.ejs',{listnom:listnom,message:""}))
//app.post('/add',(req,res)=> {let newList = req.query.newList;listnom.push(newList);res.render('todo.ejs',{listnom:listnom});})
//app.post('/add', function (req, res) {​​​​​ const newList = req.body.newList; listnom.push(newList); res.redirect('/') }​​​​​);

// page ajout
//routeur.post('/add',(req,res)=> {let newList = req.body.newList;listnom.push(newList);
   //res.render("todo.ejs",{listnom:listnom,message:"ajout reussi"})
//});

// page remove
//routeur.get('/remove/:listnom',(req,res)=>{let param = req.params.listnom; listnom.splice(param,1);
    //res.render("todo.ejs",{listnom:listnom,message:"suppression reussi"})})


