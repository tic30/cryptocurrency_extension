//var Web3 = require('web3');
var myContract;
var user = 0;
var myAccount = 0;
function initWallet(){
	//Init web3
	web3 = new Web3();
	web3.setProvider(new web3.providers.HttpProvider("http://localhost:8545"));
	var receiver,
	    coinbase,
	    amount = 100;
	    abi = [{"constant":false,"inputs":[{"name":"receiver","type":"address"},{"name":"amount","type":"uint256"}],"name":"sendCoin","outputs":[{"name":"sufficient","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":true,"inputs":[{"name":"addr","type":"address"}],"name":"getBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]
	    contractAbi = web3.eth.contract(abi);
	    contractAddress = '0x0ca65373f27a9d920703bf81c2b71d3ed34919a4';
	    myContract = contractAbi.at(contractAddress);
}

/*
*  send amount from sender to receiver. 
*/
function sendMetaCoin(sender, receiver, amount){
	console.log("sendMetaCoin from " + sender + " to " + receiver + " amount: " + amount);
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



/*
** Valid message
*/
function validateInput(message){
	//Valid amount

	//Valid account

	return true;
}

initWallet()
console.log("Init Wallet success");
chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete' && tab.active) {

  	chrome.tabs.executeScript(null, {file : "javascript/contentScript.js"});

  	chrome.runtime.onMessage.addListener(
	    function(message, sender, sendResponse){
	        console.log("Receive new buy request ethAccount: " + message.ethAccount + " Amount:" + message.amount);
            chrome.storage.local.get(['account'], function (result) {
                account = result.account;
                if (account != undefined && account != null && account != "") {
                    if (!validateInput(message)){
                        alert("Please input valid account");
                    } else {
                        //Send metacoin
                        sendMetaCoin(account, message.ethAccount, message.amount);
                    }
                } else {
                    alert("Please login your account first");
                }
            });

	    }
	);
  }
})

