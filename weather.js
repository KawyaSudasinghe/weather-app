document.querySelector(".close-button").addEventListener("click", () => {
    window.electronAPI.closeWindow();
});

let input = document.querySelector(".input");
let button = document.querySelector(".get-weather-button");
const currLocationButton = document.querySelector(".curr-loc-button");
let app = document.querySelector('.app');

currLocationButton.addEventListener("click", ()=>{
    getWeatherByLocation();
})

function getCity(){
    button.addEventListener("click", ()=>{
        let city = input.value.trim();
        console.log(city);
        fetchweather(city);
        input.value = '';
    })
}

function fetchweather(location){
     fetch(`https://api.weatherapi.com/v1/current.json?key=d5ba376968b9447fa7c83730262705&q=${location}`)
    .then( response => response.json())
    .then( (data) => {
        console.log("API Response:", data);

            if (data.error) {
                console.error(data.error);
                alert(data.error.message);
                return;
            }

        console.log(data);
        document.querySelector(".city-name").textContent = data.location.name;
        document.querySelector(".temp").textContent = `${data.current.temp_c}°C`;
        document.querySelector(".feels-like").textContent = `Feels like ${data.current.feelslike_c}°C`;
        document.querySelector(".humidity").textContent = `Humidity: ${data.current.humidity}%`;
        document.querySelector(".desc").textContent = data.current.condition.text;

        if(data.current.condition.code === 1000){
            document.querySelector(".code-data").textContent = "☀️"
            app.style.background = "url(images/sunny.png)"
            app.style.backgroundSize = "cover";
            app.style.backgroundPosition = "center";
            app.style.backgroundRepeat = "no-repeat";
        }else if(data.current.condition.code === 1003){
            document.querySelector(".code-data").textContent = "🌤️"
            app.style.background = "url(images/partly-cloudy.png)"
            app.style.backgroundSize = "cover";
            app.style.backgroundPosition = "center";
            app.style.backgroundRepeat = "no-repeat";
        }else if(data.current.condition.code === 1006){
            document.querySelector(".code-data").textContent = "☁️"
            app.style.background = "url(images/cloudy.png)"
            app.style.backgroundSize = "cover";
            app.style.backgroundPosition = "center";
            app.style.backgroundRepeat = "no-repeat";
        }else if(data.current.condition.code === 1063){
            document.querySelector(".code-data").textContent = "🌧️"
            app.style.background = "url(images/patchy-rain.png)"
            app.style.backgroundSize = "cover";
            app.style.backgroundPosition = "center";
            app.style.backgroundRepeat = "no-repeat";
        }else if(data.current.condition.code === 1183){
            document.querySelector(".code-data").textContent = "🌧️"
            app.style.background = "url(images/light-rain.png)"
            app.style.backgroundSize = "cover";
            app.style.backgroundPosition = "center";
            app.style.backgroundRepeat = "no-repeat";
        }else if(data.current.condition.code === 1210){
            document.querySelector(".code-data").textContent = "❄️"
            app.style.background = "url(images/snowy.png)"
            app.style.backgroundSize = "cover";
            app.style.backgroundPosition = "center";
            app.style.backgroundRepeat = "no-repeat";
        }else if(data.current.condition.code === 1273){
            document.querySelector(".code-data").textContent = "⛈️"
            app.style.background = "url(images/thunderstorm.png)"
            app.style.backgroundSize = "cover";
            app.style.backgroundPosition = "center";
            app.style.backgroundRepeat = "no-repeat";
        }else if(data.current.condition.text.includes("rain")){
            document.querySelector(".code-data").textContent = "🌧️"
            app.style.background = "url(images/light-rain.png)"
            app.style.backgroundSize = "cover";
            app.style.backgroundPosition = "center";
            app.style.backgroundRepeat = "no-repeat";
        }
       //console.log(data);
    })
    .catch( error => console.log(error));    

}


function getWeatherByLocation(){
    if(!navigator.geolocation){
        alert("Geolocation is not supported by your browser");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (posistion)=>{
            const latitude = posistion.coords.latitude;
            const longitude = posistion.coords.longitude;
            fetchweather(`${latitude}, ${longitude}`);
        },
        (error)=>{
            alert("Unable to get your location. Please search manually");
            console.log(error);
        }
    )
}


getCity();
getWeatherByLocation();
