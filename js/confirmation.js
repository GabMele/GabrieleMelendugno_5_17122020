const teddies = "http://localhost:3000/api/teddies";
const cameras = "http://localhost:3000/api/cameras";
const furniture = "http://localhost:3000/api/furniture";


  
  window.onload = getOrder();
  
  function getOrder() {

    if (localStorage.getItem('orderId') != null) {
        alert('DEBUG avant json loop');  
        
        for (var i = 0; i < localStorage.length; i++){
            alert(localStorage.getItem(localStorage.key(i)));
        }

        alert('DEBUG avant json parse');        

        var orderId = localStorage.getItem('orderId');



        var orderReceipt = JSON.parse(localStorage.getItem('orderReceipt'));


        alert('DEBUG apres json parse');
        console.table(orderReceipt);
        alert('DEBUG see order in console');

        //order.forEach(element => console.log(element));
        alert('DEBUT order forEach written; see console');
        //   localStorage.clear;  
        writeItem(orderReceipt);

    } else {
        alert('Oups ! Commande vide :(');
    }

  }


function writeItem(orderReceipt) {
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

        let elt = document.getElementById('orderReceipt');

        var content = "";

        console.table('orderReceipt : ' + orderReceipt);
        alert('orderReceipt written, see console');

        content += `<div class="container mt-5 p-5 alert alert-success" role="alert">
                        <h2>Félicitations ` + orderReceipt[0].firstName + `,</h2>
                        <h3>Votre commande a bien été validée !</h3>
                        <h5>Code commande : ` + orderReceipt[0].orderId + `</h5>
                        <h3>Montant commande : ` + orderReceipt[0].totalAmount + ` €</h3> 
                    </div>`;

        elt.innerHTML = content;
        console.log("content : " + content);

}

