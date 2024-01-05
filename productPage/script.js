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

// Size list
const sizeListLiElements = document.querySelectorAll("#sizeList li");
// const sizeListDatas = [...sizeListElements].map((item) => item.dataset.size);
const sizeListDatas = Array.from(sizeListLiElements).map((item) => item.dataset.size);
const sizeListBtnElements = document.querySelectorAll("#sizeList li button");

console.log(sizeListDatas);
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
let selectedSize;
let cartItem = [];

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
    let cartItems = JSON.parse(localStorage.getItem("cartItems"));

    if (!selectedSize) {
        alert("You must select a size");
        return;
    }

    const addedProduct = {
        name: pName(),
        image: image,
        price: price,
        category: category,
        color: color,
        sizes: selectedSize,
        count: count,
    };

    if (!cartItems) {
        cartItems = [addedProduct];
    } else {
        const exisitingProduct = cartItems.find((cartItem) => cartItem.name === pName && cartItem.name === selectedSize)
        const exisitingProductIndex = cartItems.find((cartItem) => cartItem.name === pName && cartItem.name === selectedSize)

        if (exisitingProduct && exisitingProductIndex !== undefined) {
            cartItem.splice(exisitingProductIndex,1)
            exisitingProduct.count += count;
            cartItems.push(exisitingProduct);
        }else{
            cartItems.push(addedProduct);
        }
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
});

sizeListDatas.forEach((size, index) => {
    if (!(sizes.includes(size))) {
        sizeListLiElements[index].classList.add("opacity-40")
        sizeListBtnElements[index].classList.add("cursor-not-allowed")
        sizeListBtnElements[index].setAttribute("disabled", true);
    }

    sizeListBtnElements[index].addEventListener('click', (event) => {
        selectedSize = size

        for (let i = 0; i < sizeListBtnElements.length; i++) {
            sizeListBtnElements[i].classList.remove("bg-black", 'text-white')
        }

        event.target.classList.add("bg-black", 'text-white')
    })
})