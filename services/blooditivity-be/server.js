const express = require("express");
const server = express();
const nunjucks = require("nunjucks");
const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://blood-donation:blood-donation@blood-donation-43xtg.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//css, images, js sao arquivos estaticos
server.use(express.static('public'));
server.use(express.urlencoded({ extended: true }));

nunjucks.configure("./", {
    express:server,
    noCache: true,
});

server.get('/', function(req, res){
    const donors = [];
    return res.render("index.html",  {donors})
});

server.post('/', function(req, res){
    const name = req.body.name;
    const email = req.body.email;
    const blood = req.body.blood;

    if(name == "" || email == "" || blood == ""){
        return res.send("All fields are required!")
    }

    const query = `INSERT INTO donors ("name", "email", "blood") 
        VALUES ($1, $2, $3)`;

    const values = [name, email, blood];
    mongoose.Query(query, values, function(err){
        if(err) return res.send("Database error.");
        
        return res.redirect("/");
    });
});

server.listen(3000, function(){
    console.log("Server initialized.")
});