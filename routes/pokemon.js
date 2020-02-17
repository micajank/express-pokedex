var express = require('express');
var router = express.Router();
var db = require('../models');

// GET /pokemon - return a page with favorited Pokemon
// -View: views/pokemon/index.ejs
// -Purpose: Retrieve all favorited Pokemon and display them on the page
router.get('/', function(req, res) {
  db.pokemon.findAll().then(function(pokemon) {
    console.log(req.body.name);
    console.log(pokemon);
    res.json(pokemon);
    
  }).catch(err => {
    console.log(err);
    res.send("ERROR");
  })
});

// POST /pokemon - receive the name of a pokemon and add it to the database
// -The form for adding is already included on the main index page
// -View: none (redirect to /pokemon)
// -Purpose: Creates a new Pokemon and redirects back to /pokemon
router.post('/', function(req, res) {
  db.pokemon.findOrCreate({
    where: {
      name: req.body.name
    }
  }).then(function([pokemon, created]) {
    console.log(`Successfully ${created ? "created" : "found"} ${pokemon.name}.`);
    res.redirect("/pokemon");
  }).catch(err => {
    console.log(err);
    console.log("ERROR");
  })
});

module.exports = router;
