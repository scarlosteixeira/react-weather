import ForecastCard from './ForecastCard'
import React from "react";

const weekDays = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
]

function ForecastWeather({ forecastWeatherData }: any) {
  // console.log(forecastWeatherData);

  const [weatherData, setWeatherData] = React.useState<any>([])
  
  const dayOfWeek = new Date().getDay() - 1
  // console.log(dayOfWeek)

  const forecast6Days = weekDays
    .slice(dayOfWeek, weekDays.length)
    .concat(weekDays.slice(0, dayOfWeek))
    .slice(0, 6)
  // console.log(forecast5Days)

  function formatedForecastData() {
    let count = 0
    let date: any[] = []
    let newArray = []
    
      forecastWeatherData.list.map((data: { dt_txt: string | any[]; }, index: number)=>{
        if (data.dt_txt.slice(0,10) === forecastWeatherData.list[index + 1]?.dt_txt.slice(0,10)){
          date[count] = data.dt_txt.slice(0,10)
          
        } else {
          count++
        }

      })
      for (let index = 0; index < date.length; index++) {
        const auxday = date[index]
        newArray [index]= forecastWeatherData.list.filter((data: { dt_txt: string | any[]; })=>{
            return data.dt_txt.slice(0,10) === auxday
          })
          setWeatherData(newArray)
      }
      
      return newArray
  }
  React.useEffect(()=>{
    setWeatherData(formatedForecastData())
  },[forecastWeatherData])
console.log(weatherData);


  return (
    <section> 
      <ul>
        {weatherData?.map((data: { dt: React.Key | null | undefined; }, index: number) => {
        return <ForecastCard
          key= {data.dt}
          day= {forecast6Days[index]}
          dataset = {data}
        />
        })}
      </ul>
    </section>
  )
}

export default ForecastWeather
