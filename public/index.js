// declaring variable
// make section a variable
let container = document.querySelector('.product_list');

// Add Products to DOM

const loadProducts = (prod) => {
    container.innerHTML = '';
    for (let i = 0; i < prod.length; i++) {
        let product = prod[i];
        let productContainer = document.createElement('div');
        productContainer.setAttribute('class', 'product');
        productContainer.innerHTML = `
        <h3>${product.name}</h3>
        <p>Rating: ${product.rating}</p>
        <p>Number of Reviews: ${product.reviews.length}</p>
        <p>Price: ${product.price}</p>
        <p><button onClick="viewDetail(${product.id})">View Details</button></p>
        `
        container.appendChild(productContainer);
    }
}

let searchProduct = () => {
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
    loadProducts(holderArray);
}

//!! Shopping Cart

let viewCart = () => {
    //viewCart code
}

//!! View Details

let viewDetail = (id) => {
    //code 
}

// initial product load
loadProducts(products);