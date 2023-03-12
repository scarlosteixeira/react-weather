// importing dependencies
import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import {TWindCondition, TWindDirection, ICurrentWeather } from "../Types";
import { windDirect, windSpeed } from "../windSpeed";

// current weather props interface
interface CurrentWeatherProps {
  currentWeatherData: ICurrentWeather;
}

// CurrentWeather component
function CurrentWeather ({currentWeatherData}:CurrentWeatherProps) {
  // useState to store the wind condition
  const [windCondition, setWindCondition] = React.useState<string>('wind condition')
  // useState to store the wind direction
  const [windDirection, setWindDirection] = React.useState<string>('wind direction')
// console.log(currentWeatherData);

// function to get the wind condition
function windConditionFunc () {
  // filtering the wind speed from the windSpeed array
  const filteredwindSpeed = windSpeed.filter((condition)=>{
    // checking if the current wind speed is between the min and max speed
    if(currentWeatherData?.wind.speed >= condition.speedMin && currentWeatherData?.wind.speed <= condition.speedMax ) {
    return condition
    }
  })
  // returning the wind condition description
  return filteredwindSpeed.map((data)=>{
    return data.description
  })
}

// function to get the wind direction
function windDirectionFunc () {
  // filtering the wind direction from the windDirect array
  let filteredWindDirection = windDirect.filter((direction)=>{
    // checking if the current wind direction is between the min and max degree
    if(currentWeatherData?.wind.deg >= direction.degree[0] && currentWeatherData?.wind.deg <= direction.degree[1] ) {
      // console.log(currentWeatherData.wind.deg)
      // console.log(direction.degree[0])
      // console.log(direction.degree[1])

      // returning the wind direction
      return direction
      } 
  }) 
  // checking if the wind direction is between 350 and 10 degree, North
  if (currentWeatherData?.wind.deg >= 350 || currentWeatherData?.wind.deg <= 10 ){
    // returning the wind direction
    return windDirect[15].direction
  }
    // console.log(filteredWindDirection)

  // returning the wind direction
  return filteredWindDirection.map((data)=>{
    return data.direction
  })
}

// useEffect to set the wind condition and wind direction
React.useEffect(()=>{
  // calling the wind condition function and storing the result in windDescription variable
  const windDescription = windConditionFunc()
  // calling the wind direction function and storing the result in windDirection variable
  const windDirection = windDirectionFunc()
  // setting the wind condition
  setWindCondition(windDescription[0])
  // setting the wind direction
  setWindDirection(windDirection[0])
},[currentWeatherData]) // update the wind condition and wind direction when the currentWeatherData changes



  return (
    <Container className=" bg-light d-flex flex-column card h-25 rounded mb-2">
      <Card.Body > 
      <div className="d-flex flex-column flex-xl-row alert alert-secondary">
        <Card.Title as={"h2"} className="align-self-center">{`${currentWeatherData?.name}, ${currentWeatherData?.sys.country}`}</Card.Title>
      </div>
      <Row className="row d-flex flex-column flex-xl-row">
        <Col className="col-4 d-flex flex-column flex-lg-row ">
          <img className="align-self-center " src={currentWeatherData.weather[0].icon? `https://openweathermap.org/img/wn/${currentWeatherData.weather[0].icon}@2x.png`: undefined} alt={`${currentWeatherData?.weather[0].main} icon`} />
          <p className="align-self-start font-weight-bold badge badge-info" style={{fontSize: '2rem' }}>{currentWeatherData?.main.temp.toFixed(0)}	&deg;C</p> 
        </Col>
        <div className="row-8 d-flex flex-column flex-lg-row font-weight-bold ">
          <span className="align-self-xl-end text-nowrap">Feels like: {Math.round(currentWeatherData?.main.feels_like).toFixed(0)}&deg;C,</span>
          {windCondition? <span className="align-self-xl-end text-nowrap">&nbsp;{currentWeatherData?.weather[0].description},</span> : <p className="align-self-xl-end ">&nbsp;{currentWeatherData?.weather[0].description}.</p>}
          {windCondition && <span className="align-self-xl-end text-nowrap">&nbsp;{windCondition}.</span>}
        </div>
      </Row>
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
      </Card.Body>

    </Container>
    
  )
}

export default CurrentWeather