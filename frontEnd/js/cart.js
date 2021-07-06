//récup du localStorage
let localStorageProduct = JSON.parse(localStorage.getItem('product'));


if (localStorageProduct < 1) {

    document.querySelector('.cart_empty_msg').textContent = "Votre panier est vide !";

    document.querySelector('.cart_full_msg').style.display = 'none';
    document.querySelector('.user_informations').style.display = 'none';

} else {

    document.querySelector('.cart_empty_msg').style.display = 'none';

    let total = 0;

    const tBody = document.getElementById('cartBody');
    const tFoot = document.getElementById('cartFoot');

    for (let i = 0; i < localStorageProduct.length; i++) { //rows
        const oneProduct = localStorageProduct[i];

        const row = tBody.insertRow(0);

        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);
        const cell5 = row.insertCell(4);
        const cell6 = row.insertCell(5);

        cell1.textContent = oneProduct.name;
        cell2.textContent = oneProduct.lenses;
        cell3.textContent = oneProduct.price + '€';
        cell4.textContent = oneProduct.quantity;
        cell5.textContent = oneProduct.quantity * oneProduct.price + '€';
        const suppButton = document.createElement('button');
        suppButton.textContent = 'x';
        cell6.appendChild(suppButton);

        total = total + oneProduct.quantity * oneProduct.price;

        suppButton.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('clique ok btn supp');

            tBody.deleteRow(i);
            localStorageProduct.splice(i, 1);
            localStorage.setItem('product', JSON.stringify(localStorageProduct));
            document.location.reload()
        })
    }

    tFoot.textContent = `${total}`;

}

/////////////////// Fonctionnne mais je ne parvenais pas à a supprimer d'article précis avec ce code, seule le denier l'était //////////////////////////////
/*
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

<div class="row">
    <div class="col col-3 offset-9">Total :
        <span class="total">${total},00€</span>
    </div>
</div>

const cancelBtn = document.querySelectorAll('.supp');

cancelBtn.forEach(btn => {
    btn.addEventListener('click', (event) => {
        event.preventDefault();

        console.log('clique ok');

        //cartBody.remove();
        localStorageProduct.splice(i, 1);
        localStorage.setItem('product', JSON.stringify(localStorageProduct));
        document.location.reload();
    })
});
*/

/////////////////// Fonctionne aussi pour le tableau /////////////////
    /*localStorageProduct.forEach( item => {
        let index = 0;
        let itemRow = document.createElement('tr');

        for (p in localStorageProduct[0]) {
          let cell = document.createElement('td');
          cell.setAttribute("style","border: 1px solid green");
          
          if (index >= 1) {
            cell.appendChild(document.createTextNode(item[p]));
            itemRow.appendChild(cell);
          }

          index++;
        }

        tbody.appendChild(itemRow);
    });*/

    ///////////////////////// fonctionne mais .... ///////////////////
    /*for (let i = 1; i < localStorageProduct.length; i++) { //rows
        const oneProduct = localStorageProduct[i];

        const itemRow = document.createElement('tr');
        let index = 0;

        for (let j in oneProduct) { //cells

            const cell = document.createElement('td');
            if (index >= 1) {
                const cellText = document.createTextNode(oneProduct[j]);
                cell.appendChild(cellText);
                itemRow.appendChild(cell);
            }
            index++

            if (index >= 5) {
                for (let k = 0; k < 2; k++) {
                    const totalRow = document.createElement('td');
                    totalRow.textContent = 'hello';
                    //faudrait ajouter un boutton
                    cell.after(totalRow);
                }
            }
        }

        tbody.appendChild(itemRow);
    }*/