var axios = require('axios');

exports.get_createuser = function(req,res,next) {
  res.render('createuser', {page:'Create User', menuId:'user', alert: true});
}

exports.create_user = function(req,res,next) {
  console.log("pressttt")


}
