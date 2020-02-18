var express = require('express');
var axios = require('axios');
var router = express.Router();
var db = require('../models');

// GET /pokemon - return a page with favorited Pokemon
// -View: views/pokemon/index.ejs
// -Purpose: Retrieve all favorited Pokemon and display them on the page
router.get('/', function(req, res) {
  db.pokemon.findAll().then(function(pokemon) {
    res.render("../views/pokemon/index.ejs", { pokemon: pokemon});
    
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
    res.redirect("/pokemon");
  }).catch(err => {
    console.log(err);
    console.log("ERROR");
  })
});

router.get("/:name", function(req, res) {
  var qs = {
    params: {
      s: req.query.name
      //d: req.query.abitlities
    }
  }
  axios.get(`http://pokeapi.co/api/v2/pokemon/${req.query.name}/`, qs)
      .then(function (response) {
        var results = response.data;
        res.render("../views/pokemon/details.ejs", { pokemon: results });
      })
      .catch(function (err) {
        console.log(`Error was made:\n ${err}`);
      })
      .finally(function() {
        console.log("Made it through okay!");
      });
})

module.exports = router;
