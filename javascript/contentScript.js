//Handle button click
function buy(){
    //Get account number from the seller
    //alert("33");
    var ethAccount = document.getElementById('ethAccount').value;
    var message = {
        'ethAccount' : ethAccount,
    }
    chrome.runtime.sendMessage(message);
    console.log('read ethAccount is:' + ethAccount);
    //alert("33");

}
//Add button click event
document.getElementById("buyButton").addEventListener("click", buy);