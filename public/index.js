// declaring variable
// make section a variable
let container = document.querySelector('.product_list');

// Add Products to DOM

const loadProducts = (prod) => {
    for (let i = 0; i < prod.length; i++) {
        let product = prod[i];
        let productContainer = document.createElement('div');
        productContainer.setAttribute('class', 'product');
        productContainer.innerHTML = `
        <h5>${product.name}</h5>
        <p>${product.description}<p>
        `
        container.appendChild(productContainer);
    }
}

// Search for product using RegEx
const searchProduct = () => {
    let searchInput = document.querySelector('#search').value;
    let myRegEx = new RegExp(`${searchInput}`, 'gi');
    let holderArray = [];
    for (let i = 0; i < products.length; i++) {
        let productName = products[i].name;
        let productDesc = products[i].description;
        if(productName.match(myRegEx) || productDesc.match(myRegEx)) {
            holderArray.push(products[i])
        }
    }
    container.innerHTML = '';
    loadProducts(holderArray);
}

// View Cart Items
const viewProduct = () => {
    
}


// initial product load
loadProducts(products);