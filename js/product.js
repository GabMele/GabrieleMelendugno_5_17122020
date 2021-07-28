const teddies = "http://localhost:3000/api/teddies";
const cameras = "http://localhost:3000/api/cameras";
const furniture = "http://localhost:3000/api/furniture";


function loadItem(productUrl) {
    fetch(productUrl)
    .then(function(res) {
        return res.json();
    })
    .then(function(product) {

        //console.table(product);
        let elt = document.getElementById('product__details');
        var content = "";
        content += `<div class="products__item">
                            <figure class="products__figure">
                                <img class="img-fluid w-100" src="` + product.imageUrl + `">
                                <figcaption class="pt-1">
                                    <div class="flex-space-between">    
                                        <h2>` + product.name + `</h2>
                                        <h3>` + product.price + ` €</h3>
                                    </div>
                                    <p class="text-left">` + product.description + `</p>
                                </figcaption>
                            </figure>
                        <select id="products__options"></select>
                    </div>`;
        elt.innerHTML = content;

        //console.table(product);

        if (typeof product.colors != "undefined") {

            let select = document.getElementById('products__options');
            //console.log(product.colors);
            for (let i = 0; i<product.colors.length; i++) {
                //console.log(product.colors[i]);
                select.innerHTML += '<option value="' + product.colors[i] + '">' + product.colors[i] + '</option>';
            }
        }

        document.getElementById('addToCart').addEventListener('click',() => {
            let panier = JSON.parse(localStorage.getItem('panier'));
            if (panier === null) {
                panier = [];
            }
            panier.push({
                _id: product._id, price: product.price, name: product.name, imageUrl: product.imageUrl
            })
            localStorage.setItem('panier',JSON.stringify(panier));
            alert('Le produit ' + product.name + ' a été ajouté au panier !');
            document.location.href = 'cart.html';
        })
    })
    .catch(function(err) {
        console.log(err);
        alert(err);
        // Une erreur est survenue
    });
}

window.onload = getItem();

function getItem() {
    const queryString = window.location.search;
    //console.log('queryString : ' + queryString);

    const urlParameter = new URLSearchParams(queryString);
    //console.log('urlParameter' + urlParameter)

    const id = urlParameter.get('id');
    //console.log('id' + id)

    loadItem(teddies + '/' + id);
}

