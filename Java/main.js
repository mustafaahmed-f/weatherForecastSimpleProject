let locationInput = document.querySelector('#locationInput')
//First day :
let todayDate = document.querySelector('#today-date'),
 todayDayMonth = document.querySelector('#today-day-month'),
 townName = document.querySelector('#townName'),
 currentTemp = document.querySelector('#current-temp'),
 todayIcon = document.querySelector('.today-forecast-icon'),
 todayConidtionText = document.querySelector('#current-forecast-text'),
 humidity = document.querySelector('#humidity'),
 windSpeed = document.querySelector('#wind-speed'),
 windDirection = document.querySelector('#wind-direction')
//Second day:
let secondDate = document.querySelector('.second-date').children[0],
 maxTempSecondDay=document.querySelector('#max-temp-second-day'),
 minTempSecondDay=document.querySelector('#min-temp-second-day'),
 secondDayForecastText = document.querySelector ('#second-day-forecast-text'),
 secondDayForecastIcon = document.querySelector('#second-day-forecast-icon').children[0]
//Third day :
let thirdDate = document.querySelector('.third-date').children[0],
 thirdDayForecastIcon = document.querySelector('#third-day-forecast-icon').children[0],
 maxTempThirdDay = document.querySelector('#max-temp-third-day'),
 minTempThirdDay = document.querySelector('#min-temp-third-day'),
 thirdDayForecastText = document.querySelector('#third-day-forecast-text')



function windDirectionfunc (direction){
    switch (direction){
        case 'N' : return 'North'
        case 'NNE' : return 'North-Northeast'
        case 'NE' : return 'Northeast'
        case 'ENE' : return 'East-Northeast '
        case 'E' : return 'East'
        case 'ESE' : return 'East-Southeast'
        case 'SE' : return 'Southeast'
        case 'SSE' : return 'South-Southeast'
        case 'S' : return 'South'
        case 'SSW' : return 'South-Southwest'
        case 'SW' : return 'Southwest'
        case 'WSW' : return 'West-Southwest'
        case 'W' : return 'West'
        case 'WNW' : return 'West-Northwest'
        case 'NW' : return 'Northwest'
        case 'NNW' : return 'North-Northwest'
        default : {return 'Invalid direction'}
    }
}



let days = new Array(7);
days[0] = "Sunday";
days[1] = "Monday";
days[2] = "Tuesday";
days[3] = "Wednesday";
days[4] = "Thursday";
days[5] = "Friday";
days[6] = "Saturday";
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];


getforecast('cairo');

async function getforecast(cityName) {
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7cb4bf04f0e24d01b10152251232302&q=${cityName}&days=3&aqi=no&alerts=no`)
    let finalResponse = await response.json()

    // console.log(finalResponse);
    //Today :
    //get date:
    responseDate = finalResponse.location.localtime.split(' ')
    console.log(responseDate[0]);
    let date = new Date (`${responseDate[0]}`)
    let month = months[date.getMonth()]
    let day = date.getDate()
    let dayName = days[date.getDay()]
    todayDayMonth.innerHTML = day + month
    todayDate.innerHTML=dayName

    //town Name :
    townName.innerHTML =  finalResponse.location.name

    //current forecast : 
    currentTemp.innerHTML = finalResponse.current.temp_c + '<sup class>o</sup>C'
    todayIcon.children[0].setAttribute('src',`https:${finalResponse.current.condition.icon}`)
    todayIcon.children[0].style.width = `90px`
    todayConidtionText.innerHTML = finalResponse.current.condition.text
    humidity.innerHTML = finalResponse.current.humidity + '%'
    windSpeed.innerHTML = finalResponse.current.wind_kph + 'km/h'
    windDirection.innerHTML = windDirectionfunc(finalResponse.current.wind_dir)

    //==============================================================
    //Second day : 
    //get Date :
    let secondDayDate = new Date (`${finalResponse.forecast.forecastday[1].date}`)
    let secondDayName = days[secondDayDate.getDay()]
    secondDate.innerHTML = secondDayName;
    //get forecast :
    maxTempSecondDay.innerHTML = finalResponse.forecast.forecastday[1].day.maxtemp_c + '<sup class>o</sup>C'
    minTempSecondDay.innerHTML = finalResponse.forecast.forecastday[1].day.mintemp_c + '<sup class>o</sup>C'
    secondDayForecastText.innerHTML = finalResponse.forecast.forecastday[1].day.condition.text
    secondDayForecastIcon.setAttribute('src' , `https:${finalResponse.forecast.forecastday[1].day.condition.icon}`)

    //===============================================================
    //Third day :
    //get Date :
    let thirdDayDate = new Date (`${finalResponse.forecast.forecastday[2].date}`)
    let thirdDayName = days[thirdDayDate.getDay()]
    thirdDate.innerHTML = thirdDayName;
    //get forecast :
    thirdDayForecastIcon.setAttribute('src',`https:${finalResponse.forecast.forecastday[2].day.condition.icon}`)
    maxTempThirdDay.innerHTML = finalResponse.forecast.forecastday[2].day.maxtemp_c + '<sup class>o</sup>C'
    minTempThirdDay.innerHTML = finalResponse.forecast.forecastday[2].day.mintemp_c + '<sup class>o</sup>C'
    thirdDayForecastText.innerHTML = finalResponse.forecast.forecastday[2].day.condition.text
}





