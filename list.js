const mySeason = new URLSearchParams(window.location.search).get("season");
const productContainer = document.querySelector(".product_list_container");
const overskrift = document.querySelector("h1");

overskrift.innerHTML = mySeason;

fetch(`https://kea-alt-del.dk/t7/api/products/?season=${mySeason}`)
  .then((response) => response.json())
  .then((data) => showList(data));

function showList(products) {
  console.log("Fetched products:", products);

  let markup = "";
  markup = products
    .map(
      (product) => `
      <div class="product_card"> 
        <a href="produkt.html?id=${product.id}">
          <div class="product-image-wrapper ${product.soldout === 1 ? "soldout" : ""}">
            <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="${product.productdisplayname}">
          </div>
        </a>
        ${product.discount ? `<div class="discount-badge">${product.discount}% OFF</div>` : ""}

        <!-- Udsolgt Badge -->
        ${product.soldout === 1 ? `<div class="soldout-badge">Udsolgt</div>` : ""}

        <p class="product_name">${product.productdisplayname}</p>
        <p class="product_price">${product.price} DKK</p>

        <button class="add_to_cart" data-id="${product.id}" ${product.soldout === 1 ? "disabled" : ""}>Læg i kurv</button>
      </div>
  `
    )
    .join("");
  productContainer.innerHTML = markup;

  document.querySelectorAll(".add_to_cart").forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = event.target.dataset.id;
      console.log(`Produkt ${productId} tilføjet til kurv!`);
    });
  });
}
