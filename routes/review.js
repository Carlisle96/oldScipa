var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('review', {page:'Review Paper', menuId:'review'});
});

module.exports = router;
