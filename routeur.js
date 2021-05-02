let express = require('express');
let router = express.Router();
const carteController = require('./controller/CarteController');
const pokemonController = require('./controller/PokemonController');
const proprietaireController = require('./controller/ProprietaireController');


const carteAPIController = require('./controller/CarteAPIController');
const pokemonAPIController = require('./controller/PokemonAPIController');
const proprietaireAPIController = require('./controller/ProprietaireAPIController');

const check = (req, res, next) => { // req et res correspondent aux paramètres de fonction Callback
    //condition pour accès session
    if(req.session && req.session.idutilisateur>= 0){ //&&--> ET //req.session est-ce qu'il existe une session et si y'a un user id >0
        next();
    }
    else{
        res.redirect('/login');
    }
};


//routeur
router.get('/',(req,res)=> res.redirect('/login'))
router.get('/login',proprietaireController.login);
router.post('/logon',proprietaireController.logon)
router.get('/collectionCarte',check,proprietaireController.listProprio);
router.get('/inscription',proprietaireController.inscription)
router.post('/inscrit',proprietaireController.inscrit)
router.post('/newCarte',check,carteController.carteNew);
router.get('/listCarte',check,carteController.listCarte);
router.get('/listCarte/:idcarte',carteController.manageCarte)
router.get('/logout',proprietaireController.logout)

//routeurAPI
//router.get('/',(req,res)=> res.redirect('/login'))
router.get('/API/login',proprietaireAPIController.login);
router.post('/API/logon',proprietaireAPIController.logon)
router.get('/API/collectionCarte',proprietaireAPIController.listProprio);
router.post('/API/inscription',proprietaireAPIController.inscription)
router.post('/API/newCarte', carteAPIController.carteNew);
router.get('/API/listCarte',carteAPIController.listCarte);
router.put('/API/listCarte/:idcarte',carteAPIController.manageCarte)
router.delete('/API/listCarte/:idcarte',carteAPIController.manageCarte)
router.get('/API/pokemon',pokemonAPIController.listPokemons)



// router.get('/Api/Lu', readingApiController.Lu);
// router.post('/Api/readingnew', readingApiController.readingnew);
// router.put('/Api/updatereading/:ReadingID', readingApiController.updatereading);
// router.delete('/Api/deletereading/:ReadingID', readingApiController.readingRemove);



module.exports = router; 




