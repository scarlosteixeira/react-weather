import React from 'react'
import ForecastCard from './ForecastCard'

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

  const [weatherData, setWeatherData] = React.useState<any>(null)

  const dayOfWeek = new Date().getDay()
  // console.log(dayOfWeek)

  const forecast6Days = weekDays
    .slice(dayOfWeek, weekDays.length)
    .concat(weekDays.slice(0, dayOfWeek))
    .slice(0, 6)
  // console.log(forecast6Days)

  function formatedForecastData() {
    let count = 0
    let date: any[] = []
    let newArray = []

    forecastWeatherData?.list?.map(
      (data: { dt_txt: string | any[] }, index: number) => {
        if (
          data?.dt_txt.slice(0, 10) ===
          forecastWeatherData?.list[index + 1]?.dt_txt.slice(0, 10)
        ) {
          date[count] = data.dt_txt.slice(0, 10)
        } else {
          count++
        }
        // console.log(date);
      }
    )
    console.log(date[0])
    if (!date[0]) {
      date.shift()
    }
    console.log(date)

    for (let index = 0; index < date.length; index++) {
      const auxday = date[index]
      newArray[index] = forecastWeatherData?.list?.filter(
        (data: { dt_txt: string | any[] }) => {
          return data.dt_txt.slice(0, 10) === auxday
        }
      )
      setWeatherData(newArray)
    }

    return newArray
  }
  React.useEffect(() => {
    setWeatherData(formatedForecastData())
  }, [forecastWeatherData])
  // console.log(weatherData);

  return (
    <section className="d-flex flex-column card  ">
      <div className="card-body ">
        <h2 className="d-flex flex-column align-self-center card-title alert alert-secondary text-center">{`Forecast`}</h2>
        <ul className="list-group rounded align-self-center ">
          {weatherData?.map(
            (data: { dt: React.Key | null | undefined }, index: number) => {
              return (
                <ForecastCard
                  key={data.dt}
                  weekDay={forecast6Days[index]}
                  days={forecast6Days.length}
                  dataset={data}
                />
              )
            }
          )}
        </ul>
      </div>
    </section>
  )
}

export default ForecastWeather
