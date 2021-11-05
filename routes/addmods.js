var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let query = req.query 
  console.log(`rows ${query.rows}`) 
  console.log(`cols ${query.cols}`)
  var rows=Number(query.rows)
  var cols=Number(query.cols)
  res.render('addmods', { title: 'Add Mods',query: query });
});

module.exports = router;