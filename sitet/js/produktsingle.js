let productData = [];
const catStig = document.querySelector("#category-stig")
const namStig = document.querySelector("#name-stig")
const productImg = document.querySelector("#product-img");
const header = document.querySelector("#product-heading");
const seeMore = document.querySelector("#seeMore");
const price = document.querySelector("#price");
const about = document.querySelector("#description");
const manuData = document.querySelector("#manu-data")
const linkData = document.querySelector("#link-data")
const warrData = document.querySelector("#warr-data")
const deliData = document.querySelector("#deli-data")

fetch('js/hifiproducts.js')
    .then(response => response.json())
    .then(data => {
        productData = data
        getUrlParams()
    })

function getUrlParams() {
    let url = window.location.search
    let urlSearch = new URLSearchParams(url)
    let i = urlSearch.get("productId");
    print(i)
}

function print(i) {
    i--
    catStig.textContent = productData[i].category;
    catStig.setAttribute('href', `produktlager.html?category=${productData[i].category}`)
    namStig.textContent = productData[i].name;
    productImg.setAttribute('src', productData[i].image);
    productImg.setAttribute('alt', productData[i].name);
    header.textContent = productData[i].name;
    seeMore.innerHTML +=
    `<a class="produkt-beskrivelse__link" href="produktlager.html?manufacturer=${productData[i].manufacturer}">
    <h3 class="produkt-beskrivelse__see-more" id="seeMore">see other ${productData[i].manufacturer} products</h3></a>`
    price.textContent = productData[i].price;
    about.textContent = productData[i].description;
    manuData.textContent = productData[i].manufacturer;
    linkData.textContent = productData[i].name;
    linkData.setAttribute("href", productData[i].manufacturerLink);
    warrData.textContent = productData[i].warrenty;
    deliData.textContent = productData[i].deliveryTime;
}