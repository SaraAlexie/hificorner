// Link til pexel API dokumentation: https://www.pexels.com/api/documentation/ 

fetchImage() 
async function fetchImage() {

    const pexelsImageAPI = 'https://api.pexels.com/v1'
    const searchKey = '/search?query='
    const searchText = "dark rave party"
    // const searchColor = '&color=red'
    
    const response = await fetch(pexelsImageAPI+searchKey+searchText,{
        headers:{
            Authorization: '563492ad6f91700001000001c930be19b564485892416a16c65e072f'
        }
    })
    const apiSearchResult = await response.json()

    console.log(apiSearchResult)
    console.log(apiSearchResult.photos[1].src)

    addImageToHTML(apiSearchResult)
}

function addImageToHTML(apiSearchResult){
    const generateRandomNumber = () => Math.floor(Math.random()*apiSearchResult.photos.length)
    
    const imgUrl = `url('${apiSearchResult.photos[generateRandomNumber()].src.landscape}')`

    document.querySelector('.commercial-banner').style.backgroundImage = imgUrl

    console.log('photo array length: '+apiSearchResult.photos.length)
    console.log('random number: '+generateRandomNumber());
}
