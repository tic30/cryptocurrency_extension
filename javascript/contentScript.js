function transferETH() {
    var ethAccount = document.getElementById('ethAccount').value;
    var amount = document.getElementById('amount').value;
    var message = {
        'ethAccount': ethAccount,
        'amount': amount
    }
    chrome.runtime.sendMessage(message);
    console.log('In contentScript read ethAccount is:' + ethAccount + ' amount is:' + amount);

}

//Add button click event
document.getElementById("submitButton").addEventListener("click", transferETH);