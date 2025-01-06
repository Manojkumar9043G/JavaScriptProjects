const CartOpenBtn = document.querySelector('.shoppingCart');
const CartItems = document.querySelector('.CartItems');
const CartClose = document.querySelector('.close');
const AllFoodIcons = document.getElementsByClassName('cart');
const CartContainer = document.querySelector('.items');
let count = 0;

CartClose.addEventListener('click',()=>{
    CloseCart();
})
CartOpenBtn.addEventListener('click',()=>{
    OpenCart();
})
function OpenCart(){
    CartItems.style.right='0';
}
function CloseCart(){
    CartItems.style.right='-260px';
}


AddToCart();
AmountChange();

function AddToCart(){
    for (const Foods of AllFoodIcons) {
        Foods.addEventListener('click',ResiveAddCart);
    }
}

function ResiveAddCart(){
    const foods = this.closest('.foods');
    const Price = this.closest('.lastItem');
    const foodName = foods.querySelector('.foodName').textContent.trim();
    const foodPrice = Price.querySelector('.foodPrice').textContent;
    const foodImg = foods.querySelector('img').src;
    console.log(foodImg);

    AddToTheCart(foodName,foodPrice,foodImg);
}


function AddToTheCart(foodName,foodPrice,foodImg){
    const newText = document.createElement('div');
    // const FoodQuantity = document.querySelector('.Quantity');
    count++;
    newText.classList.add('CartFoods');
    newText.innerHTML = `<div class="foodImg">
                    <img src="${foodImg}" alt="">
                </div>
                <div class="foodDetails">
                    <div class="CartfoodName">
                        ${foodName}
                    </div>
                    <div class="CartfoodPrice">
                        <span class="Fprice">${foodPrice}</span>
                    </div>
                    <input type="number" value="1" class="Quantity">
                </div>
                <div class="cartFoodPrice">
                    <div class="price">
                        ${foodPrice}
                    </div> 
                    <i class="fa-solid fa-trash-can Removecart"></i>
                </div>`;
    CartContainer.appendChild(newText);
    AmountChange();
    DeleteItem();
    ItemCount();
}



function DeleteItem(){
    const RemoveCart = document.querySelectorAll('.Removecart');
    RemoveCart.forEach(CartFood=>{
        CartFood.addEventListener('click',RemoveFromCart);
    });
}


function RemoveFromCart(){
    const RemoveCart = this.closest('.CartFoods');
    console.log(RemoveCart.querySelector('.CartfoodName'));
    RemoveCart.remove();
}

function AmountChange(){
    const QuantityChange = document.querySelectorAll('.Quantity');
    QuantityChange.forEach(Quantity => {
        Quantity.addEventListener('change',ChangeTotal);
    });
}


function ChangeTotal(){
    const value = this.value;
    const Price = this.closest('.CartFoods');
    const priceText = Price.querySelector('.Fprice').textContent;
    let numericPrice = priceText.replace('Rs.', '').trim();
    Price.querySelector('.price').innerHTML = numericPrice*value;
}

function ItemCount(){
    document.querySelector('.count').innerHTML = count;
}
