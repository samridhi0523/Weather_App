const input=document.getElementById('cityName')
const btn=document.getElementById('searchBtn')
const weatherImg=document.querySelector(".weatherImg")
const temp=document.querySelector(".temp")
const desc=document.querySelector(".desc")
const visibility=document.querySelector("#visibilityData")
const humidity=document.querySelector("#humidityData")
const windSpeed=document.querySelector("#windData")
const err=document.querySelector('.error');
const weatherBody=document.querySelector('.weatherData')
const details=document.querySelector('.details')

async function checkWeather(city){
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=36a1b11c99e7ae95493528c358082079&units=metric`;  
const response = await fetch(url);
const weatherData = await response.json();
    if (!response.ok || !weatherData.main.temp) {
        err.style.display = "flex";
        weatherBody.style.display = "none";
        details.style.display="none"
        return;
    }
else{
    err.style.display = "none";
    weatherBody.style.display = "block";
    details.style.display="flex"
    temp.style.display="block"
    desc.style.display="block"
    temp.innerHTML = `${weatherData.main.temp}°C`
    desc.innerHTML = `${weatherData.weather[0].description}`
    visibility.innerHTML = `${weatherData.visibility} miles`
    humidity.innerHTML = `${weatherData.main.humidity}%`
    windSpeed.innerHTML = `${weatherData.wind.speed} m/s`

    
    switch(weatherData.weather[0].description){
        case "clouds":
            weatherImg.src="assets/cloud.png"
            break;
        case "clear":
            weatherImg.src="assets/clear.png"
            break;
        case "rain":
        case "thunderstorm":
        case "drizzle":
        case "showers":
            weatherImg.src="assets/rain.png"
            break;
        case "mist":
        case "fog":
        case "haze":
        case "Atmosphere":
            weatherImg.src="assets/mist.png"
            break;
        case "snow":
            weatherImg.src="assets/snow.png"
            break;
   
    }
}
}
btn.addEventListener("click",()=>{
    checkWeather(input.value)
})
