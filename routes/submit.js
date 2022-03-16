var express = require('express');
var router = express.Router();
var controller = require('../controllers/submit_controller');
var multer  = require('multer');
var upload = multer();

/* GET home page. */
router.get('/', controller.get_submit);
// upload.fields([{name: 'title'}, {name: 'author0'}, {name: 'paper'}, {name: 'bibtex'}]),
/* POST paper */
router.post('/', upload.fields([{name: 'paper'}, {name: 'bibtex'}]), controller.post_paper);

module.exports = router;
