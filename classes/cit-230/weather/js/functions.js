console.log('My javascript is being read.');

// variables for functions use
const temp = 31;
const speed = 5;
// wind chill
buildWC(speed, temp);

// variables for functions use
const direction = "E"; //Set your own value
// wind dial
windDial(direction);





// variables for functions use
const condition = "Snow Storm";
// background condition image
let curCondition = getCondition(condition);
// change background image
changeSummaryImage(curCondition);



var oReq = new XMLHttpRequest();
oReq.onload = reqListener;
oReq.open("get", "js/weather.json", true);
oReq.send();

function reqListener(e) {
    treeData = JSON.parse(this.responseText);
    if (treeData) {
        loadDataOntoPage(treeData)
    }
}

function loadDataOntoPage(treeData) {
  document.getElementById('hot_temp').value = treeData.Franklin.High;
}





 // Calculate the Windchill
function buildWC(speed, temp) {
 const feelTemp = document.getElementById('feelTemp');

 // Compute the windchill
 let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16);
 console.log(wc);

 // Round the answer down to integer
 wc = Math.floor(wc);

 // If chill is greater than temp, return the temp
 wc = (wc > temp)?temp:wc;

 // Display the windchill
 console.log(wc);
 // wc = 'Feels like '+wc+'°F';
 feelTemp.innerHTML = wc;
 }

// Wind Dial Function
function windDial(direction){
 // Get the container
 const dial = document.getElementById("dial");
 console.log(direction);
 // Determine the dial class
 switch (direction){
  case "North":
  case "N":
   dial.setAttribute("class", "n"); //"n" is the CSS rule selector
   break;
  case "NE":
  case "NNE":
  case "ENE":
   dial.setAttribute("class", "ne");
   break;
  case "NW":
  case "NNW":
  case "WNW":
   dial.setAttribute("class", "nw");
   break;
  case "South":
  case "S":
   dial.setAttribute("class", "s");
   break;
  case "SE":
  case "SSE":
  case "ESE":
   dial.setAttribute("class", "se");
   break;
  case "SW":
  case "SSW":
  case "WSW":
   dial.setAttribute("class", "sw");
   break;
  case "East":
  case "E":
   dial.setAttribute("class", "e");
   break;
  case "West":
  case "W":
   dial.setAttribute("class", "w");
   break;
 }
}


// get the weather condition
function getCondition(condition) {
    console.log(condition);
    if ((condition.includes("Clear")) || (condition.includes("Sun"))
        || (condition.includes("Sunshine")))
    {
        return "Clear";
    }
    else if ((condition.includes("Cloudy")) || (condition.includes("Overcast"))
            || (condition.includes("Partly")))
    {
        return "Cloudy";
    }
    else if ((condition.includes("Foggy")) || (condition.includes("Fog")))
    {
        return "Fog";
    }
    else if ((condition.includes("Wet")) || (condition.includes("Rainy"))
                || (condition.includes("Rain")) || (condition.includes("Showers")))
    {
        return "Rain";
    }
    else if ((condition.includes("Snow")) || (condition.includes("Snowy")) 
                || (condition.includes("Cold")))
    {
        return "Snow";
    }
    else
        return "Snow";
}

// change the summary image
function changeSummaryImage(curCondition) {
    console.log(curCondition);
    // get the current weather container
    const curWeather = document.getElementById("curWeather");

    switch (curCondition) {
        case "Clear":
            curWeather.setAttribute("class", "clear");
            break;
        case "Cloudy":
            curWeather.setAttribute("class", "cloudy");
            break;
        case "Fog":
            curWeather.setAttribute("class", "foggy");
            break;
        case "Rain":
            curWeather.setAttribute("class", "rainy");
            break;
        case "Snow":
            curWeather.setAttribute("class", "snowy");
            break;
    }
}
