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
    <section className="container bg-light d-flex flex-column card h-25 rounded mb-2">
      <div className="card-body  "> 
      <div className="d-flex flex-column flex-xl-row alert alert-secondary">
        <h2 className="align-self-center card-title">{`${currentWeatherData?.name}, ${currentWeatherData?.sys.country}`}</h2>
      </div>
      <div className="row d-flex flex-column flex-xl-row">
        <div className="col-4 d-flex flex-column flex-lg-row ">
          <img className="align-self-center " src={currentWeatherData.weather[0].icon? `https://openweathermap.org/img/wn/${currentWeatherData.weather[0].icon}@2x.png`: undefined} alt={`${currentWeatherData?.weather[0].main} icon`} />
          <p className="align-self-start font-weight-bold badge badge-info" style={{fontSize: '2rem' }}>{currentWeatherData?.main.temp.toFixed(0)}	&deg;C</p> 
        </div>
        <div className="row-8 d-flex flex-column flex-lg-row font-weight-bold ">
          <p className="align-self-xl-end text-nowrap">Feels like: {Math.round(currentWeatherData?.main.feels_like).toFixed(0)}&deg;C,</p>
          {windCondition? <p className="align-self-xl-end text-nowrap">&nbsp;{currentWeatherData?.weather[0].description},</p> : <p className="align-self-xl-end text-nowrap">&nbsp;{currentWeatherData?.weather[0].description}.</p>}
          {windCondition && <p className="align-self-xl-end text-nowrap">&nbsp;{windCondition}.</p>}
        </div>
      </div>
      <div className="d-flex flex-column flex-md-row">
        <ul className="list-inline align-self-center">
          <li className="list-inline-item border-0 p-1 "><i className="fa-solid fa-location-arrow"></i><span>{`${currentWeatherData?.wind.speed.toFixed(1)}m/s`}</span> <span>{windDirection}</span></li>
          <li className="list-inline-item border-0 p-1">Humidity: {currentWeatherData.main.humidity}%</li>
          <li className="list-inline-item border-0 p-1">Visibility: {(currentWeatherData.visibility / 1000).toFixed(1)}Km</li>
          <li className="list-inline-item border-0 p-1"><i className="fa-solid fa-gauge-high"></i><span>{currentWeatherData.main.pressure}hPa</span></li>
          <li className="list-inline-item border-0 p-1">Dew Point: {Math.round(currentWeatherData.main.temp - ((100 - currentWeatherData.main.humidity)/5))}&deg;C</li>
          {/*dew point formula Td = T - ((100 - RH)/5.) */}
          <li className={currentWeatherData.snow? `list-inline-item border-0 p-1` : `d-none`}>{currentWeatherData.snow? `Snow volume: ${currentWeatherData.snow['1h']} mm/h` : null}</li>
          <li className={currentWeatherData.rain? `list-inline-item border-0 p-1` : `d-none`}>{currentWeatherData.rain? `Rain volume: ${currentWeatherData.rain['1h']} mm/h` : null}</li>
        </ul>
      </div>
      </div>

    </section>
    
  )
}

export default CurrentWeather