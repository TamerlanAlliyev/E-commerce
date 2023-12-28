"use strict";

import products from "./data.js";

const filterBtns = document.querySelectorAll(".filterBtn");
const filterLists = document.querySelectorAll(".filterList");
const chevronIcon = document.querySelectorAll(".chevronIcon");

const categoryItem = document.querySelectorAll("#categoryList li");
const colorItem = document.querySelectorAll("#colorList li");
const sizeItem = document.querySelectorAll("#sizeList li");


const colorItemsDots = document.querySelectorAll("#colorList li span");

const productsCount = document.getElementById("products-count");

const productsElement = document.getElementById("products");


const filteredCategories = [];
const filteredColors = [];
const filteredSizes = [];

filterBtns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    filterLists[index].classList.toggle("hidden");
    chevronIcon[index].classList.toggle("-rotate-180");
  });
});

categoryItem.forEach((item) => {
  item.addEventListener("click", () => {
    item.classList.toggle("font-black");
    const { category } = item.dataset;
    displayProduct();
    if (filteredCategories.includes(category)) {
      const categoryIndex = filteredCategories.indexOf(category);
      filteredCategories.splice(categoryIndex, 1);
    } else {
      filteredCategories.push(category);
    }
    displayProduct();
  });
});

colorItem.forEach((item, index) => {
  item.addEventListener("click", () => {
    const { color } = item.dataset;
    colorItemsDots[index].classList.toggle("hidden");
    displayProduct();
    const colorIndex = filteredColors.indexOf(color);
    if (colorIndex !== -1) {
      filteredColors.splice(colorIndex, 1);
    } else {
      filteredColors.push(color);
    }
    displayProduct();

  });
});

sizeItem.forEach((item) => {
  item.addEventListener("click", () => {
    const size = item.dataset.size;
    displayProduct();
    item.classList.toggle("!bg-black");
    item.classList.toggle("text-white");

    const index = filteredSizes.indexOf(size);
    if (index !== -1) {
      filteredSizes.splice(index, 1);
    } else {
      filteredSizes.push(size);
    }
    displayProduct();

  });
});



const displayProduct = () => {
  const filteredProduct = products.filter((product) => {
    if (
      filteredCategories.length === 0 &&
      filteredColors.length === 0 &&
      filteredSizes.length === 0
    ) {
      return true;
    }

    const categoryCondition =
      filteredCategories.length === 0 ||
      filteredCategories.includes(product.category);

    const colorCondition =
      filteredColors.length === 0 ||
      filteredColors.includes(product.color);

      const sizeCondition =
      filteredSizes.length === 0 ||
      filteredSizes.includes(product.size);

    return categoryCondition && colorCondition && sizeCondition;
  });

  productsElement.innerHTML = "";

  filteredProduct.forEach((product) => { 
    const cName = product.name
      .split(" ")
      .map((name) => name[0].toUpperCase() + name.slice(1))
      .join(" ");
    productsElement.innerHTML += `
      <div class="col-span-4 cursor-pointer productItem">
        <a href="../productPage/product.html"">
          <div class="mb-4 border border-neutral-200 rounded-lg">
            <img
              src="${product.image}"
              alt=""
              class="w-full h-[450px]"
            />
          </div>
          <div class="flex justify-between font-bold">
            <div>
              <h1 class="text-xl">${cName}</h1>
              <p class="text-neutral-500">${product.category}</p>
            </div>
            <h1 class="text-2xl">
              <span>${product.price}</span>
              AZN
            </h1>
          </div>
        </a>
      </div>`;

    const productItem = document.querySelectorAll(".productItem");

    productItem.forEach((productItem, index) => {
      productItem.addEventListener("click", () => {
        const selectedProduct = filteredProduct[index];
        localStorage.setItem("product", JSON.stringify(selectedProduct));
      });
    });
  });

  productsCount.textContent = filteredProduct.length;
  
};


displayProduct();
