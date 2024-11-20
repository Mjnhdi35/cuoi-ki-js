let container = document.querySelector('.container');
let cartContainer = document.querySelector('.cart-container');

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let cartSummary = document.querySelector('.cart-summary');
const header__account = document.querySelector('.header__account');
window.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (loggedInUser) {
        document.getElementById('accountname').innerHTML =
            loggedInUser.username;
        document.querySelector('.header__account i').className =
            'fa fa-sign-in-alt';
    } else {
        document.querySelector('.header__account').innerHTML = `
        <i class="fa fa-user-alt"></i>
       <p id="accountname">Login</p>
`;
    }
});

const renderCartItem = async () => {
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();
    // console.log(data);

    if (cart.length !== 0) {
        return (cartContainer.innerHTML = cart
            .map(itemCart => {
                let search =
                    data.products.find(
                        itemData => itemData.id === itemCart.id.id
                    ) || [];

                return `  <div class="cart-part">
                    <div class="cart-img">
                        <img src="${search.images}" alt="${search.title}" />
                    </div>
                    <div class="cart-desc">
                        <h3>${search.title}</h3>
                    </div>
                    <div class="cart-quantity">
                        <input onchange="update(${search.id})"
                         type="number"  min="0" value="${itemCart.count}" id="${
                    search.id
                }"/>
                    </div>
                    <div class="cart-price">
                        <h4>$ ${search.price}</h4>
                    </div>
                    <div class="cart-total">
                        <h4>$ ${search.price * itemCart.count}</h4>
                    </div>
                    <div class="cart-remove" onclick="removeItem(${search.id})">
                        <button>Remove</button>
                    </div>
                </div>`;
            })
            .join(''));
    } else {
        return (container.innerHTML = `
          <div class="cart-empty">
            <h2>Cart is Empty</h2>
            <a href="../../index.html">
                <button class="homeBtn">Back to home</button>
            </a>
        </div>`);
    }
};

let update = id => {
    if (cart.length !== 0) {
        let searchIndex = cart.findIndex(itemCart => itemCart.id.id === id);

        if (searchIndex !== -1) {
            let quantityElement = document.getElementById(id);

            if (quantityElement) {
                cart[searchIndex].count =
                    parseInt(quantityElement.value, 10) || 0;

                localStorage.setItem('cart', JSON.stringify(cart));

                renderCartItem();
                totalProduct();
            }
        }
    }
};

let totalProduct = async () => {
    let response = await fetch('https://dummyjson.com/products');

    let data = await response.json();

    if (cart.length !== 0) {
        let total = cart
            .map(item => {
                let search =
                    data.products.find(
                        itemData => itemData.id === item.id.id
                    ) || [];
                return item.count * search.price;
            })
            .reduce((x, y) => x + y, 0);

        cartSummary.innerHTML = ` 
            <div class="cart-summary">
                <div class="product-total">
                    <h2>Total Product</h2>
                    <span id="total">$ ${total}</span>
                </div>

                <div class="product-checkout">
                    <a href="../checkout/checkout.html" class="checkout"
                        >Check out</a
                    >
                </div>
                <button onclick="clearCart()" class="removeAll">Clear cart</button>
            </div>
            `;
    } else {
        return;
    }
};

let removeItem = id => {
    let removeId = id;
    cart = cart.filter(item => item.id.id !== removeId);
    renderCartItem();
    totalProduct();
    localStorage.setItem('cart', JSON.stringify(cart));
};

let clearCart = () => {
    cart = [];
    renderCartItem();
    localStorage.setItem('cart', JSON.stringify(cart));
};

function logout() {
    localStorage.removeItem('loggedInUser');

    document.querySelector('.header__account').innerHTML = `
                     <i class="fa fa-user-alt"></i>
                    <p id="accountname">Login</p>
    `;

    window.location.href('login_signup.html');
}

header__account.addEventListener('click', logout);
renderCartItem();
totalProduct();
