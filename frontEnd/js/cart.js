//récup du localStorage
let localStorageProduct = JSON.parse(localStorage.getItem('product'));


if (localStorageProduct < 1) {

    document.querySelector('.cart_empty_msg').textContent = "Votre panier est vide !";

    document.querySelector('.cart_full_msg').style.display = 'none';
    document.querySelector('.user_informations').style.display = 'none';

} else {

    document.querySelector('.cart_empty_msg').style.display = 'none';

    let tableProduct = [];
    let total = 0;

    for (let i = 0; i < localStorageProduct.length; i++) {
        const oneProduct = localStorageProduct[i];

        tableProduct = tableProduct + `
        <div class="row text-center border cart_row my-2">
                        <div class="col-3">Nom
                            <div class="name">${oneProduct.name}</div>
                        </div>
                        <div class="col-3">Lentilles
                            <div class="lenses">${oneProduct.lenses}</div>
                        </div>
                        <div class="col-2">Qt
                            <div class="quantity">${oneProduct.quantity}</div>
                        </div>
                        <div class="col-2">Prix
                            <div class="price">${oneProduct.price}€</div>
                        </div>
                        <div class="col-1">
                            <button type="button" class="mt-2 supp">X</button>
                        </div>
        </div>
        `;

        let totalQuantity = oneProduct.quantity;

        let subTotal = oneProduct.price * totalQuantity;

        total = total + subTotal;

        //--------------------Total cart-----------------------------------
        let totalDiv = `
            <div class="row">
                <div class="col col-3 offset-9">Total :
                    <span class="total">${total},00€</span>
                </div>
            </div>
        `;

        const cartBody = document.querySelector('.cart_full_msg');
        cartBody.innerHTML = tableProduct;
        cartBody.innerHTML += totalDiv;  // += sinon remplace le premier innerHTML


        const cancelBtn = document.querySelectorAll('.supp');

        console.log(cartBody);

        cancelBtn.forEach(btn => {
            btn.addEventListener('click', (event) => {
                event.preventDefault();

                console.log('clique ok');

                //cartBody.deleteRow(i);
                localStorageProduct.splice(i, 1);
                localStorage.setItem('product', JSON.stringify(localStorageProduct));
                document.location.reload();
            })
        });
    }
}