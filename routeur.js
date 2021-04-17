let express = require('express');
let router = express.Router();
const carteController = require('./controller/CarteController');
const pokemonController = require('./controller/PokemonController');
const proprietaireController = require('./controller/ProprietaireController');


const carteAPIController = require('./controller/CarteAPIController');
const pokemonAPIController = require('./controller/PokemonAPIController');
const proprietaireAPIController = require('./controller/ProprietaireAPIController');




//routeur
router.get('/',(req,res)=> res.redirect('/login'))
router.get('/login',proprietaireController.login);
router.post('/logon',proprietaireController.logon)
router.get('/collectionCarte',proprietaireController.listProprio);
router.get('/inscription',proprietaireController.inscription)
router.post('/inscrit',proprietaireController.inscrit)
router.post('/listCarte/new', proprietaireController.carteNew);
router.get('/listCarte',carteController.listCarte);
router.get('/listCarte/:idcarte',carteController.manageCarte)

//routeurAPI
//router.get('/',(req,res)=> res.redirect('/login'))
router.get('/API/login',proprietaireAPIController.login);
router.post('/API/logon',proprietaireAPIController.logon)
router.get('/API/collectionCarte',proprietaireAPIController.listProprio);
router.get('/API/inscription',proprietaireAPIController.inscription)
router.post('/API/inscrit',proprietaireAPIController.inscrit)
router.post('/API/listCarte/new', proprietaireAPIController.carteNew);
router.get('/API/listCarte',carteAPIController.listCarte);
router.get('/API/listCarte/:idcarte',carteAPIController.manageCarte)


// router.get('/Api/Lu', readingApiController.Lu);
// router.post('/Api/readingnew', readingApiController.readingnew);
// router.put('/Api/updatereading/:ReadingID', readingApiController.updatereading);
// router.delete('/Api/deletereading/:ReadingID', readingApiController.readingRemove);



module.exports = router; 




