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
    const url = `https://yahoo-weather5.p.rapidapi.com/weather?location=${city}&format=json&u=f`;  
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '3f4f0b1b2bmsh2e5d4ea53f1dd43p1f5e5cjsn31ef840e7b55',
            'x-rapidapi-host': 'yahoo-weather5.p.rapidapi.com'
        }
    };  
    const response = await fetch(url, options);
    const weatherData = await response.json();

    if (!response.ok || !weatherData.current_observation) {
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

    temp.innerHTML = `${(((weatherData.current_observation.condition.temperature) - 32) * 5 / 9).toFixed(2)}°C`
    desc.innerHTML = `${weatherData.current_observation.condition.text}`
    visibility.innerHTML = `${weatherData.current_observation.atmosphere.visibility} miles`
    humidity.innerHTML = `${weatherData.current_observation.atmosphere.humidity}%`
    windSpeed.innerHTML = `${((weatherData.current_observation.wind.speed) * 0.44704).toFixed(2)} m/s`

    
    switch(weatherData.current_observation.condition.text){
        case "Cloudy":
            weatherImg.src="assets/cloud.png"
            break;
        case "Clear":
            weatherImg.src="assets/clear.png"
            break;
        case "Rain":
        case "Showers":
            weatherImg.src="assets/rain.png"
            break;
        case "Mist":
            weatherImg.src="assets/mist.png"
            break;
        case "Snow":
            weatherImg.src="assets/snow.png"
            break;
   
    }
}
}
btn.addEventListener("click",()=>{
    checkWeather(input.value)
})