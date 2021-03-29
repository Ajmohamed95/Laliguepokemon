const todomodel = require('../models/todooModel');

let listnom = [ new todomodel("Songoku"), new todomodel("vegeta")]
let name = ""

// recuperer la list 
exports.listnom = function (req, res) { 
    res.render('todo.ejs',{listnom:listnom})
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
