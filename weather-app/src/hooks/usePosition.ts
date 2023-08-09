import { useEffect, useState } from 'react'
import * as Types from '../types/Types'

export function usePosition(trigger?:Types.TLocation): Types.TLocation {
  const [position, setPosition] = useState<Types.TLocation>(undefined)

  useEffect(() => {
    const geo = navigator.geolocation
    if (!geo) {
      setPosition(undefined)
      console.log('Geolocation is not available.')
    }
    if (trigger){
      setPosition({lat: trigger.lat, lon: trigger.lon})
      console.log("usePosition Trigger");
      return  
    }
    geo.getCurrentPosition(({ coords }) => {
      setPosition({
        lat: coords.latitude.toFixed(4),
        lon: coords.longitude.toFixed(4)
      })
      return position
    })
    
  }, [trigger])
  return position
}
