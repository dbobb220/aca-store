// declaring variable
// make section a variable
let container = document.querySelector('.product_list');


for (let i = 0; i < products.length; i++) {
    let product = products[i];
    console.log(product);
    let productContainer = document.createElement('div');
    productContainer.setAttribute('class', 'product');
    productContainer.innerHTML = `
    <h3>${product.name}</h3>
    `
    container.appendChild(productContainer);
}

let searchProduct = () => {
    let searchInput = document.querySelector('#search').value;
    products.map()
}