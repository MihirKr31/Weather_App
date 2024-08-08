const apiKey = `8012afd3d9585b63b820771b98b8e636`;
function fetchData(cityName)
{
     fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`)
     .then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then((data) => {
        console.log(data);
        updateData(data);
    })
    .catch((err) => {
        console.log("Error occurred:", err);
    });


}
const city = document.querySelector(".city")

const temp = document.querySelector(".temperature");

const windSpeed = document.querySelector(".wind-speed")

const humidity = document.querySelector(".humidity-percent")

const visibility = document.querySelector(".visibility-percent");

const weather = document.querySelector(".description");

const current_date = document.querySelector(".date");

const weatherIconElement = document.querySelector(".icon-desc i");



function updateData(data)
{
    city.textContent = data.name;
    temp.textContent = `${Math.round(data.main.temp)}°C`;
    windSpeed.textContent = `${data.wind.speed} km/hr`;
    humidity.textContent = `${data.main.humidity} %`;
    visibility.textContent = `${data.visibility/1000} km`;
    weather.textContent = data.weather[0].description;
    const newDate = new Date();
    current_date.textContent = newDate.toLocaleDateString();

    const weatherToIcon = {
        Clear: 'wb_sunny',
        Clouds: 'cloud',
        Rain: 'umbrella',
        Drizzle: 'grain',
        Thunderstorm: 'flash_on',
        Snow: 'ac_unit',
        Mist: 'blur_on',
        Smoke: 'smoke_free',
        Haze: 'filter_drama',
        Dust: 'grain',
        Fog: 'blur_on',
        Sand: 'waves',
        Ash: 'cloud_queue',
        Squall: 'air',
        Tornado: 'toys'
    };


    const weatherMain = data.weather[0].main;
    const icon = weatherToIcon[weatherMain] || 'wb_cloudy';
    weatherIconElement.textContent = icon;

}

 
const element_search = document.querySelector(".search-form");

const input_element = document.querySelector(".search-box");

element_search.addEventListener('submit',function(e){
    e.preventDefault();
    const cityName = input_element.value;
    if(cityName!==""){
        fetchData(cityName);
        input_element.value="";
    }
})