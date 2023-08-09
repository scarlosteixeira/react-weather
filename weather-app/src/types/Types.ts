export interface ISearchData{
  value: string
}

export interface ICurrentWeather {
  city: string,
  coord: {lon:number, lat: number},
  weather: [{id: number, main: string, description: string, icon: string }],
  base: string,
  main:{temp: number, feels_like: number, temp_min: number, temp_max: number, pressure: number, humidity: number, sea_level: number, grnd_level: number},
  visibility: number,
  wind: {speed: number, deg: number, gust:number},
  rain?: {["1h"]: number, ["3h"]:number},
  snow?: {["1h"]: number, ["3h"]:number},
  clouds: {all:number},
  dt: number,
  sys: {type: number, id: number, country: string, sunrise: number, sunset: number, message: string}
  timezone:number,
  id: number,
  name: string,
  cod: number
}

export interface IForecast {
  "list": [
    {
      dt: number,
      main: {
        temp: number,
        feels_like: number,
        temp_min: number,
        temp_max: number,
        pressure: number,
        humidity: number,
      },
      weather: [
        {
          id: number,
          main:string,
          "description": string,
          "icon": string
        }
      ],
      clouds: {
        all: number
      },
      wind: {
        speed: number,
        deg: number,
        gust: number
      },
      visibility: number,
      pop: number,
      rain?: {
        ['3h']: number
      },
      snow?: {
        ['3h']: number
      },
      sys: {
        pod: string
      },
      dt_txt: string
    }
  ],
  city: {
    timezone: number,
    sunrise: number,
    sunset: number
  }
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
interface ILocation {
  lat: string,
  lon: string
}

interface IWindCondition{
  speedMin: number,
  speedMax: number,
  description: string
}

interface IWindDirection{
  direction: string,
  degree:Array<number>
}
export type TWindDirection = Array<IWindDirection>
export type TWindCondition = Array<IWindCondition>
export type TLocation = ILocation | undefined
export type InputValue = string | null
export type Search = ISearchData | null
export type TCurrentWeather = ICurrentWeather | undefined
export type TForecastWeather = IForecast | undefined