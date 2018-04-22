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
contractAddress = '0xc67d933635bd6ee832c6000c590442db50ccabaa';
myContract = contractAbi.at(contractAddress);

function watchBalance() {
    // var coinbase = web3.eth.coinbase;
    //var abi = [{"constant":false,"inputs":[{"name":"receiver","type":"address"},{"name":"amount","type":"uint256"}],"name":"sendCoin","outputs":[{"name":"sufficient","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"addr","type":"address"}],"name":"getBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"}];
    //var abi = [{"constant":false,"inputs":[{"name":"to","type":"address"}],"name":"delegate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"toVoter","type":"address"}],"name":"giveRightToVote","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_numProposals","type":"uint8"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":false,"inputs":[{"name":"toProposal","type":"uint8"}],"name":"vote","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"winningProposal","outputs":[{"name":"_winningProposal","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"}];

    console.log("myContract is ", myContract);

    var originalBalance = web3.fromWei(web3.eth.getBalance(account))//.toString(10);//.toNumber();
    document.getElementById("original").innerText = originalBalance//+parseFloat(originalBalance).toFixed(2);

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