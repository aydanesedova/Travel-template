let page = 1;
let limit = 3;

const renderProducts = () => {
  axios
    .get(
      `https://655c83b725b76d9884fd6e9b.mockapi.io/products?limit=${limit}&page=${page}`
    )
    .then((res) => {
      db = res.data;
      db.map((item) => {
        let miniDiv = document.createElement("div");
        miniDiv.className = "miniDiv";
        miniDiv.innerHTML = `
            <img src="${item.image}" alt="">
            <h2>${item.title}</h2>
            <h2>${item.price} $</h2>

            <div class="wishAdd">
                <button onclick = "addToCart(${item.id})">+ ADD TO CART</button>
            <button class="wish" onclick = "addToWish(${item.id})"><i class="fa-light fa-heart"></i></button>
</div>

            `;
        producsAll.append(miniDiv);
      });
      page++;
    });
};

loadMore.addEventListener("click", renderProducts);

const addToCart = (id) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(db.find((item) => item.id == id));
  localStorage.setItem("cart", JSON.stringify(cart));
};
const addToWish = (id) => {
  let cart = JSON.parse(localStorage.getItem("wishList")) || [];
  cart.push(db.find((item) => item.id == id));
  localStorage.setItem("wishList", JSON.stringify(cart));
};
window.onload = () => {
  renderProducts();
};

const btn = document.getElementById("btn");
const inp = document.getElementById("inp");

function findByName() {
  producsAll.innerHTML = ``;
  axios
    .get("https://655c83b725b76d9884fd6e9b.mockapi.io/products")
    .then((res) => {
      db = res.data;
      let filteredData = db.filter((item) =>
        item.title.toLowerCase().startsWith(inp.value.toLowerCase())
      );
      let sortData = [...filteredData].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
      sortData.map((item) => {
        let miniDiv = document.createElement("div");
        miniDiv.className = "miniDiv";
        miniDiv.innerHTML = `
            <img src="${item.image}" alt="">
            <h2>${item.title}</h2>
            <div class="wishAdd">
                <button onclick = "addToCart(${item.id})">+ ADD TO CART</button>
            <button class="wish" onclick = ""><i class="fa-light fa-heart"></i></button>
</div>

            `;
        producsAll.append(miniDiv);
        console.log(findByName);
      });
    });
}

btn.addEventListener("click", findByName);

const myForm = document.getElementById("myForm");
const nameinp = document.getElementById("nameinp");
const surnameinp = document.getElementById("surnameinp");
const emailinp = document.getElementById("emailinp");
const logInBtn = document.getElementById("logInBtn");

myForm.addEventListener("submit", function (event) {
  event.preventDefault();
  axios
    .post("https://655c83b725b76d9884fd6e9b.mockapi.io/basket", {
      name: nameinp.value,
      surname: surnameinp.value,
      email: emailinp.value,
    })
    .then((res) => {
      console.log(res.data);
      myForm.reset();
    });
  setTimeout(function () {
    window.location.href = "index.html";
  }, 2000);
});
