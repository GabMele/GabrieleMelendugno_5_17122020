const teddies = "http://localhost:3000/api/teddies";
const cameras = "http://localhost:3000/api/cameras";
const furniture = "http://localhost:3000/api/furniture";

function loadItems(apiUrl) {
    fetch(apiUrl)
    .then(function(res) {
        return res.json();
    })
    .then(products => writeItems(products))
    .catch(function(err) {
        console.log(err);
        alert(err);
        // Une erreur est survenue
    });
}


function writeItems(products) {
    let elt = document.getElementById('products__list');
    var content = "";

    for (let i = 0; i < products.length; i++) {
        content += `<li class="p-4 m-4 bg-white">
                        <a href="product.html?id=` + products[i]._id + `">
                            <figure class="products__itemlist text-left">
                            <img class="card-img-top" src="` + products[i].imageUrl + `">
                                <figcaption>
                                    <div class="flex-space-between">    
                                        <h2>` + products[i].name + `</h2>
                                        <h3>` + products[i].price + ` €</h3>
                                    </div>
                                    <p>` + products[i].description + `</p>
                                    <button type="button" class="btn btn-primary">Voir l'article</button>
                                </figcaption>
                            </figure>                 
                        </a>
                    </li>`;
    };
    
    elt.innerHTML = content;

}

window.onload = loadItems(teddies); 

