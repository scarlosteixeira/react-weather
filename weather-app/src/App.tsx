// importing dependencies
import { useEffect, useState } from 'react'
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap'
import CurrentWeather from './components/CurrentWeather'
import ForecastWeather from './components/ForecastWeather'
import SearchBar from './components/SearchBar'
import './style.css'
import * as Types from './types/Types'
import {weatherApiKey,weatherApiUrl,xRapidApiHost,xRapidApiKey} from './config'
import {usePosition} from './hooks/usePosition'
import useAxios from './hooks/useAxios'
import { AxiosHeaders } from 'axios'


// App component
function App() {
  // useState to store the current weather data

  const location = usePosition()

  const currentWeather = useAxios({baseURL:`${weatherApiUrl}`, url:`/weather?lat=${location?.lat}&lon=${location?.lon}&appid=${weatherApiKey}&units=metric`, method:"GET"}, location)

  const forecastWeather = useAxios({baseURL:`${weatherApiUrl}`, url:`/forecast?lat=${location?.lat}&lon=${location?.lon}&appid=${weatherApiKey}&units=metric`, method:"GET"}, location)

  // function to handle the search change
  function handleOnSearchChange(searchData: Types.ISearchData) {
    // setting lat and lon from the searchData
    const [lat, lon] = searchData.value.split(' ')
    
    
  }
  

  // if the current weather data is null
  if (!currentWeather) {
    return (
      <Container fluid>
        <Row className="align-items-center justify-content-center ">
          <Col xs={6}>
            <SearchBar onSearchChange={handleOnSearchChange} />
          </Col>
          {/* <Button className=" btn-dark col-2 " onClick={() => {handleClick}}>
            Get Location
          </Button> */}
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
      <Row
        xs={1}
        sm={1}
        md={2}
        className=" align-items-baseline justify-content-center"
      >
        <Col md={4}>
          <CurrentWeather currentWeatherData={currentWeather} />
        </Col>
        <Col md={5} lg={4}>
          <ForecastWeather forecastWeatherData={forecastWeather} />
        </Col>
      </Row>
    </Container>
  )
}

export default App
