var express = require('express');
var router = express.Router();
const axios = require('axios');

let controller = require('../controllers/createuser_controller');

/* GET home page. */
router.get('/', controller.get_createuser);
router.post('/create', controller.create_user);
router.post("/redi", function (req, res) {
  res.send({err: 0, redirectUrl: "/"});
});

module.exports = router;
