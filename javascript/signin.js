var Web3 = require('web3');
var web3 = new Web3();
var user = 0;
web3.setProvider(new web3.providers.HttpProvider("http://localhost:8545"));
function watchBalance() {
    var coinbase = web3.eth.coinbase;
    //var abi = [{"constant":false,"inputs":[{"name":"receiver","type":"address"},{"name":"amount","type":"uint256"}],"name":"sendCoin","outputs":[{"name":"sufficient","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"addr","type":"address"}],"name":"getBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"}];
    //var abi = [{"constant":false,"inputs":[{"name":"to","type":"address"}],"name":"delegate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"toVoter","type":"address"}],"name":"giveRightToVote","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_numProposals","type":"uint8"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":false,"inputs":[{"name":"toProposal","type":"uint8"}],"name":"vote","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"winningProposal","outputs":[{"name":"_winningProposal","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"}];
    var abi = [{"constant":false,"inputs":[{"name":"receiver","type":"address"},{"name":"amount","type":"uint256"}],"name":"sendCoin","outputs":[{"name":"sufficient","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":true,"inputs":[{"name":"addr","type":"address"}],"name":"getBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]
    var contractAbi = web3.eth.contract(abi);
    var contractAddress = '0xd4affae57522a1118776ee05a789d6b718b45cd1';
    var myContract = contractAbi.at(contractAddress);
    console.log(myContract);

    var coinbase;
    web3.eth.getAccounts(function(err,result){
        coinbase = result[user];
        var receiver = result[1];
        console.log(coinbase);   
        //coinbase = result[2];    
        var originalBalance = web3.eth.getBalance(coinbase).toString(10);//.toNumber();
        //var myContractBalance = myContract.getBalance(coinbase);//.then(function(balance){
            //console.log("Real balance:", myContractBalance.toNumber());
        //})
        //myContract.getBalance(coinbase){

        //}
        
        var myContractBalance = myContract.getBalance(coinbase, function(error,result){
            if(error){
                console.log("Error");
                throw error;
            }else{
                console.log("Real balance:", result.toNumber());
                return result;
            }
        });


        //var myContractBalance = myContract.getBalance(coinbase);
        //console.log("Real balance:", myContractBalance.toNumber());
        
        /*var metaCoinBalance = MetaCoin.deployed().then(function(instance) {
            return instance.getBalance.call(coinbase)
        }).then(function(outCoinBalance){
            balance222=outCoinBalance.toNumber(); 
            return outCoinBalance.toNumber()
        });*/
        console.log(originalBalance);
        console.log(web3.eth.getBalance(coinbase));

        if (user == 0){
            var amount = 10;
            sendMetaCoin(myContract, coinbase, receiver, amount);
        }

        document.getElementById('coinbase').innerText = 'coinbase: ' + coinbase;
        //document.getElementById('original').innerHTML = 'original balance: ' + metaCoinBalance + '<br>watching...';
        web3.eth.filter('latest').watch(function () {
            var currentBalance = web3.eth.getBalance(coinbase)//.toNumber();
            document.getElementById("current").innerText = 'current: ' + currentBalance;
            document.getElementById("diff").innerText = 'diff: ' + (currentBalance - originalBalance);
        });

    });
}

/*
*  send amount from sender to receiver. 
*/
function sendMetaCoin(myContract, sender, receiver, amount){
    myContract.sendCoin(receiver, amount, {from: sender}, function(error,result){
        if(error){
            console.log("Error");
            throw error;
        }else{
            console.log("Send success");
            return result;
        }
    });
}

$(document).ready(function(){
    $("#watchBalanceBtn").click(function(){
        watchBalance();
    });
    $("#signinBtn").click(function(){
        $("#signinBox").hide();
        user = $("#usernameInput").val()=="user1" ? 0:1;
        $("#page-title").html($("#usernameInput").val());
    });
})