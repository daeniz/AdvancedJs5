var express = require("express")
var app = express()
var port = 4000
var facade = require("./facade.js")
var bodyParser = require('body-parser');

app.listen(port, function(){
    console.log("Server at port: " + port)
})

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get("/api/books", function(req, res){
    facade.getBooks(function(books){
        res.send( JSON.stringify(books))
    })

app.post("/api/books", function(req,res){
    var book = req.body.book
     facade.addBook(book, function(book){
         res.send(JSON.stringify(book))
     })
    })

app.put("/api/books", function(req,res){
        var book = req.body
        facade.updateBook(book, function(updatedBook){
            res.send(JSON.stringify(updatedBook))
        }) 
    })

app.delete("/api/books/:id", function(req,res){
        var bookid = parseInt( req.params.id)
        facade.deleteBook(bookid, function(response){
            res.send(JSON.stringify(response))
        })
    })
})

app.post("/api/login", function(req,res){
    if(req.body.userName && req.body.password){
    var userName = req.body.userName;
    var password = req.body.password;
  }
  else{
      res.json({message:"Please provide body with userName and password"})
      return
  }
    userFacade.login(userName,password,function(data){
        if(data.succes === false) res.status(401).json({message: "Something went wrong, user is not logged in"})
        else {
            var payload = {userName: data.user.username}
            var token = JWT.sign(payload,jwtOptions.secretOrKey);
            res.json({message: "ok", token:token})
        }
    })
})
