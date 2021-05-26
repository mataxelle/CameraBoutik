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
                            <button type="button" class="mt-2 supp">X</button>
                        </div>
        </div>
        `;

        let totalQuantity = oneProduct.quantity++;

        let subTotal = oneProduct.price * totalQuantity;

        total = total + subTotal;


        const cart_body = document.querySelector('.cart_full_msg');
        cart_body.innerHTML = tableProduct;

        let totalDiv = ` <div class="row">
                            <div class="col col-3 offset-9">Total :
                                <span class="total">${total}</span>
                            </div>
                        </div>
    `;

        cart_body.innerHTML += totalDiv;  // += sinon remplace le premier innerHTML

        const cancelBtn = document.querySelectorAll('.supp');
        cancelBtn.forEach(btn => {
            btn.addEventListener('click', (event) => {
                event.preventDefault();

                console.log('clique ok');

                localStorageProduct.splice(i, 1);
                localStorage.setItem('product', JSON.stringify(localStorageProduct));
                document.location.reload();
            })
        });
    }

    /*
    //-------------Cancel button------------------
    const cancelBtnDiv = document.createElement('div');
    cancelBtnDiv.setAttribute('class', 'col');
    document.querySelector('.cart_row').appendChild(cancelBtnDiv);
    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = "x";
    cancelBtnDiv.appendChild(cancelBtn);
    console.log(cancelBtn);

    cancelBtn.addEventListener('click', (event) => {
        event.preventDefault();

        console.log('clique ok');

        //tableProduct.deleteRow(i);
        //localStorageProduct.splice(i, 1);
        //localStorage.setItem('product', JSON.stringify(localStorageProduct));
        //document.location.reload();
    })*/
}