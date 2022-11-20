import React from 'react'

function ForecastCard({ day, dataset }) {
  const [tempMin, setTempMin] = React.useState<number>(0)
  const [tempMax, setTempMax] = React.useState<number>(0)
  console.table(dataset)

  function tempMaxMin() {
    const temps = [] as Array<number>
    dataset.map((data: { main: { temp: number } }) => {
      return temps.push(data.main.temp)
    })
    console.log(temps)
    temps.sort((a, b) => a - b)
    console.log(temps)
    setTempMin(Math.round(temps[0]))
    setTempMax(Math.round(temps[temps.length - 1]))
  }

  React.useEffect(() => {
    tempMaxMin()
  }, [dataset])

  return (
    <li>
      <div>
        <span>{day},</span>
        <span>{dataset[0].dt_txt.slice(5, 10)}</span>
      </div>
      <div>
        <span>
          <img
            src={`http://openweathermap.org/img/wn/${dataset[0].weather[0].icon}@2x.png`}
            alt={dataset[0].weather[0].main}
          />
        </span>
        <span>
          <div>{tempMin}</div>
          <div>{tempMax}</div>
        </span>
      </div>
      <div>{dataset[0].weather[0]?.description}</div>
    </li>
  )
}

export default ForecastCard
