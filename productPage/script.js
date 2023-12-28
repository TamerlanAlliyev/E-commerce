"use strict";

const productCategory = document.getElementById("productCategory");
const productName = document.getElementById("productName");
const productPrice = document.getElementById("productPrice");
const productImage = document.getElementById("productImage");
const productColor = document.getElementById("productColor");

// Count and btn
const decreaseBtn = document.getElementById("decrease")
const counterElement = document.getElementById("counter")
const icreaseBtn = document.getElementById("icrease")

// Add To Cart
const addToCartBtn = document.getElementById("addToCart");


//                                  CODES


const { name, image, price, category, color, sizes } = JSON.parse(localStorage.getItem("product"));

// Names
const pName = () => {
    return name.split(" ").map((name) => name[0].toUpperCase() + name.slice(1)).join(" ");
};

// Colors
const colorsName = () => {
    if (color === "black") {
        return `bg-black`;
    } else {
        return `bg-${color}-500`;
    }
};

productCategory.textContent = category;
productName.textContent = pName();
productPrice.textContent = `${price} AZN`;
productImage.src = image;

productColor.classList.add(colorsName());


// Count and btn
let count = 1;
counterElement.value = count;


decreaseBtn.addEventListener('click', (event) => {
    if (count > 1) {
        count--;
    }

    counterElement.value = count;
})



icreaseBtn.addEventListener('click', (event) => {
    if (count < 10) {
        count++;
    }
    counterElement.value = count;
});

addToCartBtn.addEventListener("click", () => {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const addedProduct = {
        name: pName(),
        image: image,
        price: price,
        category: category,
        color: color,
        sizes: sizes,
        count: count,
    };

    cartItems.push(addedProduct);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
});
