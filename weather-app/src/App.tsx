import React, { useEffect } from 'react'
import SearchBar from './components/SearchBar'
import CurrentWeather from './components/CurrentWeather'
import { weatherApiKey, weatherApiUrl } from './APIs'
import {ISearchData, TCurrentWeather, TForecastWeather, TLocation} from './Types'
import ForecastWeather from './components/ForecastWeather'
import  "./style.css"

function App() {
  const [currentWeather, setCurrentWeather] = React.useState<TCurrentWeather>(null)
  const [forecastWeather, setForecastWeather] = React.useState<TForecastWeather>(null)
  const [location , setLocation] = React.useState<TLocation>(undefined)

  function getLocation () {
    if(navigator.geolocation){
      return navigator.geolocation.getCurrentPosition((position)=>{
        const latLon = {lat: position.coords.latitude.toFixed(4),
          lon: position.coords.longitude.toFixed(4)}
          setLocation(latLon)
        })
      }
  }

  async function weatherFetch(location: any) {
    const response = await fetch (`${weatherApiUrl}/weather?lat=${location.lat}&lon=${location.lon}&appid=${weatherApiKey}&units=metric`)
    const response2 = await fetch (`${weatherApiUrl}/forecast?lat=${location.lat}&lon=${location.lon}&appid=${weatherApiKey}&units=metric`)
    const currentWeatherData = await response.json()
    const forecastWeatherData = await response2.json()
    // console.log(currentWeatherData);
    // console.log(forecastWeatherData);
    
    
    setCurrentWeather({ ...currentWeatherData })
    setForecastWeather({ ...forecastWeatherData })
  }

  React.useEffect(()=>{
    getLocation()
  },[])

  React.useEffect(()=>{
    if(location){
    weatherFetch(location)
    }
  },[location])
    
  const handleOnSearchChange = (searchData:ISearchData) => {
    const [lat, lon] = searchData.value.split(" ");
    
    async function weatherFetch() {
      const response = await fetch (`${weatherApiUrl}/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric`)
      const response2 = await fetch (`${weatherApiUrl}/forecast?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric`)
      const currentWeatherData = await response.json()
      const forecastWeatherData = await response2.json()
      setCurrentWeather({ ...currentWeatherData })
      setForecastWeather({ ...forecastWeatherData })
    }
    weatherFetch()
  }
  if(!currentWeather){
    return (
      <div className='container'>
        <div className='row align-items-center justify-content-center '>
          <div className='col-6'>
            <SearchBar className='col-6'
              onSearchChange={handleOnSearchChange}
            />
          </div>
            <button className='btn btn-light col-2 ' onClick={ getLocation}>
            Get Location
            </button>
          <div className='col-4 d-flex'>
            <span className='font-weight-bold mb-2 align-self-center' style={{fontSize: '1.5rem' }}> Getting Weather </span>
            <div className="spinner-border m-2" role="status">
            <span className="sr-only" ></span>
            </div>
            
          </div>
        </div>
      </div>
      
    )
  }
  return (
    <div className="container m-3 rounded">
        <SearchBar 
          onSearchChange={handleOnSearchChange}
          />
      <div className='row align-items-baseline m-3'>
        <div className="col-6 d-flex flex-column flex-xl-row justify-content-xl-around ">
          <CurrentWeather 
          currentWeatherData = {currentWeather}
          />
        </div>
        <div className='col-6'>
          <ForecastWeather 
            forecastWeatherData = {forecastWeather}
            />
        </div>
      </div>
    </div>
  )
}

export default App
