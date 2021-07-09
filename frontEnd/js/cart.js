const apiUrl = 'http://localhost:3000/api/cameras' + '/';
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
    const cartTotal = document.getElementById('cartTotal');

    for (let i = 0; i < localStorageProduct.length; i++) { //rows
        const oneProduct = localStorageProduct[i];

        const row = tBody.insertRow(-1);

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

            tBody.deleteRow(i);
            localStorageProduct.splice(i, 1);
            localStorage.setItem('product', JSON.stringify(localStorageProduct));
            document.location.reload()
        })
    }

    cartTotal.textContent = `Total du panier : ${total}€`;

    /////////////////////////////////// Information client //////////////////////
    //let contact;
    
    /// tableau des Id pour l'Api
    let products = [];
    localStorageProduct.forEach(item => {
        products.push(item.id)
    });
    console.log(products);
    
    const submitCartForm = document.getElementById('cartForm');

    const firstName = document.querySelector('#firstName');
    const lastName = document.querySelector('#lastName');
    const email = document.querySelector('#email');
    const address = document.querySelector('#address');
    const city = document.querySelector('#city');

    submitCartForm.addEventListener('submit', (e) => {
        e.preventDefault();

        console.log('clique form !');

        let wordRegex = /[a-zA-Z-]/;
        let addressRegex = /[a-zA-Z0-9\s]/;
        let emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]/;

        const firstNameValue = wordRegex.test(firstName.value);
        const lastNameValue = wordRegex.test(lastName.value);
        const emailValue = emailRegex.test(email.value);
        const addressValue = addressRegex.test(address.value);
        const cityValue = addressRegex.test(city.value);

        const errorFirstName = document.querySelector('.errorFirstName');
        const errorLastName = document.querySelector('.errorLastName');
        const errorEmail = document.querySelector('.errorEmail');
        const errorAddress = document.querySelector('.errorAddress');
        const errorCity = document.querySelector('.errorCity');


        if (firstNameValue == "") {
            errorFirstName.innerHTML = "Vous devez indiquer votre prénom ! ";
            firstName.focus();
            return false;
        } else if (firstName.value.length < 2 || firstName.value.length > 20) {
            errorFirstName.innerHTML = "Votre prénom doit contenir en tre 2 et 20 caractères alphabétiques !";
            firstName.focus();
            return false;
        }

        if (lastNameValue == "") {
            errorLastName. innerHTML = "Vous devez indiquer votre nom ! ";
            lastName.focus();
            return false;
        } else if (lastName.value.length < 2 || lastName.value.length > 20) {
            errorLastName.innerHTML = "Votre prénom doit contenir en tre 2 et 20 caractères alphabétiques !";
            lastName.focus();
            return false;
        }

        if (emailValue == "") {
            errorEmail.innerHTML = "Vous devez indiquer votre email ! ";
            email.focus();
            return false;
        }

        if (addressValue == "") {
            errorAddress.innerHTML = "Vous devez indiquer votre adresse ! ";
            address.focus();
            return false;
        }

        if (cityValue == "") {
            errorCity.innerHTML = "Vous devez indiquer votre ville ! ";
            city.focus();
            return false;
        }

        let contact = {
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            address: address.value,
            city: city.value
        };

        const cartInformation = {
            contact: contact,
            products: products
        }
        console.log(cartInformation);

        if (firstNameValue !== "" && lastNameValue !== "" && emailValue !== "" && addressValue !== "" && cityValue !== "") {

            submitFormData(cartInformation);
            console.log('cart info envoyé');

        } else {
            console.log('cart info non envoyés !')
        }

    })

    async function submitFormData (data) {
        try {
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
    
            const response = await fetch(apiUrl + "order", options);
            const datas = await response.json();
            if(response.ok){
                window.location.href = 'orderConfirmation.html?orderId='+ datas.orderId;
                console.log(datas.orderId);
            }
            return datas;
        } catch (error) {
            console.log(error);
        }
    }

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