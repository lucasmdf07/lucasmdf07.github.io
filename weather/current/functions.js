
function buildWC(SPEED, TEMP) {
    const realFeelTemp = document.getElementById('realFeelTemp');

    let wc = 35.74 + (0.6215 * TEMP) - (35.75 * Math.pow(SPEED, 0.16)) + (0.4275 * TEMP * Math.pow(SPEED, 0.16));
    console.log(wc);

    wc = Math.floor(wc);

    wc = (wc > TEMP) ? TEMP : wc;
    console.log(wc);
    wc = 'Feels like ' + wc + '&#176;F';
    realFeelTemp.innerHTML = wc;
}

function getCondition(CONDITION) {
    let cond = CONDITION.toLowerCase();

    if (cond.includes('sunny') || cond.includes('clear')) {
        console.log('clear');
        newCond = 'clear';
    }

    if (cond.includes('cloud') || cond.includes('overcast')) {
        console.log('cloudy');
        newCond = 'cloudy';
    }

    if (cond.includes('fog') || cond.includes('mist')) {
        console.log('fog');
        newCond = 'fog';
    }

    if (cond.includes('rain') || cond.includes('shower')) {
        console.log('rain');
        newCond = 'rain';
    }

    if (cond.includes('snow') || cond.includes('flurr')) {
        console.log('snow');
        newCond = 'snow';
    }
}

function changeSummaryImage(newCond) {
    let picture = document.getElementById('sections');
    console.log(picture);

    picture.classList.add(newCond);
}

function rotateWindPointer(DIRECTION) {
    let windPointer = document.getElementById('windPointerImg');
    console.log(windPointer);
    let dir = DIRECTION.toLowerCase();

    if (dir.includes('ne') || dir.includes('north east')) {
        windPointer.classList.add('rotateNE');
        console.log('rotate NE');
    }
    if (dir == 'e' || dir == 'ease') {
        windPointer.classList.add('rotateE');
        console.log('rotate E');
    }
    if (dir.includes('se') || dir.includes('south east')) {
        windPointer.classList.add('rotateSE');
        console.log('rotate SE');
    }
    if (dir == 's' || dir.includes('south')) {
        windPointer.classList.add('rotateS');
        console.log('rotate S');
    }
    if (dir.includes('sw') || dir.includes('south west')) {
        windPointer.classList.add('rotateSW');
        console.log('rotate SW');
    }
    if (dir == 'w' || dir.includes('west')) {
        windPointer.classList.add('rotateW');
        console.log('rotate W');
    }
    if (dir.includes('nw') || dir.includes('north west')) {
        windPointer.classList.add('rotateNW');
        console.log('rotate NW');
    }
}

function getCode(LOCALE) {
    const API_KEY = 'DXyVaQAsL2FCDUEegAeVU3sLAP7MQEYh';
    const URL = 'https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=' + API_KEY + '&q=' + LOCALE;
    fetch(URL)
        .then(response => response.json())
        .then(function (data) {
            console.log('Json object from getCode function:');
            console.log(data);
            const locData = {};
            locData['key'] = data.Key;
            locData['name'] = data.LocalizedName;
            locData['postal'] = data.PrimaryPostalCode;
            locData['state'] = data.AdministrativeArea.LocalizedName;
            locData['stateAbbr'] = data.AdministrativeArea.ID;
            locData['geoposition'] = LOCALE;
            locData['elevation'] = data.GeoPosition.Elevation.Imperial.Value;
            getWeather(locData);
        })
        .catch(error => console.log('There was a getCode error: ', error))
} 

function getWeather(locData) {
    const API_KEY = 'DXyVaQAsL2FCDUEegAeVU3sLAP7MQEYh';
    const CITY_CODE = locData['key']; // We're getting data out of the object
    const URL = "https://dataservice.accuweather.com/currentconditions/v1/" + CITY_CODE + "?apikey=" + API_KEY + "&details=true";
    fetch(URL)
        .then(response => response.json())
        .then(function (data) {
            console.log('Json object from getWeather function:');
            console.log(data); // Let's see what we got back
            // Start collecting data and storing it
            locData['currentTemp'] = data[0].Temperature.Imperial.Value;
            locData['summary'] = data[0].WeatherText;
            locData['windSpeed'] = data[0].Wind.Speed.Imperial.Value;
            locData['windUnit'] = data[0].Wind.Speed.Imperial.Unit;
            locData['windDirection'] = data[0].Wind.Direction.Localized;
            locData['windGust'] = data[0].WindGust.Speed.Imperial.Value;
            locData['pastLow'] = data[0].TemperatureSummary.Past12HourRange.Minimum.Imperial.Value;
            locData['pastHigh'] = data[0].TemperatureSummary.Past12HourRange.Maximum.Imperial.Value;
            getHourly(locData); // Send data to getHourly function
        })
        .catch(error => console.log('There was an error: ', error))
}

function getHourly(locData) {
    const API_KEY = 'DXyVaQAsL2FCDUEegAeVU3sLAP7MQEYh';
    const CITY_CODE = locData['key'];
    const URL = "https://dataservice.accuweather.com/forecasts/v1/hourly/12hour/" + CITY_CODE + "?apikey=" + API_KEY;
    fetch(URL)
        .then(response => response.json())
        .then(function (data) {
            console.log('Json object from getHourly function:');
            console.log(data);

            let date_obj = new Date(data[0].DateTime);
            let nextHour = date_obj.getHours(); // returns 0 to 23

            locData["nextHour"] = nextHour;

            var i = 1;

            data.forEach(function (element) {
                let temp = element.Temperature.Value;
                let hour = 'hourTemp' + i;
                locData[hour] = temp; // Store hour and temp to object

                let hiTemp = locData.pastHigh;

                let lowTemp = locData.pastLow;

                if (temp > hiTemp) {
                    hiTemp = temp;
                } else if (temp < lowTemp) {
                    lowTemp = temp;
                }
            
                if (hiTemp != locData.pastHigh) {
                    locData["pastHigh"] = hiTemp; 
                }
                if (lowTemp != locData.pastLow) {
                    locData["pastLow"] = lowTemp; 
                }
                i++; 
            }); 
            console.log('Finished locData object and data:');
            console.log(locData);
            buildPage(locData); 
        })
        .catch(error => console.log('There was an error: ', error))
}

function buildPage(locData) {

    const TEMP = locData.currentTemp;
    const SPEED = locData.windSpeed;

    const CONDITION = locData.summary;
    console.log(CONDITION);
    let newCond;

    let DIRECTION = locData.windDirection;


    buildWC(SPEED, TEMP);
    getCondition(CONDITION);
    console.log(newCond);
    changeSummaryImage(newCond);
    rotateWindPointer(DIRECTION);
    

    document.getElementById('zip').innerHTML = "<strong>Zip: </strong>" + locData.postal + " "
    document.getElementById('elevation').innerHTML = "<strong>Evelation: </strong>" + locData.elevation + " ft.";
    document.getElementById('location').innerHTML = "<strong>Location: </strong>" + locData.geoposition + " ";
    document.getElementById('name').innerHTML = locData.name + ", " + locData.stateAbbr;

    document.getElementById('real-temp').innerHTML = TEMP + "&#176;F";
    document.getElementById('wind-speed').innerHTML = SPEED + " mph";
    document.getElementById('wind-direction').innerHTML = "<strong>Direction: </strong>" + locData.windDirection;
    document.getElementById('wind-gusts').innerHTML = "<strong>Gusts: </strong>" + locData.windGust + " mph";


    console.log('buildPage working');
}