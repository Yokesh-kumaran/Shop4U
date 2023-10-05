//SETTING INITIAL PRODUCTS
let initialProducts = [
  {
    id: 1,
    title: "Rolex",
    description: "Rolex branded watch",
    price: 100000,
    thumbnail:
      "https://images.hbjo-online.com/images/rolex/detail2/watch_assets_front_facing/m128235-0052_modelpage_front_facing_landscape.png",
  },

  {
    id: 2,
    title: "Patek Philippe SA",
    description: "Patek Philippe SA branded watch",
    price: 200000,
    thumbnail:
      "https://m.media-amazon.com/images/I/61V7QWFHKiL._AC_UF1000,1000_QL80_.jpg",
  },

  {
    id: 3,
    title: "Seiko",
    description: "Seiko branded watch",
    price: 230000,
    thumbnail:
      "https://cdn1.ethoswatches.com/media/catalog/product/cache/5b6ffe97254a86fab5749cb594365e70/s/e/seiko-prospex-ssc813p1.jpg",
  },

  {
    id: 4,
    title: "Breitling SA",
    description: "Breitling SA branded watch",
    price: 40000,
    thumbnail:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Breitling_MG_2705.jpg/271px-Breitling_MG_2705.jpg",
  },

  {
    id: 5,
    title: "IWC",
    description: "IWC branded watch",
    price: 50000,
    thumbnail:
      "https://cdn1.ethoswatches.com/media/catalog/product/cache/5b6ffe97254a86fab5749cb594365e70/i/w/iwc-pilots-watches-iw328204.jpg",
  },

  {
    id: 6,
    title: "Omega",
    description: "Omega branded watch",
    price: 549000,
    thumbnail:
      "https://cdn1.ethoswatches.com/media/catalog/product/cache/6e5de5bc3d185d8179cdc7258143f41a/o/m/omega-seamaster-210-62-42-20-03-001-multiple-3.jpg",
  },

  {
    id: 7,
    title: "Audemars Piguet",
    description: "Audemars Piguet branded watch",
    price: 600000,
    thumbnail:
      "https://cdn-images.farfetch-contents.com/19/88/15/15/19881515_44685331_1000.jpg",
  },

  {
    id: 8,
    title: "Tag Heuer",
    description: "Tag Heuer branded watch",
    price: 250000,
    thumbnail:
      "https://www.tagheuer.com/on/demandware.static/-/Library-Sites-TagHeuer-Shared/default/dw94f5d6dd/images/sprites/Carrera/CBN2A1N.BA0643/RTW_backUp.jpg",
  },

  {
    id: 9,
    title: "Casio",
    description: "Casio branded watch",
    price: 400000,
    thumbnail:
      "https://m.media-amazon.com/images/I/61ybeKQto8L._AC_UY1000_.jpg",
  },

  {
    id: 10,
    title: "Cartier",
    description: "Cartier branded watch",
    price: 449000,
    thumbnail:
      "https://www.cartier.com/dw/image/v2/BFHP_PRD/on/demandware.static/-/Sites-cartier-master/default/dw58b40762/images/large/8fe100a33e9b5b1daa66a7afaf21a700.png?sw=750&sh=750&sm=fit&sfrm=png",
  },
];

//SETTING INITIAL USERS
let initialUsers = [
  { id: 1, email: "yokesh@admin.com", password: "yokesh" },
  { id: 2, email: "sanjay@admin.com", password: "sanjay" },
  { id: 3, email: "sankar@admin.com", password: "sankar" },
];

let products = [];
let cart = [];
let orders = [];
let users = [];

//EVENT LISTENER
window.addEventListener("load", () => {
  //LOADING PRODUCTS
  if (!localStorage.getItem("products")) {
    localStorage.setItem("products", JSON.stringify(initialProducts));
  }

  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify(initialUsers));
  }

  if (location.pathname === "/Shop4U/ui/admin_index.html") {
    adminHomePageLoad();
  }

  if (location.pathname === "/Shop4U/ui/add_product.html") {
    let params = new URL(document.location).searchParams;
    let productId = params.get("id");
    if (productId) {
      const products = JSON.parse(localStorage.getItem("products"));
      const product = products.find(
        (product) => product.id === parseInt(productId)
      );
      populatingProduct(product);
    }
  }

  if (location.pathname === "/Shop4U/ui/product_detail.html") {
    loadUserPage();
  }

  if (location.pathname === "/Shop4U/ui/user_cart.html") {
    cartPageLoad();
  }

  if (
    location.pathname === "/Shop4U/ui/product_detail.html" ||
    location.pathname === "/Shop4U/ui/user_orders.html" ||
    location.pathname === "/Shop4U/ui/user_cart.html"
  ) {
    updateCartCount();
  }

  if (location.pathname === "/Shop4U/ui/user_orders.html") {
    orderPageLoad();
  }

  if (location.pathname === "/Shop4U/ui/admin_orders.html") {
    adminOrderPageLoad();
  }
});

//RANDOM NUMBER-WILL NOT ALWAYS RANDOM
const randomNumber = (max = 1000) => {
  return Math.floor(Math.random() * max);
};

//CREATING USER ID
const getRandomUserId = (type = "users") => {
  let jsonArray = JSON.parse(localStorage.getItem(type));
  for (let i = 0; i < 10000; i++) {
    const randomId = randomNumber();

    const checkingId = users.find((obj) => obj.id === randomId);
    if (!checkingId) {
      return randomId;
    }
  }
};

//SIGN IN
const signInHandler = () => {
  event.preventDefault();
  const emailRef = document.getElementById("email");

  const passwordRef = document.getElementById("password");
  const errorRef = document.getElementById("error");

  if (emailRef.value.length > 0 && passwordRef.value.length > 0) {
    if (
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(emailRef.value)
    ) {
      let users = JSON.parse(localStorage.getItem("users"));
      const loggedInUser = users.find(
        (user) =>
          user.email === emailRef.value && user.password === passwordRef.value
      );

      if (!loggedInUser) {
        errorRef.innerText = "invalid credentials";
      } else {
        sessionStorage.setItem("userId", loggedInUser.id);
        if (
          emailRef.value === "sanjay@admin.com" &&
          passwordRef.value === "sanjay"
        ) {
          location.replace("/Shop4U/ui/admin_index.html");
        } else {
          location.replace("/Shop4U/ui/product_detail.html");
        }
      }
    } else {
      errorRef.innerText = "Invalid Email Address";
    }
  } else if (emailRef.value.length === 0 && passwordRef.value.length === 0) {
    errorRef.innerText = "Please fill the fields";
  } else if (emailRef.value.length === 0) {
    errorRef.innerText = "Email field is empty";
  } else if (passwordRef.value.length === 0) {
    errorRef.innerText = "Password field is empty";
  }
};

//NEW REGISTRATION
const signUpHandler = () => {
  event.preventDefault();
  const userEmailRef = document.getElementById("userEmail");
  const userNameRef = document.getElementById("userName");
  const userPassRef = document.getElementById("userPass");
  const userConfirmPassRef = document.getElementById("userConfirmPass");
  const mistakeRef = document.getElementById("mistake");

  if (
    userEmailRef.value.length > 0 &&
    userNameRef.value.length > 0 &&
    userPassRef.value.length > 0 &&
    userConfirmPassRef.value.length > 0
  ) {
    if (
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(userEmailRef.value)
    ) {
      if (userPassRef.value === userConfirmPassRef.value) {
        let users = JSON.parse(localStorage.getItem("users"));

        users.push({
          id: getRandomUserId(),
          email: userEmailRef.value,
          password: userPassRef.value,
        });

        localStorage.setItem("users", JSON.stringify(users));
      } else {
        mistakeRef.innerText = "Password should be same!!";
      }
    } else {
      mistakeRef.innerText =
        "Invalid Email.Should be in the form of '___@___.___'";
    }
  } else {
    mistakeRef.innerText = "Please fill the fields without being empty";
  }
};

//SAVING OR UPDATING PRODUCTS
const addProductHandler = () => {
  event.preventDefault();
  const productNameRef = document.getElementById("productName");
  const productIdRef = document.getElementById("productId");
  const productPriceRef = document.getElementById("productPrice");
  const productDescriptionRef = document.getElementById("productDescription");
  const productUrlRef = document.getElementById("productUrl");
  const toastRef = document.getElementById("toast");
  const toastMessageRef = document.getElementById("toastMessage");

  let products = JSON.parse(localStorage.getItem("products"));

  let productId = productIdRef.value;
  if (productId) {
    const product = products.find(
      (product) => product.id === parseInt(productId)
    );

    products = products.filter((product) => product.id !== parseInt(productId));

    products.push({
      ...product,
      title: productNameRef.value,
      description: productDescriptionRef.value,
      price: productPriceRef.value,
      thumbnail: productUrlRef.value,
    });

    toastMessageRef.innerText = "Product Updated Successfully...Thank you..";
  } else {
    products.push({
      id: getRandomUserId("products"),
      title: productNameRef.value,
      description: productDescriptionRef.value,
      price: productPriceRef.value,
      thumbnail: productUrlRef.value,
    });

    toastMessageRef.innerText = "Product Added Successfully...Thank you..";
  }
  toastRef.classList.add("fade", "show");

  setTimeout(() => {
    toastRef.classList.remove("fade", "show");
  }, 4000);

  localStorage.setItem("products", JSON.stringify(products));
  location.href = "../Shop4U/ui/admin_index.html";
};

//USER LOG OUT HANDLING
const userLogOutHandler = () => {
  const state = { page: "login" };
  const title = "Login Page";
  const url = "/Shop4U/ui/login.html";
  history.replaceState(state, title, url);

  event.preventDefault();

  location.replace("/Shop4U/ui/login.html");
  console.log("success");
};

//PROCESS WHEN ADMIN HOME PAGE LOADED
const adminHomePageLoad = () => {
  const productsShowAdminRef = document.getElementById("productsShowAdmin");
  const products = JSON.parse(localStorage.getItem("products"));

  let body = "";
  for (let product of products) {
    body += `<tr>
    <td><img src="${
      product.thumbnail
    }" alt="Image" class="img-fluid img-thumbnail" style="width:120px; height:100px;"</td>
    <td>${product.title}</td>
    <td>${product.description.substring(0, 50)}...</td>
    <td>₹ 
    ${product.price}</td>
    <td class="text-center">
      <button type="button" class="btn btn-info" onclick="editProductHandler(${
        product.id
      })">
        Edit
      </button>
      <button type="button" class="ms-3 btn btn-danger" onclick="deleteProductHandler(${
        product.id
      })">
        Delete
      </button>
    </td>
  </tr>`;
  }

  productsShowAdminRef.innerHTML = body;
};

//DELETING PRODUCTS IN ADMIN PAGE
const deleteProductHandler = (id) => {
  const products = JSON.parse(localStorage.getItem("products"));
  const newProducts = products.filter((product) => product.id !== id);
  localStorage.setItem("products", JSON.stringify(newProducts));
  adminHomePageLoad();
};

//EDITING PRODUCTS IN ADMIN PAGE
const editProductHandler = (id) => {
  location.href = `/Shop4U/ui/add_product.html?id=${id}`;
};

//POPULATING THE PRODUCT IN ADD PRODUCT PAGE
const populatingProduct = (product) => {
  const productNameRef = document.getElementById("productName");
  const productPriceRef = document.getElementById("productPrice");
  const productDescriptionRef = document.getElementById("productDescription");
  const productUrlRef = document.getElementById("productUrl");
  const productIdRef = document.getElementById("productId");
  const changeTitleRef = document.getElementById("changeTitle");
  const changeButtonRef = document.getElementById("changeButton");

  productIdRef.value = product.id;
  productNameRef.value = product.title;
  productPriceRef.value = product.price;
  productDescriptionRef.value = product.description;
  productUrlRef.value = product.thumbnail;
  changeTitleRef.innerText = "Edit Product";
  changeButtonRef.innerText = "Update Product";
};

//LOADING PRODUCTS IN USER PAGE
const loadUserPage = () => {
  const productsRef = document.getElementById("productsRow");
  const products = JSON.parse(localStorage.getItem("products"));

  let body = "";
  for (let product of products) {
    body += `<div class="col-3 mt-4">
    <div
      class="border rounded p-2 bg-primary-subtle border-primary-subtle w-100 d-flex flex-column"
    >
      <img src="${product.thumbnail}" alt="image" style="min-width:200px;height:200px" />
      <p class="fs-5 my-1 mt-2 text-center">${product.title}</p>
      <p class="fs-4 my-1 mb-2 text-center">₹ ${product.price}</p>
      <button class="btn btn-success" onClick="addToCartHandler(${product.id})">Add to Cart</button>
    </div>
  </div>`;
  }

  productsRef.innerHTML = body;
};

//ADDING TO CART AFTER CLICKING(ADD TO CART)
const addToCartHandler = (id) => {
  let products = JSON.parse(localStorage.getItem("products"));
  const product = products.find((product) => product.id === parseInt(id));

  if (!sessionStorage.getItem("userId")) {
    location.href = "/Shop4U/ui/login.html";
  } else {
    let userId = parseInt(sessionStorage.getItem("userId"));
    let cart = [];
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    const cartProduct = cart.find(
      (c) => c.userId === parseInt(userId) && c.id === parseInt(id)
    );
    if (cartProduct) {
      cart = cart.map((c) => {
        if (c.id === parseInt(id) && c.userId === parseInt(userId)) {
          return { ...c, count: c.count + 1 };
        } else {
          return c;
        }
      });
    } else {
      cart.push({ userId: parseInt(userId), count: 1, ...product });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
  }
};

//UPDATING CART COUNT IN NAVBAR
const updateCartCount = () => {
  const cartCountRef = document.getElementById("cartCount");
  if (sessionStorage.getItem("userId")) {
    const userId = parseInt(sessionStorage.getItem("userId"));
    if (localStorage.getItem("cart")) {
      const cart = JSON.parse(localStorage.getItem("cart"));
      const userCart = cart.filter((c) => c.userId === userId);

      if (userCart.length > 0) {
        const cartCount = userCart.reduce((acc, curr) => {
          acc += curr.count;
          return acc;
        }, 0);
        cartCountRef.innerText = `Cart - ${cartCount}`;
      } else cartCountRef.innerText = `Cart`;
    }
  } else location.href = "/Shop4U/ui/login.html";
};

//UPDATING CART BODY WHILE ADDING PRODUCTS
const cartPageLoad = () => {
  const cartBodyRef = document.getElementById("cartBody");
  const totalRef = document.getElementById("total");
  const emptyCartRef = document.getElementById("emptyCart");
  const tableRef = document.getElementById("table");

  if (localStorage.getItem("cart")) {
    const cart = JSON.parse(localStorage.getItem("cart"));

    if (sessionStorage.getItem("userId")) {
      const userId = parseInt(sessionStorage.getItem("userId"));
      const userCart = cart.filter((c) => c.userId === userId);

      if (userCart.length > 0) {
        tableRef.classList.remove("visually-hidden");
        emptyCartRef.classList.add("visually-hidden");
      } else {
        emptyCartRef.classList.remove("visually-hidden");
        tableRef.classList.add("visually-hidden");
      }

      let body = "";
      let total = 0;
      for (let carts of userCart) {
        total = total + parseInt(carts.count) * parseInt(carts.price);
        const count = carts.count * carts.price;
        body += `<tr>
                  <td>${carts.title}</td>
                  <td>${carts.price}</td>
                  <td>${carts.count}</td>
                  <td>₹ ${count}</td>
                  <td><button  type="button" class="btn btn-danger" onclick="deleteCartBodyProducts(${carts.id})">Delete</td>
                </tr>`;
      }
      cartBodyRef.innerHTML = body;
      totalRef.innerText = `Total - ₹ ${total}/-Only`;
    } else {
      location.href = "/Shop4U/ui/login.html";
    }
  }
};

//DELETING PRODUCTS IN USERCART
deleteCartBodyProducts = (id) => {
  const products = JSON.parse(localStorage.getItem("cart"));
  const filteredProducts = products.filter((product) => product.id !== id);
  localStorage.setItem("cart", JSON.stringify(filteredProducts));
  location.reload("/Shop4U/ui/user_cart.html");
  cartPageLoad();
};

//AFTER CLICKING CHECK OUT FROM CART(USER)
const checkOutHandler = () => {
  if (sessionStorage.getItem("userId")) {
    if (localStorage.getItem("cart")) {
      const cart = JSON.parse(localStorage.getItem("cart"));
      const userId = parseInt(sessionStorage.getItem("userId"));
      const userCart = cart.filter((c) => c.userId === userId);

      let orders = [];
      if (localStorage.getItem("orders")) {
        orders = JSON.parse(localStorage.getItem("orders"));
      }
      orders.push({
        timestamp: Date.now(),
        userId: userId,
        status: "Pending",
        products: userCart,
      });

      const otherUserCart = cart.filter((c) => c.userId !== userId);
      localStorage.setItem("cart", JSON.stringify(otherUserCart));
      localStorage.setItem("orders", JSON.stringify(orders));
      updateCartCount();
      location.href = "/Shop4U/ui/product_detail.html";
    } else {
      location.href = "/Shop4U/ui/product_detail.html";
    }
  } else {
    location.href = "/Shop4U/ui/login.html";
  }
};

//LOADING ORDERS IN ORDER PAGE(USER)
const orderPageLoad = () => {
  const orderTableRef = document.getElementById("orderTable");

  if (sessionStorage.getItem("userId")) {
    if (localStorage.getItem("orders")) {
      const orders = JSON.parse(localStorage.getItem("orders"));
      const userId = parseInt(sessionStorage.getItem("userId"));
      const userOrder = orders.filter((order) => order.userId === userId);

      let body = "";
      for (let order of userOrder) {
        let product = "";
        let total = 0;
        for (let products of order.products) {
          product += `<p>${products.title}  (${products.count})</p>`;
          total += products.count * products.price;
        }

        const date = new Date(order.timestamp);
        const formattedDate =
          date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();

        body += `<tr>
            <td>${order.timestamp}</td>
            <td>${formattedDate}</td>
            <td>${product}</td>
            <td>₹ ${total}</td>
            <td>${order.status}</td>
          </tr>`;
      }
      orderTableRef.innerHTML = body;
    } else {
      location.href = "/Shop4U/ui/product_detail.html";
    }
  } else {
    location.href = "/Shop4U/ui/login.html";
  }
};

//LOADING ORDERS IN ORDER PAGE(ADMIN)
const adminOrderPageLoad = () => {
  const adminOrderTableRef = document.getElementById("adminOrderTable");

  if (sessionStorage.getItem("userId")) {
    if (localStorage.getItem("orders")) {
      const orders = JSON.parse(localStorage.getItem("orders"));

      let body = "";
      for (let order of orders) {
        let product = "";
        let total = 0;
        for (let products of order.products) {
          product += `<p>${products.count} * ${products.title}</p>`;
          total += products.count * products.price;
        }

        const date = new Date(order.timestamp);
        const formattedDate =
          date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();

        const users = JSON.parse(localStorage.getItem("users"));
        const orderedUser = users.find(
          (user) => user.id === parseInt(order.userId)
        );

        body += `<tr>
            <td>${order.timestamp}</td>
            <td>${formattedDate}</td>
            <td>${orderedUser.email}</td>
            <td>${product}</td>
            <td>₹ ${total}</td>
            <td>
              <select class="form-select" id="status-${order.timestamp}">
                <option value="Pending">Pending</option>
                <option value="Order Booked">Order Booked</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </td>
          </tr>`;
      }
      adminOrderTableRef.innerHTML = body;

      for (let order of orders) {
        const statusRef = document.getElementById(`status-${order.timestamp}`);
        statusRef.value = order.status;
        statusRef.addEventListener("change", () => {
          const lastUpdatedOrders = JSON.parse(localStorage.getItem("orders"));
          const updatedOrders = lastUpdatedOrders.map((o) => {
            if (o.timestamp === order.timestamp) {
              return { ...o, status: statusRef.value };
            } else return o;
          });
          localStorage.setItem("orders", JSON.stringify(updatedOrders));
        });
      }
    } else {
      location.href = "/Shop4U/ui/index.html";
    }
  } else {
    location.href = "/Shop4U/ui/login.html";
  }
};
