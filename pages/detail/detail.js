const detailContainer = document.querySelector('.detail-container');
const btnAddCart = document.getElementById('addCart');
const cartIcon = document.querySelector('.cart');

window.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (loggedInUser) {
        document.getElementById('accountname').innerHTML =
            loggedInUser.username;
        document.querySelector('.header__account i').className =
            'fa fa-sign-in-alt';
    }
});
const getDetaiProduct = async () => {
    const path = new URLSearchParams(window.location.search);
    const productId = path.get('id');
    // console.log(productId);
    const response = await fetch('https://dummyjson.com/products');

    const data = await response.json();
    // console.log(data);

    const findProductId = data.products.find(
        item => item.id.toString() === productId.toString()
    );

    // console.log(findProductId);

    detailContainer.innerHTML = `
             <div class="detail">
                <div class="detail-image">
                    <img src=${findProductId.images} 
                    alt=${findProductId.title} />
                </div>

                <div class="detail-info">
                    <h2>${findProductId.title}</h2>
                    <p> ${findProductId.description}</p>

                    <div class="detail-price">
                        Price:
                        <span class="price"> $ ${findProductId.price} </span>
                    </div>
                </div>
            </div>`;

    btnAddCart.addEventListener('click', () => {
        const cart = JSON.parse(localStorage.getItem('cart'));
        const users = JSON.parse(localStorage.getItem('users'));

        if (!users) {
            alert('Ban can dang nhap');
            window.location.href = '../authenticate/login_signup.html';
        }
        if (cart) {
            const item = cart.findIndex(
                item => item.id.id === findProductId.id
            );

            if (item !== -1) {
                cart[item].count += 1;
            } else {
                cart.push({ id: findProductId, count: 1 });
            }
            localStorage.setItem('cart', JSON.stringify(cart));
        } else {
            const cart = [{ id: findProductId, count: 1 }];
            localStorage.setItem('cart', JSON.stringify(cart));
        }

        setCartItem();
    });
};

const setCartItem = () => {
    const cart = JSON.parse(localStorage.getItem('cart'));

    if (cart && cart.length > 0) {
        cartIcon.innerHTML = `
                    <p class="cart-item">${cart.length}</p>
                    <i class="fa fa-shopping-bag"> </i>`;
    } else {
        cartIcon.innerHTML = '';
    }
};

setCartItem();
getDetaiProduct();
