let storeItems = document.getElementById("store");
let storeHeader = document.getElementById("store-header");

async function getWeather() {
  // Show loading message
  document.getElementById("loading").style.display = "block";

  try {
    const response = await new Promise((resolve, reject) => {
    //axios request here
    //https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m
    setTimeout(async() => {
      try {
        const result = await axios.get('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m')
        resolve(result);
      } catch (error) {
        reject(error);  
      }
    }, 2000);
  });
  return response.data.current_weather;
  } catch (error) {
    console.log(error);
  } finally {
    // Hide loading message
    document.getElementById("loading").style.display = "none";
  }
}

getWeather().then((weather) => {
  //Operations on weather here
  let list = document.getElementById("store")
  if(Math.random() < 0.5) weather.temperature = 5;
  console.log(weather.temperature);
  if(weather.temperature<14) {
    list.children[0].style.display = "none";
  }
  if (weather.temperature>14) {
    list.children[1].style.display = "none";
  }
    
  });
