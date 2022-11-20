import React from "react";
import { TCurrentWeather, TWindCondition, TWindDirection } from "../Types";
import { windDirect, windSpeed } from "../windSpeed";




function CurrentWeather ({currentWeatherData}:any) {

  const [windCondition, setWindCondition] = React.useState<any>('wind condition')
  const [windDirection, setWindDirection] = React.useState<any>('wind direction')
// console.log(currentWeatherData);

function windConditionFunc () {
  const filteredwindSpeed = windSpeed.filter((condition)=>{
    if(currentWeatherData?.wind.speed >= condition.speedMin && currentWeatherData?.wind.speed <= condition.speedMax ) {
    return condition
    }
  })
  return filteredwindSpeed.map((data)=>{
    return data.description
  })
}
function windDirectionFunc () {
  let filteredWindDirection = windDirect.filter((direction)=>{
    if(currentWeatherData?.wind.deg >= direction.degree[0] && currentWeatherData?.wind.deg <= direction.degree[1] ) {
      // console.log(currentWeatherData.wind.deg);
      // console.log(direction.degree[0]);
      // console.log(direction.degree[1]);
      return direction
      } 
  }) 
  if (currentWeatherData?.wind.deg >= 350 || currentWeatherData?.wind.deg <= 10 ){
    return windDirect[15].direction
  }
// console.log(filteredWindDirection);

  return filteredWindDirection.map((data)=>{
    return data.direction
  })
}
React.useEffect(()=>{
  const windDescription = windConditionFunc()
  const windDirection = windDirectionFunc()
  setWindCondition(windDescription[0])
  setWindDirection(windDirection[0])
},[currentWeatherData])



  return (
    <section>
      <div>
        <span>{}</span>
        <h2>{`${currentWeatherData?.name}, ${currentWeatherData?.sys.country}`}</h2>
      </div>
      <div>
        <img src={currentWeatherData.weather[0].icon? `http://openweathermap.org/img/wn/${currentWeatherData.weather[0].icon}@2x.png`: undefined} alt={`${currentWeatherData?.weather[0].main} icon`} />
        <span>{currentWeatherData?.main.temp.toFixed(0)}	&deg;C</span> 
        {/* <ul>
          <li>Max {Math.round(currentWeatherData?.main.temp_max)}&deg;C</li>
          <li>Min {Math.round(currentWeatherData?.main.temp_min)}&deg;C</li>
        </ul> */}
      </div>
      <div>
        <span>feels Like:{Math.round(currentWeatherData?.main.feels_like).toFixed(0)}&deg;C.</span><span>{currentWeatherData?.weather[0].description}.</span><span>{windCondition}.</span>
      </div>
      <div>
        <ul>
          <li><span>{`${currentWeatherData?.wind.speed.toFixed(1)}m/s`}</span> <span>{windDirection}</span></li>
          <li>Humidity: {currentWeatherData.main.humidity}%</li>
          <li>Visibility: {(currentWeatherData.visibility / 1000).toFixed(1)}Km</li>
          <li>{currentWeatherData.main.pressure}hPa</li>
          <li>Dew Point: {Math.round(currentWeatherData.main.temp - ((100 - currentWeatherData.main.humidity)/5))}&deg;C</li>
          {/*dew point formula Td = T - ((100 - RH)/5.) */}
          <li>{currentWeatherData.rain? `Rain volume: ${currentWeatherData.rain['1h']} mm/h` : undefined}</li>
          <li>{currentWeatherData.snow? `Snow volume: ${currentWeatherData.snow['1h']} mm/h` : undefined}</li>
        </ul>
      </div>

    </section>
    
  )
}

export default CurrentWeather