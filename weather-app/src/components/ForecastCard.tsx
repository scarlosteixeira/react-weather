import React from 'react'
import {ListGroup} from 'react-bootstrap'
import { Card } from 'react-bootstrap'

function ForecastCard({ weekDay, dataset}: any) {
  const [tempMin, setTempMin] = React.useState<number>(0)
  const [tempMax, setTempMax] = React.useState<number>(0)
  // console.log(dataset)

  function tempMaxMin() {
    const temps = [] as Array<number>
    dataset?.map((data: { main: { temp: number } }) => {
      return temps.push(data.main.temp)
    })
    // console.log(temps)
    temps.sort((a, b) => a - b)
    // console.log(temps)
    setTempMin(Math.round(temps[0]))
    setTempMax(Math.round(temps[temps.length - 1]))
  }

  React.useEffect(() => {
    tempMaxMin()
  }, [dataset])

  return (
    <div className='d-flex flex-column flex-lg-row  border border-secondary rounded px-1 py-0 '>
      <div className='d-flex flex-column flex-lg-row align-self-center'>
        <p>{weekDay},</p>
        <p>{dataset[0]?.dt_txt?.slice(5, 10)}</p>
      </div>
      <div className='d-flex align-self-center mx-3 flex-column flex-xl-row'>
        <div className='m-2' >
          <Card.Img className='bg-info rounded '
            src={`https://openweathermap.org/img/wn/${dataset[0]?.weather[0]?.icon}@2x.png`}
            alt={dataset[0]?.weather[0]?.main}
            />
        </div>
        <div className='align-self-center font-weight-bold' style={{fontSize: '0.8rem' }}>
        <p><i className="fa-solid fa-temperature-arrow-down"></i><span>{tempMin}&deg;C</span></p>
        <p><i className="fa-solid fa-temperature-arrow-up"></i><span>{tempMax}&deg;C</span></p>
        </div>
      </div>
      <div className='align-self-center'>
        <p>{dataset[0]?.weather[0]?.description}</p>
      </div>
      
    </div>
  )
}

export default ForecastCard
