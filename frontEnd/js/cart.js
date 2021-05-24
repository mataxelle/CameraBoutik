//récup du localStorage
let localStorageProduct = JSON.parse(localStorage.getItem('product'));

const productName = document.querySelector('.name');
const lenses = document.querySelector('.lenses');
const quantity = document.querySelector('.quantity');
const price = document.querySelector('.price');

if (localStorageProduct < 1) {
    
    document.querySelector('.cart_empty_msg').textContent = "Votre panier est vide !";

    document.querySelector('.cart_full_msg').style.display = 'none';

} else {
    
    document.querySelector('.cart_empty_msg').style.display = 'none';

    let localTableProduct = [];

    for (let i = 0; i < localStorageProduct.length; i++) {
        const oneProduct = localStorageProduct[i];

        localTableProduct = localTableProduct + `
        <div class="row text-center border cart_row my-2">
                        <div class="col">nom
                            <div class="name">${oneProduct.name}</div>
                        </div>
                        <div class="col">lentilles
                            <div class="lenses">${oneProduct.lenses}</div>
                        </div>
                        <div class="col">qt
                            <div class="quantity">${oneProduct.quantity}</div>
                        </div>
                        <div class="col">prix
                            <div class="price">${oneProduct.price}</div>
                        </div>
                    </div>
        `;

        document.querySelector('.cart_full_msg').innerHTML = localTableProduct;
    }
}