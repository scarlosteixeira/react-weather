export interface ISearchData{
  value: string
  label: string
}

export interface ICurrentWeather {
  city: string,
  coord: {lon:number, lat: number},
  weather: [{id: number, main: string, description: string, icon: string }],
  base: string,
  main:{temp: number, feels_like: number, temp_min: number, temp_max: number, pressure: number, humidity: number, sea_level: number, grnd_level: number},
  visibility: number,
  wind: {speed: number, deg: number, gust:number},
  rain: {["1h"]: number, ["3h"]:number},
  snow: {["1h"]: number, ["3h"]:number},
  clouds: {all:number},
  dt: number,
  sys: {type: number, id: number, country: string, sunrise: number, sunset: number, message: string}
  timezone:number,
  id: number,
  name: string,
  cod: number
}
export interface ICityData {
  name: string
  countryCode: string
  latitude: number
  longitude: number
}

export interface ISearchData{
  value: string
  label: string
}

export type InputValue = string | null
export type Search = ISearchData | null
export type TCurrentWeather = ICurrentWeather | null 