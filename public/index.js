// declaring variable
// make section a variable
let container = document.querySelector('.product_list');

// Add Products to DOM

const loadProducts = (prod) => {
    for (let i = 0; i < prod.length; i++) {
        let product = prod[i];
        console.log(product);
        let productContainer = document.createElement('div');
        productContainer.setAttribute('class', 'product');
        productContainer.innerHTML = `
        <h3>${product.name}</h3>
        `
        container.appendChild(productContainer);
    }
}

// TODO: clear previous list to replace with regex-ed filtered
let searchProduct = () => {
    let searchInput = document.querySelector('#search').value;
    let myRegEx = new RegExp(`${searchInput}`, 'gi');
    let holderArray = [];
    for (let i = 0; i < products.length; i++) {
        let productName = products[i].name;
        if(productName.match(myRegEx)) {
            holderArray.push(products[i])
        }
    }
    loadProducts(holderArray);
}

//!! BOOKMARK: Shopping Cart

// initial product load
loadProducts(products);