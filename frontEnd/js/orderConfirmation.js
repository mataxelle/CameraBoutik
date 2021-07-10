const currentUrl =  window.location.href;
const url = new URL(currentUrl);
const currentOrderId = url.searchParams.get("orderId");

let localStorageContact = JSON.parse(localStorage.getItem('contact'));
document.getElementById('orderFirstName').textContent = localStorageContact["firstName"];
const orderNumbers = document.querySelectorAll(".orderNumber");
orderNumbers.forEach(orderNumber => {
    orderNumber.textContent = currentOrderId
});

/*const localStorageProduct = JSON.parse(localStorage.getItem('product'));
for (const oneItem of localStorageProduct) {
    const row = document.getElementById('tBodyOrderSuccess').insertRow(-1);
    const cell1 = row.insertCell(0).appendChild(document.createElement('div')).textContent = oneItem.name;
    const cell2 = row.insertCell(1).textContent = oneItem.name;
    const cell3 = row.insertCell(2).textContent = oneItem.name;
}*/

document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = './index.html';
        localStorage.clear();
    });
});