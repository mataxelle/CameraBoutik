const cameraBoxRow = document.querySelector('.camera_box');

fetch("http://localhost:3000/api/cameras").then((response) => {
    return response.json()
})
.then((data) => {

    console.log(data);

    data.forEach(camera => {
        
        const cameraId = camera.id
        const cameraName = camera.name;
        const cameraDescription = camera.description;
        const cameraLenses = camera.lenses;
        const cameraPriceA = camera.price;
        const cameraImage = camera.imageUrl;
        
        const cameraBoxCol = document.createElement('div');
        cameraBoxCol.setAttribute('class', 'd-flex flex-column col-sm-6 col-lg-4 mt-5 mb-5 img-fluid');

        const cameraTitle = document.createElement('h3');
        cameraTitle.setAttribute('class', 'text-center');
        cameraTitle.textContent = cameraName;

        const cameraPhoto = document.createElement('img');
        cameraPhoto.src = cameraImage;
        cameraPhoto.setAttribute('class', 'img-thumbnail');
        cameraPhoto.setAttribute('width', 'auto');
        cameraPhoto.setAttribute('height', '200');
        cameraPhoto.setAttribute('alt', 'image appareil photo');

        const price = document.createElement('span');
        const cameraPriceB = cameraPriceA / 100;
        price.textContent = cameraPriceB + '€';

        cameraBoxRow.appendChild(cameraBoxCol);
        cameraBoxCol.appendChild(cameraTitle);
        cameraBoxCol.appendChild(cameraPhoto);
        cameraBoxCol.appendChild(price);
    });
})
.catch((err) => {
    console.log(err)
})