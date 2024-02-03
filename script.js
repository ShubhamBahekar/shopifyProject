let currentTab = "men";
const defaultTabElement = document.getElementById("menTab");
defaultTabElement.classList.add("highlighted");

function handleTabClick(tab) {
  let currentTabElement = document.querySelector(".tab.highlighted");

  if (currentTabElement) {
    currentTabElement.classList.remove("highlighted");
  }

  tab.classList.add("highlighted");

  currentTab = tab.id.replace("Tab", "");
  console.log("Current Tab after click:", currentTab);

  init();
}

async function fetchCities(category) {
  try {
    let response = await fetch(
      `https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    let data = await response.json();
    console.log("Data fetched for category:", category, data);

    return data.categories;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}

function addDataToDOM(
  id,
  badge_text,
  image,
  title,
  vendor,
  price,
  compare_at_price
) {
  let content = document.querySelector(".products");

  let div = document.createElement("div");
  div.innerHTML = `
        <div class="card" data-product-id="${id}">
            <div class="headerCard">
            ${badge_text ? `<span class="badge">${badge_text}</span>` : ""}
                <img src="${image}" width="300px" height="100px" />
            </div>
            <div class="mainCard">
                <div class="title_vendor">
                    <h3>${title}</h3>
                    <p>${vendor}</p>
                </div>
                <div class="price_off">
                    <p>${price}</p>
                    <p>${compare_at_price}</p>
                    <p>50% Off</p>
                </div>
            </div>
            <div class="footerCard">
                <span>Add to cart</span>
            </div>
        </div>
    `;

  content.append(div);
}

async function init() {
  try {
    let data = await fetchCities(currentTab);
    console.log("Data in init function:", data);

    if (data && data.length > 0) {
      document.querySelector(".products").innerHTML = "";

      data.forEach((category) => {
        console.log("Category:", category);
        if (
          category.category_name.toLowerCase() === currentTab &&
          category.category_products &&
          category.category_products.length > 0
        ) {
          category.category_products.forEach((product) => {
            console.log("Adding product to DOM:", product);
            addDataToDOM(
              product.id,
              product.badge_text,
              product.image,
              product.title,
              product.vendor,
              product.price,
              product.compare_at_price
            );
          });
        } else {
          console.log("No products for this category.");
        }
      });
    } else {
      console.log("No data or empty array.");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

document.getElementById("menTab").addEventListener("click", function () {
  handleTabClick(this);
});

document.getElementById("womenTab").addEventListener("click", function () {
  handleTabClick(this);
});

document.getElementById("kidsTab").addEventListener("click", function () {
  handleTabClick(this);
});

init();
