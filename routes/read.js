var express = require('express');
var router = express.Router();


/* GET home page. */
let read_controller = require('../controllers/read_controller');
//router.get('/read',read_controller.get_read);

router.get('/', read_controller.get_read);
router.get('/request', read_controller.request_paper_test);
// router.get('/request/:paper_id', read_controller.request_paper_id);
router.get('/confirm', read_controller.confirm_Purchase); //TODO do we still need this ?
router.get('/search', read_controller.search_papers);

router.post('/request/:paper_id', read_controller.request_paper_id);

router.get('/review/:paper_id', read_controller.review_paper_id);

/*router.get('/read/papers', read_controller.search_papers);*/
// router.get('/read/request/:paper_id', read_controller.request_paper);


module.exports = router;
