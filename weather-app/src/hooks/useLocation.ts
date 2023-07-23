import { useState, useEffect } from 'react'
import { TLocation } from '../types/Types'
// import { getLocation } from '../utils/getLocation'


function getLocation():TLocation {
  // if the browser supports the geolocation
  if (navigator.geolocation) { 
    // get the current position
    navigator.geolocation.getCurrentPosition(position => {
      // setting the latitude and longitude to the state
    const latLon = {
      lat: position.coords.latitude.toFixed(4),
      lon: position.coords.longitude.toFixed(4)
    }
    return latLon
  })
} else {console.log("getLocationError")}
  return undefined
}

export default function useLocation(trigger: boolean): TLocation {
  console.log(trigger);
  
  const [location, setLocation] = useState<TLocation>(undefined)
  useEffect(() => {setLocation(getLocation())
    console.log(location)}, [trigger])
  return location
}
