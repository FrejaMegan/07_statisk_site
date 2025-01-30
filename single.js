let productID = 1538;
let productContainer = document.querySelector(".product-page");

fetch(`https://kea-alt-del.dk/t7/api/products/${productID}`)
    .then((response) => response.json())
    .then((data) => {
        productContainer.innerHTML = `
            <div class="product-image">
                <img src="https://kea-alt-del.dk/t7/images/webp/640/${data.id}.webp" alt="${data.productdisplayname}">
            </div>
            
            <div class="product-info">
                <h1 class="product-title">${data.productdisplayname}</h1>
                
                <div class="product-price">
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
        
                <div class="add-to-cart">
                    <button class="add-to-cart-btn">Add to Cart</button>
                </div>
            </div>
        `;
    })
    .catch((error) => console.error("Error fetching product data:", error));
