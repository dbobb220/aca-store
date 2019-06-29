// declaring variable
// make section a variable
let container = document.querySelector('.product_list');
let holder = '';

// Add Products to DOM

const changeContainer = (value) => {
    container.innerHTML = `${value}`;
    console.log('container changing to');
}

const loadProducts = (prod) => {
    holder = '';
    for (let i = 0; i < prod.length; i++) {
        let product = prod[i];
        holder += `
        <h3>${product.name}</h3>
        <p>${product.description}<p>
        <p>Rating: ${product.rating}</p>
        <p>Number of Reviews: ${product.reviews.length}</p>
        <p>Price: ${product.price}</p>
        <p><button onClick="viewDetail(${product.id})">View Details</button></p>
        `
    }
    changeContainer(holder);
    console.log('products overview view');
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
    console.log('search results');
}

//!! Shopping Cart

let viewCart = () => {
    holder = '<h2>Cart</h2>';
    let totalCost = 0;
    for(let i = 1; i < sessionStorage.length; i++) {
        let cartSeshItem = sessionStorage.getItem(sessionStorage.key(i));
        let parsedItem = JSON.parse(cartSeshItem);
        let removeDollar =  parsedItem[1].price.slice(1);
        holder += `
            <h3>Product: ${parsedItem[1].name}</h3>
            <p><strong>Price:</strong> ${parsedItem[1].price}</p>
            <p><strong>Quantity:</strong> ${parsedItem[0]}</p>
            <p><strong>Cost:</strong> $${parseFloat(removeDollar) * parseInt(parsedItem[0])}</p>
            <button>Remove From Cart</button>
        `
        totalCost += parseFloat(removeDollar) * parseInt(parsedItem[0]);
    }
    holder += `
        <h2>Cart Total: $${totalCost}<button style="margin-left: 30px;"><h2>Checkout</h2></button></h2>
    `
    changeContainer(holder);

}

//!! View Details

let viewDetail = (num) => {
    let filterProduct = products.filter(x => x.id == num);
    let product = filterProduct[0];
    holder = ''
    let eachRating = '';
    for (let i = 0; i < product.reviews.length; i++) {
        eachRating += `<li>Rating: ${product.reviews[i].rating} - ${product.reviews[i].description}</li>`
    }
    holder += `
    <div style="display:flex;">
        <div style="margin-top: 1em;">
            <img src="${product.imgUrl}" alt="${product.name}"/>
        </div>
        <div style="margin-left: 50px;">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Rating: ${product.rating}</p>
            <p>Number of Reviews: ${product.reviews.length}</p>
            <p>Price: ${product.price}</p>
            <p>Category: ${product.category}</p>
            <p>
                <button onClick="loadProducts(products)">Hide Details</button>
            </p>
            <p>
                <select id="quantity">
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
                <button onClick="addToCart(${product.id})">Add To Cart</button>
            </p>
            <p>Ratings:</p>
            <p>${eachRating}</p>
        </div>
    </div>
    `
    changeContainer(holder);
    console.log('product detail view');
}

//!! Add to cart 

let addToCart = (num) => {
    let quantityItem = document.querySelector('#quantity').value;
    let cartItem = products.filter(x => x.id == num);
    let cartItemName = cartItem[0].name;
    let holderArray = [];
    holderArray.push(quantityItem, cartItem[0]);
    console.log(holderArray);
    sessionStorage.setItem(`${cartItemName}`, JSON.stringify(holderArray));
    prodSeshStorage += 1;
}

//!! Category Filter

let categoryFilter = (category) => {
    console.log(`filter select for ${category}`);
    let holderArray = [];
    category == '' ? holderArray = products :
    products.forEach(val => {
        if(category === val.category) {
            holderArray.push(val)
        }
    });
    loadProducts(holderArray);
    console.log('category results');
}

// initial product load
loadProducts(products);
