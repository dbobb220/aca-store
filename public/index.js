//* 1. need to change interface so login loads in header only and message in body only
//* 2. check local storage and if not present show login, if present show products/lists
//* 3. write POST and log localStorage

//* 1. Use GET for showing products in loadProducts function

//* 1. Make a create product button that loads a form 
//* 2. Form needs to include product name, description, price
//* 3. Add a save button that makes a POST /products
//* 4. Then refresh the list of products using GET from loadProducts

//! declaring variables for container, holding data for functions, and are you there feature
let holder = '';
let areYouThere = true;
let headerDOM = document.querySelector('header');
let mainDOM = document.querySelector('main');

//! conditional to see if user has logged in yet
let loadPage = () => {
    // get localStorage variable
    let loginVar = true;
    if (loginVar) {
        headerDOM.innerHTML = `
            <div>
                <input type="search" name="" id="search">
                <input type="submit" value="Search" onClick="searchProduct()">
                <button type="reset" onClick="resetFunc()">Reset</button>
                <button id="view_cart" onClick="viewCart()">View Cart</button>
                <select id="category" onChange="categoryFilter(this.value)">
                    <option value="">All Categories</option>
                    <option value="food">Food</option>
                    <option value="electronics">Electronics</option>
                    <option value="sporting">Sporting</option>
                </select>
            </div>
        `;
        mainDOM.innerHTML = `<section class="product_list"></section>`;
        loadProducts(products);
    } else {
        headerDOM.innerHTML = `
            <div style="text-align: right;">
                <form action="">
                    Email:
                    <input type="email" name="Email" id="user_email" style="margin-right:20px;" required>
                    Password:
                    <input type="password" name="Password" id="user_password" required>
                    <button id="user_submit" onclick="userLogin()">Login</button>
                </form>
            </div>
        `;
        mainDOM.innerHTML = `<h2 style="display: flex; justify-content: center; align-items: center; height: 250px;">Welcome! Please login</h2>`
    }
}

let fetchData = () => {
    fetch('https://acastore.herokuapp.com/products')
        .then(res => res.json())
        .then(data => console.log(data));
}

//! Add login that posts to heroku
let userLogin = () => {

}

//! SetTimeout for 'Are you there' 
// let promptTimeout = () => {
//     // maintains timeout true each time a click occurs
//     areYouThere = true;
//     console.log('user click - 60 sec timer til prompt');
//     setInterval(() => {
//         // switch varaibale to false
//         areYouThere = false;
//         console.log('Are you still there? prompt initiated');
//         // alert user if variable is false
//         if (!areYouThere) {alert("Are you still there");};
//         areYouThere = true;
//         console.log('user returned - 60 sec timer til prompt');
//     }, 600000);
// };

// document.body.addEventListener('click', promptTimeout);

//!! Change the container DOM

const changeContainer = (value) => {
    let container = document.querySelector('.product_list');
    container.innerHTML = `${value}`;
    console.log('container changing to...');
}

//!! Load product overview view when different functions are complete
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

//!! Search Functionality

let searchProduct = () => {
    let searchInput = document.querySelector('#search').value;
    let myRegEx = new RegExp(`${searchInput}`, 'gi');
    let holderArray = [];
    for (let i = 0; i < products.length; i++) {
        let productName = products[i].name;
        let productDesc = products[i].description;
        // search for regex match in name and description
        if(productName.match(myRegEx) || productDesc.match(myRegEx)) {
            holderArray.push(products[i])
        }
    }
    loadProducts(holderArray);
    console.log('search results');
}

//!! Shopping Cart

let changeQuant = (name, id) => {
    let newQuant = document.querySelector(`#${id}`).value;
    let sessionItem = sessionStorage.getItem(`${name}`);
    let sessionArray = JSON.parse(sessionItem);
    sessionArray[0] = newQuant;
    sessionStorage.setItem(`${name}`, JSON.stringify(sessionArray));
    viewCart();
}

let viewCart = () => {
    holder = '<h2>Cart</h2>';
    let totalCost = 0;
    // loop through session storage to grab all add to cart items
    for(let i = 0; i < sessionStorage.length; i++) {
        let cartSeshItem = sessionStorage.getItem(sessionStorage.key(i));
        if(cartSeshItem !== 'true') {
            let parsedItem = JSON.parse(cartSeshItem);
            let removeDollar =  parsedItem[1].price.slice(1);
            // to build drop down in view cart
            let optionHolder = '';
            let itemNameId = parsedItem[1].id;
            // build options 
            for (let j = 1; j <= 10; j++) {
                j == parsedItem[0] ? optionHolder += `<option value=${j} selected>${j}</option>`
                : optionHolder +=  `<option value=${j}>${j}</option>`
            }
            holder += `
                <h3>Product: ${parsedItem[1].name}</h3>
                <p><strong>Price:</strong> ${parsedItem[1].price}</p>
                <p><strong>Quantity:</strong><select id="select_${itemNameId}" onChange="changeQuant('${parsedItem[1].name}', this.id)">${optionHolder}</select>
                <p><strong>Cost:</strong> $${parseFloat(Math.round(parseFloat(removeDollar) * parseFloat(parsedItem[0] * 100)) / 100).toFixed(2)}</p>
                <button onClick="removeCartItem('${parsedItem[1].name}')">Remove From Cart</button>
            `
            // multiply the quantity and price for each
            let multiplyQuantity = parseFloat(removeDollar) * parseInt(parsedItem[0]);
            // then add to totalCost variable
            totalCost += multiplyQuantity;
        }
    }
    // maintain 2 decimal points with total
    totalCost = parseFloat(Math.round(totalCost * 100) / 100).toFixed(2);
    holder += `
        <h2>Cart Total: $${totalCost}<button style="margin-left: 30px;" onClick="checkoutFunc(${totalCost})">Checkout</button></h2>
    `
    changeContainer(holder);
}

const removeCartItem = (item) => {
    sessionStorage.removeItem(item);
    console.log(`${item} removed from cart`);
    viewCart();
}

//!! Checkout Functionality

const checkoutFunc = (cost) => {
    holder = '';
    holder += `
    <h3>Cart Total: $${cost}</h3>
        <form>
            First name:
            <br>
            <input type="text" name="firstname" required>
            <br>
            Last name: 
            <br>
            <input type="text" name="lastname" required>
            <br>
            Email: 
            <br>
            <input type="email" name="email" required>
            <br>
            <button>Place Order</button>
        </form>
    `
    changeContainer(holder);
    console.log('checkout form dislpayed')
}

//!! View Details

let viewDetail = (num) => {
    // loop through array to find product id of item clicked
    let filterProduct = products.filter(x => x.id == num);
    let product = filterProduct[0];
    holder = ''
    let eachRating = '';
    // loop to store each rating in object
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

//!! Reset functionality 

const resetFunc = () => {
    console.log('reset clicked');
    // empty search input
    document.querySelector('#search').value = '';
    //reload all products
    loadProducts(products);
}

//!! Add to cart 

let addToCart = (num) => {
    // grab quantity so it can be stored in sessionStorage
    let quantityItem = document.querySelector('#quantity').value;
    let cartItem = products.filter(x => x.id == num);
    let cartItemName = cartItem[0].name;
    let holderArray = [];
    // set key to item name for storage
    //* if item already exist in sessionStorage, the new addToCart will override
    holderArray.push(quantityItem, cartItem[0]);
    sessionStorage.setItem(`${cartItemName}`, JSON.stringify(holderArray));
    console.log('item added to cart')
}

//!! Category Filter

let categoryFilter = (category) => {
    console.log(`filter select for ${category}`);
    let holderArray = [];
    // load all products if all categories is selected
    category == '' ? holderArray = products :
    // loop through products array to find matching categories 
    products.forEach(val => {
        if(category === val.category) {
            holderArray.push(val)
        }
    });
    loadProducts(holderArray);
    console.log('category results');
}

loadPage();
