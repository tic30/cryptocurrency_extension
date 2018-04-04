//var Web3 = require('web3');
var myContract;
var user = 0;
function initWallet(){
	alert("aa");
	//Init web3
	
	web3 = new Web3();
	web3.setProvider(new web3.providers.HttpProvider("http://localhost:8545"));
	var receiver,
	    coinbase,
	    amount = 10;
	    abi = [{"constant":false,"inputs":[{"name":"receiver","type":"address"},{"name":"amount","type":"uint256"}],"name":"sendCoin","outputs":[{"name":"sufficient","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":true,"inputs":[{"name":"addr","type":"address"}],"name":"getBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]
	    contractAbi = web3.eth.contract(abi);
	    contractAddress = '0xd4affae57522a1118776ee05a789d6b718b45cd1';
	    myContract = contractAbi.at(contractAddress);

	//TODO: Get My Account from extension storage

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
alert('Here');
initWallet()
alert('Here');
chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete' && tab.active) {
  	
  	//alert('Here');
  	chrome.tabs.executeScript(null, {file : "javascript/contentScript.js"});

  	chrome.runtime.onMessage.addListener(
	    function(message, sender, sendResponse){      
	       console.log(message.ethAccount);
	       alert(message.ethAccount);
	       web3.eth.getAccounts(function(err,result){
		    	coinbase = result[user];
		    	receiver = result[user==0?1:0];
		    	sendMetaCoin(coinbase, receiver, 10);
		    });
	    }
	);
  }
})

