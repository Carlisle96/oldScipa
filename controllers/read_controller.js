var axios = require('axios');
var fs = require('fs');

var Web3 = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/49e2b4f015034929a6cd0d638b42c840"));
const contractAddress = "0x2ac080b12ad4e88e4fe1d2aa7020934cde35cb5b";
const ownerAddress = "0x226412a5AaDAd0Ecfa3fC71Ac6A16c4ad089D12B";
const abi =[{"constant":false,"inputs":[{"name":"userName","type":"string"},{"name":"userID","type":"uint256"},{"name":"wallet","type":"address"}],"name":"createUser","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getUserName","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getUserID","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"pw","type":"string"}],"name":"hashPassword","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"name":"paperID","type":"uint256"},{"name":"reader","type":"address"}],"name":"accessPaper","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"author","type":"uint256"},{"name":"refs","type":"uint256[]"}],"name":"isAuthorOf","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"paperID","type":"uint256"}],"name":"readPaper","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"getReadable","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getSubmited","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"authors","type":"uint256[]"},{"name":"paperID","type":"uint256"},{"name":"paperTitle","type":"string"},{"name":"ReferenceQuoteIDs","type":"uint256[]"}],"name":"submitPaper","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];
const deployedContract = new web3.eth.Contract(abi, contractAddress, {from: ownerAddress});

exports.get_read = async function(req,res,next) {

    // const deluxeAddress = "0x5331B7DC51429E5A9057767aB77EA62178Ec3bdf";
    //console.log("Version number :: " + web3.version);
    // let acs = await deployedContract.methods.accessPaper(0, deluxeAddress).call();
    //console.log(deployedContract);
    //console.log(acs);
    var data;
    axios({
        url: 'http://35.242.243.4:5000/search-paper?paper_name=&paper_id=&author=',
        method: 'GET',
      }).then((response) => {
          data = response.data;
          // console.log(data)
          empty = true
          if(data) {
            empty = false
          }
          res.render('read', {page:'Read Papers',
              menuId:'read',
              data: data,
              reviewer: reviewer,
              empty: empty
          });


      }).catch(function (error) {
          console.log(error)
      });

    let reviewer = false;

    // get readable ids array
    let paperIDs = [0,1];
    let authorsList = [["Luckow", "Fluschnik"],["van Bevern","Fluschnik"]];
    let titles = ["On the Computational Complexity of Length- and Neighborhood-Constrained Path Problems", "Parameterized algorithms and data reduction for the short secluded s-t-path problem∗"];
    // let access = [true, false];




    /*

  for (let i = 0; i < paperIDs.length; i++) {
      let account = web3.eth.accounts[0];
      console.log(account);
      console.log(access);
      access.push(false);
      console.log(access);
      access[i] = await deployedContract.methods.accessPaper(paperIDs[i],account).call();
      console.log(access);

  }
  console.log(access);

    */

};

exports.search_papers = function(req, res, next) {
  id = req.query.inPaperID;
  author = req.query.inAuthorname;
  title = req.query.inTitle;
  console.log('http://35.242.243.4:5000/search-paper?paper_name='+title+'&paper_id='+id+'&author='+author);
  var data;
  axios({
      url: 'http://35.242.243.4:5000/search-paper?paper_name='+title+'&paper_id='+id+'&author='+author,
      method: 'GET',
    }).then((response) => {
        data = response.data;
        // console.log(data)
        empty = true;
        if(data.length > 0) {
          empty = false
        }
        res.render('read', {page:'Read',
            menuId:'read',
            data: data,
            reviewer: false,
            empty: empty
        });


    }).catch(function (error) {
        console.log(error)
    });

}

exports.request_paper_test = function( req, res, next) {
    console.log("read paper");

    // var file = fs.createReadStream('../Papers/1.pdf');
    // var stat = fs.statSync('../Papers/1.pdf');
    // res.setHeader('Content-Length', stat.size);
    // res.setHeader('Content-Type', 'application/pdf');
    // res.setHeader('Content-Disposition', 'attachment; filename='+ +'.pdf');
    // file.pipe(res);

      axios({
          url: 'http://35.242.243.4:5000/read-file?paper_id=0&wallet=0xB76d16f7a6de4EC7AeF27Fc421c4f7bdCa41d1b5',
          method: 'GET',
          responseType: 'stream', // important
        }).then((response) => {
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename='+'quiiiiite' +'.pdf');
            response.data.pipe(res);
        });



};

exports.request_paper_id = function(req, res, next) {

    id = req.params.paper_id;
    title = req.body.title;
    address = req.body.address;
    password = req.body.password;

    console.log(password);
    console.log(address);
    console.log(title);
    /*
     if(!id) {
       res.render('err', {page:'Error', menuId:'read', error:'No ID specified', error_message:"Please specify the ID of the paper you want to read."});
       res.status(501);
     }
     else {
       axios({
           // url: 'http://35.242.243.4:5000/read-file?paper_id='+id+'&wallet=0xB76d16f7a6de4EC7AeF27Fc421c4f7bdCa41d1b5',
           url: 'http://35.242.243.4:5000/read-file',
           method: 'POST',
           responseType: 'stream', // important
            data: {
              paper_id: id,
              wallet: wallet,
              password: password,
            }
         }).then((response) => {
             res.setHeader('Content-Type', 'application/pdf');
             res.setHeader('Content-Disposition', 'attachment; filename='+title+'.pdf');
             response.data.pipe(res);
         }).catch(function (error) {
       // handle error
           var code = error.response.status;
           if (code==400) {
             console.log("Couldn't process request.")
             res.render('err', {page:'Error', menuId:'read', error:"Couldn't process request.", error_message:"The request couldn't be processed by the server"});
             res.status(502);
           }
           else if (code==401) {
             console.log("You're not allowed to read this paper")
             res.render('err', {page:'Error', menuId:'read', error:"Authorization issue", error_message:"You're not allowed to read this paper"});
             res.status(503);
           }

   });

   }

     */
};

exports.confirm_Purchase = async function(req, res, next) {
    const deluxeAddress = "0x5331B7DC51429E5A9057767aB77EA62178Ec3bdf";

    let acs = await deployedContract.methods.accessPaper(0, deluxeAddress).call();
    let reviewer = false;
    console.log(acs);

    // get readable ids array
    let paperIDs = [0,1];
    let authorsList = [["Luckow", "Fluschnik"],["van Bevern","Fluschnik"]];
    let titles = ["On the Computational Complexity of Length- and Neighborhood-Constrained Path Problems", "Parameterized algorithms and data reduction for the short secluded s-t-path problem∗"];
    let access = [true, false];
    res.render('read', {page:'Read',
        menuId:'read',
        paperIDs: paperIDs,
        authorsList: authorsList,
        titles: titles,
        access: access,
        acs: acs,
        reviewer: reviewer});
}

exports.review_paper_id = function(req, res, next) {
  res.render('review', {page:'Review',
      menuId:'review'
  });
}
