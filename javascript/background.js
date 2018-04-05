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
	    amount = 10;
	    abi = [{"constant":false,"inputs":[{"name":"receiver","type":"address"},{"name":"amount","type":"uint256"}],"name":"sendCoin","outputs":[{"name":"sufficient","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":true,"inputs":[{"name":"addr","type":"address"}],"name":"getBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]
	    contractAbi = web3.eth.contract(abi);
	    contractAddress = '0xf9ce759df6eca5ec38caf0926aeb027b7f12de8c';
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
** Get my account. If not login, return 0;
*/
function getMyAccount(){
	if (myAccount == 0){
		//TODO: Get My Account from extension storage
		myAccount = "0xfe1bfe2d0f73b3b53298891b4567aac29f666c7d";
	}
	return myAccount;
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
	        
	        myAccount = getMyAccount();
	        if (myAccount == 0){
	        	//Not login
	        	alert("Please login your account first");
	        	return;
	        }

	        if (!validateInput(message)){
	        	alert("Please input valid account");
	        	return;
	        }

	       	//Send metacoin 
	       	sendMetaCoin(myAccount, message.ethAccount, message.amount);
	     //   	web3.eth.getAccounts(function(err,result){
		    // 	coinbase = result[user];
		    // 	receiver = result[user==0?1:0];
		    // 	sendMetaCoin(coinbase, receiver, 10);
		    // });
	    }
	);
  }
})

