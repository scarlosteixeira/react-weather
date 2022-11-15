import React, { useEffect } from 'react'
import SearchBar from './components/SearchBar'
import './App.css'
import CurrentWeather from './components/CurrentWeather'
import { WEATHER_API_KEY, WEATHER_API_URL } from './APIs'
import {ISearchData, TCurrentWeather} from './Types'

function App() {
  const [currentWeather, setCurrentWeather] = React.useState<TCurrentWeather>(null)
  const [forecastWeather, setForecastWeather] = React.useState<Array<TCurrentWeather>>([null])
  
  const handleOnSearchChange = (searchData:ISearchData) => {
    const [lat, lon] = searchData.value.split(" ");
    
    async function currentWeatherFetch() {
      const response = await fetch (`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)
      const response2 = await fetch (`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)
      const currentWeatherData = await response.json()
      const forecastWeatherData = await response2.json()
      const currentWeatherData0 = {city: searchData.label, ...currentWeatherData }
      const forecastWeatherData0 = {city: searchData.label, ...forecastWeatherData }
      console.log(currentWeatherData0);
      console.log(forecastWeatherData0);
      
      setCurrentWeather({city: searchData.label, ...currentWeatherData })
      setForecastWeather({city: searchData.label, ...forecastWeatherData })
    }
    currentWeatherFetch()
  }
  
  return (
    <div className="App">
      <SearchBar
        onSearchChange={handleOnSearchChange}
      />
      <CurrentWeather/>
    </div>
  )
}

export default App
