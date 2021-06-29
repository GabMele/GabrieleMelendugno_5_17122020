
const teddies = "http://localhost:3000/api/teddies";
const cameras = "http://localhost:3000/api/cameras";
const furniture = "http://localhost:3000/api/furniture";


/* function loadItems(apiUrl) {
    fetch(apiUrl)
    .then(res => res.json())
    .then(res => {
        console.log(res);
        let elt = document.getElementById('products__wrapper');
        for (let i = 0; i < res.length; i++) {
            elt.innerHTML += '<ul class="products__list"><li>' + res[i].name + '</li></ul>';
            elt.innerHTML += res[i].description;
            elt.innerHTML += '<img src ="' + res[i].imageUrl + '">';
            elt.innerHTML += '<a href="product.html?id=' + res[i]._id + '"> Voir le produit </a>';
        }
       })
    .catch(function(err) {
        console.log(err);
        alert(err);
        // Une erreur est survenue
    });
}
*/

function loadItems(apiUrl) {
    fetch(apiUrl)
    .then(function(res) {
        return res.json();
    })
    .then(function(products) {
        console.log('*** DEBUG - show products array :')
        console.log(products);
        let elt = document.getElementById('products__list');
        //elt.innerHTML += '<ul>';

        var content = "";

        for (let i = 0; i < products.length; i++) {
            content += '<a href="product.html?id=' + products[i]._id + `">
                            <div class="products__item">
                                <figure class="products__figure">
                                    <img src ="` + products[i].imageUrl + `">
                                    <figcaption>
                                        <div class="flex-space-between products__title">    
                                            <h2 class="products__name">` + products[i].name + `</h2>
                                            <p class="products__price">` + products[i].price + `€</p>
                                        </div>
                                        <p class="products__description">` + products[i].description + `</p>
                                    </figcaption>'
                                </figure>
                            </div>
                        </a>`;
        };
        
        elt.innerHTML = content;
        console.log("DEBUG content after loop: " + content);
       })
    .catch(function(err) {
        console.log(err);
        alert(err);
        // Une erreur est survenue
    });
}

window.onload = loadItems(teddies); 

