// VARIABLES
const logoContainer = document.querySelector('#logoContainer');

// ==== FETCH PRODUCT DATA ====
fetchData();
async function fetchData() {
    const response = await fetch('js/category_manufacturer.js')
    const categoryManufacturer = await response.json()

    const manufacturersArray = categoryManufacturer[0].manufacturers
    addLogoToHTML(manufacturersArray)
}

// ==== ADD BRANDS LOGOS TO HTML ====
function addLogoToHTML(manufacturersArray){
    
    manufacturersArray.forEach(manufacturer => {
        logoContainer.innerHTML += `<img src="${manufacturer.logo}" alt="${manufacturer.name} logo" class="brands-stock__logo">`       
    });
}
