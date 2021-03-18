let express = require('express');
let app = express();
// const urlencodedParser = bodyParser.urlencoded({​​​​​extended: false}​​​​​);
// Import body parser
let bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded je dois mettre false en true
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// app.get('/',(req,res)=> res.render('todo.ejs',{listnom:listnom,message:""}))
// //app.post('/add',(req,res)=> {let newList = req.query.newList;listnom.push(newList);res.render('todo.ejs',{listnom:listnom});})
// //app.post('/add', function (req, res) {​​​​​ const newList = req.body.newList; listnom.push(newList); res.redirect('/') }​​​​​);
// app.get('/add',(req,res)=> {let newList = req.query.newList;listnom.push(newList);res.render("todo.ejs",{listnom:listnom,message:"ajout reussi"})})

// app.get('/remove/:listnom',(req,res)=>{let param = req.params.listnom; listnom.splice(param,1);
// res.render("todo.ejs",{listnom:listnom,message:"suppression reussi"})})
let routes = require('./routeur')
app.use('/',routes);

let port = process.env.PORT || 8000;

app.listen(port, function () {
    console.log(" Server running on port " + port);
});