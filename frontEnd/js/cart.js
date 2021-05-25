//récup du localStorage
let localStorageProduct = JSON.parse(localStorage.getItem('product'));


if (localStorageProduct < 1) {

    document.querySelector('.cart_empty_msg').textContent = "Votre panier est vide !";

    document.querySelector('.cart_full_msg').style.display = 'none';

} else {

    document.querySelector('.cart_empty_msg').style.display = 'none';

    let tableProduct = [];
    let total = 0;

    for (let i = 0; i < localStorageProduct.length; i++) {
        const oneProduct = localStorageProduct[i];

        tableProduct = tableProduct + `
        <div class="row text-center border cart_row my-2">
                        <div class="col">Nom
                            <div class="name">${oneProduct.name}</div>
                        </div>
                        <div class="col">Lentilles
                            <div class="lenses">${oneProduct.lenses}</div>
                        </div>
                        <div class="col">Quantité
                            <div class="quantity">${oneProduct.quantity}</div>
                        </div>
                        <div class="col">Prix
                            <div class="price">${oneProduct.price}</div>
                        </div>
                        <div class="col">
                            <button class="supBtn mt-2">X</button>
                        </div>
        </div>
        `;

        let totalQuantity = oneProduct.quantity++;

        let subTotal = oneProduct.price * totalQuantity;

        total = total + subTotal;
        console.log(total);
    }

    document.querySelector('.cart_full_msg').innerHTML = tableProduct;

    let totalDiv = ` <div class="row">
                            <div class="col col-3 offset-9">Total :
                                <span class="total">${total}</span>
                            </div>
                        </div>
    `;

    //document.querySelector('.cart_full_msg').innerHTML = tableProduct;
    document.querySelector('.cart_full_msg').innerHTML += totalDiv;  // += sinon remplace le premier innerHTML
}