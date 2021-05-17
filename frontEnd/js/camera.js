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

    const cameraPriceA = data.price;
    const cameraDescription = data.description;
    const cameraLenses = data.lenses;

    const cameraPageBoxCol = document.createElement('div');
    cameraPageBoxCol.setAttribute('class', 'd-flex flex-column img-fluid');

    const cameraTitle = document.createElement('h2');
    cameraTitle.setAttribute('class', 'text-center');
    cameraTitle.textContent = data.name;

    const cameraPhoto = document.createElement('img');
    cameraPhoto.src = data.imageUrl;
    cameraPhoto.setAttribute('class', 'img-thumbnail');
    cameraPhoto.setAttribute('width', 'auto');
    cameraPhoto.setAttribute('height', '200');
    cameraPhoto.setAttribute('alt', 'image appareil photo');

    const price = document.createElement('span');
    price.setAttribute('class', 'my-3')
    const cameraPriceB = cameraPriceA / 100;
    price.textContent = cameraPriceB + '€';

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

    const descriptionDiv = document.createElement('div');
    descriptionDiv.setAttribute('class', 'my-5');
    descriptionDiv.textContent = "CARCTERISTIQUES TECHNIQUES";
    const description = document.createElement('p');
    description.setAttribute('class', 'mt-3')
    description.textContent = cameraDescription;


    const cameraPagePanierLink = document.createElement('a');
    cameraPagePanierLink.setAttribute('href', `panier.html`);
    cameraPagePanierLink.setAttribute('class', 'text-center');
    cameraPagePanierLink.textContent = 'Ajouter au panier';

    cameraPageBoxRow.appendChild(cameraPageBoxCol);
    cameraPageBoxCol.appendChild(cameraTitle);
    cameraPageBoxCol.appendChild(cameraPhoto);
    cameraPageBoxCol.appendChild(price);
    cameraPageBoxCol.appendChild(lensesLabel);
    cameraPageBoxCol.appendChild(selectLenses);
    cameraPageBoxCol.appendChild(descriptionDiv);
    descriptionDiv.appendChild(description);
    cameraPageBoxCol.appendChild(cameraPagePanierLink);

}).catch((err) => {
    console.log(err);
});