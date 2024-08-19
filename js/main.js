function logout() {
    window.location.href = 'pages/authenticate/login-signup.html';
}

const products = document.querySelector('.product');
// const cartIcon = document.querySelector('.cart');
const getData = async () => {
    const response = await fetch('data.json');
    const data = await response.json();
    console.log(data);
    if (data) {
        products.innerHTML = data.map(item=>{
            return `
            <div class="product-item">
                <img src="${item.img}" alt="">
                <div class="product-info">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    <a href="pages/details/detail.html?id=${item.id}" class="btn">View</a>
                </div>
            </div>
        `
        }).join('')
    }
}

// const setCartItem = () => {
//     const cart = JSON.parse(localStorage.getItem('cart'));
//     if (cart && cart.length > 0) {
//         cartIcon.innerHTML = `
//                 <p class="cart-item">${cart.length}</p>
//                 <i class="fa fa-shopping-bag"></i>
//             `
//     }
// };

getData();
// setCartItem();
