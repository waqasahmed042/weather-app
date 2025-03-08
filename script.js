
const apiKey = "a869d64be56969b57dbe3bc783d8798b"
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric"

const displayData = (id, data) => document.getElementById(id).innerHTML = data
const handleDisplay = (key, value) => document.querySelector(key).style.display = value

let weatherIcon = document.querySelector(".weather-icon")
const cityBtn = document.getElementById("handleCityBtn")

async function checkWeather (city) {
    const response = await fetch(`${apiUrl}&q=${city}` + `&appid=${apiKey}`)
    
    if(response.status == 404){
        handleDisplay(".loader-section","none")
        return toast("City not found")
    }

    const data = await response.json()

//    console.log(data);

   displayData("temp",`${Math.round(data.main.temp)}°C`)
   displayData("city-name",data.name)
   displayData("humidity",`${data.main.humidity}%`)
   displayData("wind",`${data.wind.speed} Km/h`)

//    for changing icon according to weather.
   let weatherCondition = data.weather[0].main
//    console.log(weatherCondition);
    switch (weatherCondition) {
        case "Clouds": 
            weatherIcon.src = "./assets/clouds.png"
            break;
        case "Clear": 
            weatherIcon.src = "./assets/clear.png"
            break;
        case "Drizzle":
            weatherIcon.src = "./assets/drizzle.png"
            break;
        case "Mist": 
            weatherIcon.src = "./assets/mist.png"
            break;
        case "Rain":
            weatherIcon.src = "./assets/rain.png"
            break;
        case "Snow": 
            weatherIcon.src = "./assets/snow.png"
            break;
        case "Haze":
            weatherIcon.src = "./assets/mist.png"
            break;
        default:
            weatherIcon.src = "./assets/clear.png"
            break;
    }

    setTimeout(() => {
        handleDisplay(".loader-section","none");
        handleDisplay(".weather","block");
    }, 2000);    
}

// search btn handle.
cityBtn.addEventListener("click",()=>{
    handleDisplay(".weather","none")

    let city = document.getElementById("input-box").value
    if(city == "" ){return toast("Enter city name")}

    document.getElementById("input-box").value = "";
    handleDisplay(".main-heading","none");
    handleDisplay(".loader-section","flex");

    checkWeather(city);
})

// handle tosatify
const toast = (msg) => {
    Toastify({
        text: msg,
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function(){} // Callback after click
      }).showToast();
}