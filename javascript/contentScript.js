function transferETH() {
    var ethAccount = document.getElementById('ethAccount').value;
    var amount = document.getElementById('amount').value;
    var message = {
        'ethAccount': ethAccount,
        'amount': amount
    }
    console.log('try to send ethAccount : ' + ethAccount + ' Metacoin, amount is:' + amount);
    // adding an alert for the users
    var r = confirm("Send " + amount + " MetaCoin(s) to\n" + ethAccount + " ?");
    if (r == true) {
        txt = "Send!";
        chrome.runtime.sendMessage(message);
    } else {
        txt = "You pressed Cancel!";
    }
    alert(txt);
}


document.getElementById("submitButton").addEventListener("click", transferETH);