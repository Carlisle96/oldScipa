var axios = require('axios');
var swal = require('sweetalert2');

exports.get_index = function(req,res,next) {

    res.render('index', {page:'Home', menuId:'home', alert: true});


  // axios.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
  //   .then(response => {
  //     console.log(response.data.url);
  //     console.log(response.data.explanation);
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });
}
