const categories = document.querySelectorAll(".category");
const productsContainer = document.querySelector(".products");
const productList = productsContainer.querySelector(".product-list");
const productInfo = document.querySelector(".product-info");
const productName = document.getElementById("product-name");
const productPrice = document.getElementById("product-price");
const productDescription = document.getElementById("product-description");
const buyButton = document.getElementById("buy-button");
const orderForm = document.querySelector(".order-form");
const orderInfo = document.querySelector("#order-info");
const orderFormElement = document.querySelector("#order-form");
const orderProduct = document.querySelector("#order-product-name");
const orderPrice = document.querySelector("#order-product-price");
const orderDescription = document.querySelector("#order-product-description");
const orderCustomerName = document.querySelector("#order-customer-name");
const orderCity = document.querySelector("#order-city");
const orderWarehouse = document.querySelector("#order-warehouse");
const orderPayment = document.querySelector("#order-payment");
const orderQuantity = document.querySelector("#order-quantity");
const orderComment = document.querySelector("#order-comment");
const orderSubmitButton = document.querySelector("#order-form button");
const orderSuccessMessage = document.querySelector("#order-success-message");
const resetAppButton = document.getElementById("reset-app");
const viewOrdersButton = document.getElementById("view-orders");

let selectedCategory = null;
let selectedProduct = null;
let initialCategoryState = null;

const categoryData = {
  Фрукти: [
    {
      name: "Яблука",
      price: 30,
      description: "Соковиті та солодкі яблука",
    },
    {
      name: "Банани",
      price: 20,
      description: "Смачні та поживні банани",
    },
  ],
  Овочі: [
    {
      name: "Морква",
      price: 15,
      description: "Свіжа та хрустка морква",
    },
    {
      name: "Помідори",
      price: 25,
      description: "Соковиті та ароматні помідори",
    },
  ],
  "М'ясо": [
    {
      name: "Курка",
      price: 40,
      description: "Ніжне та смачне куряче м'ясо",
    },
    {
      name: "Свинина",
      price: 50,
      description: "Сочна та смачна свинина",
    },
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
  resetOrderInfo();
}

function showProductInfo(product) {
  selectedProduct = product.textContent;

  productName.textContent = `Товар: ${product.textContent}`;
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
    selectedProduct = null;
    hideProductInfo();
    showCategoryProducts(initialCategoryState);
    showOrderForm();
  }
}

function showOrderForm() {
  orderFormElement.reset();
  orderProduct.textContent = selectedProduct;
  orderPrice.textContent = `Ціна: ${
    document.querySelector(".product[data-price]").dataset.price
  } грн`;
  orderDescription.textContent = `Опис: ${
    document.querySelector(".product[data-description]").dataset.description
  }`;

  productInfo.classList.add("hidden");
  orderForm.classList.remove("hidden");
  orderInfo.classList.add("hidden");
}

function submitOrder(event) {
  event.preventDefault();
  const customerName = document.querySelector("#name").value;
  const city = document.querySelector("#city").value;
  const warehouse = document.querySelector("#warehouse").value;
  const payment = document.querySelector("#payment").value;
  const quantity = document.querySelector("#quantity").value;
  const comment = document.querySelector("#comment").value;

  orderCustomerName.textContent = `ПІБ покупця: ${customerName}`;
  orderCity.textContent = `Місто: ${city}`;
  orderWarehouse.textContent = `Склад Нової пошти: ${warehouse}`;
  orderPayment.textContent = `Спосіб оплати: ${payment}`;
  orderQuantity.textContent = `Кількість: ${quantity}`;
  orderComment.textContent = `Коментар: ${comment}`;

  const productCost = parseFloat(productPrice.textContent.split(": ")[1]);
  const quantityOrdered = parseInt(
    orderQuantity.textContent.split(": ")[1],
    10
  );

  const totalPrice = productCost * quantityOrdered;

  const order = {
    date: new Date().toLocaleDateString(),
    product: orderProduct.textContent,
    price: totalPrice,
    description: orderDescription.textContent.split(": ")[1],
    customerName: orderCustomerName.textContent.split(": ")[1],
    city: orderCity.textContent.split(": ")[1],
    warehouse: orderWarehouse.textContent.split(": ")[1],
    payment: orderPayment.textContent.split(": ")[1],
    quantity: orderQuantity.textContent.split(": ")[1],
    comment: orderComment.textContent.split(": ")[1],
  };

  saveOrder(order);

  orderInfo.classList.remove("hidden");
  orderForm.classList.add("hidden");
}

function resetOrderInfo() {
  selectedCategory = null;
  selectedProduct = null;
  initialCategoryState = null;

  orderProduct.textContent = "";
  orderPrice.textContent = "";
  orderDescription.textContent = "";
  orderCustomerName.textContent = "";
  orderCity.textContent = "";
  orderWarehouse.textContent = "";
  orderPayment.textContent = "";
  orderQuantity.textContent = "";
  orderComment.textContent = "";
  orderInfo.classList.add("hidden");
}

function validateOrderForm() {
  const customerName = document.querySelector("#customer-name").value;
  const city = document.querySelector("#city").value;
  const warehouse = document.querySelector("#warehouse").value;
  const quantity = document.querySelector("#quantity").value;

  if (!customerName || !city || !warehouse || !quantity) {
    alert("Будь ласка, заповніть всі обов'язкові поля форми.");
    return false;
  }

  return true;
}

function resetApp() {
  selectedCategory = null;
  selectedProduct = null;
  productsContainer.classList.add("hidden");
  productInfo.classList.add("hidden");
  orderForm.classList.add("hidden");
  orderInfo.classList.add("hidden");
  productList.innerHTML = "";
  hideProductInfo();
  orderFormElement.reset();
  resetOrderInfo();
  showCategories();
  ordersContainer.classList.add("hidden");
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
  showOrderForm();
});

const ordersContainer = document.createElement("div");
document.body.appendChild(ordersContainer);

function saveOrder(order) {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders));
}

function getOrders() {
  return JSON.parse(localStorage.getItem("orders")) || [];
}

function displayOrders() {
  const orders = getOrders();
  ordersContainer.innerHTML = "";

  orders.forEach((order) => {
    const orderElement = document.createElement("div");
    orderElement.classList.add("order-entry");

    orderElement.innerHTML = `
          <div class="order-summary">
              <span>Дата: ${order.date}</span>
              <span>Продукт: ${order.product}</span>
              <span>Ціна: ${order.price}</span>
              <span>Опис: ${order.description}</span>
              <span>ПІБ покупця: ${order.customerName}</span>
              <span>Місто: ${order.city}</span>
              <span>Склад Нової пошти: ${order.warehouse}</span>
              <span>Спосіб оплати: ${order.payment}</span>
              <span>Кількість: ${order.quantity}</span>
              <span>Коментар: ${order.comment}</span>
          </div>
      `;
    ordersContainer.appendChild(orderElement);
  });
}

function showOrdersView() {
  resetApp();
  displayOrders();
  ordersContainer.classList.remove("hidden");
}

viewOrdersButton.addEventListener("click", showOrdersView);

orderFormElement.addEventListener("submit", submitOrder);

resetAppButton.addEventListener("click", resetApp);

showCategories();
