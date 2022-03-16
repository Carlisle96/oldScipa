const abi = [{"constant":false,"inputs":[{"name":"userName","type":"string"},{"name":"userID","type":"uint256"},{"name":"wallet","type":"address"}],"name":"createUser","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getUserName","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getUserID","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"pw","type":"string"}],"name":"hashPassword","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"name":"paperID","type":"uint256"},{"name":"reader","type":"address"}],"name":"accessPaper","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"author","type":"uint256"},{"name":"refs","type":"uint256[]"}],"name":"isAuthorOf","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"paperID","type":"uint256"}],"name":"readPaper","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"getReadable","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getSubmited","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"authors","type":"uint256[]"},{"name":"paperID","type":"uint256"},{"name":"paperTitle","type":"string"},{"name":"ReferenceQuoteIDs","type":"uint256[]"}],"name":"submitPaper","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];
var contractAddress = '0x2ac080b12ad4e88e4fe1d2aa7020934cde35cb5b'

let contractRare;
let contract;

let address;
let changedHome = false;
let user_name;
let balance;
let isUser;


window.addEventListener('load', function() {
    if(typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
        console.log("Metamask sfound !")
    }

    console.log(web3.version.api);
    contractRare = web3.eth.contract(abi);
    contract = contractRare.at(contractAddress);
    address = web3.eth.accounts[0];

    // Load popup if you didnt connect with metamask yet
    if (web3.eth.accounts.length > 0) {
        address = web3.eth.accounts[0];
        if (web3.isAddress(address)) {
            web3.eth.defaultAccount = address;
        }
    } else {
        ethereum.enable(); // loads metamask popup
    }

    // always fetch fresh data
    setInterval(function() {
        updateData();

    }, 1000);


});



async function updateData() {

    address = web3.eth.accounts[0];

    web3.eth.getBalance(address, function(err, bal) {
        balance = bal["c"][0]/10000;
        // console.log(balance);
        $('#balance').html(balance + " ETH")
    })
    $('#address').html(address);

    contract.getUserName.call(function(err, userName){
        user_name = userName;
        $('#name').html(userName);
        if(userName === null) {
            $('#user').show();
            $('#read').hide();
        } else {
            $('#user').hide();
            $('#read').show();
        }
    });




}
