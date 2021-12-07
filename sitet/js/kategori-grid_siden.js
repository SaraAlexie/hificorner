
// ==== FETCH PRODUCT DATA ====
fetchData();
async function fetchData() {
    const response = await fetch('js/category_manufacturer.js')
    const categoryManufacturer = await response.json()

    addCategoriesToHTML(categoryManufacturer)
}

// ==== ADD CATEGORIES TO HTML ====
function addCategoriesToHTML(result) {
    for (let i = 0; i < result[0].categories.length; i++) {

        const category = result[0].categories[i]

        document.querySelector('#products__container').innerHTML +=
            `<section class="category-box">
            <div class="category-box__overlay"></div>
            <a href="produktlager.html?category=${category.name}" class="category-box__link"></a>
            <img src="${category.image}" alt="${category.name} category" class="category-box__image">
            <h2 class="category-box__header">${category.name}</h2>
            </section>`
    }
}
