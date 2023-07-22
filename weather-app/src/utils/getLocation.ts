export default function getLocation() {
  // if the browser supports the geolocation
  if (navigator.geolocation) {
    // get the current position
    return navigator.geolocation.getCurrentPosition(position => {
      // setting the latitude and longitude to the state
      const latLon = {
        lat: position.coords.latitude.toFixed(4),
        lon: position.coords.longitude.toFixed(4)
      }
      return latLon
    })
  }
  return undefined
}