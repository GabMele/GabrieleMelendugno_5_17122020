const teddies = "http://localhost:3000/api/teddies";
const cameras = "http://localhost:3000/api/cameras";
const furniture = "http://localhost:3000/api/furniture";

window.onload = getOrder();
  
function getOrder() {
    let orderReceipt = JSON.parse(localStorage.getItem('orderReceipt'));
    if (orderReceipt != null) {      
        writeItem(orderReceipt);
    } else {
        alert('Oups ! Commande vide :(');
    }
}


function writeItem(orderReceipt) {
    let elt = document.getElementById('orderReceipt');
    var content = "";
    content += `<div class="container m-5 p-5 alert alert-success" role="alert">
                    <h2>Félicitations ` + orderReceipt[0].firstName + `,</h2>
                    <h3>Votre commande a bien été validée !</h3>
                    <h5>Code commande : ` + orderReceipt[0].orderId + `</h5>
                    <h3>Montant commande : ` + orderReceipt[0].totalAmount + ` €</h3> 
                </div>`;
    elt.innerHTML = content;
    localStorage.removeItem('orderReceipt');
}

