// importing dependencies
import React, { useEffect } from 'react'
import SearchBar from './components/SearchBar'
import CurrentWeather from './components/CurrentWeather'
import { weatherApiKey, weatherApiUrl } from './APIs'
import {ISearchData,TCurrentWeather,TForecastWeather,TLocation} from './Types'
import ForecastWeather from './components/ForecastWeather'
import './style.css'
import {Button, Container, Spinner, Row, Col } from 'react-bootstrap'

// App component
function App() {
  // useState to store the current weather data
  const [currentWeather, setCurrentWeather] =
    React.useState<TCurrentWeather>(null)

  // useState to store the forecast weather data
  const [forecastWeather, setForecastWeather] =
    React.useState<TForecastWeather>(null)

  // useState to store the location
  const [location, setLocation] = React.useState<TLocation>(undefined)

  // function to get the location by using the navigator.geolocation
  function getLocation() {
    // if the browser supports the geolocation
    if (navigator.geolocation) {
      // get the current position
      return navigator.geolocation.getCurrentPosition(position => {
        // setting the latitude and longitude to the state 
        const latLon = {
          lat: position.coords.latitude.toFixed(4),
          lon: position.coords.longitude.toFixed(4)
        }
        // setting the location to the state
        setLocation(latLon)
      })
    }
  }
  // function to fetch the weather data
  async function weatherFetch(location: TLocation) {
    // fetching the current weather data
    const response = await fetch(
      `${weatherApiUrl}/weather?lat=${location?.lat}&lon=${location?.lon}&appid=${weatherApiKey}&units=metric`
    )
    // fetching the forecast weather data
    const response2 = await fetch(
      `${weatherApiUrl}/forecast?lat=${location?.lat}&lon=${location?.lon}&appid=${weatherApiKey}&units=metric`
    )
    // converting the response to json
    const currentWeatherData = await response.json()
    const forecastWeatherData = await response2.json()
    // console.log(currentWeatherData);
    // console.log(forecastWeatherData);
    // setting the current weather data to the state
    setCurrentWeather({ ...currentWeatherData })
    // setting the forecast weather data to the state
    setForecastWeather({ ...forecastWeatherData })
  }

  // useEffect to get the location
  React.useEffect(() => {
    getLocation()
  }, [])

  // useEffect to fetch the weather data
  React.useEffect(() => {
    // if the location is not undefined
    if (location) {
      // call the weatherFetch function
      weatherFetch(location)
    }
  }, [location])// if the location changes

  // function to handle the search change
  function handleOnSearchChange (searchData: ISearchData) {
    // setting lat and lon from the searchData
    const [lat, lon] = searchData.value.split(' ')


    async function weatherFetch() {
      const response = await fetch(
        `${weatherApiUrl}/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric`
      )
      const response2 = await fetch(
        `${weatherApiUrl}/forecast?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric`
      )
      const currentWeatherData = await response.json()
      const forecastWeatherData = await response2.json()
      setCurrentWeather({ ...currentWeatherData })
      setForecastWeather({ ...forecastWeatherData })
    }
    weatherFetch()
  }

  // if the current weather data is null
  if (!currentWeather) {
    return (
      <Container fluid>
        <Row className="align-items-center justify-content-center ">
          <Col xs={6}>
            <SearchBar onSearchChange={handleOnSearchChange} />
          </Col>
          <Button className=" btn-dark col-2 " onClick={getLocation}>
            Get Location
          </Button>
          <Col xs={2} className="p-0 ">
            <p
              className="font-weight-bold mb-2 ml-2 text-center"
              style={{ fontSize: '1.5rem' }}
            >
              Getting Weather
            </p>
          </Col>
          <Col xs={1} className="p-0 ml-3">
            <Spinner
              animation="border"
              className="m-2"
              role="status"
              style={{ width: '2rem', height: '2rem' }}
            >
              <span className="sr-only"></span>
            </Spinner>
          </Col>
        </Row>
      </Container>
    )
  }
  // if the current weather data is not null
  return (
    <Container fluid className=" bg-secondary" style={{ height: '100%' }}>
      <SearchBar onSearchChange={handleOnSearchChange} />
      <Row xs={1} sm={1} md={2} className=" align-items-baseline justify-content-center">
        <Col md={4}>
          <CurrentWeather currentWeatherData={currentWeather}  />
        </Col>
        <Col md={5} lg={4}>
          <ForecastWeather forecastWeatherData={forecastWeather} />
        </Col>
      </Row>
    </Container>
  )
}

export default App
