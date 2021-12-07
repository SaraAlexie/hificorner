const displayedItemsNumber = document.querySelector('.banner__item')
const productsContainer = document.querySelector("#products__container");
const searchBar = document.querySelector(".input__search");
const sortBySelector = document.querySelector('#sortBy')
const showSelector = document.querySelector('#show')
let productData = [];
let paraValue;
let displayedProducts = []

fetch('js/hifiproducts.js')
    .then(response => response.json())
    .then(data => {
        productData = sortAlphabetically(data)
        print()
        getUrlParams();
        // getUrlParamsManufacturer()
    })

function print() {
    productsContainer.innerHTML = ''
    displayedProducts = []

    for (let i = 0; i < productData.length; i++) {

        displayedProducts.push(productData[i])

        productsContainer.innerHTML +=
            `<a class="link__styling" href="produkt-single.html?productId=${productData[i].id}">
            <section class="product__container">
            <div class="img__container">
            <img class="product__img" src="${productData[i].image}" alt="${productData[i].name}">
            </div>
            <h3 class="product__price">${productData[i].name}</h3>
            <p class="product__price">${productData[i].price}</p>
            <button class="product__button">ADD TO CART</button>
            </section>
            </a>`;
    }
    numberOfItemsDisplayed()
}

// SEARCHBAR //
searchBar.addEventListener('keyup', (e) => {

    const searchString = e.target.value;

    const filteredProducts = productData.filter(product => {
        return product.name.includes(searchString) || product.category.includes(searchString);
    });

    displayedProducts = filteredProducts

    printFilteredProducts(filteredProducts, searchString)
});

function printFilteredProducts(filteredProducts, searchString) {
    console.log('printFilteredProducts');

    productsContainer.innerHTML = ''

    updatePath(searchString)
    numberOfItemsDisplayed()

    for (let i = 0; i < filteredProducts.length; i++) {
        productsContainer.innerHTML +=
            `<a class="link__styling" href="produkt-single.html?productId=${filteredProducts[i].id}">
        <section class="product__container">
        <div class="img__container">
        <img class="product__img" src="${filteredProducts[i].image}" alt="${filteredProducts[i].name}">
        </div>
        <h3 class="product__price">${filteredProducts[i].name}</h3>
        <p class="product__price">${filteredProducts[i].price}</p>
        <button class="product__button">ADD TO CART</button>
        </section>
        </a>`;
    }
    if (searchString != undefined && searchString != '') {
        document.querySelector('.title').innerHTML = `Search: ${searchString}`
        document.querySelector('#path-title').innerHTML = `Search: ${searchString}`
    }
}

// ==== UPDATE PATH ====
function updatePath(searchString) {
    console.log('updatePath');

    if (searchString === undefined || searchString === '') {
        if (paraValue === null) {
            document.querySelector('.title').innerHTML = 'all products'
            document.querySelector('#path-title').innerHTML = 'all products'
        } else {
            document.querySelector('.title').innerHTML = paraValue
            document.querySelector('#path-title').innerHTML = paraValue
        }
    }
}

// SEARCHBAR END //


function getUrlParams() {
    console.log('getUrlParams');

    let url = window.location.search

    let urlSearch = new URLSearchParams(url)

    paraValue = urlSearch.get("category");

    if (paraValue != null) {
        filters()
    }
    if (urlSearch.has("manufacturer")) {
        paraValue = urlSearch.get("manufacturer")
        filtersManufacturer()
    }
    if (paraValue === null) {
        print()
    }
}

/* Categori */


function filters() {
    filteredProducts = productData.filter(products => {
        return products.category.toLowerCase().includes(paraValue);
    });
    displayedProducts = filteredProducts
    printFiltered()
}

function printFiltered() {
    productsContainer.innerHTML = ""

    updatePath()
    numberOfItemsDisplayed()

    for (let i = 0; i < filteredProducts.length; i++) {
        productsContainer.innerHTML +=
            `<a class="link__styling" href="produkt-single.html?productId=${filteredProducts[i].id}">
        <section class="product__container">
        <div class="img__container">
        <img class="product__img" src="${filteredProducts[i].image}" alt="${filteredProducts[i].name}">
        </div>
        <h3 class="product__price">${filteredProducts[i].name}</h3>
        <p class="product__price">${filteredProducts[i].price}</p>
        <button class="product__button">ADD TO CART</button>
        </section>
        </a>`;
    }
}

// function getUrlParamsManufacturer() {
//     console.log('getUrlParamsManufacturer');

//     let url = window.location.search

//     let urlSearch = new URLSearchParams(url)

//     paraValueManufacturer = urlSearch.get("manufacturer");

//     if (paraValueManufacturer != null) {
//         filtersManufacturer()
//     }
// }

function filtersManufacturer() {
    filteredProducts = productData.filter(products => {
        return products.manufacturer.includes(paraValue);
    });
    displayedProducts = filteredProducts
    printFilteredManufacturer()
}

function printFilteredManufacturer() {
    productsContainer.innerHTML = ""

    updatePath()
    numberOfItemsDisplayed()

    for (let i = 0; i < filteredProducts.length; i++) {
        productsContainer.innerHTML +=
            `<a class="link__styling" href="produkt-single.html?productId=${filteredProducts[i].id}">
        <section class="product__container">
        <div class="img__container">
        <img class="product__img" src="${filteredProducts[i].image}" alt="${filteredProducts[i].name}">
        </div>
        <h3 class="product__price">${filteredProducts[i].name}</h3>
        <p class="product__price">${filteredProducts[i].price}</p>
        <button class="product__button">ADD TO CART</button>
        </section>
        </a>`;
    }
}

// ==== LISTENER ON SELECT SORT BY ====
sortBySelector.addEventListener('input', e => sortProducts(e))

// ==== SORT PRODUCTS ====
function sortProducts(e) {
    console.log('sortProducts');

    let sortedProducts = []

    if (e.target.value === 'alphabetical order') {

        sortedProducts = sortAlphabetically(displayedProducts)

    }
    if (e.target.value === 'price ascending') {

        sortedProducts = displayedProducts.sort((a, b) => (parseInt(a.price.slice(1), 10) > parseInt(b.price.slice(1), 10) ? 1 : -1))

    }
    if (e.target.value === 'price descending') {

        sortedProducts = displayedProducts.sort((a, b) => (parseInt(b.price.slice(1), 10) > parseInt(a.price.slice(1), 10) ? 1 : -1))
    }

    printFilteredProducts(sortedProducts)
}

// ==== SORT ALPHABETICALLY ====
function sortAlphabetically(array) {
    let sortedProducts = array.sort((a, b) => (a.name > b.name ? 1 : -1))
    return sortedProducts
}

// ==== PRINT THE NUMBER OF DISPLAYEDPRODUCTS ====
function numberOfItemsDisplayed() {
    if (displayedProducts.length === 1) {
        displayedItemsNumber.innerHTML = `1 Item`
    } else {
        displayedItemsNumber.innerHTML = `${displayedProducts.length} Items`
    }
}

const showOptions = document.querySelectorAll('#show .option__item')

// ==== LISTENER ON SELECT SHOW ====
showSelector.addEventListener('input', e => amountOfDisplayedProducs(e))

// ==== DISABLE OR ENABLE SELECT SHOW ====
showSelector.addEventListener('focus', () => {
    console.log('focus triggered');
    if (displayedProducts.length < 10) {
        console.log('disable');
        showOptions.forEach(option => option.setAttribute('disabled', 'disabled'))
    } else {
        console.log('remove disable');
        showOptions.forEach(option => option.removeAttribute('disabled'))
    }
})

// ==== CONTROL AMOUNT OF PRODUCTS DISPLAYED ====
function amountOfDisplayedProducs(e) {
    console.log('amountOfDisplayedProducs');

    let sortedProducts = []

    if (e.target.value === 'All') {
        getUrlParams();
    } else {
        if (e.target.value === '10') {
            for (let i = 0; i < 10; i++) {
                sortedProducts.push(displayedProducts[i])
            }
        }
        if (e.target.value === '20') {
            for (let i = 0; i < 20; i++) {
                sortedProducts.push(displayedProducts[i])
            }
        }
        if (e.target.value === '30') {
            for (let i = 0; i < 30; i++) {
                sortedProducts.push(displayedProducts[i])
            }
        }
        displayedProducts = sortedProducts
        printFilteredProducts(sortedProducts)
    }
}