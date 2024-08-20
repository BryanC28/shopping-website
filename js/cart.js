const container = document.querySelector('.container');
const cartContainer = document.querySelector('.cart-container');
const cartSummary = document.querySelector('.cart-summary');
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

const renderCartItem = async () => {
    const reponse = await fetch('/data.json');
    const data = await reponse.json();
    // console.log(data);
    if (cart.length != 0) {
        return (cartContainer.innerHTML = cart.map(itemCart => {
            let search = data.find(itemData => itemData.id === itemCart.id) || [];
            // console.log(VND.format(search.price));
            return `
                <div class="cart-part">
                    <div class="cart-img">
                        <img src="/${search.img}" alt="puma">
                    </div>
                    <div class="cart-desc">
                        <h3>${search.title}</h3>
                    </div>
                    <div class="cart-quantity">
                        <input onchange="updateCart(${search.id})" type="number"
                         id="${search.id}" min="0" value="${itemCart.count}">
                    </div>
                    <div class="cart-price">
                        <h4>${VND.format(search.price)}</h4>
                    </div>
                    <div class="cart-total">
                        <h4>${VND.format(search.price * itemCart.count)}</h4>
                    </div>
                    <div onclick="removeItem(${search.id})" class="cart-remove">
                        <button>Remove</button>
                    </div>
                </div>
            `;
        }).join('')
        )
    } else {
        return container.innerHTML = `
            <div class="cart-empty">
                <h2>Cart is emty</h2>
                <a href="/index.html">
                    <button class="home-btn">Back to home</button>
                </a>
            </div>
        `
    }
}

const updateCart = (id) => {
    console.log(id);
    if (cart.length !== 0) {
        let searchIndex = cart.findIndex(itemCart => itemCart.id === id);
        // console.log(searchIndex);
        if (searchIndex != -1) {
            let quantityElement = document.getElementById(id);
            // console.log(quantityElement);
            if (quantityElement) {
                // console.log(quantityElement.value);
                cart[searchIndex].count = parseInt(quantityElement.value, 10) || 0;

                localStorage.setItem('cart', JSON.stringify(cart));

                renderCartItem();
                totalProducts();
            }
        }
    }
}
const totalProducts = async () => {
    let reponse = await fetch('/data.json');
    let data = await reponse.json();

    if (cart.length !== 0) {
        let total = cart.map(item => {
            let search = data.find(itemData => itemData.id === item.id) || [];
            return item.count * search.price;
        }).reduce((x, y) => x + y, 0);
        cartSummary.innerHTML = `
            <div class="product-total">
                <h2>Total: <span id="total">${VND.format(total)}</span></h2>
            </div>
            <div class="product-checkout">
                <a href="#" class="checkout" onclick="notiSuccess()">Checkout</a>
            </div>
            <button onclick="removeAllProduct()" class="remove-all">Clear product</button>
        `
    }else return;
}
let removeItem = (id)=>{
    // let removeID = id;
    cart = cart.filter(item => item.id !== id);
    renderCartItem();
    totalProducts();
    localStorage.setItem('cart',JSON.stringify(cart));
    window.location.reload();
}

let removeAllProduct = ()=>{
    localStorage.removeItem('cart');
    window.location.reload();
}
let notiSuccess = ()=>{
    // console.log('hi');
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your order has been success",
        showConfirmButton: false,
        timer: 1500
    }).then(function(){
        window.location.href = '/index.html';
        // localStorage.removeItem('cart');
    });
}


renderCartItem();
totalProducts();
