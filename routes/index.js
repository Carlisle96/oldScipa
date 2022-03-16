var express = require('express');
var router = express.Router();
const axios = require('axios');

let index = require('../controllers/index_controller');

/* GET home page. */
router.get('/', index.get_index);
module.exports = router;
