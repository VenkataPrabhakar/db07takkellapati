var express = require('express');
var router = express.Router();

/* GET earphone page. */
router.get('/', function(req, res, next) {
  res.render('earphone', { title: 'Search Results earphone' });
});

module.exports = router;
