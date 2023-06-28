const categories = document.querySelectorAll(".category");
const productsContainer = document.querySelector(".products");
const productList = productsContainer.querySelector(".product-list");
const productInfo = document.querySelector(".product-info");
const productName = document.getElementById("product-name");
const productPrice = document.getElementById("product-price");
const productDescription = document.getElementById("product-description");
const buyButton = document.getElementById("buy-button");

let selectedCategory = null;
let selectedProduct = null;
let initialCategoryState = null;

const categoryData = {
  Фрукти: [
    { name: "Яблука", price: 10, description: "Соковите яблуко" },
    { name: "Банани", price: 8, description: "Солодкі банани" },
  ],
  Овочі: [
    { name: "Морква", price: 5, description: "Свіжа морква" },
    { name: "Картопля", price: 7, description: "Смачна картопля" },
  ],
  "М'ясо": [
    { name: "Свинина", price: 15, description: "Ніжне свиняче м'ясо" },
    { name: "Курка", price: 12, description: "Соковита курка" },
  ],
};

function showCategories() {
  productsContainer.classList.add("hidden");
  productInfo.classList.add("hidden");
}

function showCategoryProducts(category) {
  selectedCategory = category.textContent;

  const categoryProducts = categoryData[selectedCategory];

  productList.innerHTML = "";
  categoryProducts.forEach((product) => {
    const li = document.createElement("li");
    li.classList.add("product");
    li.textContent = product.name;
    li.dataset.price = product.price;
    li.dataset.description = product.description;
    productList.appendChild(li);
  });

  productsContainer.classList.remove("hidden");
  productInfo.classList.add("hidden");
  hideProductInfo();
}

function showProductInfo(product) {
  selectedProduct = product.textContent;

  productName.textContent = product.textContent;
  productPrice.textContent = `Ціна: ${product.dataset.price} грн`;
  productDescription.textContent = `Опис: ${product.dataset.description}`;

  productInfo.classList.remove("hidden");
}

function hideProductInfo() {
  productName.textContent = "";
  productPrice.textContent = "";
  productDescription.textContent = "";
  productInfo.classList.add("hidden");
}

function buyProduct() {
  if (selectedProduct) {
    alert(`Товар "${selectedProduct}" куплено!`);
    selectedProduct = null;
    hideProductInfo();
    showCategoryProducts(initialCategoryState);
  }
}

categories.forEach((category) => {
  category.addEventListener("click", () => {
    initialCategoryState = category.textContent;
    showCategoryProducts(category);
  });
});

productList.addEventListener("click", (event) => {
  const target = event.target;
  if (target.classList.contains("product")) {
    showProductInfo(target);
  }
});

buyButton.addEventListener("click", () => {
  buyProduct();
  productInfo.classList.add("hidden");
});

showCategories();
