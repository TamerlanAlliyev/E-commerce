"use strict";

const cartList = document.getElementById("cartList");
const fetchedCartItems = JSON.parse(localStorage.getItem("cartItems"));
cartList.innerHTML = "";

fetchedCartItems.forEach((item, index) => {
    let priceContent = "";
    if (item.count > 1) {
        priceContent = `${item.count} x ${item.price} AZN | <span class="font-black">${item.count * item.price} AZN</span>`;
    } else {
        priceContent = `${item.price} AZN`;
    }

    cartList.innerHTML += ` 
        <div class="flex gap-5 h-96 min-w-fit">
            <div class="border border-neutral-200 rounded-lg">
                <img src="${item.image}" alt="" class="h-full" />
            </div>
            <div class="space-y-5">
                <div>
                    <h3 class="text-xl font-bold">${item.name}</h3>
                    <h4 class="font-bold text-neutral-500">${item.category}</h4>
                </div>
                <div class="flex gap-5">
                    <div class="h-8 w-8 border flex items-center justify-center rounded-full cursor-pointer ${item.color === "black" ? "bg-black" : `bg-${item.color}-500`}"></div>
                    <div class="font-bold bg-[#1D1D1D] uppercase text-white w-9 h-9 flex items-center justify-center rounded-lg">
                        xs
                    </div>
                </div>
                <div>
                    <span class="font-medium text-xl">${priceContent} | <span class="font-black">27.98 AZN</span></span>
                </div>
                <div class="flex items-center gap-6 font-black mb-8">
                    <button class="text-3xl decraseBtn">-</button>
                    <input
                        type="number"
                        min="1"
                        max="100"
                        class="border h-14 text-2xl text-center rounded-md counterElement"
                        value="${item.count}"
                    />
                    <button class="text-3xl incraseBtn">+</button>
                </div>
                <button class="flex items-center justify-between rounded-lg font-black uppercase text-white bg-black text-medium px-4 py-3 w-72">
                    Remove
                    <img src="../assets/icons/remove.svg" alt="" />
                </button>
            </div>
        </div>`;
});

const decraseBtn = document.querySelectorAll(".decraseBtn");
const counterElement = document.querySelectorAll(".counterElement");
const incraseBtn = document.querySelectorAll(".incraseBtn");

let itemCounts = fetchedCartItems.map((item) => item.count);

decraseBtn.forEach((decraseBtn, index) => {
    decraseBtn.addEventListener("click", () => {
        if (itemCounts[index] > 1) {
            itemCounts[index]--;
            counterElement[index].value = itemCounts[index];
        }
    });
});

incraseBtn.forEach((incraseBtn, index) => {
    incraseBtn.addEventListener("click", () => {
        if (itemCounts[index] < 10) {
            itemCounts[index]++;
            counterElement[index].value = itemCounts[index];
        }
    });
});
