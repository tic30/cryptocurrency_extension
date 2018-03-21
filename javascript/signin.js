var Web3 = require('web3');
var web3 = new Web3();
var user = 0;
web3.setProvider(new web3.providers.HttpProvider("http://localhost:9545"));
function watchBalance() {
    //var coinbase = web3.eth.coinbase;
    var coinbase;
    web3.eth.getAccounts(function(err,result){
        coinbase = result[user];    
        var originalBalance = web3.eth.getBalance(coinbase).toNumber();
        document.getElementById('coinbase').innerText = 'coinbase: ' + coinbase;
        document.getElementById('original').innerHTML = 'original balance: ' + originalBalance + '<br>watching...';
        web3.eth.filter('latest').watch(function () {
            var currentBalance = web3.eth.getBalance(coinbase).toNumber();
            document.getElementById("current").innerText = 'current: ' + currentBalance;
            document.getElementById("diff").innerText = 'diff: ' + (currentBalance - originalBalance);
        });
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