//? Why is storing the shopping cart in sessionStorage not the best choice?
//* It is not the best choice because local storage is a much better option. If the customer leaves their tab in 
//* any way (close tab/browser, shuts down computer, battery dies, etc) they would lose everything they placed in their cart */
//? What should happen when the Place Order button is clicked?
//* We should use the POST to send out data (cart and client info) to the server */

//! declaring variables for container, holding data for functions, and are you there feature
let container = document.querySelector('.product_list');
let holder = '';
let areYouThere = true;

//! SetTimeout for 'Are you there' 
let promptTimeout = () => {
    // maintains timeout true each time a click occurs
    areYouThere = true;
    console.log('user click - 60 sec timer til prompt');
    setInterval(() => {
        // switch varaibale to false
        areYouThere = false;
        console.log('Are you still there? prompt initiated');
        // alert user if variable is false
        if (!areYouThere) {alert("Are you still there");};
        areYouThere = true;
        console.log('user returned - 60 sec timer til prompt');
    }, 60000);
};

document.body.addEventListener('click', promptTimeout);

//!! Change the container DOM

const changeContainer = (value) => {
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

let viewCart = () => {
    holder = '<h2>Cart</h2>';
    let totalCost = 0;
    // loop through session storage to grab all add to cart items
    for(let i = 1; i < sessionStorage.length; i++) {
        let cartSeshItem = sessionStorage.getItem(sessionStorage.key(i));
        let parsedItem = JSON.parse(cartSeshItem);
        let removeDollar =  parsedItem[1].price.slice(1);
        holder += `
            <h3>Product: ${parsedItem[1].name}</h3>
            <p><strong>Price:</strong> ${parsedItem[1].price}</p>
            <p><strong>Quantity:</strong> ${parsedItem[0]}</p>
            <p><strong>Cost:</strong> $${parseFloat(removeDollar) * parseInt(parsedItem[0])}</p>
            <button onClick="removeCartItem('${parsedItem[1].name}')">Remove From Cart</button>
        `
        // multiply the quantity and price for each
        let multiplyQuantity = parseFloat(removeDollar) * parseInt(parsedItem[0]);
        // then add to totalCost variable
        totalCost += multiplyQuantity;
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

// initial product load
loadProducts(products);
