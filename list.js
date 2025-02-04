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
        <a href="produkt.html">
          <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="${product.productdisplayname}">
        </a>
        ${product.discount ? `<div class="discount-badge">${product.discount}% OFF</div>` : ""}

        <p class="product_price">${product.price} DKK</p>
      </div>
  `
    )
    .join("");
  productContainer.innerHTML = markup;
}
