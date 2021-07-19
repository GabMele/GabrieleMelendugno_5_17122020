const teddies = "http://localhost:3000/api/teddies";
const cameras = "http://localhost:3000/api/cameras";
const furniture = "http://localhost:3000/api/furniture";

let panier = JSON.parse(localStorage.getItem('panier'));
// we load the cart items stored in localStorage
//console.table(panier);

window.onload = checkCart();

function checkCart() {
    let mainsection = document.getElementById('main');
    let emptyCartSection = document.getElementById('empty-cart');
    // Both divs <emptyCartSection> and <main> are hidden in html using class d-name to prevent->
    // -> showing them before js rendering;
    // so we activate one or other div (just removing the d-none class) by the following IF

    if (panier == null) {       
        panier = [];
        alert('Panier vide !');
        emptyCartSection.className = 'container m-5 p-5 alert-warning';

    } else {
        // cart is not empty so we can show the div and call the function to output the HTML
        mainsection.className = 'container width-products-list';
        writeItems(panier);
    }
}


function writeItems(panier) {

    let elt = document.getElementById('cart__list');
    var content = "";
    let totalAmount = 0;
    // totalAmount is the sum of the prices of items in cart:
    // -> it will be showed at the end of the table and written in localStorage

    for (let i = 0; i < panier.length; i++) {
        totalAmount += panier[i].price ;
        content += `<tr class="p-4 m-4 bg-white">
                        <td><img class="cart__itemimg" src="` + panier[i].imageUrl + `"></td>
                        <td><a href="product.html?id=` + panier[i]._id + `"><h5>` + panier[i].name + `</h5></a></td>
                        <td></td>
                        <td><h5>` + panier[i].price + ` €</h5></td>
                        <td></td>
                    </tr>`;
    };

    content += `<tr class="bg-warning">
                  <td></td>
                  <td><h3>TOTAL</h3></td>
                  <td></td>
                  <td><h3>` + totalAmount + `</h3></td>
                  <td></td>
                </tr>`;
    elt.innerHTML = content;
    //alert('DEBUG content written OK, listen to "Payer".onclick ');
    document.getElementById('Payer').addEventListener('click',() => {
        //alert('DEBUG Payer clicked !!');
        executeOrder(panier);
    })

    document.getElementById('Empty').addEventListener('click',() => {
        //alert('DEBUG Empty clicked !!');
        panier = [];
        //localStorage.clear;
        localStorage.removeItem('panier');
        window.location.reload();
    })   

}


function executeOrder(panier) {
    //alert('DEBUG start function executeOrder');
    //console.log("check PANIER ----------------");
    //console.table(panier);

    // the following if can check if cart is empty but we already did this control before ->
    // so the following 5 lines are not used, could be used if any change in js logic will be made
    /*
    if (!(Array.isArray(panier) && panier.length)) {
      alert('Le panier est vide, vous allez être redigirés sur la page Accueil pour choisir vos produits.');
      //window.location.reload('index.html');
      document.location.href = 'index.html';
      return
    }
    */

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const address = document.getElementById('address').value;
    const zipcode = document.getElementById('zipcode').value;
    const email = document.getElementById('email').value;
    const city = document.getElementById('city').value;

    if (!(firstName.length > 1 && new RegExp('[a-zA-Z]').test(firstName)
      && lastName.length > 1 && new RegExp('[a-zA-Z]').test(lastName)
      && email.length > 5 && new RegExp('^[^@\s]+@[^@\s]+\.[^@\s]+$').test(email)
      && address.length > 3 && new RegExp('[#.0-9a-zA-Z\s,-]').test(address)
      && zipcode.length >= 4 && zipcode.length <= 5 && new RegExp('[0-9]').test(zipcode)
      && city.length > 1 && new RegExp('[.0-9a-zA-Z\s-]').test(city)
    )) {
      alert("Veuillez verifier que les données du formulaire soient correctes");
      return
    } else {
        // input datas are ok so we can go on
        // alert('DEBUG Input datas are valid, go on');
    };
 
    //console.table(panier);
    //console.log('SHOW PANIER ELEMENTS :');
    //panier.forEach(element => console.log(element));

    let productsInCart = [];
    let totalAmount = 0;

    // Creation of an array with only the "_id" datas of items in cart, to be sent to the api
    for (let i = 0; i < panier.length; i++) {
        //console.log ('DEBUG >>> i : ' + i + ' ||| ' + 'panier[i]._id : ' + panier[i]._id + '==========');
        productsInCart[i] = panier[i]._id;
        totalAmount += panier[i].price;
    }

    // following object is made by user datas + products (id only) array ->
    // -> to be sent to the api to execute order
    const order = {
      contact: {
        firstName: firstName,
        lastName: lastName,
        address: address + ' ' + zipcode,
        city: city,
        email: email,
      },
        products: productsInCart,
    }
  
    //console.log('PANIER : ---------------')
    //console.table(panier);
    //console.log('ORDER productsInCart : ---------------')
    //console.table(productsInCart);
    //alert('DEBUG show order: ' + order);

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(order)
    }
    
    //console.table('requestOptions Table : ' + requestOptions);
    //console.table(order);
    //console.log('address : ' + order.contact.address);
    //alert("DEBUG show order.contact.address : "  + order.contact.address);
    //alert("DEBUG show order.contact (obj.obj) : "  + JSON.stringify(order.contact,null,4));

    const apiUrl = teddies + '/order';
    //alert("DEBUG show apiUrl : " + apiUrl );

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((json) => {
        //alert('DEBUG fetch executed !');
        //alert(JSON.stringify(json, 'json : ', 4));
        //console.table('json' + '--------------------------');
        //console.table(json);
        //alert('orderId' + json.orderId + ' - firstName: ' + json.contact.firstName + ' - totalAmount' + totalAmount);

        // since cart items are sent to the api to be processed we can clear the localStorage
        localStorage.removeItem('panier');
        let orderReceipt = [];
        // we got the orderId from the api, now we will write data in the orderReceipt object
        orderReceipt.push({
          orderId: json.orderId, firstName: order.contact.firstName, totalAmount: totalAmount
        })

        //alert ('order.push OK, set localstorage');

        // we store the orderReceipt object in localStorage, but we need to convert it ->
        // -> in a string since in localStorage we can store only arrays and not objects 
        localStorage.setItem('orderReceipt',JSON.stringify(orderReceipt));
        
        //alert ('set objct in localstorage OK');

        //localStorage.setItem('orderId', json.orderId); 
        //localStorage.setItem('firstName', order.contact.firstName); 
        //localStorage.setItem('totalAmount',totalAmount); 

        alert('Commande ajoutée !');
        document.location.href = 'confirmation.html';

      //window.location.href = 'confirmation.html?orderId=' + json.orderId;        
      //window.location.href = `confirmation.html?orderId=${json.orderId}`;
      })
      .catch(() => {
        alert(error => console.error(error))
    })
}


