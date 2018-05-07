function transferETH() {
    var ethAccount = document.getElementById('ethAccount').value;
    var amount = document.getElementById('amount').value;
    showConfirm(ethAccount, amount);
}

function showConfirm(ethAccount, amount){
	var result = confirm('Are you sure to pay account[' + ethAccount + '] metacoin[' + amount + ']!');
	if (result){
		actuallySend(ethAccount, amount);
	}
}

function actuallySend(ethAccount, amount){
	var message = {
        'ethAccount': ethAccount,
        'amount': amount
    }
	chrome.runtime.sendMessage(message);
    console.log('In contentScript read ethAccount is:' + ethAccount + ' amount is:' + amount);
}



//Add button click event
document.getElementById("submitButton").addEventListener("click", transferETH);