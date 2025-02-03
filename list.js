const productContainer = document.querySelector(".product_list_container");

fetch("https://kea-alt-del.dk/t7/api/products?limit=100")
  .then((response) => response.json())
  .then((products) => showList(products));

function showList(products) {
  console.log("Fetched products:", products);

  const markup = products.map((product) => `
      <div class="product_card"> 
        <a href="produkt.html">
          <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="${product.productdisplayname}">
        </a>
        ${product.discount ? `<div class="discount-badge">${product.discount}% OFF</div>` : ""}

        <p class="product_price">${product.price} DKK</p>
      </div>
  `).join(""); 

  productContainer.innerHTML = markup;
}

