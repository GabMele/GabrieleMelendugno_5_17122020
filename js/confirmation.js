const teddies = "http://localhost:3000/api/teddies";
const cameras = "http://localhost:3000/api/cameras";
const furniture = "http://localhost:3000/api/furniture";


function writeItem(orderId) {
/*    fetch(productUrl)
    .then(function(res) {
        return res.json();
    })
    .then(function(product) {
*/
        let elt = document.getElementById('orderId');

        var content = "";

        content += `<h1>Commande enregistrée !</h1>
                    <h2>Référence :` + orderId; + `</h2>`;

        elt.innerHTML = content;
        console.log("content : " + content);

/*        document.getElementById('addToCart').addEventListener('click',() => {
            let panier = JSON.parse(localStorage.getItem('panier'));
            if (panier === null) {
                panier = [];
            }
            panier.push({
                id: product._id, price: product.price, name: product.name, imageUrl: product.imageUrl
            })
            localStorage.setItem('panier',JSON.stringify(panier));
            alert('Produit ajouté !');
            document.location.href = 'cart.html';
        })
    })
    .catch(function(err) {
        console.log(err);
        alert(err);
        // Une erreur est survenue
    });
*/
}


window.onload = getorderId();

function getorderId() {
    const queryString = window.location.search;
    console.log('queryString : ' + queryString);

    const urlParameter = new URLSearchParams(queryString);
    console.log('urlParameter' + urlParameter)

    const orderId = urlParameter.get('orderId');
    console.log('orderId' + orderId);

    localStorage.clear();

    writeItem(orderId);

}

