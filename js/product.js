const teddies = "http://localhost:3000/api/teddies";
const cameras = "http://localhost:3000/api/cameras";
const furniture = "http://localhost:3000/api/furniture";


function loadItem(productUrl) {
    fetch(productUrl)
    .then(function(res) {
        return res.json();
    })
    .then(function(product) {

        console.table(product);

        let elt = document.getElementById('product__details');

        var content = "";
        content += `<div class="products__item">
                            <figure class="products__figure">
                                <img src ="` + product.imageUrl + `">
                                <figcaption>
                                    <div class="products__title">
                                        <a href="product.html?id=` + product._id + `">
                                            <h2 class="products__name">` + product.name + `</h2>
                                        </a>
                                        <p class="products__price">` + product.price + `</p>
                                    </div>
                                    <p class="products__description">` + product.description + `</p>
                                </figcaption>
                            </figure>
                            <select id="products__options"></select>

                        </div>`;
        elt.innerHTML = content;

        let select = document.getElementById('products__options');
        console.log(product.colors);
        for (let i = 0; i<product.colors.length; i++) {
            console.log(product.colors[i]);
            select.innerHTML += '<option value="' + product.colors[i] + '">' + product.colors[i] + '</option>';
        }

        console.log("content after loop: " + content);

        document.getElementById('addToCart').addEventListener('click',() => {
            let panier = JSON.parse(localStorage.getItem('panier'));
            if (panier === null) {
                panier = [];
            }
            panier.push({
                _id: product._id, price: product.price, name: product.name, imageUrl: product.imageUrl
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
}


window.onload = getItem();

function getItem() {
    const queryString = window.location.search;
    console.log('queryString : ' + queryString);

    const urlParameter = new URLSearchParams(queryString);
    console.log('urlParameter' + urlParameter)

    const id = urlParameter.get('id');
    console.log('id' + id)

    loadItem(teddies + '/' + id);
}

