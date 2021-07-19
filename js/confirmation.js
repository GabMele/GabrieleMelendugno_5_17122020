const teddies = "http://localhost:3000/api/teddies";
const cameras = "http://localhost:3000/api/cameras";
const furniture = "http://localhost:3000/api/furniture";

window.onload = getOrder();
  
function getOrder() {
    let orderReceipt = JSON.parse(localStorage.getItem('orderReceipt'));
    // we retrieve order datas stored in localStorage
    if (orderReceipt != null) {
        // since order datas exist we can output the HTML results calling the function
        writeItem(orderReceipt);
    } else {
        // something went not as planned, i.e. user that types url in browser: let's show an alert to notify the user
        alert('Oups ! Commande vide :(');
    }
}


function writeItem(orderReceipt) {
    let elt = document.getElementById('orderReceipt');
    var content = "";
    content += `<div class="container m-5 p-5 alert-success" role="alert">
                    <h2>Félicitations ` + orderReceipt[0].firstName + `,</h2>
                    <h3>Votre commande a bien été validée !</h3>
                    <h5>Code commande : ` + orderReceipt[0].orderId + `</h5>
                    <h3>Montant commande : ` + orderReceipt[0].totalAmount + ` €</h3> 
                </div>`;
    elt.innerHTML = content;
    localStorage.removeItem('orderReceipt');
    // after HTML output we clear localStorage
}

