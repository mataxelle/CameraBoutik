//Récup url du produit
const urlActuelle = window.location.search;
console.log(urlActuelle);

//1er méthode pour extraire l'id dans l'url
/*const id = urlActuelle.slice(4);
console.log(id);*/

//2nd méthode
const urlSearchParams = new URLSearchParams(urlActuelle);
console.log(urlSearchParams);

const id = urlSearchParams.get('id');
console.log(id);

const cameraPageBoxRow = document.querySelector('.cameraPage_box');

fetch('http://localhost:3000/api/cameras/'+id).then((response) => {
    return response.json()
}).then((data) => {
    console.log(data);

    const cameraId = data._id;
    const cameraName = data.name;
    const cameraPriceA = data.price;
    const cameraDescription = data.description;
    const cameraLenses = data.lenses;

    const cameraPageBoxCol = document.createElement('div');
    cameraPageBoxCol.setAttribute('class', 'd-flex flex-column img-fluid');

    //--------------title--------------
    const cameraTitle = document.createElement('h2');
    cameraTitle.setAttribute('class', 'text-center');
    cameraTitle.textContent = cameraName;

    //--------------image--------------
    const cameraPhoto = document.createElement('img');
    cameraPhoto.src = data.imageUrl;
    cameraPhoto.setAttribute('width', 'auto');
    cameraPhoto.setAttribute('height', 'auto');
    cameraPhoto.setAttribute('alt', 'image appareil photo');

    //--------------price--------------
    const price = document.createElement('span');
    price.setAttribute('class', 'my-3')
    const cameraPriceB = cameraPriceA / 100;
    price.textContent = cameraPriceB + '€';

    //--------------lenses form--------------
    const formLenses = document.createElement('form');
    formLenses.setAttribute('class', 'my-3')
    const lensesLabel = document.createElement('label');
    lensesLabel.setAttribute('for', 'select-lenses');
    lensesLabel.textContent = "Lentilles";
    const selectLenses = document.createElement('select');
    selectLenses.setAttribute('id', 'select-lenses');
    
    for (let i = 0; i < cameraLenses.length; i++) {
        const lens = cameraLenses[i];
        const lensOption = document.createElement('option');
        lensOption.textContent = lens;
        lensOption.value = lens;
        selectLenses.appendChild(lensOption);
    }

    //--------------description--------------
    const descriptionDiv = document.createElement('div');
    descriptionDiv.setAttribute('class', 'my-5');
    descriptionDiv.textContent = "CARCTERISTIQUES TECHNIQUES";
    const description = document.createElement('p');
    description.setAttribute('class', 'mt-3')
    description.textContent = cameraDescription;


    //--------------button cart--------------
    const cameraPagePanierLink = document.createElement('button');
    cameraPagePanierLink.setAttribute('type', 'submit');
    cameraPagePanierLink.setAttribute('class', 'text-center');
    cameraPagePanierLink.textContent = 'Ajouter au panier';


    cameraPageBoxRow.appendChild(cameraPageBoxCol);
    cameraPageBoxCol.appendChild(cameraTitle);
    cameraPageBoxCol.appendChild(cameraPhoto);
    cameraPageBoxCol.appendChild(price);
    cameraPageBoxCol.appendChild(formLenses);
    formLenses.appendChild(lensesLabel);
    formLenses.appendChild(selectLenses);
    cameraPageBoxCol.appendChild(descriptionDiv);
    descriptionDiv.appendChild(description);
    cameraPageBoxCol.appendChild(cameraPagePanierLink);

    //-------------------choix select et envoi au panier-------------------

    cameraPagePanierLink.addEventListener('click', (event) => {
        event.preventDefault();

        const resultChoice = selectLenses.value;
        console.log(resultChoice);

        const product = {
            //id : cameraId,
            name: cameraName,
            price: cameraPriceB,
            lenses: resultChoice,
            quantity: 1
        };

        let localStorageProduct = JSON.parse(localStorage.getItem('product'));

        if (localStorageProduct) {
            
            localStorageProduct.push(product);
            localStorage.setItem('product', JSON.stringify(localStorageProduct));

            console.log(localStorageProduct);
        } else {
            localStorageProduct = [];
            localStorageProduct.push(product);
            localStorage.setItem('product', JSON.stringify(localStorageProduct));

            console.log(localStorageProduct);
        }
        window.location.href = 'cart.html';
    })
    console.log(cameraPagePanierLink);

}).catch((err) => {
    console.log(err);
});