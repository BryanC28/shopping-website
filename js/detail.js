const detailContainer = document.querySelector('.detail-container');
const AddToCart = document.getElementById('add-to-cart');
const cartIcon = document.querySelector('.cart'); 

const getDetailData = async () => {
    const path = new URLSearchParams(window.location.search);

    const produc_id = path.get('id');
    // console.log(produc_id);
    const response = await fetch('/data.json');
    const data = await response.json();
    const findProductById = data.find(item => item.id.toString() === produc_id.toString());
    // console.log(findProductById); 
    // console.log(data); 
    detailContainer.innerHTML = `
          <div class="detail">
            <div class="detail-image">
                <img src="/${findProductById.img}" alt="">
            </div>
            <div class="detail-info">
                <h2>${findProductById.title}</h2>
                <p>${findProductById.description}</p>
                <div class="detail-price">
                    <span class="price">${findProductById.price} VND</span>
                </div>
            </div>

        </div>
    `

    AddToCart.addEventListener('click', ()=>{
        // console.log('add-to-cart');
        const cart = JSON.parse(localStorage.getItem('cart'));
        if(cart){
            const item = cart.findIndex(item => item.id === findProductById.id);
            if(item != -1){
                cart[item].count += 1; 
            }
            else{
                cart.push({id: findProductById.id, count: 1});
            }
            localStorage.setItem('cart',JSON.stringify(cart));
        }else{
            const cart = [
                {
                    id: findProductById.id,
                    count: 1
                }
            ];
            localStorage.setItem('cart',JSON.stringify(cart));
        }
        setCartItem();
    })
    
}
const setCartItem = () => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (cart && cart.length > 0) {
        cartIcon.innerHTML = `
                <p class="cart-item">${cart.length}</p>
                <i class="fa fa-shopping-bag"></i>
            `
    }
};
setCartItem();
getDetailData();
