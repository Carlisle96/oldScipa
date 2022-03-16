const Swal = require('sweetalert2')
var axios = require('axios')
var FormData = require('form-data');
const multer = require('multer');
const upload = multer();
const formidable = require('formidable');

exports.get_submit = function(req,res,next) {
    res.render('submit', {page:'Submit Paper', menuId:'submit'});
}


exports.post_paper = function(req,res,next) {

    // console.log(req.body.authors);

    // /34.73.222.177:5000/submit-file
    var authors = req.body.author0;
    var title = req.body.title;
    // var paper = req.body.paper;
    // var bibtex = req.body.bibtex;


      // console.log(req.files['bibtex']);
      // console.log(req.body);
    // var submitFormData = new FormData();
    //
    // submitFormData.append('author0',authors);
    // submitFormData.append('title',title);
    // submitFormData.append('paper', paper);
    // submitFormData.append('bibtex',bibtex);

    // console.log(req.body);
    //
    //
    // var form = new formidable.IncomingForm();
    // form.parse(req.body, function(err, fields, files) {
    //   console.log('Fields', fields);
    //   console.log('Files', files);
    // });

    // if(!title) {
    //   res.render('err', {page:'Error', menuId:'submit', error:'No Title specified', error_message:'Please specify title'});
    // }
    // else {
      // axios.post('http://35.242.243.4:5000/submit-file', req.body, {'Content-Type': 'multipart/form-data'})
      //   .then(response => console.log(response))
      //   .catch(errors => console.log(errors));
      //
      // axios.post('http://35.242.243.4:5000/submit-file', {
      //   author0: authors,
      //   title: title,
      //   paper: uploadPaper,
      //   bibtex: file_input,
      // }, ).then(response => {
      //     console.log(response.data);
      //     res.redirect('/');
      //   })
      //   .catch(error => {
      //     console.log(error);
      //     res.redirect('/submit')
      //   });
    // }

}
