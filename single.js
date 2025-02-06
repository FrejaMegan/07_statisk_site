const urlParams = new URLSearchParams(window.location.search);
let productID = urlParams.get("id"); 

let productContainer = document.querySelector(".product-page");

if (!productID) {
    console.error("Intet produkt-ID fundet i URL'en");
} else {
    fetch(`https://kea-alt-del.dk/t7/api/products/${productID}`)
        .then((response) => response.json())
        .then((data) => {
            productContainer.innerHTML = `
                <div class="product-image-wrapper ${data.soldout === 1 ? "soldout" : ""}">
                    <div class="product-image">
                        <img src="https://kea-alt-del.dk/t7/images/webp/640/${data.id}.webp" alt="${data.productdisplayname}">
                        ${data.soldout === 1 ? `<div class="soldout-overlay">Udsolgt</div>` : ""}
                    </div>
                </div>

                <div class="product-info">
                    <h1 class="product-title">${data.productdisplayname}</h1>

                    <div class="product-price">
                        ${data.soldout === 1 ? `<span class="soldout-text">UDSOLGT</span>` : ""}
                        <span class="discounted-price">${data.price} kr</span>
                        ${data.discount ? `<span class="original-price">${data.price + data.discount} kr</span>` : ''}
                    </div>

                    <div class="product-description">
                        <p><strong>articletype:</strong> ${data.articletype}</p>
                        <p><strong>Brand:</strong> ${data.brandname}</p>
                        <p><strong>Gender:</strong> ${data.gender}</p>
                        <p><strong>agegroup:</strong> ${data.agegroup}</p>
                        <p><strong>Colour:</strong> ${data.color}</p>
                        <p><strong>Season:</strong> ${data.season || 'N/A'}</p>
                    </div>

                    <!-- Size selector -->
                    <div class="size-selector">
                        <label for="size">Vælg størrelse:</label>
                        <select id="size" name="size" ${data.soldout === 1 ? "disabled" : ""}>
                            <option value="small">Small</option>
                            <option value="medium">Medium</option>
                            <option value="large">Large</option>
                            <option value="xlarge">X-Large</option>
                        </select>
                    </div>

                    <div class="add-to-cart">
                        <button class="add-to-cart-btn" ${data.soldout === 1 ? "disabled" : ""}>Add to Cart</button>
                    </div>
                </div>
            `;
        })
        .catch((error) => console.error("Error fetching product data:", error));
}
