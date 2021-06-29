
const teddies = "http://localhost:3000/api/teddies";
const cameras = "http://localhost:3000/api/cameras";
const furniture = "http://localhost:3000/api/furniture";

let panier = JSON.parse(localStorage.getItem('panier'));


window.onload = getCartItems();

function getCartItems() {

    if (panier === null) {
        panier = [];
    }
    console.table(panier);
    panier.forEach(element => console.log(element));

    writeItems(panier);

}


function writeItems(panier) {

        let elt = document.getElementById('cart__list');

        var content = "";
        for (let i = 0; i < panier.length; i++) {

            console.log ('DEBUG >>> i : ' + i + ' ||| ' + 'panier[i]._id : ' + panier[i]._id + '==========');

            content += `<div class="products__item">
                            <figure class="products__figure">
                                <img src ="` + panier[i].imageUrl + `">
                                <figcaption>
                                    <div class="products__title">
                                        <a href="product.html?id=` + panier[i]._id + `">
                                            <h2 class="products__name">` + panier[i].name + `</h2>
                                        </a>
                                        <p class="products__price">` + panier[i].price + `</p>
                                    </div>
                                </figcaption>
                            </figure>
                        </div>`;
        }

        elt.innerHTML = content;
        console.log("content after loop: " + content);

        //alert('DEBUG content written OK, listen to "Payer".onclick ');

        document.getElementById('Payer').addEventListener('click',() => {

            alert('DEBUG Payer clicked !!');

            executeOrder(panier);

        })

}


function executeOrder() {

    //alert('DEBUG start function executeOrder');

    const firstName = document.getElementById('firstName').value
    const lastName = document.getElementById('lastName').value
    const address = document.getElementById('address').value
    const zipcode = document.getElementById('zipcode').value
    const email = document.getElementById('email').value
    const city = document.getElementById('city').value
  

    console.log('TEST' + zipcode + ' --- ' + new RegExp('[0-9]').test(zipcode));
    console.log('TEST lenght' + zipcode.length);
    


    if (!(
      firstName.length > 1 && new RegExp('[a-zA-Z]').test(firstName)
      && lastName.length > 1 && new RegExp('[a-zA-Z]').test(lastName)
      && email.length > 3 && new RegExp('[\w]{1,}[\w.-]{0,}@[\w-]{2,}([.][a-zA-Z]{2,}|[.][\w-]{2,}[.][a-zA-Z]{2,})').test(email)
      && address.length > 4 && new RegExp('[#.0-9a-zA-Z\s,-]').test(address)
      && zipcode.length >= 4 && zipcode.length <= 5 && new RegExp('[0-9]').test(zipcode)
      && city.length > 1 && new RegExp('[.0-9a-zA-Z\s-]').test(city)
    )) {
      alert("Veuillez verifier que les données du formulaire soient correctes");
      return
    } else {
        alert('DEBUG Input datas are valid, go on');
    };
  
 /* ??????????????????????????????????????
    const panier = Object.values(Cart.products).map((product) => {
      return product._id
    })
 */ 
    //alert('DEBUG go on with JSON parse');

    // QUESTION: Can I make PANIER global to avoid to load once again ??????????
/*    let panier = JSON.parse(localStorage.getItem('panier'));
    if (panier === null) {
        panier = [];
    }
 */  
    console.table(panier);
    console.log('SHOW PANIER ELEMENTS :');
    panier.forEach(element => console.log(element));

    const productsInCart = [];

    for (let i = 0; i < panier.length; i++) {

        console.log ('DEBUG >>> i : ' + i + ' ||| ' + 'panier[i]._id : ' + panier[i]._id + '==========');

        productsInCart[i] = panier[i]._id ;

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

    console.table('requestOptions Table : ' + requestOptions);

    alert('DEBUG ready to show Order (see console)');   

    console.table(order);
    console.log('address : ' + order.contact.address);

    alert("DEBUG show order.contact.address : "  + order.contact.address);

    alert("DEBUG show order.contact (obj.obj) : "  + JSON.stringify(order.contact,null,4));

    //alert('DEBUG ready to make apiUrl');

    const apiUrl = teddies + '/order';
    alert("DEBUG show apiUrl : " + apiUrl );

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((json) => {
        alert('DEBUG fetch executed !');
        console.log(json);
  //      localStorage.removeItem('shoppingCart') ????????????????????????????????????????????????????????????????????
      window.location.href = 'confirmation.html?orderId=' + json.orderId;
        
      //window.location.href = `confirmation.html?orderId=${json.orderId}`;
      })
      .catch(() => {
        alert(error)
      })
  }


