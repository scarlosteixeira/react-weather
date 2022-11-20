import React, { useEffect } from 'react'
import SearchBar from './components/SearchBar'
import './App.css'
import CurrentWeather from './components/CurrentWeather'
import { WEATHER_API_KEY, WEATHER_API_URL } from './APIs'
import {ISearchData, TCurrentWeather, TForecastWeather, TLocation} from './Types'
import ForecastWeather from './components/ForecastWeather'


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

  async function currentWeatherFetch(location: any) {
    const response = await fetch (`${WEATHER_API_URL}/weather?lat=${location.lat}&lon=${location.lon}&appid=${WEATHER_API_KEY}&units=metric`)
    const response2 = await fetch (`${WEATHER_API_URL}/forecast?lat=${location.lat}&lon=${location.lon}&appid=${WEATHER_API_KEY}&units=metric`)
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
    currentWeatherFetch(location)
    }
  },[location])
    
  const handleOnSearchChange = (searchData:ISearchData) => {
    const [lat, lon] = searchData.value.split(" ");
    
    async function currentWeatherFetch() {
      const response = await fetch (`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)
      const response2 = await fetch (`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)
      const currentWeatherData = await response.json()
      const forecastWeatherData = await response2.json()
      setCurrentWeather({ ...currentWeatherData })
      setForecastWeather({ ...forecastWeatherData })
    }
    currentWeatherFetch()
  }
  if(!currentWeather){
    return (
      <div>Getting Weather...
              <SearchBar
        onSearchChange={handleOnSearchChange}
      />
        <button onClick={ getLocation}>Get Location</button>
      </div>
      
    )
  }
  return (
    <div className="App">
      <SearchBar
        onSearchChange={handleOnSearchChange}
      />
      <CurrentWeather
        currentWeatherData = {currentWeather}
      />
        <ForecastWeather
          forecastWeatherData = {forecastWeather}
        />
    </div>
  )
}

export default App
