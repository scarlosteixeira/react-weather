import { TLocation } from "../types/Types"

export function getLocation():TLocation {
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