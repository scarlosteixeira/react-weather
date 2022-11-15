import React from "react"

function CurrentWeather () {
  return (
    <section>
      <div>
        <span>day and hour</span>
        <h2>city and country</h2>
      </div>
      <div>
      <WeatherIcon name="owm" iconId="200" flip="horizontal" rotate="90" />
      {/* Flip: horizontal, vertical
      Rotate: 90, 180, 270
      Fixed Width */}
        <span>temp</span>
      </div>
      <div>
        <span>feels Like</span><span>sky condition</span><span>wind condition</span>
      </div>

    </section>
    
  )
}

export default CurrentWeather