const productContainer = document.querySelector(".category_grid");

fetch("https://kea-alt-del.dk/t7/api/seasons")
  .then((response) => response.json())
  .then((seasons) => showList(seasons));

function showList(seasons) {
  console.log("Fetched seasons:", seasons);

  const markup = seasons
    .map(
      (seasons) => `
    <div class="category_grid">
      <div class="category_box"><a href="produktliste.html?season=${seasons.season}">${seasons.season}</a></div>      
    </div>
  `
    )
    .join("");

  console.log("min markup er", markup);
  productContainer.innerHTML += markup;
}
