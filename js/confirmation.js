const teddies = "http://localhost:3000/api/teddies";
const cameras = "http://localhost:3000/api/cameras";
const furniture = "http://localhost:3000/api/furniture";


  
  window.onload = getOrder();
  
  function getOrder() {

    if (localStorage.getItem('order') != null) {
        let order = JSON.parse(localStorage.getItem('order'));
        console.table(order);
        alert('DEBUG see order in console');

        order.forEach(element => console.log(element));
        alert('DEBUT order forEach written; see console');
        //   localStorage.clear;  
        writeItem(order);

    } else {
        alert('Oups ! Commande vide :(');
    }

  }


function writeItem(order) {
/*    fetch(productUrl)
    .then(function(res) {
        return res.json();
    })
    .then(function(product) {
*/

/*
    let firstName = order.firstName; 
    let orderId = order.orderId;
    let totalAmount = order.totlalAmount;

*/

        let elt = document.getElementById('order');

        var content = "";

        content += `<div class="alert alert-success" role="alert">
                        <h2>Félicitations, ` + order.firstName + ` ! Commande enregistrée !</h2>
                        <h3>Code commande : ` + order.orderId + `</h3>
                        <h3>Montant commande : ` + order.totalAmount + ` €</h3> 
                    </div>`;

        elt.innerHTML = content;
        console.log("content : " + content);

}

