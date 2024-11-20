const productss = document.querySelector('.products');
window.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (loggedInUser) {
        document.getElementById('accountname').innerHTML =
            loggedInUser.username;
        document.querySelector('.header__account i').className =
            'fa fa-sign-in-alt';
    }
});

const getData = async () => {
    const response = await fetch('https://dummyjson.com/products');

    const data = await response.json();

    // console.log(data);
    if (data) {
        productss.innerHTML = data.products
            .map(item => {
                return `
            <div class="product-item">
                <img src="${item.images}" alt="${item.images}" />
                <div class="product-info">
                    <h3>${item.title}</h3>
                    <p>
                        ${item.description}
                    </p>
                    <a href="pages/detail/detail.html?id=${item.id}" class="btn">View </a>
                </div>
            </div>`;
            })
            .join(' ');
    }
};

getData();
