
const teddies = "http://localhost:3000/api/teddies";
const cameras = "http://localhost:3000/api/cameras";
const furniture = "http://localhost:3000/api/furniture";


function loadItems(apiUrl) {
    fetch(apiUrl)
    .then(function(res) {
        return res.json();
    })
    .then(function(products) {
        console.log('*** DEBUG - show products array :')
        console.table(products);

        let elt = document.getElementById('products__list');
        //elt.innerHTML += '<ul>';

        var content = "";

        for (let i = 0; i < products.length; i++) {
            content += `<li class="p-4 m-4 bg-white">
                            <a href="product.html?id=` + products[i]._id + `">
                                <figure class="products__item text-left">
                                <img class="products__img_listing card-img-top" src="` + products[i].imageUrl + `">
                                    <figcaption>
                                        <div class="flex-space-between">    
                                            <h2>` + products[i].name + `</h2>
                                            <h3>` + products[i].price + ` €</h3>
                                        </div>
                                        <p class="text-left">` + products[i].description + `</p>
                                        <button type="button" class="btn btn-primary">Voir l'article</button>
                                    </figcaption>
                                </figure>
                                
                            </a>
                        </li>`;
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

