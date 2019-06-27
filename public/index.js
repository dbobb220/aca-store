// declaring variable
// make section a variable
let container = document.querySelector('.product_list');

// Add Products to DOM

const loadProducts = (prod) => {
    container.innerHTML = '';
    if (typeof prod === 'object') {
        for (let i = 0; i < prod.length; i++) {
            let product = prod[i];
            let productContainer = document.createElement('div');
            productContainer.setAttribute('class', 'product');
            productContainer.innerHTML = `
            <h3>${product.name}</h3>
            <p>Rating: ${product.rating}</p>
            <p>Number of Reviews: ${product.reviews.length}</p>
            <p>Price: ${product.price}</p>
            <p><button onClick="loadProducts(${product.id})">View Details</button></p>
            `
            container.appendChild(productContainer);
        }
    } else {
        let product = products[prod];
        container.innerHTML = `
        <h3>${product.name}</h3>
        <p>${product.description}</p?
        <p>Rating: ${product.rating}</p>
        <p>Number of Reviews: ${product.reviews.length}</p>
        <p>Price: ${product.price}</p>
        <p>
            <button onClick="loadProducts(products)">Hide Details</button>
            <select>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>
            <button onClick="addToCart()">Add To Cart</button>
        </p>
        `
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