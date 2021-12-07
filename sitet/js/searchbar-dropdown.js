// VARIABLES
const resultMenu = document.querySelector('.input__result-container')
const searchBar = document.querySelector('#searchBar')
let searchBarProducts;

// ==== LISTEN FOR INPUT IN SEARCHBAR ====
searchBar.addEventListener('keyup', (e) => {
    let searchText = searchBar.value.toLowerCase()
    filterSearchText(searchText, e)
    if (searchText === 'team power'){
        teamPower()    
    } 
})

// ==== OPEN AND CLOSE DROPDOWN MENU ====
document.addEventListener('click', (e) => {
    if (e.target.id === 'searchBar' && searchBar.value !== '') {
        resultMenu.style.display = 'grid'    
    }
    if (resultMenu.style.display === 'grid' && e.target.id !== 'searchBar') {
        resultMenu.style.display = 'none'

        childNumber = -1
        
        for (let i = 0; i < resultMenu.children.length; i++) {
            resultMenu.children[i].removeAttribute('style')  
        }
    }
})

// // ==== OPEN AND CLOSE DROPDOWN MENU ====
// searchBar.addEventListener('blur', () => {
//     if (searchBar.value !== ''){
//         setTimeout(openCloseMenu, 150)    
//     }
// })
// searchBar.addEventListener('focus', () => {
//     if (searchBar.value !== ''){
//         setTimeout(openCloseMenu, 150)    
//     }
// })
// function openCloseMenu(){
//     if (resultMenu.style.display === 'grid') {
//         resultMenu.style.display = 'none'
//     }else{
//         resultMenu.style.display = 'grid'    
//     }
// }

// ==== FETCH PRODUCT DATA ====
fetch('js/hifiproducts.js')
    .then(response => response.json())
    .then(data => {
        console.log('dataFetched');
        searchBarProducts = data
    })

// ==== FILTER SEARCH TEXT ====
//variable belonging to filter search text 
let childNumber = -1
function filterSearchText(searchText, e) {
    console.log('filterSearchText');

    let productData = searchBarProducts

    resultMenu.style.display = "grid"
    resultMenu.innerHTML = ''

    for (let i = 1; i < productData.length; i++) {
        if (productData[i].name.includes(searchText) || productData[i].category.includes(searchText)) {

            addResultToMenu(productData[i])
        }
    }
    if (searchText === '') {
        resultMenu.innerHTML = ''
        resultMenu.style.display = "none"
    }

    // Select result with arrow keys and enter:
    if (searchText != '') {
        let selectColor = "#f1f1f1"
        if (e.key === "ArrowDown") {
            if (childNumber === resultMenu.children.length - 1) {
                resultMenu.lastChild.style.backgroundColor = selectColor
            } else {
                childNumber++
                resultMenu.children[childNumber].style.backgroundColor = selectColor
            }
        }
        if (e.key === "ArrowUp") {
            if (childNumber <= 0) {
                resultMenu.firstChild.style.backgroundColor = selectColor
            } else {
                childNumber--
                resultMenu.children[childNumber].style.backgroundColor = selectColor
            }
        }
        if (e.key === "Enter") {
            if (childNumber === -1) {
                window.location.href = resultMenu.firstChild.href
            }
            window.location.href = resultMenu.children[childNumber].href
        }
        if (e.key === "Backspace"){
            childNumber = -1    
        }
    }
console.log(childNumber);    
}


// ==== ADD RESULT TO SEARCH DROPDOWN MENU ====
function addResultToMenu(productData) {
    console.log('addResultToMenu');
    const productId = productData.id
    resultMenu.innerHTML +=
        `<a class="input__result-link" href="produkt-single.html?productId=${productId}">
        <h3 class="input__result-sub-header">${productData.category}</h3>
        <div class="input__result-flex-container">
        <img class="input__result-image" src="${productData.image}" alt="${productData.name}">
        <h2 class="input__result-header" >${productData.name}</h2>
        </div> 
        </a>`
}

function teamPower(){
    document.querySelector('body').innerHTML += `<section style="z-index:10;position: fixed;left: 40%;top: 15%;background:rgb(255, 200, 98);padding: 3rem;">
    <h2>TEAM POWER DEVS:</h2><br>
    <p>Den seje reje AKA Andreas</p><br>
    <P>Sara</P><br>
    <p>Tobias</p><br>
    <p>Robert</p>
    </section>
    <iframe style="z-index:10;position: fixed;left: 40%;top: 55%; width="560" height="315" src="https://www.youtube.com/embed/oavMtUWDBTM?autoplay=1&mute=0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
}