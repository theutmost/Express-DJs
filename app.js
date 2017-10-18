var express = require("express")
var app = express();
var ejs = require("ejs")
app.set("view engine", "ejs") // establishing the view engine to be EJS 
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true }));
// app.use(bodyParser.json());
app.use(express.static("public"));


var db = [
    {   
    
        "alwaysThere": true,
        "djName": "DJ Toni",
        "name": "Tony",
        "website": "http://facebook.com",
        "image": "https://static1.squarespace.com/static/550f3e85e4b01a34b819e32b/551caf2de4b0251a9d1a154a/5952732cbf629aef694e178c/1498575697512/Tessa+1.jpg?format=500w"
    },
    {
        "alwaysThere": true,
        "djName": "DJ Vicky",
        "name": "Vicky",
        "website": "http://facebook.com",
        "image": "https://static1.squarespace.com/static/550f3e85e4b01a34b819e32b/581d1ae3197aea75e7eeb436/581d1b06e4fcb51e9e06e77a/1478302472505/Victoria+Van+Damn+2.jpg?format=500w"

    },
    
]

// HOME...

app.get("/", function (req, res) {
    console.log("you've been routed to the homepage");
    res.render("index.ejs", { data: db }) // establed an obj to be viewed on the index, AND that data(key) on the index.ejs page's to be set w properties in db(above)
})


app.post("/", function (req, res) { 
     // bc had a form, we must use POST method. when click submit, it takes the value of whatever was inputted in the form
    console.log(req.body.searchInput);
    var index = searchDB(req.body.searchInput);
    if (index === -1){
    res.render("index.ejs", { data: db }) // establed an obj to be viewed on the index, AND that data(key) on the index.ejs page's to be set w properties in db(above)
    } else{
    res.render("profile.ejs", { profile: db[index] }) //specifying which DJ/index in the obj we need, and it will give me the info in THEIR specific obj  
    }
})



app.get("/searchDJ ", function (req, res) {  // bc had a form, we must use POST method. when click submit, it takes the value of whatever was inputted in the form
      res.render("index.ejs", { data: db }) // establed an obj to be viewed on the index, AND that data(key) on the index.ejs page's to be set w properties in db(above)
//specifying which DJ/index in the obj we need, and it will give me the info in THEIR specific obj  
    
})


function searchDB(name) { // declaring the func, will need to CALL it above
    console.log(name);
    for (var i = 0; i < db.length; i++) {
        if (db[i].name.toLowerCase() === name.toLowerCase()) {
            return i;
        } 
    } return -1;
}

// ADD NEW / PROFILE...


app.get("/profile/:id", function (req, res) {
    console.log("you've been routed to the profile page");
    console.log(req.params.id);
    res.render("profile.ejs", { profile: db[req.params.id], id: req.params.id }) //specifying which DJ/index in the obj we need, and it will give me the info in THEIR specific obj
})


app.get("/djform", function(req, res){
    res.render("djform")
});

app.post("/djform", function(req, res){
        var djName = req.body.djName; // this us grabbing the input, name.
    var name = req.body.addName; // this us grabbing the input, name.
    var website = req.body.addWebsite; //this us grabbing the input, site.
    var image = req.body.addImage;
        db.push({djName: djName, name : name, website : website, image: image});
        console.log(db)
        res.redirect("/");
})

// UPDATE PROFILE...


app.get("/profile/:id/edit", function (req, res) {
    console.log("you've been routed to the update page");
    console.log(req.params.id);
    res.render("updProfile.ejs", { profile: db[req.params.id], id: req.params.id }) //specifying which DJ/index in the obj we need, and it will give me the info in THEIR specific obj
})


app.post("/profile/:id/edit", function (req, res) {
    console.log("***********POST**********")
    console.log(" req.body: " + req.body)
    var updatedObj = {}; 
    updatedObj.djName = req.body.djName; // this us grabbing the input, name.
    updatedObj.name = req.body.addName; // this us grabbing the input, name.
    updatedObj.website = req.body.addWebsite; //this us grabbing the input, site.
    updatedObj.image = req.body.addImage;
    db[req.params.id] = updatedObj;
        console.log(db[req.params.id])
        res.redirect("/");
})

// DELETE...

app.delete("/profile/:id", function (req, res) {
    var id = req.params.id;
    var person = db[id].name;
    console.log(" on delete: "  + person)
    db[id] = null;

    res.json({ message: person + " has been deleted"})
})


app.listen(5558, function () { // sets up port to listen on
    console.log("you're running on port 5558")
});