// importing dependencies
import { useEffect, useState } from 'react'
import { Card, Col, Row, Stack } from 'react-bootstrap'
import ForecastCard from './ForecastCard'
import { AxiosError, AxiosResponse } from 'axios'
import * as Types from '../types/Types'

// forecast weather props interface
interface forecastWeatherProps {
  forecastWeatherData: { response: AxiosResponse<Types.IForecast, any>; error: AxiosError<unknown, any> | undefined; loading: boolean; sendData: () => void; }
}

// weekDays array
const weekDays = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
]
// ForecastWeather component
function ForecastWeather({ forecastWeatherData }: forecastWeatherProps) {
  // console.log(forecastWeatherData)

  // setting the weatherData state
  const [weatherData, setWeatherData] = useState<any>(null)
  // getting the current day of the week
  const dayOfWeek = new Date().getDay()
  // console.log(dayOfWeek)

  // getting the next 6 days of the week
  const forecast6Days = weekDays
    .slice(dayOfWeek, weekDays.length)
    .concat(weekDays.slice(0, dayOfWeek))
    .slice(0, 6)
  // console.log("forecast6Days",forecast6Days)

  // function to format the forecast data, it will take the forecastWeatherData.list array, that is a list of 40 objects, with the weather of next 5 days / 3 hours, and turn it into an array of arrays, where each array represents the weather of a day, and each object inside the array represents the weather of a 3 hours interval.
  function formatedForecastData() {
    let count = 0
    let date: Array<string> = []
    let newArray: Array<any> = []
    // console.log("formatedForecastData",forecastWeatherData)

    // getting the dates of the next 5 days
    forecastWeatherData.response?.data.list.map(
      (data: { dt_txt: string }, index: number) => {
        // console.log("data",data);

        // if the date of the current object is the same as the next object, then it will be added to the date array, if not, then the count will be increased, and the date will be added to the next index of the array.
        if (
          data?.dt_txt.slice(0, 10) ===
          forecastWeatherData.response?.data.list[index + 1]?.dt_txt.slice(0, 10)
        ) {
          date[count] = data.dt_txt.slice(0, 10)
          // console.log("date",date)
        } else {
          count++
        }
        // console.log(date);
      }
    )
    // console.log(date[0])

    // if the first element of the date array is empty, then it will be removed
    if (!date[0]) {
      date.shift()
    }
    // console.log(date)

    // filtering the forecastWeatherData.list array, and adding the objects that have the same date as the date array, to the newArray
    for (let index = 0; index < date.length; index++) {
      const auxday = date[index]
      newArray[index] = forecastWeatherData?.response?.data.list?.filter(
        (data: { dt_txt: string }) => {
          return data.dt_txt.slice(0, 10) === auxday
        }
      )

      // console.log("setWeatherData",newArray);
      setWeatherData(newArray)
    }
  }

  // useEffect to call the formatedForecastData function when the forecastWeatherData changes
  useEffect(() => {
    formatedForecastData()
  }, [forecastWeatherData])
  // console.log(weatherData);

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title as="h2" className=" alert alert-secondary text-center">
          Forecast
        </Card.Title>
        <Row xs={1} className="rounded">
          {weatherData?.map((data: any, index: number) => (
            <Col as={Stack} key={index} className="mb-2">
              {' '}
              {
                <ForecastCard
                  weekDay={forecast6Days[index]}
                  days={forecast6Days.length}
                  dataset={data}
                />
              }
            </Col>
          ))}
        </Row>
      </Card.Body>
    </Card>
  )
}

export default ForecastWeather
