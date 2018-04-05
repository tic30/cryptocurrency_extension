//Handle button click
function buy(){
    //Get account number from the seller
    //alert("33");
    var ethAccount = document.getElementById('ethAccount').value;
    var amount = document.getElementById('amount').innerText;
    var message = {
        'ethAccount' : ethAccount,
        'amount' : amount
    }
    chrome.runtime.sendMessage(message);
    console.log('In contentScript read ethAccount is:' + ethAccount + ' amount is:' + amount);

}
//Add button click event
document.getElementById("buyButton").addEventListener("click", buy);