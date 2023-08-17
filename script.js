let waitScreen=document.querySelector('.wait-screen');
let grantLocationAccess=document.querySelector('.grant-location-access');
let customSearch=document.querySelector('.custom-search');
let searchBar=document.querySelector('.search-bar');
let cityText=document.querySelector('.city');
let API_KEY="fc1462b3eed6e95e2712502b1e35d00f";
sessionStorage.clear();
checkUserCoordinates();
let coordinates;
async function getCityWeatherInfo(city){
    customSearch.classList.add('not-active');
    console.log(city);
    waitScreen.classList.remove('not-active');

    try {
        let response= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
        let result = await response.json();
        console.log(result);
        waitScreen.classList.add('not-active');
        customSearch.classList.remove('not-active');
        renderOnBrowser(result);
    } catch (error) {
        console.log(error);
    }
}

function getCity(){
    
    cityName=cityText.value;
    if(cityName){
        getCityWeatherInfo(cityName);
    }
    // return cityText;
    
}

async function renderOnBrowser(data){
    // let mainData=await JSON.parse(data);
    // console.log(mainData);
    customSearch.classList.remove('not-active');
    let city=document.querySelector('.current-city');
    let countryIcon=document.querySelector('.country-icon');
    let env=document.querySelector('.env');
    let envIcon=document.querySelector('.env-icon');
    let temp=document.querySelector('.temp');
    let windSpeed=document.querySelector('.windspeed');
    let humidity= document.querySelector('.humidity');
    let clouds= document.querySelector('.clouds');


    city.innerText=data?.name;
    countryIcon.src = `https://flagcdn.com/144x108/${data?.sys?.country.toLowerCase()}.png`;
    env.innerText=data?.weather?.[0]?.main;
    envIcon.src=`http://openweathermap.org/img/w/${data?.weather?.[0]?.icon}.png`;
    temp.innerText=data?.main?.temp;
    windSpeed.innerText=data?.wind?.speed;
    humidity.innerText=data?.main?.humidity;
    clouds.innerText=data?.clouds?.all;
}

// Switch Tab
let yourWeather=document.querySelector('.your-weather');
let searchWeather=document.querySelector('.search-weather');
let currentTab=yourWeather;
yourWeather.addEventListener('click',()=>{
    currentTab=yourWeather;
    switchTabs(currentTab);
})
searchWeather.addEventListener('click',()=>{
    currentTab=searchWeather;
    switchTabs(currentTab);
})

function switchTabs(currentTab){
    if(currentTab==searchWeather){
        yourWeather.classList.remove('active');
        searchWeather.classList.add('active');
        // grantLocationAccess.classList.add('.not-active');
        grantLocationAccess.style.scale=0;
        customSearch.classList.add('not-active')
        searchBar.classList.remove('not-active');
        cityText.value="";
    }
    else{
        searchWeather.classList.remove('active')
        yourWeather.classList.add('active');
        searchBar.classList.add('not-active');
        if(sessionStorage.getItem("user-coordinates")){
            // customSearch.classList.remove('not-active');
            waitScreen.classList.remove('not-active');
            grantLocationAccess.style.scale=0;
            customSearch.classList.add('not-active');
            getUserWeatherInfo(coordinates);

        }
        else{
            grantLocationAccess.style.scale=1;
            customSearch.classList.add('not-active');
        }
        // customSearch.style.scale=1; 
    }
}
// switchTabs(currentTab);
async function getUserWeatherInfo(coordinates){

    // grantLocationAccess.classList.add('not-active');
    // waitScreen.classList.remove('not-active');
    let {lat,lon}=coordinates;
    try {
        let response=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
        let result=await response.json();
        waitScreen.classList.add('not-active')
        customSearch.classList.remove('not-active');
        renderOnBrowser(result);
    } catch (error) {
        console.log(error);
    }
}

function getLocation() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
        //HW - show an alert for no gelolocation support available
    }
    // customSearch.style.scale=1; 
}

function showPosition(position) {

    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }

    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
    // getUserWeatherInfo(userCoordinates);
    checkUserCoordinates();

}

// Check if coordinates of user are present in session storage or not

function checkUserCoordinates(){
    let userLocation=sessionStorage.getItem("user-coordinates");
    if(userLocation){
        grantLocationAccess.classList.add('not-active');
        waitScreen.classList.remove('not-active');
        coordinates=JSON.parse(userLocation);
        getUserWeatherInfo(coordinates);
    }
    
}
// checkUserCoordinates();
console.log("Name");
