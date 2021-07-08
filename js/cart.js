
const teddies = "http://localhost:3000/api/teddies";
const cameras = "http://localhost:3000/api/cameras";
const furniture = "http://localhost:3000/api/furniture";

//if (localStorage.getItem('panier') != null) {
  let panier = JSON.parse(localStorage.getItem('panier'));
  console.table(panier);
  //alert('DEBUG see panier in console');
//}

window.onload = getCartItems();

function getCartItems() {

    //   localStorage.clear;
    if (panier == null) {       
      panier = [];
    }
    console.table(panier);
    //alert('DEBUT panier written; see console');
    panier.forEach(element => console.log(element));
    //alert('DEBUT panier forEach written; see console');

    writeItems(panier);

}


function writeItems(panier) {

        let elt = document.getElementById('cart__list');

        var content = "";
        let totalAmount = 0;

        for (let i = 0; i < panier.length; i++) {

            console.log ('DEBUG >>> i : ' + i + ' + ' + 'panier[i]._id : ' + panier[i]._id + '<----');

            totalAmount += panier[i].price ;

            content += `<tr class="cart__item p-4 m-4 bg-white">
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
        console.log("content after loop: " + content);

        //alert('DEBUG content written OK, listen to "Payer".onclick ');

        document.getElementById('Payer').addEventListener('click',() => {

            alert('DEBUG Payer clicked !!');

            executeOrder(panier);

        })

       document.getElementById('Empty').addEventListener('click',() => {

            alert('DEBUG Empty clicked !!');

            panier = [];

            //localStorage.clear;
            localStorage.removeItem('panier');
            window.location.reload();

        })   

}




function executeOrder(panier) {

    alert('DEBUG start function executeOrder');


    alert('check panier :' + panier);

    console.log("check PANIER ----------------");
    console.table(panier);

    if (!(Array.isArray(panier) && panier.length)) {
      alert('Le panier est vide, vous allez être redigirés sur la page Accueil pour choisir vos produits.');
      //window.location.reload('index.html');
      document.location.href = 'index.html';
      return
    }

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const address = document.getElementById('address').value;
    const zipcode = document.getElementById('zipcode').value;
    const email = document.getElementById('email').value;
    const city = document.getElementById('city').value;
  
    
    alert('TEST email: ' + email + '- VALIDE ? ---> ' + new RegExp(`^[^@\s]+@[^@\s]+\.[^@\s]+$`).test(email));
    //alert('TEST lenght' + email.length);

    //alert('before IF');
 
    //     && */ email.length > 3 && new RegExp('[\w]{1,}[\w.-]{0,}@[\w-]{2,}([.][a-zA-Z]{2,}|[.][\w-]{2,}[.][a-zA-Z]{2,})').test(email)


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
        alert('DEBUG Input datas are valid, go on');
    };
  
 /* ???
    const panier = Object.values(Cart.products).map((product) => {
      return product._id
    })
 */ 
 
    console.table(panier);
    console.log('SHOW PANIER ELEMENTS :');
    panier.forEach(element => console.log(element));

    let productsInCart = [];
    let totalAmount = 0;

    for (let i = 0; i < panier.length; i++) {

        console.log ('DEBUG >>> i : ' + i + ' ||| ' + 'panier[i]._id : ' + panier[i]._id + '==========');

        productsInCart[i] = panier[i]._id;
        totalAmount += panier[i].price;

    }

    alert('DEBUG make order with this PANIER : see console');

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
  
    console.log('PANIER : ---------------')
    console.table(panier);
    console.log('ORDER productsInCart : ---------------')
    console.table(productsInCart);

    //alert('DEBUG show order: ' + order);

    alert('DEBUG ready to declare requestOptions');

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(order)
    }
    
    //alert('DEBUG ready to show requestOptions (see console)');
    console.log('requestOptions : ' + requestOptions);

    console.table(requestOptions);

    console.table('requestOptions Table : ');

    console.table('requestOptions Table : ' + requestOptions);

    alert('DEBUG ready to show Order (see console)');   

    console.table(order);
    console.log('address : ' + order.contact.address);

    //alert("DEBUG show order.contact.address : "  + order.contact.address);

    //alert("DEBUG show order.contact (obj.obj) : "  + JSON.stringify(order.contact,null,4));

    //alert('DEBUG ready to make apiUrl');

    const apiUrl = teddies + '/order';
    alert("DEBUG show apiUrl : " + apiUrl );

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((json) => {
        alert('DEBUG fetch executed !');
        console.log(json);

        alert(JSON.stringify(json, 'json : ', 4));

        console.table('json' + '--------------------------');
        console.table(json);

        alert('orderId' + json.orderId + ' - firstName: ' + json.contact.firstName + ' - totalAmount' + totalAmount);

        localStorage.removeItem('panier');

        let orderReceipt = [];

        alert ('do let order');

        orderReceipt.push({
          orderId: json.orderId, firstName: order.contact.firstName, totalAmount: totalAmount
        })

        alert ('let order OK, order.push OK, set localstorage');

        localStorage.setItem('orderReceipt',JSON.stringify(orderReceipt));


        alert ('set objct in localstorage OK');

        localStorage.setItem('orderId', json.orderId); 
        localStorage.setItem('firstName', order.contact.firstName); 
        localStorage.setItem('totalAmount',totalAmount); 
      
      
  //---------------------------

 //   let order = JSON.parse(localStorage.getItem('order'));
 //   if (order === null) {
        //let order = {};

// ??????????????????? how to clear order in localstorage ???????????????????

//    }
    //order.push({
       // orderId: json.orderId, firstName: firstName, totalAmount: totalAmount
   // })
    localStorage.setItem('orderId',json.orderId);
    alert('Commande ajoutée !');
    document.location.href = 'confirmation.html';


  //------------------------------  
  
      //window.location.href = 'confirmation.html?orderId=' + json.orderId;
        
      //window.location.href = `confirmation.html?orderId=${json.orderId}`;
      })
      .catch(() => {
        alert(error => console.error(error))
      })
  }


