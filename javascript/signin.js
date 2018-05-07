//var Web3 = require('web3');
var web3 = new Web3();
var user = 0;


var account = "";

web3.setProvider(new web3.providers.HttpProvider("http://localhost:8545"));
// var receiver,
//     coinbase,
//     amount = 10;
abi = [{
    "constant": false,
    "inputs": [{"name": "receiver", "type": "address"}, {"name": "amount", "type": "uint256"}],
    "name": "sendCoin",
    "outputs": [{"name": "sufficient", "type": "bool"}],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "anonymous": false,
    "inputs": [{"indexed": true, "name": "_from", "type": "address"}, {
        "indexed": true,
        "name": "_to",
        "type": "address"
    }, {"indexed": false, "name": "_value", "type": "uint256"}],
    "name": "Transfer",
    "type": "event"
}, {"inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor"}, {
    "constant": true,
    "inputs": [{"name": "addr", "type": "address"}],
    "name": "getBalance",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}]
contractAbi = web3.eth.contract(abi);
contractAddress = '0x0ca65373f27a9d920703bf81c2b71d3ed34919a4';
myContract = contractAbi.at(contractAddress);

function watchBalance() {
    // var coinbase = web3.eth.coinbase;
    //var abi = [{"constant":false,"inputs":[{"name":"receiver","type":"address"},{"name":"amount","type":"uint256"}],"name":"sendCoin","outputs":[{"name":"sufficient","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"addr","type":"address"}],"name":"getBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"}];
    //var abi = [{"constant":false,"inputs":[{"name":"to","type":"address"}],"name":"delegate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"toVoter","type":"address"}],"name":"giveRightToVote","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_numProposals","type":"uint8"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":false,"inputs":[{"name":"toProposal","type":"uint8"}],"name":"vote","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"winningProposal","outputs":[{"name":"_winningProposal","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"}];

    console.log("myContract is ", myContract);

    var originalBalance = web3.fromWei(web3.eth.getBalance(account))//.toString(10);//.toNumber();
    document.getElementById("original").innerText = originalBalance//+parseFloat(originalBalance).toFixed(2);
    //var myContractBalance = myContract.getBalance(coinbase);//.then(function(balance){
    //console.log("Real balance:", myContractBalance.toNumber());
    //})
    //myContract.getBalance(coinbase){

    //}

    // var myContractBalance = myContract.getBalance(coinbase, function(error,result){
    //     if(error){
    //         console.log("Error");
    //         throw error;
    //     }else{
    //         console.log("Real balance:", result.toNumber());
    //         $("#balance").html(result.toNumber());
    //         return result;
    //     }
    // });


    //var myContractBalance = myContract.getBalance(coinbase);
    //console.log("Real balance:", myContractBalance.toNumber());

    /*var metaCoinBalance = MetaCoin.deployed().then(function(instance) {
        return instance.getBalance.call(coinbase)
    }).then(function(outCoinBalance){
        balance222=outCoinBalance.toNumber();
        return outCoinBalance.toNumber()
    });*/
    // console.log(originalBalance);
    // console.log(web3.eth.getBalance(coinbase));

    // if (user == 0){
    //     var amount = 10;
    //     sendMetaCoin(myContract, coinbase, receiver, amount);
    // }

    // document.getElementById('coinbase').innerText = 'coinbase: ' + coinbase;
    //document.getElementById('original').innerHTML = 'original balance: ' + metaCoinBalance + '<br>watching...';
    web3.eth.filter('latest').watch(function () {
        var currentBalance = web3.fromWei(web3.eth.getBalance(account))//.toNumber();
        currentBalance = currentBalance//+parseFloat(currentBalance).toFixed(2);
        document.getElementById("current").innerText = currentBalance;
        var diff = currentBalance - originalBalance //+parseFloat(currentBalance - originalBalance).toFixed(2);
        document.getElementById("diff").innerText = diff;
        //metacoin
        myContract.getBalance(account, function (error, result) {
            if (error) {
                console.log("Error");
                throw error;
            } else {
                console.log("Real balance:", result.toNumber());
                $("#balance").html(result.toNumber());
                // return result;
            }
        });
    });

}

// /*
// *  send amount from sender to receiver.
// */
// function sendMetaCoin(myContract, sender, receiver, amount){
//     myContract.sendCoin(receiver, amount, {from: sender}, function(error,result){
//         if(error){
//             console.log("Error");
//             throw error;
//         }else{
//             console.log("Send success");
//             return result;
//         }
//     });
// }

// /**
//  * Get the current URL.
//  */
// function getCurrentTabUrl(callback) {
//   // Query filter to be passed to chrome.tabs.query - see
//   // https://developer.chrome.com/extensions/tabs#method-query
//   var queryInfo = {
//     active: true,
//     currentWindow: true
//   };
//
//   chrome.tabs.query(queryInfo, (tabs) => {
//     var tab = tabs[0];
//     var url = tab.url;
//     callback(url);
//   });
// }
//
// function listenFromContentScript(){
//     chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//         if (request.action == "buy") {
//             console.log("Receive message from contentScript");
//
//             //Receive message
//             var message = request.message;
//             console.log("Receive message is:" + message["ethAccount"]);
//
//             //Call send coin to ethAccount
//
//         }
//     });
// }

//first account: 0x572d074dcdc87f90ba11150a172a52c438d8a0e3

function checkAccount(account) {
    web3.eth.getAccounts(function (err, result) {
        $("#loadingHint").hide();
        for (var i in result) {
            console.log(result[i]);
            if (account == result[i]) {
                chrome.storage.local.set({'account': account}, function () {
                    console.log('account is set to ' + account);
                });
                $("#signinBox").hide();
                $("#username").html(account);
                watchBalance();
                return;
            }
        }
        $("#invalidHint").show();
    });
}

$(document).ready(function () {
    $("#invalidHint").hide();
    $("#loadingHint").hide();
    chrome.storage.local.get(['account'], function (result) {
        console.log('account is ', result.account);
        account = result.account;
        if (account != undefined && account != null && account != "") {
            $("#signinBox").hide();
            $("#username").html(account);
            watchBalance();
        }
    });

    $("#signinBtn").click(function () {
        account = $("#accountInput").val();
        checkAccount(account);
        $("#loadingHint").show();
    });

    $("#signout").click(function () {
        chrome.storage.local.set({'account': ""}, function () {
            console.log('account is set to ""');
        });
        $("#signinBox").show();
        $("#accountInput").val("");
    });

    // //Add listener
    // listenFromContentScript();


})